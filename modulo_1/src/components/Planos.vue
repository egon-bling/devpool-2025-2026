<template>
    <section class="section is-flex is-flex-direction-column is-justify-content-center" id="planos">
        <h2 class="title is-12 has-text-centered">Nossos Planos</h2>
        <div class="container">
            <div class="field has-addons is-justify-content-center">
                <p class="control">
                    <button class="button is-rounded px-5" :class="{ 'is-dark': !isAnual }"
                        @click="isAnual = false">Mensal</button>
                </p>
                <p class="control">
                    <button class="button is-rounded px-5" :class="{ 'is-dark': isAnual }"
                        @click="isAnual = true">Anual</button>
                </p>
            </div>
        </div>

        <div class="container">
            <div class="columns is-centered is-variable is-4">
                <div v-for="plano in planosMock" :key="plano.titulo" class="column is-4">
                    <div class="card has-text-centered" :class="plano.destaque ? 'card-destaque' : 'plan-card'">
                        <div class="card-content">
                            <span v-if="plano.destaque" class="tag is-success is-medium mb-3">RECOMENDADO</span>
                            <p class="title is-4" :class="{ 'has-text-white': plano.destaque }">{{ plano.titulo }}</p>
                            <p class="subtitle is-3" :class="{ 'has-text-white': plano.destaque }">
                                R$ {{ isAnual ? plano.precoAnual : plano.precoMensal }}
                                <span class="is-size-7">/{{ isAnual ? 'ano' : 'mês' }}</span>
                            </p>
                            <ul class="mb-5 has-text-left mt-4" :class="{ 'has-text-white': plano.destaque }">
                                <li v-for="item in plano.funcionalidades" :key="item" class="mb-2">
                                    <span class="icon is-small mr-2">
                                        <i class="fas fa-check"></i>
                                    </span>
                                    {{ item }}
                                </li>
                            </ul>
                            <a class="button is-fullwidth" href="#contato"
                                :class="plano.destaque ? 'is-white is-outlined' : 'is-dark'">
                                Assinar Agora
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isAnual = ref(false);

const planosMock = [
    {
        titulo: "Plano A",
        precoMensal: 49,
        precoAnual: 468,
        funcionalidades: ["Acesso básico", "1 Usuário", "Suporte via e-mail"],
        destaque: false
    },
    {
        titulo: "Plano B",
        precoMensal: 99,
        precoAnual: 948,
        funcionalidades: ["Acesso completo", "5 Usuários", "Suporte 24h", "Relatórios avançados"],
        destaque: true
    },
    {
        titulo: "Plano C",
        precoMensal: 199,
        precoAnual: 1908,
        funcionalidades: ["Multi-empresas", "Usuários ilimitados", "Consultoria dedicada"],
        destaque: false
    }
];
</script>

<style scoped>
.plan-card {
    height: 100%;
    border-radius: 15px;
    border: 1px solid #f0f0f0;
    transition: transform 0.3s ease;
}

.plan-card:hover {
    transform: translateY(-5px);
}

.card-destaque {
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    border-radius: 15px;
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(46, 204, 113, 0.3);
    z-index: 1;
    height: 100%;
    transition: transform 0.3s ease;
}

.card-destaque:hover {
    transform: scale(1.08);
}

.card-destaque .title,
.card-destaque .subtitle {
    color: white !important;
}

i {
    display: block;
    margin: 1.5rem auto;
}

.title {
    font-family: 'Gilroy', sans-serif;
    color: #1a1a1a;
}


@media screen and (max-width: 768px) {
    .card-destaque {
        transform: scale(1);
        margin: 2rem 0;
    }
    
}
</style>