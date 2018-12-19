<template>
    <div>
        <div class="survey_section-2">
            <p>Wat vind je leuk?</p>
        </div>

        <div class="filler_2"></div>

        <div class="survey_section-3">
            <div class="survey_wrapper" v-for="(legoAge, index) in legoAgeImages" :key="index">
                <router-link to="/survey/interest" class="bitmap-small">
                    <img class="animated flipInY slower" :src="legoAge.url" :style="{margin: legoAge.pos}">
                    <img class="animated flipInY slower" src="../assets/images/layout/bitmap-small.png">
                </router-link>
                <p>{{legoAge.text}}</p>
            </div>
        </div>

        <div class="filler_3"></div>
    </div>
</template>

<script>
    export default {
        name: "SurveyInterest",

        data() {
            return {
                legoAgeImages: [
                    {
                        url: require('../assets/images/survey/group-107.png'),
                        speech: require('../assets/images/layout/bitmap-small.png'),
                        text: 'Avontuur',
                        pos: '49px 50px 53px 50px'
                    },
                    {

                        url: require('../assets/images/survey/group-43.png'),
                        speech: require('../assets/images/layout/bitmap-small.png'),
                        text: 'Dieren',
                        pos: '49px 50px 53px 50px'
                    },
                    {
                        url: require('../assets/images/survey/group-34.png'),
                        speech: require('../assets/images/layout/bitmap-small.png'),
                        text: 'Fantasie',
                        pos: '49px 50px 53px 50px'
                    },
                    {
                        url: require('../assets/images/survey/group-44.png'),
                        speech: require('../assets/images/layout/bitmap-small.png'),
                        text: 'Roboto',
                        pos: '49px 50px 53px 50px'
                    },
                    {
                        url: require('../assets/images/survey/group-107.png'),
                        speech: require('../assets/images/layout/bitmap-small.png'),
                        text: 'Stad & gebouw',
                        pos: '49px 50px 53px 50px'
                    },
                    {

                        url: require('../assets/images/survey/group-43.png'),
                        speech: require('../assets/images/layout/bitmap-small.png'),
                        text: 'Superhelden',
                        pos: '49px 50px 53px 50px'
                    },
                    {
                        url: require('../assets/images/survey/group-34.png'),
                        speech: require('../assets/images/layout/bitmap-small.png'),
                        text: 'Voertuigen',
                        pos: '49px 50px 53px 50px'
                    },
                    {
                        url: require('../assets/images/survey/group-44.png'),
                        speech: require('../assets/images/layout/bitmap-small.png'),
                        text: 'Vrijetijd',
                        pos: '49px 50px 53px 50px'
                    },

                ]
            }
        }
    }
</script>

<style scoped>
class=animated flipinX

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