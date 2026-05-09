import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { User } from '~/models'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref<boolean>(false)

  // Initialize Supabase Client
  const supabase = useSupabase()

  // 🪄 THE FIX: Automatically sync Pinia state with Supabase's built-in session state.
  // This runs immediately on page load, automatically fetching the user from cookies!

  const fetchProfile = async () => {
   const userId = (await supabase.auth.getUser()).data.user?.id
    if (!userId) return
    
    const { data, error } = await supabase.table('profiles')
      .select('*')
      .eq('id', userId)
      
    if (error) {
      console.error('Error fetching user profile:', error.message)
      return
    }
    
    if (data && user.value) {
      user.value.role = data[0]?.role as string
    }
  }
  function setUser(newUser: User | null) {
    user.value = newUser
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    isLoading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Error logging in:', error.message)
        return false
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          phone: data.user.phone,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at,
          raw_user_meta_data: data.user.user_metadata,
          full_name: data.user.user_metadata?.full_name
        })
        return true
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const updateProfile = async (fullName: string) => {
    isLoading.value = true
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      })

      if (error) {
        console.error('Error updating profile:', error.message)
        return false
      }

      if (user.value) {
        user.value.full_name = fullName
        if (!user.value.raw_user_meta_data) user.value.raw_user_meta_data = {}
        user.value.raw_user_meta_data.full_name = fullName
      }
      return true
    } finally {
      isLoading.value = false
    }
  }

    watch(supabase.user, (supabaseUser) => {
    if (supabaseUser) {
    
      user.value = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        phone: supabaseUser.phone,
        created_at: supabaseUser.created_at,
        updated_at: supabaseUser.updated_at,
        raw_user_meta_data: supabaseUser.user_metadata,
        full_name: supabaseUser.user_metadata?.full_name
      }
      fetchProfile()
    } else {
      user.value = null
    }
  }, { immediate: true })

  return {
    user,
    isLoading,
    setUser,
    isLoggedIn,
    login,
    logout,
    updateProfile,
  }
})