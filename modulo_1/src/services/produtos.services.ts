
const BASE_URL = "/api-bling/Api/v3";

export const produtoService = {
  // R2 e R5 - Listagem com paginação
  async listar(token: string, pagina: number = 1, limite: number = 10, filtros: any = {}) {
    let url = `${BASE_URL}/produtos?pagina=${pagina}&limite=${limite}`;
    if (filtros.situacao) {
    const mapaSituacao: Record<string, number> = { 'A': 1, 'E': 3 }
    url += `&criterio=${mapaSituacao[filtros.situacao]}`;
;}

    if (filtros.nome) {
      url += `&nome=${encodeURIComponent(filtros.nome)}`;
    }

   const response = await fetch(url, { 
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  },

  // R7 - Exclusão
  async excluir(token: string, id: number | string) {
    const response = await fetch(`${BASE_URL}/produtos/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.ok;
  }
};