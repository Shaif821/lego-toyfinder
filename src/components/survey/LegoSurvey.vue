<template>
    <div :class="[{'survey__hide' : this.$store.state.transitionSlide}]">
        <div class="survey__container">
            <div class="survey__header">
                <div style="cursor: pointer;" @click="resetData()" class="first-slide">
                    <img class="survey__header--img animated pulse infinite" src="../../assets/images/layout/close.png">
                </div>
            </div>

            <transition enter-active-class="animated slideInRight"
                        leave-active-class="animated slideOutLeft"
                        enter mode="out-in">
                <component v-if="indexAnimation === 0 && this.$store.state.loadSurvey" :is="view"></component>
            </transition>
        </div>
    </div>
</template>

<script>
    import SurveyAge from './SurveyAge'
    import SurveyInterest from './SurveyInterest'
    import SurveyTheme from './SurveyTheme'

    export default {
        name: "LegoSurvey",
        components: {
            'SurveyAge': SurveyAge,
            'SurveyInterest': SurveyInterest,
            'SurveyTheme': SurveyTheme,
        },

        props: {
            indexAnimation: Number
        },

        data() {
            return {
                index: true,
                view: '',
                surveyOptions: [{
                    age: [],
                    interest: [],
                    theme: []
                }]
            }
        },

        methods: {
            changeView(choice) { //Als de gebruiker vanuit het begin scherm een keuze maakt, of vanuit de producten slide
                this.$store.state.currentSurvey ? this.addChoice(choice, true) : this.saveChoice(choice)
            },

            saveChoice(choice) {  //Sla de keuze op en ga door naar de volgende slide of view
                this.addChoice(choice, false);

                if (this.view === 'SurveyInterest' || this.view === 'SurveyTheme') {
                    this.nextSlide()
                } else {
                    this.view = 'SurveyInterest'
                }
            },

            addChoice(choice, bool) {
                switch (this.view) {
                    case 'SurveyAge':
                        this.$store.state.ageChoice = choice
                        break;
                    case 'SurveyInterest':
                        this.$store.state.interestChoice = choice
                        break;
                    case 'SurveyTheme':
                        this.$store.state.themeChoice = choice
                        break;
                }
                if(bool){
                    this.nextSlide()
                }
            },

            nextSlide() {
                this.$store.state.transitionSlide = true
                // this.$store.state.slideState = false
                this.$store.state.legoSurveyStatus = false
            },

            resetData() {
                this.view = 'SurveyAge'
                this.$store.state.ageChoice = null
                this.$store.state.interestChoice = null
                this.$store.state.themeChoice = null
                this.$store.state.isActiveTheme = false
                this.$store.state.currentSurvey = null
                this.$store.state.slideState = true
                this.$store.state.loadSurvey = false
            },
        },

        mounted() {
            if (this.$store.state.currentSurvey === 'SurveyAge') {
                this.view = 'SurveyAge'
            }
            else if (this.$store.state.currentSurvey === 'SurveyInterest') {
                this.view = 'SurveyInterest'
            }
            else if (this.$store.state.currentSurvey === 'SurveyTheme') {
                this.view = 'SurveyTheme'
            }
            else {
                this.view = 'SurveyAge'
            }
        },

        computed: {
            checkThemeChange() {
                return this.$store.state.isActiveTheme
            }
        },

        watch: {
            checkThemeChange() {
                if (this.$store.state.isActiveTheme) {
                    this.view = 'SurveyTheme'
                }
                else {
                    this.view = 'SurveyAge'
                }
            }
        }
    }
</script>

<style>
    .survey__container {
        font-family: BlueSheepLego, 'sans-serif';
        background-color: rgba(0, 0, 0, 0.7);
        padding: 0;
        margin: 0;
        height: 970px;
    }

    .survey__header{
        height: 150px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .survey__header--img {
        cursor: pointer;
        margin-top: 10px;
        margin-right: 55px;
    }

    .survey__subject__text {
        font-size: 72px;
        color: white;
        padding: 0;
        margin: 0;
    }

    /*Animations*/
    .survey__hide{
        overflow: hidden;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation: transition 0.5s forwards;
    }

    @keyframes transition {
        0% {
            opacity: 1;
            height: 970px;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 0;
            height: 0;
        }
    }
</style>