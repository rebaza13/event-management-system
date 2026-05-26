
export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser() // Use the built-in composable
  const authStore = useAuthStore() // Pinia store for immediate client-side updates

  const publicRoutes = ['/auth/login', '/guest']
  const isAuth = !!user.value || !!authStore.user

  // If user doesn't exist and not going to a public route
  if (!isAuth && !publicRoutes.includes(to.path)) {
    return navigateTo('/guest')
  }

  // If user IS logged in and trying to go to login or guest page, send them home
  if (isAuth && publicRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})