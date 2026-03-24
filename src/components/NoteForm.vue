<template>
  <div class="note-form">
    <input v-model="title" placeholder="Başlık" />
    <input v-model="content" placeholder="İçerik" />

    <select v-model="category">
      <option disabled value="">Kategori seç</option>
      <option>İş</option>
      <option>Kişisel</option>
      <option>Fikir</option>
    </select>

    <select v-model="priority">
      <option>Düşük</option>
      <option>Orta</option>
      <option>Yüksek</option>
    </select>

    <button @click="addNote">Ekle</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['add-note'])

const title = ref('')
const content = ref('')
const category = ref('')
const priority = ref('Düşük')

const addNote = () => {
  if (!title.value || !content.value || !category.value) return

  emit('add-note', {
    id: Date.now(),
    title: title.value,
    content: content.value,
    category: category.value,
    priority: priority.value
  })

  title.value = ''
  content.value = ''
  category.value = ''
  priority.value = 'Düşük'
}
</script>

<style scoped>
.note-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.note-form input,
.note-form select {
  padding: 0.4rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.note-form button {
  padding: 0.5rem;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.note-form button:hover {
  background-color: #45a049;
}
</style>