<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10">
      <div class="p-6 text-2xl font-bold tracking-wide border-b border-slate-800 flex items-center gap-3">
        <span class="text-indigo-400">Admin</span>UI
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        <a href="#" class="flex items-center gap-3 px-4 py-3 bg-indigo-600 rounded-lg text-white font-medium shadow-md shadow-indigo-600/20 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Dashboard
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Events
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Users
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Settings
        </a>
      </nav>
      <div class="p-4 border-t border-slate-800">
        <button @click="logout" class="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Topbar -->
      <header class="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-0">
        <h1 class="text-2xl font-semibold text-slate-800">Dashboard Overview</h1>
        <div class="flex items-center space-x-5">
          <button class="text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
          <div class="flex items-center space-x-3 border-l border-slate-200 pl-5">
            <span class="text-slate-600 font-medium hidden sm:block">Admin User</span>
            <div class="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border-2 border-indigo-200 cursor-pointer hover:ring-2 hover:ring-indigo-400 hover:ring-offset-2 transition-all">
              A
            </div>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="p-8 flex-1 overflow-y-auto">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wider">Total Events</h3>
                <p class="text-4xl font-bold text-slate-800">124</p>
              </div>
              <div class="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
              <span class="text-emerald-500 font-medium flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                12%
              </span>
              <span class="text-slate-400 ml-2">from last month</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wider">Active Users</h3>
                <p class="text-4xl font-bold text-slate-800">892</p>
              </div>
              <div class="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
              <span class="text-emerald-500 font-medium flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                8.5%
              </span>
              <span class="text-slate-400 ml-2">from last month</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wider">Revenue</h3>
                <p class="text-4xl font-bold text-slate-800">$12,450</p>
              </div>
              <div class="p-3 bg-amber-50 rounded-xl text-amber-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
              <span class="text-rose-500 font-medium flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                2.4%
              </span>
              <span class="text-slate-400 ml-2">from last month</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 class="text-lg font-semibold text-slate-800">Recent Activity</h2>
            <button class="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
          </div>
          <div class="p-8 flex flex-col items-center justify-center text-slate-400 min-h-[250px]">
            <svg class="w-16 h-16 text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            <p class="text-slate-500 font-medium">No recent activity to display</p>
            <p class="text-sm mt-1">Activities will appear here once users interact with the system.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

// Redirect to login if user is not logged in
if (!authStore.isLoggedIn()) {
  navigateTo('/auth/login')
}

// Ensure the page doesn't use the default layout so we can render our custom dashboard UI fully
definePageMeta({ layout: false, middleware: ['auth', 'admin'] })

const logout = () => {
  // Add logout logic later
  navigateTo('/auth/login')
}
</script>