<template>
    <div class="screen__loader__container">
        <img src="../../assets/images/layout/loader.png" class="rotating">
        <p>Jouw toekomstige cadeautjes worden geladen</p>
    </div>
</template>

<script>
    export default {
        name: "ScreenLoader",

        methods: {},

        mounted() {
            this.$store.state.legoSurveyStatus = true
            let vm = this
            setTimeout(function () {
                vm.$store.state.slideState = 3
            }, 3000)

        }
    }
</script>

<style scoped>
    @import "https://use.fontawesome.com/releases/v5.3.1/css/all.css";

    .screen__loader__container {
        transition: ease-in-out 0.3s;
        overflow: hidden;
        height: 1015px;
        font-family: Ubuntu, 'sans-serif';
        font-size: 28px;
        font-weight: bold;
        color: #ffc600;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }


</style>