<template>
    <div>
        <WishList  :favorited="favorites"></WishList>
        <div class="product__list__container">

            <div class="product__list__header">
                <div class="product__list__header__wrapper">
                    <p class="product__list__header__count">{{productCount}} resultaten</p>
                    <div class="header__filter__container">
                        <button @click="changFilter('AlphaA')" class="header__filter__button"
                                :class="{header__filter__button__active : productType === 'AlphaA'}">
                            <p class="header__filter__button--text">Alfabetisch A-Z</p>
                        </button>
                        <button @click="changFilter('AlphaZ')" class="header__filter__button"
                                :class="{header__filter__button__active : productType === 'AlphaZ'}">
                            <p class="header__filter__button--text">Alfabetisch Z-A</p>
                        </button>
                        <button @click="changFilter('PriceL')" class="header__filter__button"
                                :class="{header__filter__button__active : productType === 'PriceL'}">
                            <p class="header__filter__button--text">Prijs oplopend</p>
                        </button>
                        <button @click="changFilter('PriceH')" class="header__filter__button"
                                :class="{header__filter__button__active : productType === 'PriceH'}">
                            <p class="header__filter__button--text">Prijs aflopend</p>
                        </button>
                    </div>
                </div>
            </div>

            <div class="filler_second"></div>

            <ProductItem :productSort="productType" :favorite="favorites" class="product__list__item"></ProductItem>

            <div class="product__list__filler"></div>

            <ProductButtons class="product__list__buttons"></ProductButtons>
        </div>
        <ShareList v-if="shareListActive" :isOpen="shareListActive"
                   :url="wishListUrl" :favorites="favoritesName">
        </ShareList>
    </div>
</template>

<script>
    const WishList = () => import('./WishList')
    const ShareList = () => import('./ShareList')
    import ProductItem from './ProductItem'
    const ProductButtons = () => import('./ProductButtons')

    export default {
        name: "ProductList",
        components: {
            'WishList': WishList,
            'ShareList': ShareList,
            'ProductItem': ProductItem,
            'ProductButtons': ProductButtons
        },

        data() {
            return {
                favorites: [],
                shareListActive: false,
                wishListUrl: null,
                favoritesName: [],
                productCount: null,
                productType: 'AlphaA',
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

            productLength(length) {
                this.productCount = length
            },

            shareListState() {
                this.shareListActive = !this.shareListActive;
            },

            changFilter(type) {
                this.productType = type
            }
        },

        mounted(){

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
    .zoomOut, .zoomIn {
        -webkit-animation-duration: 0.4s;
        animation-duration: 0.4s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    .product__list__container {
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

    .product__list__header {
        height: 48px;
    }

    .product__list__header__wrapper {
        height: 100%;
        margin: 0 auto 0 60px;
        display: flex;
        flex-direction: row;
        justify-items: flex-start;
        align-items: center;
    }

    .product__list__header__count {
        color: black;
        font-weight: bold;
        font-size: 48px;
    }

    .header__filter__container {
        margin-left: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
    }

    .header__filter__button {
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

    .header__filter__button--text {
        margin: 10px;
    }

    .header__filter__button__active {
        transition: 0.3s ease-in-out;
        box-shadow: 0 3px 0 0 rgba(47, 63, 80, 0.5);
        border: 2px solid #2f3f50;
        color: white;
        background: #496078;
    }

    .product__list__item {
        height: 678px;
        width: 100%;
    }

    .product__list__buttons {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .product__list__filler {
        height: 92px;
    }

</style>