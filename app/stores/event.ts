import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EventCreate, Event } from '~/models'
import { useAuthStore } from './auth'

export const useEventStore = defineStore('event', () => {
  const isLoading = ref<boolean>(false)
  const events = ref<any[]>([])
  const { table, client, user } = useSupabase()

  const createEvent = async (eventData: EventCreate, imageFile?: File | null): Promise<Event | null> => {
    isLoading.value = true
    try {
      // 1. Create the event first
      const { data: event, error: eventError } = await table('events')
        .insert([eventData])
        .select()
        .single()

      if (eventError) {
        console.error('Error creating event:', eventError.message)
        throw eventError
      }

      // 2. If an image file was provided, upload it and link it
      if (imageFile && event) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${event.id}-${Date.now()}.${fileExt}`
        const filePath = `images/${fileName}`

        // Upload to a storage bucket named 'event-assets'
        const { error: uploadError, data: uploadData } = await client.storage
          .from('event-assets')
          .upload(filePath, imageFile)

        if (!uploadError && uploadData) {
          // Get the public URL for the uploaded image
          const { data: publicUrlData } = client.storage.from('event-assets').getPublicUrl(filePath)

          // Insert the record into media_assets table
          await table('media_assets').insert([{
            event_id: event.id,
            file_url: publicUrlData.publicUrl,
            uploaded_by: user.value?.id || null
          }])
        } else {
          console.error('Image upload failed:', uploadError?.message)
          // We don't throw here so the event is still created even if image fails
        }
      }

      return event
    } finally {
      isLoading.value = false
    }
  }

  const fetchEvents = async () => {
    isLoading.value = true
    try {
      const { data, error } = await client
        .from('events')
        .select(`
          *,
          media_assets ( file_url ),
          event_registrations ( id, user_id, staus, profiles ( full_name ) )
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      events.value = data || []
    } catch (err) {
      console.error('Error fetching events:', err)
    } finally {
      isLoading.value = false
    }
  }

  const registerForEvent = async (eventId: number) => {
    const authStore = useAuthStore()
    if (!authStore.user?.id) return

    try {
      // @ts-ignore - Using 'staus' as per user's database schema typo
      const { error } = await table('event_registrations').insert({
        event_id: eventId,
        user_id: authStore.user.id,
        staus: 'pending'
      })
      
      // If profile is missing (foreign key error on profiles table), create it and retry
      if (error && error.code === '23503' && error.message.includes('profiles')) {
        const { error: profileError } = await table('profiles').insert({
          id: authStore.user.id,
          full_name: authStore.user.full_name || authStore.user.email?.split('@')[0] || 'User',
          role: 'user'
        })
        
        if (profileError) throw profileError
        
        // Retry registration
        // @ts-ignore
        const { error: retryError } = await table('event_registrations').insert({
          event_id: eventId,
          user_id: authStore.user.id,
          staus: 'pending'
        })
        if (retryError) throw retryError
      } else if (error) {
        throw error
      }

      await fetchEvents()
    } catch (err) {
      console.error('Error registering:', err)
      throw err
    }
  }

  const updateRegistrationStatus = async (registrationId: number, status: 'approved' | 'rejected' | 'pending', userId: string, eventTitle: string) => {
    try {
      // @ts-ignore
      const { error } = await table('event_registrations')
        .update({ staus: status })
        .match({ id: registrationId })
      
      if (error) throw error

      const message = `Your registration for "${eventTitle}" has been ${status}.`
      const { error: notifError } = await table('notifications').insert({
        user_id: userId,
        message: message
      })
      if (notifError) console.error('Error creating notification:', notifError)

      await fetchEvents()
    } catch (err) {
      console.error('Error updating registration status:', err)
      throw err
    }
  }

  const cancelRegistration = async (eventId: number) => {
    const authStore = useAuthStore()
    if (!authStore.user?.id) return
    try {
      const { error } = await table('event_registrations')
        .delete()
        .match({ event_id: eventId, user_id: authStore.user.id })
      if (error) throw error
      await fetchEvents()
    } catch (err) {
      console.error('Error cancelling registration:', err)
      throw err
    }
  }

  const cancelEvent = async (eventId: number) => {
    try {
      const { error } = await table('events')
        .update({ status: 'cancelled' })
        .match({ id: eventId })
      if (error) throw error
      await fetchEvents()
    } catch (err) {
      console.error('Error cancelling event:', err)
      throw err
    }
  }

  const deleteEvent = async (eventId: number) => {
    isLoading.value = true
    try {
      const { error } = await table('events')
        .delete()
        .match({ id: eventId })
      if (error) throw error
      
      // Update local state
      events.value = events.value.filter(e => e.id !== eventId)
    } catch (err) {
      console.error('Error deleting event:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateEvent = async (eventId: number, eventData: Partial<EventCreate>, imageFile?: File | null): Promise<Event | null> => {
    isLoading.value = true
    try {
      const { data: event, error: eventError } = await table('events')
        .update(eventData)
        .match({ id: eventId })
        .select()
        .single()

      if (eventError) {
        console.error('Error updating event:', eventError.message)
        throw eventError
      }

      if (imageFile && event) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${event.id}-${Date.now()}.${fileExt}`
        const filePath = `images/${fileName}`

        const { error: uploadError, data: uploadData } = await client.storage
          .from('event-assets')
          .upload(filePath, imageFile)

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = client.storage.from('event-assets').getPublicUrl(filePath)

          await table('media_assets').delete().match({ event_id: eventId })
          await table('media_assets').insert([{
            event_id: event.id,
            file_url: publicUrlData.publicUrl,
            uploaded_by: user.value?.id || null
          }])
        } else {
          console.error('Image upload failed:', uploadError?.message)
        }
      }

      // Update local state without full refetch if possible, but for simplicity fetchEvents works too.
      // We will let the component refetch if needed.
      return event
    } finally {
      isLoading.value = false
    }
  }

  const fetchFeedbacks = async (eventId: number) => {
    try {
      const { data, error } = await table('feedbacks')
        .select(`
          id,
          message,
          created_at,
          user_id,
          profiles ( full_name )
        `)
        .eq('event_id', eventId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (err) {
      console.error('Error fetching feedbacks:', err)
      return []
    }
  }

  return {
    isLoading,
    events,
    createEvent,
    fetchEvents,
    registerForEvent,
    updateRegistrationStatus,
    cancelRegistration,
    cancelEvent,
    deleteEvent,
    updateEvent,
    fetchFeedbacks
  }
})
