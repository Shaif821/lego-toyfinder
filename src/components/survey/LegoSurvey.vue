<template>
    <div :class="[this.$store.state.transitionSlide ? 'survey__hide' : 'survey__show']">
        <div class="survey__container">
            <div :class="[{'hide__interest' : $store.state.transitionSlide}]" class="survey__header">
                <div style="cursor: pointer;" @click="resetData()" class="first-slide">
                    <img class="survey__header--img animated pulse infinite" src="../../assets/images/layout/close.png">
                </div>
            </div>

            <transition enter-active-class="animated slideInRight"
                        leave-active-class="animated slideOutLeft"
                        enter mode="out-in">
                <component :class="[{'hide__interest' : $store.state.transitionSlide}]"
                           v-if="indexAnimation === 0 && this.$store.state.loadSurvey"
                           :is="view" :ageChoice="age">
                </component>
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
                age: null,
                interest: null,
                theme: null
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
                        this.age = choice
                        break;
                    case 'SurveyInterest':
                        this.interest = choice
                        break;
                    case 'SurveyTheme':
                        this.theme = choice
                        break;
                }
                if (bool) {
                    this.nextSlide()
                }
            },

            nextSlide() {
                this.$store.state.ageChoice = this.age
                this.$store.state.interestChoice = this.interest
                this.$store.state.themeChoice = this.theme
                this.$store.state.transitionSlide = true
                this.$store.state.surveyStream = true
                this.$store.state.slideState = 2
            },

            resetData() {
                this.age = null
                this.interest = null
                this.theme = null
                this.$store.state.loadSurvey = false
                this.view = 'SurveyAge'
                this.$store.state.isActiveTheme = false
                this.$store.state.currentSurvey = null
                this.$store.state.slideState = 1
                this.$store.state.ageChoice = null
                this.$store.state.interestChoice = null
                this.$store.state.themeChoice = null
            },

            watchView() {
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
            }
        },

        mounted() {
            this.watchView()
        },

        computed: {
            checkThemeChange() {
                return this.$store.state.isActiveTheme
            },
            checkView() {
                return this.$store.state.currentSurvey
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
            },

            checkView() {
                if (this.$store.state.currentSurvey !== null) {
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

    .survey__header {
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
    .survey__hide {
        overflow: hidden;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation: transition 2s forwards;
    }

    .survey_show {
        overflow: hidden;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation: transitionShow 2s forwards;
    }

    .hide__interest {
        transition: 0.5s ease-in-out;
        opacity: 0;
    }

    @keyframes transition {
        0% {
            height: 970px;
        }
        100% {
            height: 0;
        }
    }

    @keyframes transitionShow {
        0% {
            height: 0;
        }
        100% {
            height: 970px;
        }
    }
</style>