<template>
    <div class="cardboard_container animated slideInDown">
        <img src="../assets/images/layout/slider-border.png">
    </div>
</template>

<script>
    export default {
        name: "CardBoard"
    }
</script>

<style scoped>
    .cardboard_container {
        display: flex;
        height: 123px;
        width: 100%;
    }

    .cardboard_container img {
        max-height: 100%;
        max-width: 100%;
        height: 27px;
        width: 100%;
    }
</style>