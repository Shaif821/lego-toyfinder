<template>
    <div id="app">
        <CardBoard/>
        <router-view :key="$route.fullPath"/>
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
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        min-height: 100vh;
        background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    }
</style>
