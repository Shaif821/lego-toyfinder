<template>
    <div>
        <!--De ref zorgt ervoor dat mySwiper een instantie wordt, waarmee je allerlei methodes kan gebruiken-->
        <!--changeSwiperIndex zorgt ervoor dat elke keer dat er een swipe plaatst vindt, de functie wordt uitgevoerd-->
        <swiper ref="mySwiper" :options="swiperOption" @slideChange="changeSwiperIndex"
                style="min-height: 1080px; padding: 0; margin: 0; overflow: hidden">
            <swiper-slide><LegoSurvey></LegoSurvey></swiper-slide>
            <swiper-slide><CardBoard :index="currentSlide"></CardBoard></swiper-slide>
            <swiper-slide><ScreenSaver></ScreenSaver></swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import ScreenSaver from './layout/ScreenSaver'
    import LegoSurvey from './survey/LegoSurvey'
    import CardBoard from './layout/CardBoard'

    export default {
        name: "SlideScreenSurvey",
        components: {
            ScreenSaver,
            LegoSurvey,
            CardBoard,
        },


        data() {
            return {
                swiperOption: {                    //De opties voor de swiper
                    direction: 'vertical',         //De richting
                    speed: 900,                    //De snelheid
                    slidesPerView: 'auto',         //Hiermee wordt automatisch bepaald hoeveel slides er
                    mousewheel: true,              //-zichtbaar zijn, dus zoveel mogelijk slides die er in passen qua hoogte
                    autoHeight: true,              //De height staat niet vast
                    navigation: {
                        nextEl: '.first-slide'     //De element die deze class bevat zorgt ervoor
                    },                             //dat de volgende slide wordt opgeroepen
                },
                currentSlide: null,
            }
        },

        methods: {
            check() {  //Deze functie zorgt ervoor dat de volgende slide verschijnt
                this.$nextTick(() => {
                    this.swiper.slideNext(500)
                })
            },

            changeSwiperIndex() {                                  //Wanneer een swipe plaatst vindt,
                this.$nextTick(() => {                             //wordt deze functie uitgevoerd
                    this.currentSlide = this.swiper.activeIndex    //Hiermee wordt currentSlide constant geupdatet als
                })                                                 //een slide verandert. De index is nodig voor de Cardboard component
            }
        },

        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper //Hiermee wordt de instantie voor mySwiper gemaakt
            }
        },

        mounted() {
            this.changeSwiperIndex();  //Tijdens het opstarten wordt gekeken welke index het huidige is
        }
    }
</script>

<style scoped>
    .carousel-cell {
        width: 100%;
    }
</style>