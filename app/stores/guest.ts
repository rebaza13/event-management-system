import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGuestStore = defineStore('guest', () => {
  const isLoading = ref<boolean>(false)
  const events = ref<any[]>([])
  const { client } = useSupabase()

  const fetchPublicEvents = async () => {
    isLoading.value = true
    try {
      const { anonClient } = useSupabase()
      const { data, error } = await anonClient
        .from('events')
        .select(`
          *,
          media_assets ( file_url )
        `)
        // Filter out cancelled events if needed, for now just show all or just published
        .neq('status', 'cancelled')
        .order('created_at', { ascending: false })

      if (error) throw error
      events.value = data || []
    } catch (err) {
      console.error('Error fetching public events:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    events,
    fetchPublicEvents
  }
})
