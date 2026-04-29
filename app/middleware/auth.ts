
export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser() // Use the built-in composable, not Pinia
console.log(user.value);
  // If user doesn't exist and we aren't already going to the login page
  if (!user.value && to.path !== '/auth/login') {
    return navigateTo('/auth/login')
  }

  // If user IS logged in and trying to go to login page, send them home
  if (user.value && to.path === '/auth/login') {
    return navigateTo('/')
  }
})