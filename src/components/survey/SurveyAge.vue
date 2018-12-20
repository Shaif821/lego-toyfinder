<template>
    <div>
        <div class="survey_section-2">
            <p>Hoe oud ben je?</p>
        </div>

        <div class="filler_2"></div>

        <div class="survey_section-3">
            <div class="survey_wrapper" v-for="(legoAge, indexAge) in legoAgeImages" :key="indexAge + 'SA'">
                <div class="bitmap">
                    <div @click="saveChoice(indexAge)">
                        <img class="animated flipInY slower" :src="legoAge.url" :style="{margin: legoAge.pos}">
                        <img class="animated flipInY slower" src="../../assets/images/layout/bitmap.png">
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
                legoAgeImages: [
                    {
                        url: require('../../assets/images/survey/group-107.png'),
                        speech: require('../../assets/images/layout/bitmap.png'),
                        text: '1 - 2 jaar',
                        pos: '82px 103px 100px 94px'
                    },
                    {

                        url: require('../../assets/images/survey/group-43.png'),
                        speech: require('../../assets/images/layout/bitmap.png'),
                        text: '2 - 6 jaar',
                        pos: '70px 80px 92px 77px'
                    },
                    {
                        url: require('../../assets/images/survey/group-34.png'),
                        speech: require('../../assets/images/layout/bitmap.png'),
                        text: '6 - 12 jaar',
                        pos: '78px 90px 87px 88px'
                    },
                    {
                        url: require('../../assets/images/survey/group-44.png'),
                        speech: require('../../assets/images/layout/bitmap.png'),
                        text: '12+',
                        pos: '76px 68px 88px 66px'
                    },

                ]
            }
        },

        methods: {
            saveChoice(index) {
                // this.$store.state.surveyOptions[0].age.push(index);
                this.$parent.changeView(index);
            },
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