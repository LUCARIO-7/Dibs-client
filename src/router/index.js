import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../components/Homepage.vue';
import Login from '../components/Login.vue';
import AddItem from '@/components/addItem.vue';
import LostItems from '@/components/LostItems.vue';
import Founditems from '@/components/Founditems.vue';
import User from '@/components/user.vue';
import NotFound from '@/components/NotFound.vue';
import Logout from '@/components/Logout.vue';



const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout

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
  },
  {
    path:'/user',
    name:'user',
    component: User
  },
  {
    path:'/404',
    name:'notFound',
    component: NotFound
  },
  { path: '/:catchAll(.*)', 
    redirect: '/404'
   }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;