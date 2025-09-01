<template>
  <div class="space-y-6">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">User Management</h1>
        <p class="text-white/80">Manage all registered users in your BusinessHub</p>
      </div>
      
      <div class="flex items-center space-x-3">
        <!-- Search -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="glass-input w-64 pl-10 pr-4"
          />
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
        </div>
        
        <!-- Refresh Button -->
        <button
          @click="refreshUsers"
          :disabled="usersStore.loading"
          class="glass-button flex items-center space-x-2"
        >
          <ArrowPathIcon class="w-5 h-5" />
          <span>Refresh</span>
        </button>
      </div>
    </div>
    
    <!-- Statistics Bar -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="stat-card">
        <h3 class="text-2xl font-bold text-white">{{ userStats.total }}</h3>
        <p class="text-white/80 text-sm">Total Users</p>
      </div>
      <div class="stat-card">
        <h3 class="text-2xl font-bold text-white">{{ userStats.active }}</h3>
        <p class="text-white/80 text-sm">Active Users</p>
      </div>
      <div class="stat-card">
        <h3 class="text-2xl font-bold text-white">{{ userStats.newUsers }}</h3>
        <p class="text-white/80 text-sm">New This Month</p>
      </div>
      <div class="stat-card">
        <h3 class="text-2xl font-bold text-white">{{ userStats.growthRate }}%</h3>
        <p class="text-white/80 text-sm">Growth Rate</p>
      </div>
    </div>
    
    <!-- Users Table -->
    <div class="table-container">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="table-header">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Contact
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Location
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Rating
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-white/80 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr v-if="usersStore.loading" class="table-row">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex items-center justify-center space-x-2">
                  <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="text-white">Loading users...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="filteredUsers.length === 0" class="table-row">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="text-white/60">
                  <UsersIcon class="w-12 h-12 mx-auto mb-4 text-white/40" />
                  <p class="text-lg font-medium">No users found</p>
                  <p class="text-sm">Try adjusting your search criteria</p>
                </div>
              </td>
            </tr>
            
            <tr v-else v-for="user in filteredUsers" :key="user.id" class="table-row">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold text-sm">
                      {{ getUserInitials(user) }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-white">
                      {{ user.name }} {{ user.surname }}
                    </div>
                    <div class="text-sm text-white/60">
                      ID: {{ user.id }}
                    </div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-white">{{ user.email }}</div>
                <div class="text-sm text-white/60">
                  {{ user.phone_number || 'No phone' }}
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-white">
                  {{ user.city || 'N/A' }}, {{ user.state || 'N/A' }}
                </div>
                <div class="text-sm text-white/60">
                  {{ user.country || 'N/A' }}
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="user.ratings" class="flex items-center space-x-1">
                  <StarIcon class="w-4 h-4 text-yellow-400" />
                  <span class="text-white">{{ user.ratings }}</span>
                </div>
                <div v-else class="text-white/40 text-sm">No rating</div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="user.ratings ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                  {{ user.ratings ? 'Active' : 'Inactive' }}
                </span>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <router-link
                    :to="`/users/${user.id}`"
                    class="text-primary-300 hover:text-primary-200 transition-colors"
                  >
                    <EyeIcon class="w-5 h-5" />
                  </router-link>
                  
                  <button
                    @click="editUser(user)"
                    class="text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    <PencilIcon class="w-5 h-5" />
                  </button>
                  
                  <button
                    @click="deleteUser(user)"
                    class="text-red-300 hover:text-red-200 transition-colors"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Pagination -->
    <div v-if="filteredUsers.length > 0" class="flex items-center justify-between">
      <div class="text-white/60 text-sm">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} of {{ filteredUsers.length }} results
      </div>
      
      <div class="flex items-center space-x-2">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="glass-button px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <span class="text-white px-3 py-2">Page {{ currentPage }} of {{ totalPages }}</span>
        
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="glass-button px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  UsersIcon,
  StarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'

const usersStore = useUsersStore()

// Reactive data
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computed properties
const userStats = computed(() => usersStore.getUserStats())

const filteredUsers = computed(() => {
  return usersStore.searchUsers(searchQuery.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value)
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredUsers.value.slice(start, end)
})

// Methods
const refreshUsers = async () => {
  await usersStore.fetchUsers()
}

const getUserInitials = (user) => {
  const firstName = user.name || ''
  const lastName = user.surname || ''
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
}

const editUser = (user) => {
  // TODO: Implement edit user modal
  console.log('Edit user:', user)
}

const deleteUser = async (user) => {
  if (confirm(`Are you sure you want to delete ${user.name} ${user.surname}?`)) {
    const result = await usersStore.deleteUser(user.id)
    if (result.success) {
      // User deleted successfully
      console.log('User deleted successfully')
    } else {
      console.error('Failed to delete user:', result.error)
    }
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Lifecycle
onMounted(async () => {
  if (usersStore.users.length === 0) {
    await usersStore.fetchUsers()
  }
})
</script>
