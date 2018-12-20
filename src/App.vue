<template>
    <div id="app">
        <transition enter-active-class="animated slideInDown"
                    leave-active-class="animated slideOutDown"
                    mode="out-in" enter>
            <router-view :key="$route.fullPath"/>
        </transition>
        <CardBoard :key="$route.fullPath + 'HC'"/>
    </div>
</template>

<script>
    import CardBoard from './components/layout/CardBoard'

    export default {
        name: 'app',
        components: {CardBoard}
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
        overflow: hidden;
    }

    #app {
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    }

    ::-webkit-scrollbar {
        width: 0px; /* remove scrollbar space */
        background: transparent; /* optional: just make scrollbar invisible */
    }
</style>
