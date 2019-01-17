<template>
    <div>
        <div class="survey__subject">
            <p class="survey__subject__text">Welk thema past bij jou?</p>
        </div>

        <div class="survey__filler"></div>

        <swiper :options="swiperOption">
            <swiper-slide class="survey__theme__slider animated zoomIn"
                          :style="{animationDelay: '0.' + indexTheme + 'STH'}"
                          style="animation-duration: 1.5s;"
                          v-for="(legoTheme, indexTheme) in this.$store.state.themes"
                          :key="indexTheme + 'STH'">

                <div class="survey__theme__images" @click="$parent.changeView(index)">
                    <img class="survey__theme__lego__img  swiper-lazy" v-lazy="legoTheme.url">
                    <img class="swiper-lazy" src="../../assets/images/layout/border.png">
                </div>

                <p class="survey__theme__text animated flipInX"
                   style="animation-delay: 1s; animation-duration: 1s;">
                    {{legoTheme.brand}} {{legoTheme.theme}}
                </p>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>

    export default {
        name: "SurveyTheme",

        data() {
            return {
                swiperOption: {
                    slidesPerView: 4.5,
                    freeMode: true,
                    centeredSlides: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
            }
        },
    }
</script>

<style scoped>
    .survey__filler {
        height: 100px;
    }

    .survey__theme__slider {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .survey__theme__slider:first-child {
        width: 100%;
        margin-left: -700px;
    }

    .survey__theme__lego__img {
        position: absolute;
        z-index: 1;
        width: 288px;
        height: 376px;
        margin: 25px 24px 24px 22px;
        border: 5px solid black;
    }

    .survey__theme__text {
        font-family: Ubuntu, 'sans-serif';
        color: White;
        font-size: 28px;
        font-weight: 500;
        line-height: 1.43;
        width: 355px;
        margin-left: 0;
        margin-right: 0;
    }

</style>