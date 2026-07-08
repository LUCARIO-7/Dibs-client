<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const userAvatar = ref(null);

async function fetchUserProfile() {
  try {
    const response = await axios.get("http://localhost:8081/user");
    if (response.data && response.data.profilePicture) {
      userAvatar.value = response.data.profilePicture;
    }
  } catch (error) {
    console.log("Could not load navbar profile picture, falling back to silhouette icon:", error);
  }
}

onMounted(() => {
  fetchUserProfile();
});
</script>

<template>
  <div class="navbar bg-gray-200 border-b border-gray-300 shadow-sm py-3 px-8 mb-6 flex justify-between items-center">
    <!-- Navbar Start: Purple DIBS Logo -->
    <div class="flex items-center">
      <a href="/" class="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2.5 rounded-lg text-lg tracking-wider transition duration-200">
        DIBS
      </a>
    </div>
    
    <!-- Navbar Center: Navigation Links -->
    <div class="flex gap-8 justify-center flex-1">
      <a href="/founditems" class="text-gray-800 hover:text-purple-700 font-semibold transition duration-200">Browse</a>
      <a href="/additem" class="text-gray-800 hover:text-purple-700 font-semibold transition duration-200">Post</a>
      <a href="/user" class="text-gray-800 hover:text-purple-700 font-semibold transition duration-200">Profile</a>
    </div>

    <!-- Navbar End: Search input and Profile silhouette icon -->
    <div class="flex items-center gap-4">
      <div class="relative flex items-center bg-white rounded-lg border border-gray-300 px-3 py-1.5 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="search" class="bg-transparent border-none text-sm text-gray-800 outline-none w-28 focus:w-40 transition-all duration-200 placeholder-gray-400 font-medium" />
      </div>
      
      <a href="/user" class="block text-gray-800 hover:text-purple-700 transition duration-200">
        <!-- Render base64 Profile Image if available -->
        <div v-if="userAvatar" class="w-8 h-8 rounded-full border border-purple-500 overflow-hidden shrink-0">
          <img :src="`data:image/png;base64,${userAvatar}`" class="w-full h-full object-cover" alt="User profile" />
        </div>
        <!-- Otherwise Fallback: Heroicon User Circle silhouette icon -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12c0 2.822 1.2 5.362 3.116 7.152a4.49 4.49 0 016.384-3.83 3.75 3.75 0 114.499 0 4.49 4.49 0 016.384 3.83M12 5.25a6.75 6.75 0 00-6.75 6.75c0 1.956.825 3.722 2.14 4.975a5.99 5.99 0 018.636 0A6.75 6.75 0 0012 5.25z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</template>
