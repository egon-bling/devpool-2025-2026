<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title">Gestão de Produtos</h1>
        </div>
        <div class="level-right">
          <button class="button is-primary" @click="buscarProdutos">
            <span class="icon"><i class="fas fa-sync"></i></span>
            <span>Atualizar</span>
          </button>
        </div>
      </div>

      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input v-model="filtroNome" class="input" type="text" placeholder="Filtrar por nome...">
        </p>
        <p class="control">
          <input v-model="filtroSKU" class="input" type="text" placeholder="Filtrar por SKU...">
        </p>
      </div>

      <div v-if="carregando" class="has-text-centered my-6">
        <button class="button is-loading is-large is-ghost">Carregando</button>
      </div>

      <div v-else-if="erro" class="notification is-danger">
        <button class="delete" @click="erro = false"></button>
        {{ mensagemErro }}
      </div>

      <div v-else class="box">
        <table class="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>Código (SKU)</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtosFiltrados" :key="produto.id">
              <td>{{ produto.codigo }}</td>
              <td>{{ produto.nome }}</td>
              <td>R$ {{ produto.preco ? Number(produto.preco).toLocaleString('pt-BR', {
                style: 'currency', currency:
                  'BRL'
}) : '0,00' }}</td>
              <td>
                <span :class="['tag', produto.situacao === 'A' ? 'is-success' : 'is-danger']">
                  {{ produto.situacao === 'A' ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
            </tr>
            <tr v-if="produtosFiltrados.length === 0">
              <td colspan="4" class="has-text-centered">Nenhum produto encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const produtos = ref<any[]>([]);
const carregando = ref(false);
const erro = ref(false);
const mensagemErro = ref('');

// Filtros Locais
const filtroNome = ref('');
const filtroSKU = ref('');

const buscarProdutos = async () => {
  carregando.value = true;
  erro.value = false;

  const token = localStorage.getItem('bling_access_token');

  if (!token) {
    router.push('/');
    return;
  }

  try {
    const resposta = await fetch('/Api/v3/produtos?pagina=1&limite=10', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (resposta.status === 401) {
      throw new Error('Token expirado ou inválido. Faça login novamente.');
    }

    const dados = await resposta.json();

    if (resposta.ok) {
      produtos.value = dados.data || [];
    } else {
      throw new Error(dados.error?.description || 'Erro ao buscar produtos.');
    }

  } catch (err: any) {
    erro.value = true;
    mensagemErro.value = err.message;

    produtos.value = [
      { id: 101, codigo: 'DEV-001', nome: 'Camiseta DevPool V3', preco: 79.90, situacao: 'A' },
      { id: 102, codigo: 'VUE-321', nome: 'Caneca Vue.js Framework', preco: 35.00, situacao: 'A' },
      { id: 103, codigo: 'ERR-404', nome: 'Mousepad Bug Hunter', preco: 50.00, situacao: 'I' }
    ];
    if (err.message.includes('Token')) {
      localStorage.removeItem('bling_access_token');
      setTimeout(() => router.push('/'), 3000);
    }
  } finally {
    carregando.value = false;
  }
};

const produtosFiltrados = computed(() => {
  return produtos.value.filter(p => {
    const matchNome = filtroNome.value ? p.nome.toLowerCase().includes(filtroNome.value.toLowerCase()) : true;
    const matchSKU = filtroSKU.value ? String(p.codigo).toLowerCase().includes(filtroSKU.value.toLowerCase()) : true;
    return matchNome && matchSKU;
  });
});

onMounted(buscarProdutos);
</script>