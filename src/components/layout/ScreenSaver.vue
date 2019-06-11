<template>
    <div v-if="this.$store.state.slideState === 1">
        <div class="screensaver__container">

            <div class="screensaver__header">
                <p class="screensaver__header__text">Ik wil dit jaar een...</p>
            </div>

            <transition
                    leave-active-class="animated bounceOutRight"
                    enter-active-class="animated bounceInLeft"
                    @before-leave="beforeLeave"
                    style="animation-delay: 0.3s"
                    mode="out-in">

                <div class="screensaver__main" :key="counter">

                    <div class="bubble__container">
                        <img class="bubble__container--speech animated rubberBandItem" style="animation-delay: 0.9s"
                             :style="{margin: legoImages[counter].speechPos}"
                             :src="legoImages[counter].speech">
                        <img class="bubble__container--bubble " src="../../assets/images/screensaver/speech-bubble.png">
                    </div>

                    <img class="screensaver__lego animated bounceInLeft"
                         :style="{marginBottom: legoImages[counter].margin}"
                         :src="legoImages[counter].url">
                </div>
            </transition>


            <div class="screensaver__tagline">
                <p class="screensaver__tagline--text">
                    Wat wil jij van Lego? Maak snel jouw verlanglijstje
                </p>
            </div>

            <div class="screensaver__footer">
                <div class="screensaver__footer--filler"></div>
                <div class="screensaver__footer--hand animated tada infinite" style=" animation-duration: 3s;">
                    <img src="../../assets/images/layout/touch.png">
                </div>
                <div @click="toThemes" class="screensaver__footer--text">
                    <div style="cursor: pointer" class="screensaver__footer--text-wrapper">
                        <p class="screensaver__footer--title">Bekijk alle thema’s</p>
                        <div class="screensaver__footer--button">
                            <img class="animated" src="../../assets/images/layout/activity-icon-02.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ScreenSaver",

        data() {
            return {
                counter: 0,
                transition: true,
                legoImages: [
                    {
                        url: require('../../assets/images/screensaver/lego-head-girl.png'),
                        speech: require('../../assets/images/screensaver/plant.png'),
                        margin: '120px',
                        speechPos: '80px 51px 55px 45px'
                    },
                    {
                        url: require('../../assets/images/screensaver/lego-head-mummy.png'),
                        speech: require('../../assets/images/screensaver/skateboard.png'),
                        margin: '166px',
                        speechPos: '135px 45px 85px 45px'
                    },
                    {
                        url: require('../../assets/images/screensaver/lego-head-mexican-wrestler.png'),
                        speech: require('../../assets/images/screensaver/cub.png'),
                        margin: '166px',
                        speechPos: '89px 56px 51px 54px'
                    }
                ]
            }
        },

        methods: {
            increment() {
                //Elke 3 seconden verandert de Lego afbleeding
                let v = this;
                setInterval(function () {
                    v.counter === 2 ? v.counter = 0 : v.counter++
                }, 3000)
            },

            beforeLeave: function (el) {
                //Dit zorgt ervoor dat de speechbuble iets later uit het scherm verdwijnt
                let test = el.querySelector('.screensaver__lego');
                test.classList.remove('animated', 'bounceInLeft');
                test.classList.add('animated', 'bounceOutRight');
                test.setAttribute('style', 'animation-delay: -0.1s');
            },

            toThemes() {
                //Laadt de SurveyTheme component inplaatst van de SurveyAge component
                this.$store.state.isActiveTheme = true
            }
        },

        mounted () {
            this.increment();
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Ubuntu');

    .screensaver__container {
        overflow: hidden;
        height: 930px;
        font-family: BlueSheepLego, 'sans-serif';
    }

    .screensaver__header {
        height: 72px;
    }

    .screensaver__header__text {
        font-size: 72px;
        color: white;
        padding: 0;
        margin: 0;
    }

    .screensaver__main {
        height: 638px;
        justify-content: center;
        align-items: center;
    }

    .screensaver__lego {
        margin-top: 128px;
    }

    .bubble__container {
        position: absolute;
        width: 100%;
    }

    .bubble__container--bubble {
        animation: speech 0.5s ease-in-out;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation-delay: 0.4s;
        transform: translate(+25%, +25%) scale(0);
    }

    .rubberBandItem {
        -webkit-animation-name: rubberBandItem;
        animation-name: rubberBandItem;
    }

    .bubble__container--speech {
        position: absolute;
        z-index: 1;
    }

    .bubble__container--bubble {
        margin-top: 30px;
        margin-right: 750px;
        width: 250px;
        height: 250px;
    }

    .screensaver__tagline {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        font-family: 'Ubuntu', 'sans-serif';
        background: url('../../assets/images/layout/separator.png') no-repeat 100% center;
        background-size: contain;
        width: 1587px;
    }

    .screensaver__tagline--text {
        font-size: 28px;
        font-weight: 500;
        padding: 0;
        margin: 0;
        color: white;
        width: 100%;
    }

    .screensaver__footer {
        width: 1587px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .screensaver__footer--filler, .screensaver__footer--hand, .screensaver__footer--text {
        flex: 1;
    }

    .screensaver__footer--hand {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .screensaver__footer--text {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        height: 197px;
        margin: 0 auto;
    }

    .screensaver__footer--text-wrapper {
        font-family: 'Ubuntu', 'sans-serif';
        font-size: 25px;
        color: #ffc600;
        text-decoration: none;
        justify-content: space-between;
        display: flex;
        flex-direction: row;
        margin-right: -100px;
    }

    .screensaver__footer--title {
        margin-right: 23px;
    }

    .screensaver__footer--button {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 72px;
        height: 72px;
        background: #ffc600;
    }

    /*Animations:*/
    .bounce {
        animation-name: bounce;
        transform-origin: center bottom;
    }


    @keyframes bounce {
        from,
        20%,
        53%,
        80%,
        to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translate3d(0, 0, 0);
        }

        40%,
        53% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -30px, 0);
        }
    }

    @keyframes speech {
        0% {
            transform: translate(+55%, +55%) scale(0);
        }
        100% {
            transform: translate(0%, 0%) scale(1);
        }
    }

    @keyframes rubberBandItem {
        from {
            opacity: 0;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }

        30% {
            -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
        }

        40% {
            -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
        }

        50% {
            -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
        }

        65% {
            -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
        }

        75% {
            -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
        }

        to {
            opacity: 1;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
</style>