<template>
    <div class="screen-loader_container">
        <i class="fas fa-spinner animated rotateIn infinite" style="color: white"></i>
        <p>Jouw toekomstige cadeautjes worden geladen</p>
    </div>
</template>

<script>
    export default {
        name: "ScreenLoader",

        methods: {
            toProducts(){
                let vm = this
                // this.$router.push('/products/age/' + this.surveyOptions[0].age + '/interest/' + this.surveyOptions[0].interest);
                setTimeout(function (){
                    vm.$store.state.productLoaded = true
                    // vm.$router.push({path:  vm.$store.state.productRoute})
                }, 4000)
            }
        },

        mounted() {
            this.toProducts()
        }
    }
</script>

<style scoped>
    @import "https://use.fontawesome.com/releases/v5.3.1/css/all.css";

    .screen-loader_container {
        transition: ease-in-out 0.3s;
        overflow: hidden;
        height: 930px;
        font-family: Ubuntu, 'sans-serif';
        font-size: 28px;
        font-weight: bold;
        color: #ffc600;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation-name: changeBackground;
        animation-duration: 4s;
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
            background-color: #edf5f7;
        }
        50% {
            background-color: transparent;
        }
        100% {
            height: 1015px;
            background-color: #edf5f7;
        }
    }


</style>