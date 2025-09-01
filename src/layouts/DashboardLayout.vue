<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-600">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white/10 backdrop-blur-md border-r border-white/20">
      <div class="flex items-center justify-center h-16 px-6 border-b border-white/20">
        <h1 class="text-xl font-bold text-white text-shadow">BusinessHub</h1>
      </div>
      
      <nav class="mt-8 px-4 space-y-2">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.path"
          :class="[
            'sidebar-item',
            $route.path === item.path ? 'active' : ''
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          {{ item.name }}
        </router-link>
      </nav>
      
      <!-- User Profile Section -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <UserIcon class="w-6 h-6 text-white" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-white">{{ authStore.user?.name }}</p>
            <p class="text-xs text-white/60">{{ authStore.user?.email }}</p>
          </div>
          <button
            @click="authStore.logout"
            class="text-white/60 hover:text-white transition-colors"
          >
            <ArrowRightOnRectangleIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="ml-64">
      <!-- Header -->
      <header class="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white text-shadow">
              {{ currentPageTitle }}
            </h2>
            <p class="text-white/80">{{ currentPageDescription }}</p>
          </div>
          
          <!-- Header Actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="relative p-2 text-white/80 hover:text-white transition-colors">
              <BellIcon class="w-6 h-6" />
              <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <!-- Search -->
            <div class="relative">
              <input
                type="text"
                placeholder="Search..."
                class="glass-input w-64 pl-10 pr-4"
              />
              <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            </div>
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  HomeIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const authStore = useAuthStore()

const navigationItems = [
  { name: 'Dashboard', path: '/', icon: HomeIcon },
  { name: 'Users', path: '/users', icon: UsersIcon },
  { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
]

const currentPageTitle = computed(() => {
  const currentRoute = navigationItems.find(item => item.path === route.path)
  return currentRoute ? currentRoute.name : 'Dashboard'
})

const currentPageDescription = computed(() => {
  switch (route.path) {
    case '/':
      return 'Overview of your business operations and user statistics'
    case '/users':
      return 'Manage user accounts and profiles'
    case '/analytics':
      return 'Detailed insights and performance metrics'
    case '/settings':
      return 'Configure your dashboard preferences'
    default:
      return 'BusinessHub Admin Dashboard'
  }
})
</script>

<style scoped>
/* Custom scrollbar for sidebar */
.sidebar-item::-webkit-scrollbar {
  width: 4px;
}

.sidebar-item::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-item::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.sidebar-item::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
