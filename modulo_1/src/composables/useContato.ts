import { ref, reactive } from "vue";

interface ContatoForm {
  nome: string;
  email: string;
  phone: string;
  nomeempresa: string;
  tamanhoempresa: string;
  mensagem: string;
}

export function useContato() {
  const form = reactive<ContatoForm>({
    nome: "",
    email: "",
    phone: "",
    nomeempresa: "",
    tamanhoempresa: "",
    mensagem: "",
  });

  const carregando = ref(false);
  const enviado = ref(false);
  
  const erros = reactive({
    nome: false,
    email: false,
    phone: false,
    nomeempresa: false,
    tamanhoempresa: false,
  });

  const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const enviarFormulario = async () => {
    Object.keys(erros).forEach(key => (erros[key as keyof typeof erros] = false));

    erros.nome = !form.nome.trim();
    erros.email = !validarEmail(form.email);
    erros.phone = form.phone.replace(/\D/g, "").length < 10; 
    erros.nomeempresa = !form.nomeempresa.trim();
    erros.tamanhoempresa = !form.tamanhoempresa;

    const temErro = Object.values(erros).some(v => v === true);
    if (temErro) return;

    carregando.value = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      enviado.value = true;
      resetForm();
      
      setTimeout(() => (enviado.value = false), 5000);
    } catch (error) {
      console.error("Erro ao enviar:", error);
    } finally {
      carregando.value = false;
    }
  };

  const resetForm = () => {
    form.nome = "";
    form.email = "";
    form.phone = "";
    form.nomeempresa = "";
    form.mensagem = "";
    form.tamanhoempresa = "";
  };

  return {
    form,
    carregando,
    enviado,
    erros,
    enviarFormulario
  };
}