<template>
  <div>
    <div class="product-bottom__button" @click="goToSurvey('SurveyAge')">
      <span
        v-if="this.$store.state.ageChoice !== null"
        class="product-buttons__text"
      >
        Ik ben
        <span class="product_survey_choice">{{
          this.$store.state.ageChoice.text
        }}</span>
      </span>
      <span v-else class="product-buttons__text">Wat is je leeftijd?</span>
    </div>

    <div
      v-if="buttonState"
      class="product-bottom__button product-bottom__button--last"
      @click="
        buttonState ? goToSurvey('SurveyInterest') : goToSurvey('SurveyAge')
      "
    >
      <span
        v-if="this.$store.state.interestChoice !== null"
        class="product-buttons__text"
      >
        Ik hou van
        <span class="product_survey_choice">{{
          this.$store.state.interestChoice.text
        }}</span>
      </span>
      <span v-else class="product-buttons__text">Wat vind je leuk? </span>
    </div>

    <div class="product-bottom__button" @click="goToSurvey('SurveyTheme')">
      <span
        v-if="this.$store.state.themeChoice !== null"
        class="product-buttons__text"
      >
        LEGO®
        {{ this.$store.state.themeChoice.theme }}
      </span>
      <span v-else class="product-buttons__text"
        >Bekijk het productenoverzicht</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductButtons",

  data() {
    return {
      buttonState: null
    };
  },

  mounted() {
    this.checkButtonState();
  },

  methods: {
    goToSurvey(survey) {
      this.$store.state.legoSurveyStatus = true;
      this.$store.state.surveyStream = null;
      this.$store.state.transitionSlide = false;
      this.$store.state.slideState = 4;
      this.$store.state.loadSurvey = true;
      this.$store.state.currentSurvey = survey;
    },

    checkButtonState() {
      if (this.$store.state.ageChoice !== null) {
        this.buttonState = this.$store.state.ageChoice.text !== "1 - 3 jaar";
      } else this.buttonState = this.$store.state.ageChoice === null;
    }
  }
};
</script>

<style scoped>
.product-bottom__button {
  height: 100%;
  flex: 1;
  background: white;
  font-size: 25px;
  text-align: center;
  font-weight: bold;
  box-shadow: inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
  transition: 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.product-buttons__text {
  color: #020202;
}

.product_bottom__button > *:first-child {
  padding: 8px;
}

.product-bottom__button {
  border-right: 4px solid #d9d9d9;
  /*border-left: 4px solid #d9d9d9;*/
  box-shadow: inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
}

.product-bottom__button:last-child {
  border-right: none;
}

.product-bottom__button:hover {
  border-right: 4px solid #33a0ff;
  color: white;
  background: #33a0ff;
  box-shadow: 0 -2px 0 0 #33a0ff, inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
  transition: 0.3s ease-in-out;
}

.product-bottom__button:hover .product-buttons__text {
  color: white;
  transition: 0.3s ease-in-out;
}

.product-bottom__button--last:hover {
  border-right: none;
  transition: 0.3s ease-in-out;
}

.product_survey_choice {
  color: #496078;
}
</style>
