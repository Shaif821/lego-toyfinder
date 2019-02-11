<template>
    <div @click="fullScreen()" id="SlideScreen" class="slidescreen__container"
         :class="[this.$store.state.slideState  === 3 ? 'slidescreen__container--products' : 'slidescreen__container--normal']"
         style="padding: 0; margin: 0;">
        <div v-if="fixSlideOrder === 0">{{moveSlide()}}</div>

        <!--De ref zorgt ervoor dat mySwiper een instantie wordt, waarmee je allerlei methodes kan gebruiken-->
        <!--changeSwiperIndex zorgt ervoor dat elke keer dat er een swipe plaatst vindt, de functie wordt uitgevoerd-->
        <swiper ref="mySwiper" :options="swiperOption" style="height: 1080px; padding: 0; margin: 0; overflow: hidden;">

            <swiper-slide class="swiper__slide--no-swiping">
                <LegoSurvey  :indexAnimation="currentSlide"></LegoSurvey>
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
                <transition v-else-if="this.$store.state.slideState = 3" leave-active-class="animated fadeOut"
                            enter-active-class="animated fadeIn"
                            mode="out-in">
                    <ProductList></ProductList>
                </transition>
            </swiper-slide>

        </swiper>
    </div>
</template>

<script>
    const ScreenLoader = () => import('./layout/ScreenLoader')
    const ProductList = () => import('./product/ProductList')
    import ScreenSaver from './layout/ScreenSaver'
    import LegoSurvey from './survey/LegoSurvey'

    const CardBoard = () => import('./layout/CardBoard')
    import 'swiper/dist/css/swiper.css'

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
                    autoHeight: true,              //De height staat niet vast
                    resistanceRatio: 0.15,
                    preventClicks: true,
                    preventClicksPropagation: true,
                    preloadImages: true,
                    isFullScreen: false,
                    idle: false,
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
                    this.currentSlide = this.swiper.activeIndex    //Hiermee wordt currentSlide constant geupdatet als de slider verandert /* werkt opeens niet meer, maar blijkbaar ook niet nodig?*/
                    if (!this.$store.state.isActiveTheme) {
                        this.swiper.slideTo(2, time, false);   //Naar de screensaver
                    } else {
                        this.swiper.slideTo(0, time, false); //naar de survey
                    }
                })
                this.fixSlideOrder = 1;
            },

            toSurvey() {
                if (this.isFullScreen) { //Als de pagina in fullscreen weergegeven wordt
                    this.$nextTick(() => {
                        this.$store.state.loadSurvey = true
                        this.swiper.slideTo(0, 1500, false);    //Scroll dan naar de survey pagina toe
                        let v = this
                        setTimeout(function () {
                            v.$store.state.slideState = 4       //En verander de state
                        }, 1550)
                    })
                }
            },

            fullScreen() {  //Deze functie zorgt ervoor dat, zodra er geklikt wordt op de scherm, de pagina in volledige weergave wordt getoond.
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

            idleTimer() {
                let t;
                //window.onload = resetTimer;
                window.onmousemove = resetTimer; // catches mouse movements
                window.onmousedown = resetTimer; // catches mouse movements
                window.onclick = resetTimer;     // catches mouse clicks
                window.onscroll = resetTimer;    // catches scrolling
                window.onkeypress = resetTimer;  //catches keyboard actions

                function reload() {
                    window.location = self.location.href;  //Reloads the current page
                }

                function resetTimer() {
                    clearTimeout(t);
                    t = setTimeout(reload, 300000);  // time is in milliseconds (1000 is 1 second)
                }
            }

        },

        mounted() {
            this.idleTimer()
        },

        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper //Hiermee wordt de instantie voor mySwiper gemaakt
            },

            checkLoadState() {
                return this.$store.state.slideState   //Checkt de slideState
            },
        },

        watch: {
            checkLoadState() {
                if (this.$store.state.slideState === 1) {
                    this.$nextTick(() => {
                        this.swiper.slideTo(2, 1500, false); //Checkt de slideState
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .slidescreen__container {
        overflow: hidden;
    }

    .slidescreen__container--normal {
        background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    }

    .slidescreen__container--products {
        background-image: radial-gradient(circle at 49% 42%, #edf5f7, #edf5f7);

    }
</style>