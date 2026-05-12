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
          <h1 class="text-3xl font-bold text-gray-900">Analytics</h1>
          <p class="text-gray-500 mt-1">Platform usage statistics and active metrics.</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="analyticsStore.isLoading" class="flex justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>

      <!-- Stats Cards -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Total Users Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
          </div>
          <h3 class="text-gray-500 text-sm font-medium mb-1">Total Users</h3>
          <div class="text-3xl font-bold text-gray-900">{{ analyticsStore.totalUsers }}</div>
        </div>

        <!-- Total Events Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
          </div>
          <h3 class="text-gray-500 text-sm font-medium mb-1">Total Events</h3>
          <div class="text-3xl font-bold text-gray-900">{{ analyticsStore.totalEvents }}</div>
        </div>

        <!-- Active Events Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          <h3 class="text-gray-500 text-sm font-medium mb-1">Active Events</h3>
          <div class="text-3xl font-bold text-gray-900">{{ analyticsStore.activeEvents }}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useAnalyticsStore } from '~/stores/analytics'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

definePageMeta({ layout: false, middleware: ['auth'] })

const analyticsStore = useAnalyticsStore()
const authStore = useAuthStore()
const router = useRouter()

watch(() => authStore.isProfileLoaded, (loaded) => {
  if (loaded) {
    if (authStore.user?.role === 'admin' || authStore.user?.role === 'staff') {
      analyticsStore.fetchAnalytics()
    } else {
      router.push('/')
    }
  }
}, { immediate: true })
</script>
