<template>
  <div class="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
    <div class="w-full max-w-xl z-10 flex flex-col">
      <!-- Back Navigation -->
      <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8 self-start">
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Dashboard
      </NuxtLink>

      <!-- Profile Container -->
      <div class="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        
        <!-- Header Section -->
        <div class="bg-gray-100 h-24 relative border-b border-gray-200">
          <!-- Avatar -->
          <div class="absolute -bottom-10 left-8 w-20 h-20 rounded-full bg-white p-1 shadow-sm border border-gray-200">
            <div class="w-full h-full bg-gray-50 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
              {{ userInitials }}
            </div>
          </div>
        </div>

        <div class="pt-14 pb-8 px-8">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Account Settings</h2>
            <p class="text-gray-500 text-sm mt-1">Manage your public profile and personal details.</p>
          </div>

          <form @submit.prevent="handleUpdateProfile" class="space-y-6">
            <!-- Full Name Container -->
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                id="fullName" 
                v-model="fullName" 
                type="text" 
                required 
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm" 
                placeholder="e.g. Jane Doe" 
              />
            </div>
            
            <!-- Email Container -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                :value="authStore.user?.email" 
                disabled 
                class="block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-500 rounded-md shadow-sm sm:text-sm cursor-not-allowed" 
              />
              <p class="mt-1 text-xs text-gray-500">
                Email changes are restricted for security reasons.
              </p>
            </div>

            <!-- Action Area -->
            <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
               <div class="flex-1 mr-4">
                 <!-- Feedback Message -->
                 <div v-if="message" :class="[messageType === 'success' ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-700 bg-red-50 border-red-200', 'text-sm px-3 py-2 rounded-md border font-medium']">
                   {{ message }}
                 </div>
               </div>

               <button 
                  type="submit" 
                  :disabled="authStore.isLoading"
                  class="inline-flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <svg v-if="authStore.isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>{{ authStore.isLoading ? 'Saving...' : 'Save Changes' }}</span>
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
