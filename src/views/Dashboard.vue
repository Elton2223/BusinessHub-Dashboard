<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="glass-card p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">
            Welcome back, {{ authStore.user?.name }}! 👋
          </h1>
          <p class="text-white/80 text-lg">
            Here's what's happening with your BusinessHub today.
          </p>
        </div>
        <div class="text-right">
          <p class="text-white/60 text-sm">{{ currentDate }}</p>
          <p class="text-white/80 text-lg">{{ currentTime }}</p>
        </div>
      </div>
    </div>
    
    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="stat-card">
        <div class="flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-lg mb-4 mx-auto">
          <UsersIcon class="w-6 h-6 text-primary-400" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">{{ userStats.total }}</h3>
        <p class="text-white/80 text-sm">Total Users</p>
        <div class="mt-2 text-green-400 text-xs">
          +{{ userStats.growthRate }}% from last month
        </div>
      </div>
      
      <div class="stat-card">
        <div class="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-4 mx-auto">
          <CheckCircleIcon class="w-6 h-6 text-green-400" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">{{ userStats.active }}</h3>
        <p class="text-white/80 text-sm">Active Users</p>
        <div class="mt-2 text-green-400 text-xs">
          {{ ((userStats.active / userStats.total) * 100).toFixed(1) }}% engagement
        </div>
      </div>
      
      <div class="stat-card">
        <div class="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mb-4 mx-auto">
          <UserPlusIcon class="w-6 h-6 text-blue-400" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">{{ userStats.newUsers }}</h3>
        <p class="text-white/80 text-sm">New Users</p>
        <div class="mt-2 text-blue-400 text-xs">
          This month
        </div>
      </div>
      
      <div class="stat-card">
        <div class="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mb-4 mx-auto">
          <StarIcon class="w-6 h-6 text-purple-400" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">{{ averageRating }}</h3>
        <p class="text-white/80 text-sm">Avg Rating</p>
        <div class="mt-2 text-purple-400 text-xs">
          {{ totalRatings }} total ratings
        </div>
      </div>
    </div>
    
    <!-- Recent Activity and Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Users -->
      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-white">Recent Users</h3>
          <router-link to="/users" class="text-primary-300 hover:text-primary-200 text-sm">
            View all →
          </router-link>
        </div>
        
        <div class="space-y-3">
          <div v-for="user in recentUsers" :key="user.id" class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center">
              <span class="text-white font-semibold text-sm">
                {{ getUserInitials(user) }}
              </span>
            </div>
            <div class="flex-1">
              <p class="text-white font-medium">{{ user.name }} {{ user.surname }}</p>
              <p class="text-white/60 text-sm">{{ user.email }}</p>
            </div>
            <div class="text-right">
              <p class="text-white/80 text-xs">{{ user.city || 'N/A' }}</p>
              <div v-if="user.ratings" class="flex items-center space-x-1">
                <StarIcon class="w-3 h-3 text-yellow-400" />
                <span class="text-white/80 text-xs">{{ user.ratings }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        
        <div class="space-y-3">
          <router-link
            to="/users"
            class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <UsersIcon class="w-5 h-5 text-primary-400" />
            <span class="text-white">Manage Users</span>
          </router-link>
          
          <router-link
            to="/analytics"
            class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChartBarIcon class="w-5 h-5 text-green-400" />
            <span class="text-white">View Analytics</span>
          </router-link>
          
          <router-link
            to="/settings"
            class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Cog6ToothIcon class="w-5 h-5 text-blue-400" />
            <span class="text-white">Dashboard Settings</span>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- System Status -->
    <div class="glass-card p-6">
      <h3 class="text-xl font-semibold text-white mb-4">System Status</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex items-center space-x-3 p-3 bg-green-500/20 rounded-lg">
          <div class="w-3 h-3 bg-green-400 rounded-full"></div>
          <span class="text-white">Backend API</span>
          <span class="text-green-400 text-sm">Online</span>
        </div>
        
        <div class="flex items-center space-x-3 p-3 bg-green-500/20 rounded-lg">
          <div class="w-3 h-3 bg-green-400 rounded-full"></div>
          <span class="text-white">Database</span>
          <span class="text-green-400 text-sm">Connected</span>
        </div>
        
        <div class="flex items-center space-x-3 p-3 bg-green-500/20 rounded-lg">
          <div class="w-3 h-3 bg-green-400 rounded-full"></div>
          <span class="text-white">Mobile App</span>
          <span class="text-green-400 text-sm">Synced</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUsersStore } from '@/stores/users'
import {
  UsersIcon,
  CheckCircleIcon,
  UserPlusIcon,
  StarIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const usersStore = useUsersStore()

const currentDate = ref('')
const currentTime = ref('')
let timeInterval = null

// Computed properties
const userStats = computed(() => usersStore.getUserStats())

const recentUsers = computed(() => {
  return usersStore.users.slice(0, 5)
})

const averageRating = computed(() => {
  const usersWithRatings = usersStore.users.filter(user => user.ratings && user.ratings > 0)
  if (usersWithRatings.length === 0) return 'N/A'
  
  const totalRating = usersWithRatings.reduce((sum, user) => sum + user.ratings, 0)
  return (totalRating / usersWithRatings.length).toFixed(1)
})

const totalRatings = computed(() => {
  return usersStore.users.filter(user => user.ratings && user.ratings > 0).length
})

// Methods
const updateDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const getUserInitials = (user) => {
  const firstName = user.name || ''
  const lastName = user.surname || ''
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
}

// Lifecycle
onMounted(async () => {
  updateDateTime()
  timeInterval = setInterval(updateDateTime, 1000)
  
  // Fetch users if not already loaded
  if (usersStore.users.length === 0) {
    await usersStore.fetchUsers()
  }
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>
