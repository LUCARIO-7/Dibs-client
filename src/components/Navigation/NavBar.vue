<script setup lang="ts">
import SearchTab from './SearchTab.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const isLoggedIn = ref(false);
const theme = ref('light');

async function checkLoginStatus() {
  try {
    const response = await axios.get('/user');
    isLoggedIn.value = response.status === 200;
  } catch (error) {
    isLoggedIn.value = false;
  }
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem('theme', theme.value);
}

onMounted(() => {
  checkLoginStatus();
  
  // Set initial theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    theme.value = savedTheme;
  } else {
    // Fallback to prefers-color-scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme.value = prefersDark ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme.value);
});

// Re-check auth status when page navigation occurs
watch(() => route.path, () => {
  checkLoginStatus();
});
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm mb-5 text-base-content">
    <div class="navbar-start">
      <div class="bg-blue-600 text-white font-bold px-5 py-2 rounded-lg text-lg uppercase tracking-wide shadow-sm">
        <a href="/">DIBS</a>
      </div>
    </div>
    
    <div class="navbar-center">
      <ul class="menu menu-horizontal px-1 gap-8">
        <li><a href="/">home</a></li>
        <li><a href="/founditems">browse</a></li>
        <li><a href="/additem">post</a></li>
      </ul>
    </div>
    
    <div class="navbar-end">
      <!-- Theme Toggle Button -->
      <button 
        @click="toggleTheme" 
        class="btn btn-ghost btn-circle text-base-content mr-2"
        aria-label="Toggle Theme"
      >
        <!-- Sun Icon (shows when theme is dark) -->
        <svg 
          v-if="theme === 'dark'" 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 text-yellow-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728A9 9 0 115.636 5.636m12.728 12.728A9 9 0 015.636 5.636" />
        </svg>
        
        <!-- Moon Icon (shows when theme is light) -->
        <svg 
          v-else 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 text-slate-700" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>

      <a v-if="!isLoggedIn" href="/login" class="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition duration-200">
        Login
      </a>
      <a href="/user" class="block hover:opacity-80 transition duration-200 ml-4">
        <div class="avatar">
          <div class="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Profile" />
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
