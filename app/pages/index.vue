<template>
  <div class="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10 transition-all duration-300">
      <div class="p-6 text-2xl font-bold tracking-wide border-b border-slate-800 flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
        <span class="text-white">Admin<span class="text-indigo-400">Hub</span></span>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2 tracking-widest">Portal Features</div>
        <a href="#" class="flex items-center gap-3 px-4 py-3 bg-indigo-600/10 text-indigo-400 rounded-xl font-bold transition-all border border-indigo-600/20">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          System Overview
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Event Approvals
          <span class="ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          User Roles
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          Analytics & Reports
        </a>
      </nav>
      <div class="p-4 border-t border-slate-800 mt-auto">
        <button @click="logout" class="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors group font-bold">
          <svg class="w-5 h-5 group-hover:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Verify & Log Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden relative">
      <div class="absolute inset-0 bg-slate-50 opacity-50 pointer-events-none"></div>
      
      <!-- Topbar -->
      <header class="bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0 shadow-sm">
        <div>
          <h1 class="text-2xl font-black text-slate-800 tracking-tight">Event Management System</h1>
          <p class="text-sm text-slate-500 font-medium mt-0.5">Central hub for tracking approvals, users, and performance</p>
        </div>
        <div class="flex items-center space-x-5">
          <button class="relative text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div class="flex items-center space-x-3 border-l border-slate-200 pl-5">
            <div class="text-right hidden sm:block">
              <div class="text-sm font-bold text-slate-700">{{ authStore.user?.full_name || 'System Admin' }}</div>
              <div class="text-[11px] text-indigo-600 font-bold uppercase tracking-wider">Superadmin</div>
            </div>
            <!-- Profile Nav Bound from Previous Task -->
            <NuxtLink to="/profile" class="h-11 w-11 bg-gradient-to-tr from-indigo-100 to-violet-100 rounded-full flex items-center justify-center text-indigo-600 font-black border-2 border-white shadow-md shadow-indigo-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all text-lg">
              {{ (authStore.user?.full_name || 'A').charAt(0).toUpperCase() }}
            </NuxtLink>
          </div>
        </div>
      </header>

      <!-- Dashboard Actions matching Diagram -->
      <div class="p-8 flex-1 overflow-y-auto z-0">
        
        <div class="max-w-6xl mx-auto space-y-8">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Event Approvals Box -->
            <div class=" bg-slate-800 rounded-3xl p-8 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-125 transition-transform duration-700"></div>
              <div class="flex justify-between items-start mb-6">
                <div class="p-3 bg-white/20 rounded-2xl backdrop-blur-md shadow-inner text-white">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <span class="bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-rose-500/30 animate-pulse tracking-wide uppercase">3 Pending</span>
              </div>
              <h3 class="text-2xl font-black mb-2">Event Approvals</h3>
              <p class="text-indigo-100 mb-8 font-medium leading-relaxed">Review and approve incoming event submissions from organizers across the platform. Confirm venues and schedules.</p>
              <div class="flex items-center text-sm font-bold text-white group-hover:gap-3 gap-2 transition-all opacity-90 group-hover:opacity-100">
                Action Required <span>&rarr;</span>
              </div>
            </div>

            <!-- User Management Box -->
            <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(79,70,229,0.1)] relative overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1">
              <div class="absolute top-0 right-0 w-64 h-64 bg-fuchsia-50 opacity-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-125 transition-transform duration-700"></div>
              <div class="flex justify-between items-start mb-6 relative">
                <div class="p-3 bg-fuchsia-50 rounded-2xl text-fuchsia-600 shadow-inner">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
              </div>
              <h3 class="text-2xl font-black text-slate-800 mb-2 relative">User Management</h3>
              <p class="text-slate-500 mb-8 font-medium leading-relaxed relative">Modify user roles, review permissions, handle authentication rules, and manage all users' data globally.</p>
              <div class="flex items-center text-sm font-bold text-fuchsia-600 group-hover:gap-3 gap-2 transition-all relative">
                Manage Roles & Directory <span>&rarr;</span>
              </div>
            </div>
          </div>

          <!-- Event Operations Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
             
             <!-- Provide Events -->
             <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group cursor-pointer">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-100 transition-all">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </div>
                <h4 class="text-lg font-bold text-slate-800">Provide Event</h4>
              </div>
              <p class="text-slate-500 text-sm font-medium">Create and publish new official events directly to the system calendar.</p>
             </div>

             <!-- View & Register -->
             <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-sky-200 hover:shadow-lg hover:shadow-sky-500/5 transition-all group cursor-pointer">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-100 transition-all">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <h4 class="text-lg font-bold text-slate-800">View Events</h4>
              </div>
              <p class="text-slate-500 text-sm font-medium">Browse active events, process registrations, and cancel upcoming dates.</p>
             </div>

             <!-- Analytics & Reporting -->
             <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/5 transition-all group cursor-pointer">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-100 transition-all">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
                <h4 class="text-lg font-bold text-slate-800">Analytics</h4>
              </div>
              <p class="text-slate-500 text-sm font-medium">Generate deep reports on event performance, attendance, and overall growth.</p>
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

// Redirect to login if user is not logged in
if (!authStore.isLoggedIn()) {
  navigateTo('/auth/login')
}

// Ensure the page doesn't use the default layout so we can render our custom dashboard UI fully
definePageMeta({ layout: false, middleware: ['auth'] })

const logout = async () => {
  await authStore.logout()
  navigateTo('/auth/login')
}
</script>