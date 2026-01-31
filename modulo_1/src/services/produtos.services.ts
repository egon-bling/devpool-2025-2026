import { apiClient } from './api';

export const produtoService = {

  async obterPorId(id: string | number) {
    const response = await apiClient.get(`/produtos/${id}`);
    return response.data;
  },

  async cadastrar(dados: any) {
    const response = await apiClient.post('/produtos', dados);
    return response.data;
  },

  async atualizar(id: string | number, dados: any) {
    const response = await apiClient.put(`/produtos/${id}`, dados);
    return response.data;
  },


  async listar(pagina: number = 1, limite: number = 10, filtros: any = {}) {
    const montarParamsBase = (filtrosAdicionais = {}) => {
      const params: any = { pagina, limite, ...filtrosAdicionais };
      if (filtros.dataInclusaoInicial) params.dataInclusaoInicial = filtros.dataInclusaoInicial;
      if (filtros.dataInclusaoFinal)   params.dataInclusaoFinal = filtros.dataInclusaoFinal;
      if (filtros.dataAlteracaoInicial) params.dataAlteracaoInicial = filtros.dataAlteracaoInicial;
      if (filtros.dataAlteracaoFinal)   params.dataAlteracaoFinal = filtros.dataAlteracaoFinal;
      return params;
    };

    if (!filtros.nome || filtros.nome.trim() === '') {
      try {
        const response = await apiClient.get('/produtos', {
          params: montarParamsBase({ criterio: filtros.situacao || 1 })
        });
        return response.data;
      } catch (error) {
        console.error("Erro ao listar produtos:", error);
        return { data: [] };
      }
    }

    const termo = filtros.nome.trim();
    try {
      const requestNome = apiClient.get('/produtos', {
        params: montarParamsBase({ nome: termo, criterio: '5' })
      });
      const requestSku = apiClient.get('/produtos', {
        params: montarParamsBase({ 'codigos[]': termo, criterio: '5' })
      });

      const [resNome, resSku] = await Promise.all([requestNome, requestSku]);
      const produtosNome = resNome.data?.data || [];
      const produtosSku = resSku.data?.data || [];
      const todosProdutos = [...produtosNome, ...produtosSku];

      const listaFinal = todosProdutos.filter((produto: any, index: number, self: any[]) =>
        index === self.findIndex((p) => p.id === produto.id)
      );

      return { data: listaFinal };
    } catch (error) {
      console.error("Erro na busca com filtros:", error);
      return { data: [] };
    }
  },

  async excluir(id: string | number, excluirProduto: 'A' | 'I' | 'E') {
    try {
      const response = await apiClient.patch(`/produtos/${id}/situacoes`, {
        situacao: excluirProduto
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao mudar situação do produto:", error);
      throw error;
    }
  }
};