/* Gerencia as rotas da aplicação (Landing page e CRUD de produtos) */

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ProductsView from './views/ProductsView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/produtos', name: 'Products', component: ProductsView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
