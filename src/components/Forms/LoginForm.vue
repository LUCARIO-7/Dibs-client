<script setup>
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

const user=ref({
    username:'',
    password:''
})
async function login(){
    try {
        const response= await axios.post("http://localhost:8081/login",user.value);
        console.log(response.data);
         router.push("/")
    } catch (error) {
        console.log(error)
    }
}
</script>
<template>
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend class="fieldset-legend">Login</legend>

  <label class="label" >Email</label>
  <input  type="text"  class="input" placeholder="Email" v-model="user.username" />

  <label class="label">Password</label>
  <input type="password" class="input" placeholder="Password "  v-model="user.password"/>

  <button class="btn btn-neutral mt-4" @click="login">Login</button>
</fieldset>
</template>