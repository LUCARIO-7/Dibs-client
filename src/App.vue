<script setup>
</script>
<template>
  <div class="navbar bg-base-100 shadow-sm bg-gray-900 mb-5">
  <div class="navbar-start">
    <a class="text-xl" href="/home">Dibs</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
       <li><a href="/home">home</a></li>
      <li><a href="/founditems">browse</a></li>
      <li><a href="/additem">post</a></li>
    </ul>
  </div>
  <div class="navbar-end">
  </div>
</div>
  <router-view/>
</template>