import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnalyticsStore = defineStore('analytics', () => {
  const isLoading = ref<boolean>(false)
  const totalUsers = ref<number>(0)
  const totalEvents = ref<number>(0)
  const activeEvents = ref<number>(0)
  const { client } = useSupabase()

  const fetchAnalytics = async () => {
    isLoading.value = true
    try {
      // Fetch total users
      const { count: usersCount, error: usersError } = await client
        .from('profiles')
        .select('*', { count: 'exact', head: true })
      
      if (!usersError && usersCount !== null) {
        totalUsers.value = usersCount
      }

      // Fetch total events
      const { count: eventsCount, error: eventsError } = await client
        .from('events')
        .select('*', { count: 'exact', head: true })
        
      if (!eventsError && eventsCount !== null) {
        totalEvents.value = eventsCount
      }

      // Fetch active events (events that are not cancelled)
      const { count: activeCount, error: activeError } = await client
        .from('events')
        .select('*', { count: 'exact', head: true })
        .neq('status', 'cancelled')
        
      if (!activeError && activeCount !== null) {
        activeEvents.value = activeCount
      }

    } catch (err) {
      console.error('Error fetching analytics:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    totalUsers,
    totalEvents,
    activeEvents,
    fetchAnalytics
  }
})
