<script setup>
import { useRouter } from 'vue-router';
import LoginForm from '@/components/Forms/LoginForm.vue';
import axios from 'axios';
import { ref } from 'vue';
const isloggedin=ref(false)
const router=useRouter();
const googleLoginUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'}/oauth2/authorization/google`;
</script>
<template>
  <div class="flex flex-col justify-center items-center min-vh-100">
  <LoginForm/>
  <div class="login-container mt-3">
    <a :href="googleLoginUrl" class="btn btn-primary">
      Login with Google
    </a>
  </div>
  </div>
</template>