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
        .select('*')
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

  const getRegistration = (eventId: number) => {
    return myRegistrations.value.find(r => r.event_id === eventId)
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

  const submitFeedback = async (eventId: number, message: string) => {
    if (!authStore.user) return false

    const registration = getRegistration(eventId)
    // Check if registered and approved (noting the DB typo 'staus')
    if (!registration || registration.staus !== 'approved') {
      alert('You can only submit feedback for events you are approved to attend.')
      return false
    }

    isLoading.value = true
    try {
      // Prevent duplicate feedback
      const { count, error: countError } = await client
        .from('feedbacks')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', eventId)
        .eq('user_id', authStore.user.id)
      
      if (countError) throw countError
      
      if (count && count > 0) {
        alert('You have already submitted feedback for this event.')
        return false
      }

      const { error } = await table('feedbacks').insert({
        event_id: eventId,
        user_id: authStore.user.id,
        message
      })
      if (error) throw error
      alert('Feedback submitted successfully!')
      return true
    } catch (err) {
      console.error('Failed to submit feedback:', err)
      alert('Failed to submit feedback. Please try again.')
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
    getRegistration,
    register,
    unregister,
    submitFeedback
  }
})
