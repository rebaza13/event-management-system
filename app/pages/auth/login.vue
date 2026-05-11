<template>
  <div class="min-h-screen min-w-full flex bg-white font-sans text-gray-900">
    <!-- Left Side: Form -->
    <div class="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-24">
      <div class="w-full max-w-md mx-auto lg:mx-0">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-10">
          <div class="w-10 h-10 rounded-lg bg-black flex items-center justify-center shadow-sm">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <span class="font-bold text-2xl tracking-tight">My<span class="text-gray-500 font-medium">Dashboard</span></span>
        </div>

        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Welcome Back
        </h2>
        <p class="mt-2 text-sm text-gray-500">
          Sign in to access your event management dashboard.
        </p>

        <div class="mt-8">
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="mt-1">
                <input id="email" v-model="email" type="email" autocomplete="email" required class="block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm transition-colors" placeholder="admin@events.com" />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <input id="password" v-model="password" type="password" autocomplete="current-password" required class="block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm transition-colors" placeholder="••••••••" />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
                <label for="remember-me" class="ml-2 block text-sm text-gray-600">Remember me</label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-gray-900 hover:text-gray-600 transition-colors">Forgot password?</a>
              </div>
            </div>

            <div>
              <button type="submit" :disabled="authStore.isLoading" class="flex w-full justify-center items-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                <svg v-if="authStore.isLoading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>{{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}</span>
              </button>
            </div>
          </form>

          <div class="mt-8 border-t border-gray-100 pt-6 text-center">
             <p class="text-sm text-gray-500">
              Not a member?
              <a href="#" class="font-medium text-gray-900 hover:text-gray-600 transition-colors">Request access from your admin</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side: Dark Pattern Aesthetic -->
    <div class="hidden lg:flex lg:flex-1 relative isolate overflow-hidden bg-black items-center justify-center">
      <!-- Dark gradient wallpaper base -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      
      <!-- Subtle dot pattern overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      
      <!-- Glowing atmospheric elements -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10 translate-x-1/3 -translate-y-1/3"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-800 rounded-full mix-blend-screen filter blur-[120px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>

      <!-- Content -->
      <div class="relative z-10 w-full max-w-lg px-8 flex flex-col items-start text-left">
        <div class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-md shadow-2xl">
          <svg class="w-8 h-8 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <h3 class="text-white text-4xl font-extrabold tracking-tight mb-4">Elevate your<br/>event experience.</h3>
        <p class="text-gray-400 text-lg leading-relaxed mb-10">
          A seamless, simple, and powerful way to manage everything from registrations to schedules in one sleek interface.
        </p>
        
        <div class="flex gap-4 items-center">
          <div class="flex -space-x-3">
             <div class="w-10 h-10 rounded-full border-2 border-black bg-gray-700"></div>
             <div class="w-10 h-10 rounded-full border-2 border-black bg-gray-600"></div>
             <div class="w-10 h-10 rounded-full border-2 border-black bg-gray-500"></div>
          </div>
          <p class="text-sm text-gray-500 font-medium">Join thousands of users.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const email = ref('')
const password = ref('')

const router = useRouter()
const authStore = useAuthStore()

definePageMeta({
  layout: 'guest'
})

function handleLogin() {
  authStore.isLoading = true
  authStore.login(email.value, password.value).then((success) => {
    if (success) {
      router.push('/')
    } else {
      alert('Invalid email or password')
    }
  }).finally(() => {
    authStore.isLoading = false
  })
}
</script>