export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  if (authStore.user?.role !== 'admin') {

    return navigateTo('/')
  }
})


