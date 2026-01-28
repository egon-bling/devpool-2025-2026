<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import { formatProduto } from '../utils/productFormatters';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const carregandoLocal = ref(true);
const salvando = ref(false);
const mensagemErro = ref('');

const produto = ref({
  id: '',
  nome: '',
  codigo: '',
  preco: 0,
  situacao: 'A',
  unidade: 'UN'
});

onMounted(async () => {
  const id = route.params.id as string;
  if (id) {
    try {
      const dados = await productStore.buscarProdutoPorId(id);
      if (dados) {
        produto.value = {
          id: dados.id,
          nome: dados.nome,
          codigo: dados.codigo,
          preco: dados.preco,
          situacao: dados.situacao,
          unidade: dados.unidade || 'UN'
        };
      }
    } catch (error) {
      alert("Erro ao carregar produto.");
    } finally {
      carregandoLocal.value = false;
    }
  }
});

const manipularSalvar = async () => {
  salvando.value = true;
  mensagemErro.value = '';
  
  const dadosFormatados = formatProduto(produto.value);
  const resultado = await productStore.salvarEdicao(produto.value.id, dadosFormatados);
  
  if (resultado.sucesso) {
    router.push('/produtos'); // Volta para a listagem
  } else {
    mensagemErro.value = resultado.erro || "Erro ao salvar.";
    salvando.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-24 p-4 md:p-8">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 class="text-xl font-bold mb-6">Editar Produto</h2>

      <div v-if="mensagemErro" class="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
        {{ mensagemErro }}
      </div>

      <form @submit.prevent="manipularSalvar" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase">Nome</label>
          <input v-model="produto.nome" type="text" class="w-full px-3 py-2 border rounded-md" required />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase">Código (SKU)</label>
            <input v-model="produto.codigo" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase">Preço</label>
            <input v-model="produto.preco" type="number" step="0.01" class="w-full px-3 py-2 border rounded-md" required />
          </div>
        </div>

        <div class="flex justify-end gap-4 pt-4">
          <button type="button" @click="router.back()" class="px-4 py-2 text-gray-500">Cancelar</button>
          <button type="submit" :disabled="salvando" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50">
            {{ salvando ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>