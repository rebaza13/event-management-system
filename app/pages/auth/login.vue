<template>
  <div class="min-h-screen min-w-full flex bg-white font-sans text-gray-900">
    <!-- Left Side: Form -->
    <div class="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-24">
      <div class="w-full max-w-md mx-auto lg:mx-0">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-10">
          <div class="w-10 h-10 rounded-xl bg-black flex items-center justify-center shadow-md">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <span class="font-black text-3xl tracking-tighter">CEMS</span>
        </div>

        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Welcome Back
        </h2>
        <p class="mt-2 text-sm text-gray-500 font-medium">
          Sign in to the College Event Management System.
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

    <!-- Right Side: Clean Premium Aesthetic -->
    <div class="hidden lg:flex lg:flex-1 relative isolate overflow-hidden bg-slate-900 items-center justify-center">
      <!-- Elegant gradient base -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black"></div>
      
      <!-- Subtle soft glow accent -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen"></div>

      <!-- Content -->
      <div class="relative z-10 w-full max-w-lg px-8 flex flex-col items-center text-center">
        <div class="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-xl shadow-2xl">
          <svg class="w-10 h-10 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        </div>
        <h3 class="text-white text-4xl font-extrabold tracking-tight mb-4">CEMS</h3>
        <p class="text-slate-300 text-lg leading-relaxed max-w-md mx-auto font-medium">
          The ultimate platform for modern campus life. Seamlessly organize, discover, and experience college events.
        </p>
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