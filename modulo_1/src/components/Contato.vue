<template>
<section class="section has-background-light">
        <div class="container">
            <div class="box">
                <h2 class="title is-4">Sessão de Contato</h2>
                <div class="columns is-multiline">
                    <div class="column is-4">
                        <div class="field">
                            <label class="label">Nome*</label>
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Seu nome">
                                <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="field">
                            <label class="label">E-mail*</label>
                            <div class="control has-icons-left">
                                <input class="input" type="email" placeholder="email@exemplo.com">
                                <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="field">
                            <label class="label">Telefone</label>
                            <div class="control has-icons-left">
                                <input class="input" type="tel" placeholder="(00) 00000-0000">
                                <span class="icon is-small is-left"><i class="fas fa-phone"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="column is-8">
                        <div class="field">
                            <label class="label">Empresa*</label>
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Nome da empresa">
                                <span class="icon is-small is-left"><i class="fas fa-briefcase"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="field">
                            <label class="label">Tamanho da empresa</label>
                            <div class="control">
                                <div class="select is-fullwidth">
                                    <select>
                                        <option disabled selected>Selecione a quantidade...</option>
                                        <option>1-10 funcionários</option>
                                        <option>11-50 funcionários</option>
                                        <option>Mais de 50</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-12">
                        <div class="field">
                            <label class="label">Mensagem*</label>
                            <div class="control">
                                <textarea class="textarea" placeholder="Como podemos ajudar?"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="has-text-right">
                    <button class="button is-dark">
                        <span>ENVIAR MENSAGEM</span>
                        <span class="icon"><i class="fas fa-paper-plane"></i></span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.field .control .select,
.field .control .select select {
    height: 40px !important;
    display: block;
    align-items: center;
}

.select:not(.is-multiple):not(.is-loading)::after {
    margin-top: -1px; 
}


</style>