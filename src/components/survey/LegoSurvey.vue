<template>
    <div>
        <!--<p>{{this.surveyOptions[0].age}} : {{this.surveyOptions[0].interest}} : {{this.surveyOptions[0].theme}}</p>-->
        <div class="survey_container">
            <div class="survey_section-1">
                <div style="cursor: pointer;" @click="resetData()" class="first-slide">
                    <img class="animated pulse infinite" src="../../assets/images/layout/close.png">
                </div>
            </div>

            <transition enter-active-class="animated slideInRight faster"
                        leave-active-class="animated slideOutLeft faster"
                        enter mode="out-in">
                <component v-if="indexAnimation === 0" :is="view"></component>
            </transition>

            <div class="filler_3"></div>
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

        props: ['indexAnimation'],

        data() {
            return {
                index: true,
                view: '',
                test: 'test',
                surveyOptions: [{
                    age: [],
                    interest: [],
                    theme: []
                }]
            }
        },

        methods: {
            changeView(choice) {
                if(this.$store.state.currentSurvey){
                    this.addNewChoice(choice)
                }
                else {
                    this.saveChoice(choice)
                }
            },

            saveChoice(choice){
                if(this.$store.state.isActiveTheme){
                    this.$store.state.themeChoice = choice
                    this.$store.state.isActiveLoader = true;
                    this.$store.state.isActiveTheme = false;
                }
                else {
                    if (this.view === 'SurveyAge') {
                        this.$store.state.ageChoice = choice
                        this.view = 'SurveyInterest'
                    }
                    else {
                        this.$store.state.interestChoice = choice
                        this.$store.state.isActiveLoader = true;
                        this.$store.state.isActiveTheme = false
                    }
                }
            },

            addNewChoice(choice){
                switch(this.$store.state.currentSurvey) {
                    case 'Age':
                        this.$store.state.ageChoice = choice
                        break;
                    case 'Interest':
                        this.$store.state.interestChoice = choice
                        break;
                    case 'Theme':
                        this.$store.state.themeChoice = choice
                        break;
                }
                this.$store.state.currentState = 'State-2'
                this.$store.state.isActiveLoader = true;
            },

            resetData(){
                this.view = 'SurveyAge'
                this.$store.state.ageChoice = null
                this.$store.state.interestChoice = null
                this.$store.state.themeChoice = null
                this.$store.state.isActiveTheme = false
                if(this.$store.state.currentState !== 'State-1'){
                    this.$parent.checkSlide(false);
                }
                this.$store.state.currentState = 'State-1'
            },


        },

        computed: {
            checkThemeChange() {
                return this.$store.state.isActiveTheme
            }
        },

        mounted() {
          if(this.$store.state.currentSurvey === 'Age'){
              this.view = 'SurveyAge'
          }
          else if (this.$store.state.currentSurvey === 'Interest') {
              this.view = 'SurveyInterest'
          }
          else if (this.$store.state.currentSurvey === 'Theme') {
              this.view = 'SurveyTheme'
          }
          else {
              this.view = 'SurveyAge'
          }
        },

        watch: {
            checkThemeChange(){
                if(this.$store.state.isActiveTheme){
                    this.view = 'SurveyTheme'
                }
            }
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
        cursor: pointer;
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