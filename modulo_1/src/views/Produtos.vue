<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import { produtoService } from '../services/produtos.services';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const router = useRouter(); 
const produtos = ref([]); 
const carregando = ref(true);
const paginaAtual = ref(1);
const filtros = ref ({
  nome: '',
  situacao: 1,
  dataInicio: '',
  dataFim: ''
});

const nomesStatus = {
  1: 'Últimos Incluídos',
  2: 'Ativos',
  3: 'Inativos',
  4: 'Excluídos',
  5: 'Todos'
};

const carregarProdutos = async () => {
  carregando.value = true;
  const token = authStore.accessToken;
  
  if (!token) {
    console.error("Usuário não autenticado");
    return;
  }

  try {
    const paramsParaService = { ...filtros.value };

    if (paramsParaService.dataInicio) {
      paramsParaService.dataInclusaoInicial = `${paramsParaService.dataInicio} 00:00:00`;
    }
    if (paramsParaService.dataFim) {
      paramsParaService.dataInclusaoFinal = `${paramsParaService.dataFim} 23:59:59`;
    }
    const result = await produtoService.listar(token, paginaAtual.value, 10, paramsParaService);
    
    produtos.value = result.data || [];
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  } finally {
    carregando.value = false;
  }
};

const aplicarFiltros = () => {
  paginaAtual.value = 1; 
  carregarProdutos();   
};

const limparFiltros = () => {
  filtros.value = { 
    nome: '', 
    situacao: 1, 
    dataInicio: '', 
    dataFim: '' 
  };
  aplicarFiltros(); 
};


const proximaPagina = () => {
  paginaAtual.value++;
  carregarProdutos();
};

const paginaAnterior = () => {
  if (paginaAtual.value > 1) {
    paginaAtual.value--;
    carregarProdutos();
  }
};

const irParaEdicao = (id) => {
  if (!id) return;
  router.push(`/produtos/editar/${id}`);
};


onMounted(carregarProdutos);
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-24 p-4 md:p-8">
    
    <div class="max-w-7xl mx-auto mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 tracking-tight">Gerenciamento de Produtos</h1>
        <p class="text-gray-500 text-sm">Visualize e gerencie seus itens integrados ao Bling.</p>
      </div>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow-sm transition">
        + Novo Produto
      </button>
    </div>

    <div class="max-w-7xl mx-auto bg-white p-5 rounded-t-xl border border-gray-200 border-b-0 shadow-sm">
  <div class="flex flex-col md:flex-row gap-4 items-end">
    
    <div class="flex-1">
      <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Buscar por Nome ou SKU</label>
      <input 
        v-model="filtros.nome"
        @keyup.enter="aplicarFiltros"
        type="text" 
        placeholder="Ex: Camiseta ou SKU123..." 
        class="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm transition"
      />
    </div>

    <div class="w-full md:w-40">
      <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Data Inicial</label>
      <input 
        type="date" 
        v-model="filtros.dataInicio"
        class="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="w-full md:w-40">
      <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Data Final</label>
      <input 
        type="date" 
        v-model="filtros.dataFim"
        class="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="w-full md:w-48">
      <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Situação</label>
      <select 
        v-model="filtros.situacao"
        class="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="1">Últimos Incluidos</option>
        <option value="2">Ativos</option>
        <option value="3">Inativos</option>
        <option value="4">Excluídos</option>
        <option value="5">Todos</option>
      </select>
    </div>

    <div class="flex gap-2">
      <button @click="limparFiltros" class="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-md transition">Limpar</button>
      <button @click="aplicarFiltros" class="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-blue-700 transition shadow-sm">Filtrar</button>
    </div>

  </div>
</div>

    <div class="max-w-7xl mx-auto bg-white rounded-b-xl shadow-sm border border-gray-200 overflow-hidden">
   <div class="max-w-7xl mx-auto mb-2 text-xs text-gray-400">
  Filtrando por: <b>{{ filtros.nome || 'Nenhum nome' }}</b> | 
  Status: <b>{{ nomesStatus[filtros.situacao] }}</b>
</div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr class="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            <th class="px-6 py-4">Código (SKU)</th>
            <th class="px-6 py-4">Nome</th>
            <th class="px-6 py-4">Tipo</th>
            <th class="px-6 py-4 text-center">Situação</th>
            <th class="px-6 py-4">Preço</th>
            <th class="px-6 py-4">Unidade</th>
            <th class="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="produto in produtos" :key="produto.id" class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 text-sm font-mono text-gray-400">{{ produto.codigo }}</td>
            <td class="px-6 py-4 text-sm font-semibold text-gray-800">{{ produto.nome }}</td>
            <td class="px-6 py-4 text-xs text-gray-500">{{ produto.tipo === 'P' ? 'Produto' : 'Serviço' }}</td>
            <td class="px-6 py-4 text-center">
              <span :class="produto.situacao === 'A' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" 
                    class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                {{ produto.situacao === 'A' ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm font-bold text-gray-900">R$ {{ Number(produto.preco).toFixed(2) }}</td>
            <td class="px-6 py-4 text-xs text-gray-400">{{ produto.unidade || 'un' }}</td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-3 text-xs font-bold">
                <button 
                  @click="irParaEdicao(produto.id)" 
                  class="text-blue-600 hover:text-blue-900 font-bold"
                    >
                   Editar
                  </button>
                <button class="text-red-500 hover:text-red-700">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
        <span class="text-xs text-gray-400 font-medium">Página atual: <b class="text-blue-600">{{ paginaAtual }}</b></span>
        <div class="flex gap-2">
          <button @click="paginaAnterior" :disabled="paginaAtual === 1" class="px-4 py-2 bg-white border border-gray-200 rounded text-xs font-bold disabled:opacity-30 hover:bg-gray-50 transition">Anterior</button>
          <button @click="proximaPagina" :disabled="produtos.length < 10" class="px-4 py-2 bg-white border border-gray-200 rounded text-xs font-bold disabled:opacity-30 hover:bg-gray-50 transition">Próxima</button>
        </div>
      </div>
    </div>

  </div>
</template>