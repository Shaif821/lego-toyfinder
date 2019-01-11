<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <ScreenLoader v-if="loadOrder"></ScreenLoader>
        <div v-else>
            <WishList :favorited="favorites"></WishList>
            <div class="product_list_container">
                <div class="product_list_section-1">
                    <div class="animated slideInDown">
                        <p>{{shortProducts.length}} resultaten</p>
                        <div>
                            <button class="filter_buttons filter_buttons_active"><p>Alfabetisch</p></button>
                            <button class="filter_buttons"><p>Beschikbaarheid</p></button>
                            <button @click="filterPrice()" class="filter_buttons"><p>Prijs</p></button>
                        </div>
                    </div>
                </div>

                <div class="filler_second"></div>

                <div class="product_list_section-2">
                    <swiper :options="swipeOptionsProduct" style="width: 1920px;">
                        <swiper-slide class="product_wrapper animated zoomIn"
                                      :class="{product_wrapper_details : selected === index}"
                                      v-for="(i, index) in shortProducts" :key="index"
                                      :style="{animationDelay: '0.' + index + 's'}">
                            <div v-if="testImage(i['ProductNumber']) !== false" class="pre_product_details swiper-lazy">

                                <div :class="{product_all_image : selected === index}">

                                    <div class="product_image_normal"
                                         :class="[selected === index ? 'product_image_details' : 'product_image']">

                                        <transition enter-active-class="animated zoomIn"
                                                    leave-active-class="animated zoomOut" mode="out-in">
                                            <img class="swiper-lazy" v-if="selectImage === i['ProductNumber']" :key="singleImage"
                                                 :src="require('../../assets/images/products/' + testImage(i['ProductNumber']) + singleImage + '.png')">
                                            <img class="swiper-lazy" v-else :key="switchImage"
                                                 :src="require('../../assets/images/products/' + testImage(i['ProductNumber']) + switchImage + '.png')">
                                        </transition>
                                    </div>

                                    <div v-if="selected !== index">
                                        <hr class="product_seperator">
                                        <p class="product_name">{{ i['ProductNameNL'] }}</p>
                                        <p class="product_price">€ {{parseFloat(i['RRP'])}}</p>

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
                                            <div @click="changeImage('box', selectImage = i['ProductNumber'])"
                                                 class="animated fadeIn mini_images_wrapper"
                                                 :class="[singleImage === '_box1_in' ? 'mini_images_active' : '' ]">
                                                <img :src="require('../../assets/images/products/' + i['ProductNumber'] + '_box1_in.png')">
                                            </div>

                                            <div @click="changeImage('prod', selectImage = i['ProductNumber'])"
                                                 :class="[singleImage === '_prod' ? 'mini_images_active' : '' ]"
                                                 class="mini_images_wrapper animated fadeIn">
                                                <img :src="require('../../assets/images/products/' + i['ProductNumber'] + '_prod.png')">
                                            </div>

                                            <div class="animated fadeIn mini_images_wrapper">
                                                <img :src="require('../../assets/images/products/' + i['ProductNumber'] + '_box1_in.png')">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="selected === index" class="product_description">
                                    <div class="remove_details" @click="selected = undefined, selectImage = undefined">
                                        <img src="../../assets/images/layout/path.png">
                                        <img src="../../assets/images/layout/rectangle.png">
                                    </div>

                                    <div class="product-details-title">
                                        <div class="product_title">
                                            <h1>{{ i['ProductNameNL']}}</h1>
                                            <p>{{ i['Theme']}}</p>
                                        </div>

                                        <div class="product_toy_details">
                                            <p>{{i['ProductDescriptionNL']}}</p>
                                        </div>
                                    </div>


                                    <div class="details-favorite">
                                        <div class="product_rest_details">
                                            <div class="details_wrapper">
                                                <p>Leeftijd</p>
                                                <p>{{i['AgeMark']}}</p>
                                            </div>

                                            <div class="details_wrapper">
                                                <p>Aantal stukjes</p>
                                                <p>{{i['NumberOfPieces']}}</p>
                                            </div>

                                            <div class="details_wrapper">
                                                <p>Interessegebied</p>
                                                <p>{{i['Interesse']}}</p>
                                            </div>
                                            <div class="details_wrapper">
                                                <p></p>
                                                <p class="price_details">€ {{parseFloat(i['RRP'])}}</p>
                                            </div>
                                        </div>

                                        <div @click="addToFavorite(i)" class="product_details_footer">
                                            <p>Voeg toe aan verlanglijstje</p>

                                            <div>
                                                <div class="product_favorite">
                                                    <transition enter-active-class="animated bounceIn"
                                                                leave-active-class="animated bounceOut"
                                                                mode="out-in">
                                                        <img :key="1" v-if="favorites.includes(i)"
                                                             class="animated bounceIn"
                                                             src="../../assets/images/layout/favorited_star.png">
                                                        <img :key="2" v-else
                                                             src="../../assets/images/layout/un)star.png">
                                                    </transition>
                                                </div>
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
                    <div @click="goToSurvey('SurveyTheme')" class="product_bottom_button">
                        <span v-if="themeGroup">
                            {{getTheme(this.themeGroup) }}
                        </span>

                        <span v-else>
                            Kies een thema
                        </span>
                    </div>

                    <div @click="goToSurvey('SurveyAge')" class="product_bottom_button">
                        <span v-if="ageGroup">
                            Ik ben <span class="product_survey_choice">{{ getAge(this.ageGroup) }}</span>
                        </span>

                        <span v-else>Wat is je leeftijd?</span>
                    </div>

                    <div @click="goToSurvey('SurveyInterest') " class="product_bottom_button">
                        <span v-if="interestGroup"> Ik hou van
                            <span class="product_survey_choice">{{ getInterest(this.interestGroup) }}</span>
                        </span>
                        <span v-else>Wat vind je leuk?</span>
                    </div>
                </div>
            </div>
            <ShareList v-if="shareListActive" :isOpen="shareListActive" :url="wishListUrl"></ShareList>
        </div>
    </transition>
</template>

<script>
    import WishList from './WishList'
    import ShareList from './ShareList'
    import ScreenLoader from './../layout/ScreenLoader'
    import productsJSON from '../../assets/products/januari-2019'

    export default {
        name: "ProductList",
        components: {
            'WishList': WishList,
            'ScreenLoader': ScreenLoader,
            'ShareList': ShareList
        },

        data() {
            return {
                allProducts: productsJSON,
                shortProducts: [],
                noProduct: [],
                ageGroup: null,
                interestGroup: null,
                themeGroup: null,
                favorites: [],
                selected: undefined,
                switchImage: undefined,
                singleImage: '_box1_in',
                selectImage: undefined,
                loadOrder: true,
                shareListActive: false,
                wishListUrl: null,
                swipeOptionsProduct: {
                    preloadImages: true,
                    slidesPerView: '3.5',
                    lazy: true,
                    speed: 900, //De snelheid
                    // loop: true,
                    preventClicks: true,
                    preventClicksPropagation: false,
                    onClick: (swiper, event) => {
                        this.test(swiper, event)
                    }
                },
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

            goToSurvey(survey) {
                this.$store.state.loadState = false
                this.$store.state.currentSurvey = survey
                this.$store.state.slideState = true
            },

            addToFavorite(index) {
                let pos = undefined;
                if (this.favorites.includes(index)) {
                    pos = this.favorites.indexOf(index)
                    this.favorites.splice(pos, 1)
                }
                else {
                    if (this.favorites.length <= 4) {
                        this.favorites.push(index)
                    }
                }
            },

            removeFavorite() {
                this.favorites = []
            },

            getProducts() {
                // for (let i = 0; i < this.allProducts['products']['product'].length; i++) {
                for (let i = 0; i < this.allProducts.length; i++) {
                    try {
                        require('../../assets/images/products/' + this.allProducts[i]['ProductNumber'] + this.singleImage + '.png')
                        this.shortProducts.push(this.allProducts[i])
                    } catch (e) {
                        this.noProduct.push(this.allProducts[i])
                    }
                }
            },

            changeImage(type, id) {
                if (id) {
                    if (type === 'prod') {
                        this.singleImage = '_prod'
                    }
                    else if (type === 'box') {
                        this.singleImage = '_box1_in'
                    }
                }
                else if (type === 'reset') {
                    this.selectImage = undefined
                    this.singleImage = '_box_in'
                }
                else {
                    this.switchImage = '_box1_in'
                }
            },

            testImage(product) {
                try {
                    require('../../assets/images/products/' + product + this.singleImage + '.png')
                    return product
                    // return require('../statics/icons/svg/' + this.coinData.symbol + '.svg')
                } catch (e) {
                    return false;
                }
            },

            filterPrice() {

            },

            shareListState() {
                this.shareListActive = !this.shareListActive;
            }

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

            let vm = this
            setTimeout(function () {
                vm.loadOrder = false
            }, 2500)

            this.getProducts();
            this.changeImage();
        },

        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper //Hiermee wordt de instantie voor mySwiper gemaakt
            },

            addToURL() {
                return this.favorites
            }
        },

        watch: {
            addToURL() {
                let favoritesURL = []

                for (let i = 0; i < this.favorites.length; i++) {
                    favoritesURL.push(this.favorites[i]['ProductNumber'])
                }

                this.wishListUrl = 'http://localhost:8080/' + favoritesURL.join('-')
            }
        }
    }
</script>

<style scoped>
    @import '../../../node_modules/slick-carousel/slick/slick.css';

    .zoomOut, .zoomIn {
        -webkit-animation-duration: 0.4s;
        animation-duration: 0.4s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    .product_list_container {
        background: transparent;
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

    .mini_images_wrapper {
        border: 2px solid rgba(0, 0, 0, 0.24);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120px;
        width: 140px;
        transition: 0.3s ease-in-out;
    }

    .mini_images_active {
        transition: 0.3s ease-in-out;
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
        display: flex;
        flex-direction: column;
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

    .product-details-title {
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
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
        margin-top: 40px;
        text-align: left;
        height: auto;
        max-height: 310px;
        width: 545px;
        overflow: auto;
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
        height: 106px;

    }

    .details-favorite {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 200px;
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
        /*position: absolute;*/
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

    .product_details_footer p {
        margin-left: 10px;
        margin-right: 10px;
        font-size: 28px;
        font-weight: bold;
        color: white;
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
        height: 35px;
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
        margin-top: -5px;
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
        box-shadow: inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
        transition: 0.3s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .product_bottom_button > * {
        color: #020202;
    }

    .product_bottom_button > *:first-child {
        padding: 8px;
    }

    .product_bottom_button {
        border-right: 4px solid #d9d9d9;
        /*border-left: 4px solid #d9d9d9;*/
        box-shadow: inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
    }

    .product_bottom_button:last-child {
        border-right: none;
    }

    .product_bottom_button:hover {
        border-right: 4px solid #33a0ff;
        color: white;
        background: #33a0ff;
        box-shadow: 0 -2px 0 0 #33a0ff, inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
        transition: 0.3s ease-in-out;
    }

    .product_bottom_button:hover span {
        color: white;
        transition: 0.3s ease-in-out;
    }

    .product_bottom_button:last-child:hover {
        border-right: none;
        transition: 0.3s ease-in-out;
    }

    .product_survey_choice {
        color: #496078;
    }
</style>