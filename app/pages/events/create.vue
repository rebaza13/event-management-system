<template>
  <div class="min-h-screen relative flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden bg-slate-50">
    <!-- Beautiful Ambient Background -->
    <div class="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-300/30 blur-[100px] pointer-events-none animate-pulse duration-1000"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-violet-300/30 blur-[100px] pointer-events-none delay-700"></div>

    <div class="w-full max-w-3xl z-10 flex flex-col justify-center">
      <!-- Back Navigation -->
      <NuxtLink to="/" class="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-all mb-8 self-start">
        <div class="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center mr-3 group-hover:-translate-x-1 transition-transform">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </div>
        Back to Dashboard
      </NuxtLink>

      <!-- Event Container -->
      <div class="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-indigo-900/5 rounded-[2rem] overflow-hidden">
        
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-10 py-8 relative overflow-hidden">
          <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight relative z-10">Create New Event</h2>
          <p class="text-indigo-100 mt-2 relative z-10">Fill out the details below to host your next amazing event.</p>
        </div>

        <div class="pt-8 pb-10 px-10">
          <form @submit.prevent="handleCreateEvent" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Title -->
              <div class="group md:col-span-2">
                <label for="title" class="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">Event Title <span class="text-rose-500">*</span></label>
                <input 
                  id="title" 
                  v-model="eventForm.title" 
                  type="text" 
                  required 
                  class="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 font-medium placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 outline-none" 
                  placeholder="e.g. Summer Tech Conference 2026" 
                />
              </div>

              <!-- Category -->
              <div class="group">
                <label for="category" class="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">Category</label>
                <input 
                  id="category" 
                  v-model="eventForm.category" 
                  type="text" 
                  class="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 font-medium placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 outline-none" 
                  placeholder="e.g. Technology" 
                />
              </div>

              <!-- Capacity -->
              <div class="group">
                <label for="capacity" class="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">Capacity</label>
                <input 
                  id="capacity" 
                  v-model.number="eventForm.capacity" 
                  type="number" 
                  min="1"
                  class="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 font-medium placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 outline-none" 
                  placeholder="e.g. 500" 
                />
              </div>

              <!-- Start Date -->
              <div class="group">
                <label for="startAt" class="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">Start Date & Time</label>
                <input 
                  id="startAt" 
                  v-model="eventForm.start_at" 
                  type="datetime-local" 
                  class="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 font-medium placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 outline-none" 
                />
              </div>

              <!-- End Date -->
              <div class="group">
                <label for="endAt" class="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">End Date & Time</label>
                <input 
                  id="endAt" 
                  v-model="eventForm.end_at" 
                  type="datetime-local" 
                  class="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 font-medium placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 outline-none" 
                />
              </div>

              <!-- Location -->
              <div class="group md:col-span-2">
                <label for="location" class="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">Location</label>
                <input 
                  id="location" 
                  v-model="eventForm.location" 
                  type="text" 
                  class="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 font-medium placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 outline-none" 
                  placeholder="e.g. Moscone Center, San Francisco / Online Zoom" 
                />
              </div>

              <!-- Description -->
              <div class="group md:col-span-2">
                <label for="description" class="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">Event Description</label>
                <textarea 
                  id="description" 
                  v-model="eventForm.description" 
                  rows="4"
                  class="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 font-medium placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 outline-none resize-none" 
                  placeholder="Describe what your event is about, what attendees can expect..." 
                ></textarea>
              </div>
            </div>
            
            <!-- Action Area -->
            <div class="pt-6 border-t border-slate-100 flex items-center justify-between mt-8 min-h-[60px]">
               <div class="flex-1 mr-4">
                 <!-- Feedback Message -->
                 <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="transform translate-y-0 opacity-100" leave-to-class="transform -translate-y-2 opacity-0">
                    <div v-if="message" :class="[messageType === 'success' ? 'text-emerald-600 bg-emerald-50/50 border-emerald-100' : 'text-rose-600 bg-rose-50/50 border-rose-100', 'text-sm px-4 py-2.5 rounded-lg border font-medium flex items-center gap-2 backdrop-blur-sm']">
                      <svg v-if="messageType === 'success'" class="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                      <svg v-else class="w-5 h-5 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {{ message }}
                    </div>
                 </Transition>
               </div>

               <button 
                  type="submit" 
                  :disabled="eventStore.isLoading"
                  class="relative inline-flex flex-shrink-0 items-center justify-center py-3.5 px-8 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:bg-indigo-700 bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
                >
                  <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span class="relative flex items-center gap-2">
                    <svg v-if="eventStore.isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>{{ eventStore.isLoading ? 'Creating...' : 'Create Event' }}</span>
                  </span>
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

let timeoutId: NodeJS.Timeout

const handleCreateEvent = async () => {
  if (timeoutId) clearTimeout(timeoutId)
  message.value = ''
  
  if (!eventForm.value.title?.trim()) {
    messageType.value = 'error'
    message.value = 'Event title is required.'
    return
  }

  // Double submit prevention happens automatically because eventStore.isLoading disables the button

  try {
    const createdEvent = await eventStore.createEvent({
      ...eventForm.value,
      organizer_id: authStore.user?.id
    })

    if (createdEvent) {
      messageType.value = 'success'
      message.value = 'Event created successfully!'
      
      // Reset form
      eventForm.value = getInitialFormState()
      
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
