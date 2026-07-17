import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '@/views/HomeView.vue';
import Login from '@/views/LoginView.vue';
import AddItem from '@/views/AddItemView.vue';
import LostItems from '@/views/LostItemsView.vue';
import Founditems from '@/views/FoundItemsView.vue';
import User from '@/views/UserView.vue';
import NotFound from '@/views/NotFoundView.vue';
import Logout from '@/views/LogoutView.vue';
import Signup from '@/views/SignupView.vue';



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
  {
    path:'/signUp',
    name:'register',
    component: Signup
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