<script setup>
import axios from 'axios';
import { ref } from 'vue';

const items=ref();
const baseimage=ref();
async function fetchItems(){
   const response= await axios.get("/founditems");
   items.value=response.data;
}
async function claimItem(itemid){
  try {
    const response=await axios.get(`/claimitem/${itemid}`);
  } catch (error) {
    console.log(error);
  }
}
async function handleFilter(num) {
  var location;
  if(num=='1'){
  location="monaco";
}
else{
  location="";
}
try {
    const response=await axios.get(`/founditems/filter`,{
      params:{
        "location":location,
        "time":""
      }
    });
    items.value=response.data;
  } catch (error) {
    console.log(error);
  }
}
fetchItems();
</script>
<template>
   <div class="dropdown">
  <div tabindex="0" role="button" class="btn m-1">Location</div>
  <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li @click="handleFilter('0')"><a>all Locations</a></li>
    <li @click="handleFilter('1')"><a>monaco</a></li>
  </ul>
</div>
   <div class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
   <div v-for="item in items" :key="item.id" >
     <div class="card card-side bg-base-100 w-full shadow-md">
  <figure>
    <img :src="`data:image/png;base64,${item.image}`" class=" object-cover h-60 w-60" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">{{ item.name }}</h2>
    <p>{{ item.description }}</p>
    <div class="flex items-center gap-1.5   text-sm">
  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
  </svg>
  <p>{{ item.time }}</p>
</div>
    <div class="card-actions justify-end">
      <button v-if="item.isClaimed" class="btn btn-disabled" @click="claimItem">claimed</button>
      <button v-else class="btn btn-primary" @click="claimItem(item.id)">claim</button>
    </div>
    </div>
  </div>
   </div>
   </div>
</template>