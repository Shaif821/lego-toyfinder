<template>
    <div @click="fullScreen()" id="SlideScreen" class="slidescreen__container"
         :class="[this.$store.state.slideState  === 3 ? 'slidescreen__container--products' : 'slidescreen__container--normal']"
         style="padding: 0; margin: 0;">
        <div v-if="fixSlideOrder === 0">{{moveSlide()}}</div>

        <!--De ref zorgt ervoor dat mySwiper een instantie wordt, waarmee je allerlei methodes kan gebruiken-->
        <!--changeSwiperIndex zorgt ervoor dat elke keer dat er een swipe plaatst vindt, de functie wordt uitgevoerd-->
        <swiper ref="mySwiper" :options="swiperOption" style="height: 1080px; padding: 0; margin: 0; overflow: hidden;">

            <swiper-slide class="swiper__slide--no-swiping">
                <LegoSurvey @moveSlide="toScreen()" :indexAnimation="currentSlide"></LegoSurvey>
            </swiper-slide>

            <swiper-slide class="swiper__slide--no-swiping">
                <CardBoard :index="currentSlide"></CardBoard>
            </swiper-slide>

            <swiper-slide v-if="this.$store.state.slideState !== 4" class="swiper__slide--no-swiping">
                <transition v-if="this.$store.state.slideState === 1" leave-active-class="animated fadeOut"
                            enter-active-class="animated fadeIn" mode="out-in">
                    <ScreenSaver class="swiper__slide--no-swiping" @click.native="toSurvey()"></ScreenSaver>
                </transition>
                <transition v-else-if="this.$store.state.slideState === 2" leave-active-class="animated fadeOut"
                            enter-active-class="animated fadeIn" mode="out-in">
                    <ScreenLoader class="swiper__slide--no-swiping"></ScreenLoader>
                </transition>
                <transition v-else leave-active-class="animated fadeOut" enter-active-class="animated fadeIn"
                            mode="out-in">
                    <ProductList></ProductList>
                </transition>
            </swiper-slide>

        </swiper>
    </div>
</template>

<script>
    import ScreenLoader from './layout/ScreenLoader'
    import ProductList from './product/ProductList'
    import ScreenSaver from './layout/ScreenSaver'
    import LegoSurvey from './survey/LegoSurvey'
    import CardBoard from './layout/CardBoard'

    export default {
        name: "SlideScreen",
        components: {
            ScreenSaver, LegoSurvey,
            CardBoard, ProductList,
            ScreenLoader
        },

        data() {
            return {
                swiperOption: {                    //De opties voor de swiper
                    direction: 'vertical',         //De richting
                    speed: 900,                    //De snelheid
                    slidesPerView: 'auto',         //Hiermee wordt automatisch bepaald hoeveel slides er
                    mousewheel: true,              //-zichtbaar zijn, dus zoveel mogelijk slides die er in passen qua hoogte
                    autoHeight: true,              //De height staat niet vast
                    resistanceRatio: 0.15,
                    preventClicks: true,
                    preventClicksPropagation: true,
                    preloadImages: true,
                    isFullScreen: false,
                    noSwipingClass: 'swiper__slide--no-swiping',
                    onClick: (swiper, event) => {
                        this.test(swiper, event)
                    },
                    navigation: {
                        nextEl: '.first-slide'     //De element die deze class bevat zorgt ervoor
                    },                             //dat de volgende slide wordt opgeroepen
                },
                currentSlide: null,
                fixSlideOrder: 0,
            }
        },

        methods: {
            moveSlide(time) {  //Deze functie zorgt ervoor dat de volgende slide verschijnt
                this.$nextTick(() => {
                    console.log('test3')
                    this.currentSlide = this.swiper.activeIndex    //Hiermee wordt currentSlide constant geupdatet als
                    if (!this.$store.state.isActiveTheme) {
                        this.swiper.slideTo(2, time, false);
                        console.log(this.swiper.activeIndex)
                    } else {
                        console.log(this.swiper.activeIndex)
                        this.swiper.slideTo(0, time, false);
                    }
                })
                this.fixSlideOrder = 1;
            },

            toSurvey() {
                if(this.isFullScreen){
                this.$nextTick(() => {
                    this.$store.state.loadSurvey = true
                    this.swiper.slideTo(0, 1500, false);
                    let v = this
                    setTimeout(function () {
                        v.$store.state.slideState = 4
                    }, 1550)
                })
                }
            },

            toScreen() {
                this.$nextTick(() => {
                    console.log('tetetetetetetet')
                    this.swiper.slideTo(2, 1500, false);
                })
            },

            fullScreen() {
                let element = document.getElementById("SlideScreen")
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }

                this.isFullScreen = true
            },
        },


        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper //Hiermee wordt de instantie voor mySwiper gemaakt
            },

            checkLoadState() {
                return this.$store.state.slideState
            },
        },

        watch: {
            checkLoadState() {
                // if (this.$store.state.slideState === 1) {
                //     // this.$nextTick(() => {
                //     //     this.swiper.slideTo(2, 1500, false);
                //     // })
                //     this.moveSlide(1500)
                // }
            },
        }
    }
</script>

<style scoped>
    .slidescreen__container--normal {
        background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    }

    .slidescreen__container--products {
        background-image: radial-gradient(circle at 49% 42%, #edf5f7, #edf5f7);

    }
</style>