<!-- Landing page -->

<template>
  <div class="home">
    <h1>Bem-vindo ao Blegon ERP</h1>
    <!-- Botão que simula o login e chama a função authenticate na store -->
    <button @click="authenticate">Fazer login</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore';

const router = useRouter()
const productStore = useProductStore()

/* function goToProducts() {
  router.push('/produtos')
} */

//Nova função que simula o login e redireciona para a página de produtos
//async function login() {
  // Simularia uma chamada de autenticação. Mas gerou erro de CORS na API do Bling.
  //try {
  //  await productStore.authenticate();
  //  router.push('/produtos');
  //} catch {
    //Em caso de falha
  //  alert('Falha ao autenticar com a API do Bling. Tente novamnete.');
  //}

  //Alternativa:
async function authenticate() {
  productStore.authenticated = true; // Simula autenticação bem-sucedida
  router.push('/produtos'); //Direciona para a página de produtos
  return true;
}

</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
