import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedUser = ref(null)
  
  const totalUsers = computed(() => users.value.length)
  const activeUsers = computed(() => users.value.filter(user => user.ratings && user.ratings > 0).length)
  const newUsers = computed(() => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return users.value.filter(user => {
      // Assuming user has a created_at field, for now we'll use a simple filter
      return user.id && user.id > 0
    }).length
  })
  
  const fetchUsers = async () => {
    try {
      loading.value = true
      error.value = null
      
      const response = await api.get('/user-management')
      users.value = response.data
    } catch (err) {
      error.value = err.message || 'Failed to fetch users'
      console.error('Error fetching users:', err)
    } finally {
      loading.value = false
    }
  }
  
  const fetchUserById = async (id) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await api.get(`/user-management/${id}`)
      selectedUser.value = response.data
      return response.data
    } catch (err) {
      error.value = err.message || 'Failed to fetch user'
      console.error('Error fetching user:', err)
      return null
    } finally {
      loading.value = false
    }
  }
  
  const updateUser = async (id, userData) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await api.patch(`/user-management/${id}`, userData)
      
      // Update local state
      const index = users.value.findIndex(user => user.id === id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...userData }
      }
      
      if (selectedUser.value && selectedUser.value.id === id) {
        selectedUser.value = { ...selectedUser.value, ...userData }
      }
      
      return { success: true, data: response.data }
    } catch (err) {
      error.value = err.message || 'Failed to update user'
      console.error('Error updating user:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }
  
  const deleteUser = async (id) => {
    try {
      loading.value = true
      error.value = null
      
      await api.delete(`/user-management/${id}`)
      
      // Remove from local state
      users.value = users.value.filter(user => user.id !== id)
      
      if (selectedUser.value && selectedUser.value.id === id) {
        selectedUser.value = null
      }
      
      return { success: true }
    } catch (err) {
      error.value = err.message || 'Failed to delete user'
      console.error('Error deleting user:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }
  
  const searchUsers = (query) => {
    if (!query) return users.value
    
    const lowercaseQuery = query.toLowerCase()
    return users.value.filter(user => 
      user.name?.toLowerCase().includes(lowercaseQuery) ||
      user.surname?.toLowerCase().includes(lowercaseQuery) ||
      user.email?.toLowerCase().includes(lowercaseQuery) ||
      user.city?.toLowerCase().includes(lowercaseQuery)
    )
  }
  
  const getUserStats = () => {
    const total = totalUsers.value
    const active = activeUsers.value
    const newUsersCount = newUsers.value
    
    return {
      total,
      active,
      newUsers: newUsersCount,
      inactive: total - active,
      growthRate: total > 0 ? ((newUsersCount / total) * 100).toFixed(1) : 0
    }
  }
  
  return {
    users,
    loading,
    error,
    selectedUser,
    totalUsers,
    activeUsers,
    newUsers,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    searchUsers,
    getUserStats
  }
})
