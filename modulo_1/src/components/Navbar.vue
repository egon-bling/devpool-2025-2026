<template>
    <nav class="navbar is-white has-shadow" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="#">
                    <strong>NOME</strong>
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item">Início</a>
                    <a class="navbar-item">Funcionalidades</a>
                    <a class="navbar-item" href="#anchor">Planos</a>
                    <a class="navbar-item">Contato</a>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <button class="button is-dark is-outlined">
                            <span class="icon"><i class="fas fa-user"></i></span>
                            <span>ENTRAR</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<style scoped>
.navbar-item:hover {

    font-weight: bolder;
    transition: 0.25s;
    
}
</style>