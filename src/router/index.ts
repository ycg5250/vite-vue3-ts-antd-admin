import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home/Home.vue'
// import Login from '../views/login/Login.vue'
import Category from '../views/category/Category.vue'
import CategoryList from '../views/category/CategoryList.vue'
import HomePage from '../views/homepage/HomePage.vue'

const routes = [
  { path: '', redirect: '/home' },
  {
    path: '/home', component: Home
  },
  {
    path: '/categories', component: Home, alias: '/categories', children: [
      { path: 'create', component: Category, alias: 'create' },
      { path: 'edit/:id', component: Category, alias: 'edit', props: true },
      { path: 'list', component: CategoryList, alias: 'list' },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router