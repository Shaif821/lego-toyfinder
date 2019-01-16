<template>
    <!--De achtergrond kleur verandert als de isActiveLoader true is-->
    <div id="app" >
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

    }

    #app {
        /*height: 1080px;*/
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        transition: 0.3s ease-in-out;
        z-index: 0;
        background-image: radial-gradient(0% 0%, #098ddb, #1062a2);
        overflow: hidden;
    }



    *{
        outline: none;
    }
    /*::-webkit-scrollbar {*/
    /*width: 0px; !* remove scrollbar space *!*/
    /*background: transparent; !* optional: just make scrollbar invisible *!*/
    /*}*/
</style>
