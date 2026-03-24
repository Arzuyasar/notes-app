<template>
  <div class="stats-container">
    <div class="stat-card total">
      <h3>Toplam Not</h3>
      <p>{{ total }}</p>
    </div>

    <div class="stat-card">
      <h3>Kategoriler</h3>

      <div
        v-for="(count, category) in categoryStats"
        :key="category"
        class="category-row"
      >
        <span>{{ category }}</span>

        <div class="bar">
          <div
            class="fill"
            :style="{ width: (count / total) * 100 + '%' }"
          ></div>
        </div>

        <span class="count">{{ count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNoteStore } from "../stores/noteStore"
import { computed } from "vue"

const store = useNoteStore()

const total = computed(() => store.notes.length)

const categoryStats = computed(() => {
  const stats = {}

  store.notes.forEach(note => {
    if (!stats[note.category]) {
      stats[note.category] = 0
    }
    stats[note.category]++
  })

  return stats
})
</script>

<style scoped>
.stats-container {
  display: flex;
  gap: 20px;
  flex: 1;
}

.stat-card {
  background: var(--color-background-mute); 
  padding: 16px;
  border-radius: 12px;
  flex: 1;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  color: #ffffff; 
}

.stat-card.total {
  text-align: center;
}

.stat-card h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #ffffff;
}

.stat-card p {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}

.category-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.category-row span {
  color: #e0e0e0; 
}

.bar {
  flex: 1;
  height: 8px;
  background: #555; 
  border-radius: 6px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: #42b883;
  transition: 0.3s;
}

.count {
  font-size: 12px;
  color: #e0e0e0; 
}
</style>