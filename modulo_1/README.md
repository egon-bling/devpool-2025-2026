<<<<<<< HEAD
# devpool-2025-2026

Este repositório contempla o template base a ser utilizado no decorrer do projeto do devpool. Cada etapa está dividida em pastas por módulo. Para visualizar mais instruções de configuração e execução dos projetos, acesse os diretórios correspondentes e leia os respectivos READMEs.
=======
# Módulo 1 - JS, Vue JS e Git/GitHub

## Template de projeto Vue 3 + Pinia

Este diretório possui uma estrutura base de projeto Vue que deve ser utilizada para o desenvolvimento da avaliação do módulo 1 do devpool.

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── AddToCartButton.vue
│   ├── ProductImage.vue
│   ├── ProductOptions.vue
│   └── ProductPage.vue  # Componente Pai
├── stores/
│   └── productStore.ts        # Store Pinia (Mediator)
├── App.vue # Página principal da aplicação
└── main.ts
```

## 🛠️ Pré-requisitos

- NodeJS v24 ou superior com NPM. [Instalação](https://nodejs.org/en/download).

## 🚀 Como Executar

>**OBS: Para executar os comandos deste projeto, garanta que o terminal ou prompt de comando está na pasta modulo_1 e não na raiz do repositório**

1. Instalar dependências:
```bash
npm install
```

2. Executar em modo desenvolvimento:
```bash
npm run dev
```

3. Compilar para produção:
```bash
npm run build
```

## 🛠️ Tecnologias

- Vue 3
- TypeScript
- Pinia (State Management)
- Vite

## 📖 Aprendizado

Este projeto é ideal para entender:
- Padrões de design em aplicações Vue
- Gerenciamento de estado com Pinia
- Comunicação entre componentes
- Melhores práticas de arquitetura frontend
>>>>>>> 5bf472a (Criando esboço da landing page)
