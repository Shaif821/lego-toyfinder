<template>
    <div class="cardboard__container" :style="[this.$store.state.transitionSlide ? {height: '66px'} : {height: '150px'}]">
        <img class="cardboard__container__img" src="../../assets/images/layout/slider-border.png">
        <transition leave-active-class="animated bounceOutRight" v-if="index === 0 && this.$store.state.legoSurveyStatus">
            <div class="cardboard__container__text-holder animated bounceInRight ">
                <p class="cardboard__container__text" v-if="this.$store.state.currentSurvey !== null" @click="goToProduct()">Terug</p>
                <p class="cardboard__container__text" v-else @click="goToProduct()">Overslaan</p>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "CardBoard",
        props: {
            index: Number
        },

        methods: {
            goToProduct(){ this.$store.state.slideState = false}
        }
    }
</script>

<style scoped>
    .cardboard__container {
        width: 100%;
        padding: 0;
        margin: 0;
        z-index: 1;
        transition: ease-in-out 0.3s;
    }

    .cardboard__container__img {
        max-height: 100%;
        max-width: 100%;
        height: 27px;
        width: 100%;
        padding: 0;
        margin: -3px 0 0;
    }

    .cardboard__container__text-holder {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        align-items: center;
        padding: 0;
        margin: 0;
        height: 61px;
    }

    .cardboard__container__text{
        color: #ffc600;
        font-family: Ubuntu, sans-serif;
        text-decoration: none;
        font-size: 28px;
        margin-right: 40px;
        font-weight: bold;
        cursor: pointer;
    }


</style>