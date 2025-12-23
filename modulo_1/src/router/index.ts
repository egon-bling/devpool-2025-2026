import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import LandingPage from '../views/LandingPage.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage
    },
    {
        path: '/produtos',
        name: 'Produtos',
        component: () => import('../views/Produtos.vue')
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router