export const formatProduto = (produto: any) => {
  return {
    nome: produto.nome,
    tipo: produto.tipo || 'P',
    situacao: produto.situacao || 'A',
    formato: produto.formato || 'S', 
    codigo: produto.codigo,
    preco: Number(produto.preco),
    unidade: produto.unidade || 'UN',
    descricaoCurta: produto.descricaoCurta || '' 
  };
};


export const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};