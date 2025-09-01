import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('admin_token') || null)
  const loading = ref(false)
  const error = ref(null)
  
  const router = useRouter()
  
  const isAuthenticated = computed(() => !!token.value)
  
  const login = async (credentials) => {
    try {
      loading.value = true
      error.value = null
      
      // For admin login, we'll use a simple approach
      // In production, you should implement proper admin authentication
      if (credentials.email === 'admin@businesshub.com' && credentials.password === 'admin123') {
        const adminUser = {
          id: 'admin',
          name: 'Admin',
          email: 'admin@businesshub.com',
          role: 'admin'
        }
        
        user.value = adminUser
        token.value = 'admin_token_' + Date.now()
        localStorage.setItem('admin_token', token.value)
        localStorage.setItem('admin_user', JSON.stringify(adminUser))
        
        router.push('/')
        return { success: true }
      } else {
        error.value = 'Invalid credentials'
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (err) {
      error.value = err.message || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    router.push('/login')
  }
  
  const checkAuth = () => {
    const storedToken = localStorage.getItem('admin_token')
    const storedUser = localStorage.getItem('admin_user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }
  
  // Initialize auth state
  checkAuth()
  
  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
})
