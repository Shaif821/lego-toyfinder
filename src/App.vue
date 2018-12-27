<template>
    <!--De achtergrond kleur verandert aan de hand van de huidige route-->
    <div id="app" :class="[(this.$router.currentRoute.name === 'products-all') || (this.$router.currentRoute.name ===  'products-age-interest') ? 'products_background' : 'rest_background']">
        <transition-group enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    mode="out-in" enter>
            <router-view :key="$route.fullPath"/>
        </transition-group>
    </div>
</template>

<script>

    export default {
        name: 'app',
    }
</script>

<style>
    @font-face {
        font-family: 'BlueSheepLego';
        src: url("assets/fonts/BlueSheepLego-Regular.otf");
    }

    body {
        padding: 0;
        margin: 0;
        height: 1080px;
        width: 1920px;
    }

    #app {
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        transition: 0.3s ease-in-out;
        z-index: 0;
        overflow: hidden;
    }

    .rest_background {
        background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
        transition: 0.3s ease-in-out;
    }

    .products_background {
        background-color: #edf5f7;
        transition: 0.3s ease-in-out;
    }

    ::-webkit-scrollbar {
        width: 0px; /* remove scrollbar space */
        background: transparent; /* optional: just make scrollbar invisible */
    }
</style>
