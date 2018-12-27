<template>
    <div>
        <div class="survey_section-2">
            <p>Welk thema past bij jou?</p>
        </div>

        <div class="filler_2"></div>

        <div class="survey_section-3">
            <div>
                <!-- swiper -->
                <swiper  class="teste" :options="swiperOption">
                    <swiper-slide class="theme_image_wrapper animated flipInY slower" v-for="(legoTheme, themeIndex) in this.$store.state.themes" :key="themeIndex + 'STH'">
                        <img style="width: 288px; height: 376px; margin: 25px 24px 24px 22px; border: 5px solid black;" :src="legoTheme.url">
                        <img src="../../assets/images/layout/border.png">
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <div class="filler_3"></div>
    </div>
</template>

<script>

    export default {
        name: "SurveyTheme",

        data() {
            return {
                swiperOption: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
            }
        }
    }
</script>

<style scoped>
    .filler_2 {
        height: 100px;
    }

    .survey_section-3 {
        height: 495px;
        overflow: hidden;
    }

    .survey_section-3 > *:first-child {
        overflow: auto;
    }

    .teste {
        height: 100%;
    }

    .theme_image_wrapper:first-child {
        width: 100%;
        margin-left: 120px;
    }

    .theme_image_wrapper {
        padding: 0 20px;
    }

    .theme_image_wrapper img:first-child {
        position: absolute;
        z-index: 1;
    }

</style>