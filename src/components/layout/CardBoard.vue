<template>
    <div class="cardboard_container"
         :class="{'headerHeight' : (this.$router.currentRoute.name === 'products-all') || (this.$router.currentRoute.name === 'products-age-interest')}">
        <img src="../../assets/images/layout/slider-border.png">
        {{currentIndex}}
        <!--Als de index een 0 is (dus de survey pagina), dan wordt het volgende getoond:-->
        <div v-if="index === 0">
            <div class="skip">
                <p @click="changeTheme" style="cursor: pointer;" class="skip_text">Overslaan</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CardBoard",
        props: ['index'],

        methods: {
            changeTheme(){
                this.$store.state.legoTheme = true  //Hiermee wordt legoTheme weergegven in de LegoSurvey component
            }
        }
    }
</script>

<style scoped>
    .cardboard_container {
        height: 150px;
        /*position: absolute;*/
        width: 100%;
        padding: 0;
        margin: 0;
        z-index: 1;
    }

    .headerHeight {
        height: 28px;
    }

    .header_position {
        top: 0;
    }

    .footer_position {
        bottom: 0;
        animation-name: headerToFooter;
        animation-duration: 2s;
        -webkit-animation-fill-mode: both;
        -moz-animation-fill-mode: both;
        -o-animation-fill-mode: both;
        animation-fill-mode: both;
        animation-iteration-count: 1;
        -webkit-animation-iteration-count: 1;
        animation-timing-function: linear;
    }

    /*@keyframes headerToFooter {*/
    /*0% {*/
    /*z-index: 3;*/
    /*height: 100vh;*/
    /*}*/
    /*100% {*/
    /*position: relative;*/
    /*bottom: 0;*/
    /*z-index: 3;*/
    /*height: 110px;*/
    /*}*/
    /*}*/

    /*@keyframes footerToHeader  {*/
    /*0% {*/
    /*bottom: 0;*/
    /*z-index: 3;*/
    /*height: 120vh;*/
    /*}*/
    /*50% {*/
    /*bottom: 0;*/
    /*z-index: 9;*/
    /*}*/
    /*100% {*/
    /*height: 27px;*/
    /*bottom: 0;*/
    /*z-index: 9;*/
    /*}*/
    /*}*/

    .skip {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        align-items: center;
        padding: 0;
        margin: 0;
        height: 61px;
    }

    .skip_text {
        color: #ffc600;
        font-family: Ubuntu, sans-serif;
        text-decoration: none;
        font-size: 28px;
        margin-right: 40px;
        font-weight: bold;
    }

    .cardboard_container img {
        max-height: 100%;
        max-width: 100%;
        height: 27px;
        width: 100%;
        padding: 0;
        margin: -3px 0 0;
    }
</style>