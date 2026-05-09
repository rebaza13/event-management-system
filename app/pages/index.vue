<template>
  <div>
    <DashboardAdmin v-if="isAdminOrStaff" />
    <DashboardStudent v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: false, middleware: ['auth'] })

const authStore = useAuthStore()

const isAdminOrStaff = computed(() => {
  const role = authStore.user?.raw_user_meta_data?.role
  return role === 'admin' || role === 'staff'
})
</script>