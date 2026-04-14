import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any | null
  }),
  getters: {
    isAdmin: (state) => state?.user?.role === 'admin'
  },
  actions: {
    setUser(user: any) {
      this.user = user
    }
  }
})