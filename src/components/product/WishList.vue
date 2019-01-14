<template>
    <div :class="[isActiveWishList ? 'openWishList' : 'closeWishList']" class="wish_list_container">
        <div @click="openWishList()" style="cursor: pointer;" class="wish_list_button">
            <div class="clipBoard">
                <transition enter-active-class="animated bounceIn"
                            leave-active-class="animated bounceOut"
                            mode="out-in">
                    <img :key="1" v-if="favorited.length > 0" src="../../assets/images/layout/star-icon-mini.png">
                    <img :key="2" v-else style="width: 28px; height: 29px;"
                         src="../../assets/images/layout/un)star.png">
                </transition>
                <img src="../../assets/images/layout/list-icon.png">
            </div>
            <img src="../../assets/images/layout/wishlist.png">
        </div>

        <div class="wishlist_phone_container" :class="{add_shadow: isActiveWishList}">
            <div class="wishlist_title">
                <img src="../../assets/images/layout/star.png">
                <p>
                    Maak ook een verlanglijstje
                </p>
            </div>

            <div class="wishlist_phone">
                <img src="../../assets/images/layout/lego-head.png">
                <div class="phone_contents">
                    <div v-for="(i, index) in 5" :key="index">
                        <transition enter-active-class="animated flipInX" leave-active-class="animated flipOutX"
                                    class="contain_favorite_text" mode="out-in">

                            <span class="is_favorited" :key="i + ' -favorited'" v-if="favorited[i - 1]">
                                    <p>{{favorited[i - 1]['ProductNameNL']}}</p>
                                    <img style="cursor: pointer" @click="removeFavorited(favorited[i - 1])"
                                         src="../../assets/images/layout/close-yellow.png">
                            </span>

                            <span :key="i + ' -not_favorited'" v-else-if="!favorited[i - 1] && index === 0">
                                  <p class="not_favorited">Je lijstje is nog leeg</p>
                            </span>

                            <span :key="i + '-has_star'" v-else>
                                <p class="has_star">{{i}}</p>
                            </span>

                        </transition>

                    </div>
                </div>
                <img src="../../assets/images/layout/phone.png">


                <div class="wishlist_share" style="cursor: pointer;" :class="[favorited.length > 0 ? 'favorited' : 'un_favorited']">
                    <p @click="openShareList()" v-if="favorited.length > 0">
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
        props: {
            favorited : Array,
            isOpen : Boolean
        },

        data() {
            return {
                isActiveWishList: false
            }
        },

        methods: {
            openWishList() {
                this.isActiveWishList = !this.isActiveWishList
            },

            openShareList(){
                this.$parent.shareListState()
            },

            removeFavorited(index) {
                this.$parent.addToFavorite(index)
            }
        }
    }
</script>

<style scoped>
    .wish_list_container {
        position: absolute;
        top: 0;
        width: 609px;
        transition: all 1s ease;
        right: -26.85%;
    }

    .closeWishList {
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

    .openWishList {
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

    .wish_list_button {
        position: absolute;
        z-index: 5;
        left: 0;
    }

    .wish_list_button div {
        margin-left: 3px;
        margin-top: 20px;
    }

    .clipBoard {
        z-index: 6;
        position: absolute;
        width: 100%;
    }

    .clipBoard img:first-child {
        z-index: 7;
        position: absolute;
        margin-top: -3px;
        margin-left: -15px;
    }

    .wishlist_phone_container {
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

    .add_shadow {
        transition: 0.3s ease-in-out;
        box-shadow: 0 0 96px 0 rgba(0, 0, 0, 0.8);
    }

    .wishlist_title {
        margin-top: 49px;
        color: #020202;
    }

    .wishlist_title img {
        position: absolute;
        left: 0;
        margin-left: 63px;
        margin-top: 37px;
    }

    .wishlist_title p {
        padding: 0;
        margin: 0;
        font-family: BlueSheepLego, 'sans-serif';
        font-size: 50px;
        width: 321px;
    }

    .wishlist_phone {
        margin-top: 55px;
    }

    .wishlist_phone img:first-child {
        position: absolute;
        right: 0;
        margin-right: 51.3px;
        margin-top: -35px;
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

</style>