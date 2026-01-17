<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const produtos = ref([]);
const carregando = ref(true);

const carregarProdutos = async () => {
  const token = authStore.accessToken;
  

  try {
    const response = await fetch("/api-bling/Api/v3/produtos", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    produtos.value = result.data; 
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  } finally {
    carregando.value = false;
  }
};

onMounted(() => {
  carregarProdutos();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Meus Produtos - Bling</h1>
    
    <table class="min-w-full bg-white border">
      <thead>
        <tr>
          <th class="border px-4 py-2">Código</th>
          <th class="border px-4 py-2">Nome</th>
          <th class="border px-4 py-2">Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" :key="produto.id">
          <td class="border px-4 py-2">{{ produto.codigo }}</td>
          <td class="border px-4 py-2">{{ produto.nome }}</td>
          <td class="border px-4 py-2">R$ {{ produto.preco }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>