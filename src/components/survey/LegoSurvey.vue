<template>
    <div :class="[this.$store.state.transitionSlide ? 'survey__hide' : 'survey__show']">
        <div class="survey__container">
            <div :class="[{'hide__interest' : $store.state.transitionSlide}]" class="survey__header">
                <transition enter-active-class="animated bounceInRight delayAnimation" mode="out-in"
                            leave-active-class="animated bounceOutUp">
                    <div v-if="$store.state.loadSurvey" style="cursor: pointer;" @click="resetData()"
                         class="first-slide">
                        <img class="survey__header--img animated pulse infinite"
                             src="../../assets/images/layout/close.png">
                    </div>
                </transition>
            </div>

            <transition v-if="view !== 'SurveyTheme'" enter-active-class="animated slideInRight slowDown"
                        leave-active-class="animated slideOutLeft slowDown"
                        enter mode="out-in">
                <component :class="[{'hide__interest' : $store.state.transitionSlide}]"
                           v-if="indexAnimation === 0 && this.$store.state.loadSurvey"
                           :is="view" :ageChoice="age">
                </component>
            </transition>
            <transition v-else enter-active-class="animated slideInRight slowDown--down"
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
    const SurveyAge = () => import('./SurveyAge')
    const SurveyInterest = () => import('./SurveyInterest')
    const SurveyTheme = () => import('./SurveyTheme')

    export default {
        name: "LegoSurvey",
        components: {
            'SurveyAge': SurveyAge,
            'SurveyInterest': SurveyInterest,
            'SurveyTheme': SurveyTheme,
        },

        props: {
            indexAnimation: Number,
            resetApp: Boolean
        },

        data() {
            return {
                index: true,
                view: '',
                age: null,
            }
        },

        methods: {
            changeView(choice) { //Als de gebruiker vanuit het begin scherm een keuze maakt, of vanuit de producten slide
                this.$store.state.currentSurvey ? this.addChoice(choice, true) :this.saveChoice(choice)
            },

            saveChoice(choice) {  //Sla de keuze op en ga door naar de volgende slide of view
                this.addChoice(choice, false);
                if (this.view === 'SurveyInterest' || this.view === 'SurveyTheme') { //Ga door naar de volgende slide(ScreenLoader)
                    this.nextSlide()
                } else {
                    this.view = 'SurveyInterest'  //Ga door naar de volgende view (SurveyInterest)
                }
            },

            addChoice(choice, loadProduct) {  //Check welke view het is en sla het antwoord bij de bijbehorende data op
                switch (this.view) {
                    case 'SurveyAge':
                        this.$store.state.ageChoice = choice
                        this.age = choice
                        this.$store.state.interestChoice = null
                        this.$store.state.themeChoice = null

                        this.$ga.event('Leeftijd', 'click', choice.text)

                        if(this.age.text === '1 - 3 jaar'){
                            this.nextSlide()
                        }
                        break;
                    case 'SurveyInterest':
                        this.$store.state.themeChoice = null
                        this.$store.state.interestChoice = choice
                        this.$ga.event('Interesse', 'click', choice.text)

                        break;
                    case 'SurveyTheme':
                        this.$store.state.interestChoice = null
                        this.$store.state.ageChoice = null
                        this.$store.state.themeChoice = choice

                        this.$ga.event('Thema', 'click', choice.theme)

                        break;
                }
                if (loadProduct) {               //Ga door naar de next slide (Als je dus vanuit de producten pagina komt)
                    this.nextSlide()
                }
            },

            nextSlide() {  //Slaat de keuzes op in de store & verander de state van de slider
                this.$store.state.transitionSlide = true
                this.$store.state.surveyStream = true
                this.$store.state.slideState = 2
            },

            resetData() {
                if(this.resetApp){
                    this.$store.state.surveyStream = null
                    this.$store.state.transitionSlide = false
                }
                this.$store.state.favorites = []
                this.age = null                       //Reset de antwoorden
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
                if (this.$store.state.currentSurvey === 'SurveyAge') {               //(Vanuit de producten pagina) Checkt welke vieuw in currentSurvey zit
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
            },
            checkReset(){
                return this.resetApp
            }
        },

        watch: {
            checkThemeChange() {
                if (this.$store.state.isActiveTheme) {  //Wanneer de gebruiker meteen naar de thema's toe wilt (vanuit de screensaver)
                    this.view = 'SurveyTheme'
                }
                else {
                    this.view = 'SurveyAge'
                }
            },

            checkReset(){
                if(this.resetApp) {
                    this.resetData()
                }
            },

            checkView() {
                this.watchView()
            }
        }
    }
</script>

<style>
    .delayAnimation {
        animation-delay: 1s !important;
    }

    .slowDown {
        animation-duration: 1s !important;
    }

    .slowDown--down {
        animation-duration: 1.5s !important;
    }

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