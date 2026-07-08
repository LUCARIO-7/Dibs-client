<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

// User info state with mock fallbacks
const username = ref('Mariana Cortez');
const userEmail = ref('mariana.cortez@example.com');
const userPhone = ref('+1 (415) 555-0147');
const userAvatar = ref(null);
const userStats = ref({
  reported: 42,
  claimed: 18,
  pending: 4
});

const notificationEnabled = ref(true);
const activeTab = ref('All Items');
const selectedLocation = ref('All Locations');
const selectedTime = ref('Last 30 days');

// Show location & time dropdowns
const showLocationDropdown = ref(false);
const showTimeDropdown = ref(false);

// Reported items (mock matching screenshot)
const reportedItems = ref([
  {
    id: 1,
    name: 'Brown leather bifold wallet',
    location: 'Platform 4, Central Station',
    time: '2026-06-12',
    description: 'Distinctive scratch on lower right. Contains ID and receipts',
    status: 'Claimed',
    isLarge: true,
    image: null // Will render placeholder gray block
  },
  {
    id: 2,
    name: 'Blue backpack',
    location: 'North Terminal',
    time: '2026-05-28',
    description: 'Transit sticker visible',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Car keys with red keychain',
    location: 'South Entrance',
    time: '2026-06-01',
    description: 'No identifying tags',
    status: 'Claimed',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&auto=format&fit=crop&q=80' // pillars/entrance context
  }
]);

// Claimed items (dynamic + mock matching screenshot)
const claimedItems = ref([
  {
    id: 101,
    name: 'Brown leather bifold wallet',
    location: 'Central Station, Platform 4',
    time: '2026-06-12',
    notes: 'Contains ID card (Mariana Cortez), receipts, distinctive scratch.',
    icon: 'wallet',
    actionText: 'Message',
    actionType: 'message'
  },
  {
    id: 102,
    name: 'Set of car keys on red keychain',
    location: 'South Entrance',
    time: '2026-06-01',
    notes: 'No tags, three metal keys, slight dirt smudge.',
    icon: 'key',
    actionText: 'Approve Claim',
    actionType: 'approve'
  },
  {
    id: 103,
    name: 'Blue commuter backpack',
    location: 'North Terminal',
    time: '2026-05-28',
    notes: 'Transit sticker, torn strap near top.',
    icon: 'backpack',
    actionText: 'Message',
    actionType: 'message'
  },
  {
    id: 104,
    name: 'Black smartphone (screen protector cracked)',
    location: 'East Concourse',
    time: '2026-04-18',
    notes: 'Passcode locked, case with floral sticker.',
    icon: 'phone',
    actionText: 'Message',
    actionType: 'message',
    hasIndicator: true
  }
]);

async function fetchUserProfile() {
  try {
    const response = await axios.get("http://localhost:8081/user");
    if (response.data) {
      if (response.data.username) username.value = response.data.username;
      if (response.data.email) userEmail.value = response.data.email;
      if (response.data.phone) userPhone.value = response.data.phone;
      if (response.data.profilePicture) userAvatar.value = response.data.profilePicture;
    }
  } catch (error) {
    console.log("Could not load dynamic user profile, using high-fidelity mock data:", error);
  }
}

async function fetchDynamicClaimedItems() {
  try {
    const response = await axios.get("http://localhost:8081/claimedItems");
    if (response.data && response.data.length > 0) {
      // Parse backend items format to match our view schema
      claimedItems.value = response.data.map(item => ({
        id: item.id,
        name: item.name,
        location: item.location || 'Unknown location',
        time: item.time || 'N/A',
        notes: item.description || 'No additional notes provided.',
        icon: detectIcon(item.name),
        actionText: item.isClaimed ? 'Message' : 'Approve Claim',
        actionType: item.isClaimed ? 'message' : 'approve',
        image: item.image
      }));
    }
  } catch (error) {
    console.log("Could not load dynamic claimed items, using mockup default items:", error);
  }
}

function detectIcon(name) {
  const lowercaseName = name.toLowerCase();
  if (lowercaseName.includes('wallet') || lowercaseName.includes('purse') || lowercaseName.includes('money')) return 'wallet';
  if (lowercaseName.includes('key') || lowercaseName.includes('fob')) return 'key';
  if (lowercaseName.includes('phone') || lowercaseName.includes('mobile') || lowercaseName.includes('device')) return 'phone';
  return 'backpack';
}

function selectLocation(loc) {
  selectedLocation.value = loc;
  showLocationDropdown.value = false;
}

function selectTime(timeRange) {
  selectedTime.value = timeRange;
  showTimeDropdown.value = false;
}

onMounted(() => {
  fetchUserProfile();
  fetchDynamicClaimedItems();
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen text-gray-800 font-sans pb-16 px-4 md:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Top Grid: Sidebar & Main Area -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <!-- ================= LEFT SIDEBAR ================= -->
        <div class="lg:col-span-1 flex flex-col gap-6">
          
          <!-- Profile Card -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center">
            
            <!-- Avatar Placeholder or Custom Image -->
            <div class="w-24 h-24 rounded-full flex items-center justify-center bg-purple-100 overflow-hidden border border-purple-200">
              <img v-if="userAvatar" :src="`data:image/png;base64,${userAvatar}`" class="w-full h-full object-cover" alt="User profile picture" />
              <div v-else class="text-purple-600">
                <!-- Large Person Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>

            <!-- Name and Contact Info -->
            <h2 class="text-2xl font-bold text-gray-900 mt-4 text-center">{{ username }}</h2>
            <a :href="`mailto:${userEmail}`" class="text-purple-600 hover:text-purple-800 text-sm mt-1 underline break-all text-center">
              {{ userEmail }}
            </a>
            <p class="text-gray-500 text-sm mt-1 text-center">{{ userPhone }}</p>

            <!-- Stats Block -->
            <div class="grid grid-cols-3 gap-2 w-full mt-6 text-center">
              <div class="border border-gray-100 rounded-lg p-2.5 bg-gray-50">
                <span class="block text-xl font-bold text-gray-900">{{ userStats.reported }}</span>
                <span class="text-[10px] text-gray-500 block leading-tight mt-0.5">Items Reported</span>
              </div>
              <div class="border border-gray-100 rounded-lg p-2.5 bg-gray-50">
                <span class="block text-xl font-bold text-gray-900">{{ userStats.claimed }}</span>
                <span class="text-[10px] text-gray-500 block leading-tight mt-0.5">Items Claimed</span>
              </div>
              <div class="border border-gray-100 rounded-lg p-2.5 bg-gray-50">
                <span class="block text-xl font-bold text-gray-900">{{ userStats.pending }}</span>
                <span class="text-[10px] text-gray-500 block leading-tight mt-0.5">Pending</span>
              </div>
            </div>

            <!-- Edit Profile Button -->
            <button class="btn bg-purple-600 hover:bg-purple-700 border-none text-white w-full rounded-lg font-semibold mt-5 py-2.5 transition duration-200">
              Edit Profile
            </button>

            <!-- Notification Toggle -->
            <div class="flex justify-between items-center w-full mt-5 pt-4 border-t border-gray-100">
              <span class="text-sm font-medium text-gray-700">Notification</span>
              <input type="checkbox" v-model="notificationEnabled" class="toggle toggle-primary toggle-sm [--tglbg:white]" />
            </div>

          </div>

          <!-- Quick Links Card -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Links</h3>
            
            <div class="flex flex-col gap-3.5">
              <a href="#" class="flex items-center gap-3 text-gray-700 hover:text-purple-600 font-medium transition duration-150">
                <!-- File/Report Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                My Reports
              </a>
              <a href="#" class="flex items-center gap-3 text-gray-700 hover:text-purple-600 font-medium transition duration-150">
                <!-- Users/Claim Request Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Claim Requests
              </a>
              <a href="#" class="flex items-center gap-3 text-gray-700 hover:text-purple-600 font-medium transition duration-150">
                <!-- Gear/Settings Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Account Settings
              </a>
            </div>

          </div>

        </div>

        <!-- ================= RIGHT/MAIN DASHBOARD CONTENT ================= -->
        <div class="lg:col-span-3 flex flex-col gap-6">
          
          <!-- Filter Control Panel Card -->
          <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <!-- Left: Tab Buttons & Quick Count Stats -->
            <div class="flex flex-wrap items-center gap-4">
              <!-- Tabs -->
              <div class="bg-gray-150 p-1 rounded-lg inline-flex border border-gray-200">
                <button 
                  @click="activeTab = 'All Items'"
                  :class="[
                    'px-4 py-1.5 text-sm font-semibold rounded-md transition duration-150',
                    activeTab === 'All Items' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  All Items
                </button>
                <button 
                  @click="activeTab = 'Found'"
                  :class="[
                    'px-4 py-1.5 text-sm font-semibold rounded-md transition duration-150',
                    activeTab === 'Found' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  Found
                </button>
                <button 
                  @click="activeTab = 'Claimed'"
                  :class="[
                    'px-4 py-1.5 text-sm font-semibold rounded-md transition duration-150',
                    activeTab === 'Claimed' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  ]"
                >
                  Claimed
                </button>
              </div>

              <!-- Quick Labels -->
              <div class="flex items-center gap-3 text-xs font-semibold text-gray-700">
                <span>Reports: <span class="text-gray-900">42</span></span>
                <span class="text-gray-300">|</span>
                <span>Claims Accepted: <span class="text-gray-900">18</span></span>
                <span class="text-gray-300">|</span>
                <span>Pending: <span class="text-gray-900">4</span></span>
              </div>
            </div>

            <!-- Right: Dropdown Selects -->
            <div class="flex items-center gap-3 relative">
              
              <!-- Location Filter -->
              <div class="relative">
                <button 
                  @click="showLocationDropdown = !showLocationDropdown"
                  class="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-700 font-medium transition"
                >
                  <!-- Location Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ selectedLocation }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div v-if="showLocationDropdown" class="absolute right-0 mt-1.5 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                  <button @click="selectLocation('All Locations')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Locations</button>
                  <button @click="selectLocation('Central Station')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Central Station</button>
                  <button @click="selectLocation('North Terminal')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">North Terminal</button>
                  <button @click="selectLocation('South Entrance')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">South Entrance</button>
                </div>
              </div>

              <!-- Time Filter -->
              <div class="relative">
                <button 
                  @click="showTimeDropdown = !showTimeDropdown"
                  class="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-700 font-medium transition"
                >
                  <!-- Calendar/Clock Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ selectedTime }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div v-if="showTimeDropdown" class="absolute right-0 mt-1.5 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                  <button @click="selectTime('Last 30 days')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Last 30 days</button>
                  <button @click="selectTime('Last 7 days')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Last 7 days</button>
                  <button @click="selectTime('Last 6 months')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Last 6 months</button>
                </div>
              </div>

            </div>

          </div>

          <!-- Bottom Grid: My Reported Items vs Claimed Items -->
          <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            <!-- Left Side: My Reported Items (8/12 grid span) -->
            <div class="xl:col-span-7 bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
              
              <!-- Title Bar -->
              <div class="flex justify-between items-center pb-2 border-b border-gray-100">
                <h3 class="text-lg font-bold text-gray-900">My Reported Items – Images</h3>
                <span class="text-sm text-gray-400 font-medium">3 items</span>
              </div>

              <!-- Content Row: Large card & stacked column side-by-side -->
              <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                
                <!-- Main Featured Card (3/5 width span) -->
                <div class="md:col-span-3 flex flex-col border border-gray-200 rounded-lg overflow-hidden">
                  
                  <!-- Main Gray Canvas Image Placeholder (640x320) -->
                  <div class="aspect-video w-full bg-gray-200 flex items-center justify-center relative overflow-hidden border-b border-gray-150">
                    <span class="text-3xl font-bold text-gray-400 select-none">640 × 320</span>
                  </div>

                  <!-- Details -->
                  <div class="p-4 flex flex-col gap-2">
                    <h4 class="font-bold text-gray-900 leading-tight">
                      {{ reportedItems[0].name }} – {{ reportedItems[0].location }}
                    </h4>
                    <p class="text-xs text-gray-500 font-medium">
                      Found on {{ reportedItems[0].time }} • {{ reportedItems[0].description }}
                    </p>
                    
                    <!-- Action row -->
                    <div class="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-100">
                      <span class="text-xs font-semibold px-2.5 py-1 rounded bg-purple-100 text-purple-700">
                        Status: {{ reportedItems[0].status }}
                      </span>
                      <div class="flex items-center gap-2">
                        <button class="btn btn-xs bg-gray-200 hover:bg-gray-300 border-none text-gray-700 font-bold px-3 py-1 rounded">
                          View
                        </button>
                        <button class="btn btn-xs bg-purple-600 hover:bg-purple-700 border-none text-white font-bold px-3 py-1 rounded">
                          Message Finder
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

                <!-- Column of stacked side items (2/5 width span) -->
                <div class="md:col-span-2 flex flex-col gap-4">
                  
                  <div v-for="item in reportedItems.slice(1)" :key="item.id" class="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                    <!-- Image -->
                    <img :src="item.image" class="w-full h-24 object-cover object-center border-b border-gray-100" :alt="item.name" />
                    <!-- Content -->
                    <div class="p-3">
                      <h5 class="font-bold text-xs text-gray-900 leading-snug">
                        {{ item.name }} – {{ item.location }}
                      </h5>
                      <p class="text-[10px] text-gray-500 font-medium mt-1 leading-normal">
                        Found {{ item.time }} • {{ item.description }}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            <!-- Right Side: Claimed Items List (5/12 grid span) -->
            <div class="xl:col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
              
              <!-- Title Bar -->
              <div class="flex justify-between items-center pb-2 border-b border-gray-100">
                <h3 class="text-lg font-bold text-gray-900">Claimed Items</h3>
                <span class="text-sm text-gray-400 font-medium">Showing {{ claimedItems.length }}</span>
              </div>

              <!-- List Items -->
              <div class="flex flex-col gap-3">
                
                <div 
                  v-for="item in claimedItems" 
                  :key="item.id" 
                  class="border border-gray-150 rounded-xl p-4 bg-white flex flex-col gap-2 shadow-xs transition hover:shadow-sm"
                >
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex items-start gap-2.5">
                      <!-- Custom Icon based on item.icon field -->
                      <div class="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mt-0.5 shrink-0">
                        <!-- Wallet Icon -->
                        <svg v-if="item.icon === 'wallet'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <!-- Key Icon -->
                        <svg v-else-if="item.icon === 'key'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m-2-2a2 2 0 11-2-2m2 2a2 2 0 10-2 2m.002.002L11 13H9v2H7v2H5v2h2v-2h2v-2h2v-2.002m.002-.002l6-6V9a2.002 2.002 0 00-2-2.002H15z" />
                        </svg>
                        <!-- Phone Icon -->
                        <svg v-else-if="item.icon === 'phone'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <!-- Default Backpack Icon -->
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>

                      <div>
                        <h4 class="font-bold text-gray-900 text-sm leading-tight">{{ item.name }}</h4>
                        <p class="text-xs text-gray-500 mt-1 leading-snug">
                          Found: <span class="text-gray-700">{{ item.location }} • {{ item.time }}</span>
                        </p>
                        <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                          Notes: <span class="text-gray-700 italic">{{ item.notes }}</span>
                        </p>
                      </div>
                    </div>

                    <!-- Right indicators -->
                    <div class="flex items-center gap-1.5 shrink-0">
                      <div v-if="item.hasIndicator" class="w-3.5 h-3.5 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
                        <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                      </div>
                    </div>

                  </div>

                  <!-- Actions Row -->
                  <div class="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-gray-50">
                    <button class="btn btn-xs bg-gray-100 hover:bg-gray-250 border-none text-gray-700 font-bold px-3 py-1 rounded">
                      View
                    </button>
                    <button 
                      v-if="item.actionType !== 'message'"
                      :class="[
                        'btn btn-xs border-none text-white font-bold px-3 py-1 rounded',
                        item.actionType === 'approve' ? 'bg-[#581c87] hover:bg-[#4c1d95]' : 'bg-purple-600 hover:bg-purple-700'
                      ]"
                    >
                      {{ item.actionText }}
                    </button>
                  </div>

                </div>

              </div>

              <!-- Load more button -->
              <button class="btn w-full mt-2 bg-gray-200 hover:bg-gray-300 border-none text-gray-700 font-semibold py-2 rounded-lg transition duration-150">
                Load more
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>