<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <ScreenLoader v-if="loadOrder"></ScreenLoader>
        <div v-else>
            <WishList :favorited="favorites"></WishList>
            <div class="product_list_container">
                <div class="product_list_section-1">
                    <div class="animated slideInDown">
                        <p>{{productCount}} resultaten</p>
                        <div>
                            <button class="filter_buttons filter_buttons_active"><p>Alfabetisch</p></button>
                            <button class="filter_buttons"><p>Beschikbaarheid</p></button>
                            <button class="filter_buttons"><p>Prijs</p></button>
                        </div>
                    </div>
                </div>

                <div class="filler_second"></div>

                <ProductItem :favorite="favorites" class="product_list_section-2"></ProductItem>

                <div class="product_list_section-3_filler"></div>

                <ProductButtons class="product_list_section-4 animated slideInUp"></ProductButtons>
            </div>
            <ShareList v-if="shareListActive" :isOpen="shareListActive" :url="wishListUrl" :favorites="favoritesName"></ShareList>
        </div>
    </transition>
</template>

<script>
    import WishList from './WishList'
    import ShareList from './ShareList'
    import ProductItem from './ProductItem'
    import ProductButtons from './ProductButtons'
    import ScreenLoader from './../layout/ScreenLoader'

    export default {
        name: "ProductList",
        components: {
            'WishList': WishList,
            'ScreenLoader': ScreenLoader,
            'ShareList': ShareList,
            'ProductItem' : ProductItem,
            'ProductButtons' : ProductButtons
        },

        data() {
            return {
                favorites: [],
                loadOrder: true,
                shareListActive: false,
                wishListUrl: null,
                favoritesName: [],
                productCount: null,
            }
        },

        methods: {
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

            productLength(length){
                this.productCount = length
            },

            shareListState() {
                this.shareListActive = !this.shareListActive;
            },
        },

        mounted() {
            let vm = this
            setTimeout(function () {
                vm.loadOrder = false
            }, 2500)
        },

        computed: {
            addToURL() {
                return this.favorites
            },
        },

        watch: {
            addToURL() {
                let favoritesURL = []

                for (let i = 0; i < this.favorites.length; i++) {
                    favoritesURL.push(this.favorites[i]['ProductNumber'])
                    this.favoritesName.push(this.favorites[i]['ProductNameNL'])
                }

                this.wishListUrl = 'https://shaif.nl/lego-toyfinder/' + favoritesURL.join('-')
            },
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

    .product_list_section-3_filler {
        height: 92px;
    }

</style>