import { defineStore } from 'pinia';
import { ref } from 'vue';
import { requestHandler } from '../services/api';
import { produtoService } from '../services/produtos.services';

export const useProductStore = defineStore('product', () => {
  const carregando = ref(false);
  const produtos = ref([]);

  async function buscarProdutoPorId(id: string) {
    const res = await requestHandler.request(`/produtos/${id}`, 'GET');
    return res.data;
  }

  async function salvarEdicao(id: string, payload: any) {
    carregando.value = true;
    try {
      const { id: _, ...dadosParaEnviar } = payload;
      await requestHandler.request(`/produtos/${id}`, 'PUT', undefined, dadosParaEnviar);
      return { sucesso: true };
    } catch (error: any) {
      return { sucesso: false, erro: error.message };
    } finally {
      carregando.value = false;
    }
  }

  async function cadastrarProduto(payload: any) {
    carregando.value = true;
    try {
      await requestHandler.request('/produtos', 'POST', undefined, payload);
      return { sucesso: true };
    } catch (error: any) {
      return { sucesso: false, erro: error.message };
    } finally {
      carregando.value = false;
    }
  }

  async function excluirProduto(id: string) {
  carregando.value = true;
  try {
    await produtoService.excluir(id, "E");
    return { sucesso: true };
  } catch (error: any) {
    const mensagem = error.response?.data?.error?.message || "Erro ao excluir produto.";
    return { sucesso: false, erro: mensagem };
  } finally {
    carregando.value = false;
  }
}

  return {
    carregando,
    produtos,
    buscarProdutoPorId,
    salvarEdicao,
    cadastrarProduto,
    excluirProduto
  };
});