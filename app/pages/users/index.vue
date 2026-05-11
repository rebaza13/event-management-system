<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
    <div class="w-full max-w-5xl mx-auto">
      
      <!-- Back Navigation -->
      <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Dashboard
      </NuxtLink>

      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
          <p class="text-gray-500 mt-1">Manage staff and student accounts.</p>
        </div>
        <button 
          @click="openRegisterModal"
          class="inline-flex items-center justify-center py-2.5 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 transition-colors"
        >
          Register New User
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div v-if="userStore.isLoading && userStore.users.length === 0" class="flex justify-center py-20">
          <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        </div>

        <div v-else-if="userStore.users.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <h3 class="text-lg font-medium text-gray-900">No users found</h3>
          <p class="mt-1 text-gray-500">There are no user profiles available.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in userStore.users" :key="user.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                      {{ user.full_name?.charAt(0).toUpperCase() || 'U' }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.full_name || 'Anonymous' }}</div>
                      <div class="text-sm text-gray-500 font-mono text-xs">{{ user.id.substring(0, 8) }}...</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="[
                      user.role === 'admin' ? 'bg-black text-white' : 
                      user.role === 'staff' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-800',
                      'px-2.5 py-0.5 rounded-full text-xs font-medium'
                    ]"
                  >
                    {{ user.role || 'student' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="openEditModal(user)" class="text-gray-600 hover:text-black mr-4">Edit Role</button>
                  <button @click="openDeleteModal(user)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Register User Modal -->
    <div v-if="isRegisterModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="isRegisterModalOpen = false"></div>
      
      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900">Register New User</h3>
          <button @click="isRegisterModalOpen = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form @submit.prevent="handleRegister" class="p-6 space-y-4">
          <div v-if="registerMessage" :class="[registerMessageType === 'success' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50', 'p-3 rounded-lg text-sm font-medium']">
            {{ registerMessage }}
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input v-model="registerForm.fullName" type="text" required class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black sm:text-sm" placeholder="John Doe" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="registerForm.email" type="email" required class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black sm:text-sm" placeholder="john@example.com" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input v-model="registerForm.password" type="password" required minlength="6" class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black sm:text-sm" placeholder="••••••••" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select v-model="registerForm.role" class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black sm:text-sm">
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div class="pt-4 flex gap-3">
            <button type="button" @click="isRegisterModalOpen = false" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="userStore.isLoading" class="flex-1 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none disabled:opacity-50 flex justify-center items-center">
              <svg v-if="userStore.isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Role Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="isEditModalOpen = false"></div>
      
      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900">Edit Role</h3>
          <button @click="isEditModalOpen = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form @submit.prevent="handleEditRole" class="p-6 space-y-4">
          <p class="text-sm text-gray-500 mb-4">Change role for <span class="font-bold text-gray-900">{{ selectedUser?.full_name }}</span></p>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <select v-model="editRoleValue" class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black sm:text-sm">
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div class="pt-4 flex gap-3">
            <button type="button" @click="isEditModalOpen = false" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="userStore.isLoading" class="flex-1 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none disabled:opacity-50">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="isDeleteModalOpen = false"></div>
      
      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div class="p-6">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h3 class="text-lg font-bold text-center text-gray-900 mb-2">Delete User Profile</h3>
          <p class="text-sm text-center text-gray-500 mb-6">Are you sure you want to delete <span class="font-bold">{{ selectedUser?.full_name }}</span>'s profile? This action cannot be undone.</p>
          
          <div class="flex gap-3">
            <button type="button" @click="isDeleteModalOpen = false" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
            <button @click="handleDelete" :disabled="userStore.isLoading" class="flex-1 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none disabled:opacity-50">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import type { Profile } from '~/models'

definePageMeta({ layout: false, middleware: ['auth'] })

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'Unknown'
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

// Register Modal State
const isRegisterModalOpen = ref(false)
const registerMessage = ref('')
const registerMessageType = ref<'success'|'error'>('success')
const registerForm = ref({
  fullName: '',
  email: '',
  password: '',
  role: 'student'
})

const openRegisterModal = () => {
  registerForm.value = { fullName: '', email: '', password: '', role: 'student' }
  registerMessage.value = ''
  isRegisterModalOpen.value = true
}

const handleRegister = async () => {
  registerMessage.value = ''
  try {
    await userStore.registerUser(
      registerForm.value.email,
      registerForm.value.password,
      registerForm.value.fullName,
      registerForm.value.role
    )
    registerMessageType.value = 'success'
    registerMessage.value = 'User registered successfully!'
    
    setTimeout(() => {
      isRegisterModalOpen.value = false
    }, 1500)
  } catch (err: any) {
    registerMessageType.value = 'error'
    registerMessage.value = err.message || 'Failed to register user.'
  }
}

// Edit Modal State
const isEditModalOpen = ref(false)
const selectedUser = ref<Profile | null>(null)
const editRoleValue = ref('student')

const openEditModal = (user: Profile) => {
  selectedUser.value = user
  editRoleValue.value = user.role || 'student'
  isEditModalOpen.value = true
}

const handleEditRole = async () => {
  if (!selectedUser.value) return
  try {
    await userStore.updateUserRole(selectedUser.value.id, editRoleValue.value)
    isEditModalOpen.value = false
  } catch (err) {
    alert('Failed to update role')
  }
}

// Delete Modal State
const isDeleteModalOpen = ref(false)

const openDeleteModal = (user: Profile) => {
  selectedUser.value = user
  isDeleteModalOpen.value = true
}

const handleDelete = async () => {
  if (!selectedUser.value) return
  try {
    await userStore.deleteUser(selectedUser.value.id)
    isDeleteModalOpen.value = false
  } catch (err) {
    alert('Failed to delete user profile')
  }
}
</script>
