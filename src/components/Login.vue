<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';
const isloggedin=ref(false)
const router=useRouter();
async function login(){
    try {
        const response= await axios.post("http://localhost:8081/login",
        {
        "username":"admin",
        "password":"123"
        });
        localStorage.setItem("token",response.data);
        isloggedin.value=true
         router.push("/")
    } catch (error) {
        console.log(error)
    }
}
</script>
<template>
    <button @click="login">log in</button>
    <h1 v-if="isloggedin">logged in</h1>
     <h1 v-else> not logged in</h1>
</template>