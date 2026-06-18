<script setup>
import axios from 'axios';
import { ref } from 'vue';
const items=ref();
const baseimage=ref();
async function fetchClaimedItems(){
   const response= await axios.get("http://localhost:8081/claimedItems");
   items.value=response.data;
}
fetchClaimedItems();
</script>
<template>
  <div class="flex justify-center items-center flex-col">
   <ul v-for="item in items" :key="item.id">
     <div class="card bg-base-100 w-150 shadow-sm  mb-5">
  <figure>
    <img :src="`data:image/png;base64,${item.image}`" class=" object-cover h-120 w-240" />
  </figure>
  <div class="card-body bg-white rounded-b-sm text-black">
    <h2 class="card-title">{{item.name }}</h2>
    <li class="list-row">
      <div class=" badge badge-neutral">posted by:{{item.user.username}}</div>
      <div class=" badge badge-info">time found:{{item.time}}</div>
      </li>
    <p>{{ item.description }}</p>
    <div class="badge badge-neutral badge-outline">{{ item.contact }}</div>
   <button v-if="item.isClaimed" class="btn btn-disabled bg-gray-600">claimed</button>
   <button v-else class="btn btn-primary bg-gray-800" @click="claimItem(item.id)">claim</button>
  </div>
</div>
   </ul>
   </div>
</template>