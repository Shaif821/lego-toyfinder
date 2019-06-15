<template>
    <div :class="[{'wishlist__container--open' : isActiveWishList}, {'wishlist__container--close' : notActiveWishList}]"
         class="wishlist__container">
        <div @click="openWishList()" style="cursor: pointer;" class="wishlist__clipboard__container">
            <div class="wishlist__clipboard">

                    <span v-if="$store.state.favorites.length > 0" :key="1">
                        <img class="wishlist__star animated fadeIn" style="animation-delay: 1s;"
                             src="../../assets/images/layout/star-icon-mini.png">

                          <div class="wishlist__star full__list--animation-wrapper">
                              <img :class="{'animate--star-lg': animate}"  alt="large star" class=" lg-star" src="../../assets/images/layout/favorited_star.png">
                              <img alt="md-star" :class="{'animate--star-md': animate}" class=" md-star" src="../../assets/images/layout/favorited_star.png">
                              <img alt="sm-star" :class="{'animate--star-sm': animate}" class="sm-star" src="../../assets/images/layout/favorited_star.png">
                          </div>
                    </span>

                <span v-else :key="2">
                          <img class="wishlist__star  wishlist__star--un animated fadeIn"
                               src="../../assets/images/layout/un)star.png">
                        <div class="wishlist__star full__list--animation-wrapper">
                          </div>
                    </span>

                <img src="../../assets/images/layout/list-icon.png">
            </div>
            <img src="../../assets/images/layout/wishlist.png">


        </div>

        <div class="wishlist__phone__container" :class="{add__shadow: isActiveWishList}">
            <div class="wishlist__phone__header">
                <img class="wishlist__phone__title__img" src="../../assets/images/layout/star.png">
                <p class="wishlist__phone__text">Maak ook een verlanglijstje</p>
            </div>

            <div class="wishlist__phone">
                <img class="wishlist__phone__legohead" src="../../assets/images/layout/lego-head.png">
                <div class="phone_contents">
                    <div v-for="(i, index) in 5" :key="index">
                        <transition enter-active-class="animated flipInX" leave-active-class="animated flipOutX"
                                    class="contain_favorite_text" mode="out-in">

                            <span class="is_favorited" :key="$store.state.favorites[i - 1]['Product Name NL']"
                                  v-if="$store.state.favorites[i - 1]">
                                    <p>{{$store.state.favorites[i - 1]['Product Name NL']}}</p>
                                    <img style="cursor: pointer" @click="removeFavorited($store.state.favorites[i - 1])"
                                         src="../../assets/images/layout/close-yellow.png">
                            </span>

                            <span :key="i + ' -not_favorited'"
                                  v-else-if="!$store.state.favorites[i - 1] && index === 0">
                                  <p class="not_favorited">Je lijstje is nog leeg</p>
                            </span>

                            <span :key="$store.state.favorites[i - 1]" v-else>
                                <p class="has_star">{{i}}</p>
                            </span>

                        </transition>

                    </div>
                </div>
                <img src="../../assets/images/layout/phone.png">


                <div class="wishlist_share" style="cursor: pointer;"
                     :class="[$store.state.favorites.length > 0 ? 'favorited' : 'un_favorited']">
                    <p @click="openShareList()" v-if="$store.state.favorites.length > 0">
                        Deel het verlanglijstje
                    </p>

                    <p v-else>
                        Deel het verlanglijstje
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "WishList",

        data() {
            return {
                isActiveWishList: false,
                notActiveWishList: false,
                animate: false,
            }
        },

        methods: {
            openWishList() {
                this.$parent.qrCode()
                if (this.isActiveWishList) {
                    this.isActiveWishList = false
                    this.notActiveWishList = true
                } else {
                    this.notActiveWishList = true
                    this.isActiveWishList = true
                }
            },

            openShareList() {
                this.$parent.shareListState()
            },

            removeFavorited(index) {
                let pos = undefined;
                if (this.$store.state.favorites.includes(index)) {
                    pos = this.$store.state.favorites.indexOf(index)
                    this.$store.state.favorites.splice(pos, 1)
                } else {
                    if (this.$store.state.favorites.length <= 4) {
                        this.starFavorite(index)
                        this.$store.state.favorites.push(index)
                    }
                }
            },

            activeAnimate() {
                let self = this;
                self.animate = true;
                setTimeout(function(){ self.animate = false; }, 1600);
            }
        },

        computed: {
          starAnimate() {
              return this.$store.state.favorites.length
          }
        },


        watch: {
            favorited(newValue) {
                if (this.$store.state.favorites.length === 5) {
                    this.notActiveWishList = true
                    this.isActiveWishList = true
                }
            },

            starAnimate(newVal, oldVal) {
                if(newVal >= oldVal) {
                    this.activeAnimate()
                }
            }
        }
    }
</script>

<style scoped>
    .wishlist__container {
        position: absolute;
        top: 0;
        width: 609px;
        transition: all 1s ease;
        right: -26.85%;
    }

    .wishlist__container--close {
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        right: -26.85%;
        animation: noWishlist 0.4s forwards;
    }

    @keyframes noWishlist {
        0% {
            right: 0;
        }
        100% {
            right: -26.85%;
        }
    }

    .wishlist__container--open {
        animation: wishlist 0.4s forwards;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both
    }

    @keyframes wishlist {
        0% {
            right: -26.85%;
        }
        100% {
            right: 0;
        }
    }

    .wishlist__clipboard__container {
        position: absolute;
        z-index: 5;
        margin-top: -10px;
        left: 0;
    }

    .wishlist__clipboard {
        margin-left: 3px;
        margin-top: 20px;
        z-index: 6;
        position: absolute;
        width: 100%;
    }

    .wishlist__star {
        z-index: 7;
        position: absolute;
        margin-top: -3px;
        margin-left: -35px;
    }

    .wishlist__star--un {
        width: 28px;
        height: 29px;
    }

    .wishlist__phone__container {
        height: 1080px;
        width: 520px;
        position: relative;
        z-index: 2;
        margin-top: -67px;
        right: 0;
        margin-left: 89px;
        background: white url('../../assets/images/layout/border-left.png') left no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: 0.3s ease-in-out;
    }

    .add__shadow {
        transition: 0.3s ease-in-out;
        box-shadow: 0 0 96px 0 rgba(0, 0, 0, 0.8);
    }

    .wishlist__phone__header {
        margin-top: 49px;
        color: #020202;
    }

    .wishlist__phone__title__img {
        position: absolute;
        left: 0;
        margin-left: 63px;
        margin-top: 37px;
    }

    .wishlist__phone__text {
        padding: 0;
        margin: 0;
        font-family: BlueSheepLego, 'sans-serif';
        font-size: 50px;
        width: 321px;
    }

    .wishlist__phone {
        margin-top: 55px;
    }

    .wishlist__phone__legohead {
        position: absolute;
        right: 0;
        margin-right: 51.3px;
        margin-top: -35px;
    }

    .phone_contents {
        height: 606px;
        width: 329px;
        position: absolute;
        z-index: 1;
        left: 50%;
        right: 50%;
        bottom: -17%;
        transform: translate(-50%, -50%);
    }

    .phone_contents div {
        border-bottom: 1px dotted #979797;
    }

    .phone_contents div, .phone_contents div p {
        height: 114px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .phone_contents div:first-child {
        background: none;
        font-size: 30px;
    }

    .phone_contents div:last-child {
        border-bottom: none;
    }

    .phone_contents div p {
        padding: 0;
        font-family: BlueSheepLego, 'sans-serif';
        line-height: 1.17;
        width: 329px;
    }

    .wishlist_share {
        left: 0;
        right: 0;
        position: absolute;
        margin-top: -31px;
        height: 120px;
        width: 520px;
        z-index: 9;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s ease-in-out;
    }

    .wishlist_share p {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120px;
        width: 520px;
        text-align: center;
        font-weight: bold;
        padding: 0;
        font-family: Ubuntu, 'sans-serif';
        font-size: 32px;
    }

    .favorited {
        transition: 0.3s ease-in-out;
        background: #ffc600 url('../../assets/images/layout/border-left.png') left no-repeat;
        box-shadow: 0 -7px 28px 0 rgba(0, 0, 0, 0.5), inset 0 -6px 0 0 #cba219;
    }

    .un_favorited {
        transition: 0.3s ease-in-out;
        background: #496078 url('../../assets/images/layout/border-left.png') left no-repeat;
        box-shadow: 0 -7px 28px 0 rgba(0, 0, 0, 0.5), inset 0 -6px 0 0 #496078;
    }

    .un_favorited p {
        color: white;
        transition: 0.3s ease-in-out;
    }

    .favorited p {
        transition: 0.3s ease-in-out;
        color: black;
    }

    .is_favorited {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 331px;
        color: black;
        font-size: 30px;
    }

    .is_favorited img {
        width: 25px;
    }

    .not_favorited {
        font-size: 30px;
        color: #297fca;
    }

    .has_star {
        color: #297fca;
        background: url('../../assets/images/layout/path-copy-3.png') no-repeat center;
    }

    .full__list--animation-wrapper {
        position: relative;
    }

    .lg-star {
        opacity: 0;
        position: absolute;
        transform: rotate(34deg) translate(100px, 30px) rotate(-240deg);
        width: 80px;
        height: 80px;

    }

    .md-star {
        opacity: 0;
        position: absolute;
        transform: rotate(34deg) translate(100px, 30px) rotate(-240deg);
        width: 59px;
        height: 59px;

    }

    .sm-star {
        opacity: 0;
        position: absolute;
        transform: rotate(34deg) translate(100px, 30px) rotate(-240deg);
        width: 43px;
        height: 43px;
    }

    .animate--star-lg {
        animation: lg-star 1.5s forwards;
    }
    .animate--star-md {
        animation: md-star 1.5s forwards;
        animation-delay: 0.3s;
    }
    .animate--star-sm {
        animation: sm-star 1.5s forwards;
        animation-delay: 0.2s;
    }


    @-webkit-keyframes lg-star {
        0% {
            opacity: 1;
            width: 80px;
            height: 80px;
            transform: rotate(34deg) translate(100px, 30px) rotate(-240deg);
        }
        /*25% {*/
        /*border: 3px solid blue;*/
        /*transform: rotate(34deg) translate(-100px, -130px) rotate(-240deg);*/
        /*}*/
        50% {
            opacity: 0.5;
            transform: rotate(600deg) translate(40px) rotate(-600deg);
        }
        100% {
            opacity: 0;
            width: 28px;
            height: 29px;
            transform: translate(-20px);
        }
    }

    @-webkit-keyframes md-star {
        0% {
            opacity: 1;
            width: 59px;
            height: 59px;
            transform: rotate(34deg) translate(100px, 30px) rotate(-240deg);
        }
        50% {
            transform: rotate(600deg) translate(40px) rotate(-600deg);
        }
        100% {
            opacity: 0;
            width: 28px;
            height: 29px;
            transform: translate(-20px);
        }
    }

    @-webkit-keyframes sm-star {
        0% {
            opacity: 1;
            width: 43px;
            height: 43px;
            transform: rotate(34deg) translate(100px, 30px) rotate(-240deg);
        }
        50% {
            transform: rotate(600deg) translate(40px) rotate(-600deg);
        }
        100% {
            opacity: 0;
            width: 28px;
            height: 29px;
            transform: translate(-20px);
        }
    }


</style>