<script setup>
import axios from 'axios';
import { ref } from 'vue';
async function logout(){
    try {
        const response= await axios.get("http://localhost:8081/logout");
    } catch (error) {
        
    }
}
</script>
<template>
    logged out
</template>