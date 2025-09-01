<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-white">Analytics Dashboard</h1>
      <p class="text-white/80">Comprehensive insights into your BusinessHub performance</p>
    </div>
    
    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="stat-card">
        <h3 class="text-2xl font-bold text-white">{{ userStats.total }}</h3>
        <p class="text-white/80 text-sm">Total Users</p>
        <div class="mt-2 text-green-400 text-xs">
          +{{ userStats.growthRate }}% growth
        </div>
      </div>
      
      <div class="stat-card">
        <h3 class="text-2xl font-bold text-white">{{ userStats.active }}</h3>
        <p class="text-white/80 text-sm">Active Users</p>
        <div class="mt-2 text-blue-400 text-xs">
          {{ ((userStats.active / userStats.total) * 100).toFixed(1) }}% engagement
        </div>
      </div>
      
      <div class="stat-card">
        <h3 class="text-2xl font-bold text-white">{{ averageRating }}</h3>
        <p class="text-white/80 text-sm">Average Rating</p>
        <div class="mt-2 text-yellow-400 text-xs">
          {{ totalRatings }} total ratings
        </div>
      </div>
      
      <div class="stat-card">
        <h3 class="text-2xl font-bold text-white">{{ topLocation }}</h3>
        <p class="text-white/80 text-sm">Top Location</p>
        <div class="mt-2 text-purple-400 text-xs">
          Most popular city
        </div>
      </div>
    </div>
    
    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- User Growth Chart -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">User Growth Trend</h3>
        <div class="h-64 flex items-center justify-center">
          <div class="text-center text-white/60">
            <ChartBarIcon class="w-16 h-16 mx-auto mb-4 text-white/40" />
            <p class="text-lg">Chart Component</p>
            <p class="text-sm">User growth over time visualization</p>
          </div>
        </div>
      </div>
      
      <!-- User Distribution by Location -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">Users by Location</h3>
        <div class="h-64 flex items-center justify-center">
          <div class="text-center text-white/60">
            <MapPinIcon class="w-16 h-16 mx-auto mb-4 text-white/40" />
            <p class="text-lg">Map Component</p>
            <p class="text-sm">Geographic distribution of users</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Detailed Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Top Performing Users -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">Top Rated Users</h3>
        <div class="space-y-3">
          <div v-for="(user, index) in topRatedUsers" :key="user.id" class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <p class="text-white font-medium text-sm">{{ user.name }} {{ user.surname }}</p>
              <p class="text-white/60 text-xs">{{ user.city || 'N/A' }}</p>
            </div>
            <div class="flex items-center space-x-1">
              <StarIcon class="w-4 h-4 text-yellow-400" />
              <span class="text-white text-sm font-medium">{{ user.ratings }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Location Statistics -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">Location Statistics</h3>
        <div class="space-y-3">
          <div v-for="location in topLocations" :key="location.city" class="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p class="text-white font-medium text-sm">{{ location.city }}</p>
              <p class="text-white/60 text-xs">{{ location.state }}, {{ location.country }}</p>
            </div>
            <div class="text-right">
              <p class="text-white font-medium text-sm">{{ location.count }}</p>
              <p class="text-white/60 text-xs">users</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- User Activity -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">User Activity</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-white/80 text-sm">Active Users</span>
            <span class="text-white font-medium">{{ userStats.active }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-white/80 text-sm">Inactive Users</span>
            <span class="text-white font-medium">{{ userStats.total - userStats.active }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-white/80 text-sm">New This Month</span>
            <span class="text-white font-medium">{{ userStats.newUsers }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-white/80 text-sm">Growth Rate</span>
            <span class="text-green-400 font-medium">{{ userStats.growthRate }}%</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Data Export -->
    <div class="glass-card p-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-semibold text-white">Export Data</h3>
          <p class="text-white/80 text-sm">Download analytics data for external analysis</p>
        </div>
        
        <div class="flex items-center space-x-3">
          <button class="glass-button">
            <DocumentArrowDownIcon class="w-5 h-5 mr-2" />
            Export CSV
          </button>
          
          <button class="glass-button">
            <DocumentChartBarIcon class="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import {
  ChartBarIcon,
  MapPinIcon,
  StarIcon,
  DocumentArrowDownIcon,
  DocumentChartBarIcon
} from '@heroicons/vue/24/outline'

const usersStore = useUsersStore()

// Computed properties
const userStats = computed(() => usersStore.getUserStats())

const averageRating = computed(() => {
  const usersWithRatings = usersStore.users.filter(user => user.ratings && user.ratings > 0)
  if (usersWithRatings.length === 0) return 'N/A'
  
  const totalRating = usersWithRatings.reduce((sum, user) => sum + user.ratings, 0)
  return (totalRating / usersWithRatings.length).toFixed(1)
})

const totalRatings = computed(() => {
  return usersStore.users.filter(user => user.ratings && user.ratings > 0).length
})

const topRatedUsers = computed(() => {
  return usersStore.users
    .filter(user => user.ratings && user.ratings > 0)
    .sort((a, b) => b.ratings - a.ratings)
    .slice(0, 5)
})

const topLocations = computed(() => {
  const locationCounts = {}
  
  usersStore.users.forEach(user => {
    if (user.city) {
      const key = `${user.city}-${user.state}-${user.country}`
      if (!locationCounts[key]) {
        locationCounts[key] = {
          city: user.city,
          state: user.state || '',
          country: user.country || '',
          count: 0
        }
      }
      locationCounts[key].count++
    }
  })
  
  return Object.values(locationCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

const topLocation = computed(() => {
  if (topLocations.value.length > 0) {
    return topLocations.value[0].city
  }
  return 'N/A'
})

// Lifecycle
onMounted(async () => {
  if (usersStore.users.length === 0) {
    await usersStore.fetchUsers()
  }
})
</script>
