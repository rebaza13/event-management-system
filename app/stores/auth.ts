import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '~/models'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref<boolean>(false)

  function setUser(newUser: User) {
    user.value = newUser
  }
  const isLoggedIn = () => {
    return !!user.value
  }
  const logout = () => {
    user.value = null
  }

  return {
    user,
    isLoading,
    setUser,
    isLoggedIn,
    logout,

  }
})