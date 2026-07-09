<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({
    username: '',
    password: ''
});
const profilePicture = ref();
const errorMessage = ref('');

function handleImageupload(event){
    profilePicture.value = event.target.files[0];
}

async function adduser() {
    if (!user.value.username || !user.value.password) {
        errorMessage.value = "Username and password are required.";
        return;
    }
    

    errorMessage.value = '';
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user.value)], {
        type: "application/json"
    }));
    if (profilePicture.value) {
        formData.append('profilePicture', profilePicture.value);
    }

    try {
        const response = await axios.post("/register", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.status === 202 || response.status === 201) {
            router.push("/login");
        } else {
            errorMessage.value = "Registration failed. Please try again.";
        }
    } catch (error) {
        console.error(error);
        errorMessage.value = error.response?.data || "An error occurred during registration.";
    }
}
</script>
<template>
<div class="flex justify-center items-center min-h-screen">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Sign Up</legend>
        <form method="post" @submit.prevent="adduser">
            <div v-if="errorMessage" class="alert alert-error text-xs p-2 rounded mb-2 text-red-600 bg-red-100 border border-red-200">
                {{ errorMessage }}
            </div>

            <label class="label">Username</label>
            <input v-model="user.username" type="text" class="input w-full" placeholder="username" required>

            <label class="label">Password</label>
            <input v-model="user.password" type="password" class="input w-full" placeholder="password" required>
            
            <label class="label">Profile Picture</label>
            <input @change="handleImageupload" type="file" class="file-input w-full">
            
            <button class="btn btn-primary mt-4 w-full" type="submit">Submit</button>
        </form>
    </fieldset>
</div>
</template>