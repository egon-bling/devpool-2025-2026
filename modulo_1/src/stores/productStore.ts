/* ProductOptions.vue altera selectedColor
ProductImage.vue consome currentImage
AddToCartButton.vue consome isButtonDisabled
Todos se comunicam indiretamente, por meio da store. */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios' // Importa axios para chamadas HTTP

interface ProductData {
  image: string;
  inStock: boolean;
}

interface ProductsData {
  [key: string]: ProductData;
}

export const useProductStore = defineStore('product', () => {
  // Estado: No contexto do template, esse estado simula uma decisão do usuário que afeta diferentes partes da interface.
  const selectedColor = ref<string>('azul')

  // Dados dos produtos. Esse objeto funciona como mock de dados, substituto temporário de uma API, base para demonstrar reatividade e computações derivadas
  const productData: ProductsData = {
    azul: {
      image: 'https://www.comerciomix.com.br/media/catalog/product/cache/39699d3c43c18428eb057c8e614b0843/c/a/camiseta-azul-royal-para-sublima_o-tradicional_1.jpg',
      inStock: true,
    },
    preto: {
      image: 'https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/estampar/catalog/camisetas/preto-verso.jpg',
      inStock: false,
    },
  }

  // Getters (computed): derivam informações a partir do estado; garantem que a UI reaja automaticamente às mudanças; encapsulam regras simples de negócio
  //Eles evitam que essa lógica fique espalhada pelos componentes
  const currentImage = computed(() => productData[selectedColor.value].image)
  const isButtonDisabled = computed(() => !productData[selectedColor.value].inStock)

  // Actions: a única forma permitida de alterar o estado; pontos claros de entrada para efeitos colaterais futuros. 
  // Em uma adaptação para API, este método poderia: disparar uma chamada HTTP; validar dados; sincronizar estado com backend
  function setSelectedColor(color: string) {
    selectedColor.value = color
  }

  //Autenticação simulada. Método que simula o login usando token fixo.
  const token = ref<string>('0a07ad723f12b0945c513951d19121cd0ada7b05') //Token fixo para simulação
  const authenticated = ref(false)

  async function authenticate() {
    try {
      //teste simples de autenticação via token fixo
      await axios.get(`https://bling.com.br/Api/v2/produtos/json?apikey=${token.value}`)
      authenticated.value = true
      return true
    } catch (error) {
      authenticated.value = false
      console.error('Erro de autenticação:', error)
      throw error
    }
  }

  return {
    selectedColor,
    currentImage,
    isButtonDisabled,
    setSelectedColor,
    //Autenticação:
    token,
    authenticated,
    authenticate
  }
})

