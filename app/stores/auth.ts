import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any | null>(null)

  const isAdmin = computed(() => user.value?.role === 'admin')

  function setUser(newUser: any) {
    user.value = newUser
  }
  const isLoggedIn=()=>{
    return !!user.value
  }
  const logout=()=>{
    user.value = null
  } 

  return {
    user,
    isAdmin,
    setUser,
    isLoggedIn,
    logout
  }
})