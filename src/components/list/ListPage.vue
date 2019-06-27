<template>
  <div class="list">
    <Snowf
      :amount="7"
      :size="50"
      :speed="4"
      :wind="2"
      :opacity="1"
      :swing="2"
      :image="require('../../assets/images/layout/legosteen.png')"
      :z-index="null"
      :resize="true"
      color="#fff"
    />
    <Snowf
      :amount="5"
      :size="50"
      :speed="2"
      :wind="-1"
      :opacity="0.8"
      :swing="10"
      :image="require('../../assets/images/layout/list-star2x.png')"
      :z-index="null"
      :resize="true"
      color="#fff"
    />
    <modal
      v-if="window.width < 785"
      name="productItem"
      :width="'70%'"
      :height="'auto'"
      :max-width="200"
      :max-height="300"
      :min-height="200"
      class="animated pulse"
    >
      <div class="modal__close__container" @click="$modal.hide('productItem')">
        <img
          class="animated pulse modal__close__image"
          style="transition: 0.7s ease-in-out"
          src="../../assets/images/layout/close.png"
        />
      </div>
      <div class="modal__container">
        <div class="filler__modal"></div>
        <div class="modal__image__wrapper">
          <i
            class="fas modal__arrows--left fa-angle-left"
            @click="prevProduct(image)"
          ></i>
          <transition
            enter-active-class="animated bounceInRight delayAnimation"
            leave-active-class="animated bounceOutLeft delayAnimation"
            mode="out-in"
          >
            <img
              v-if="!noImage"
              :key="image"
              class="image__product modal__image"
              :src="
                require('../../assets/images/products/' +
                  image +
                  '_box1_in.png')
              "
            />
          </transition>
          <i
            class="fas modal__arrows--right fa-angle-right"
            @click="nextProduct(image)"
          ></i>
        </div>
        <a
          :href="url !== null ? url : '#'"
          target="_blank"
          class="products__text__link products__text__link--image"
        >
          <p><u>Bekijk het product</u></p>
        </a>
      </div>
    </modal>

    <modal name="copyLink" :width="300" :height="70" class="animated pulse">
      <div class="copy__link__container">
        <p class="copy__link__text">De link is gekopieerd</p>
      </div>
    </modal>

    <canvas id="list__confetti" class="list__canvas"></canvas>

    <section class="list__container">
      <div class="list__header">
        <img
          class="navbar__logo"
          src="../../assets/images/layout/logo@2x.png"
          alt="Logo"
        />
        <span id="linkUrl" style="opacity: 0;">{{ siteUrl }}</span>
      </div>

      <div class="listpage__container">
        <div
          v-if="$router.currentRoute.name === 'list-page'"
          class="phone__container"
        >
          <div class="phone__wrapper">
            <img
              class="phone__container__img"
              src="../../assets/images/layout/phone.png"
            />
          </div>

          <div v-if="window.width >= 785" class="product__wrapper">
            <div
              v-for="(product, index) in products"
              :key="index"
              class="products__text"
            >
              <a
                :href="
                  product['Link Toychamp'] !== null
                    ? product['Link Toychamp']
                    : '#'
                "
                :class="{ 'products__text__link--active': selected === index }"
                target="_blank"
                class="products__text__link"
                @mouseover="
                  showImage(
                    product['Product Number'],
                    product['Link Toychamp'],
                    index
                  )
                "
              >
                {{ product["Product Name NL"] }}
              </a>
            </div>
          </div>

          <div v-else class="product__wrapper">
            <div
              v-for="(product, index) in products"
              :key="index"
              class="products__text"
              @click="
                imageModal(product['Product Number'], product['Link Toychamp'])
              "
            >
              <p class="products__text__link">
                {{ product["Product Name NL"] }}
              </p>
            </div>
          </div>
        </div>

        <div class="share__container">
          <p
            v-if="$router.currentRoute.name === 'list-page-no'"
            class="share__text__content no__products"
          >
            <span>
              Ga naar
              <a class="link__site" href="https://www.toychamp.be/">
                toychamp.be
              </a>
              en bekijk het assortiment
            </span>
          </p>

          <div
            v-if="$router.currentRoute.name === 'list-page'"
            class="share__title"
          >
            <h1 class="share__title__text">Wenslijstje</h1>
            <img
              class="share__title__star"
              src="../../assets/images/layout/star.png"
            />
          </div>

          <p
            v-if="$router.currentRoute.name === 'list-page'"
            class="share__text__content"
          >
            Deze producten zijn te koop in de winkel of online op
            <a
              target="_blank"
              class="social__link--footer"
              href="https://www.toychamp.be/"
              >toychamp.be</a
            >.
            <span v-if="window.width <= 785">
              Druk op de producten om de afbeeldingen te bekijken.
            </span>
          </p>

          <div
            v-if="$router.currentRoute.name === 'list-page'"
            class="share__image__container"
          >
            <a :href="url" target="_blank" class="image__wrapper">
              <transition
                enter-active-class="animated bounceInLeft delayAnimation"
                leave-active-class="animated bounceOutRight delayAnimation"
                mode="out-in"
              >
                <img
                  v-if="!noImage"
                  :key="image"
                  class="image__product"
                  :src="
                    require('../../assets/images/products/' +
                      image +
                      '_box1_in.png')
                  "
                />
              </transition>
            </a>
          </div>

          <p
            v-if="$router.currentRoute.name === 'list-page'"
            class="text__share"
          >
            Deel jouw lijstje
          </p>
          <div
            v-if="$router.currentRoute.name === 'list-page'"
            class="share__social"
          >
            <a
              target="_blank"
              class="social_link"
              :href="'https://www.facebook.com/sharer/sharer.php?u=' + siteUrl"
              @click="addGA('Facebook')"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              target="_blank"
              :href="
                'https://twitter.com/intent/tweet?text=Bekijk%20mijn%20LEGO®%20wenslijstje:%20' +
                  siteUrl +
                  '%20'
              "
              class="social_link"
              @click="addGA('Twitter')"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              target="_blank"
              class="social_link"
              :href="
                'mailto:?subject=LEGO® Wenslijstje&body=Bekijk mijn  LEGO® Wenslijstje: ' +
                  siteUrl
              "
              title="LEGO® Wenslijstje"
              @click="addGA('Mail')"
            >
              <i class="fas fa-envelope"></i>
            </a>
            <a target="_blank" class="social_link" @click="copyUrl()">
              <i class="fas fa-link"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="list__footer">
        <div class="footer__img__container">
          <img
            class="image footer__img"
            src="../../assets/images/layout/slider-border-list.png"
            alt="Logo"
          />
        </div>
        <div
          v-if="
            window.width <= 785 && $router.currentRoute.name === 'list-page'
          "
          class="share__social__footer"
        >
          <a
            :href="
              'https://wa.me/?text=Bekijk%20mijn%20LEGO®%20wenslijstje:%20' +
                siteUrl +
                '%20'
            "
            class="social__link--footer"
          >
            <i class="fab fa-whatsapp"></i>
          </a>
          <a
            target="_blank"
            class="social__link--footer"
            :href="'https://www.facebook.com/sharer/sharer.php?u=' + siteUrl"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
          <a
            target="_blank"
            :href="
              'https://twitter.com/intent/tweet?text=Bekijk%20mijn%20LEGO®%20wenslijstje:%20' +
                siteUrl +
                '%20'
            "
            class="social__link--footer"
          >
            <i class="fab fa-twitter"></i>
          </a>
          <a
            target="_blank"
            class="social__link--footer"
            :href="
              'mailto:?subject=LEGO® Wenslijstje&body=Bekijk mijn  LEGO® Wenslijstje: ' +
                siteUrl
            "
            title="LEGO® Wenslijstje"
          >
            <i class="fas fa-envelope"></i>
          </a>
          <a target="_blank" class="social__link--footer" @click="copyUrl()">
            <i class="fas fa-link"></i>
          </a>
        </div>
        <div
          v-if="
            window.width <= 785 && $router.currentRoute.name === 'list-page'
          "
          class="filler"
        ></div>
      </div>
    </section>
  </div>
</template>

<script>
import productsJSON from "../../assets/products/alpha-a";
import Snowf from "vue-snowf";

export default {
  name: "ListPage",
  components: { Snowf },

  data() {
    return {
      allProducts: productsJSON,
      products: [],
      noProducts: [],
      image: null,
      noImage: true,
      selected: undefined,
      url: null,
      window: {
        width: 0,
        height: 0
      },
      siteUrl: window.location.href
    };
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },

  mounted() {
    if (this.$router.currentRoute.name === "list-page") {
      this.getProducts();
      this.showImage();
    }
  },

  methods: {
    getProducts() {
      let id = this.$parent.$router.currentRoute.params.id.split("-").join(" ");
      id = id.split(" ");

      for (let i = 0; i < id.length; i++) {
        for (let j = 0; j < this.allProducts.length; j++) {
          if (id[i] === this.allProducts[j]["Product Number"]) {
            try {
              require("../../assets/images/products/" +
                this.allProducts[j]["Product Number"] +
                "_box1_in.png");
              this.products.push(this.allProducts[j]);
            } catch (e) {
              this.noProducts.push(this.allProducts[j]["Product Number"]);
            }
          }
        }
      }
    },

    addGA(platform) {
      this.$ga.event("Social media", "share", platform);
    },

    showImage(id, link, index) {
      if (this.noImage && this.products.length > 0) {
        this.image = this.products[0]["Product Number"];
        this.url = this.products[0]["Link Toychamp"];
        this.selected = index;
      } else {
        this.image = id;
        this.url = link;
        this.selected = index;
      }
      this.noImage = false;
    },

    imageModal(id, link) {
      this.$modal.show("productItem", {
        adaptive: true,
        maxWidth: "400px",
        maxHeight: "400px"
      });
      this.image = id;
      this.url = link;
    },

    hideModal() {
      this.$modal.hide("productItem");
      this.$modal.hide("copyLink");
    },

    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },

    nextProduct(id) {
      for (let i = 0; i < this.products.length; i++) {
        if (
          this.products[i]["Product Number"] === id &&
          i + 1 !== this.products.length
        ) {
          this.image = this.products[i + 1]["Product Number"];
          this.url = this.products[i + 1]["Link Toychamp"];
        } else if (
          this.products[i]["Product Number"] === id &&
          i + 1 === this.products.length
        ) {
          this.image = this.products[0]["Product Number"];
          this.url = this.products[0]["Link Toychamp"];
        }
      }
    },

    prevProduct(id) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i]["Product Number"] === id && i !== 0) {
          this.image = this.products[i - 1]["Product Number"];
          this.url = this.products[i - 1]["Link Toychamp"];
        } else if (i === 0) {
          this.image = this.products[this.products.length - 1][
            "Product Number"
          ];
          this.url = this.products[this.products.length - 1]["Link Toychamp"];
        }
      }
    },

    copyUrl() {
      let range = document.createRange();
      range.selectNode(document.getElementById("linkUrl"));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");

      this.$modal.show("copyLink");

      let vm = this;
      setTimeout(function() {
        vm.$modal.hide("copyLink");
      }, 1200);
    }
  }
};
</script>

<style>
@import "https://use.fontawesome.com/releases/v5.3.1/css/all.css";
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

.v--modal-overlay {
  background: rgba(0, 0, 0, 0.8);
}

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
  max-width: 99vw;
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
  z-index: 9999;
  max-width: 100%;
  max-height: 100%;
  width: 120px;
  height: 120px;
  margin-top: 40px;
  margin-left: 40px;
}

.listpage__container {
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
  min-width: 500px;
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
  background-image: linear-gradient(
    to right,
    black 33%,
    rgba(155, 155, 155, 0) 0%
  );
  background-position: bottom;
  background-size: 20px 1px;
  background-repeat: repeat-x;
  width: 89%;
  transition: 0.5s ease-in-out;
}

.products__text__link {
  font-family: BlueSheepLego, "sans-serif";
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

.products__text__link--active {
  background: #eaebed;
  transition: 0.3s ease-in-out;
}

.share__container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  max-height: 100%;
  height: 100%;
  width: auto;
}

.share__title {
  padding: 0;
}

.share__title__text {
  width: 400px;
  height: 80px;
  font-family: Ubuntu, "sans-serif";
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

.link__site {
  color: white;
  text-decoration: none;
}

.link__site:visited {
  color: white;
}

.share__text__content {
  width: 400px;
  height: 90px;
  font-family: Ubuntu, "sans-serif";
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.8;
  letter-spacing: normal;
  text-align: center;
  color: white;
}

.no__products {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  min-height: 75vh;
  font-size: 2vw;
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
  overflow: hidden;
}

.filler {
  height: 10px;
}

.modal__header p {
  font-family: Ubuntu, "sans-serif";
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
  overflow: hidden;
}

.modal__arrows--left {
  font-size: 30px;
  margin-left: 10px;
}

.modal__arrows--right {
  font-size: 30px;
  margin-right: 10px;
}

.modal__image {
  margin: 0 auto;
}

.modal__close__container {
  position: absolute;
  top: -7%;
  right: -12%;
}

.modal__close__image {
  max-width: 100%;
  max-height: 100%;
  width: 60%;
  height: 60%;
}

.v--modal-overlay .v--modal-box {
  overflow: unset;
}

.products__text__link--image {
  font-size: 3vw;
  height: unset;
}

.text__share {
  margin-top: 20px;
  font-family: Ubuntu, "sans-serif";
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
  z-index: 999999;
}

.footer__img__container {
  height: auto;
}

.footer__img {
  margin-top: 2px;
  width: 100%;
  max-width: 100%;
}

.copy__link__container {
  margin: 0 auto;
  height: 70px;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.copy__link__text {
  padding: 0;
  margin: 0;
  font-family: BlueSheepLego, "sans-serif";
  color: black;
  width: 100%;
  font-size: 25px;
  text-align: center;
}

.social__link--footer {
  text-decoration: none;
  color: white;
}

.social__link--footer:visited {
  color: white;
}

@media screen and (max-width: 1320px) {
  .listpage__container {
    height: auto;
    width: 90%;
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
    width: 60%;
  }

  .product__wrapper {
    left: 21%;
    width: 59%;
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

  .share__social__footer {
    width: 55%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 30px;
    flex: 2;
  }

  .filler__modal {
    height: 30px;
    width: 100%;
  }

  .listpage__container {
    width: 90%;
  }

  .share__title__star {
    margin-top: -150px;
    margin-left: -190px;
  }

  .share__text__content {
    width: 85%;
  }

  .share__image__container {
    width: 60%;
    height: 35%;
  }

  .share__container {
    justify-content: flex-end;
  }

  .phone__wrapper {
    height: 100%;
    margin-bottom: -180px;
  }

  .share__social {
    padding-bottom: 20px;
  }

  .phone__container__img {
    width: 75%;
    min-width: 350px;
  }

  .product__wrapper {
    width: 63%;
    left: 19%;
    top: 33%;
    height: 62%;
  }

  .footer__img {
    width: 100%;
    max-height: 100%;
    height: 10%;
  }

  .no__products {
    font-size: 35px;
  }
}

@media screen and (max-width: 1030px) {
  .share__container {
    justify-content: center;
  }

  .copy__link__text {
    font-size: 20px;
  }

  .list__footer {
    z-index: 999999;
    /* Safari 5.1 to 6.0 */
    background: -webkit-radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    /* For Opera 11.6 to 12.0 */
    background: -o-radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    /* For Firefox 3.6 to 15 */
    background: -moz-radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    /* Standard syntax */
    background: radial-gradient(circle at 49% 42%, #098ddb, #1062a2);
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .footer__img__container {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer__img {
    margin-top: -1px;
    height: 100%;
    max-width: 100%;
    width: 100%;
    padding: 0;
    transform: rotate(180deg);
  }

  .share__social__footer {
    padding-bottom: 0px;
  }

  .list__footer {
    min-height: 80px;
  }

  .list__container {
    overflow-y: scroll;
  }

  .share__title {
    flex: 1;
  }

  .listpage__container {
    display: flex;
    flex-direction: column-reverse;
    flex: 1 0 auto;
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
    min-width: 100px;
  }

  .product__wrapper {
    left: unset;
    width: 40%;
    height: 75%;
    top: 18.1%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .products__text {
    flex: 1;
    height: 18%;
  }

  .products__text__link {
    font-size: 15px;
  }

  .products__text__link:hover {
    background: none;
  }

  .share__image__container,
  .text__share,
  .share__social {
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
}

@media screen and (max-width: 616px) {
  .no__products {
    font-size: 105px;
  }

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

  .listpage__container {
    margin-top: 0;
    width: 95%;
  }

  .phone__container,
  .share__container {
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

  .products__text__link {
    font-size: 4vw;
  }

  .product__wrapper {
    height: 78%;
    width: 60%;
  }

  .share__title__star {
    margin-top: -24%;
    margin-left: -35%;
    width: 10%;
  }

  .modal__close__container {
    top: -8%;
    right: -15%;
  }

  .modal__close__image {
    width: 60%;
  }
}
</style>
