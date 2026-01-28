import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Produtos from '../views/Produtos.vue';
import ProdutoEdicao from '../views/ProdutoEdicao.vue';
import Auth from '../views/Auth.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/auth', component: Auth },
  { path: '/produtos', component: Produtos },
  { 
    path: '/produtos/editar/:id', 
    name: 'ProdutoEdicao',
    component: ProdutoEdicao,
    props: true 
  },
];

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