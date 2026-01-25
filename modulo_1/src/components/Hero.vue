<template>
    <section class="hero is-fullheight-with-navbar is-white" id="inicio">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-vcentered is-variable is-8">
                    <div class="column is-6 has-text-centered">
                        <div class="content-wrapper">
                            <h1 class="title is-1 has-text-weight-bold main-title">
                                A melhor gestão para
                                <span class="text-gradient">sua empresa</span>
                            </h1>
                            <div class="buttons is-centered mt-6">
                                <a class="button is-success is-large btn-principal" href="#contato">
                                    <strong>EXPERIMENTE GRÁTIS</strong>
                                    <span class="icon"><i class="fas fa-rocket"></i></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="column is-6">
                        <div class="image-container">
                            <div class="glass-effect"></div>
                            <img src="/imgprincipal.png" class="main-image" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.main-title {
    font-family: 'Gilroy', 'Inter', sans-serif;
    font-size: 4rem !important;
    line-height: 1.1;
    color: #1a1a1a;
}

.text-gradient {
    background: linear-gradient(90deg, #2ecc71, #27ae60);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.image-container {
    position: relative;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    transition: transform 0.5s ease;
}

.image-container:hover {
    transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
}

.main-image {
    border-radius: 16px;
    display: block;
}


@media screen and (max-width: 768px) {
    .main-title {
        font-size: 2.8rem !important;
    }

    .image-container {
        margin-top: 3rem;
    }
}
</style>
