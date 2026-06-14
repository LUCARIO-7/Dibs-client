<template>
  <div class="navbar bg-base-100 shadow-sm bg-gray-900 mb-5">
    <div class="navbar-start">
      <a class="text-xl text-white" href="/">Dibs</a>
    </div>
    
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-8">
        <li><a href="/">home</a></li>
        <li><a href="/founditems">browse</a></li>
        <li><a href="/additem">post</a></li>
      </ul>
    </div>
    <div class="navbar-end" >
<a href="/user" class="block hover:opacity-80 transition duration-200">
  <div class="avatar">
    <div class="w-16 rounded-full">
      <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Profile" />
    </div>
  </div>
</a>


    </div>
  </div>
</template>
