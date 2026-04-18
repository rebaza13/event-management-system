<template>
  <div class="min-h-screen min-w-full flex">
    <!-- Left Side: Form -->
    <div class="flex-1 flex flex-col justify-center items-center bg-white px-6 sm:px-12 lg:px-20 text-slate-200">
      <div class="w-full max-w-md">
        <!-- Logo / Brand Identifier -->
        <div class="mb-10 text-center lg:text-left">
         
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-600 sm:text-4xl">Welcome Back</h1>
          <p class="mt-2 text-sm text-slate-600">Sign in to your event management dashboard</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-4">
            <!-- Email Input -->
            <div class="group relative">
              <label for="email" class="block text-sm font-medium text-slate-600 mb-1">Email address</label>
              <input 
                id="email" 
                v-model="email"
                type="email" 
                placeholder="admin@events.com" 
                class="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 placeholder-slate-400"
                required
              />
            </div>
            
            <!-- Password Input -->
            <div class="group relative">
              <label for="password" class="block text-sm font-medium text-slate-600 mb-1">Password</label>
              <input 
                id="password" 
                v-model="password"
                type="password" 
                placeholder="••••••••" 
                class="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 placeholder-slate-400"
                required
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-950" />
              <label for="remember-me" class="ml-2 block text-sm text-slate-600">Remember me</label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl  text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-300 focus:ring-orange-600"
          >
            Sign In
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-slate-400">
          Not a member? 
          <a href="#" class="font-medium text-indigo-400 hover:text-orange-500 transition-colors">Request access from your admin</a>
        </p>
      </div>
    </div>

    <!-- Right Side: Beautiful Image / Abstract Art -->
    <div class="hidden lg:flex lg:flex-1 relative isolate overflow-hidden bg-orange-300 justify-center items-center">
      <!-- Generated Gradient Background Image -->
      <!-- <img src="/images/login-illustration.png" alt="Login Graphic" class="w-[80%] max-w-lg h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"> -->
      <!-- Decorative text overlay over the image -->
   
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

// We want to skip any wrapper layout on the login page specifically
definePageMeta({
  layout: false 
})

function handleLogin() {
  // Simple fake login logic
  if (email.value && password.value) {
    authStore.setUser({
      email: email.value,
      role: 'admin',
      name: 'Event Manager'
    })
    
    // Once logged in, redirect securely back to the app home
    router.push('/')
  }
}
</script>