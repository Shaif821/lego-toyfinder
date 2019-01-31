<template>
    <div class="list">
        <canvas id="list__confetti" class="list__canvas"></canvas>

        <section class="hero is-large list__container">
            <!-- Hero head: will stick at the top -->
            <div class="hero-head">
                <!--<nav class="navbar">-->
                <img class="navbar__logo" src="../../assets/images/layout/logo.png" alt="Logo">
                <!--</nav>-->
            </div>

            <!-- Hero content: will be in the middle -->
            <div class="phone__container">
                <div class="phone__container__text columns is-gapless is-desktop">
                    <div class="column phone__container__column product__container">
                        <div class="phone__container__products" >
                            <div class="products__text" v-for="(product, index) in products" :key="index" @mouseover="showImage(product['ProductNumber'], product['Link'])">
                                <a :href="product['Link'] !== null ? product['Link'] : '#'" target="_blank" class="products__text__link">
                                    {{product['ProductNameNL']}}
                                </a>
                            </div>
                        </div>
                        <img class="phone__container__img" src="../../assets/images/layout/phone.png">
                    </div>

                    <div class="column text__container">
                        <p class="text__title">Wenslijstje</p>

                        <p class="text__long">
                            Deze producten zijn te koop in de winkel of online op lego.be
                        </p>

                        <div class="text__image__container">
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

                        <div class="text__share__buttons">
                            <a class="social_link"
                               :href="'https://www.facebook.com/sharer/sharer.php?u=' + siteUrl">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                            <i class="fab fa-facebook-f"></i>
                            <i class="fab fa-twitter"></i>
                            <i class="fas fa-envelope"></i>
                            <i class="fas fa-link"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hero footer: will stick at the bottom -->
            <div class="hero-foot">
                <nav class="tabs">
                    <div class=" footer__img__container">
                        <figure class="image">
                            <img class="footer__img" src="../../assets/images/layout/slider-border-list.png" alt="Logo">
                        </figure>
                    </div>
                </nav>
            </div>
        </section>
    </div>
</template>

<script>
    import productsJSON from '../../assets/products/alpha-a'
    require('confetti-js')
    require('buefy/dist/buefy.min.css')

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
                siteUrl: window.location.href,
                confettiSettings: {
                    target: 'list__confetti',
                    max: 20,
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
            }
        },

        mounted() {
            this.getProducts()
            this.showImage()
            let confetti = new ConfettiGenerator(this.confettiSettings)
            confetti.render()
        }
    }
</script>

<style scoped>
    @import "https://use.fontawesome.com/releases/v5.3.1/css/all.css";

    .delayAnimation {
        animation-duration: 0.5s;
    }

    .list {
        padding: 0;
        margin: 0;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .list__canvas {
        position: relative;
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
    }

    .hero-head {
        width: 100%;
        text-align: left;
    }

    .navbar__logo {
        margin-top: 40px;
        margin-left: 40px;
    }

    .phone__container {
        margin-top: -30px;
        max-width: 1130px;
        width: 100%;
        max-height: 860px;
        height: 860px;
        z-index: 100;
        justify-content: flex-end;
        align-items: flex-end;
        display: flex;
    }

    .phone__container__text {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .phone__container__column {
        max-width: 500px;
        min-width: 300px;
        max-height: 860px;
    }

    .phone__container__img {
        max-width: 500px;
        max-height: 860px;
        width: 75%;
        height: 100%;
        margin-bottom: -20px;
    }

    .phone__container__products {
        position: relative;
        max-width: 320px;
        left: 18%;
        max-height: 860px;
        height: 860px;
        margin-bottom: -197%;
    }

    .products__text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: BlueSheepLego, 'sans-serif';
        line-height: 1.17;
        color: black;
        font-size: 30px;
        height: 12%;
        background-image: linear-gradient(to right, black 33%, rgba(155, 155, 155, 0) 0%);
        background-position: bottom;
        background-size: 20px 1px;
        background-repeat: repeat-x;
        transition: 0.5s ease-in-out;
        opacity: 1;

    }

    .products__text__link {
        color: black;
    }

    .products__text__link:visited {
        color: black;
    }

    .products__text:hover {
        transition: 0.5s ease-in-out;
        background-color: #e0e6ed;
    }

    .phone__container__column {
        height: 100%;
    }

    .text__container {
        max-width: 427px;
        min-width: 200px;
        max-height: 700px;
        width: 75%;
        height: 100%;
        margin-top: -125px !important;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .text__title {
        /*font-family: 'Ubuntu', 'sans-serif';*/
        font-size: 60px;
        font-weight: 500;
        line-height: 1.33;
        color: white;
    }

    .text__long {
        margin-top: 20px;
        max-width: 400px;
        /*font-family: 'Ubuntu', 'sans-serif';*/
        font-size: 25px;
        font-weight: bold;
        line-height: 1.8;
        color: white;
    }

    .text__image__container {
        overflow: hidden;
        margin-top: 20px;
        background: white;
        border-radius: 10px;
        width: 350px;
        height: 276px;
        display: flex;
        justify-content: center;
        align-items: center;
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
    }

    .text__share {
        margin-top: 30px;
        /*font-family: Ubuntu, 'sans-serif';*/
        font-size: 25px;
        font-weight: bold;
        line-height: 1.8;
        color: white;
    }

    .text__share__buttons {
        max-width: 280px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #ffc600;
        font-size: 35px;
        margin-top: 20px;
    }

    .social_link {
        color: #ffc600;
    }

    .social_link:visited {
        color:#ffc600;
    }

    .hero-foot {
        width: 100%;
        z-index: 200;
        margin-top: -40px;
    }

    .footer__img__container {
        width: 100%;
    }

    /*Media Queries*/
    @media screen and (max-width: 1216px) {
        .text__container {
            display: none;
        }
    }
</style>