<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <div>
            <WishList :favorited="favorites"></WishList>
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
                        <swiper-slide class="product_wrapper"  :class="{product_wrapper_details : selected === index}" v-for="(i, index) in 10" :key="index"
                                      :style="{animationDelay: '0.' + i + 's'}">
                            <div class="pre_product_details">
                                <div :class="{product_all_image : selected === index}">
                                    <div class="product_image_normal"
                                         :class="[selected === index ? 'product_image_details' : 'product_image']">
                                        <img src="https://s.s-bol.com/imgbase0/imagebase3/large/FC/6/2/7/1/9200000075631726.jpg">
                                    </div>
                                    <div v-if="selected !== index">
                                        <hr class="product_seperator">
                                        <p class="product_name">Bugatti Chiron</p>
                                        <p class="product_price">€399,99</p>

                                        <div class="product_buttons">
                                            <div @click="selected = index" class="product_details_button">
                                                <img src="../../assets/images/layout/magnifying-glass.png">
                                                Bekijk dit product
                                            </div>
                                            <div class="product_favorite" @click="addToFavorite(i)">
                                                <transition enter-active-class="animated bounceIn"
                                                            leave-active-class="animated bounceOut"
                                                            mode="out-in">
                                                    <img key="1" v-if="favorites.includes(i)" class="animated bounceIn"
                                                         src="../../assets/images/layout/favorited_star.png">
                                                    <img key="2" v-else src="../../assets/images/layout/un)star.png">
                                                </transition>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-else class="product_more_images">
                                        <div class="mini_images">
                                            <div class="animated fadeIn">
                                                <img src="https://s.s-bol.com/imgbase0/imagebase3/large/FC/6/2/7/1/9200000075631726.jpg">
                                            </div>
                                            <div class="animated fadeIn">
                                                <img src="https://prodimage.images-bn.com/pimages/0673419281973_p4_v5_s550x406.jpg">
                                            </div>
                                            <div class="animated fadeIn">
                                                <img src="https://cdn.webshopapp.com/shops/213470/files/227846117/image.jpg">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="selected === index" class="product_description">
                                    <div class="remove_details" @click="selected = undefined">
                                        <img  src="../../assets/images/layout/path.png">
                                        <img src="../../assets/images/layout/rectangle.png">
                                    </div>

                                    <div class="product_title">
                                        <h1>De Grote Zaal van Zweinstein™</h1>
                                        <p>Harry Potter™</p>
                                    </div>

                                    <div class="product_toy_details">
                                        <p>
                                            Reis naar LEGO® Harry Potter™ 75954 De Grote Zaal van Zweinstein™ voor
                                            onvergetelijke magische avonturen! Kom bijeen in de Grote Zaal voor het
                                            banket en de Sorteerceremonie en pak vervolgens je toverstok voor een duel
                                            met Draco Malfidus™. Beklim de bewegende trappen om de toren met de Grote
                                            Trap te verkennen, leer de kunst van toverdrankjes maken in het klaslokaal,
                                            ontdek de steeds veranderende reflecties in de Spiegel van Neregeb™ en help
                                            Harry, Hermelien en Ron het op te nemen tegen de boze Basilisk en Heer
                                            Voldemort™ te verslaan!
                                        </p>
                                    </div>

                                    <div class="product_rest_details">
                                        <div class="details_wrapper">
                                            <p>Leeftijd</p>
                                            <p>9-14</p>
                                        </div>

                                        <div class="details_wrapper">
                                            <p>Aantal stukjes</p>
                                            <p>878</p>
                                        </div>

                                        <div class="details_wrapper">
                                            <p>Interessegebied</p>
                                            <p>Tovenaars</p>
                                        </div>
                                        <div class="details_wrapper">
                                            <p></p>
                                            <p class="price_details">€109,00</p>
                                        </div>
                                    </div>

                                    <div class="product_details_footer">
                                        <p>Voeg toe aan verlanglijstje</p>

                                        <div>
                                            <div class="product_favorite" @click="addToFavorite(i)">
                                                <transition enter-active-class="animated bounceIn"
                                                            leave-active-class="animated bounceOut"
                                                            mode="out-in">
                                                    <img :key="1" v-if="favorites.includes(i)" class="animated bounceIn"
                                                         src="../../assets/images/layout/favorited_star.png">
                                                    <img :key="2" v-else src="../../assets/images/layout/un)star.png">
                                                </transition>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>

                <div class="product_list_section-3_filler"></div>

                <div class="product_list_section-4 animated slideInUp">

                    <div @click="goToSurvey('Theme')" class="product_bottom_button product_bottom_button_active">
                        <span v-if="themeGroup">
                            {{getTheme(this.themeGroup) }}
                        </span>

                        <span v-else class="product_bottom_button product_bottom_button_active">
                            Kies een thema
                        </span>
                    </div>


                    <div @click="goToSurvey('Age')" class="product_bottom_button">
                        <span v-if="ageGroup">
                            Ik ben <span class="product_survey_choice">{{ getAge(this.ageGroup) }}</span>
                        </span>

                        <span v-else class="product_bottom_button">Wat is je leeftijd?</span>
                    </div>

                    <div @click="goToSurvey('Interest')" class="product_bottom_button">
                        <span v-if="interestGroup"> Ik hou van
                            <span class="product_survey_choice">{{ getInterest(this.interestGroup) }}</span>
                        </span>
                        <span v-else class="product_bottom_button">Wat vind je leuk?</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import WishList from './WishList'

    export default {
        name: "ProductList",
        components: {'WishList' : WishList},

        data() {
            return {
                swipeOptions: {
                    speed: 900,                    //De snelheid
                    slidesPerView: 3.5,         //Hiermee wordt automatisch bepaald hoeveel slides er
                    preventClicks: true,
                    preventClicksPropagation: false,
                    onClick: (swiper, event) => {
                        this.test(swiper, event)
                    }
                },
                spaceBetween: 30,
                ageGroup: null,
                interestGroup: null,
                themeGroup: null,
                favorites: [],
                selected: undefined
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

            test() {
                alert('test')
            },

            goToSurvey(survey) {
                this.$store.state.isActiveLoader = false;
                this.$store.state.currentSurvey = survey
                this.$store.state.currentState = 'State-4'

                // this.$store.state.isActiveProducts = false
            },

            addToFavorite(index) {
                if (this.favorites.includes(index)) {
                    let pos = this.favorites.findIndex(x => x.id === index);
                    this.favorites.splice(pos, 1);
                }
                else {
                    if (this.favorites.length <= 4) {
                        this.favorites.push(index)
                    }
                }
            },

            // revealProductDetails(index) {
            //
            // }
        },

        mounted() {
            if (this.$store.state.ageChoice !== null) {
                this.ageGroup = this.$store.state.ageChoice
            }
            if (this.$store.state.interestChoice !== null) {
                this.interestGroup = this.$store.state.interestChoice
            }
            if (this.$store.state.themeChoice !== null) {
                this.themeGroup = this.$store.state.themeChoice
            }
        },

        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper //Hiermee wordt de instantie voor mySwiper gemaakt
            },
        }
    }
</script>

<style scoped>
    @import '../../../node_modules/slick-carousel/slick/slick.css';

    .product_list_container {
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
        height: 678px !important;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        margin-left: 65px;
        transition: 0.5s ease-in-out;
        cursor: pointer;
        overflow: hidden;
    }

    .product_wrapper_details {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
        width: 1170px !important;
        transition: 0.3s ease-in-out;
        display: flex;
        flex-direction: row;
    }

    .pre_product_details {
        display: flex;
        flex-direction: row;
        width: 100%;
        transition: 0.3s ease-in-out;
    }

    .product_image_normal {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s ease-in-out;
    }

    .product_all_image {
        margin-left: 20px;
        width: 500px;
        height: 676px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        transition: 0.3s ease-in-out;
    }

    .product_more_images {
        width: 100%;
        transition: 0.3s ease-in-out;
    }

    .mini_images {
        margin-top: 18px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        transition: 0.3s ease-in-out;
    }

    .mini_images div {
        border: 1px solid rgba(0, 0, 0, 0.24);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120px;
        width: 140px;
    }

    .mini_images div:first-child {
        border: 2px solid #297fca;
    }

    .mini_images img {
        max-height: 100%;
        max-width: 100%;
        height: 75%;
        width: 75%;
        transition: 0.3s ease-in-out;
    }

    .product_image {
        transition: 0.3s ease-in-out;
        height: 406px;
        width: 457px;
    }

    .product_image_details {
        margin-top: 20px;
        transition: 0.3s ease-in-out;
        height: 500px;
        width: 500px;
    }

    .product_image_details img {
        max-height: 100%;
        max-width: 100%;
        height: 90%;
        width: 90%;
        transition: 0.3s ease-in-out;
    }

    .product_image img {
        transition: 0.3s ease-in-out;
        width: 307px;
        height: 276px;
    }

    .product_description {
        position: relative;
        width: 650px;
        margin-left: 65px;
    }

    .remove_details {
        position: absolute;
        top: 0;
        right: 0;
    }

    .remove_details img:first-child {
        position: absolute;
        z-index: 1;
        margin-left: 50px;
        margin-top: 10px;
    }

    .product_title {
        margin-top: 30px;
        text-align: left;
        font-family: Ubuntu, 'sans-serif';
    }

    .product_title h1 {
        padding: 0;
        margin: 0;
        font-size: 30px;
        font-weight: 500;
        color: #020202;
        letter-spacing: normal;
    }

    .product_title p {
        font-size: 18px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: normal;
        margin: 0;
        padding: 0;
        color: #496078;
    }

    .product_toy_details {
        text-align: left;
        margin-top: 40px;
        height: 348px;
        font-family: Ubuntu, 'sans-serif';
        font-size: 16px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: 2;
        letter-spacing: normal;
        color: #020202;
    }

    .product_rest_details {
        display: flex;
        flex-direction: row;
    }

    .details_wrapper {
        margin-right: 30px;
        text-align: left;
    }

    .details_wrapper p:first-child {
        color: #496078;
        font-size: 15px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
    }

    .details_wrapper p:nth-child(2) {
        font-size: 18px;
        font-weight: bold;
        color: #020202;

    }

    .details_wrapper:last-child {
        flex: 2;
        text-align: right;
    }

    .price_details {
        font-size: 42px !important;
        font-weight: 500;
    }

    .product_details_footer {
        position: absolute;
        bottom: 0;
        height: 94px;
        width: 100%;
        box-shadow: inset 0 -6px 0 0 #2f3f50;
        border-top-left-radius: 10px;
        background-color: #496078;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .product_details_footer p{
        margin-left: 10px;
        margin-right: 10px;
        font-size:28px;
        font-weight: bold;
        color:white;
    }

    .product_details_footer div:first-child {
        width: 132px;
    }

    .product_details_footer .product_favorite {
        border: none;
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
        margin: 15px auto 0;
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