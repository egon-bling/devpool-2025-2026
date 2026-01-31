<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import { useProductStore } from '../stores/productStore';
import { produtoService } from '../services/produtos.services';
import { useAuthStore } from '../stores/authStore';
import FiltroProdutos from '../components/Produtos/FiltroProdutos.vue';
import TabelaProdutos from '../components/Produtos/ProdutosTabel.vue';
import { useAcoesProdutos } from '../composables/useAcoesProdutos';
import Toast from '../components/Geral/Toast.vue'; 
import ModalProcessando from '../components/Geral/ModalProcessando.vue';
import ModalConfirmacao from '../components/Geral/ModalConfirmacao.vue';

const STORAGE_KEY = 'filtros_produtos_bling';
const productStore = useProductStore();
const authStore = useAuthStore();
const router = useRouter(); 

const produtos = ref([]); 
const carregando = ref(true);
const paginaAtual = ref(1);
const filtros = ref({
  nome: '',
  situacao: 1,
  dataInicio: '',
  dataFim: ''
});

const toastConfig = ref({ exibir: false, mensagem: '', tipo: 'sucesso' });
const mostrarToast = (msg, tipo = 'sucesso') => {
  toastConfig.value = { exibir: true, mensagem: msg, tipo };
  setTimeout(() => { toastConfig.value.exibir = false; }, 4000);
};

const { 
  itensSelecionados, 
  modalAberto, 
  processandoMassa,
  abrirModalExclusao, 
  abrirModalMassa, 
  executarExclusao 
} = useAcoesProdutos(produtos, carregarProdutos, mostrarToast);

async function carregarProdutos() {
  carregando.value = true;
  salvarEstado();
  const token = authStore.accessToken;
  
  if (!token) return;

  try {
    const paramsParaService = { ...filtros.value };
    if (paramsParaService.dataInicio) paramsParaService.dataInclusaoInicial = `${paramsParaService.dataInicio} 00:00:00`;
    if (paramsParaService.dataFim) paramsParaService.dataInclusaoFinal = `${paramsParaService.dataFim} 23:59:59`;
    
    const result = await produtoService.listar(paginaAtual.value, 10, paramsParaService);
    produtos.value = result.data || [];
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  } finally {
    carregando.value = false;
  }
}

const aplicarFiltros = () => {
  const { dataInicio, dataFim } = filtros.value;
  if ((dataInicio || dataFim) && (!dataInicio || !dataFim)) {
    mostrarToast("Preencha ambas as datas para filtrar.", "erro");
    return;
  }
  paginaAtual.value = 1; 
  carregarProdutos();   
};

const limparFiltros = () => {
  filtros.value = { nome: '', situacao: 1, dataInicio: '', dataFim: '' };
  paginaAtual.value = 1;
  sessionStorage.removeItem(STORAGE_KEY); 
  carregarProdutos();
};

const salvarEstado = () => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ filtros: filtros.value, pagina: paginaAtual.value }));
};

const recuperarEstado = () => {
  const salvo = sessionStorage.getItem(STORAGE_KEY);
  if (salvo) {
    const { filtros: f, pagina } = JSON.parse(salvo);
    filtros.value = f;
    paginaAtual.value = pagina;
  }
};

const proximaPagina = () => { paginaAtual.value++; carregarProdutos(); };
const paginaAnterior = () => { if (paginaAtual.value > 1) { paginaAtual.value--; carregarProdutos(); } };
const editar = (id) => router.push(`/produtos/editar/${id}`);
const Cadastro = () => router.push('/produtos/cadastro');

onMounted(() => {
  recuperarEstado();
  carregarProdutos();
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-24 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">

      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Meus Produtos</h1>
          <p class="text-slate-500 text-sm">Gerencie seu catálogo integrado ao Bling</p>
        </div>

        <button 
          @click="Cadastro" 
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 active:scale-95 w-full md:w-auto justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Novo Produto
        </button>
      </div>
      
      <FiltroProdutos v-model="filtros" @filtrar="aplicarFiltros" @limpar="limparFiltros" />
      
      <Transition name="fade">
        <div v-if="itensSelecionados?.length > 0" 
             class="mb-4 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-between shadow-sm">
          <div class="flex items-center gap-3">
            <span class="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">{{ itensSelecionados.length }}</span>
            <p class="text-sm text-rose-800 font-medium">Itens selecionados</p>
          </div>
          <div class="flex gap-3">
            <button @click="itensSelecionados = []" class="text-sm text-rose-400">Desmarcar</button>
            <button @click="abrirModalMassa" class="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Excluir em lote</button>
          </div>
        </div>
      </Transition>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <TabelaProdutos 
          :produtos="produtos" 
          v-model:selecionados="itensSelecionados"
          @editar="editar" 
          @excluir="abrirModalExclusao" 
        />
        
        <div class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <span class="text-xs text-gray-400">Página: <b>{{ paginaAtual }}</b></span>
          <div class="flex gap-2">
            <button v-if="paginaAtual > 1" @click="paginaAnterior" class="px-4 py-1 bg-white border rounded">Anterior</button>
            <button v-if="produtos?.length === 10" @click="proximaPagina" class="px-4 py-1 bg-white border rounded">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalConfirmacao :aberto="modalAberto" @confirmar="executarExclusao" @cancelar="modalAberto = false" />
  <ModalProcessando :aberto="processandoMassa" />
  <Toast :exibir="toastConfig.exibir" :tipo="toastConfig.tipo" :mensagem="toastConfig.mensagem" />
</template>