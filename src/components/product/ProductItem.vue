<template>
  <swiper
    ref="mySwiper"
    :options="swipeOptionsProduct"
    style="width: 1920px;"
    @slideChange="changeSwiperIndex"
  >
    <swiper-slide
      v-for="(i, index) in shortProducts"
      :key="i['Product Number']"
      class="product_wrapper animated zoomIn"
      :class="{ product_wrapper_details: selected === index }"
      :style="{ animationDelay: '0.' + index + 's' }"
    >
      <div
        v-if="testImage(i['Product Number']) !== false"
        class="pre_product_details swiper-lazy"
      >
        <div :class="{ product_all_image: selected === index }">
          <div
            class="product_image_normal"
            style="overflow: hidden;"
            :class="[
              selected === index ? 'product_image_details' : 'product_image'
            ]"
            @click="
              (selected =
                selected === index
                  ? (selected = undefined)
                  : (selected = index)),
                changeImage('box', (selectImage = i['Product Number']))
            "
          >
            <transition
              enter-active-class="animated zoomIn faster"
              leave-active-class="animated zoomOut faster"
              mode="out-in"
            >
              <v-lazy-image
                v-if="selectImage === i['Product Number']"
                :key="singleImage"
                class="swiper-lazy  product_image_prod"
                :src="
                  require('../../assets/images/products/' +
                    testImage(i['Product Number']) +
                    singleImage +
                    '.png')
                "
                :src-placeholder="loading"
              />
              <v-lazy-image
                v-else
                :key="switchImage"
                class="swiper-lazy"
                :src="
                  require('../../assets/images/products/' +
                    testImage(i['Product Number']) +
                    switchImage +
                    '.png')
                "
                :src-placeholder="loading"
              />
            </transition>
          </div>

          <div
            v-if="selected !== index"
            @click="
              (selected =
                selected === index
                  ? (selected = undefined)
                  : (selected = index)),
                changeImage('box', (selectImage = i['Product Number']))
            "
          >
            <hr class="product_seperator" />
            <p class="product_name">{{ i["Product Name NL"] }}</p>
            <p class="product_price">€ {{ parseFloat(i["RRP"]) }}</p>

            <div class="product_buttons">
              <div
                class="product_details_button"
                @click.stop="
                  (selected = index),
                    changeImage('box', (selectImage = i['Product Number']))
                "
              >
                <img src="../../assets/images/layout/magnifying-glass.png" />
                Bekijk dit product
              </div>

              <div class="product_favorite" @click.stop="addToFavorite(i)">
                <transition
                  enter-active-class="animated bounceIn"
                  mode="out-in"
                >
                  <img
                    v-if="$store.state.favorites.includes(i)"
                    key="1"
                    src="../../assets/images/layout/favorited_star.png"
                  />
                  <img
                    v-else
                    key="2"
                    src="../../assets/images/layout/un)star.png"
                  />
                </transition>
              </div>
            </div>
          </div>

          <div v-else class="product_more_images">
            <div v-if="getMini(i['Product Number'])" class="mini_images">
              <div
                class="animated fadeIn mini_images_wrapper"
                :class="[
                  singleImage === '_box1_in' ? 'mini_images_active' : 'test'
                ]"
                @click="changeImage('box', (selectImage = i['Product Number']))"
              >
                <span
                  class="mini__images"
                  :style="{
                    backgroundImage: `url(${require('../../assets/images/products/' +
                      i['Product Number'] +
                      '_box1_in.png')})`
                  }"
                >
                </span>
              </div>

              <div
                :class="[
                  singleImage === '_prod' ? 'mini_images_active' : 'test'
                ]"
                class="mini_images_wrapper animated fadeIn"
                @click="
                  changeImage('prod', (selectImage = i['Product Number']))
                "
              >
                <span
                  class="mini__images"
                  :style="{
                    backgroundImage: `url(${require('../../assets/images/products/' +
                      i['Product Number'] +
                      '_prod.png')})`
                  }"
                >
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selected === index" class="product_description">
          <div
            class="remove_details"
            @click="
              (selected = undefined),
                changeImage('box', (selectImage = i['Product Number']))
            "
          >
            <img src="../../assets/images/layout/path.png" />
            <img src="../../assets/images/layout/rectangle.png" />
          </div>

          <div
            class="product-details-title"
            @click="
              (selected =
                selected === index
                  ? (selected = undefined)
                  : (selected = index)),
                changeImage('box', (selectImage = i['Product Number']))
            "
          >
            <div class="product_title">
              <h1>{{ i["Product Name NL"] }}</h1>
              <p>{{ i["Theme"] }}</p>
            </div>

            <div class="product_toy_details">
              <p>{{ i["Product Description NL"] }}</p>
            </div>
          </div>

          <div class="details-favorite">
            <div
              class="product_rest_details"
              @click="
                (selected =
                  selected === index
                    ? (selected = undefined)
                    : (selected = index)),
                  changeImage('box', (selectImage = i['Product Number']))
              "
            >
              <div class="details_wrapper">
                <p>Leeftijd</p>
                <p>{{ i["Age Mark"] }}</p>
              </div>

              <div class="details_wrapper">
                <p>Aantal stukjes</p>
                <p>{{ i["Number of Pieces"] }}</p>
              </div>

              <div class="details_wrapper">
                <p>Interessegebied</p>
                <p>{{ i["Interesse"] }}</p>
              </div>
              <div class="details_wrapper">
                <p></p>
                <p class="price_details">€ {{ parseFloat(i["RRP"]) }}</p>
              </div>
            </div>

            <div class="product_details_footer" @click.stop="addToFavorite(i)">
              <p>Voeg toe aan verlanglijstje</p>

              <div>
                <div class="product_favorite">
                  <transition
                    enter-active-class="animated bounceIn"
                    leave-active-class="animated bounceOut"
                    mode="out-in"
                  >
                    <img
                      v-if="$store.state.favorites.includes(i)"
                      :key="1"
                      class="animated bounceIn"
                      src="../../assets/images/layout/favorited_star.png"
                    />
                    <img
                      v-else
                      :key="2"
                      src="../../assets/images/layout/un)star.png"
                    />
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import alpha_A from "../../assets/products/alpha-a";

export default {
  name: "ProductItem",
  props: {
    productSort: String
  },

  data() {
    return {
      countFilter: null,
      currentProducts: alpha_A,
      ogProducts: null,
      shortProducts: [],
      loading: require("../../assets/images/layout/loading.gif"),
      singleImage: "_box1_in",
      selectImage: undefined,
      switchImage: undefined,
      selected: undefined,
      currentSlide: null,
      addSlides: null,
      filterLength: 0,
      swipeOptionsProduct: {
        preloadImages: true,
        slidesPerView: "auto",
        lazy: true,
        speed: 900, //De snelheid
        freeMode: true,
        freeModeMomentum: true,
        preventClicks: true,
        preventClicksPropagation: true,
        onClick: (swiper, event) => {
          this.test(swiper, event);
        }
      }
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper; //Hiermee wordt de instantie voor mySwiper gemaakt
    },

    addToSlide() {
      return this.currentSlide;
    }
  },

  watch: {
    addToSlide() {
      if (this.currentSlide + 5 > this.addSlides) {
        this.checkProductFilter();
        if (this.currentSlide < this.currentProducts.length) {
          this.addSlides =
            this.currentSlide + 25 > this.currentProducts.length
              ? this.currentProducts.length
              : this.currentSlide + 25;
          this.getProducts();
        }
      }
    },

    productSort: function(newVal, oldVal) {
      this.checkProductFilter();
      this.getProducts();
    }
  },

  mounted() {
    this.changeSwiperIndex();
    this.getProducts();
    this.changeImage();
  },

  methods: {
    addToFavorite(index) {
      let pos = undefined;
      if (this.$store.state.favorites.includes(index)) {
        pos = this.$store.state.favorites.indexOf(index);
        this.$store.state.favorites.splice(pos, 1);
      } else {
        if (this.$store.state.favorites.length <= 4) {
          this.starFavorite(index);
          this.$store.state.favorites.push(index);
        }
        else {
          this.$parent.animateStar()
        }
      }
    },

    starFavorite(id) {},

    getProducts() {
      let counter = 0;
      let length = 0; //De totale aantal van de producten (Wordt weergegeven op de pagina, links boven)
      this.filterLength = 0;
      counter = this.currentSlide === null ? 15 : this.addSlides; //Wanneer de huidige slides null is krijg het de waarde van 15, wanneer het al een waarde heeft, wordt de nieuwe waarde this.addslides
      this.shortProducts = []; //Hierin komen de producten
      this.checkProductFilter(); //Checkt welke filters gekozen zijn
      for (let i = 0; i < this.currentProducts.length; i++) {
        try {
          //Checkt of de afbeelding binnen gehaald kan worden (dus of het bestaat), Daarna wordt er gekeken of de producten
          //de juiste filters bevatten, en vervolgens worden de producten toegevoegd aan de shortProducts (wat dus weergegeven wordt)
          require("../../assets/images/products/" +
            this.currentProducts[i]["Product Number"] +
            this.singleImage +
            ".png");
          this.checkFilters(
            this.currentProducts[i],
            this.$store.state.themeChoice,
            this.$store.state.ageChoice,
            this.$store.state.interestChoice,
            false
          );
          length++;
          if (this.shortProducts.length < counter) {
            this.checkFilters(
              this.currentProducts[i],
              this.$store.state.themeChoice,
              this.$store.state.ageChoice,
              this.$store.state.interestChoice,
              true
            );
          }
        } catch (e) {
          return {};
        }
      }
      //Als de producten gefilterd zijn, wordt de total resultaten doorgegeven
      if (this.shortProducts.length > 0) {
        this.$parent.productLength(this.filterLength);
      }

      //Als de producten geen filters bevatten, dan worden alle producten opgehaald
      if (this.shortProducts.length <= 0) {
        this.getAllProducts();
        this.$parent.productLength(length);
      }
    },

    checkFilters(currentProduct, theme, age, interest, allResult) {
      if (interest !== null && age !== null && theme !== null) {
        //Wanneer alle filters zijn gevuld
        if (
          interest.text === currentProduct["Interesse"] &&
          theme.theme === currentProduct["Theme"] &&
          currentProduct["Age Min"] >= age.ageMin &&
          currentProduct["Age Max"] <= age.ageMax
        ) {
          allResult
            ? this.shortProducts.push(currentProduct)
            : this.filterLength++;
        }
      } else if (interest !== null && age !== null && theme === null) {
        if (
          interest.text === currentProduct["Interesse"] && //gevuld: interest & age
          currentProduct["Age Min"] >= age.ageMin &&
          currentProduct["Age Max"] <= age.ageMax
        ) {
          allResult
            ? this.shortProducts.push(currentProduct)
            : this.filterLength++;
        }
      } else if (interest !== null && age === null && theme !== null) {
        //gevuld: interest & theme
        if (
          interest.text === currentProduct["Interesse"] &&
          theme.theme === currentProduct["Theme"]
        ) {
          allResult
            ? this.shortProducts.push(currentProduct)
            : this.filterLength++;
        }
      } else if (interest === null && age !== null && theme !== null) {
        //gevuld: age & theme
        if (
          theme.theme === currentProduct["Theme"] &&
          currentProduct["Age Min"] >= age.ageMin &&
          currentProduct["Age Max"] <= age.ageMax
        ) {
          allResult
            ? this.shortProducts.push(currentProduct)
            : this.filterLength++;
        }
      } else if (interest == null && age !== null && theme == null) {
        //Wanneer alleen age gevuld is
        if (
          currentProduct["Age Min"] >= age.ageMin &&
          currentProduct["Age Max"] <= age.ageMax
        ) {
          allResult
            ? this.shortProducts.push(currentProduct)
            : this.filterLength++;
        }
      } else if (interest !== null && age === null && theme === null) {
        if (interest.text === currentProduct["Interesse"]) {
          //Wanneer alleen interest gevuld is
          allResult
            ? this.shortProducts.push(currentProduct)
            : this.filterLength++;
        }
      } else if (interest === null && age === null && theme !== null) {
        //Wanneer alleen thema gevuld is
        if (theme.theme === currentProduct["Theme"]) {
          allResult
            ? this.shortProducts.push(currentProduct)
            : this.filterLength++;
        }
      }
    },

    getAllProducts() {
      let counter = 0;
      let length = 0;
      counter = this.currentSlide === null ? 15 : this.addSlides;
      this.shortProducts = [];
      this.checkProductFilter();
      for (let i = 0; i < this.currentProducts.length; i++) {
        try {
          require("../../assets/images/products/" +
            this.currentProducts[i]["Product Number"] +
            this.singleImage +
            ".png");
          length++;
          if (this.shortProducts.length < counter) {
            this.shortProducts.push(this.currentProducts[i]);
          }
        } catch (e) {
          return {};
        }
      }
      if (this.shortProducts.length > 0) {
        this.$parent.productLength(length);
      }
    },

    checkProductFilter() {
      this.currentProducts = alpha_A;
      if (this.countFilter === null) {
        this.ogProducts = this.currentProducts.slice();
      }
      if (this.productSort === "AlphaA") {
        this.currentProducts = this.ogProducts;
      } else if (this.productSort === "AlphaZ") {
        this.currentProducts = this.currentProducts.slice().reverse();
      } else if (this.productSort === "PriceL") {
        this.currentProducts = this.currentProducts.sort(function(a, b) {
          return a.RRP - b.RRP;
        });
      } else if (this.productSort === "PriceH") {
        this.currentProducts = this.currentProducts.sort(function(a, b) {
          return b.RRP - a.RRP;
        });
      } else {
        this.currentProducts = this.ogProducts;
      }
      this.countFilter = 1;
    },

    getMini(id) {
      try {
        require("../../assets/images/products/" + id + "_prod.png");
        return true;
      } catch (e) {
        return false;
      }
    },

    changeImage(type, id) {
      if (id) {
        if (type === "prod") {
          this.singleImage = "_prod";
        } else if (type === "box") {
          this.singleImage = "_box1_in";
        }
      } else if (type === "reset") {
        this.selectImage = undefined;
        this.singleImage = "_box_in";
      } else {
        this.switchImage = "_box1_in";
      }
    },

    testImage(product) {
      try {
        require("../../assets/images/products/" +
          product +
          this.singleImage +
          ".png");
        return product;
      } catch (e) {
        return false;
      }
    },

    changeSwiperIndex() {
      this.$nextTick(() => {
        //Wanneer een swipe plaatst vindt,  wordt deze functie uitgevoerd
        this.currentSlide = this.swiper.activeIndex; //Hiermee wordt currentSlide constant geupdatet als
      }); //een slide verandert. De index is nodig voor de Cardboard component
    }
  }
};
</script>

<style scoped>
.product_wrapper {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
  width: 457px !important;
  height: 676px !important;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  margin-left: 65px;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  overflow: hidden;
}

.product_wrapper:last-child {
  margin-right: 200px;
}

.product_wrapper_details {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
  width: 1170px !important;
  transition: 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
}

.pre_product_details {
  display: flex;
  flex-direction: row;
  width: 100%;
  transition: 0.3s ease-in-out;
}

.zoumIn,
.zoomOut {
  animation-duration: 0.5s !important;
}

.product_image_normal {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease-in-out;
}

.product_all_image {
  margin-left: 20px;
  width: 500px;
  height: 676px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: 0.3s ease-in-out;
}

.product_more_images {
  width: 100%;
  transition: 0.3s ease-in-out;
}

.mini_images {
  margin-top: 18px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  transition: 0.3s ease-in-out;
}

.mini_images_wrapper {
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.24);
  margin: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 140px;
  transition: 0.3s ease-in-out;
}

.mini__images {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.mini_images_active {
  transition: 0.3s ease-in-out;
  border: 2px solid #297fca;
}

.mini_images img {
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
  transition: 0.3s ease-in-out;
}

.product_image {
  transition: 0.3s ease-in-out;
  height: 406px;
  width: 457px;
}

.product_image_details {
  margin-top: 20px;
  transition: 0.3s ease-in-out;
  height: 500px;
  width: 500px;
}

.product_image_details img {
  padding: 10px;
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
  transition: 0.3s ease-in-out;
}

.product_image img {
  transition: 0.3s ease-in-out;
  max-width: 80%;
  max-height: 80%;
  width: auto;
  height: auto;
}

.product_description {
  position: relative;
  width: 650px;
  margin-left: 65px;
  display: flex;
  flex-direction: column;
}

.remove_details {
  position: absolute;
  top: 0;
  right: 0;
}

.remove_details img:first-child {
  position: absolute;
  z-index: 1;
  margin-left: 50px;
  margin-top: 10px;
}

.product_title {
  margin-top: 30px;
  text-align: left;
  font-family: Ubuntu, "sans-serif";
}

.product-details-title {
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.product_title h1 {
  padding: 0;
  margin: 0;
  font-size: 30px;
  font-weight: 500;
  color: #020202;
  letter-spacing: normal;
}

.product_title p {
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  margin: 0;
  padding: 0;
  color: #496078;
}

.product_toy_details {
  margin-top: 40px;
  text-align: left;
  height: auto;
  max-height: 310px;
  width: 545px;
  overflow: auto;
  font-family: Ubuntu, "sans-serif";
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: normal;
  color: #020202;
}

.product_rest_details {
  display: flex;
  flex-direction: row;
  height: 106px;
}

.details-favorite {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
}

.details_wrapper {
  margin-right: 30px;
  text-align: left;
}

.details_wrapper p:first-child {
  color: #496078;
  font-size: 15px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
}

.details_wrapper p:nth-child(2) {
  font-size: 18px;
  font-weight: bold;
  color: #020202;
}

.details_wrapper:last-child {
  flex: 2;
  text-align: right;
}

.price_details {
  font-size: 42px !important;
  font-weight: 500;
}

.product_details_footer {
  /*position: absolute;*/
  bottom: 0;
  height: 94px;
  width: 100%;
  box-shadow: inset 0 -6px 0 0 #2f3f50;
  border-top-left-radius: 10px;
  background-color: #496078;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.product_details_footer p {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 28px;
  font-weight: bold;
  color: white;
}

.product_details_footer div:first-child {
  width: 132px;
}

.product_details_footer .product_favorite {
  border: none;
}

.product_seperator {
  border: none;
  width: 415px;
  height: 1px;
  background-color: #f2f2f2;
}

.product_name {
  height: 35px;
  font-size: 26px;
  text-align: left;
  width: 397px;
  margin: 15px auto 0;
  font-weight: 500;
  color: black;
}

.product_price {
  margin: 55px auto 22px;
  width: 397px;
  color: black;
  font-size: 42px;
  font-weight: 500;
  text-align: right;
}

.product_buttons {
  width: 457px;
  height: 94px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -5px;
}

.product_details_button {
  background: #297fca;
  color: white;
  font-size: 28px;
  width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  box-shadow: inset 0 -6px 0 0 #496078;
}

.product_details_button > * {
  padding: 30px;
}

.product_favorite {
  border-left: 2px solid #2f3f50;
  height: 100%;
  width: 97px;
  background: #496078;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 -6px 0 0 #2f3f50;
}

.product_list_section-3_filler {
  height: 92px;
}
</style>
