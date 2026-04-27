import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EventCreate, Event } from '~/models'

export const useEventStore = defineStore('event', () => {
  const isLoading = ref<boolean>(false)
  const supabase = useSupabase()

  const createEvent = async (eventData: EventCreate): Promise<Event | null> => {
    isLoading.value = true
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single()

      if (error) {
        console.error('Error creating event:', error.message)
        throw error
      }
      return data
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    createEvent
  }
})
