<script setup>
import axios from 'axios';
import { ref } from 'vue';
const formData=new FormData();
const user=ref({
    username:'',
    password:''
});
const profilePicture=ref();
function handleImageupload(event){
    profilePicture.value=event.target.files[0];
}

async function adduser() {
   formData.append('user',new Blob([JSON.stringify(user.value)],{
        type:"application/json"
    }));
    formData.append('profilePicture',profilePicture.value);
     console.log(formData)
    try {
       const response= await axios.post("http://localhost:8081/register",formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        );
       
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
<div class="flex justify-center items-center ">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
    <form method="post" @submit.prevent="adduser">
    <label class="label">Name</label>
    <input v-model="user.username" type="text" class="input" placeholder="usename">

    <label class="label">Password</label>
    <input v-model="user.password"  type="password" class="input" placeholder="password">
    
    <label class="label">profile Picture</label>
    <input @change="handleImageupload" type="file" class="file-input">
    <button class="btn btn-primary" type="submit">submit</button>
    </form>
    </fieldset>
</div>
</template>