<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
    <!-- Topbar -->
    <header class="bg-white border-b border-gray-200 px-6 sm:px-8 py-4 flex justify-between items-center z-10 sticky top-0">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center shadow-sm">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
        </div>
        <span class="font-bold text-xl tracking-tight">Student<span class="text-gray-500 font-medium">Portal</span></span>
      </div>
      
      <div class="flex items-center space-x-4">
        <div class="text-right hidden sm:block">
          <div class="text-sm font-semibold text-gray-900">{{ authStore.user?.full_name || 'Student User' }}</div>
          <div class="text-xs text-gray-500 capitalize">{{ authStore.user?.raw_user_meta_data?.role || 'student' }}</div>
        </div>
        <NuxtLink to="/profile" class="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-100 hover:bg-indigo-100 transition-colors">
          {{ (authStore.user?.full_name || 'S').charAt(0).toUpperCase() }}
        </NuxtLink>
        
        <button @click="handleLogout" class="ml-2 p-2 text-gray-500 hover:text-red-600 transition-colors hidden sm:flex items-center gap-1 text-sm font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span class="hidden md:inline">Log Out</span>
        </button>
        
        <!-- Mobile Logout -->
        <button @click="handleLogout" class="sm:hidden ml-2 p-2 text-gray-500 hover:text-red-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-6 sm:p-8 overflow-y-auto z-0">
      <div class="max-w-5xl mx-auto">
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-center p-12">
          <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Welcome to the Student Portal</h2>
          <p class="text-gray-500 max-w-md mx-auto">
            We are currently building exciting features for you. Soon, you'll be able to discover and register for amazing events happening around campus!
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const handleLogout = async () => {
  try {
    await authStore.logout()
    navigateTo('/auth/login')
  } catch (e) {
    console.error('Logout failed:', e)
  }
}
</script>
