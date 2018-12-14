<template>

        <div class="screensaver_container">

            <div class="screensaver_section-1">
                <p>Ik wil dit jaar een...</p>
            </div>

            <div class="screensaver_section-2">
                <div class="speech_bubble_container">
                    <img class="animated tada" :src="legoImages[counter].speech">
                    <img class="animated tada" src="../assets/images/screensaver/speech-bubble.png">
                </div>
                <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
                    <img class="screensaver_lego " :src="legoImages[counter].url">
                </transition>
            </div>

            <div class="screensaver_section-3">
                <p>Wat wil jij van Lego? Maak snel jouw verlanglijstje </p>
            </div>

            <button @click="increment()">test</button>


            <div class="screensaver_section-4">
                <router-link to="/">
                    <img class="animated pulse infinite" src="../assets/images/layout/touch.png">
                </router-link>
                <router-link to="/" class="product_button_container">
                    <div class="product_text_wrapper">
                        <p>Productoverzicht</p>
                        <div class="button_circle animated tada">
                            <img class="animated tada" src="../assets/images/layout/activity-icon-02.png">
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
</template>

<script>
    export default {
        name: "ScreenSaver",

        data() {
            return {
                counter: 0,
                legoImages: [
                    {
                        url: require('../assets/images/screensaver/lego-head-girl.png'),
                        speech: require('../assets/images/screensaver/plant.png')
                    },
                    {
                        url: require('../assets/images/screensaver/lego-head-mummy.png'),
                        speech: require('../assets/images/screensaver/skateboard.png')
                    },
                    {
                        url: require('../assets/images/screensaver/lego-head-mexican-wrestler.png'),
                        speech: require('../assets/images/screensaver/cub.png')
                    }
                ]
            }
        },

        methods: {
            increment(){
                if(this.counter === 2){
                    this.counter = 0;
                } else {
                    this.counter++
                }
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Ubuntu');

    @font-face {
        font-family: 'BlueSheepLego';
        src: url("../assets/fonts/BlueSheepLego-Regular.otf");
    }

    .screensaver_container {
        min-height: 83.5vh;
        font-family: BlueSheepLego, 'sans-serif';
    }

    .screensaver_section-1 p {
        font-size: 72px;
        color: white;
        padding: 0;
        margin: 0;
    }

    .screensaver_lego  {
        margin-top: 128px;
        /*width: 477px;*/
        /*height: 440px;*/
    }

    .speech_bubble_container {
        position: absolute;
        width: 100%;
    }

    .speech_bubble_container img:first-child {
        position: absolute;
        margin: 80px 51px 55px 45px;
        z-index: 1;
    }


    .speech_bubble_container img:nth-child(2) {
        margin-top: 30px;
        margin-right:750px;
        width: 250px;
        height: 250px;
    }

    .screensaver_section-3 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 92px auto 0;
        font-family: 'Ubuntu', 'sans-serif';
        background: url('../assets/images/layout/separator.png') no-repeat 100% center;
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
        justify-content: center;
        align-items: center;
    }

    .screensaver_section-4 > *:first-child {
        flex: 0.95;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .screensaver_section-4 > *:nth-child(2){flex: 0.9;}

    .product_button_container  {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        height: 197px;
        font-family: 'Ubuntu', 'sans-serif';
        font-size: 25px;
        color: #ffc600;
        text-decoration: none;
        margin: 0 auto;
    }

    .product_text_wrapper {
        justify-content: space-between;
        display: flex;
        flex-direction: row;
        margin-right: -100px;
    }

    .product_text_wrapper > *:first-child {margin-right: 23px;}

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