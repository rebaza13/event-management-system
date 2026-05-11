<template>
  <div class="min-h-screen bg-slate-50">
    <div v-if="!isProfileLoaded" class="flex flex-col items-center justify-center min-h-screen p-4">
      <div class="relative w-16 h-16">
        <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p class="mt-4 text-slate-500 font-medium animate-pulse">Initializing dashboard...</p>
    </div>
    
    <div v-else>
      <DashboardAdmin v-if="isAdminOrStaff" />
      <DashboardStudent v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user, isProfileLoaded } = storeToRefs(authStore)

definePageMeta({ layout: false, middleware: ['auth'] })

const isAdminOrStaff = computed(() => {
  return user.value?.role === 'admin' || user.value?.role === 'staff'
})
</script>