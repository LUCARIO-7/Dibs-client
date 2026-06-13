<script setup>
import axios from 'axios';
import { ref } from 'vue';

const username=ref('');
async function getUsername(){
    try {
        const response= await axios.get("http://localhost:8081/user");
        username.value=response.data;
    } catch (error) {
        console.log(error);
    }
}
getUsername();
</script>
<template > 
<div class="flex justify-center items-center h-120"> 
  <div class="card bg-base-100 w-96 shadow-sm text-black border border-gray-200">
    
    <figure class="bg-white h-80 flex flex-col items-center justify-center">
      <div class="avatar">
        <div class="w-24 rounded-full ring ring-accent-content ring-offset-base-100 ring-offset-2">
          <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" alt="Batperson Profile" />
        </div>
      </div>
    </figure>
    <div class="card-body items-center text-center bg-gray-400">
      <h2 class="card-title text-2xl">{{ username }}</h2>
      <p class="text-gray-500">Account Details</p>
      <div class="card-actions mt-4 w-full">
      </div>
    </div>
  </div>
</div>

</template>