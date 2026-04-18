import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => ({
    list: [] as any[]
  })
})