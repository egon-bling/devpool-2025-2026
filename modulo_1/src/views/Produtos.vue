<template>
  <section class="section">
    <div class="container">
      <div class="level mb-5">
        <div class="level-left">
          <h1 class="title">Gestão de Produtos</h1>
        </div>
      </div>

      <FiltroProdutos :is-loading="carregando" @pesquisar="handlePesquisa" @limpar="handleLimpar" />
      <div class="level mb-4">
        <div class="level-left">
          <div class="field is-grouped is-grouped-multiline is-align-items-center">
            <p class="control">
              <button class="button" :class="produtosSelecionados.length > 0 ? 'is-danger' : 'is-light is-disabled'"
                :disabled="produtosSelecionados.length === 0" @click="excluirEmMassa" title="Excluir selecionados">
                <span class="icon is-small">
                  <i class="fas fa-trash"></i>
                </span>
                <span>Excluir</span>
              </button>
            </p>
            <p v-if="produtosSelecionados.length > 0" class="control has-text-weight-semibold mr-3">
              {{ produtosSelecionados.length }} {{ produtosSelecionados.length === 1 ? 'selecionado' : 'selecionados' }}
            </p>
          </div>
        </div>

        <div class="level-right">
          <button class="button is-primary" @click="irParaInclusao">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
            <span>Incluir produto</span>
          </button>
        </div>
      </div>

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
              <th style="width: 40px;">
                <input type="checkbox" :checked="selecionouTodos" @change="alternarTodos">
              </th>
              <th style="width: 160px;">Código (SKU)</th>
              <th>Nome</th>
              <th style="width: 130px;">Preço</th>
              <th style="width: 120px;" class="has-text-centered">Situação</th>
              <th style="width: 80px;" class="has-text-centered">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtos" :key="produto.id">
              <td>
                <input type="checkbox" :value="produto.id" v-model="produtosSelecionados">
              </td>
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
              <td class="has-text-centered">
                <div class="dropdown is-right" :class="{ 'is-active': dropdownAberto === produto.id }">
                  <div class="dropdown-trigger">
                    <button class="button is-small is-ghost" @click.stop="alternarDropdown(produto.id)">
                      <span class="icon is-small">⋮</span>
                    </button>
                  </div>
                  <div class="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <a @click="irParaEdicao(produto.id)" class="dropdown-item">
                        Editar
                      </a>
                      <hr class="dropdown-divider">
                      <a @click="confirmarExclusao(produto.id)" class="dropdown-item has-text-danger">
                        Excluir
                      </a>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <tr v-if="produtos.length === 0 && !carregando">
              <td colspan="6" class="has-text-centered py-6 is-size-5 has-text-grey">
                Nenhum produto encontrado com os filtros selecionados.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Paginacao :pagina-atual="pagina" :tem-mais="temMaisPaginas" :is-loading="carregando"
        @mudar-pagina="trocarPagina" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue';
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

const produtosSelecionados = ref<number[]>([]);
const dropdownAberto = ref<number | null>(null);
const filtrosAtivos = reactive({
  nome: '',
  sku: '',
  dataInicio: '',
  dataFim: '',
  situacao: '1'
});

const selecionouTodos = computed(() => {
  return produtos.value.length > 0 && produtosSelecionados.value.length === produtos.value.length;
});

const alternarTodos = () => {
  if (selecionouTodos.value) {
    produtosSelecionados.value = [];
  } else {
    produtosSelecionados.value = produtos.value.map(p => p.id);
  }
};

const alternarDropdown = (id: number) => {
  dropdownAberto.value = dropdownAberto.value === id ? null : id;
};

const fecharDropdownExterno = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown-trigger')) {
    dropdownAberto.value = null;
  }
};

const getClassSituacao = (situacao: string) => {
  const map: Record<string, string> = { 'A': 'is-success', 'I': 'is-warning', 'E': 'is-danger' };
  return ['tag', map[situacao] || 'is-light'];
};

const getLabelSituacao = (situacao: string) => {
  const map: Record<string, string> = { 'A': 'Ativo', 'I': 'Inativo', 'E': 'Excluído' };
  return map[situacao] || situacao;
};

const irParaEdicao = (id: number) => {
  router.push(`/produtos/editar/${id}`);
};

const confirmarExclusao = async (id: number) => {
  if (confirm("Deseja realmente excluir este produto?")) {
    console.log("Excluir individual:", id);
  }
};

const excluirEmMassa = () => {
  if (confirm(`Deseja excluir ${produtosSelecionados.value.length} produtos selecionados?`)) {
    console.log("Excluir IDs:", produtosSelecionados.value);
  }
};

const handlePesquisa = (novosFiltros: any) => {
  Object.assign(filtrosAtivos, novosFiltros);
  pagina.value = 1;
  produtosSelecionados.value = [];
  buscarProdutos();
};

const handleLimpar = () => {
  Object.assign(filtrosAtivos, { nome: '', sku: '', dataInicio: '', dataFim: '', situacao: '1' });
  pagina.value = 1;
  produtosSelecionados.value = [];
  buscarProdutos();
};

const trocarPagina = (novaPagina: number) => {
  if (novaPagina < 1 || (novaPagina > pagina.value && !temMaisPaginas.value)) return;
  pagina.value = novaPagina;
  produtosSelecionados.value = [];
  buscarProdutos();
};

const buscarProdutos = async () => {
  if (carregando.value) return;

  carregando.value = true;
  erro.value = false;
  dropdownAberto.value = null;

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

onMounted(() => {
  buscarProdutos();
  window.addEventListener('click', fecharDropdownExterno);
});

onUnmounted(() => {
  window.removeEventListener('click', fecharDropdownExterno);
});

const irParaInclusao = () => {
  router.push('/produtos/novo');
};
</script>

<style scoped>
.table-fixed {
  table-layout: fixed;
  width: 100%;
}

.table td,
.table th {
  vertical-align: middle !important;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-container-fixed {
  min-height: 550px;
}

.dropdown-item {
  cursor: pointer;
}

.button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>