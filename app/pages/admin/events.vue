<template>
  <div>
    <h1>Admin Event Management</h1>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })
</script>