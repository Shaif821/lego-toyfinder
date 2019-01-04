<template>
    <div class="cardboard_container" :style="[this.$store.state.isActiveLoader ? {height: '66px'} : {height: '150px'}]">
        <img src="../../assets/images/layout/slider-border.png">
        <transition leave-active-class="animated bounceOutRight" v-if="index === 0 && this.$store.state.isActiveLoader === false">
            <div class="skip animated bounceInLeft ">
                <p @click="changeTheme" style="cursor: pointer;" class="skip_text">Overslaan</p>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "CardBoard",
        props: ['index'],

        methods: {
            changeTheme(){
                this.$store.state.isActiveTheme = true  //Hiermee wordt legoTheme weergegeven in de LegoSurvey component
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