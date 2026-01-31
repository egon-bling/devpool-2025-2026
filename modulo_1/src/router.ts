/* Gerencia as rotas da aplicação (Landing page e CRUD de produtos) */

import { createRouter, createWebHistory } from 'vue-router' //
import HomeView from './views/HomeView.vue'
import ProductsView from './views/ProductsView.vue'
import CallbackView from './views/CallbackView.vue' //importa a view de callback (AUTH_01A)
import { useAuthStore } from './stores/auth'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { 
    path: '/produtos', 
    name: 'Products', 
    component: ProductsView,
    meta: {requiresAuth: true} // AUTH_03A para validar se está autenticado
  },

  {
    //AUTH-01A (O redirect_uri configurado no Bling DEVE ser exatamente https://seu-dominio/oauth/callback. 
    // Se no Bling estiver /callback e no Vue /oauth/callback, não funciona: Ajustar aqui)
    path: '/oauth/callback',
    name: 'OAuthCallback',
    component: CallbackView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//AUTH_03A Navigation Guard: impede acesso à rota sem autenticação
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    console.warn('Acesso negado: Autenticação necessária.')
    return '/' /* leva à landing page */
  }
})

export default router
