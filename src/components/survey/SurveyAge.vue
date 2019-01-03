<template>
    <div>
        <div class="survey_section-2">
            <p>Hoe oud ben je?</p>
        </div>

        <div class="filler_2"></div>

        <div class="survey_section-3">
            <div class="survey_wrapper" v-for="(legoAge, indexAge) in this.$store.state.ages" :key="indexAge + 'SA'">
                <div class="bitmap">
                    <div @click="saveChoice(indexAge)">
                        <img class="animated flipInY slower" style="animation-delay: 0.3s" :src="legoAge.url" :style="{margin: legoAge.pos}">
                        <img class="animated flipInY slower" style="animation-delay: 0.3s" src="../../assets/images/layout/bitmap.png">
                    </div>
                </div>
                <p>{{legoAge.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SurveyAge",

        data() {
            return {

            }
        },

        methods: {
            saveChoice(index) {
                // this.$store.state.surveyOptions[0].age.push(index);
                this.$parent.changeView(index);   //De view wordt verandert naar de SurveyInterest met de index van de gekozen
            },                                    //leeftijdsgroep.
        }
    }
</script>

<style scoped>


    .survey_section-1 {
        height: 150px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .filler_2 {
        height: 136px;
    }

    .survey_section-3 {
        padding-top: 35px;
        color: white;
        font-family: Ubuntu, sans-serif;
        font-size: 28px;
        font-weight: 500;
        height: 370px;
        width: 1750px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .bitmap img:first-child {
        position: absolute;
        z-index: 1;
    }

    .bitmap img {
        cursor: pointer;
    }

    .survey_section-3 > * {
        flex: 1 1 auto;
    }

</style>