<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Situação</th>
        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-100">
      <tr v-for="produto in itens" :key="produto.id">
        <td class="px-6 py-4 text-sm font-mono text-gray-400">{{ produto.codigo }}</td>
        <td class="px-6 py-4 text-sm font-bold text-gray-800">{{ produto.nome }}</td>
        <td class="px-6 py-4 text-center">
          <ProdutoStatus :situacao="produto.situacao" />
        </td>
        <td class="px-6 py-4 text-right text-sm">
        <router-link 
  :to="`/produtos/editar/${produto.id}`" 
  class="text-indigo-600 font-bold"
  style="position: relative; z-index: 9999; pointer-events: auto !important;"
>
  Editar
</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import ProdutoStatus from '../Produtos/ProdutoStatus.vue';
import { onMounted } from 'vue';

const props = defineProps({ itens: Array });

onMounted(() => {
  if (props.itens && props.itens.length > 0) {
    console.log("Estrutura do primeiro produto:", props.itens[0]);
  }
});
</script>