<template>
    <div class="list">
        <modal v-if="window.width < 785" name="productItem"
               :width="350" :height="350">
            <div class="modal__container">
                <div class="modal__header">
                    <p @click="hideModal()">X</p>
                </div>
                <div class="modal__image__wrapper">
                    <i @click="prevProduct(image)" class="fas modal__arrows--left fa-arrow-left"></i>
                    <transition enter-active-class="animated bounceInRight delayAnimation"
                                leave-active-class="animated bounceOutLeft delayAnimation"
                                mode="out-in">
                        <img v-if="!noImage" class="image__product modal__image" :key="image"
                             :src="require('../../assets/images/products/' + image +  '_box1_in.png')">
                    </transition>
                    <i @click="nextProduct(image)" class="fas modal__arrows--right fa-arrow-right"></i>
                </div>
                <a :href="url !== null ? url : '#'" target="_blank"
                   class="products__text__link products__text__link--image">
                    <p>Bekijk het product</p>
                </a>
            </div>
        </modal>

        <canvas id="list__confetti" class="list__canvas"></canvas>

        <section class="list__container">
            <div class="list__header">
                <img class="navbar__logo" src="../../assets/images/layout/logo@2x.png" alt="Logo">
            </div>

            <div class="wishlist__container">

                <div class="phone__container">
                    <div class="phone__wrapper">
                        <img class="phone__container__img" src="../../assets/images/layout/phone.png">
                    </div>

                    <div v-if="window.width >= 785" class="product__wrapper">
                        <div class="products__text" v-for="(product, index) in products" :key="index"
                             @mouseover="showImage(product['ProductNumber'], product['Link'])">
                            <a :href="product['Link'] !== null ? product['Link'] : '#'" target="_blank"
                               class="products__text__link">
                                {{product['ProductNameNL']}} {{window.width}}1
                            </a>
                        </div>
                    </div>

                    <div v-else class="product__wrapper">
                        <div class="products__text" v-for="(product, index) in products" :key="index"
                             @click="imageModal(product['ProductNumber'], product['Link'])">
                            <p class="products__text__link">
                                {{product['ProductNameNL']}} {{window.width}}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="share__container">
                    <div class="share__title">
                        <h1 class="share__title__text">Wenslijstje</h1>
                        <img class="share__title__star" src="../../assets/images/layout/star.png">
                    </div>

                    <p class="share__text__content">
                        Deze producten zijn te koop in de winkel of online op lego.be.
                        <span v-if="window.width <= 785">
                            Druk op de producten om de afbeeldingen te bekijken.
                        </span>
                    </p>

                    <div class="share__image__container">
                        <a :href="url" target="_blank" class="image__wrapper">
                            <transition enter-active-class="animated bounceInLeft delayAnimation"
                                        leave-active-class="animated bounceOutRight delayAnimation"
                                        mode="out-in">
                                <img v-if="!noImage" class="image__product"
                                     :key="image"
                                     :src="require('../../assets/images/products/' + image +  '_box1_in.png')">
                            </transition>
                        </a>
                    </div>

                    <p class="text__share">Deel jouw lijstje</p>
                    <div class="share__social">
                        <a target="_blank" class="social_link"
                           :href="'https://www.facebook.com/sharer/sharer.php?u=' + siteUrl">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a target="_blank" :href="'https://twitter.com/intent/tweet?text=Bekijk%20mijn%20LEGO®%20wenslijstje:%20' + siteUrl +'%20'" class="social_link">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a target="_blank" class="social_link"
                           :href="'mailto:?subject=LEGO® Wenslijstje&body=Bekijk mijn  LEGO® Wenslijstje: ' + siteUrl"
                           title="LEGO® Wenslijstje">
                            <i class="fas fa-envelope"></i>
                        </a>
                        <i class="fas fa-link"></i>
                    </div>
                </div>
            </div>

            <!-- Hero footer: will stick at the bottom -->
            <div class="list__footer">
                <div class="footer__img__container">
                    <img class="image footer__img" src="../../assets/images/layout/slider-border-list.png" alt="Logo">
                </div>
                <div v-if="window.width < 1050" class="share__social__footer">
                    <a :href="'https://wa.me/?text=Bekijk%20mijn%20LEGO®%20wenslijstje:%20' + siteUrl +'%20'" class="social_link">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a target="_blank" class="social_link"
                       :href="'https://www.facebook.com/sharer/sharer.php?u=' + siteUrl">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a target="_blank" :href="'https://twitter.com/intent/tweet?text=Bekijk%20mijn%20LEGO®%20wenslijstje:%20' + siteUrl + '%20'" class="social_link">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a target="_blank" class="social_link"
                       :href="'mailto:?subject=LEGO® Wenslijstje&body=Bekijk mijn  LEGO® Wenslijstje: ' + siteUrl"
                       title="LEGO® Wenslijstje">
                        <i class="fas fa-envelope"></i>
                    </a>
                    <i class="fas fa-link"></i>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import productsJSON from '../../assets/products/alpha-a'

    require('confetti-js')

    export default {
        name: "ListPage",

        data() {
            return {
                allProducts: productsJSON,
                products: [],
                noProducts: [],
                image: null,
                noImage: true,
                url: null,
                window: {
                    width: 0,
                    height: 0
                },
                siteUrl: window.location.href,
                confettiSettings: {
                    target: 'list__confetti',
                    max: 7,
                    size: 3,
                    rotate: true,
                    props: [
                        {
                            type: "png",
                            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAAXNSR0IArs4c6QAABK1JREFUaAXNmVlsDVEYx1vUTtUWtUUsESGxhBIRqeVNCCGWB/EkJGJ7kBCR2BMh9jV4QuJB7CKE6IPYgpSHIkg9IMRaa2u7fv9mpqa3Z+bMTN3e+yW/zJnzfef7/nfmzMyZuVlZES2RSNSHDhGHpS8csfVgE/wB2R0Ykj5FISsj8pDUYofhAJTDT1gNOSHT1G0YwjQ9vsNptzLtfnAXZNr2dX1xt+RoAqNhFGTHzVM1jiTtQLarqpMG+zmwBn6BzsASqOeNCdNmTH/YCR/BtRIauWHG+8aQoIGT7agpCF8BPHBirrLtYYrz9hHTHGbDLXBN7cWwFHSGz3jHxGqT5ANc8huMT6d5C+ji/QJzTbH060fuh88g01HW0R7gjWd/N8jyvP2R2yR4AsW2gcQUQinILkAnaAXzoBhc05mZBU1MOek/CLK2Jn/oPhLcgOdhBhDXAnTnkZXBt8pWIvGW7WboY8tDzDN4YIuz+klyFr5bAz0BxI+Dl3AZpkMjj9u3SVxPkO3wC2rg5zD0v6WvMcmaZWdnfzX4a3QRd474Lmx/13AGd4xx3L7XVJRbl4TLIs25GKJVYyzoxxaB0aIIf+dkiCTcWDWgkzMkTaPgNj+6zC80ivBYR9yvcED/QHxtwHeaaGwmCrfO77jCdTRSaZrf3+B6UJEoR9xdwqZsjjO/dbscAVeZ3xVBwq0+kjWEvSB7BNaHhzWpTwC5tTKULfEJCddNgny4pkzYGajdas1SlvzrVAjTBRrPGDwc9NTTomkV1H59bJFCjUsgG2oJNbsZOBcqQOuMCeao/99LrcGgdc0L6Bi6AsGNwF0caX3dO/Tg/xRITa1pZFqbN7amJUjLT60AZSehpXVQigKovVYisCOBJQgYCq9A83kFpHw+BwlSfTgBsmXGWByt4TnoTWScMSgNnWjRq9190MGseZ3RqSMsG58GfYEl0dQN3oBe8/p5g/XkTDgdpV5HJrR5ej5Dx2TQE/U04v89tdnJA52O26A3lmYEZZShSV8DZEXw7+MTOzPAfS/U/fsKLIcCiLKeSdkPRsd2kFX7tpNFh26HC0Cn5BO49p7GMZgD3VOmzJKY2vqapnfX32D+boMjB0aAHvVaq/wC157S0KJrCtTum4dFbLKbeoUgm5/sM+4TmAsTYRc8AtdKjANS1EnRRU7hibEeNAzuiraNMBWGcfXfjKKV8f2JLwDdLfRY19bFb193lMFwD4ZDPKP4IOfX74mSgTFNodQZG2ZTTpAWe5qi+6Cz6sU64q5Qktyn3QXyOerlbn/QljHr8esxvhIugt50XJTDbVfU+i2IZEZDxGKQTTMGJHUS1wd+wE1I322W4u3hJ5xP0mjcJe4K6A41yBhQl52IOAW6t3YKqot/Jsi2BcXVmQ8hkyrl8DHeryj+PHgNehVM2zq/mj6E6GGlFdzDag7PDr49IAt1LXiGpraJoK2VshKJYcmV6Nd6R1NJd5DMMkQNANlerzL2tb7QP3K6F/fy+jKmjbBi+AhVL7i0tWiTrcwYoclCELewUqLzFYp2DyiDx1D1Y5LHpX0fcQ1Bf5PLJPYraG0/Mu3ibAIQmQ8bQG9Tx6HQNiau/y/SQwn3icsJ3gAAAABJRU5ErkJggg=="
                        },
                        {
                            type: "png",
                            src: "data:image/png;base64,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"
                        }
                    ]
                }
            }
        },

        methods: {
            getProducts() {
                let id = this.$parent.$router.currentRoute.params.id.split("-").join(" ")
                id = id.split(" ")

                for (let i = 0; i < id.length; i++) {
                    for (let j = 0; j < this.allProducts.length; j++) {
                        if (id[i] === this.allProducts[j]['ProductNumber']) {
                            try {
                                require('../../assets/images/products/' + this.allProducts[j]['ProductNumber'] + '_box1_in.png')
                                this.products.push(this.allProducts[j])
                            } catch (e) {
                                this.noProducts.push(1)
                            }
                        }
                    }
                }
            },

            showImage(id, link) {
                if (this.noImage && this.products.length > 0) {
                    this.image = this.products[0]['ProductNumber']
                    this.url = this.products[0]['Link']
                }
                else {
                    this.image = id
                    this.url = link
                }
                this.noImage = false
            },

            imageModal(id, link) {
                this.$modal.show('productItem', {});
                this.image = id
                this.url = link
            },

            hideModal() {
                this.$modal.hide('productItem')
            },

            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },

            nextProduct(id) {
                for (let i = 0; i < this.products.length; i++) {
                    if (this.products[i]['ProductNumber'] === id && (i + 1) !== this.products.length) {
                        this.image = this.products[i + 1]['ProductNumber']
                        this.url = this.products[i + 1]['Link']
                    }
                    else if (this.products[i]['ProductNumber'] === id && (i + 1) === this.products.length) {
                        this.image = this.products[0]['ProductNumber']
                        this.url = this.products[0]['Link']
                    }
                }
            },

            prevProduct(id) {
                for (let i = 0; i < this.products.length; i++) {
                    if (this.products[i]['ProductNumber'] === id && i !== 0) {
                        this.image = this.products[i - 1]['ProductNumber']
                        this.url = this.products[i - 1]['Link']
                    }
                    else if (i === 0) {
                        this.image = this.products[(this.products.length - 1)]['ProductNumber']
                        this.url = this.products[(this.products.length - 1)]['Link']
                    }
                }
            }
        },

        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize();
        },

        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },

        mounted() {
            this.getProducts()
            this.showImage()
            // let confetti = new ConfettiGenerator(this.confettiSettings)
            // confetti.render()
        }
    }
</script>

<style scoped>
    @import "https://use.fontawesome.com/releases/v5.3.1/css/all.css";
    @import url('https://fonts.googleapis.com/css?family=Ubuntu');

    .delayAnimation {
        animation-duration: 0.5s;
    }

    .list {
        padding: 0;
        margin: 0;
        min-height: 100vh;
        max-width: 100vw;
        background-color: rgba(0, 0, 0, 0.7);
        overflow: hidden;
    }

    .list__canvas {
        padding: 0;
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        max-width: 95vw;
        height: 100vh;
        width: 100%;
        overflow: hidden;
    }

    .list__container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        justify-content: space-between;
    }

    .list__header {
        width: 100%;
        text-align: left;
    }

    .navbar__logo {
        max-width: 100%;
        max-height: 100%;
        width: 120px;
        height: 120px;
        margin-top: 40px;
        margin-left: 40px;
    }

    .wishlist__container {
        flex: 1 1 0;
        height: auto;
        width: 70%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
        flex-wrap: wrap-reverse;
        margin-top: -110px;
    }

    .phone__container {
        position: relative;
        min-width: 500px;
        max-height: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .phone__wrapper {
        position: relative;
        margin-bottom: -46px;
        width: 100%;
        height: 100%;
    }

    .phone__container__img {
        max-width: 100%;
        max-height: 100%;
        width: 70%;
        min-width: 70%;
        min-height: 90%;
        height: 100%;
    }

    .product__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        max-width: 500px;
        width: 66%;
        height: 78%;
        position: absolute;
        left: 17%;
        top: 22%;
        transition: 0.5s ease-in-out;
        opacity: 1;
    }

    .products__text {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(to right, black 33%, rgba(155, 155, 155, 0) 0%);
        background-position: bottom;
        background-size: 20px 1px;
        background-repeat: repeat-x;
        width: 86%;
        transition: 0.5s ease-in-out;
    }

    .products__text__link {
        font-family: BlueSheepLego, 'sans-serif';
        line-height: 1.17;
        color: black;
        height: 99%;
        width: 100%;
        font-size: 25px;
        text-decoration: none;
        transition: 0.3s ease-in-out;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .products__text__link:visited {
        color: black;
    }

    .products__text__link:hover {
        background: #EAEBED;
        transition: 0.3s ease-in-out;
    }

    .share__container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        min-width: 300px;
        max-height: 100%;
        height: 100%;
        width: auto;
    }

    .share__title {
        padding: 0;
        margin-bottom: -12%;
        flex: 1;
    }

    .share__title__text {
        width: 400px;
        height: 80px;
        font-family: Ubuntu, 'sans-serif';
        font-size: 55px;
        font-weight: 500;
        text-align: center;
        color: white;
    }

    .share__title__star {
        position: absolute;
        z-index: 1;
        margin-top: -170px;
        margin-left: -225px;
    }

    .share__text__content {
        width: 400px;
        height: 90px;
        font-family: Ubuntu, 'sans-serif';
        font-size: 20px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.8;
        letter-spacing: normal;
        text-align: center;
        color: white;
    }

    .share__image__container {
        border: 1px solid transparent;
        overflow: hidden;
        width: 327px;
        height: 276px;
        border-radius: 10px;
        background-color: white;
    }

    .image__wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image__product {
        max-height: 75%;
        max-width: 75%;
        height: 100%;
        width: 100%;
    }

    .modal__container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .modal__header {
        max-height: 30px;
        width: 100%;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .modal__header p {
        font-family: Ubuntu, 'sans-serif';
        margin-top: 5px;
        margin-right: 10px;
        font-size: 25px;
        padding: 0;
        text-align: right;
    }

    .modal__image__wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }

    .modal__arrows--left {
        margin-left: 10px;
    }

    .modal__arrows--right {
        margin-right: 10px;
    }

    .modal__image {
        margin: 0 auto;
    }

    .products__text__link--image {
        font-size: 3vw;
        height: unset;
    }

    .text__share {
        margin-top: 20px;
        font-family: Ubuntu, 'sans-serif';
        font-size: 25px;
        font-weight: bold;
        line-height: 1.8;
        color: white;
    }

    .share__social {
        max-width: 280px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #ffc600;
        font-size: 35px;
    }

    .social_link {
        color: #ffc600;
    }

    .social_link:visited {
        color: #ffc600;
    }

    .list__footer {
        width: 100%;
        z-index: 200;
    }

    .footer__img__container {
        height: auto;
        width: 100%;
    }

    .footer__img {
        margin-top: 2px;
        width: 100%;
        max-width: 100%;
    }

    @media screen and (max-width: 1220px) {
        .wishlist__container {
            height: auto;
        }

        .share__container {
            min-width: 350px;
            width: 350px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .phone__container {
            min-width: 350px;
            width: 350px;
        }

        .phone__container__img {
            width: 90%;
        }

        .product__wrapper {
            left: 12.5%;
            width: 75%;
        }

        .products__text__link {
            font-size: 20px;
        }

        .products__text {
            width: 100%;
        }

        .share__title {
            flex: unset;
        }

        .share__title__text {
            font-size: 55px;
        }

        .share__text__content {
            font-size: 18px;
            width: 90%;
        }

        .share__image__container {
            width: 250px;
            height: 196px;
        }

        .text__share {
            font-size: 18px;
        }

        .share__social {
            font-size: 25px;
            width: 75%;
        }

        .share__title__star {
            margin-top: -150px;
            margin-left: -190px;
            max-width: 100%;
            max-height: 100%;
            width: 5%;
        }

        .navbar__logo {
            margin-top: 20px;
            margin-left: 20px;
        }
    }

    @media screen and (max-width: 1050px) {
        .navbar__logo {
            margin-top: 10px;
            margin-left: 10px;
            width: 100px;
            height: 100px;
        }

        .list__footer {
            z-index: 999999;
            background-image: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .share__social__footer {
            padding-bottom: 10px;
            width: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #ffc600;
            font-size: 25px;
        }

        .footer__img {
            max-height: 100%;
            max-width: 100%;
            height: 27px;
            width: 100%;
            padding: 0;
            margin-top: -30px;

        }

        .wishlist__container {
            width: 90%;
        }

        .product__wrapper {
            left: 16%;
            width: 68%;
        }

        .share__title__star {
            margin-top: -150px;
            margin-left: -190px;
        }

        .share__text__content {
            width: 85%;
        }

        .share__image__container {
            width: 70%;
            height: 40%;
        }

        .phone__container__img {
            width: 70%;
            min-width: 350px;
        }

        .footer__img {
            width: 100%;
            max-height: 100%;
            height: 10%;
        }
    }

    @media screen and (max-width: 785px) {
        .list__container {
            overflow-y: scroll;
        }

        .share__title {
            flex: 1;
        }

        .wishlist__container {
            display: flex;
            flex-direction: column-reverse;
            flex: 1 0 auto;
            /*justify-content: flex-start; !* align items in Main Axis *!*/
            /*align-items: stretch; !* align items in Cross Axis *!*/
            /*align-content: stretch; !* Extra space in Cross Axis *!*/
            margin-top: -80px;
            margin-bottom: -30px;
        }

        .list__footer {
            flex-shrink: 0;
        }

        .share__container {
            flex: 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }

        .share__title__text {
            height: unset;
        }

        .phone__container {
            flex: 2;
            width: 100%;
            max-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .phone__wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0px;
            height: 100%;
        }

        .phone__container__img {
            width: 50%;
        }

        .product__wrapper {
            left: unset;
            width: 100%;
            height: 79%;
            top: 18.1%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .products__text {
            flex: 1;
            height: 18%;
            max-width: 100%;
            width: 54%;
        }

        .products__text__link {
            font-size: 3vw;
        }

        .products__text__link:hover {
            background: none;
        }

        .share__image__container, .text__share, .share__social {
            display: none;
        }

        .share__title__text {
            width: auto;
            font-size: 10vw;
        }

        .share__title__star {
            margin-top: -24%;
            margin-left: -33%;
            width: 10%;
        }

        .share__title {
            flex: 1;
        }

        .share__text__content {
            padding-bottom: 50px;
            padding-top: 50px;
            flex: 2;
            font-size: 2.5vw;
            height: auto;
            width: 100%;
        }

        .list__canvas {
            min-width: 100vw;
        }

        .footer__img {
            width: 100%;
            height: 40px;
            max-width: 100%;
        }

    }

    @media screen and (max-width: 616px) {
        .list__container {
            position: unset;
            overflow: auto;
        }

        .list__header {
            text-align: center;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
        }

        .navbar__logo {
            width: 18%;
            height: 60%;
        }

        .wishlist__container {
            margin-top: 0;
            width: 95%;
        }

        .phone__container, .share__container {
            min-width: 150px;
        }

        .phone__wrapper {
            min-width: 50px;
        }

        .phone__container {
            min-width: 10px;
            width: 100%;
        }

        .phone__container__img {
            width: 70%;
            min-width: 100px;
        }

        .share__text__content {
            width: 85%;
            font-size: 13px;
            margin: 0;
            padding-top: 40px;
        }

        .products__text {
            width: 60%;
        }

        .products__text__link {
            font-size: 4vw;
        }

        .product__wrapper {
        }

        .share__title__star {
            margin-top: -24%;
            margin-left: -35%;
            width: 10%;
        }
    }
</style>