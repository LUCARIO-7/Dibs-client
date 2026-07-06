<script setup lang="ts">
import SearchTab from './searchTab.vue';

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
  <SearchTab/>
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
