import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../components/Homepage.vue';
import Login from '../components/Login.vue';
import Logout from '@/components/Logout.vue';
import Item from '@/components/Item.vue';
import AddItem from '@/components/addItem.vue';



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
    path:'/item',
    name:'Item',
    component: Item
  },
  {
    path:'/additem',
    name:'AddItem',
    component: AddItem
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;