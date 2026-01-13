<script setup>
import { ref, onMounted } from 'vue';

const produtos = ref([]);

const carregarProdutos = async () => {
  const token = localStorage.getItem('bling_access_token');

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    const response = await fetch("https://www.bling.com.br/Api/v3/produtos", requestOptions);
    const result = await response.json();
    
    produtos.value = result.data; 
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
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