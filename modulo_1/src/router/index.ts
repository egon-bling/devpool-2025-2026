import { createRouter, createWebHistory } from 'vue-router'
import Callback from '../views/Callback.vue'
import Landingpage from '../views/LandingPage.vue'
import Produtos from '../views/Produtos.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Landingpage
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: Produtos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router