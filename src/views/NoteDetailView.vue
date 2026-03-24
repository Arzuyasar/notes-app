<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore'

const route = useRoute()
const router = useRouter()
const store = useNoteStore()

const note = store.getNoteById(Number(route.params.id))

const deleteNote = () => {
  store.deleteNote(note.id)
  router.push('/') 
}
</script>