<template>
  <div>
    <DashboardAdmin v-if="isAdminOrStaff" />
    <DashboardStudent v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

const { user } = storeToRefs(useAuthStore())
definePageMeta({ layout: false, middleware: ['auth'] })


const isAdminOrStaff = computed(() => {
 
  return user.value?.role === 'admin' || user.value?.role === 'staff'
})
</script>