
export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser() // Use the built-in composable, not Pinia

  const publicRoutes = ['/auth/login', '/guest']

  // If user doesn't exist and not going to a public route
  if (!user.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/guest')
  }

  // If user IS logged in and trying to go to login or guest page, send them home
  if (user.value && publicRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})