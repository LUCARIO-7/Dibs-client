<script setup>
import axios from 'axios';
import { ref } from 'vue';
const item=ref({
    name:'',
    description:'',
    time:'',
    location:'',
    isLost:true,
    contact:'',
    isClaimed:false
});
const formData= new FormData();
const getimage=ref();
function handleImageupload(event){
    getimage.value=event.target.files[0];
}
async function addItem(){
    formData.append('item',new Blob([JSON.stringify(item.value)],{
        type:"application/json"
    }));
    formData.append('image',getimage.value)
    console.log(item.value);
    try {
        const response= await axios.post("http://localhost:8081/item",formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        );
        
    } catch (error) {
        console.log("something went wrong");
        console.log(error);
    }
}
</script>
<template>
   <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <form @submit.prevent="addItem" method="post">  
    <legend class="fieldset-legend">Item Details</legend>
  <label class="label">Name</label>
  <input v-model="item.name" type="text" class="input" placeholder="name" />

  <label class="label">description</label>
  <input v-model="item.description" type="text" class="input" placeholder="add a breif description of your item" />

  <label class="label">location</label>
  <input v-model="item.location" type="text" class="input" placeholder="probable location" />

  <label class="label">contact</label>
  <input v-model="item.contact" type="text" class="input" placeholder="contact" />

  <label  class="label" >attach image</label>
  <input @change="handleImageupload" type="file" class="file-input" />

  <label class="label">time</label>
  <input v-model="item.time" type="text" class="input" placeholder="input approx time"/>
  
  <button class="btn btn-accent" type="submit">add item</button>
  </form>

</fieldset>
</template>