<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <div>
            <div class="product_list_container">
                <div class="product_list_section-1">
                    <div class="animated slideInDown">
                        <p>212 resultaten</p>
                        <div>
                            <button class="filter_buttons filter_buttons_active"><p>Alfabetisch</p></button>
                            <button class="filter_buttons"><p>Beschikbaarheid</p></button>
                            <button class="filter_buttons"><p>Prijs</p></button>
                        </div>
                    </div>

                </div>
                <div class="filler_second"></div>

                <div class="product_list_section-2">
                    <swiper :options="swipeOptions" style="width: 1920px;">
                        <swiper-slide class="product_wrapper" v-for="i in 10" :key="i">
                            <div class="product_image">
                                <img src="https://s.s-bol.com/imgbase0/imagebase3/large/FC/6/2/7/1/9200000075631726.jpg">
                            </div>
                            <div>
                                <hr class="product_seperator">
                                <p class="product_name">Bugatti Chiron</p>
                                <p class="product_price">€399,99</p>

                                <div class="product_buttons">
                                    <div class="product_details_button">
                                        <img src="../../assets/images/layout/magnifying-glass.png">
                                        Bekijk dit product
                                    </div>
                                    <div class="product_favorite" @click="addToFavorite(i)">
                                        <transition enter-active-class="animated bounceIn"
                                                    leave-active-class="animated bounceOut"
                                                     mode="out-in">
                                            <img v-if="favorites.includes(i)" class="animated bounceIn"
                                                 src="../../assets/images/layout/favorited_star.png">
                                            <img v-else src="../../assets/images/layout/un)star.png">
                                        </transition>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>

                <div class="product_list_section-3_filler"></div>

                <div class="product_list_section-4 animated slideInUp">

                    <div @click="goToTheme()" v-if="themeGroup"
                         class="product_bottom_button product_bottom_button_active">
                        {{getTheme(this.themeGroup) }}
                    </div>
                    <div @click="goToTheme()" v-else class="product_bottom_button product_bottom_button_active">Kies een
                        thema
                    </div>

                    <div v-if="ageGroup" class="product_bottom_button">Ik ben <span class="product_survey_choice">{{ getAge(this.ageGroup) }}</span>
                    </div>
                    <div v-else class="product_bottom_button">Wat is je leeftijd?</div>

                    <div v-if="interestGroup" class="product_bottom_button">Ik hou van <span
                            class="product_survey_choice">{{ getInterest(this.interestGroup) }}</span></div>
                    <div v-else class="product_bottom_button">Wat vind je leuk?</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ProductList",

        data() {
            return {
                swipeOptions: {
                    speed: 900,                    //De snelheid
                    slidesPerView: 3.5,         //Hiermee wordt automatisch bepaald hoeveel slides er
                    freeMode: true,
                },
                ageGroup: null,
                interestGroup: null,
                themeGroup: null,
                favorites: []
            }
        },

        methods: {
            getTheme(id) {
                return this.$store.state.themes[id].theme
            },
            getAge(id) {
                return this.$store.state.ages[id].text
            },
            getInterest(id) {
                return this.$store.state.interests[id].text
            },

            goToTheme() {
                this.$store.state.loadIsActive = true
                this.$store.state.isActiveLoader = false
                this.$store.state.isActiveProducts = false
            },

            addToFavorite(index) {
                if(this.favorites.includes(index)){
                    let pos = this.favorites.findIndex(x => x.id === index);
                    this.favorites.splice(pos, 1);
                }
                else {
                    if(this.favorites.length <= 4){
                        this.favorites.push(index)
                    }
                }
            }
        },

        mounted() {
            if (this.$store.state.filterOptions[0].age[0] !== null) {
                this.ageGroup = this.$store.state.filterOptions[0].age[0]
            }
            if (this.$store.state.filterOptions[0].interest[0] !== null) {
                this.interestGroup = this.$store.state.filterOptions[0].interest[0]
            }
            if (this.$store.state.filterOptions[0].theme[0] !== null) {
                this.themeGroup = this.$store.state.filterOptions[0].theme[0]
            }
        }
    }
</script>

<style scoped>
    @import '../../../node_modules/slick-carousel/slick/slick.css';

    .product_list_container {
        background-color: #edf5f7;
        height: 1015px;
        font-family: Ubuntu, sans-serif;
    }

    .filler_first {
        height: 61px;
    }

    .filler_second {
        height: 76px;
    }

    .product_list_section-1 {
        height: 48px;
    }

    .product_list_section-1 > * {
        height: 100%;
        margin: 0 auto 0 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        justify-items: flex-start;
        align-items: center;
        min-width: 947px;
        width: 1000px;
    }

    .product_list_section-1 > *:first-child {
        color: black;
        font-weight: bold;
        font-size: 48px;
    }

    .product_list_section-1 > *:first-child > *:first-child {
        text-align: left;
    }

    .product_list_section-1 > *:first-child > *:nth-child(2) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }

    .filter_buttons {
        cursor: pointer;
        border-radius: 24px;
        font-size: 25px;
        font-weight: bold;
        color: #496078;
        text-align: center;
        text-decoration: none;
        border: 2px solid #496078;
        background: transparent;
        box-shadow: none;
        margin-right: 30px;
        transition: 0.3s ease-in-out;
    }

    .filter_buttons p {
        margin: 10px;
    }

    .filter_buttons_active {
        transition: 0.3s ease-in-out;
        box-shadow: 0 3px 0 0 rgba(47, 63, 80, 0.5);
        border: 2px solid #2f3f50;
        color: white;
        background: #496078;
    }

    .product_list_section-2 {
        height: 678px;
        width: 100%;
    }

    .first_product:first-child {
        margin-left: 60px;
    }

    .product_wrapper {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
        width: 457px !important;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        margin-left: 65px;
        transition: 0.5s ease-in-out;
    }

    .product_image {
        height: 406px;
        width: 457px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .product_image img {
        width: 307px;
        height: 276px;
    }

    .product_seperator {
        border: none;
        width: 415px;
        height: 1px;
        background-color: #f2f2f2;
    }

    .product_name {
        font-size: 26px;
        text-align: left;
        width: 397px;
        margin: 30px auto 0;
        font-weight: 500;
        color: black;
    }

    .product_price {
        margin: 55px auto 22px;
        width: 397px;
        color: black;
        font-size: 42px;
        font-weight: 500;
        text-align: right;
    }

    .product_buttons {
        width: 457px;
        height: 94px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .product_details_button {
        background: #297fca;
        color: white;
        font-size: 28px;
        width: 360px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        box-shadow: inset 0 -6px 0 0 #496078;
    }

    .product_details_button > * {
        padding: 30px;
    }

    .product_favorite {
        border-left: 2px solid #2f3f50;
        height: 100%;
        width: 97px;
        background: #496078;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: inset 0 -6px 0 0 #2f3f50;
    }

    .product_list_section-3_filler {
        height: 92px;
    }

    .product_list_section-4 {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .product_bottom_button {
        height: 100%;
        flex: 1;
        background: white;
        font-size: 25px;
        text-align: center;
        font-weight: bold;
        color: #020202;
        box-shadow: inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
        transition: 0.3s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .product_bottom_button > *:first-child {
        padding: 8px;
    }

    .product_bottom_button:nth-child(even) {
        border-right: 4px solid #d9d9d9;
        border-left: 4px solid #d9d9d9;
        box-shadow: inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
    }

    .product_bottom_button_active {
        color: white;
        background: #33a0ff;
        box-shadow: 0 -2px 0 0 #33a0ff, inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
        transition: 0.3s ease-in-out;
    }

    .product_survey_choice {
        color: #496078;
    }
</style>