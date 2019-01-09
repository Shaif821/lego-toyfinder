<template>
    <!--De achtergrond kleur verandert als de isActiveLoader true is-->
    <div id="app" :class="[{'products-background' : this.$store.state.currentState === 'State-3'}, {'rest-background' : this.$store.state.currentState !== 'State-3'}]">
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

    .rest-background {
        background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    }

    .products-background {
        animation-name: changeBackground;
        animation-duration: 3s;
        animation-fill-mode: forwards;
    }

    @keyframes changeBackground {
        0% {
            background-color: transparent;
        }
        100% {
            background-color: #edf5f7;
        }
    }
    /*::-webkit-scrollbar {*/
    /*width: 0px; !* remove scrollbar space *!*/
    /*background: transparent; !* optional: just make scrollbar invisible *!*/
    /*}*/
</style>
