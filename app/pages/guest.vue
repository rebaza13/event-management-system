<template>
  <div class="min-h-screen bg-slate-50 w-full font-sans">
    <!-- Navbar -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <span class="font-black text-xl tracking-tight text-gray-900">CEMS</span>
          </div>
          <div>
            <NuxtLink to="/auth/login" class="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all">
              Sign In
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <div class="bg-slate-900 text-white py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black"></div>
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] mix-blend-screen"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">Discover Campus Events</h1>
        <p class="text-lg text-slate-300 max-w-2xl mx-auto mb-10">Explore upcoming workshops, seminars, and cultural events happening on campus. Join our vibrant community today.</p>
      </div>
    </div>

    <!-- Events List -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Upcoming Events</h2>
      </div>

      <div v-if="guestStore.isLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
      
      <div v-else-if="guestStore.events.length === 0" class="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
        <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-slate-900">No public events</h3>
        <p class="mt-2 text-slate-500">Check back later for new events.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="event in guestStore.events" :key="event.id" class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group flex flex-col">
          <div class="relative h-48 bg-slate-100 overflow-hidden">
            <img v-if="event.media_assets?.[0]?.file_url" :src="event.media_assets[0].file_url" :alt="event.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div v-else class="w-full h-full flex items-center justify-center bg-slate-100">
              <svg class="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <!-- Status Badge -->
             <div class="absolute top-4 right-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-slate-900 shadow-sm border border-slate-200">
                {{ event.category || 'General' }}
              </span>
            </div>
          </div>
          
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-black transition-colors">{{ event.title }}</h3>
            <p class="text-slate-500 text-sm mb-4 line-clamp-3 flex-1">{{ event.description }}</p>
            
            <div class="space-y-2 mt-auto pt-4 border-t border-slate-100">
              <div class="flex items-center text-sm text-slate-600">
                <svg class="mr-2 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {{ formatDate(event.start_at) }}
              </div>
              <div class="flex items-center text-sm text-slate-600">
                <svg class="mr-2 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {{ event.location }}
              </div>
            </div>

            <div class="mt-6">
               <NuxtLink to="/auth/login" class="block w-full text-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200 transition-colors">
                  Sign in to Register
               </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGuestStore } from '~/stores/guest'

const guestStore = useGuestStore()

definePageMeta({
  layout: 'guest',
  middleware: ['auth']
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'TBA'
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date)
}

onMounted(() => {
  guestStore.fetchPublicEvents()
})
</script>
