import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EventCreate, Event } from '~/models'

export const useEventStore = defineStore('event', () => {
  const isLoading = ref<boolean>(false)
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

  return {
    isLoading,
    createEvent
  }
})
