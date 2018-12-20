<template>
    <div class="cardboard_container" :class="[this.$router.currentRoute.name !== 'screen-saver' ? 'footer_position' : 'header_position']">
        <img src="../../assets/images/layout/slider-border.png">
        <div v-if="this.$router.currentRoute.name !== 'screen-saver'">
           <div class="skip">
               <router-link to="/survey/theme" class="skip_text">Overslaan</router-link>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CardBoard"
    }
</script>

<style scoped>
    .cardboard_container {
        position: absolute;
        width: 100%;
        height: 28px;
        padding: 0;
        margin: 0;
        z-index: 1;
    }

    .header_position {
        top: 0;
        animation: footerToHeader 0.5s;
        animation-fill-mode: forwards;
    }

    .footer_position {
        background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
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

    @keyframes headerToFooter {
        0% {
            z-index: 3;
            height: 100vh;
            background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
        }
        100% {
            bottom: 0;
            z-index: 3;
            height: 110px;
            background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
            /*transform: translateY(100%);*/
        }
    }

    @keyframes footerToHeader  {
        0% {
            bottom: 0;
            z-index: 3;
            height: 120vh;
        }
        50% {
            bottom: 0;
            z-index: 9;
        }
        100% {
            height: 27px;
            bottom: 0;
            z-index: 9;
        }
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