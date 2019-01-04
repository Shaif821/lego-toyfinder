<template>
    <div class="wish_list_container">
        <div style="cursor: pointer;" class="wish_list_button">
            <div class="clipBoard">
                <transition enter-active-class="animated bounceIn"
                            leave-active-class="animated bounceOut"
                            mode="out-in">
                    <img :key="1" v-if="favorited.length > 0" src="../../assets/images/layout/star-icon-mini.png">
                    <img :key="2" v-else style="width: 28px; height: 29px;" src="../../assets/images/layout/un)star.png">
                </transition>
                <img src="../../assets/images/layout/list-icon.png">
            </div>
            <img src="../../assets/images/layout/wishlist.png">
        </div>

        <div class="wishlist_phone_container">
            <div class="wishlist_title">
                <img src="../../assets/images/layout/star.png">
                <p>
                    Maak ook een verlanglijstje
                </p>
            </div>

            <div class="wishlist_phone">
                <img src="../../assets/images/layout/lego-head.png">
                <img src="../../assets/images/layout/phone.png">

                <div class="wishlist_share">
                    <p>
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
        props: ['favorited']
    }
</script>

<style scoped>
    .wish_list_container {
        position: absolute;
        top: 0;
        right: 0;
        width: 609px;
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
        margin-top: -65px;
        box-shadow: 0 0 96px 0 rgba(0, 0, 0, 0.8);
        right: 0;
        margin-left: 89px;
        background: white url('../../assets/images/layout/border-left.png') left no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
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

    .wishlist_title p{
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
        box-shadow: 0 -7px 28px 0 rgba(0, 0, 0, 0.5), inset 0 -6px 0 0 #cba219;
        background: #ffc600 url('../../assets/images/layout/border-left.png') left no-repeat;
        z-index: 9;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wishlist_share p {
        padding: 0;
        font-family: Ubuntu, 'sans-serif';
        font-size: 32px;
        color: black;
        text-align: center;
        font-weight: bold;
        width: 100%;
    }

</style>