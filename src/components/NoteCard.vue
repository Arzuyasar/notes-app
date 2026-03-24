<template>
  <div
    @click="goToDetail"
    class="note-card"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :style="cardStyle"
  >
    <div class="card-header">
      <h3>{{ note.title }}</h3>
      <span class="priority" :class="note.priority.toLowerCase()">
        {{ note.priority }}
      </span>
    </div>

    <p class="content">
      {{ note.content }}
    </p>

    <div class="card-footer">
      <span class="category">{{ note.category }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ note: Object })
const router = useRouter()
const hover = ref(false)

const goToDetail = () => {
  router.push(`/note/${props.note.id}`)
}

const cardStyle = computed(() => ({
  transform: hover.value ? 'translateY(-4px)' : 'none',
  boxShadow: hover.value
    ? '0 6px 16px rgba(0,0,0,0.12)'
    : '0 2px 6px rgba(0,0,0,0.06)'
}))
</script>

<style scoped>
.note-card {
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  background: var(--color-background-mute); 
  color: #ffffff; /* yazılar beyaz */
  transition: all 0.2s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  color: #ffffff;
}

.content {
  margin: 10px 0;
  color: #e0e0e0; 
  font-size: 14px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category {
  font-size: 12px;
  background: #555; 
  color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
}

.priority {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  color: white;
}

.priority.low {
  background: #6c757d;
}

.priority.medium {
  background: #f0ad4e;
}

.priority.high {
  background: #d9534f;
}
</style>