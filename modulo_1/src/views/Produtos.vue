<template>
  <section class="section">
    <div class="container">
      <div class="level mb-5">
        <div class="level-left">
          <h1 class="title">Gestão de Produtos</h1>
        </div>
      </div>

      <FiltroProdutos :is-loading="carregando" @pesquisar="handlePesquisa" @limpar="handleLimpar" />

      <div v-if="erro" class="notification is-danger mt-5">
        <button class="delete" @click="erro = false"></button>
        {{ mensagemErro }}
      </div>

      <div class="box mt-5 table-container-fixed">
        <div v-if="carregando" class="has-text-centered my-5">
          <button class="button is-loading is-ghost">Carregando</button>
        </div>

        <table class="table is-fullwidth is-striped is-hoverable table-fixed">
          <thead>
            <tr>
              <th style="width: 160px;">Código (SKU)</th>
              <th>Nome</th> <th style="width: 130px;">Preço</th>
              <th style="width: 120px;" class="has-text-centered">Situação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtos" :key="produto.id">
              <td class="truncate" :title="produto.codigo">
                <strong>{{ produto.codigo }}</strong>
              </td>
              
              <td class="truncate" :title="produto.nome">
                {{ produto.nome }}
              </td>
              
              <td class="truncate">
                {{ Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
              </td>
              
              <td class="has-text-centered">
                <span :class="getClassSituacao(produto.situacao)">
                  {{ getLabelSituacao(produto.situacao) }}
                </span>
              </td>
            </tr>
            
            <tr v-if="produtos.length === 0 && !carregando">
              <td colspan="4" class="has-text-centered py-6 is-size-5 has-text-grey">
                Nenhum produto encontrado com os filtros selecionados.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Paginacao 
        :pagina-atual="pagina" 
        :tem-mais="temMaisPaginas"
        :is-loading="carregando"
        @mudar-pagina="trocarPagina" 
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Paginacao from '../components/Paginacao.vue';
import FiltroProdutos from '../components/FiltroProdutos.vue';

const router = useRouter();
const produtos = ref<any[]>([]);
const carregando = ref(false);
const erro = ref(false);
const mensagemErro = ref('');

const pagina = ref(1);
const temMaisPaginas = ref(false);

const filtrosAtivos = reactive({
  nome: '',
  sku: '',
  dataInicio: '',
  dataFim: '',
  situacao: '1' 
});

const getClassSituacao = (situacao: string) => {
  const map: Record<string, string> = { 'A': 'is-success', 'I': 'is-warning', 'E': 'is-danger' };
  return ['tag', map[situacao] || 'is-light'];
};

const getLabelSituacao = (situacao: string) => {
  const map: Record<string, string> = { 'A': 'Ativo', 'I': 'Inativo', 'E': 'Excluído' };
  return map[situacao] || situacao;
};

// Ações
const handlePesquisa = (novosFiltros: any) => {
  Object.assign(filtrosAtivos, novosFiltros);
  pagina.value = 1;
  buscarProdutos();
};

const handleLimpar = () => {
  Object.assign(filtrosAtivos, { nome: '', sku: '', dataInicio: '', dataFim: '', situacao: '1' });
  pagina.value = 1;
  buscarProdutos();
};

const trocarPagina = (novaPagina: number) => {
  if (novaPagina < 1 || (novaPagina > pagina.value && !temMaisPaginas.value)) return;
  
  pagina.value = novaPagina;
  buscarProdutos();
};

const buscarProdutos = async () => {
  if (carregando.value) return; 

  carregando.value = true;
  erro.value = false;

  const token = localStorage.getItem('bling_access_token');
  if (!token) {
    router.push('/');
    return;
  }

  try {
    let url = `/Api/v3/produtos?pagina=${pagina.value}&limite=10`;

    if (filtrosAtivos.nome) url += `&nome=${encodeURIComponent(filtrosAtivos.nome)}`;
    if (filtrosAtivos.sku) url += `&codigo=${encodeURIComponent(filtrosAtivos.sku)}`;
    if (filtrosAtivos.situacao) url += `&criterio=${filtrosAtivos.situacao}`;
    if (filtrosAtivos.dataInicio) url += `&dataAlteracaoInicial=${filtrosAtivos.dataInicio}`;
    if (filtrosAtivos.dataFim) url += `&dataAlteracaoFinal=${filtrosAtivos.dataFim}`;

    const resposta = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const dados = await resposta.json();
    
    if (resposta.ok) {
      produtos.value = dados.data || [];

      temMaisPaginas.value = produtos.value.length === 10;
    } else {
      if (resposta.status === 404) {
        produtos.value = [];
        temMaisPaginas.value = false;
      } else {
        throw new Error(dados.error?.description || 'Erro ao buscar produtos');
      }
    }
  } catch (err: any) {
    erro.value = true;
    mensagemErro.value = err.message;
    produtos.value = [];
    temMaisPaginas.value = false;
  } finally {
    carregando.value = false;
  }
};

onMounted(buscarProdutos);
</script>

<style scoped>
.table-fixed {
  table-layout: fixed;
  width: 100%;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-container-fixed {
  min-height: 550px;
}
</style>