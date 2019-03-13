<template>
  <div>
    <WishList></WishList>
    <div class="product__list__container">
      <div class="product__list__header">
        <div class="product__list__header__wrapper">
          <p class="product__list__header__count">
            {{ productCount }} resultaten
          </p>
          <div class="header__filter__container">
            <button
              class="header__filter__button"
              :class="{
                header__filter__button__active: productType === 'AlphaA'
              }"
              @click="changFilter('AlphaA')"
            >
              <p class="header__filter__button--text">Alfabetisch A-Z</p>
            </button>
            <button
              class="header__filter__button"
              :class="{
                header__filter__button__active: productType === 'AlphaZ'
              }"
              @click="changFilter('AlphaZ')"
            >
              <p class="header__filter__button--text">Alfabetisch Z-A</p>
            </button>
            <button
              class="header__filter__button"
              :class="{
                header__filter__button__active: productType === 'PriceL'
              }"
              @click="changFilter('PriceL')"
            >
              <p class="header__filter__button--text">Prijs oplopend</p>
            </button>
            <button
              class="header__filter__button"
              :class="{
                header__filter__button__active: productType === 'PriceH'
              }"
              @click="changFilter('PriceH')"
            >
              <p class="header__filter__button--text">Prijs aflopend</p>
            </button>
          </div>
        </div>
      </div>

      <div class="filler_second"></div>

      <ProductItem
        :product-sort="productType"
        class="product__list__item"
      ></ProductItem>

      <div class="product__list__filler"></div>

      <ProductButtons class="product__list__buttons"></ProductButtons>
    </div>
    <ShareList
      v-if="shareListActive"
      :is-open="shareListActive"
      :url="wishListUrl"
      :favorites="favoritesName"
    >
    </ShareList>
  </div>
</template>

<script>
import WishList from "./WishList.vue";
import ShareList from "./ShareList.vue";
import ProductItem from "./ProductItem.vue";
import ProductButtons from "./ProductButtons.vue";

export default {
  name: "ProductList",
  components: {
    WishList: WishList,
    ShareList: ShareList,
    ProductItem: ProductItem,
    ProductButtons: ProductButtons
  },

  data() {
    return {
      shareListActive: false,
      wishListUrl: null,
      favoritesName: [],
      productCount: null,
      productType: "AlphaA"
    };
  },

  computed: {
    addToURL() {
      return this.$store.state.favorites;
    }
  },

  watch: {
    addToURL() {
      this.qrCode();
    }
  },

  methods: {
    addToFavorite(index) {
      let pos = undefined;
      if (this.$store.state.favorites.includes(index)) {
        pos = this.$store.state.favorites.indexOf(index);
        this.$store.state.favorites.splice(pos, 1);
      } else {
        if (this.$store.state.favorites.length <= 4) {
          this.$store.state.favorites.push(index);
        }
      }
    },

    removeFavorite() {
      this.$store.state.favorites = [];
    },

    productLength(length) {
      this.productCount = length;
    },

    shareListState() {
      this.shareListActive = !this.shareListActive;
    },

    changFilter(type) {
      this.productType = type;
    },

    qrCode() {
      let favoritesURL = [];
      let urlLink = document.URL.replace("/toyfinder", "/");
      this.favoritesName = [];
      for (let i = 0; i < this.$store.state.favorites.length; i++) {
        favoritesURL.push(this.$store.state.favorites[i]["Product Number"]);
        this.favoritesName.push(
          this.$store.state.favorites[i]["Product Name NL"]
        );
      }
      this.wishListUrl = urlLink + favoritesURL.join("-");
    }
  }
};
</script>

<style scoped>
.zoomOut,
.zoomIn {
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
