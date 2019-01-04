<template>
    <div>
        <div class="screensaver_container">

            <div class="screensaver_section-1">
                <p>Ik wil dit jaar een...</p>
            </div>

            <transition enter-active-class="animated bounceInLeft"
                        leave-active-class="animated bounceOutRight"
                        @before-enter="beforeEnter"
                        @before-leave="beforeLeave"
                        style="animation-delay: 0.3s"
                        mode="out-in">

                <div class="screensaver_section-2" :key="counter">
                    <div class="speech_bubble_container bounceInLeft animated" style="animation-delay: 0.3s">
                        <img class="testen" :style="{margin: legoImages[counter].speechPos}"
                             :src="legoImages[counter].speech">
                        <img  src="../../assets/images/screensaver/speech-bubble.png">
                    </div>

                    <img class="screensaver_lego animated bounceInLeft"
                         :style="{marginBottom: legoImages[counter].margin}"
                         :src="legoImages[counter].url">
                </div>

            </transition>


            <div class="screensaver_section-3">
                <p>Wat wil jij van Lego? Maak snel jouw verlanglijstje </p>
            </div>


            <div class="screensaver_section-4" @click="increment()">
                <div></div>
                <div class="hand animated bounce infinite" style=" animation-duration: 3s;">
                    <img src="../../assets/images/layout/touch.png">
                </div>
                <div @click="toProducts"  class="product_button_container">
                    <div style="cursor: pointer" class="product_text_wrapper">
                        <p>Productoverzicht</p>
                        <div class="button_circle">
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
                let v = this;
                setInterval(function () {
                    if (v.counter === 2) {
                        v.counter = 0;
                    } else {
                        v.counter++
                    }
                }, 4000)
            },

            beforeEnter: function (el) {
                this.transition = true;
            },

            beforeLeave: function (el) {
                let test = el.querySelector('.screensaver_lego');
                test.classList.remove('animated', 'bounceInLeft');
                test.classList.add('animated', 'bounceOutRight');
                test.setAttribute('style', 'animation-delay: -0.1s');
            },

            toProducts(){
                this.$store.state.isActiveLoader = true
                this.$store.state.currentState = 'State-3'
            }

        },

        mounted: function () {
            this.increment();
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Ubuntu');

    .faster {
        animation-delay: 0.3s;
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

    .bounce {
        animation-name: bounce;
        transform-origin: center bottom;
    }

    .screensaver_container {
        overflow: hidden;
        height: 930px;
        font-family: BlueSheepLego, 'sans-serif';
    }

    .screensaver_section-1 {
        height: 72px;
    }

    .screensaver_section-1 p {
        font-size: 72px;
        color: white;
        padding: 0;
        margin: 0;
    }

    .screensaver_section-2 {
        height: 638px;
        justify-content: center;
        align-items: center;
    }

    .screensaver_lego {
        margin-top: 128px;
    }

    .speech_bubble_container {
        position: absolute;
        width: 100%;
    }

    .speech_bubble_container img:first-child {
        position: absolute;
        z-index: 1;
    }

    .speech_bubble_container img:nth-child(2) {
        margin-top: 30px;
        margin-right: 750px;
        width: 250px;
        height: 250px;
    }

    .screensaver_section-3 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        font-family: 'Ubuntu', 'sans-serif';
        background: url('../../assets/images/layout/separator.png') no-repeat 100% center;
        background-size: contain;
        width: 1587px;
    }

    .screensaver_section-3 p {
        font-size: 28px;
        font-weight: 500;
        padding: 0;
        margin: 0;
        color: white;
        width: 100%;
    }

    .screensaver_section-4 {
        width: 1587px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .screensaver_section-4 > * {
        flex: 1;
    }

    .hand {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .product_button_container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        height: 197px;
        margin: 0 auto;
    }

    .product_text_wrapper {
        font-family: 'Ubuntu', 'sans-serif';
        font-size: 25px;
        color: #ffc600;
        text-decoration: none;
        justify-content: space-between;
        display: flex;
        flex-direction: row;
        margin-right: -100px;
    }

    .product_text_wrapper > *:first-child {
        margin-right: 23px;
    }

    .button_circle {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 72px;
        height: 72px;
        background: #ffc600;
    }
</style>