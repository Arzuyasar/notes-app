<template>
  <div class="container">
    <h1 class="title">Notlar</h1>

    <StatsBar :stats="store.categoryStats" :total="store.noteCount" />

    <div class="top-section">
      <div class="form-wrapper">
        <NoteForm @add-note="handleAddNote" />
      </div>
      <div class="filter-wrapper">
        <FilterBar
          :categories="['İş','Kişisel','Fikir']"
          :selectedCategory="selectedCategory"
          :selectedPriority="selectedPriority"
          :search="search"
          @update:category="selectedCategory = $event"
          @update:priority="selectedPriority = $event"
          @update:search="search = $event"
        />
      </div>
    </div>

    <div class="notes-grid">
      <NoteCard v-for="note in filteredNotes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNoteStore } from '@/stores/noteStore'

import NoteForm from '@/components/NoteForm.vue'
import FilterBar from '@/components/FilterBar.vue'
import NoteCard from '@/components/NoteCard.vue'
import StatsBar from '@/components/StatsBar.vue'

const store = useNoteStore()

// Filtreleme
const search = ref('')
const selectedCategory = ref('')
const selectedPriority = ref('')

// Not ekleme
const handleAddNote = (note) => store.addNote(note)

// Filtrelenmiş + sıralanmış notlar
const filteredNotes = computed(() => {
  return store.notes
    .filter(note =>
      note.title.toLowerCase().includes(search.value.toLowerCase()) ||
      note.content.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter(note =>
      selectedCategory.value ? note.category === selectedCategory.value : true
    )
    .filter(note =>
      selectedPriority.value ? note.priority === selectedPriority.value : true
    )
    .sort((a, b) => {
      const order = { 'Yüksek': 3, 'Orta': 2, 'Düşük': 1 }
      return order[b.priority] - order[a.priority]
    })
})
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.title {
  text-align: center;
  margin-bottom: 1rem;
}

.top-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-wrapper,
.filter-wrapper {
  flex: 1 1 300px;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
</style>