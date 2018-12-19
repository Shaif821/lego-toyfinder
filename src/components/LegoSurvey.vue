<template>
    <div class="survey_container">
        <div class="survey_section-1">
            <router-link to="/">
                <img class="animated pulse infinite" src="../assets/images/layout/close.png">
            </router-link>
        </div>


        <transition enter-active-class="animated slideInLeft faster"
                    leave-active-class="animated slideOutRight faster"
                    enter mode="out-in">
            <component :is="view"></component>
        </transition>


        <div class="filler_3"><p @click="changeView()">test</p>
            <p @click="changeView(true)">theme</p></div>
    </div>
</template>

<script>
    import SurveyAge from './SurveyAge'
    import SurveyInterest from './SurveyInterest'
    import SUrveyTheme from './SurveyTheme'

    export default {
        name: "LegoSurvey",
        components: {
            'SurveyAge' : SurveyAge,
            'SurveyInterest' : SurveyInterest,
            'SurveyTheme' : SUrveyTheme
        },

        data() {
            return {
                index: true,
                view:'SurveyAge'
            }
        },

        methods: {
            changeView(test){
                if(!test) {
                    if(this.view === 'SurveyAge') {
                        this.view = 'SurveyInterest'
                    }
                    else {
                        this.view = 'SurveyAge'
                    }
                }
                else {
                    this.view = 'SurveyTheme'
                }

            },
        }
    }
</script>

<style>
    .survey_container {
        font-family: BlueSheepLego, 'sans-serif';
        background-color: rgba(0, 0, 0, 0.7);
        padding: 0;
        margin: 0;
        height: 970px;
    }

    .survey_section-1 img {
        margin-top: 10px;
        margin-right: 55px;
    }

    .survey_section-1 {
        height: 150px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .survey_section-1 img {
        margin-top: 10px;
        margin-right: 55px;
    }

    .survey_section-2 p {
        font-size: 72px;
        color: white;
        padding: 0;
        margin: 0;
    }
</style>