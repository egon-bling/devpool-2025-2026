import { ref } from 'vue';
import { useProductStore } from '../stores/productStore';

export function useAcoesProdutos(produtos: any, carregarProdutos: Function, mostrarToast: Function) {
  const productStore = useProductStore();
  const itensSelecionados = ref<number[]>([]);
  const idParaExcluirIndividual = ref<number | null>(null);
  const modalAberto = ref(false);
  const processandoMassa = ref(false);

  const abrirModalExclusao = (id: number) => {
    idParaExcluirIndividual.value = id;
    itensSelecionados.value = []; 
    modalAberto.value = true;
  };

  const abrirModalMassa = () => {
    idParaExcluirIndividual.value = null;
    modalAberto.value = true;
  };

  const executarExclusao = async () => {
    modalAberto.value = false;
    processandoMassa.value = true;

    try {
      if (itensSelecionados.value.length > 0) {
        let sucessos = 0;
        for (const id of itensSelecionados.value) {
          const res = await productStore.excluirProduto(String(id));
          if (res.sucesso) sucessos++;
        }
        mostrarToast(`${sucessos} produtos movidos para excluídos.`);
        itensSelecionados.value = [];
      } 
      
      else if (idParaExcluirIndividual.value !== null) { 
        const res = await productStore.excluirProduto(String(idParaExcluirIndividual.value));      
        if (res.sucesso) {
          mostrarToast("Produto excluído com sucesso!");
        } else {
          mostrarToast(String(res.erro || "Erro ao excluir"), "erro");
        }
      }
    } catch (error) {
      mostrarToast("Erro crítico na operação de exclusão", "erro");
    } finally {
      await carregarProdutos();
      processandoMassa.value = false;
      idParaExcluirIndividual.value = null;
    }
  };

  return {
    itensSelecionados,
    modalAberto,
    processandoMassa,
    abrirModalExclusao,
    abrirModalMassa,
    executarExclusao
  };
}