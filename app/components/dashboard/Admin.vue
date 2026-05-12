<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">
    <!-- Sidebar (Hidden on mobile) -->
    <aside v-if="authStore.user?.role === 'admin'" class="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex z-10 transition-all duration-300">
      <div class="p-6 border-b border-gray-100 flex items-center gap-3">
        <div class="w-8 h-8 rounded bg-black flex items-center justify-center shadow-sm">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
        <span class="font-bold text-xl tracking-tight">My<span class="text-gray-500 font-medium">Dashboard</span></span>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-1">
        <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Menu</div>
        <NuxtLink to="/" class="flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-900 rounded-lg font-medium transition-colors">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Dashboard
        </NuxtLink>
        <NuxtLink to="/events" class="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors font-medium">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Events
        </NuxtLink>
        <NuxtLink to="/users" class="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors font-medium">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Users
        </NuxtLink>
        <NuxtLink to="/analytics" class="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors font-medium">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          Analytics
        </NuxtLink>
      </nav>
      <div class="p-4 border-t border-gray-100 mt-auto">
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Log Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Topbar -->
      <header class="bg-white border-b border-gray-200 px-6 sm:px-8 py-4 flex justify-between items-center z-10 sticky top-0">
        <div>
          <h1 class="text-xl font-bold text-gray-900 tracking-tight">System Overview</h1>
          <p class="text-sm text-gray-500 mt-0.5">Welcome back, manage your events and users.</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-right hidden sm:block">
            <div class="text-sm font-semibold text-gray-900">{{ authStore.user?.full_name || 'Admin User' }}</div>
            <div class="text-xs text-gray-500 capitalize">{{ authStore.user?.raw_user_meta_data?.role || 'Administrator' }}</div>
          </div>
          <NuxtLink to="/profile" class="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-bold border border-gray-200 hover:bg-gray-200 transition-colors">
            {{ (authStore.user?.full_name || 'A').charAt(0).toUpperCase() }}
          </NuxtLink>
          
          <!-- Mobile Logout (visible only on small screens) -->
          <button @click="handleLogout" class="md:hidden ml-2 p-2 text-gray-500 hover:text-red-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </button>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="p-6 sm:p-8 flex-1 overflow-y-auto z-0">
        <div class="max-w-5xl mx-auto space-y-6">
          
          <!-- Quick Actions Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             <!-- Create Event -->
             <NuxtLink to="/events/create" class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow transition-all group flex flex-col items-center text-center">
              <div class="w-10 h-10 bg-gray-50 text-gray-700 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              </div>
              <h4 class="text-sm font-semibold text-gray-900">New Event</h4>
             </NuxtLink>

             <!-- View Events -->
             <NuxtLink to="/events" class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow transition-all group flex flex-col items-center text-center">
              <div class="w-10 h-10 bg-gray-50 text-gray-700 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <h4 class="text-sm font-semibold text-gray-900">All Events</h4>
             </NuxtLink>

             <!-- Manage Users -->
         <div >
              <NuxtLink to="/users" class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow transition-all group flex flex-col items-center text-center">
              <div class="w-10 h-10 bg-gray-50 text-gray-700 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h4 class="text-sm font-semibold text-gray-900">Manage Users</h4>
             </NuxtLink>
         </div>

             <!-- Profile -->
             <NuxtLink to="/profile" class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow transition-all group flex flex-col items-center text-center">
              <div class="w-10 h-10 bg-gray-50 text-gray-700 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <h4 class="text-sm font-semibold text-gray-900">My Profile</h4>
             </NuxtLink>
          </div>

          <!-- Main Feature Cards -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            <!-- Approvals Box -->
            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow transition-all">
              <div class="flex justify-between items-start mb-4">
                <div class="p-2.5 bg-gray-100 rounded-lg text-gray-700">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Event Approvals</h3>

              <NuxtLink to="/events" class="inline-flex items-center text-sm font-medium text-black hover:text-gray-600 transition-colors">
                Go to Events <span class="ml-1">&rarr;</span>
              </NuxtLink>
            </div>

            <!-- Analytics Box -->
            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow transition-all">
              <div class="flex justify-between items-start mb-4">
                <div class="p-2.5 bg-gray-100 rounded-lg text-gray-700">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Platform Analytics</h3>

              <NuxtLink to="/analytics" class="inline-flex items-center text-sm font-medium text-black hover:text-gray-600 transition-colors">
                View Analytics <span class="ml-1">&rarr;</span>
              </NuxtLink>
            </div>
          </div>
          
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
