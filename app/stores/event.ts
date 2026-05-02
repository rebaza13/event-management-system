import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EventCreate, Event } from '~/models'

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
          event_registrations ( user_id )
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
    if (!user.value) return
    try {
      const { error } = await table('event_registrations').insert({
        event_id: eventId,
        user_id: user.value.id
      })
      
      // If profile is missing (foreign key error on profiles table), create it and retry
      if (error && error.code === '23503' && error.message.includes('profiles')) {
        const { error: profileError } = await table('profiles').insert({
          id: user.value.id,
          full_name: user.value.user_metadata?.full_name || user.value.email?.split('@')[0] || 'User',
          role: 'user'
        })
        
        if (profileError) throw profileError
        
        // Retry registration
        const { error: retryError } = await table('event_registrations').insert({
          event_id: eventId,
          user_id: user.value.id
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

  const cancelRegistration = async (eventId: number) => {
    if (!user.value) return
    try {
      const { error } = await table('event_registrations')
        .delete()
        .match({ event_id: eventId, user_id: user.value.id })
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

  return {
    isLoading,
    events,
    createEvent,
    fetchEvents,
    registerForEvent,
    cancelRegistration,
    cancelEvent
  }
})
