<template>
  <div class="min-h-screen relative flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden bg-slate-50">
    <!-- Beautiful Ambient Background -->
    <div class="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-300/30 blur-[100px] pointer-events-none animate-pulse duration-1000"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-violet-300/30 blur-[100px] pointer-events-none delay-700"></div>

    <div class="w-full max-w-2xl z-10 flex flex-col justify-center">
      <!-- Back Navigation -->
      <NuxtLink to="/" class="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-all mb-8 self-start">
        <div class="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center mr-3 group-hover:-translate-x-1 transition-transform">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </div>
        Back to Dashboard
      </NuxtLink>

      <!-- Profile Container -->
      <div class="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-indigo-900/5 rounded-[2rem] overflow-hidden">
        
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 h-32 relative">
          <!-- Avatar -->
          <div class="absolute -bottom-12 left-10 w-24 h-24 rounded-2xl bg-white p-1.5 shadow-xl shadow-indigo-900/20 transform rotate-3 hover:rotate-6 transition-transform duration-300">
            <div class="w-full h-full bg-gradient-to-tr from-indigo-100 to-violet-50 rounded-xl flex items-center justify-center border border-indigo-50/50">
              <span class="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-violet-600">
                {{ userInitials }}
              </span>
            </div>
          </div>
        </div>

        <div class="pt-16 pb-10 px-10">
          <div class="mb-8">
            <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">Account Settings</h2>
            <p class="text-slate-500 mt-1">Manage your public profile and personal details.</p>
          </div>

          <form @submit.prevent="handleUpdateProfile" class="space-y-6">
            <!-- Full Name Container -->
            <div class="group">
              <label for="fullName" class="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">Full Name</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <input 
                  id="fullName" 
                  v-model="fullName" 
                  type="text" 
                  required 
                  class="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 font-medium placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 outline-none" 
                  placeholder="e.g. Jane Doe" 
                />
              </div>
            </div>
            
            <!-- Email Container -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <input 
                  type="email" 
                  :value="authStore.user?.email" 
                  disabled 
                  class="block w-full pl-12 pr-4 py-3.5 bg-slate-100/50 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed opacity-80" 
                />
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
              </div>
              <p class="mt-2 text-xs font-medium text-slate-400 pl-1 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Email changes are restricted for security reasons.
              </p>
            </div>

            <!-- Action Area -->
            <div class="pt-6 border-t border-slate-100 flex items-center justify-between mt-8 min-h-[60px]">
               <div class="flex-1 mr-4">
                 <!-- Feedback Message -->
                 <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="transform translate-y-0 opacity-100" leave-to-class="transform -translate-y-2 opacity-0">
                    <div v-if="message" :class="[messageType === 'success' ? 'text-emerald-600 bg-emerald-50/50 border-emerald-100' : 'text-rose-600 bg-rose-50/50 border-rose-100', 'text-sm px-4 py-2.5 rounded-lg border font-medium flex items-center gap-2 backdrop-blur-sm']">
                      <svg v-if="messageType === 'success'" class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                      <svg v-else class="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {{ message }}
                    </div>
                 </Transition>
               </div>

               <button 
                  type="submit" 
                  :disabled="authStore.isLoading"
                  class="relative inline-flex flex-shrink-0 items-center justify-center py-3.5 px-8 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:bg-indigo-700 bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
                >
                  <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span class="relative flex items-center gap-2">
                    <svg v-if="authStore.isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>{{ authStore.isLoading ? 'Saving...' : 'Save Changes' }}</span>
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
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: false, middleware: ['auth'] })

const authStore = useAuthStore()
const fullName = ref('')
const message = ref('')
const messageType = ref<'success'|'error'>('success')

const userInitials = computed(() => {
  const name = fullName.value || authStore.user?.full_name || authStore.user?.email || 'A'
  return name.charAt(0).toUpperCase()
})

onMounted(() => {
  if (authStore.user?.full_name) {
    fullName.value = authStore.user.full_name
  } else if (authStore.user?.raw_user_meta_data?.full_name) {
    fullName.value = authStore.user.raw_user_meta_data.full_name
  }
})

let timeoutId: NodeJS.Timeout

const handleUpdateProfile = async () => {
  if (timeoutId) clearTimeout(timeoutId)
  message.value = ''
  
  if (!fullName.value.trim()) {
    messageType.value = 'error'
    message.value = 'Full name cannot be empty.'
    return
  }
  
  const success = await authStore.updateProfile(fullName.value)
  if (success) {
    messageType.value = 'success'
    message.value = 'Profile updated successfully!'
    
    timeoutId = setTimeout(() => {
      message.value = ''
    }, 4000)
  } else {
    messageType.value = 'error'
    message.value = 'Failed to update profile.'
  }
}
</script>
