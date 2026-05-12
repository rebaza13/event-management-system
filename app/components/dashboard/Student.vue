<template>
  <div class="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
    <!-- Sidebar -->
    <aside v-if="authStore.user?.role === 'student'" class="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex z-10 transition-all duration-300">
      <div class="p-6 border-b border-slate-100 flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center shadow-sm">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
        </div>
        <span class="font-bold text-xl tracking-tight text-slate-800">Student<span class="text-gray-900">Hub</span></span>
      </div>
      
      <nav class="flex-1 px-4 py-6 space-y-1">
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Main Menu</div>
        <button @click="activeTab = 'events'" :class="[activeTab === 'events' ? 'bg-gray-100 text-black' : 'text-slate-600 hover:bg-slate-50']" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group">
          <svg :class="[activeTab === 'events' ? 'text-gray-900' : 'text-slate-400 group-hover:text-slate-600']" class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          Explore Events
        </button>
        <button @click="activeTab = 'my-events'" :class="[activeTab === 'my-events' ? 'bg-gray-100 text-black' : 'text-slate-600 hover:bg-slate-50']" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group">
          <svg :class="[activeTab === 'my-events' ? 'text-gray-900' : 'text-slate-400 group-hover:text-slate-600']" class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
          My Registrations
        </button>
      </nav>

      <div class="p-4 border-t border-slate-100 mt-auto">
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-all font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Log Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Topbar -->
      <header class="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 flex justify-between items-center z-10 sticky top-0">
        <div class="flex items-center gap-4">
          <!-- Mobile Sidebar Toggle (Simplified) -->
          <div class="md:hidden w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-slate-900 tracking-tight">
              {{ activeTab === 'events' ? 'Discovery' : 'My Schedule' }}
            </h1>
            <p class="text-sm text-slate-500 mt-0.5">
              {{ activeTab === 'events' ? 'Find and join exciting campus events.' : 'Manage your upcoming event participations.' }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Notification Bell -->
          <div class="relative">
            <button @click="showNotifications = !showNotifications" class="relative p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors focus:outline-none">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              <span v-if="notifications.length > 0" class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            
            <!-- Dropdown -->
            <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 transform origin-top-right transition-all">
              <div class="p-4 border-b border-slate-100 bg-slate-50/80 flex justify-between items-center backdrop-blur-sm">
                <h3 class="font-bold text-slate-900">Notifications</h3>
                <button v-if="notifications.length > 0" @click="clearNotifications" class="text-xs font-semibold text-gray-900 hover:text-black transition-colors">Clear All</button>
              </div>
              <div class="max-h-[28rem] overflow-y-auto scrollbar-hide">
                <div v-if="notifications.length === 0" class="p-8 text-center flex flex-col items-center">
                  <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <svg class="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                  </div>
                  <p class="text-slate-500 text-sm font-medium">You're all caught up!</p>
                </div>
                <div v-else class="divide-y divide-slate-50">
                  <div v-for="notif in notifications" :key="notif.id" class="p-4 hover:bg-slate-50 transition-colors group relative">
                    <p class="text-sm text-slate-700 leading-relaxed pr-6">{{ notif.message }}</p>
                    <span class="text-[11px] font-medium text-slate-400 mt-2 block">{{ formatDate(notif.created_at) }}</span>
                    <button @click="deleteNotification(notif.id)" class="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all focus:outline-none">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-right hidden sm:block">
            <div class="text-sm font-semibold text-slate-900">{{ authStore.user?.full_name || 'Student' }}</div>
            <div class="text-xs text-gray-900 font-medium capitalize">Student Member</div>
          </div>
          <NuxtLink to="/profile" class="h-10 w-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-bold border border-gray-200 hover:bg-gray-200 transition-colors">
            {{ (authStore.user?.full_name || 'S').charAt(0).toUpperCase() }}
          </NuxtLink>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="p-6 sm:p-8 flex-1 overflow-y-auto scrollbar-hide bg-slate-50">
        <div class="max-w-6xl mx-auto">
          
          <!-- Loading State -->
          <div v-if="eventStore.isLoading || studentStore.isLoading" class="flex flex-col items-center justify-center py-20">
            <div class="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
            <p class="mt-4 text-slate-500 font-medium animate-pulse">Updating events...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredEvents.length === 0" class="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div class="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900">No events found</h3>
            <p class="text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
              {{ activeTab === 'events' ? 'There are no public events available at the moment. Check back later!' : "You haven't registered for any events yet. Explore the discovery tab to find something interesting!" }}
            </p>
            <button v-if="activeTab === 'my-events'" @click="activeTab = 'events'" class="mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-colors shadow-lg shadow-gray-200">
              Explore Events
            </button>
          </div>

          <!-- Events Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="event in filteredEvents" :key="event.id" class="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <!-- Event Image -->
              <div class="h-48 bg-slate-100 relative overflow-hidden">
                <img 
                  v-if="event.media_assets?.[0]?.file_url" 
                  :src="event.media_assets[0].file_url" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Event cover"
                >
                <div v-else class="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                   <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <!-- Badge -->
                <div class="absolute top-4 left-4">
                  <span :class="[
                    event.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'
                  ]" class="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border backdrop-blur-sm shadow-sm">
                    {{ event.status }}
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 flex-1 flex flex-col">
                <div class="flex items-center gap-2 text-gray-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
                  {{ event.category || 'General' }}
                </div>
                <h3 class="text-xl font-bold text-slate-900 line-clamp-1 mb-2">{{ event.title }}</h3>
                <p class="text-slate-500 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">{{ event.description }}</p>
                
                <div class="space-y-3 mb-6 flex-1">
                  <div class="flex items-center gap-3 text-slate-600 text-sm">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {{ event.location }}
                  </div>
                  <div class="flex items-center gap-3 text-slate-600 text-sm">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {{ formatDate(event.start_at) }}
                  </div>
                </div>

                <!-- Action Button -->
                <div v-if="studentStore.isRegistered(event.id)">
                  <div class="flex flex-col gap-2">
                    <button 
                      @click="openCancelModal(event)"
                      :class="[
                        studentStore.getRegistration(event.id)?.staus === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        studentStore.getRegistration(event.id)?.staus === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                        'bg-amber-50 text-amber-700 border-amber-100'
                      ]"
                      class="w-full py-3 border rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <svg v-if="studentStore.getRegistration(event.id)?.staus === 'approved'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                      <svg v-else-if="studentStore.getRegistration(event.id)?.staus === 'rejected'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      
                      {{ 
                        studentStore.getRegistration(event.id)?.staus === 'approved' ? 'Approved' : 
                        studentStore.getRegistration(event.id)?.staus === 'rejected' ? 'Rejected' : 
                        'Pending Approval' 
                      }}
                    </button>
                    <p class="text-[10px] text-center text-slate-400 font-medium">Click to manage registration</p>
                  </div>
                </div>
                <button 
                  v-else
                  @click="openConfirmModal(event)"
                  class="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
                >
                  Join Event
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Confirmation Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div class="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div class="p-8">
          <div :class="[isCancelling ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-900']" class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
             <svg v-if="!isCancelling" class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             <svg v-else class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 mb-3">
            {{ isCancelling ? 'Cancel Registration?' : 'Confirm Attendance' }}
          </h2>
          <p class="text-slate-500 leading-relaxed text-lg">
            {{ isCancelling 
              ? `Are you sure you want to unregister from "${selectedEvent?.title}"?` 
              : `You are about to register for "${selectedEvent?.title}". Would you like to confirm your spot?` 
            }}
          </p>
        </div>
        <div class="p-8 bg-slate-50/50 border-t border-slate-100 flex gap-4">
          <button @click="showModal = false" class="flex-1 py-4 text-slate-600 font-bold hover:bg-slate-100 rounded-2xl transition-colors">
            Back
          </button>
          <button 
            @click="processAction" 
            :disabled="isProcessing"
            :class="[isCancelling ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-100' : 'bg-gray-900 hover:bg-black shadow-gray-200']"
            class="flex-1 py-4 text-white font-bold rounded-2xl transition-all shadow-xl disabled:opacity-50 flex items-center justify-center"
          >
            <span v-if="isProcessing" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
            {{ isCancelling ? 'Yes, Cancel' : 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useEventStore } from '~/stores/event'
import { useStudentStore } from '~/stores/student'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const eventStore = useEventStore()
const studentStore = useStudentStore()

const activeTab = ref('events')
const showModal = ref(false)
const selectedEvent = ref<any>(null)
const isCancelling = ref(false)
const isProcessing = ref(false)

const notifications = ref<any[]>([])
const showNotifications = ref(false)

const fetchNotifications = async () => {
  if (!authStore.user?.id) return
  const { table } = useSupabase()
  const { data, error } = await table('notifications')
    .select('*')
    .eq('user_id', authStore.user.id)
    .order('created_at', { ascending: false })
  
  if (!error && data) {
    notifications.value = data
  }
}

const deleteNotification = async (id: number) => {
  const { table } = useSupabase()
  await table('notifications').delete().match({ id })
  notifications.value = notifications.value.filter(n => n.id !== id)
}

const clearNotifications = async () => {
  if (!authStore.user?.id) return
  const { table } = useSupabase()
  await table('notifications').delete().match({ user_id: authStore.user.id })
  notifications.value = []
}

onMounted(async () => {
  await Promise.all([
    eventStore.fetchEvents(),
    studentStore.fetchMyRegistrations(),
    fetchNotifications()
  ])
})

const filteredEvents = computed(() => {
  if (activeTab.value === 'events') {
    return eventStore.events
  } else {
    return eventStore.events.filter(e => studentStore.isRegistered(e.id))
  }
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'TBD'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openConfirmModal = (event: any) => {
  selectedEvent.value = event
  isCancelling.value = false
  showModal.value = true
}

const openCancelModal = (event: any) => {
  selectedEvent.value = event
  isCancelling.value = true
  showModal.value = true
}

const processAction = async () => {
  if (!selectedEvent.value) return
  isProcessing.value = true
  
  try {
    let success = false
    if (isCancelling.value) {
      success = await studentStore.unregister(selectedEvent.value.id)
    } else {
      success = await studentStore.register(selectedEvent.value.id)
    }
    
    if (success) {
      showModal.value = false
    }
  } finally {
    isProcessing.value = false
  }
}

const handleLogout = async () => {
  await authStore.logout()
  navigateTo('/auth/login')
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
