<template>
  <div class="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-slate-100 font-sans">
    
    <!-- Test Square with Animations and Gradients -->
    <div class="group relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-1 cursor-pointer hover:scale-105 transition-transform duration-500 ease-out shadow-2xl shadow-purple-500/50">
      
      <!-- Inner card to create gradient border effect -->
      <div class="absolute inset-1 bg-slate-900 rounded-[22px] flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:bg-slate-800/80">
        
        <div class="flex flex-col items-center justify-center z-10 text-center px-4">
          <span class="text-4xl mb-4 group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-300">✨</span>
          <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
            Tailwind is Alive
          </h2>
          <p class="text-slate-400 mt-2 text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Hover effects and gradients working perfectly.
          </p>
        </div>

        <!-- Decorative background blurs -->
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full mix-blend-screen filter blur-[40px] opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500 rounded-full mix-blend-screen filter blur-[40px] opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
      </div>
    </div>

    <!-- Instructions / Footer -->
    <div class="mt-12 text-center max-w-md">
      <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl text-white mb-4">
        Event Management System
      </h1>
      <p class="text-slate-400">
        If you see a stylish, responsive square above that reacts to your mouse, Nuxt 3 and Tailwind CSS are fully synced!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// You can test Pinia here later, but for now our focus is Tailwind!
</script>

<style scoped>
/* Scoped CSS not primarily needed thanks to Tailwind, but available here! */
</style>