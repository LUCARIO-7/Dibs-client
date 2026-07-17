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
  <div class="min-h-screen bg-base-200 text-base-content antialiased font-sans transition-colors duration-300">

    <!-- Dashboard Body Container -->
    <main class="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- LEFT SECTION: Welcome Hero & Item Listings (Takes up 2 cols) -->
      <section class="lg:col-span-2 space-y-6">
        
        <!-- Welcome Banner Box -->
        <div class="bg-base-100 p-8 rounded-xl shadow-sm border border-base-300 relative overflow-hidden transition-colors duration-300">
          <div class="flex items-start gap-4">
            <!-- Compass Icon Accent -->
            <div class="p-3 bg-blue-600 text-white rounded-full shadow-xs shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-base-content mb-2">Welcome to DIBS</h1>
              <p class="text-base-content/80 leading-relaxed max-w-xl">
                Find lost items across campus quickly. Post an item, search by location, or browse recent finds from fellow students.
              </p>
            </div>
          </div>

          <!-- Category Quick Filter Pills -->
          <div class="mt-8 border-t border-base-300 pt-6">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-3">Quick search by category</h3>
            <div class="flex flex-wrap gap-2">
              <button class="bg-base-200 hover:bg-base-300 text-base-content text-sm px-4 py-2 rounded-lg border border-base-300 transition font-medium">Backpack</button>
              <button class="bg-base-200 hover:bg-base-300 text-base-content text-sm px-4 py-2 rounded-lg border border-base-300 transition font-medium">Wallet</button>
              <button class="bg-base-200 hover:bg-base-300 text-base-content text-sm px-4 py-2 rounded-lg border border-base-300 transition font-medium">Phone</button>
              <button class="bg-base-200 hover:bg-base-300 text-base-content text-sm px-4 py-2 rounded-lg border border-base-300 transition font-medium">Keys</button>
            </div>
          </div>
        </div>

        <!-- Recent Items Section -->
        <div>
          <h2 class="text-lg font-bold text-base-content mb-4">Recent Items found</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Card 1 -->
            <div class="bg-base-100 p-3 rounded-xl shadow-xs border border-base-300 flex gap-4 hover:shadow-md transition duration-300">
              <div class="w-24 h-20 bg-base-200 rounded-lg overflow-hidden shrink-0">
                <img src="@/assets/images/backpack.png" class="w-full h-full object-cover" alt="Backpack" />
              </div>   
              <div class="flex flex-col justify-between py-0.5">
                <div>
                  <h4 class="font-bold text-base-content text-sm">Navy Backpack</h4>
                  <p class="text-xs text-base-content/75 mt-1">Found near Library West</p>
                </div>
                <!-- Mini Clock Layout -->
                <div class="flex items-center gap-1 text-base-content/60 text-[11px] font-medium">
                  <svg class="w-3.5 h-3.5 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <span>12 min ago</span>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-base-100 p-3 rounded-xl shadow-xs border border-base-300 flex gap-4 hover:shadow-md transition duration-300">
              <div class="w-24 h-20 bg-base-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center text-base-content/30 border border-base-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h12" />
                </svg>
              </div>
              <div class="flex flex-col justify-between py-0.5">
                <div>
                  <h4 class="font-bold text-base-content text-sm">Black Smartphone</h4>
                  <p class="text-xs text-base-content/75 mt-1">Found near Science Hall</p>
                </div>
                <!-- Mini Clock Layout -->
                <div class="flex items-center gap-1 text-base-content/60 text-[11px] font-medium">
                  <svg class="w-3.5 h-3.5 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div class="bg-base-100 p-5 rounded-xl shadow-xs border border-base-300 transition-colors duration-300">
          <h2 class="text-sm font-bold text-base-content mb-1">Campus map — recent finds</h2>
          
          <!-- Mock Map Container -->
          <div class="w-full h-56 bg-base-200 rounded-lg my-3 border border-base-300 relative overflow-hidden shadow-inner flex items-center justify-center">
            <span class="text-xs text-base-content/40 font-medium tracking-wide">[ Interactive Campus Map UI ]</span>
            <!-- Decorative Map Pins -->
            <div class="absolute top-1/4 left-1/3 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-xs"></div>
            <div class="absolute top-1/2 left-2/3 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white shadow-xs"></div>
            <div class="absolute bottom-1/3 left-1/2 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-xs"></div>
          </div>
          
          <p class="text-xs text-base-content/70 leading-normal">
            Tap a pin to see item details. You can filter by building or category to narrow results.
          </p>
        </div>

        <!-- Explainer List Guidelines Card -->
        <div class="bg-base-100 p-5 rounded-xl shadow-xs border border-base-300 transition-colors duration-300">
          <h3 class="text-sm font-bold text-base-content mb-4">Tips for finding items</h3>
          <ol class="space-y-3.5 text-xs text-base-content/85 list-decimal list-inside leading-relaxed">
            <li class="pl-1">Check recent posts in the building where you lost the item.</li>
            <li class="pl-1">Add a clear photo and unique description when posting.</li>
            <li class="pl-1">Mark the exact location on the map to help others return items faster.</li>
          </ol>
        </div>

      </section>

    </main>
  </div>
</template>
