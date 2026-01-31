export interface Planos {
    id: number; 
    titulo: string;
    preco: string;
    periodicidade: string;
    funcionalidades: string[];
    destaque: boolean;
}

export const lista_planos: Planos[] = [
  {
    id: 1,
    titulo: 'Plano Iniciante',
    preco: '49',
    periodicidade: 'Mensal',
    funcionalidades: [
    'Cadastro de Produtos',
    'Controle Total de Estoque',
    'Até 1 Usuário'],
    destaque: false
  },
  {
    id: 2,
    titulo: ' Plano Avançado',
    preco: '99',
    periodicidade: 'Mensal',
    funcionalidades: [
    'Funcionalidades do Iniciante',
    '5 Usuários',
    'Emissão de NF-e',
    'Até 5 Usuários'],
    destaque: true
  },
  {
    id: 3,
    titulo: 'Plano Premium',
    preco: '249',
    periodicidade: 'Mensal',
    funcionalidades: [
    'Funcionalidades do Avançado',
    '15 Usuários', 
    'Suporte via Whatsapp'],
    destaque: false
  }
];