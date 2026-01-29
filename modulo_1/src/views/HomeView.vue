<!-- Landing page -->

<template>
  <div class="landing">
    <!-- Top Bar -->
    <header class="container topbar" id="inicio"> <!-- classes "container + topbar" -->
      <div class="logo-area">
        <img src="../assets/logo-icon.png" alt="Blegon" />
        <span class="brand">Blegon ERP</span>
      </div>

      <nav class="nav">
        <a href="#inicio">Início</a>
        <a href="#funcionalidades">Funcionalidades</a>
        <a href="#planos">Planos</a>
        <a href="#contato">Contato</a>
      </nav>

      <!-- Botão que simula o login e chama a função authenticate na store -->
      <button class="login" @click="goToProducts">Fazer Login</button>

    </header>

    <!-- Seção Hero (Banner) -->
    <section class="container hero">
      <div class="hero-image">
        <div class="hero-text">
          <h1>Gestão completa para sua empresa</h1>
          <p>Controle produtos, vendas e operações<br>em um único lugar.</p>
          <button class="cta">Experimente grátis</button>
        </div>
      </div>
    </section>

    <!-- Seção de planos do sistema -->
    <section class="container plans" id="planos">
      <h2>Escolha o melhor plano para você!</h2>
      <div class="plan-cards">
        <div class="card">
          <h3>Plano A</h3>
          <p class="price">R$ 10</p>
        </div>
        <div class="card highlight">
          <h3>Plano Pro</h3>
          <p class="price">R$ 40</p>
        </div>
        <div class="card">
          <h3>Plano C</h3>
          <p class="price">R$ 70</p>
        </div>
      </div>
    </section>

    <!-- Seção de contato -->
    <section class="contact" id="contato">
      <h2 class="container">Entre em contato com nossa equipe!</h2>

      <form class="contact-form" @submit.prevent="sendMessage">
        <input v-model="form.nome" placeholder="Nome" />
        <input v-model="form.email" placeholder="E-mail" />
        <input v-model="form.telefone" placeholder="Telefone" />
        <input v-model="form.empresa" placeholder="Empresa" />
        <select v-model="form.tamanho" placeholder="Tamanho da empresa">
          <option disabled value="">Tamanho da empresa</option>
          <option>Microempresa</option>
          <option>Pequena Empresa</option>
          <option>Média Empresa</option>
          <option>Grande Empresa</option>
        </select>
        <textarea v-model="form.mensagem" placeholder="Escreva sua mensagem" style="height: 200px;"></textarea>
        <button class="enviar" type="submit">Enviar mensagem</button>
      </form>
    </section>




    <!-- Rodapé -->
    <footer class="container footer">
      <p>© 2026 Blegon ERP · Todos os direitos reservados</p>
      <div class="footer-links">
        <a href="#">Termos</a>
        <a href="#">Privacidade</a>
        <a href="#">Suporte</a>
      </div>
    </footer>
  <div class="home">
    <h1>Bem-vindo ao Blegon ERP</h1>
    <button @click="goToProducts">Acessar Produtos</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToProducts() {
  //AUTH_01B - Usuário clica no botão "Login", app redireciona para bling.com.br → login → autorização.
  //Bling redireciona para http://localhost:5173/oauth/callback?code=XXX&state=YYY
  //CallBack.vue lê 'route.query.code', simula o processamento (1,5 segundos) e redireciona para ProductsView.vue
  const clientId = '714697d80ddd76e4d06432daeeff7333ed464de4'

  //DEVE ser exatamente igual ao redirect_uri cadastrado no Bling
  const redirectUri = encodeURIComponent(
    'http://localhost:5173/oauth/callback'
  )

  //Gera um state aleatório. Em projeto real, deve ser feito no back-end
  const state = Math.random().toString(36).substring(2,12)

  // AUTH_02B
  // Salva o state para validação no callback
  sessionStorage.setItem('oauth_state', state)

  //Monta a URL de autorização do Bling
  const authUrl =
    'https://www.bling.com.br/Api/v3/oauth/authorize' +
    '?response_type=code' +
    `&client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&state=${state}`

  //OAuth usa redirecionamento externo
  window.location.href = authUrl
}

const form = reactive({
  nome: '',
  email: '',
  telefone: '',
  empresa: '',
  tamanho: '',
  mensagem: '',
})

function sendMessage() {
  alert('Mensagem enviada com sucesso!\n\Aguarde nosso contato pelo e-mail informado.')
  Object.keys(form).forEach(key => (form[key as keyof typeof form] = ''))
  router.push('/produtos')
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  background-color: #f5f5f5;
}

.landing {
  background-color: #8ebea1;
}

.topbar {
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px 5px 12px;
  background: #111;
  color: #fff;
}

.topbar a:hover {
  background-color: #69b687;
  color: #fff;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-area img {
  width: 40px;
  height: 40px;
}

.brand {
  font-size: 24px;
  font-weight: bold;
}

.nav a {
  margin: 0 10px;
  color: #fff;
  text-decoration: none;
  font-size: larger;
}

.login {
  padding: 10px 10px 10px 10px;
}

.hero {
  display: flex;
  background: #f5f5f5;
  background-color: #f5f5f5;
}

.hero-text {
  max-width: 600px;
  text-align: left;
  color: white;
}

.hero-text h1 {
  text-align: left;
  font-size: 48px;
  margin-bottom: 20px;
  color: #fff;
}

.hero-image {
  background-image: url('../assets/hero-image.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  position: relative;
}


.plans {
  padding: 40px;
  text-align: center;
  background-color: #f5f5f5;
}

.plan-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.card {
  border: 1px solid #ccc;
  padding: 20px;
  width: 200px;
}

.highlight {
  border: 2px solid #000;
}

.price {
  font-size: 24px;
  font-weight: bold;
}

.contact-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #f5f5f5;
}

.contact-form input,
.contact-form textarea,
.contact-form select {
  width: 100%;
  padding: 12px;
  font-size: medium;
  border: 1px solid #000;
  border-radius: 0px;
}
.contact h2 {
  padding-left: 100px;
  padding-bottom: 10px;
}

.enviar {
  width: 300px;
}

.footer {
  background: #111;
  color: #fff;
  padding: 20px;
  padding-left: 250px;
}

.footer-links a {
  color: #fff;
  margin: 0 8px;
button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
