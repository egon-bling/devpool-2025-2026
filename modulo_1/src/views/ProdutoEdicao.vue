<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import { formatProduto } from '../utils/productFormatters';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const salvando = ref(false);
const mensagemErro = ref('');
const erros = ref<any>({}); 

const produto = ref({
  id: '',
  nome: '',
  tipo: 'P',
  situacao: 'A',
  formato: 'S',
  codigo: '',
  preco: 0,
  unidade: 'UN',
  descricaoCurta: ''
});

const validarFormulario = () => {
  erros.value = {};
  let valido = true;

  if (!produto.value.codigo || produto.value.codigo.trim() === '') {
    erros.value.codigo = "O Código (SKU) é obrigatório.";
    valido = false;
  }
  if (!produto.value.situacao) {
    erros.value.situacao = "A Situação é obrigatória.";
    valido = false;
  }
  if (!produto.value.nome || produto.value.nome.trim() === '') {
    erros.value.nome = "O Nome é obrigatório.";
    valido = false;
  }

  return valido;
};

const manipularSalvar = async () => {
  if (!validarFormulario()) return;

  salvando.value = true;
  mensagemErro.value = '';
  
  const dadosFormatados = formatProduto(produto.value);
  const idProduto = (route.params.id as string) || produto.value.id;
  
  const resultado = await productStore.salvarEdicao(idProduto, dadosFormatados);
  
  if (resultado.sucesso) {
    router.push('/produtos');
  } else {
    mensagemErro.value = resultado.erro || "Erro ao salvar o produto.";
    salvando.value = false;
  }
};

onMounted(async () => {
  const id = route.params.id as string;
  if (id) {
    const dados = await productStore.buscarProdutoPorId(id); 
    if (dados) {
      produto.value = { ...produto.value, ...dados };
    }
  }
});

</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-24 p-4 md:p-8">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800">Editar Produto</h2>
        <p class="text-gray-500 text-sm">Preencha os campos obrigatórios para atualizar no Bling.</p>
      </div>

      <div v-if="mensagemErro" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex justify-between items-center">
        <span>{{ mensagemErro }}</span>
        <button @click="mensagemErro = ''" class="font-bold">X</button>
      </div>

      <form @submit.prevent="manipularSalvar" class="space-y-6">
        
        <div>
          <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nome*</label>
          <input 
            v-model="produto.nome" 
            type="text" 
            :class="{'border-red-500 ring-1 ring-red-500': erros.nome}"
            class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition" 
          />
          <p v-if="erros.nome" class="text-red-500 text-[10px] mt-1 font-bold italic">{{ erros.nome }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Tipo*</label>
            <select v-model="produto.tipo" class="w-full px-3 py-2 border border-gray-200 rounded-md bg-slate-50">
              <option value="P">Produto</option>
              <option value="S">Serviço</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Situação**</label>
            <select 
              v-model="produto.situacao" 
              :class="{'border-red-500': erros.situacao}"
              class="w-full px-3 py-2 border border-gray-200 rounded-md bg-slate-50"
            >
              <option value="A">Ativo</option>
              <option value="I">Inativo</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Formato*</label>
            <select v-model="produto.formato" class="w-full px-3 py-2 border border-gray-200 rounded-md bg-slate-50">
              <option value="S">Simples</option>
              <option value="V">Com Variações</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Código (SKU)**</label>
            <input 
              v-model="produto.codigo" 
              type="text" 
              :class="{'border-red-500 ring-1 ring-red-500': erros.codigo}"
              class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
            <p v-if="erros.codigo" class="text-red-500 text-[10px] mt-1 font-bold italic">{{ erros.codigo }}</p>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Preço</label>
            <input v-model="produto.preco" type="number" step="0.01" class="w-full px-3 py-2 border border-gray-200 rounded-md" />
          </div>

          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Unidade</label>
            <input v-model="produto.unidade" type="text" placeholder="Ex: UN, PC, KG" class="w-full px-3 py-2 border border-gray-200 rounded-md" />
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Descrição Curta</label>
          <textarea 
            v-model="produto.descricaoCurta" 
            rows="3" 
            class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
          ></textarea>
        </div>

        <div class="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button type="button" @click="router.back()" class="px-6 py-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition">
            Cancelar
          </button>
          <button 
            type="submit" 
            :disabled="salvando" 
            class="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2"
          >
            <span v-if="salvando" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            {{ salvando ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>