import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Auth from '../views/Auth.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage
    },

    {
        path: '/auth',
        name: 'auth',
        component: () => import('../views/Auth.vue')
    },

    {
        path: '/produtos',
        name: 'Produtos',
        component: () => import('../views/Produtos.vue'),
        meta: {requiresAuth: true}
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})


router.beforeEach((to, from, next) => {
    const autenticacao = to.meta.requiresAuth;
    const token = localStorage.getItem('bling_access_token');

    if (autenticacao && !token) {
        next({name:'LandingPage'});
    } else {
        next();
    }
})
export default router