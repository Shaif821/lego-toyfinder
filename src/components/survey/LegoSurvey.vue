<template>
    <div>
        <div class="survey_container">
            <div class="survey_section-1">
                <div style="cursor: pointer;" class="first-slide">
                    <img class="animated pulse infinite" src="../../assets/images/layout/close.png">
                </div>
            </div>

            <transition enter-active-class="animated slideInRight faster"
                        leave-active-class="animated slideOutLeft faster"
                        enter mode="out-in">
                <component :is="view"></component>
            </transition>


            <div class="filler_3">
            </div>
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

        data() {
            return {
                index: true,
                view: 'SurveyAge',
                test: 'test',
                surveyOptions: [{
                    age: [],
                    interest: [],
                }]
            }
        },

        methods: {
            changeView(choice) {
                //Bij de if en else wordt bij beiden de indexen gepusht naar de surveyOptions object.
                //Bij de else statement wordt de surveyOptions opgeslagen in de store filterOptions.
                //Daarna wordt route aangeroepen met de indexen in de url
                if (this.view === 'SurveyAge') {
                    this.surveyOptions[0].age.push(choice);
                    this.view = 'SurveyInterest'
                }
                else {
                    this.surveyOptions[0].interest.push(choice);
                    this.$store.state.filterOptions = this.surveyOptions;
                    this.$router.push('/products/age/' + this.surveyOptions[0].age + '/interest/' + this.surveyOptions[0].interest);
                }
            },
        },

        computed: {
            checkThemeChange() {
                return this.$store.state.legoTheme
            }
        },

        watch: {
            checkThemeChange(){
                if(this.$store.state.legoTheme){
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