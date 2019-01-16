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
            <div class="phone__container" >
                <div class="phone__container__text columns is-gapless is-desktop">
                    <div class="column phone__container__column product__container">
                        <div class="phone__container__products">
                            <p>test</p>
                        </div>
                        <img class="phone__container__img" src="../../assets/images/layout/phone.png">
                    </div>

                    <div class="column text__container">
                        <p class="text__title">Wenslijstje</p>

                        <p class="text__long">
                            Deze producten zijn te koop in de winkel of online op lego.be
                        </p>

                        <div class="text__image__container">
                        </div>

                        <p class="text__share">Deel jouw lijstje</p>

                        <div class="text__share__buttons">
                            <i class="fab fa-whatsapp"></i>
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
    import 'buefy/dist/buefy.css'

    export default {
        name: "ListPage",

        data() {
            return {
                confettiSettings: {
                    target: 'list__confetti',
                    max: 20,
                    size: 3,
                    props: [
                        {
                            type: "png",
                            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAAXNSR0IArs4c6QAABK1JREFUaAXNmVlsDVEYx1vUTtUWtUUsESGxhBIRqeVNCCGWB/EkJGJ7kBCR2BMh9jV4QuJB7CKE6IPYgpSHIkg9IMRaa2u7fv9mpqa3Z+bMTN3e+yW/zJnzfef7/nfmzMyZuVlZES2RSNSHDhGHpS8csfVgE/wB2R0Ykj5FISsj8pDUYofhAJTDT1gNOSHT1G0YwjQ9vsNptzLtfnAXZNr2dX1xt+RoAqNhFGTHzVM1jiTtQLarqpMG+zmwBn6BzsASqOeNCdNmTH/YCR/BtRIauWHG+8aQoIGT7agpCF8BPHBirrLtYYrz9hHTHGbDLXBN7cWwFHSGz3jHxGqT5ANc8huMT6d5C+ji/QJzTbH060fuh88g01HW0R7gjWd/N8jyvP2R2yR4AsW2gcQUQinILkAnaAXzoBhc05mZBU1MOek/CLK2Jn/oPhLcgOdhBhDXAnTnkZXBt8pWIvGW7WboY8tDzDN4YIuz+klyFr5bAz0BxI+Dl3AZpkMjj9u3SVxPkO3wC2rg5zD0v6WvMcmaZWdnfzX4a3QRd474Lmx/13AGd4xx3L7XVJRbl4TLIs25GKJVYyzoxxaB0aIIf+dkiCTcWDWgkzMkTaPgNj+6zC80ivBYR9yvcED/QHxtwHeaaGwmCrfO77jCdTRSaZrf3+B6UJEoR9xdwqZsjjO/dbscAVeZ3xVBwq0+kjWEvSB7BNaHhzWpTwC5tTKULfEJCddNgny4pkzYGajdas1SlvzrVAjTBRrPGDwc9NTTomkV1H59bJFCjUsgG2oJNbsZOBcqQOuMCeao/99LrcGgdc0L6Bi6AsGNwF0caX3dO/Tg/xRITa1pZFqbN7amJUjLT60AZSehpXVQigKovVYisCOBJQgYCq9A83kFpHw+BwlSfTgBsmXGWByt4TnoTWScMSgNnWjRq9190MGseZ3RqSMsG58GfYEl0dQN3oBe8/p5g/XkTDgdpV5HJrR5ej5Dx2TQE/U04v89tdnJA52O26A3lmYEZZShSV8DZEXw7+MTOzPAfS/U/fsKLIcCiLKeSdkPRsd2kFX7tpNFh26HC0Cn5BO49p7GMZgD3VOmzJKY2vqapnfX32D+boMjB0aAHvVaq/wC157S0KJrCtTum4dFbLKbeoUgm5/sM+4TmAsTYRc8AtdKjANS1EnRRU7hibEeNAzuiraNMBWGcfXfjKKV8f2JLwDdLfRY19bFb193lMFwD4ZDPKP4IOfX74mSgTFNodQZG2ZTTpAWe5qi+6Cz6sU64q5Qktyn3QXyOerlbn/QljHr8esxvhIugt50XJTDbVfU+i2IZEZDxGKQTTMGJHUS1wd+wE1I322W4u3hJ5xP0mjcJe4K6A41yBhQl52IOAW6t3YKqot/Jsi2BcXVmQ8hkyrl8DHeryj+PHgNehVM2zq/mj6E6GGlFdzDag7PDr49IAt1LXiGpraJoK2VshKJYcmV6Nd6R1NJd5DMMkQNANlerzL2tb7QP3K6F/fy+jKmjbBi+AhVL7i0tWiTrcwYoclCELewUqLzFYp2DyiDx1D1Y5LHpX0fcQ1Bf5PLJPYraG0/Mu3ibAIQmQ8bQG9Tx6HQNiau/y/SQwn3icsJ3gAAAABJRU5ErkJggg=="
                        },
                        {
                            type: "png",
                            weight: 0.7,
                            src: "/lego-toyfinder/img/list-block.798c64a5.png"
                        }
                    ]
                }
            }
        },

        mounted() {
            let confetti = new ConfettiGenerator(this.confettiSettings)
            // confetti.render()
        }
    }
</script>

<style scoped>
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
        margin-top: -45px;
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
    .phone__container__column{
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
        margin-bottom:-197%;
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
        font-family: Ubuntu, 'sans-serif';
        font-size: 60px;
        font-weight: 500;
        line-height: 1.33;
        color: white;
    }

    .text__long {
        margin-top: 20px;
        max-width: 400px;
        font-family: Ubuntu, 'sans-serif';
        font-size: 25px;
        font-weight: bold;
        line-height: 1.8;
        color: white;
    }

    .text__image__container {
        margin-top: 20px;
        background: white;
        border-radius: 10px;
        width: 350px;
        height: 276px;
    }

    .text__share {
        margin-top: 30px;
        font-family: Ubuntu, 'sans-serif';
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

    .hero-foot {
        width: 100%;
        z-index: 200;
        margin-top: -40px;
    }

    .footer__img__container {
        width: 100%;
    }

    /*Media Queries*/
    @media screen and (max-width: 1016px) {
        .text__container {
            transition: 0.3s ease-in-out;
            display: none;
        }
    }
</style>