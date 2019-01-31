<template>
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

        mounted(){
            onselectstart = (e) => {e.preventDefault()} //Prevents the user from selecting text etc.
        }
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
        font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        transition: 0.3s ease-in-out;
        z-index: 0;
        background-image: radial-gradient(0% 0%, #098ddb, #1062a2);

    }

    *{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }

    @keyframes rotating {
        from {
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    .rotating {
        -webkit-animation: rotating 2s linear infinite;
        -moz-animation: rotating 2s linear infinite;
        -ms-animation: rotating 2s linear infinite;
        -o-animation: rotating 2s linear infinite;
        animation: rotating 2s linear infinite;
    }
    /*::-webkit-scrollbar {*/
    /*width: 0px; !* remove scrollbar space *!*/
    /*background: transparent; !* optional: just make scrollbar invisible *!*/
    /*}*/
</style>
