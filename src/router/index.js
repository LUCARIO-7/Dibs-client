import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../components/Homepage.vue';
import Login from '../components/Login.vue';
import AddItem from '@/components/addItem.vue';
import LostItems from '@/components/LostItems.vue';
import Founditems from '@/components/Founditems.vue';



const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Homepage
  },
  {
    path:'/lostItems',
    name:'Item',
    component: LostItems
  },
  {
    path:'/additem',
    name:'AddItem',
    component: AddItem
  },
  {
    path:'/founditems',
    name:'foundItem',
    component: Founditems
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;