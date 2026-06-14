<script setup>
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';
async function logout(){
    try {
        const response= await axios.get("http://localhost:8081/logout");
     router.push("/");
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    logged out
</template>