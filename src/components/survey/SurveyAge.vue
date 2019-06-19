<template>
    <div>
        <div class="survey__subject">
            <p class="survey__subject__text">Hoe oud ben je?</p>
        </div>

        <div class="survey__filler"></div>

        <div class="survey__age__container">
            <div class="survey__age__wrapper" v-for="(legoAge, indexAge) in this.$store.state.ages"
                 :key="indexAge + 'SA'">
                <div :style="{animationDelay: '1.' + indexAge + 's'}"
                     class="animated survey__age__images flipInY" style="animation-duration: 1.7s;">
                    <div :class="legoAge.text" @click="$parent.changeView(legoAge)">
                        <img class="survey__age__lego__img"
                             :src="legoAge.url" :class="legoAge.text"
                             :style="{margin: legoAge.pos}">
                        <img src="../../assets/images/layout/bitmap.png">
                    </div>
                </div>
                <p class="animated flipInX"
                   :style="{animationDelay: '2.' + indexAge + 's'}"
                   style=" animation-duration: 1s;">
                    {{legoAge.text}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SurveyAge",
    }
</script>

<style scoped>
    .survey__filler {
        height: 136px;
    }

    .survey__age__container {
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

    .survey__age__lego__img {
        position: absolute;
        z-index: 1;
    }

    .survey__age__images {
        cursor: pointer;
    }

    .survey__age__wrapper {
        flex: 1 1 auto;
    }

</style>