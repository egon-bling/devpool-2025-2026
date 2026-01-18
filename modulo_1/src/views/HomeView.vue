<!-- Landing page -->

<template>
  <div class="home">
    <h1>Bem-vindo ao Blegon ERP</h1>
    <button @click="goToProducts">Acessar Produtos</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToProducts() {
  router.push('/produtos')
}
</script>

<style scoped>
button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
