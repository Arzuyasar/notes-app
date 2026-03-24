import { defineStore } from 'pinia'

export const useNoteStore = defineStore('noteStore', {
  state: () => ({
    notes: JSON.parse(localStorage.getItem('notes')) || [],

   
    filters: {
      search: '',
      category: '',
      sort: ''
    }
  }),

  getters: {
    noteCount: (state) => state.notes.length,

    getNoteById: (state) => (id) =>
      state.notes.find(note => note.id === id),

    categoryStats: (state) => {
      const stats = {}
      state.notes.forEach(note => {
        stats[note.category] = (stats[note.category] || 0) + 1
      })
      return stats
    },

    
    filteredNotes: (state) => {
      let filtered = [...state.notes]

      // search
      if (state.filters.search) {
        filtered = filtered.filter(n =>
          n.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          n.content.toLowerCase().includes(state.filters.search.toLowerCase())
        )
      }

      // category
      if (state.filters.category) {
        filtered = filtered.filter(n => n.category === state.filters.category)
      }

      // sort
      const order = { 'Düşük': 1, 'Orta': 2, 'Yüksek': 3 }

      if (state.filters.sort === 'low') {
        filtered.sort((a, b) => order[a.priority] - order[b.priority])
      }

      if (state.filters.sort === 'high') {
        filtered.sort((a, b) => order[b.priority] - order[a.priority])
      }

      return filtered
    }
  },

  actions: {
    addNote(note) {
      this.notes.push(note)
      this.saveToLocalStorage()
    },

    deleteNote(id) {
      this.notes = this.notes.filter(n => n.id !== id)
      this.saveToLocalStorage()
    },

    updateNote(updatedNote) {
      const index = this.notes.findIndex(n => n.id === updatedNote.id)
      this.notes[index] = updatedNote
      this.saveToLocalStorage()
    },

   
    setFilters(filters) {
      this.filters = filters
    },

    saveToLocalStorage() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
  }
})