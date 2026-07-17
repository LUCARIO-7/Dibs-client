<script setup>
import axios from 'axios';
import { ref } from 'vue';
import SearchTab from '@/components/Navigation/SearchTab.vue';
const items=ref();
const baseimage=ref();
async function fetchItems(){
    const response= await axios.get("/lostitems");
   items.value=response.data;
}

fetchItems();
</script>
<template>
  <SearchTab/>
 c
</template>