<template>
    <div class="screen-loader_container">
        <img src="../../assets/images/layout/loader.png" class="animated rotateIn infinite">
        <p>Jouw toekomstige cadeautjes worden geladen</p>
    </div>
</template>

<script>
    export default {
        name: "ScreenLoader",

        // methods: {
        //     toProducts(){
        //         let vm = this
        //         // this.$router.push('/products/age/' + this.surveyOptions[0].age + '/interest/' + this.surveyOptions[0].interest);
        //         setTimeout(function (){
        //             // vm.$store.state.isActiveProducts = true
        //             vm.$store.state.currentState = 'State-3'
        //             // vm.$router.push({path:  vm.$store.state.productRoute})
        //         }, 3000)
        //     }
        // },

        mounted() {
        }
    }
</script>

<style scoped>
    @import "https://use.fontawesome.com/releases/v5.3.1/css/all.css";

    .screen-loader_container {
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
    }


</style>