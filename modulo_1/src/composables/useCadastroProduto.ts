import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';

interface RespostaAcao {
  sucesso: boolean;
  erro?: string;
}

export function useCadastroProduto(mostrarToast: (msg: string, tipo?: 'sucesso' | 'erro') => void) {
  const router = useRouter();
  const productStore = useProductStore();

  const salvando = ref(false);
  const erros = ref<Record<string, string>>({});
  const mensagemErro = ref('');

  const produto = ref({
    nome: '',
    tipo: 'P',
    situacao: 'A',
    formato: 'S',
    codigo: '',
    preco: 0,
    unidade: 'UN',
    descricaoCurta: ''
  });

  const validarFormulario = () => {
    erros.value = {};
    if (!produto.value.nome) erros.value.nome = "Nome é obrigatório";
    if (!produto.value.codigo) erros.value.codigo = "SKU é obrigatório";
    
    if (Object.keys(erros.value).length > 0) {
      mostrarToast("Preencha os campos obrigatórios", "erro");
      return false;
    }

    if (Number(produto.value.preco) <= 0) { 
      mostrarToast("O preço deve ser maior que zero", "erro");
      erros.value.preco = "Preço inválido";
      return false;
    }
    return true;
  };

  const cadastrar = async () => {
    if (!validarFormulario()) return;

    salvando.value = true;
    mensagemErro.value = '';

    try {
      const resultado = await productStore.cadastrarProduto(produto.value) as RespostaAcao;
      
      if (resultado.sucesso) {
        mostrarToast("Produto cadastrado com sucesso!");
        setTimeout(() => router.push('/produtos'), 1500);
      } else {
        mensagemErro.value = resultado.erro || 'Erro desconhecido ao cadastrar';
        mostrarToast(mensagemErro.value, "erro");
      }
    } catch (error: any) {
      mostrarToast("Erro ao conectar com o servidor", "erro");
    } finally {
      salvando.value = false;
    }
  };

  return { produto, salvando, erros, mensagemErro, cadastrar };
}