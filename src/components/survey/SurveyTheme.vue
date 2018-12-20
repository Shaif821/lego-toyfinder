<template>
    <div>
        <div class="survey_section-2">
            <p>Welk thema past bij jou?</p>
        </div>

        <div class="filler_2"></div>

        <div class="survey_section-3">
            <div>
                <!-- swiper -->
                <swiper  class="teste" :options="swiperOption">
                    <swiper-slide class="theme_image_wrapper" v-for="(legoTheme, themeIndex) in legoThemeImages" :key="themeIndex + 'STH'">
                        <img style="width: 288px; height: 376px; margin: 25px 24px 24px 22px; border: 5px solid black;" :src="legoTheme.url">
                        <img src="../../assets/images/layout/border.png">
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <div class="filler_3"></div>
    </div>
</template>

<script>

    export default {
        name: "SurveyTheme",

        data() {
            return {
                swiperOption: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
                legoThemeImages: [
                    {
                        url: require('../../assets/images/themes/architecture.jpeg'),
                        theme: 'Architecture'
                    },
                    {
                        url: require('../../assets/images/themes/batman_movie.jpeg'),
                        theme: 'THE LEGO® BATMAN MOVIE'
                    },
                    {
                        url: require('../../assets/images/themes/boost.jpeg'),
                        theme: 'BOOST'
                    },
                    {
                        url: require('../../assets/images/themes/brickheadz_starwars.jpeg'),
                        theme: 'BrickHeadz',
                        subTheme: 'Star wars'
                    },
                    {
                        url: require('../../assets/images/themes/city_arctic.jpeg'),
                        theme: 'City',
                        subTheme: 'Arctic'
                    },
                    {
                        url: require('../../assets/images/themes/classic.jpeg'),
                        theme: 'Classic'
                    },
                    {
                        url: require('../../assets/images/themes/creator_3in1.jpeg'),
                        theme: 'Creator3In1'
                    },
                    {
                        url: require('../../assets/images/themes/creator_expert.jpeg'),
                        theme: 'Creator'
                    },
                    {
                        url: require('../../assets/images/themes/disney_tangled.jpeg'),
                        theme: 'Disney'
                    },
                    {
                        url: require('../../assets/images/themes/duplo.jpeg'),
                        theme: 'Duplo'
                    },
                    {
                        url: require('../../assets/images/themes/elves.jpeg'),
                        theme: 'Elves'
                    },
                    {
                        url: require('../../assets/images/themes/friends_bigraceday_.jpeg'),
                        theme: 'friends_big_race_day'
                    },
                    {
                        url: require('../../assets/images/themes/hp.jpeg'),
                        theme: 'hp'
                    },
                    {
                        url: require('../../assets/images/themes/juniors_jurassic-world.jpeg'),
                        theme: 'juniors_jurrassic_world'
                    },
                    {
                        url: require('../../assets/images/themes/jurrasic_world.jpeg'),
                        theme: 'jurrassic_world'
                    },
                    {
                        url: require('../../assets/images/themes/lego_pirates_caribbean.jpg'),
                        theme: 'pirates_of_the_caribbean'
                    },
                    {
                        url: require('../../assets/images/themes/mindstorms.jpeg'),
                        theme: 'mindstorms'
                    },
                    {
                        url: require('../../assets/images/themes/ninjago.jpeg'),
                        theme: 'ninjago'
                    },
                    {
                        url: require('../../assets/images/themes/nocorners_ideas.jpeg'),
                        theme: 'nocorners_ideas'
                    },
                    {
                        url: require('../../assets/images/themes/speed_champions.jpeg'),
                        theme: 'speed_champions'
                    },
                    {
                        url: require('../../assets/images/themes/starwars.jpeg'),
                        theme: 'starwars'
                    },
                    {
                        url: require('../../assets/images/themes/superheroes_dc.jpeg'),
                        theme: 'superheroes_dc'
                    },
                    {
                        url: require('../../assets/images/themes/superheroes_marvel-bp.jpeg'),
                        theme: 'superheros_marvel'
                    },
                    {
                        url: require('../../assets/images/themes/technic.jpeg'),
                        theme: 'technic'
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .filler_2 {
        height: 100px;
    }

    .survey_section-3 {
        height: 495px;
        overflow: hidden;
    }

    .survey_section-3 > *:first-child {
        overflow: auto;
    }

    .teste {
        height: 100%;
    }

    .theme_image_wrapper:first-child {
        width: 100%;
        margin-left: 120px;
    }

    .theme_image_wrapper {
        padding: 0 20px;
    }

    .theme_image_wrapper img:first-child {
        position: absolute;
        z-index: 1;
    }

</style>