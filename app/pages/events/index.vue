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
            <div class="pt-4 border-t border-gray-100 mt-auto flex flex-col gap-2">
              <button 
                v-if="authStore.user?.role === 'admin' || authStore.user?.role === 'staff'"
                @click="openRegistrationsModal(event)"
                class="w-full inline-flex justify-center items-center py-2 px-4 border border-blue-200 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none transition-colors"
              >
                View Registrations
              </button>
              <div class="flex gap-2">
                <button 
                  @click="openModifyEvent(event)"
                  class="flex-1 inline-flex justify-center items-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                >
                  Modify
                </button>
                <button 
                  @click="openDeleteEventModal(event)"
                  class="flex-1 inline-flex justify-center items-center py-2 px-4 border border-red-200 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <!-- Delete Event Modal -->
    <div v-if="isDeleteEventModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="isDeleteEventModalOpen = false"></div>
      
      <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 border-t-[6px] border-red-600">
        <div class="p-8 relative">
          <div class="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 shadow-inner border border-red-100">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </div>
          
          <h3 class="text-2xl font-black text-slate-800 mb-2">Delete Event</h3>
          <p class="text-slate-500 font-medium mb-8 leading-relaxed">
            WARNING: You are about to permanently delete <span class="text-slate-800 font-bold">"{{ selectedEventToDelete?.title }}"</span>. This action cannot be undone.
          </p>
          
          <div class="flex items-center gap-3">
            <button 
              @click="isDeleteEventModalOpen = false"
              class="flex-1 py-3 px-4 border border-slate-200 text-sm font-bold rounded-xl text-slate-600 bg-white hover:bg-slate-50 focus:outline-none transition-all hover:border-slate-300"
            >
              Go Back
            </button>
            <button 
              @click="confirmDeleteEvent"
              :disabled="isDeletingEvent"
              class="flex-1 py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none shadow-lg shadow-red-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 flex justify-center items-center"
            >
              <svg v-if="isDeletingEvent" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {{ isDeletingEvent ? 'Deleting...' : 'Delete Event' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Registrations Modal -->
    <div v-if="isRegistrationsModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="isRegistrationsModalOpen = false"></div>
      
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden transform transition-all duration-300 border border-gray-200">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 class="text-xl font-bold text-gray-900">Registrations: {{ selectedEventForRegistrations?.title }}</h3>
          <button @click="isRegistrationsModalOpen = false" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto flex-1">
          <div v-if="!selectedEventForRegistrations?.event_registrations?.length" class="text-center py-10 text-gray-500">
            No registrations for this event yet.
          </div>
          <div v-else class="space-y-4">
            <div v-for="reg in selectedEventForRegistrations.event_registrations" :key="reg.id" class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div>
                <p class="font-medium text-gray-900">{{ reg.profiles?.full_name || 'Unknown User' }}</p>
                <div class="flex items-center mt-1">
                  <span class="text-sm text-gray-500 mr-2">Status:</span>
                  <span 
                    :class="{
                      'bg-yellow-100 text-yellow-800': reg.staus === 'pending' || !reg.staus,
                      'bg-green-100 text-green-800': reg.staus === 'approved',
                      'bg-red-100 text-red-800': reg.staus === 'rejected'
                    }"
                    class="px-2 py-0.5 rounded text-xs font-medium capitalize"
                  >
                    {{ reg.staus || 'pending' }}
                  </span>
                </div>
              </div>
              <div class="flex gap-2" v-if="reg.staus === 'pending' || !reg.staus">
                <button 
                  @click="handleUpdateStatus(reg.id, 'approved', reg.user_id)"
                  class="px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 rounded-md text-sm font-medium transition-colors"
                >
                  Approve
                </button>
                <button 
                  @click="handleUpdateStatus(reg.id, 'rejected', reg.user_id)"
                  class="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-md text-sm font-medium transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
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
const isDeleteEventModalOpen = ref(false)
const selectedEventToDelete = ref<any>(null)
const isDeletingEvent = ref(false)

const isRegistrationsModalOpen = ref(false)
const selectedEventForRegistrations = ref<any>(null)

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

// Actions
const openModifyEvent = (event: any) => {
  // For now we will just alert, but you could easily pass this to your create/edit form
  alert(`Modify logic goes here for: ${event.title}\nYou can wire this up to an edit page later!`)
}

const openDeleteEventModal = (event: any) => {
  selectedEventToDelete.value = event
  isDeleteEventModalOpen.value = true
}

const openRegistrationsModal = (event: any) => {
  selectedEventForRegistrations.value = event
  isRegistrationsModalOpen.value = true
}

const handleUpdateStatus = async (registrationId: number, status: 'approved' | 'rejected', userId: string) => {
  if (!selectedEventForRegistrations.value) return;
  try {
    await eventStore.updateRegistrationStatus(
      registrationId, 
      status, 
      userId, 
      selectedEventForRegistrations.value.title
    );
    // update local state so UI reflects changes immediately
    const reg = selectedEventForRegistrations.value.event_registrations.find((r: any) => r.id === registrationId);
    if (reg) {
      reg.staus = status;
    }
  } catch (err) {
    alert('Failed to update status');
  }
}

const confirmDeleteEvent = async () => {
  if (!selectedEventToDelete.value) return
  isDeletingEvent.value = true
  try {
    await eventStore.deleteEvent(selectedEventToDelete.value.id)
    isDeleteEventModalOpen.value = false
  } catch (e) {
    alert('Failed to delete event.')
  } finally {
    isDeletingEvent.value = false
  }
}
</script>
