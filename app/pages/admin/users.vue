<template>
  <div>
    <h1>Admin Users Management</h1>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
</script>