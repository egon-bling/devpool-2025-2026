export const formatProduto = (produto: any) => {
  return {
    nome: produto.nome,
    codigo: produto.codigo,
    preco: Number(produto.preco),
    situacao: produto.situacao || 'A',
    unidade: produto.unidade || 'UN',
    tipo: 'P', 
    formato: 'S' 
  };
};


export const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};