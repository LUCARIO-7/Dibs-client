<script setup>
import axios from 'axios';
import { ref } from 'vue';
const response=ref('');
const user=ref('');
 async function getCurrUser(){
    try{
    response.value= await axios.get("http://localhost:8081/user",{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })
    user.value=response.value.data;
}
catch(error){
    console.log(error);
}
}
getCurrUser();
</script>
<template>
    <div class="">
    <h1 class="text-3xl font-bold bg-black text-gray-50">username {{ user }}</h1>
    </div>
</template>