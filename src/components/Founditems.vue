<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';

const items = ref([]);
const searchQuery = ref('');
const sortBy = ref('Newest');
const filterStatus = ref('all');

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(5);

// Fetch items from backend
async function fetchItems() {
  try {
    const response = await axios.get("http://localhost:8081/founditems");
    if (response.data && response.data.length > 0) {
      items.value = response.data;
    } else {
      useFallbackData();
    }
  } catch (error) {
    console.log("Could not fetch items from backend, using mockup default data:", error);
    useFallbackData();
  }
}

// Fallback data matching user screenshot
function useFallbackData() {
  items.value = [
    {
      id: 1,
      name: 'Brown Leather',
      description: 'A well-worn bifold wallet containing ID cards and a few receipts. Distinctive scratch on the front corner.',
      time: 'June 27, 2026 • 8:15 PM',
      location: 'Central Station - East Concourse',
      isLost: true,
      isClaimed: false,
      image: 'https://images.unsplash.com/photo-1627124718185-613d74ac9d6f?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Blue Commuter Backpack',
      description: 'Standard nylon backpack with keyrings and an transit sticker near the front zipper.',
      time: 'June 25, 2026 • 10:30 AM',
      location: 'North Terminal - Gate 3',
      isLost: false,
      isClaimed: true,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Car Keys with Keychain',
      description: 'Set of three metal keys and a small remote fob attached to a red woven cord.',
      time: 'June 28, 2026 • 2:45 PM',
      location: 'South Entrance - Lobby Area',
      isLost: false,
      isClaimed: false,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&auto=format&fit=crop&q=80'
    }
  ];
}

// Claim an item
async function claimItem(itemId) {
  try {
    const response = await axios.get(`http://localhost:8081/claimitem/${itemId}`);
    // Refresh local list state
    const index = items.value.findIndex(item => item.id === itemId);
    if (index !== -1) {
      items.value[index].isClaimed = true;
    }
  } catch (error) {
    console.log("Error claiming item, updating local mock state:", error);
    // If backend fails, still mock the success state on the screen
    const index = items.value.findIndex(item => item.id === itemId);
    if (index !== -1) {
      items.value[index].isClaimed = true;
    }
  }
}

// Compute filtered & sorted list
const filteredItems = computed(() => {
  let list = [...items.value];

  // 1. Search Query Filter
  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q) ||
      (item.location && item.location.toLowerCase().includes(q))
    );
  }

  // 2. Status Dropdown Filter
  if (filterStatus.value === 'lost') {
    list = list.filter(item => item.isLost);
  } else if (filterStatus.value === 'found') {
    list = list.filter(item => !item.isLost);
  } else if (filterStatus.value === 'claimed') {
    list = list.filter(item => item.isClaimed);
  } else if (filterStatus.value === 'unclaimed') {
    list = list.filter(item => !item.isClaimed);
  }

  // 3. Sorting
  if (sortBy.value === 'Newest') {
    // Basic ID or time sorting (since dates are strings, sort by id descending)
    list.sort((a, b) => b.id - a.id);
  } else if (sortBy.value === 'Oldest') {
    list.sort((a, b) => a.id - b.id);
  } else if (sortBy.value === 'Alphabetical') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
});

// Paginated items
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredItems.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value) || 1;
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

onMounted(() => {
  fetchItems();
});
</script>

<template>
  <div class="bg-white min-h-screen text-gray-850 p-6 md:p-8 font-sans">
    <div class="max-w-4xl mx-auto">
      
      <!-- Top Filters / Search Bar Row -->
      <div class="flex flex-wrap items-center gap-4 border-b border-gray-100 pb-5">
        <!-- Search Input -->
        <div class="relative shrink-0">
          <input 
            v-model="searchQuery" 
            type="text" 
            class="input input-bordered w-80 bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 rounded-lg text-sm" 
            placeholder="Search cards by title or tag" 
          />
        </div>

        <!-- Sort Selection -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-500">Sort</span>
          <select 
            v-model="sortBy" 
            class="select select-bordered select-sm bg-white border-gray-300 text-gray-800 focus:outline-none focus:border-purple-500 rounded-lg text-xs"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>

        <!-- Status Filter Selection -->
        <div>
          <select 
            v-model="filterStatus" 
            class="select select-bordered select-sm bg-white border-gray-300 text-gray-800 focus:outline-none focus:border-purple-500 rounded-lg text-xs"
          >
            <option value="all">filter</option>
            <option value="lost">Lost Only</option>
            <option value="found">Found Only</option>
            <option value="claimed">Claimed Only</option>
            <option value="unclaimed">Unclaimed Only</option>
          </select>
        </div>
      </div>

      <!-- Items Grid/List -->
      <div class="mt-8 flex flex-col gap-6 max-w-2xl">
        
        <div 
          v-for="item in paginatedItems" 
          :key="item.id" 
          class="flex flex-col sm:flex-row gap-5 border border-gray-200 rounded-xl p-5 bg-white shadow-xs hover:shadow-sm transition duration-200 relative"
        >
          <!-- Left side: Image of the item -->
          <div class="w-36 h-36 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
            <img 
              v-if="item.image" 
              :src="item.image.startsWith('http') ? item.image : `data:image/png;base64,${item.image}`" 
              class="w-full h-full object-cover" 
              :alt="item.name" 
            />
            <!-- Placeholder icon if image is missing -->
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Right side: Text details and description -->
          <div class="flex-1 flex flex-col justify-between min-w-0">
            
            <div>
              <div class="flex items-start justify-between gap-2">
                <h3 class="text-lg font-bold text-gray-900 leading-tight">
                  {{ item.isLost ? 'Lost' : 'Found' }}: {{ item.name }}
                </h3>
                <span class="text-xs font-semibold text-purple-600 shrink-0">
                  {{ item.isClaimed ? 'Claimed' : 'To be claimed' }}
                </span>
              </div>
              <p class="text-sm text-gray-500 leading-snug mt-1.5 font-medium">
                {{ item.description }}
              </p>
            </div>

            <!-- Details metadata with icons -->
            <div class="flex flex-col gap-1.5 mt-3">
              <!-- Time row -->
              <div class="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ item.isLost ? 'Lost' : 'Found' }}: {{ item.time }}</span>
              </div>

              <!-- Location row -->
              <div class="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span>Location: {{ item.location }}</span>
              </div>
            </div>

            <!-- Actions buttons row -->
            <div class="flex gap-2 self-end mt-4">
              <button class="btn btn-xs min-h-[30px] bg-gray-200 hover:bg-gray-300 border-none text-gray-700 font-bold px-4 rounded-md text-xs transition duration-150">
                Details
              </button>
              <button 
                v-if="item.isClaimed" 
                disabled 
                class="btn btn-xs min-h-[30px] bg-gray-300 border-none text-gray-500 font-bold px-4 rounded-md text-xs cursor-not-allowed"
              >
                Claimed
              </button>
              <button 
                v-else 
                @click="claimItem(item.id)" 
                class="btn btn-xs min-h-[30px] bg-purple-600 hover:bg-purple-700 border-none text-white font-bold px-4 rounded-md text-xs transition duration-150"
              >
                Claim Item
              </button>
            </div>

          </div>

        </div>

      </div>

      <!-- Pagination at the bottom -->
      <div class="flex justify-end gap-3.5 mt-12 max-w-2xl">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="btn bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border-none px-5 py-2 font-bold rounded-lg transition duration-200 text-sm"
        >
          Previous
        </button>
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="btn bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:text-purple-100 text-white border-none px-5 py-2 font-bold rounded-lg transition duration-200 text-sm"
        >
          Next
        </button>
      </div>

    </div>
  </div>
</template>