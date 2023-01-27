import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import HomePage from '../views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import ListPage from '@/views/ListPage.vue'
import NewGoalPage from '@/views/NewGoalPage.vue'
import CreateAccountPage from '@/views/CreateAccountPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/list',
    name: 'Goal List',
    component: ListPage,
  },
  {
    path: '/new',
    name: 'New Goal',
    component: NewGoalPage,
  },
  {
    path: '/signup',
    name: "create acount",
    component: CreateAccountPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
