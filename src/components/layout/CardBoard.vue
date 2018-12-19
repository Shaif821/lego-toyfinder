<template>
    <div :class="[this.$router.currentRoute.name !== 'screen-saver' ? 'footer_position' : 'header_position']" class="cardboard_container">
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
        width: 100%;

    }

    .header_position {
        height: 122px;
    }

    .footer_postion {
        height: 110px;
        background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
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
        font-size: 28px;
        text-decoration: none;
        margin-right: 40px;
        font-weight: bold;
    }

    .cardboard_container img {
        max-height: 100%;
        max-width: 100%;
        height: 27px;
        width: 100%;
        margin: 0;
        padding: 0;
    }
</style>