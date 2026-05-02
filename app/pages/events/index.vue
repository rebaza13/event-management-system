<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
    <div class="w-full max-w-6xl mx-auto">
      
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-2 transition-colors">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Dashboard
          </NuxtLink>
          <h1 class="text-3xl font-bold text-gray-900">Active Events</h1>
          <p class="text-gray-500 mt-1">Browse and register for upcoming events.</p>
        </div>
        <NuxtLink 
          to="/events/create" 
          class="inline-flex items-center justify-center py-2.5 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 transition-colors"
        >
          Create Event
        </NuxtLink>
      </div>

      <!-- Events List -->
      <div v-if="eventStore.isLoading && eventStore.events.length === 0" class="flex justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
      
      <div v-else-if="eventStore.events.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        <h3 class="text-lg font-medium text-gray-900">No events found</h3>
        <p class="mt-1 text-gray-500">Get started by creating a new event.</p>
        <div class="mt-6">
          <NuxtLink to="/events/create" class="inline-flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-200 transition-colors">
            Create Event
          </NuxtLink>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="event in eventStore.events" 
          :key="event.id" 
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md"
        >
          <!-- Event Image -->
          <div class="h-48 w-full bg-gray-100 relative">
            <img 
              v-if="event.media_assets && event.media_assets.length > 0" 
              :src="event.media_assets[0].file_url" 
              :alt="event.title" 
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              <svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <!-- Status Badge -->
            <div class="absolute top-4 right-4">
              <span 
                :class="[
                  event.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800',
                  'px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm'
                ]"
              >
                {{ event.status === 'cancelled' ? 'Cancelled' : 'Active' }}
              </span>
            </div>
          </div>
          
          <!-- Event Details -->
          <div class="p-6 flex-1 flex flex-col">
            <div class="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider">{{ event.category || 'General' }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ event.title }}</h3>
            <p class="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{{ event.description }}</p>
            
            <div class="space-y-2 mb-6">
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {{ formatDate(event.start_at) }}
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span class="truncate">{{ event.location || 'TBA' }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                {{ event.event_registrations?.length || 0 }} / {{ event.capacity || '∞' }} Registered
              </div>
            </div>
            
            <!-- Actions -->
            <div class="pt-4 border-t border-gray-100 mt-auto">
              <!-- If Event is cancelled -->
              <div v-if="event.status === 'cancelled'" class="text-center text-sm text-red-600 font-medium py-2">
                This event has been cancelled
              </div>
              <div v-else>
                <!-- If current user is organizer -->
                <div v-if="isOrganizer(event)" class="flex gap-2">
                  <button 
                    @click="openCancelEventModal(event)"
                    class="w-full inline-flex justify-center items-center py-2 px-4 border border-red-200 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    Cancel Event
                  </button>
                </div>
                <!-- If normal user -->
                <div v-else>
                  <button 
                    v-if="isRegistered(event)"
                    @click="openCancelRegistrationModal(event)"
                    class="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                  >
                    Cancel Registration
                  </button>
                  <button 
                    v-else
                    @click="openRegistrationModal(event)"
                    :disabled="isFull(event)"
                    :class="[
                      isFull(event) ? 'bg-gray-300 cursor-not-allowed text-white' : 'bg-black hover:bg-gray-800 text-white',
                      'w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors'
                    ]"
                  >
                    {{ isFull(event) ? 'Event Full' : 'Register Now' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <!-- Registration Confirmation Modal -->
    <div v-if="isRegistrationModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="isRegistrationModalOpen = false"></div>
      
      <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300">
        <div class="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <div class="p-8 relative">
          <div class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 shadow-inner border border-indigo-100">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          
          <h3 class="text-2xl font-black text-slate-800 mb-2">Confirm Registration</h3>
          <p class="text-slate-500 font-medium mb-6 leading-relaxed">
            You're about to secure your spot for <span class="text-slate-800 font-bold">"{{ selectedEventForRegistration?.title }}"</span>.
          </p>
          
          <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-8 space-y-4 shadow-sm">
            <div class="flex items-center text-sm font-bold text-slate-600">
              <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 mr-3 shadow-sm">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              {{ formatDate(selectedEventForRegistration?.start_at) }}
            </div>
            <div class="flex items-center text-sm font-bold text-slate-600">
              <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 mr-3 shadow-sm">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <span class="truncate">{{ selectedEventForRegistration?.location || 'TBA' }}</span>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <button 
              @click="isRegistrationModalOpen = false"
              class="flex-1 py-3 px-4 border border-slate-200 text-sm font-bold rounded-xl text-slate-600 bg-white hover:bg-slate-50 focus:outline-none transition-all hover:border-slate-300"
            >
              Cancel
            </button>
            <button 
              @click="confirmRegistration"
              :disabled="isRegistering"
              class="flex-1 py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
            >
              <svg v-if="isRegistering" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {{ isRegistering ? 'Processing...' : 'Confirm' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Registration Modal -->
    <div v-if="isCancelRegistrationModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="isCancelRegistrationModalOpen = false"></div>
      
      <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 border-t-[6px] border-rose-500">
        <div class="absolute top-0 right-0 w-48 h-48 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div class="p-8 relative">
          <div class="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6 shadow-inner border border-rose-100">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          
          <h3 class="text-2xl font-black text-slate-800 mb-2">Cancel Registration</h3>
          <p class="text-slate-500 font-medium mb-8 leading-relaxed">
            Are you sure you want to cancel your registration for <span class="text-slate-800 font-bold">"{{ selectedEventForCancellation?.title }}"</span>? This will free up your spot for someone else.
          </p>
          
          <div class="flex items-center gap-3">
            <button 
              @click="isCancelRegistrationModalOpen = false"
              class="flex-1 py-3 px-4 border border-slate-200 text-sm font-bold rounded-xl text-slate-600 bg-white hover:bg-slate-50 focus:outline-none transition-all hover:border-slate-300"
            >
              Keep Spot
            </button>
            <button 
              @click="confirmCancelRegistration"
              :disabled="isCancellingRegistration"
              class="flex-1 py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-rose-600 hover:bg-rose-700 focus:outline-none shadow-lg shadow-rose-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 flex justify-center items-center"
            >
              <svg v-if="isCancellingRegistration" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {{ isCancellingRegistration ? 'Cancelling...' : 'Yes, Cancel' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Event Modal -->
    <div v-if="isCancelEventModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="isCancelEventModalOpen = false"></div>
      
      <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 border-t-[6px] border-red-600">
        <div class="p-8 relative">
          <div class="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 shadow-inner border border-red-100">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          
          <h3 class="text-2xl font-black text-slate-800 mb-2">Cancel Entire Event</h3>
          <p class="text-slate-500 font-medium mb-8 leading-relaxed">
            WARNING: You are about to permanently cancel <span class="text-slate-800 font-bold">"{{ selectedEventToCancel?.title }}"</span>. All attendees will lose their registration. This action cannot be undone.
          </p>
          
          <div class="flex items-center gap-3">
            <button 
              @click="isCancelEventModalOpen = false"
              class="flex-1 py-3 px-4 border border-slate-200 text-sm font-bold rounded-xl text-slate-600 bg-white hover:bg-slate-50 focus:outline-none transition-all hover:border-slate-300"
            >
              Go Back
            </button>
            <button 
              @click="confirmCancelEvent"
              :disabled="isCancellingEvent"
              class="flex-1 py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none shadow-lg shadow-red-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 flex justify-center items-center"
            >
              <svg v-if="isCancellingEvent" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {{ isCancellingEvent ? 'Processing...' : 'Cancel Event' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventStore } from '~/stores/event'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: false, middleware: ['auth'] })

const eventStore = useEventStore()
const authStore = useAuthStore()

// State
const isRegistrationModalOpen = ref(false)
const selectedEventForRegistration = ref<any>(null)
const isRegistering = ref(false)

const isCancelRegistrationModalOpen = ref(false)
const selectedEventForCancellation = ref<any>(null)
const isCancellingRegistration = ref(false)

const isCancelEventModalOpen = ref(false)
const selectedEventToCancel = ref<any>(null)
const isCancellingEvent = ref(false)

onMounted(() => {
  eventStore.fetchEvents()
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'TBA'
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date)
}

const isOrganizer = (event: any) => {
  return authStore.user?.id === event.organizer_id
}

const isRegistered = (event: any) => {
  if (!authStore.user || !event.event_registrations) return false
  return event.event_registrations.some((reg: any) => reg.user_id === authStore.user?.id)
}

const isFull = (event: any) => {
  if (!event.capacity) return false
  const registeredCount = event.event_registrations?.length || 0
  return registeredCount >= event.capacity
}

// Actions
const openRegistrationModal = (event: any) => {
  if (isFull(event)) return
  selectedEventForRegistration.value = event
  isRegistrationModalOpen.value = true
}

const confirmRegistration = async () => {
  if (!selectedEventForRegistration.value) return
  isRegistering.value = true
  try {
    await eventStore.registerForEvent(selectedEventForRegistration.value.id)
    isRegistrationModalOpen.value = false
  } catch (e) {
    alert('Failed to register. Please try again.')
  } finally {
    isRegistering.value = false
  }
}

const openCancelRegistrationModal = (event: any) => {
  selectedEventForCancellation.value = event
  isCancelRegistrationModalOpen.value = true
}

const confirmCancelRegistration = async () => {
  if (!selectedEventForCancellation.value) return
  isCancellingRegistration.value = true
  try {
    await eventStore.cancelRegistration(selectedEventForCancellation.value.id)
    isCancelRegistrationModalOpen.value = false
  } catch (e) {
    alert('Failed to cancel registration.')
  } finally {
    isCancellingRegistration.value = false
  }
}

const openCancelEventModal = (event: any) => {
  selectedEventToCancel.value = event
  isCancelEventModalOpen.value = true
}

const confirmCancelEvent = async () => {
  if (!selectedEventToCancel.value) return
  isCancellingEvent.value = true
  try {
    await eventStore.cancelEvent(selectedEventToCancel.value.id)
    isCancelEventModalOpen.value = false
  } catch (e) {
    alert('Failed to cancel event.')
  } finally {
    isCancellingEvent.value = false
  }
}
</script>
