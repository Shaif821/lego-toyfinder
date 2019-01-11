<template>
    <div class="cardboard_container" :style="[!this.$store.state.slideState ? {height: '66px'} : {height: '150px'}]">
        <img src="../../assets/images/layout/slider-border.png">
        <transition leave-active-class="animated bounceOutRight" v-if="index === 0 && this.$store.state.slideState">
            <div class="skip animated bounceInLeft ">
                <p v-if="this.$store.state.currentSurvey !== null" @click="goToProduct()" style="cursor: pointer;" class="skip_text">Terug</p>
                <p v-else @click="goToProduct()" style="cursor: pointer;" class="skip_text">Overslaan</p>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "CardBoard",
        props: ['index'],

        methods: {
            goToProduct(){
                this.$store.state.slideState = false
            }
        }
    }
</script>

<style scoped>
    .cardboard_container {
        width: 100%;
        padding: 0;
        margin: 0;
        z-index: 1;
        transition: ease-in-out 0.3s;
    }

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