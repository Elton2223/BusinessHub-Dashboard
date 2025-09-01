import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // This will be proxied to http://127.0.0.1:3005
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints for user management
export const userAPI = {
  // Get all users
  getUsers: () => api.get('/user-management'),
  
  // Get user by ID
  getUser: (id) => api.get(`/user-management/${id}`),
  
  // Create new user
  createUser: (userData) => api.post('/user-management', userData),
  
  // Update user
  updateUser: (id, userData) => api.patch(`/user-management/${id}`, userData),
  
  // Delete user
  deleteUser: (id) => api.delete(`/user-management/${id}`),
  
  // User login (for reference)
  loginUser: (credentials) => api.post('/user-management/login', credentials),
  
  // Update user profile
  updateProfile: (id, profileData) => api.put(`/user-management/${id}/profile`, profileData),
  
  // Get user count
  getUserCount: () => api.get('/user-management/count')
}

// API endpoints for analytics
export const analyticsAPI = {
  // Get user statistics
  getUserStats: () => api.get('/user-management/count'),
  
  // Get users with filters for analytics
  getUsersForAnalytics: (filter) => api.get('/user-management', { params: filter })
}

export default api
