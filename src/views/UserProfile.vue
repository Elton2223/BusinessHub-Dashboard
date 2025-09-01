<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">User Profile</h1>
        <p class="text-white/80">View and manage user information</p>
      </div>
      
      <div class="flex items-center space-x-3">
        <router-link to="/users" class="glass-button">
          ← Back to Users
        </router-link>
        
        <button
          @click="toggleEditMode"
          class="glass-button"
        >
          {{ isEditMode ? 'Cancel' : 'Edit Profile' }}
        </button>
        
        <button
          v-if="isEditMode"
          @click="saveChanges"
          :disabled="saving"
          class="glass-button bg-green-500/20 hover:bg-green-500/30 border-green-500/30"
        >
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="usersStore.loading" class="glass-card p-12 text-center">
      <div class="flex items-center justify-center space-x-2">
        <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-white text-lg">Loading user profile...</span>
      </div>
    </div>
    
    <!-- User Profile Content -->
    <div v-else-if="user" class="space-y-6">
      <!-- Profile Header -->
      <div class="glass-card p-6">
        <div class="flex items-center space-x-6">
          <div class="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-2xl">
              {{ getUserInitials(user) }}
            </span>
          </div>
          
          <div class="flex-1">
            <h2 class="text-3xl font-bold text-white mb-2">
              {{ user.name }} {{ user.surname }}
            </h2>
            <p class="text-white/80 text-lg mb-2">{{ user.email }}</p>
            <div class="flex items-center space-x-4">
              <div v-if="user.ratings" class="flex items-center space-x-2">
                <StarIcon class="w-5 h-5 text-yellow-400" />
                <span class="text-white font-medium">{{ user.ratings }} Rating</span>
              </div>
              <span class="text-white/60">ID: {{ user.id }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Profile Information -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Personal Information -->
        <div class="glass-card p-6">
          <h3 class="text-xl font-semibold text-white mb-4">Personal Information</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">First Name</label>
              <input
                v-model="editForm.name"
                :disabled="!isEditMode"
                type="text"
                class="glass-input w-full disabled:opacity-50"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Last Name</label>
              <input
                v-model="editForm.surname"
                :disabled="!isEditMode"
                type="text"
                class="glass-input w-full disabled:opacity-50"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input
                v-model="editForm.email"
                :disabled="!isEditMode"
                type="email"
                class="glass-input w-full disabled:opacity-50"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
              <input
                v-model="editForm.phone_number"
                :disabled="!isEditMode"
                type="tel"
                class="glass-input w-full disabled:opacity-50"
              />
            </div>
          </div>
        </div>
        
        <!-- Location Information -->
        <div class="glass-card p-6">
          <h3 class="text-xl font-semibold text-white mb-4">Location Information</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Street Address</label>
              <input
                v-model="editForm.street_address"
                :disabled="!isEditMode"
                type="text"
                class="glass-input w-full disabled:opacity-50"
              />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-white/80 mb-2">City</label>
                <input
                  v-model="editForm.city"
                  :disabled="!isEditMode"
                  type="text"
                  class="glass-input w-full disabled:opacity-50"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-white/80 mb-2">State</label>
                <input
                  v-model="editForm.state"
                  :disabled="!isEditMode"
                  type="text"
                  class="glass-input w-full disabled:opacity-50"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-white/80 mb-2">Postal Code</label>
                <input
                  v-model="editForm.postal_code"
                  :disabled="!isEditMode"
                  type="text"
                  class="glass-input w-full disabled:opacity-50"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-white/80 mb-2">Country</label>
                <input
                  v-model="editForm.country"
                  :disabled="!isEditMode"
                  type="text"
                  class="glass-input w-full disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Additional Information -->
      <div class="glass-card p-6">
        <h3 class="text-xl font-semibold text-white mb-4">Additional Information</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Profile Photo URL</label>
            <input
              v-model="editForm.profile_photo"
              :disabled="!isEditMode"
              type="url"
              class="glass-input w-full disabled:opacity-50"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Identification Document</label>
            <input
              v-model="editForm.identification_doc"
              :disabled="!isEditMode"
              type="text"
              class="glass-input w-full disabled:opacity-50"
            />
          </div>
        </div>
        
        <!-- Coordinates -->
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Latitude</label>
            <input
              v-model="editForm.latitude"
              :disabled="!isEditMode"
              type="number"
              step="any"
              class="glass-input w-full disabled:opacity-50"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Longitude</label>
            <input
              v-model="editForm.longitude"
              :disabled="!isEditMode"
              type="number"
              step="any"
              class="glass-input w-full disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- User Not Found -->
    <div v-else class="glass-card p-12 text-center">
      <div class="text-white/60">
        <UserIcon class="w-16 h-16 mx-auto mb-4 text-white/40" />
        <p class="text-xl font-medium">User not found</p>
        <p class="text-sm">The user you're looking for doesn't exist or has been removed.</p>
        <router-link to="/users" class="glass-button mt-4 inline-block">
          Back to Users
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import { StarIcon, UserIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()

// Reactive data
const isEditMode = ref(false)
const saving = ref(false)
const editForm = ref({})

// Computed properties
const user = computed(() => usersStore.selectedUser)

// Methods
const getUserInitials = (user) => {
  const firstName = user.name || ''
  const lastName = user.surname || ''
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
}

const toggleEditMode = () => {
  if (isEditMode.value) {
    // Cancel editing - reset form
    editForm.value = { ...user.value }
  }
  isEditMode.value = !isEditMode.value
}

const saveChanges = async () => {
  try {
    saving.value = true
    
    const result = await usersStore.updateUser(user.value.id, editForm.value)
    
    if (result.success) {
      isEditMode.value = false
      // Show success message or notification
      console.log('Profile updated successfully')
    } else {
      console.error('Failed to update profile:', result.error)
    }
  } catch (error) {
    console.error('Error updating profile:', error)
  } finally {
    saving.value = false
  }
}

// Initialize edit form when user data changes
watch(user, (newUser) => {
  if (newUser) {
    editForm.value = { ...newUser }
  }
}, { immediate: true })

// Lifecycle
onMounted(async () => {
  const userId = parseInt(route.params.id)
  if (userId) {
    await usersStore.fetchUserById(userId)
  }
})
</script>
