<template>
    <div class="sharelist-container swiper-no-swiping"
         :class="[test ? 'sharelist-container__animation-open' : 'sharelist-container__animation-close']">
        <div class="sharelist-container__section-1" :class="{'move-close-button' : writeMail}">
            <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft"
                        style="cursor: pointer;">
                <img @click="closeShareList()" v-if="!writeMail" class="animated pulse infinite"
                     style="transition: 0.7s ease-in-out" src="../../assets/images/layout/close.png">
                <img @click="writeMail = false, mailResponse = false" v-else class="animated pulse infinite"
                     src="../../assets/images/layout/close-copy.png">
            </transition>
        </div>

        <div class="sharelist-container__section-2">
            <p>Deel jouw verlanglijstje</p>
        </div>

        <div class="sharelist-container__section-3">

            <div class="section-3-row" :class="[!writeMail ? 'section-3-row' : 'section-3-row-out']">
                <p class="section-3-row__title">Deel via link</p>

                <div class="section-3-row__middle section-3-row__QR-code">
                    <q-r-code :text="url"></q-r-code>
                </div>

                <p class="section-3-row__bottom-title">
                    Scan deze QR-code met je telefoon en deel de link met familie en vrienden.
                </p>
            </div>
            <div :class="[!writeMail ? 'section-3-row__border' : 'section-3-row__border-out']"
                 class="section-3-row__border">
                <p :class="{'border__text-out' : writeMail}" class="border__text">OF</p>
            </div>

            <transition mode="out-in" enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOut" :class="{'section-3-row__center' : writeMail}">
                <form :key="1" v-if="!mailResponse" @submit.prevent="sendMail()" autocomplete="off"
                      class="section-3-row"
                      @click="writeMail = true"
                      :class="{'section-3-row__center' : writeMail}">
                    <p class="section-3-row__title">Deel over de mail:</p>

                    <transition mode="out-in" enter-active-class="animated flipInX"
                                leave-active-class="animated flipOutX">
                        <input :key="1" v-if="!isSending" v-validate="'email'" data-vv-as="email" name="email_field"
                               type="text" v-model="userMail"
                               class="section-3-row__middle section-3-row__input" placeholder="Mijn emailadres">
                        <div :key="2" v-else>
                            <br>
                            <img src="../../assets/images/layout/loader.png" class="rotating">
                        </div>
                    </transition>


                    <transition mode="out-in" enter-active-class="animated flipInX"
                                leave-active-class="animated flipOutX">
                        <p :key="1" class="section-3-row__bottom-title" v-if="errors.has('email_field')">Voer een
                            geldige
                            emailadres in</p>
                        <p :key="2" v-else class="section-3-row__bottom-title">
                            Vul hierboven jouw emailadres is en druk op verstuur en ontvang direct jouw lijstje in je
                            mailbox.
                        </p>
                    </transition>
                </form>

                <div :key="2" v-else class="section-3-row" :class="{'section-3-row__center' : writeMail}">
                    <div v-if="writeMail">
                        <p class="section-3-row__title">Het is gelukt!</p>
                        <img class="section-3-row__image" src="../../assets/images/layout/thumb.png">
                        <p class="section-3-row__bottom-title">
                            Er is een mailtje verstuurt naar jouw emailadres.
                        </p>
                    </div>
                    <div v-else>
                        <p class="section-3-row__title">Er is iets misgegaan...</p>
                        <img class="section-3-row__image section-3-row__image--down"
                             src="../../assets/images/layout/thumb.png">
                        <p class="section-3-row__bottom-title">Probeer het later opnieuw.</p>
                    </div>
                </div>
            </transition>
        </div>


        <div class="sharelist-container__lego-image" :class="{'sharelist-container__lego-image-out' : writeMail}">
            <img class="lego-image__image" src="../../assets/images/layout/lego-share.png">
        </div>

        <div @click="newWishList()" class="sharelist-container__section-4">
            <p class="sharelist-container__section-4__text">Maak een nieuw lijstje</p>
        </div>
    </div>
</template>

<script>
    import QRCode from "vue-qrcode-component";
    import axios from 'axios'

    export default {
        name: "ShareList",
        components: {QRCode},
        props: {
            isOpen: Boolean,
            url: String,
        },

        data() {
            return {
                writeMail: false,
                test: true,
                userMail: '',
                mailResponse: false,
                isSending: false,
                mailFailed: false,
            }
        },

        methods: {
            closeShareList() {
                let vm = this
                this.test = false
                this.userMail = 'test'

                setTimeout(function () {
                    vm.$parent.shareListState()
                }, 1100)
            },

            newWishList() {
                this.closeShareList()
                this.$parent.removeFavorite()
            },

            sendMail() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.isSending = true
                        axios
                            .post('/mail/index.php', {
                                email: this.userMail,
                                favorites: this.$store.state.favorites,
                                url: this.url
                            })
                            .then(response => {
                                if (response) {
                                    this.isSending = false,
                                        this.userMail = ''
                                    this.mailResponse = true
                                    this.$ga.event('send mail', 'post', true)

                                }
                            })
                            .catch(error => {
                                if (error) {
                                    this.mailFailed = true
                                }
                            })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .sharelist-container {
        font-family: BlueSheepLego, 'sans-serif';
        background-color: rgba(0, 0, 0, 0.9);
        padding: 0;
        position: absolute;
        z-index: 5;
        transform: translateY(10px);
        height: 1080px;
        width: 1920px;
        margin-top: -11px;
    }

    .sharelist-container__animation-open {
        transition: all 1s ease;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation: shareListAppear 0.5s forwards;
    }

    @keyframes shareListAppear {
        0% {
            transform: translateY(10px);
        }
        100% {
            transform: translateY(-1081px);
        }
    }

    .sharelist-container__animation-close {
        top: 0;
        transition: all 1s ease;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation: shareListDisappear 0.5s forwards;
    }

    @keyframes shareListDisappear {
        0% {
            top: 0;
        }
        100% {
            top: 100%;
            margin-top: 0;
        }
    }

    .move-close-button {
        transition: 0.7s ease-in-out;
    }

    .move-close-button img {
        transition: 0.7s ease-in-out;
        margin-right: 1780px !important;
    }

    .sharelist-container__section-1 img {
        cursor: pointer;
        margin-top: 10px;
        margin-right: 55px;
    }

    .sharelist-container__section-1 {
        height: 150px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .sharelist-container__section-2 p {
        font-size: 72px;
        color: white;
        padding: 0;
        margin: 0;
    }

    .sharelist-container__section-3 {
        transition: 0.7s ease-in-out;
        font-family: Ubuntu, 'sans-serif';
        width: 100%;
        height: 594px;
        margin-top: 60px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .section-3-row {
        transition: 0.7s ease-in-out;
        flex: 960px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .section-3-row-out {
        transition: 0.7s ease-in-out;
        transform: translateX(-940px)
    }

    .section-3-row__center {
        transition: 0.7s ease-in-out;
        transform: translateX(-490px)
    }

    .section-3-row__border {
        transition: 0.7s ease-in-out;
        height: 100%;
        border: 1px solid #ffc600;
    }

    .section-3-row__border-out {
        transition: 0.7s ease-in-out;
        border: none;
    }

    .border__text {
        padding: 0;
        margin: 0;
        height: 594px;
        left: 0;
        right: 0;
        top: 50%;
        position: absolute;
        font-family: Ubuntu, 'sans-serif';
        line-height: 1.43;
        font-size: 28px;
        font-weight: 500;
        color: white;
        z-index: -10;
        transition: 0.7s ease-in-out;
    }

    .border__text-out {
        transition: 0.7s ease-in-out;
        opacity: 0;
    }

    .section-3-row__title {
        padding: 0;
        margin: 0;
        color: white;
        font-size: 28px;
    }

    .section-3-row__image {
        margin-top: 40px;
        width: 120px;
        height: 120px;
    }

    .section-3-row__image--down {
        transform: rotate(180deg);
    }

    .section-3-row__middle {
        margin-top: 60px;
        border-radius: 20px;
        width: 640px;
        background: white;
    }

    .section-3-row__QR-code {
        height: 360px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .section-3-row__input {
        font-family: Ubuntu, 'sans-serif';
        box-sizing: border-box;
        border: 4px solid #ffc600;
        height: 80px;
        font-size: 25px;
        padding-left: 34px;
    }

    .section-3-row__input::placeholder {
        color: #496078;
        opacity: 0.5;
    }

    .section-3-row__bottom-title {
        margin-top: 40px;
        color: white;
        font-size: 25px;
        width: 640px;
        line-height: 1.6;
    }

    .sharelist-container__lego-image {
        position: absolute;
        right: 0;
        top: 59%;
        z-index: -1;
        transition: 0.7s ease-in-out;
    }

    .sharelist-container__lego-image-out {
        transition: 0.7s ease-in-out;
        right: -50%;
    }

    .sharelist-container__section-4 {
        width: 100%;
        height: 120px;
        box-shadow: 0 -2px 0 0 #33a0ff, inset 0 -6px 0 0 rgba(0, 0, 0, 0.5);
        background-color: #297fca;
        margin-top: 84px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 9;
    }

    .sharelist-container__section-4__text {
        font-family: Ubuntu, 'sans-serif';
        font-size: 28px;
        font-weight: 500;
        color: white;
    }
</style>