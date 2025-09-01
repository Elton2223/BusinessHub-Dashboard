<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-white">Dashboard Settings</h1>
      <p class="text-white/80">Configure your BusinessHub admin dashboard preferences</p>
    </div>
    
    <!-- Settings Sections -->
    <div class="space-y-6">
      <!-- General Settings -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">General Settings</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Dashboard Title</label>
            <input
              v-model="settings.dashboardTitle"
              type="text"
              class="glass-input w-full"
              placeholder="BusinessHub Admin Dashboard"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Company Name</label>
            <input
              v-model="settings.companyName"
              type="text"
              class="glass-input w-full"
              placeholder="BusinessHub"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Admin Email</label>
            <input
              v-model="settings.adminEmail"
              type="email"
              class="glass-input w-full"
              placeholder="admin@businesshub.com"
            />
          </div>
          
          <div class="flex items-center space-x-3">
            <input
              v-model="settings.enableNotifications"
              type="checkbox"
              id="notifications"
              class="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label for="notifications" class="text-white/80 text-sm">
              Enable email notifications
            </label>
          </div>
        </div>
      </div>
      
      <!-- Display Settings -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">Display Settings</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Theme</label>
            <select v-model="settings.theme" class="glass-input w-full">
              <option value="auto">Auto (System)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Items per page</label>
            <select v-model="settings.itemsPerPage" class="glass-input w-full">
              <option value="10">10 items</option>
              <option value="25">25 items</option>
              <option value="50">50 items</option>
              <option value="100">100 items</option>
            </select>
          </div>
          
          <div class="flex items-center space-x-3">
            <input
              v-model="settings.showSidebar"
              type="checkbox"
              id="sidebar"
              class="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label for="sidebar" class="text-white/80 text-sm">
              Always show sidebar
            </label>
          </div>
          
          <div class="flex items-center space-x-3">
            <input
              v-model="settings.compactMode"
              type="checkbox"
              id="compact"
              class="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label for="compact" class="text-white/80 text-sm">
              Compact mode
            </label>
          </div>
        </div>
      </div>
      
      <!-- API Configuration -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">API Configuration</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Backend API URL</label>
            <input
              v-model="settings.apiUrl"
              type="url"
              class="glass-input w-full"
              placeholder="http://127.0.0.1:3005"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">API Timeout (seconds)</label>
            <input
              v-model="settings.apiTimeout"
              type="number"
              min="5"
              max="60"
              class="glass-input w-full"
              placeholder="10"
            />
          </div>
          
          <div class="flex items-center space-x-3">
            <input
              v-model="settings.enableApiLogging"
              type="checkbox"
              id="apiLogging"
              class="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label for="apiLogging" class="text-white/80 text-sm">
              Enable API request logging
            </label>
          </div>
        </div>
      </div>
      
      <!-- Security Settings -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">Security Settings</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Session Timeout (minutes)</label>
            <input
              v-model="settings.sessionTimeout"
              type="number"
              min="15"
              max="480"
              class="glass-input w-full"
              placeholder="30"
            />
          </div>
          
          <div class="flex items-center space-x-3">
            <input
              v-model="settings.requirePasswordChange"
              type="checkbox"
              id="passwordChange"
              class="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label for="passwordChange" class="text-white/80 text-sm">
              Require password change every 90 days
            </label>
          </div>
          
          <div class="flex items-center space-x-3">
            <input
              v-model="settings.enableTwoFactor"
              type="checkbox"
              id="twoFactor"
              class="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label for="twoFactor" class="text-white/80 text-sm">
              Enable two-factor authentication
            </label>
          </div>
        </div>
      </div>
      
      <!-- Data Management -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">Data Management</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Data Retention (days)</label>
            <input
              v-model="settings.dataRetention"
              type="number"
              min="30"
              max="365"
              class="glass-input w-full"
              placeholder="90"
            />
          </div>
          
          <div class="flex items-center space-x-3">
            <input
              v-model="settings.autoBackup"
              type="checkbox"
              id="autoBackup"
              class="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label for="autoBackup" class="text-white/80 text-sm">
              Enable automatic data backup
            </label>
          </div>
          
          <div class="flex items-center space-x-3">
            <input
              v-model="settings.exportData"
              type="checkbox"
              id="exportData"
              class="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label for="exportData" class="text-white/80 text-sm">
              Allow data export
            </label>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex items-center justify-end space-x-4">
      <button
        @click="resetSettings"
        class="glass-button bg-red-500/20 hover:bg-red-500/30 border-red-500/30"
      >
        Reset to Defaults
      </button>
      
      <button
        @click="saveSettings"
        :disabled="saving"
        class="glass-button bg-green-500/20 hover:bg-green-500/30 border-green-500/30"
      >
        {{ saving ? 'Saving...' : 'Save Settings' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const saving = ref(false)
const settings = ref({
  // General
  dashboardTitle: 'BusinessHub Admin Dashboard',
  companyName: 'BusinessHub',
  adminEmail: 'admin@businesshub.com',
  enableNotifications: true,
  
  // Display
  theme: 'auto',
  itemsPerPage: 25,
  showSidebar: true,
  compactMode: false,
  
  // API
  apiUrl: 'http://127.0.0.1:3005',
  apiTimeout: 10,
  enableApiLogging: false,
  
  // Security
  sessionTimeout: 30,
  requirePasswordChange: false,
  enableTwoFactor: false,
  
  // Data
  dataRetention: 90,
  autoBackup: true,
  exportData: true
})

// Methods
const saveSettings = async () => {
  try {
    saving.value = true
    
    // Save settings to localStorage
    localStorage.setItem('dashboard_settings', JSON.stringify(settings.value))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    console.log('Settings saved successfully')
  } catch (error) {
    console.error('Failed to save settings:', error)
  } finally {
    saving.value = false
  }
}

const resetSettings = () => {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    // Reset to default values
    settings.value = {
      dashboardTitle: 'BusinessHub Admin Dashboard',
      companyName: 'BusinessHub',
      adminEmail: 'admin@businesshub.com',
      enableNotifications: true,
      theme: 'auto',
      itemsPerPage: 25,
      showSidebar: true,
      compactMode: false,
      apiUrl: 'http://127.0.0.1:3005',
      apiTimeout: 10,
      enableApiLogging: false,
      sessionTimeout: 30,
      requirePasswordChange: false,
      enableTwoFactor: false,
      dataRetention: 90,
      autoBackup: true,
      exportData: true
    }
    
    // Remove from localStorage
    localStorage.removeItem('dashboard_settings')
  }
}

const loadSettings = () => {
  const savedSettings = localStorage.getItem('dashboard_settings')
  if (savedSettings) {
    try {
      settings.value = { ...settings.value, ...JSON.parse(savedSettings) }
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
  }
}

// Lifecycle
onMounted(() => {
  loadSettings()
})
</script>
