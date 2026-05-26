import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Profile } from '~/models'

export const useUserStore = defineStore('user', () => {
  const isLoading = ref<boolean>(false)
  const users = ref<Profile[]>([])
  const { table, client, anonClient } = useSupabase()

  const fetchUsers = async () => {
    isLoading.value = true
    try {
      const { data, error } = await table('profiles').select('*').order('created_at', { ascending: false })
      if (error) throw error
      users.value = data || []
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      isLoading.value = false
    }
  }

  const registerUser = async (email: string, password: string, fullName: string, role: string) => {
    isLoading.value = true
    try {
      // 1. Sign up the user in Supabase Auth
      // Use anonClient so the admin's session is not overwritten
      const { data, error } = await anonClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })
      if (error) throw error

      // 2. If no database trigger exists, we manually create the profile here.
      // If a trigger exists, this might fail with a unique constraint error, which is fine.
      if (data.user) {
        const { error: profileError } = await table('profiles').insert([{
          id: data.user.id,
          full_name: fullName,
          role: role || 'student'
        }])
        
        // Ignore duplicate key errors if the trigger already created it, but we can update the role
        if (profileError && profileError.code === '23505') {
          await table('profiles').update({ role }).match({ id: data.user.id })
        } else if (profileError) {
          console.error("Profile creation error:", profileError)
        }
      }
      
      await fetchUsers()
      return true
    } catch (err) {
      console.error('Error registering user:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    isLoading.value = true
    try {
      const { error } = await table('profiles')
        .update({ role: newRole })
        .match({ id: userId })
      if (error) throw error
      
      // Update local state
      const index = users.value.findIndex(u => u.id === userId)
      if (index !== -1) {
        users.value[index].role = newRole
      }
    } catch (err) {
      console.error('Error updating role:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteUser = async (userId: string) => {
    isLoading.value = true
    try {
      // Note: This only deletes the public profile. 
      // Deleting from auth.users requires a secure server environment or edge functions.
      const { error } = await table('profiles')
        .delete()
        .match({ id: userId })
      if (error) throw error
      
      // Update local state
      users.value = users.value.filter(u => u.id !== userId)
    } catch (err) {
      console.error('Error deleting user:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    users,
    fetchUsers,
    registerUser,
    updateUserRole,
    deleteUser
  }
})
