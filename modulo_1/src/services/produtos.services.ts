import { apiClient } from './api';

export const produtoService = {
  async listar(token: string, pagina: number = 1, limite: number = 10, filtros: any = {}) {
    
    const prepararParams = (baseParams: URLSearchParams) => {
      if (filtros.dataInclusaoInicial) baseParams.append('dataInclusaoInicial', filtros.dataInclusaoInicial);
      if (filtros.dataInclusaoFinal)   baseParams.append('dataInclusaoFinal', filtros.dataInclusaoFinal);
      if (filtros.dataAlteracaoInicial) baseParams.append('dataAlteracaoInicial', filtros.dataAlteracaoInicial);
      if (filtros.dataAlteracaoFinal)   baseParams.append('dataAlteracaoFinal', filtros.dataAlteracaoFinal);
      return baseParams;
    };

    if (!filtros.nome || filtros.nome.trim() === '') {
      const params = new URLSearchParams({
        pagina: pagina.toString(),
        limite: limite.toString(),
        criterio: (filtros.situacao || 1).toString()
      });
      
      prepararParams(params);
      return await apiClient.request(`/produtos?${params.toString()}`, 'GET', token);
    }

    const termo = filtros.nome.trim();

    try {
      const paramsNome = new URLSearchParams({
        pagina: pagina.toString(),
        limite: limite.toString(),
        nome: termo,
        criterio: '5'
      });
      prepararParams(paramsNome);

      // Preparamos os parâmetros da busca por SKU
      const paramsSku = new URLSearchParams({
        pagina: pagina.toString(),
        limite: limite.toString(),
        'codigos[]': termo, // O URLSearchParams cuida dos colchetes
        criterio: '5'
      });
      prepararParams(paramsSku);

      const [resNome, resSku] = await Promise.all([
        apiClient.request(`/produtos?${paramsNome.toString()}`, 'GET', token),
        apiClient.request(`/produtos?${paramsSku.toString()}`, 'GET', token)
      ]);

      const produtosNome = resNome.data || [];
      const produtosSku = resSku.data || [];
      const todosProdutos = [...produtosNome, ...produtosSku];

      const listaFinal = todosProdutos.filter((produto: any, index: number, self: any[]) =>
        index === self.findIndex((p) => p.id === produto.id)
      );

      return { data: listaFinal };

    } catch (error) {
      console.error("Erro na busca com filtros:", error);
      return { data: [] };
    }
  }
};