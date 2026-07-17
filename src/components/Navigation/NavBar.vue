<script setup lang="ts">
import SearchTab from './SearchTab.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const isLoggedIn = ref(false);

async function checkLoginStatus() {
  try {
    const response = await axios.get('/user');
    isLoggedIn.value = response.status === 200;
  } catch (error) {
    isLoggedIn.value = false;
  }
}

onMounted(() => {
  checkLoginStatus();
});

// Re-check auth status when page navigation occurs
watch(() => route.path, () => {
  checkLoginStatus();
});
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm mb-5 text-black ">
    <div class="navbar-start">
      <div class="bg-blue-600 text-white font-bold px-5 py-2 rounded-lg text-lg uppercase tracking-wide shadow-sm ">
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
    <div class="navbar-end" >
  
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
