<template>
    <div class="slidescreen__container" :class="[this.$store.state.legoSurveyStatus ? 'rest-background' : 'products-background']" style="padding: 0; margin: 0;">
        <div v-if="fixSlideOrder === 0">{{moveSlide()}}</div>
        <!--De ref zorgt ervoor dat mySwiper een instantie wordt, waarmee je allerlei methodes kan gebruiken-->
        <!--changeSwiperIndex zorgt ervoor dat elke keer dat er een swipe plaatst vindt, de functie wordt uitgevoerd-->
        <swiper ref="mySwiper" :options="swiperOption" @slideChange="changeSwiperIndex"
                style="height: 1080px; padding: 0; margin: 0; overflow: hidden;">
            <swiper-slide>
                <LegoSurvey v-if="this.$store.state.slideState" :indexAnimation="currentSlide"></LegoSurvey>
            </swiper-slide>

            <swiper-slide class="swiper__slide">
                <CardBoard @click.native="toSurvey()" class="swiper-no-swiping" :index="currentSlide"></CardBoard>
            </swiper-slide>

            <swiper-slide>
                <ScreenSaver v-if="this.$store.state.slideState" class="swiper-no-swiping" @click.native="toSurvey()" ></ScreenSaver>
                <ProductList v-else></ProductList>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import ProductList from './product/ProductList'
    import ScreenSaver from './layout/ScreenSaver'
    import LegoSurvey from './survey/LegoSurvey'
    import CardBoard from './layout/CardBoard'

    export default {
        name: "SlideScreen",
        components: {
            ScreenSaver, LegoSurvey,
            CardBoard, ProductList
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
                    preventClicksPropagation: false,
                    noSwipingClass: 'swiper-no-swiping',
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
                    if (!this.$store.state.isActiveTheme) {
                        this.swiper.slideTo(2, time, false);
                    } else {
                        this.swiper.slideTo(0, time, false);
                    }
                })
                this.fixSlideOrder = 1;
            },

            toSurvey() {
                this.$nextTick(() => {
                    this.swiper.slideTo(0, 900, false);
                })
            },

            changeSwiperIndex() {
                this.$nextTick(() => {                             //Wanneer een swipe plaatst vindt,  wordt deze functie uitgevoerd
                    this.currentSlide = this.swiper.activeIndex    //Hiermee wordt currentSlide constant geupdatet als
                })                                                 //een slide verandert. De index is nodig voor de Cardboard component
            },
        },

        mounted() {
            this.changeSwiperIndex();  //Tijdens het opstarten wordt gekeken welke index het huidige is
        },

        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper //Hiermee wordt de instantie voor mySwiper gemaakt
            },

            checkTheme() {
                return this.$store.state.isActiveTheme
            },

            checkCurSlide() {
                return this.currentSlide
            }
        },

        watch: {
            checkTheme() {
                if (this.$store.state.isActiveTheme) {
                    this.moveSlide(900);
                }
            },

            checkCurSlide() {
                if (this.currentSlide === 1) {
                    this.$store.state.isActiveTheme = false;
                }
            }
        }
    }
</script>

<style scoped>
    .slidescreen__container {
        height: 1080px;
        width: 1920px;
    }

    .rest-background {
        background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    }

    .products-background {
        animation: changeBackground 2.5s ease-in-out;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    @keyframes changeBackground {
        0% {
            background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
        }
        100% {
            background-image: radial-gradient(circle at 49% 42%, #edf5f7, #edf5f7);
        }
    }
</style>