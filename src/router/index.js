import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../components/Homepage.vue';
import Login from '../components/Login.vue';
import Logout from '@/components/Logout.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Homepage,
    meta:{requiresAuth:true}
  },
  {
    path:'/logout',
    name:'Logout',
    component: Logout
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;