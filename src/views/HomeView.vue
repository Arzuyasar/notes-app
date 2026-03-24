<template>
  <div class="container">
    <h1 class="title">📝 Kişisel Not Uygulaması</h1>
    <div class="top-section">
      <StatsBar />
      <NoteForm />
    </div>

    <FilterBar />

    <div class="notes-grid">
      <NoteCard
        v-for="note in store.filteredNotes"
        :key="note.id"
        :note="note"
      />
    </div>
  </div>
</template>

<script setup>
import { useNoteStore } from "../stores/noteStore"
import FilterBar from "../components/FilterBar.vue"
import NoteCard from "../components/NoteCard.vue"
import NoteForm from "../components/NoteForm.vue"
import StatsBar from "../components/StatsBar.vue"

const store = useNoteStore()
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}
</style>