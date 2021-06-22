import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home/Home.vue'
import Login from '../views/login/Login.vue'

import CategoryAction from '../views/category/CategoryAction.vue'
import CategoryList from '../views/category/CategoryList.vue'

import GameItems from '../views/gameitems/GameItems.vue'
import GameItemsList from '../views/gameitems/GameItemsList.vue'

import HeroEdit from '../views/hero/HeroEdit.vue'
import HeroList from '../views/hero/HeroList.vue'

import ArticleEdit from '../views/article/ArticleEdit.vue'
import ArticleList from '../views/article/ArticleList.vue'

import AdEdit from '../views/ad/AdEdit.vue'
import AdList from '../views/ad/AdList.vue'

import AdminUserEdit from '../views/adminuser/AdminUserEdit.vue'
import AdminUserList from '../views/adminuser/AdminUserList.vue'

const routes = [
  { path: '', redirect: '/categories' },
  { path: '/login', component: Login, alias: '/login', meta: { isPublic: true } },
  {
    path: '/categories', component: Home, children: [
      { path: '', redirect: '/categories/create' },
      { path: 'create', component: CategoryAction, alias: '/create' },
      { path: 'edit/:id', component: CategoryAction, alias: 'edit/:id', props: true },
      { path: 'list', component: CategoryList, alias: 'list' },
    ]
  },
  {
    path: '/items', component: Home, alias: '/items', children: [
      { path: 'create', component: GameItems, alias: 'create' },
      { path: 'edit/:id', component: GameItems, alias: 'edit/:id', props: true },
      { path: 'list', component: GameItemsList, alias: 'list' },
    ]
  },
  {
    path: '/heroes', component: Home, alias: '/heroes', children: [
      { path: 'create', component: HeroEdit, alias: 'create' },
      { path: 'edit/:id', component: HeroEdit, alias: 'edit/:id', props: true },
      { path: 'list', component: HeroList, alias: 'list' },
    ]
  },
  {
    path: '/articles', component: Home, alias: '/articles', children: [
      { path: 'create', component: ArticleEdit, alias: 'create' },
      { path: 'edit/:id', component: ArticleEdit, alias: 'edit/:id', props: true },
      { path: 'list', component: ArticleList, alias: 'list' },
    ]
  },
  {
    path: '/ads', component: Home, alias: '/ads', children: [
      { path: 'create', component: AdEdit, alias: 'create' },
      { path: 'edit/:id', component: AdEdit, alias: 'edit/:id', props: true },
      { path: 'list', component: AdList, alias: 'list' },
    ]
  },
  {
    path: '/admin_users', component: Home, alias: '/admin_users', children: [
      { path: 'create', component: AdminUserEdit, alias: 'create' },
      { path: 'edit/:id', component: AdminUserEdit, alias: 'edit/:id', props: true },
      { path: 'list', component: AdminUserList, alias: 'list' },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router