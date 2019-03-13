<template>
  <div>
    <div class="survey__subject">
      <p class="survey__subject__text">Welk thema past bij jou?</p>
    </div>

    <div class="survey__filler"></div>

    <div class="survey__theme__wrapper">
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="(legoTheme, indexTheme) in this.$store.state.themes"
          :key="indexTheme + 'STH'"
          class="survey__theme__slider animated flipInY"
          :style="{ animationDelay: '1.' + indexTheme + 's' }"
          style="animation-duration: 2s;"
        >
          <div
            class="survey__theme__images"
            @click="$parent.changeView(legoTheme)"
          >
            <v-lazy-image
              class="survey__theme__lego__img  swiper-lazy"
              :src="legoTheme.url"
            />
            <img
              class="swiper-lazy"
              src="../../assets/images/layout/border.png"
            />
          </div>

          <p
            class="survey__theme__text animated flipInX"
            :style="{ animationDelay: '2.' + indexTheme + 's' }"
            style="animation-duration: 1s;"
          >
            LEGO® {{ legoTheme.theme }}
          </p>
        </swiper-slide>
      </swiper>
    </div>
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
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  }
};
</script>

<style scoped>
.survey__filler {
  height: 65px;
}

.survey__theme__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.survey__theme__slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 35px;
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
  font-family: Ubuntu, "sans-serif";
  color: White;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.43;
  width: 355px;
  margin-left: 0;
  margin-right: 0;
}
</style>
