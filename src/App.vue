<template>
    <div id="app">
        <transition-group enter-active-class="animated slideInDown"
                          leave-active-class="animated slideOutDown"
                          mode="out-in" enter>
            <CardBoard :key="$route.fullPath" v-if="this.$router.currentRoute.name === 'screen-saver'"/>
            <router-view :key="$route.fullPath"/>
            <CardBoard :key="$route.fullPath" v-if="this.$router.currentRoute.name !== 'screen-saver'"/>
        </transition-group>

    </div>
</template>

<script>
    import CardBoard from './components/CardBoard'

    export default {
        name: 'app',
        components: {CardBoard}
    }
</script>

<style>

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
        background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    }

    ::-webkit-scrollbar {
        width: 0px; /* remove scrollbar space */
        background: transparent; /* optional: just make scrollbar invisible */
    }
</style>
