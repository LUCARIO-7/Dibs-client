<script setup>
import axios from 'axios';
import { ref } from 'vue';
var item=ref({
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
function handleLostorFound(isLost){
    if(isLost=="LOST")
    item.value.isLost=true;
    else
    item.value.isLost=false;
}
async function addItem(){
    
    item.value.time=item.value.time.replace("T"," ")
    console.log(item.value.time);
    formData.append('item',new Blob([JSON.stringify(item.value)],{
        type:"application/json"
    }));
    formData.append('image',getimage.value);
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
    <div class=" flex justify-center items-center mt-20">
   <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
  <form @submit.prevent="addItem" method="post">  
    <legend class="fieldset-legend text-xl">Item Details</legend>
  <label class="label">Name</label>
  <input v-model="item.name" type="text" class="input mb-2" placeholder="name" />

  <label class="label">description</label>
  <input v-model="item.description" type="text" class="input mb-2" placeholder="add a breif description of your item" />

  <label class="label">location</label>
  <input v-model="item.location" type="text" class="input mb-2" placeholder="probable location" />

  <label class="label">contact</label>
  <input v-model="item.contact" type="text" class="input mb-2" placeholder="contact" />

  <label  class="label" >attach image</label>
  <input @change="handleImageupload" type="file" class="file-input" />

   <div class="form-control w-full mb-2">
      <label class="label text-sm text-slate-700">When was it lost/found?</label>
      <input 
        v-model="item.time" 
        type="datetime-local" 
        class="input input-bordered w-full" 
      />
    </div>
  <div class="flex items-center">
<label class="label ml-2">Lost</label>
<input type="radio" name="radio-4" class="radio radio-primary " checked="checked" @change="handleLostorFound('LOST')" />
<label class="label ml-2">Found</label>
<input type="radio" name="radio-4" class="radio radio-primary" @change="handleLostorFound('FOUND')"/>
  </div>
  <button class="btn btn-accent " type="submit">add item</button>
  </form>
</fieldset>
</div>
</template>