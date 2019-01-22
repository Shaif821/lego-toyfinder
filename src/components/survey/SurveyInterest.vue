<template>
    <div>
        <div class="survey__subject">
            <p class="survey__subject__text">Wat vind je leuk?</p>
        </div>

        <div class="survey__filler"></div>

        <div class="survey__interest__container">
            <div class="survey__interest__wrapper"
                 v-for="(ageInterest, indexInterest) in $store.state.ageChoice.interest"
                 :key="indexInterest + 'ST'"
                 :style="
                 [$store.state.ageChoice.interest.length === 4 ? {flex: '0 1 calc(25% - 8px)'} :
                 ($store.state.ageChoice.interest.length === 7 ? {flex: '0 1 calc(25% - 8px)'} :
                 ($store.state.ageChoice.interest.length === 8 ? {flex: '0 1 calc(25% - 8px)'} :
                 {flex: '0 1 calc(20% - 8px)'}))]"
            >
                <div v-for="interest in $store.state.interests" @click="$parent.changeView(interest)" >
                    <div class="survey__interest__images" v-if="interest.text === ageInterest">
                        <img class="survey__interest__lego__img animated flipInY"
                             style="animation-delay: 0.4s; animation-duration: 1.5s"
                             src="../../assets/images/layout/lego-head.png" :style="{margin: interest.pos}">
                        <img class="animated flipInY" style="animation-delay: 0.4s; animation-duration: 1.5s;"
                             src="../../assets/images/layout/bitmap-small.png">
                    </div>

                    <p v-if="interest.text === ageInterest" class="survey__theme__text animated flipInX"
                       style="animation-delay: 1s; animation-duration: 2s;">
                        {{interest.text}}
                    </p>
                </div>

            </div>
        </div>

        <div class="survey__filler-2"></div>
    </div>
</template>

<script>
    export default {
        name: "SurveyInterest",
    }
</script>

<style scoped>
    .survey__filler {
        height: 62px;
    }

    .survey__interest__container {
        color: white;
        font-family: Ubuntu, sans-serif;
        font-size: 28px;
        font-weight: 500;
        height: 585px;
        width: 1380px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .survey__interest__wrapper {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .survey__interest__images {
        margin: 0;
        padding: 0;
        transition: 0.5s ease-in-out;
    }

    .survey__interest__lego__img {
        position: absolute;
        z-index: 1;
    }

    .survey__filler-2 {
        height: 100px;
    }
</style>