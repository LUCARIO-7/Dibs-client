<script setup>
import axios from 'axios';
import { ref } from 'vue';
import ClaimedItems from '@/components/Items/ClaimedItems.vue';
import PostedItems from '@/components/Items/PostedItems.vue';
const username=ref('');
const user=ref({});
async function getUsername(){
    try {
        const response= await axios.get("/user");
        user.value=response.data;
        username.value=user.value.username;
    } catch (error) {
        console.log(error);
    }
}
getUsername();
</script>
<template > 
<div class="flex justify-center items-center h-80"> 
  <div class="card bg-base-100 w-96 shadow-sm text-black border">
    
    <figure class=" h-40 flex flex-col items-center justify-center">
      <div class="avatar">
        <div class="w-24 rounded-full ring ring-accent-content ring-offset-base-100 ring-offset-2">

            <img :src="`data:image/png;base64,${user.profilePicture}`" class="rounded-full" />
            
        </div>
      </div>
    </figure>
    <div class="card-body items-center text-center ">
      <h2 class="card-title text-2xl">{{ username }}</h2>
      <p >Account Details</p>
      <div class="card-actions mt-4 w-full">
      </div>
    </div>
  </div>
</div>

<div class="grid-cols-2">
<ClaimedItems/>
<PostedItems/>
</div>

</template>