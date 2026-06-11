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
    user.value=response.value.data.name
}
catch(error){
    console.log(error);
}
}
getCurrUser();
</script>
<template>
    <h1 v-bind="res">username {{ user }}</h1>
</template>