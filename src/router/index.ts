import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home/Home.vue'
// import Login from '../views/login/Login.vue'
import CategoryAction from '../views/category/CategoryAction.vue'
import CategoryList from '../views/category/CategoryList.vue'

import GameItems from '../views/gameitems/GameItems.vue'
import GameItemsList from '../views/gameitems/GameItemsList.vue'

import HeroEdit from '../views/hero/HeroEdit.vue'
import HeroList from '../views/hero/HeroList.vue'

import ArticleEdit from '../views/article/ArticleEdit.vue'
import ArticleList from '../views/article/ArticleList.vue'

const routes = [
  { path: '', redirect: '/home' },
  {
    path: '/home', component: Home
  },
  {
    path: '/categories', component: Home, alias: '/categories', children: [
      { path: 'create', component: CategoryAction, alias: 'create' },
      { path: 'edit/:id', component: CategoryAction, alias: 'edit', props: true },
      { path: 'list', component: CategoryList, alias: 'list' },
    ]
  },
  {
    path: '/gameitems', component: Home, alias: '/gameitems', children: [
      { path: 'create', component: GameItems, alias: 'create' },
      { path: 'edit/:id', component: GameItems, alias: 'edit', props: true },
      { path: 'list', component: GameItemsList, alias: 'list' },
    ]
  },
  {
    path: '/heroes', component: Home, alias: '/heroes', children: [
      { path: 'create', component: HeroEdit, alias: 'create' },
      { path: 'edit/:id', component: HeroEdit, alias: 'edit', props: true },
      { path: 'list', component: HeroList, alias: 'list' },
    ]
  },
  {
    path: '/articles', component: Home, alias: '/articles', children: [
      { path: 'create', component: ArticleEdit, alias: 'create' },
      { path: 'edit/:id', component: ArticleEdit, alias: 'edit', props: true },
      { path: 'list', component: ArticleList, alias: 'list' },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router