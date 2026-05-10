import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { useEventStore } from './event'

export const useStudentStore = defineStore('student', () => {
  const authStore = useAuthStore()
  const eventStore = useEventStore()
  const { table, client } = useSupabase()

  const myRegistrations = ref<any[]>([])
  const isLoading = ref(false)

  const fetchMyRegistrations = async () => {
    if (!authStore.user) return
    isLoading.value = true
    try {
      const { data, error } = await table('event_registrations')
        .select('event_id')
        .eq('user_id', authStore.user.id)
      
      if (error) throw error
      myRegistrations.value = data || []
    } catch (err) {
      console.error('Error fetching registrations:', err)
    } finally {
      isLoading.value = false
    }
  }

  const isRegistered = (eventId: number) => {
    return myRegistrations.value.some(r => r.event_id === eventId)
  }

  const register = async (eventId: number) => {
    isLoading.value = true
    try {
      await eventStore.registerForEvent(eventId)
      await fetchMyRegistrations()
      return true
    } catch (err) {
      console.error('Registration failed:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const unregister = async (eventId: number) => {
    isLoading.value = true
    try {
      await eventStore.cancelRegistration(eventId)
      await fetchMyRegistrations()
      return true
    } catch (err) {
      console.error('Unregistration failed:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    myRegistrations,
    isLoading,
    fetchMyRegistrations,
    isRegistered,
    register,
    unregister
  }
})
