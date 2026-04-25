import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  if (!auth.user && to.path !== 'auth/login') {
    return navigateTo('/auth/login')
  }
})