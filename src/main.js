import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

createApp(App)
.use(router)
.mount('#app')
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'
axios.defaults.withCredentials=true

