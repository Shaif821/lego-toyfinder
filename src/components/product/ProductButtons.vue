<template>
    <div >
        <div @click="goToSurvey('SurveyTheme')" class="product_bottom_button">
            <span v-if="themeGroup">{{getTheme(this.themeGroup) }}</span>
            <span v-else>Kies een thema</span>
        </div>

        <div @click="goToSurvey('SurveyAge')" class="product_bottom_button">
            <span v-if="ageGroup">
                Ik ben <span class="product_survey_choice">{{ getAge(this.ageGroup) }}</span>
            </span>
            <span v-else>Wat is je leeftijd?</span>
        </div>

        <div @click="goToSurvey('SurveyInterest') " class="product_bottom_button">
            <span v-if="interestGroup"> Ik hou van
                <span class="product_survey_choice">{{ getInterest(this.interestGroup) }}</span>
            </span>
            <span v-else>Wat vind je leuk?</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductButtons",

        data() {
            return {
                ageGroup: null,
                interestGroup: null,
                themeGroup: null,
            }
        },

        methods: {
            getTheme(id) {
                return this.$store.state.themes[id].theme
            },
            getAge(id) {
                return this.$store.state.ages[id].text
            },
            getInterest(id) {
                return this.$store.state.interests[id].text
            },

            goToSurvey(survey) {
                this.$store.state.loadState = false
                this.$store.state.currentSurvey = survey
                this.$store.state.slideState = true
            },
        },

        mounted() {
            if (this.$store.state.ageChoice !== null) {
                this.ageGroup = this.$store.state.ageChoice
            }
            if (this.$store.state.interestChoice !== null) {
                this.interestGroup = this.$store.state.interestChoice
            }
            if (this.$store.state.themeChoice !== null) {
                this.themeGroup = this.$store.state.themeChoice
            }
        }
    }
</script>

<style scoped>
    .product_list_section-4 {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .product_bottom_button {
        height: 100%;
        flex: 1;
        background: white;
        font-size: 25px;
        text-align: center;
        font-weight: bold;
        box-shadow: inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
        transition: 0.3s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .product_bottom_button > * {
        color: #020202;
    }

    .product_bottom_button > *:first-child {
        padding: 8px;
    }

    .product_bottom_button {
        border-right: 4px solid #d9d9d9;
        /*border-left: 4px solid #d9d9d9;*/
        box-shadow: inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
    }

    .product_bottom_button:last-child {
        border-right: none;
    }

    .product_bottom_button:hover {
        border-right: 4px solid #33a0ff;
        color: white;
        background: #33a0ff;
        box-shadow: 0 -2px 0 0 #33a0ff, inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
        transition: 0.3s ease-in-out;
    }

    .product_bottom_button:hover span {
        color: white;
        transition: 0.3s ease-in-out;
    }

    .product_bottom_button:last-child:hover {
        border-right: none;
        transition: 0.3s ease-in-out;
    }

    .product_survey_choice {
        color: #496078;
    }
</style>