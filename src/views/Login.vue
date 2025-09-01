<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
          <BuildingOfficeIcon class="w-12 h-12 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-white text-shadow mb-2">BusinessHub</h1>
        <p class="text-white/80">Admin Dashboard</p>
      </div>
      
      <!-- Login Form -->
      <div class="glass-card p-8">
        <h2 class="text-2xl font-bold text-white text-center mb-6">Sign In</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-white/80 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="glass-input w-full"
              placeholder="admin@businesshub.com"
            />
          </div>
          
          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-white/80 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="glass-input w-full"
              placeholder="••••••••"
            />
          </div>
          
          <!-- Error Message -->
          <div v-if="authStore.error" class="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
            <p class="text-red-200 text-sm">{{ authStore.error }}</p>
          </div>
          
          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.loading"
            class="glass-button w-full py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authStore.loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>
        
        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
          <h3 class="text-sm font-medium text-white mb-2">Demo Credentials</h3>
          <div class="text-xs text-white/70 space-y-1">
            <p><strong>Email:</strong> admin@businesshub.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="text-center mt-6">
        <p class="text-white/60 text-sm">
          © 2024 BusinessHub. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { BuildingOfficeIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()

const form = ref({
  email: 'admin@businesshub.com',
  password: 'admin123'
})

const handleLogin = async () => {
  const result = await authStore.login(form.value)
  if (!result.success) {
    // Error is already handled in the store
    console.error('Login failed:', result.error)
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass-card {
  animation: fadeInUp 0.6s ease-out;
}
</style>
