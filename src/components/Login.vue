<script setup>
import { useRouter } from 'vue-router';
import LoginForm from './Forms/LoginForm.vue';
import axios from 'axios';
import { ref } from 'vue';
const isloggedin=ref(false)
const router=useRouter();
</script>
<template>
  <div class="flex flex-col justify-center items-center min-vh-100">
  <LoginForm/>
  <div class="login-container mt-3">
    <a href="http://localhost:8081/oauth2/authorization/google" class="btn btn-primary">
      Login with Google
    </a>
  </div>
  </div>
</template>