<script setup>
import axios from 'axios';
import { ref } from 'vue';
const items=ref([]);

const searchQuery=ref('');
async function fetchItems(){
   const response= await axios.get(`http://localhost:8081/search/${searchQuery.value}`);
   items.value=response.data;
  console.log(items.value)
}
</script>
<template>
   <input type="text" class="bg-black rounded-md" v-model="searchQuery" >
   <button class="btn btn-accent h-8" @click="fetchItems">search</button>
  <ul v-for="item in items" :key="item.id">
       <li class="list-row">
    <div><img class="size-10 rounded-box" :src="`data:image/png;base64,${item.image}`"/></div>
    <div>
      <div>{{item.name }}</div>
    </div>
    <p class="list-col-wrap text-xs">
      {{ item.description }}
    </p>
  </li>
   </ul>
</template>