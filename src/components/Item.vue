<script setup>
import axios from 'axios';
import { ref } from 'vue';
const items=ref();
const baseimage=ref();
async function fetchItems(){
   const response= await axios.get("http://localhost:8081/lostitems");
   items.value=response.data;
}
function setImage(imageString){
baseimage.value=`data:image/png;base64,${imageString}`; 
return baseimage.value;
}
fetchItems();
</script>
<template>
   <ul v-for="item in items" :key="item.id">
     <div class="card bg-base-100 w-150 shadow-sm  mb-5">
  <figure>
    <img :src="setImage(item.image)" />
  </figure>
  <div class="card-body bg-white rounded-b-sm text-black">
    <h2 class="card-title">{{item.name }}</h2>
    <li class="list-row">
      <div class=" badge badge-neutral">posted by:{{item.user.username}}</div>
      <div class=" badge badge-info">time found:{{item.time}}</div>
      </li>
    <p>{{ item.description }}</p>

    <div class="card-actions justify-end">
      <button class="btn btn-primary">claim</button>
    </div>
  </div>
</div>
   </ul>
</template>