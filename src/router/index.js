import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '@/views/NotesView.vue'
import NoteDetailView from '@/views/NoteDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: NotesView
  },
  {
    path: '/note/:id',
    name: 'noteDetail',
    component: NoteDetailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router