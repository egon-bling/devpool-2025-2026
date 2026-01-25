<template>
    <section class="section has-background-light" id="contato">
        <div class="container">
            <div class="box">
                <h2 class="title is-4">Contato</h2>
                <form @submit.prevent="submeterFormulario">
                    <div class="columns is-multiline">
                        <div class="column is-4">
                            <div class="field">
                                <label class="label">Nome*</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="form.nome" class="input" :class="{
                                        'is-danger': foiTocado && !form.nome,
                                        'is-success': form.nome.length >= 3
                                    }" type="text" placeholder="Seu nome">
                                    <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                                    <span v-if="form.nome.length >= 3" class="icon is-small is-right has-text-success">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="column is-4">
                            <div class="field">
                                <label class="label">E-mail*</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="form.email" class="input" :class="{
                                        'is-danger': (foiTocado && !form.email) || (form.email.length > 0 && !emailValido),
                                        'is-success': emailValido
                                    }" type="email" placeholder="email@exemplo.com">
                                    <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>

                                    <span v-if="emailValido" class="icon is-small is-right has-text-success">
                                        <i class="fas fa-check"></i>
                                    </span>
                                    <span v-else-if="form.email.length > 0 && !emailValido"
                                        class="icon is-small is-right has-text-danger">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </span>
                                </div>
                                <p v-if="form.email.length > 0 && !emailValido" class="help is-danger">Formato de e-mail
                                    inválido.</p>
                            </div>
                        </div>

                        <div class="column is-4">
                            <div class="field">
                                <label class="label">Telefone</label>
                                <div class="control has-icons-left">
                                    <input v-model="form.telefone" class="input" type="tel"
                                        placeholder="(00) 00000-0000">
                                    <span class="icon is-small is-left"><i class="fas fa-phone"></i></span>
                                </div>
                            </div>
                        </div>

                        <div class="column is-8">
                            <div class="field">
                                <label class="label">Empresa*</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="form.empresa" class="input" :class="{
                                        'is-danger': foiTocado && !form.empresa,
                                        'is-success': form.empresa.length > 1
                                    }" type="text" placeholder="Nome da empresa">
                                    <span class="icon is-small is-left"><i class="fas fa-briefcase"></i></span>
                                    <span v-if="form.empresa.length > 1"
                                        class="icon is-small is-right has-text-success">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="column is-4">
                            <div class="field">
                                <label class="label">Tamanho da empresa</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select v-model="form.tamanho">
                                            <option value="" disabled>Selecione a quantidade...</option>
                                            <option value="1-10">1-10 funcionários</option>
                                            <option value="11-50">11-50 funcionários</option>
                                            <option value="50+">Mais de 50</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="column is-12">
                            <div class="field">
                                <label class="label">Mensagem*</label>
                                <div class="control">
                                    <textarea v-model="form.mensagem" class="textarea" :class="{
                                        'is-danger': foiTocado && !form.mensagem,
                                        'is-success': form.mensagem.length > 10
                                    }" placeholder="Como podemos ajudar?"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="!formularioValido" class="has-text-right mb-3">
                        <p class="is-size-7 has-text-grey">
                            Aguardando campos:
                            <span :class="{ 'has-text-danger': !form.nome }">Nome</span> |
                            <span :class="{ 'has-text-danger': !emailValido }">E-mail</span> |
                            <span :class="{ 'has-text-danger': !form.empresa }">Empresa</span> |
                            <span :class="{ 'has-text-danger': !form.mensagem }">Mensagem</span>.
                        </p>
                    </div>

                    <div class="has-text-right">
                        <button type="submit" class="button is-dark" :class="{ 'is-loading': enviando }"
                            :disabled="!formularioValido || enviando" @mouseenter="foiTocado = true">
                            <span>ENVIAR MENSAGEM</span>
                            <span class="icon"><i class="fas fa-paper-plane"></i></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <AlertaSucesso :exibir="exibirAlerta" @fechar="exibirAlerta = false" />
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AlertaSucesso from './AlertaSucesso.vue';

const form = ref({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    tamanho: '',
    mensagem: ''
});

const enviando = ref(false);
const foiTocado = ref(false);

const emailValido = computed(() => {
    const filtro = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return filtro.test(form.value.email);
});

const formularioValido = computed(() => {
    return (
        form.value.nome.trim().length >= 3 &&
        emailValido.value &&
        form.value.empresa.trim().length > 0 &&
        form.value.mensagem.trim().length >= 10
    );
});
const exibirAlerta = ref(false);

const submeterFormulario = async () => {
    foiTocado.value = true;
    if (!formularioValido.value) return;

    enviando.value = true;

    await new Promise(resolve => setTimeout(resolve, 2000));

    enviando.value = false;
    exibirAlerta.value = true;


    form.value = { nome: '', email: '', telefone: '', empresa: '', tamanho: '', mensagem: '' };
    foiTocado.value = false;
};
</script>

<style scoped>
.field .control .select,
.field .control .select select {
    height: 40px !important;
    display: block;
}

.select:not(.is-multiple):not(.is-loading)::after {
    margin-top: -5px;
}

.input,
.textarea,
.select select {
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.modal-content {
    max-width: 400px;
}
</style>