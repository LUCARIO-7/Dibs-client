<script setup>
import { ref } from 'vue';
const item=ref();
</script>
<template>
   <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend class="fieldset-legend">Item Details</legend>

  <label class="label">Name</label>
  <input type="text" class="input" placeholder="name" />
  <label class="label">description</label>
  <input type="text" class="input" placeholder="add a breif description of your item" />
  <label class="label">attach image</label>
  <input type="file" class="file-input" />
  <label class="label">time</label>
  <input type="text" class="input" placeholder="input approx time"/>
</fieldset>
</template>