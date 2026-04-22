<template>
  <div>Home</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

// Redirect to login if user is not logged in
if (!authStore.isLoggedIn()) {
  navigateTo('/auth/login')
}

definePageMeta({ layout: 'default', middleware: ['auth', 'admin'] },

)
</script>