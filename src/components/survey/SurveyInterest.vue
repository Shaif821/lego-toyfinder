<template>
    <div>
        <div class="survey_section-2">
            <p>Wat vind je leuk?</p>
        </div>

        <div class="filler_2"></div>

        <div class="survey_section-3">
            <div @click="saveChoice(indexInterest)" class="survey_wrapper" style="cursor: pointer;" v-for="(legoInterest, indexInterest) in this.$store.state.interests"
                 :key="indexInterest + 'ST'">
                <div  class="bitmap-small">
                    <img class="animated flipInY" style="animation-delay: 0.4s" :src="legoInterest.url"
                         :style="{margin: legoInterest.pos}">
                    <img class="animated flipInY" style="animation-delay: 0.4s" src="../../assets/images/layout/bitmap-small.png">
                </div>
                <p>{{legoInterest.text}}</p>
            </div>
        </div>

        <div class="filler_3"></div>
    </div>
</template>

<script>
    export default {
        name: "SurveyInterest",

        methods: {
            saveChoice(index) {
                this.$parent.changeView(index);   //De route wordt verandert naar de producten pagina
            },                                    //en de index van het gekozen interesse wordt meegegven
        }
    }
</script>

<style scoped>
    .survey_section-2 p {
        font-size: 72px;
        color: white;
        padding: 0;
        margin: 0;
    }

    .filler_2 {
        height: 62px;
    }

    .survey_section-3 {
        color: white;
        font-family: Ubuntu, sans-serif;
        font-size: 28px;
        font-weight: 500;
        height: 585px;
        width: 1320px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .survey_wrapper {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }

    .survey_wrapper > * {
        margin: 0;
        padding: 0;
    }

    .bitmap-small img:first-child {
        position: absolute;
        z-index: 1;
    }

    .survey_section-3 > * {
        flex: 1 0 21%; /* explanation below */
    }

    .filler_3 {
        height: 100px;
    }
</style>