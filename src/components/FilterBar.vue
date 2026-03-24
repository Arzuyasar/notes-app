<template>
  <div class="filter-container">
    <input v-model="search" placeholder="🔍 Not ara..." />
    <select v-model="category">
      <option value="">Tüm Kategoriler</option>
      <option value="İş">İş</option>
      <option value="Kişisel">Kişisel</option>
      <option value="Fikir">Fikir</option>
    </select>
    <select v-model="sort">
      <option value="">Sıralama</option>
      <option value="low">Düşük → Yüksek</option>
      <option value="high">Yüksek → Düşük</option>
    </select>
    <button @click="applyFilters">Filtrele</button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useNoteStore } from "../stores/noteStore"

const store = useNoteStore()
const search = ref("")
const category = ref("")
const sort = ref("")

const applyFilters = () => {
  store.setFilters({
    search: search.value,
    category: category.value,
    sort: sort.value
  })
}
</script>

<style scoped>
.filter-container {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-container input,
.filter-container select {
  flex: 1;
  border: 2px solid #16a34a;
  background-color: #f0fff4;
  color: #064e3b;
  font-weight: 500;
  border-radius: 8px;
  padding: 6px 10px;
}

.filter-container input {
  flex: 2;
}

.filter-container select {
  min-width: 120px;
}

.filter-container button {
  background-color: #16a34a;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.filter-container button:hover {
  background-color: #15803d;
}
</style>