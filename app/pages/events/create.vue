<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
    <div class="w-full max-w-4xl mx-auto">
      
      <!-- Back Navigation -->
      <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Dashboard
      </NuxtLink>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        <!-- Header Section -->
        <div class="px-8 py-6 border-b border-gray-100">
          <h2 class="text-2xl font-bold text-gray-900">Create New Event</h2>
          <p class="text-gray-500 text-sm mt-1">Fill out the form below to host and publish a new event.</p>
        </div>

        <div class="p-8">
          <form @submit.prevent="handleCreateEvent" class="space-y-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Title -->
              <div class="md:col-span-2">
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Event Title <span class="text-red-500">*</span></label>
                <input 
                  id="title" 
                  v-model="eventForm.title" 
                  type="text" 
                  required 
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none" 
                  placeholder="Summer Tech Conference 2026" 
                />
              </div>

              <!-- Category -->
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input 
                  id="category" 
                  v-model="eventForm.category" 
                  type="text" 
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none" 
                  placeholder="Technology" 
                />
              </div>

              <!-- Capacity -->
              <div>
                <label for="capacity" class="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input 
                  id="capacity" 
                  v-model.number="eventForm.capacity" 
                  type="number" 
                  min="1"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none" 
                  placeholder="500" 
                />
              </div>

              <!-- Start Date -->
              <div>
                <label for="startAt" class="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                <input 
                  id="startAt" 
                  v-model="eventForm.start_at" 
                  type="datetime-local" 
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none" 
                />
              </div>

              <!-- End Date -->
              <div>
                <label for="endAt" class="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
                <input 
                  id="endAt" 
                  v-model="eventForm.end_at" 
                  type="datetime-local" 
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none" 
                />
              </div>

              <!-- Location -->
              <div class="md:col-span-2">
                <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  id="location" 
                  v-model="eventForm.location" 
                  type="text" 
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none" 
                  placeholder="Moscone Center, San Francisco / Online" 
                />
              </div>

              <!-- Description -->
              <div class="md:col-span-2">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Event Description</label>
                <textarea 
                  id="description" 
                  v-model="eventForm.description" 
                  rows="4"
                  class="block w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none resize-y" 
                  placeholder="What is this event about?" 
                ></textarea>
              </div>

              <!-- Image Upload -->
              <div class="md:col-span-2 pt-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Event Banner / Image</label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="space-y-1 text-center">
                    <svg v-if="!imagePreviewUrl" class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <img v-else :src="imagePreviewUrl" class="mx-auto max-h-48 rounded shadow-sm mb-4 object-contain" />
                    
                    <div class="flex text-sm text-gray-600 justify-center">
                      <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>{{ imageFile ? 'Change image' : 'Upload a file' }}</span>
                        <input id="file-upload" name="file-upload" type="file" accept="image/*" class="sr-only" @change="handleFileChange">
                      </label>
                      <p v-if="!imageFile" class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      {{ imageFile ? imageFile.name : 'PNG, JPG, GIF up to 5MB' }}
                    </p>
                  </div>
                </div>
              </div>

            </div>
            
            <!-- Action Area -->
            <div class="pt-6 mt-8 border-t border-gray-100 flex items-center justify-between">
              <div class="flex-1 mr-4 min-h-[40px]">
                <!-- Feedback Message -->
                <div v-if="message" :class="[messageType === 'success' ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-700 bg-red-50 border-red-200', 'text-sm px-4 py-3 rounded-lg border font-medium flex items-center gap-2']">
                  {{ message }}
                </div>
              </div>

              <button 
                type="submit" 
                :disabled="eventStore.isLoading"
                class="inline-flex items-center justify-center py-2.5 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="eventStore.isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>{{ eventStore.isLoading ? 'Creating...' : 'Create Event' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEventStore } from '~/stores/event'
import { useAuthStore } from '~/stores/auth'
import type { EventCreate } from '~/models'

definePageMeta({ layout: false, middleware: ['auth'] })

const eventStore = useEventStore()
const authStore = useAuthStore()

const getInitialFormState = (): EventCreate => ({
  title: '',
  description: '',
  location: '',
  start_at: '',
  end_at: '',
  category: '',
  capacity: undefined,
  status: 'draft',
  organizer_id: authStore.user?.id
})

const eventForm = ref<EventCreate>(getInitialFormState())
const message = ref('')
const messageType = ref<'success'|'error'>('success')

const imageFile = ref<File | null>(null)
const imagePreviewUrl = ref<string | null>(null)

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    imageFile.value = file
    imagePreviewUrl.value = URL.createObjectURL(file)
  }
}

let timeoutId: NodeJS.Timeout

const handleCreateEvent = async () => {
  if (timeoutId) clearTimeout(timeoutId)
  message.value = ''
  
  if (!eventForm.value.title?.trim()) {
    messageType.value = 'error'
    message.value = 'Event title is required.'
    return
  }

  try {
    const createdEvent = await eventStore.createEvent({
      ...eventForm.value,
      organizer_id: authStore.user?.id
    }, imageFile.value)

    if (createdEvent) {
      messageType.value = 'success'
      message.value = 'Event created successfully!'
      
      // Reset form
      eventForm.value = getInitialFormState()
      imageFile.value = null
      imagePreviewUrl.value = null
      
      timeoutId = setTimeout(() => {
        message.value = ''
      }, 4000)
    } else {
      messageType.value = 'error'
      message.value = 'Failed to create event. Please try again.'
    }
  } catch (err: any) {
    messageType.value = 'error'
    message.value = err?.message || 'An error occurred while creating the event.'
  }
}
</script>
