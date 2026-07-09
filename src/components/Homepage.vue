<script setup>
import axios from 'axios';
import { ref } from 'vue';
const response=ref('');
const user=ref('');
 async function getCurrUser(){
    try{
    response.value= await axios.get("/user",{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })
    user.value=response.value.data;
}
catch(error){
    console.log(error);
}
}
getCurrUser();
</script>
<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">


    <!-- 2. Dashboard Body Container -->
    <main class="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- LEFT SECTION: Welcome Hero & Item Listings (Takes up 2 cols) -->
      <section class="lg:col-span-2 space-y-6">
        
        <!-- Welcome Banner Box -->
        <div class="bg-white p-8 rounded-xl shadow-xs border border-slate-200 relative overflow-hidden">
          <div class="flex items-start gap-4">
            <!-- Compass Icon Accent -->
            <div class="p-3 bg-blue-600 text-white rounded-full shadow-xs shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-slate-900 mb-2">Welcome to DIBS</h1>
              <p class="text-slate-600 leading-relaxed max-w-xl">
                Find lost items across campus quickly. Post an item, search by location, or browse recent finds from fellow students.
              </p>
            </div>
          </div>

          <!-- Category Quick Filter Pills -->
          <div class="mt-8 border-t border-slate-100 pt-6">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Quick search by category</h3>
            <div class="flex flex-wrap gap-2">
              <button class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2 rounded-lg border border-slate-200 transition font-medium">Backpack</button>
              <button class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2 rounded-lg border border-slate-200 transition font-medium">Wallet</button>
              <button class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2 rounded-lg border border-slate-200 transition font-medium">Phone</button>
              <button class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2 rounded-lg border border-slate-200 transition font-medium">Keys</button>
            </div>
          </div>
        </div>

        <!-- Recent Items Section -->
        <div>
          <h2 class="text-lg font-bold text-slate-900 mb-4">Recent Items found</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Card 1 -->
            <div class="bg-white p-3 rounded-xl shadow-xs border border-slate-200 flex gap-4 hover:shadow-md transition">
              <div class="w-24 h-20 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                <!-- Base64 image placeholder template matching your previous styles -->
                <img src="@/assets/images/backpack.png" class="w-full h-full object-cover" alt="Backpack" />
              </div>   
              <div class="flex flex-col justify-between py-0.5">
                <div>
                  <h4 class="font-bold text-slate-900 text-sm">Navy Backpack</h4>
                  <p class="text-xs text-slate-500 mt-1">Found near Library West</p>
                </div>
                <!-- Mini Darkened Clock Layout -->
                <div class="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                  <svg class="w-3.5 h-3.5 text-slate-900 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <span>12 min ago</span>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-white p-3 rounded-xl shadow-xs border border-slate-200 flex gap-4 hover:shadow-md transition">
              <div class="w-24 h-20 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                <img  class="w-full h-full object-cover" alt="Smartphone" />
              </div>
              <div class="flex flex-col justify-between py-0.5">
                <div>
                  <h4 class="font-bold text-slate-900 text-sm">Black Smartphone</h4>
                  <p class="text-xs text-slate-500 mt-1">Found near Science Hall</p>
                </div>
                <!-- Mini Darkened Clock Layout -->
                <div class="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                  <svg class="w-3.5 h-3.5 text-slate-900 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <span>34 min ago</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      <!-- RIGHT SECTION: Map Context & Help Guides (Takes up 1 col) -->
      <section class="space-y-6">
        
        <!-- Interactive Map Wrapper Box -->
        <div class="bg-white p-5 rounded-xl shadow-xs border border-slate-200">
          <h2 class="text-sm font-bold text-slate-900 mb-1">Campus map — recent finds</h2>
          
          <!-- Mock Map Container -->
          <div class="w-full h-56 bg-slate-100 rounded-lg my-3 border border-slate-200 relative overflow-hidden shadow-inner flex items-center justify-center">
            <span class="text-xs text-slate-400 font-medium tracking-wide">[ Interactive Campus Map UI ]</span>
            <!-- Decorative Map Pins to match snapshot view -->
            <div class="absolute top-1/4 left-1/3 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-xs"></div>
            <div class="absolute top-1/2 left-2/3 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white shadow-xs"></div>
            <div class="absolute bottom-1/3 left-1/2 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-xs"></div>
          </div>
          
          <p class="text-xs text-slate-500 leading-normal">
            Tap a pin to see item details. You can filter by building or category to narrow results.
          </p>
        </div>

        <!-- Explainer List Guidelines Card -->
        <div class="bg-white p-5 rounded-xl shadow-xs border border-slate-200">
          <h3 class="text-sm font-bold text-slate-900 mb-4">Tips for finding items</h3>
          <ol class="space-y-3.5 text-xs text-slate-600 list-decimal list-inside leading-relaxed">
            <li class="pl-1">Check recent posts in the building where you lost the item.</li>
            <li class="pl-1">Add a clear photo and unique description when posting.</li>
            <li class="pl-1">Mark the exact location on the map to help others return items faster.</li>
          </ol>
        </div>

      </section>

    </main>
  </div>
</template>
