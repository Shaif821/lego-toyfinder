<template>
    <!--De achtergrond kleur verandert als de isActiveLoader true is-->
    <div id="app" :class="[this.$store.state.isActiveLoader === true ? 'products_background' : 'rest_background']">
        <transition-group enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    mode="out-in" enter>
        <!--<slide-screen></slide-screen>-->
            <router-view :key="$route.fullPath"/>
        </transition-group>
    </div>
</template>

<script>
    // import SlideScreenSurvey from './components/SlideScreenSurvey'
    export default {
        name: 'app',
        // components: {
        //     'slide-screen' : SlideScreenSurvey,
        // }
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
        transition: 0.3s ease-in-out;
        animation-name: changeBackground;
        animation-duration: 2s;
        -webkit-animation-fill-mode: both;
        -moz-animation-fill-mode: both;
        -o-animation-fill-mode: both;
        animation-fill-mode: both;
        animation-iteration-count: 1;
        -webkit-animation-iteration-count: 1;
        animation-timing-function: ease-in-out;
    }

    @keyframes changeBackground {
        0% {
            background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
            }
        100% {
            background-color: #edf5f7;
        }
    }
    ::-webkit-scrollbar {
        width: 0px; /* remove scrollbar space */
        background: transparent; /* optional: just make scrollbar invisible */
    }
</style>
