import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiClient } from '../services/api';

export const useProductStore = defineStore('product', () => {
    const carregando = ref(false);
    const produtos = ref([]);

    async function buscarProdutoPorId(id: string) {
        const token = localStorage.getItem('bling_access_token') || '';
        const res = await apiClient.request(`/produtos/${id}`, 'GET', token);
        return res.data;
    }

   async function salvarEdicao(id: string, payload: any) {
  carregando.value = true;
  try {
    const { id: _, ...dadosParaEnviar } = payload; 
        const token = localStorage.getItem('bling_access_token') || '';
        await apiClient.request(`/produtos/${id}`, 'PUT', token, dadosParaEnviar);
    
    return { sucesso: true };
  } catch (error: any) {
    console.error("Erro ao salvar:", error);
    return { sucesso: false, erro: error.message };
  } finally {
    carregando.value = false;
  }
}
    return {
        carregando,
        produtos,
        buscarProdutoPorId,
        salvarEdicao
    };
});