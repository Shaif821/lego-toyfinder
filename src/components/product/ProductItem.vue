<template>
    <swiper ref="mySwiper" @slideChange="changeSwiperIndex" :options="swipeOptionsProduct" style="width: 1920px;">
        <swiper-slide class="product_wrapper animated zoomIn"
                      :class="{product_wrapper_details : selected === index}"
                      v-for="(i, index) in shortProducts" :key="i['ProductNumber']"
                      :style="{animationDelay: '0.' + index + 's'}">
            <div v-if="testImage(i['ProductNumber']) !== false" class="pre_product_details swiper-lazy">

                <div :class="{product_all_image : selected === index}">

                    <div class="product_image_normal" style="overflow: hidden;"
                         :class="[selected === index ? 'product_image_details' : 'product_image']">
                        <transition enter-active-class="animated zoomIn faster"
                                    leave-active-class="animated zoomOut faster" mode="out-in">
                            <img class="swiper-lazy" v-if="selectImage === i['ProductNumber']" :key="singleImage"
                                 :src="require('../../assets/images/products/' + testImage(i['ProductNumber']) + singleImage + '.png')">
                            <img class="swiper-lazy" v-else :key="switchImage"
                                 :src="require('../../assets/images/products/' + testImage(i['ProductNumber']) + switchImage + '.png')">
                        </transition>
                    </div>

                    <div v-if="selected !== index">
                        <hr class="product_seperator">
                        <!--<p class="product_name">{{ 'Min: ' + i['AgeMin'] + ' &#45;&#45;  Max: ' + i['AgeMax'] + '-&#45;&#45; Interesse: ' + i['Interesse'] + '-&#45;&#45;Thema: ' + i['Theme']}} </p>-->
                        <p class="product_name">{{ i['ProductNameNL']}} </p>
                        <p class="product_price">€ {{parseFloat(i['RRP'])}}</p>

                        <div class="product_buttons">
                            <div @click="selected = index, changeImage('box', selectImage = i['ProductNumber'])"
                                 class="product_details_button">
                                <img src="../../assets/images/layout/magnifying-glass.png">
                                Bekijk dit product
                            </div>

                            <div class="product_favorite" @click="$parent.addToFavorite(i)">
                                <transition enter-active-class="animated bounceIn"
                                            mode="out-in">
                                    <img key="1" v-if="favorite.includes(i)"
                                         src="../../assets/images/layout/favorited_star.png">
                                    <img key="2" v-else src="../../assets/images/layout/un)star.png">
                                </transition>
                            </div>
                        </div>
                    </div>

                    <div v-else class="product_more_images">
                        <div class="mini_images" v-if="getMini(i['ProductNumber'])">
                            <div @click="changeImage('box', selectImage = i['ProductNumber'])"
                                 class="animated fadeIn mini_images_wrapper"
                                 :class="[singleImage === '_box1_in' ? 'mini_images_active' : 'test' ]">
                                <img :src="require('../../assets/images/products/' + i['ProductNumber'] + '_box1_in.png')">
                            </div>

                            <div @click="changeImage('prod', selectImage = i['ProductNumber'])"
                                 :class="[singleImage === '_prod' ? 'mini_images_active' : 'test' ]"
                                 class="mini_images_wrapper animated fadeIn">
                                <img :src="require('../../assets/images/products/' + i['ProductNumber'] + '_prod.png')">
                            </div>

                        </div>
                    </div>
                </div>

                <div v-if="selected === index" class="product_description">
                    <div class="remove_details"
                         @click="selected = undefined, changeImage('box', selectImage = i['ProductNumber'])">
                        <img src="../../assets/images/layout/path.png">
                        <img src="../../assets/images/layout/rectangle.png">
                    </div>

                    <div class="product-details-title">

                        <div class="product_title">
                            <h1>{{ i['ProductNameNL']}}</h1>
                            <p>{{ i['Theme']}}</p>
                        </div>

                        <div class="product_toy_details">
                        <p>{{i['ProductDescriptionNL']}}</p>
                        </div>
                    </div>


                    <div class="details-favorite">
                        <div class="product_rest_details">
                            <div class="details_wrapper">
                                <p>Leeftijd</p>
                                <p>{{i['AgeMark']}}</p>
                            </div>

                            <div class="details_wrapper">
                                <p>Aantal stukjes</p>
                                <p>{{i['NumberOfPieces']}}</p>
                            </div>

                            <div class="details_wrapper">
                                <p>Interessegebied</p>
                                <p>{{i['Interesse']}}</p>
                            </div>
                            <div class="details_wrapper">
                                <p></p>
                                <p class="price_details">€ {{parseFloat(i['RRP'])}}</p>
                            </div>
                        </div>

                        <div @click="$parent.addToFavorite(i)" class="product_details_footer">
                            <p>Voeg toe aan verlanglijstje</p>

                            <div>
                                <div class="product_favorite">
                                    <transition enter-active-class="animated bounceIn"
                                                leave-active-class="animated bounceOut"
                                                mode="out-in">
                                        <img :key="1" v-if="favorite.includes(i)"
                                             class="animated bounceIn"
                                             src="../../assets/images/layout/favorited_star.png">
                                        <img :key="2" v-else
                                             src="../../assets/images/layout/un)star.png">
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
    import price_L from '../../assets/products/price-l'
    import price_H from '../../assets/products/price-h'
    import alpha_A from '../../assets/products/alpha-a'
    import alpha_Z from '../../assets/products/alpha-z'

    export default {
        name: "ProductItem",
        props: {
            favorite: Array,
            productSort: String,
        },

        data() {
            return {
                priceProductsLow: price_L,
                priceProductsHigh: price_H,
                alphaProductsA: alpha_A,
                alphaProductsZ: alpha_Z,
                currentProducts: null,
                shortProducts: [],
                singleImage: '_box1_in',
                selectImage: undefined,
                switchImage: undefined,
                selected: undefined,
                currentSlide: null,
                addSlides: null,
                filterLength: 0,
                swipeOptionsProduct: {
                    preloadImages: true,
                    slidesPerView: 'auto',
                    lazy: true,
                    speed: 900, //De snelheid
                    freeMode: true,
                    freeModeMomentum: true,
                    preventClicks: true,
                    preventClicksPropagation: true,
                    onClick: (swiper, event) => {
                        this.test(swiper, event)
                    }
                },
            }
        },

        methods: {
            getProducts() {
                let counter = 0;
                let length = 0;
                this.filterLength = 0
                counter = this.currentSlide === null ? 15 : this.addSlides
                this.shortProducts = []
                this.checkProductFilter()
                for (let i = 0; i < this.currentProducts.length; i++) {
                    try {
                        require('../../assets/images/products/' + this.currentProducts[i]['ProductNumber'] + this.singleImage + '.png')
                        length++
                        // if (this.shortProducts.length < counter) {
                            this.checkFilters(this.currentProducts[i], this.$store.state.themeChoice, this.$store.state.ageChoice, this.$store.state.interestChoice, true)
                            this.checkFilters(this.currentProducts[i], this.$store.state.themeChoice, this.$store.state.ageChoice, this.$store.state.interestChoice, false)
                        // }
                    } catch (e) {
                    }
                }
                if (this.shortProducts.length > 0) {
                    this.$parent.productLength(this.filterLength)
                }

                if (this.shortProducts.length <= 0) {
                    this.getAllProducts()
                    this.$parent.productLength(length)
                }
            },

            checkFilters(currentProduct, theme, age, interest, bool) {
                if (interest !== null && age !== null && theme !== null) {                  //Wanneer alle filters zijn gevuld
                    if (interest.text === currentProduct['Interesse'] && theme.theme === currentProduct['Theme']
                        && age.ageMin <= currentProduct['AgeMin'] && age.ageMax >= currentProduct['AgeMax']) {
                        bool ? this.shortProducts.push(currentProduct) : this.filterLength++
                    }
                }
                else if (interest !== null && age !== null && theme === null) {
                    if (interest.text === currentProduct['Interesse']                       //gevuld: interest & age
                        && age.ageMin <= currentProduct['AgeMin'] && age.ageMax >= currentProduct['AgeMax']) {
                        bool ? this.shortProducts.push(currentProduct) : this.filterLength++
                    }
                }
                else if (interest !== null && age === null && theme !== null) {             //gevuld: interest & theme
                    if (interest.text === currentProduct['Interesse'] && theme.theme === currentProduct['Theme']) {
                        bool ? this.shortProducts.push(currentProduct) : this.filterLength++
                    }
                }
                else if (interest === null && age !== null && theme !== null) {             //gevuld: age & theme
                    if (theme.theme === currentProduct['Theme'] && age.ageMin <= currentProduct['AgeMin'] && age.ageMax >= currentProduct['AgeMax']) {
                        bool ? this.shortProducts.push(currentProduct) : this.filterLength++
                    }
                }
                else if (interest == null && age !== null && theme == null) {             //Wanneer allen age gevuld is
                    if (age.ageMin <= currentProduct['AgeMin'] && age.ageMax >= currentProduct['AgeMax']) {
                        bool ? this.shortProducts.push(currentProduct) : this.filterLength++
                    }
                }
                else if (interest !== null && age === null && theme === null) {
                    if (interest.text === currentProduct['Interesse']) {                 //Wanneer alleen interest gevuld is
                        bool ? this.shortProducts.push(currentProduct) : this.filterLength++
                    }
                }
                else if (interest === null && age === null && theme !== null) {          //Wanneer alleen thema gevuld is
                    if (theme.theme === currentProduct['Theme']) {
                        bool ? this.shortProducts.push(currentProduct) : this.filterLength++
                    }
                }
            },

            getAllProducts() {
                let counter = 0;
                let length = 0;
                counter = this.currentSlide === null ? 15 : this.addSlides
                this.shortProducts = []
                this.checkProductFilter()
                for (let i = 0; i < this.currentProducts.length; i++) {
                    try {
                        require('../../assets/images/products/' + this.currentProducts[i]['ProductNumber'] + this.singleImage + '.png')
                        length++
                        if (this.shortProducts.length < counter) {
                            this.shortProducts.push(this.currentProducts[i])
                        }
                    } catch (e) {

                    }
                }
                if (this.shortProducts.length > 0) {
                    this.$parent.productLength(length)
                }
            },

            checkProductFilter() {
                if (this.productSort === 'AlphaA') {
                    this.currentProducts = this.alphaProductsA
                }
                else if (this.productSort === 'AlphaZ') {
                    this.currentProducts = this.alphaProductsZ
                }
                else if (this.productSort === 'PriceL') {
                    this.currentProducts = this.priceProductsLow
                }
                else if (this.productSort === 'PriceH') {
                    this.currentProducts = this.priceProductsHigh
                }
                else {
                    this.currentProducts = this.alphaProductsA
                }
            },

            getMini(id) {
                try {
                    require('../../assets/images/products/' + id + '_prod.png')
                    return true
                } catch (e) {
                    return false
                }
            },

            changeImage(type, id) {
                if (id) {
                    if (type === 'prod') {
                        this.singleImage = '_prod'
                    }
                    else if (type === 'box') {
                        this.singleImage = '_box1_in'
                    }
                }
                else if (type === 'reset') {
                    this.selectImage = undefined
                    this.singleImage = '_box_in'
                }
                else {
                    this.switchImage = '_box1_in'
                }
            },

            testImage(product) {
                try {
                    require('../../assets/images/products/' + product + this.singleImage + '.png')
                    return product
                } catch (e) {
                    return false;
                }
            },

            changeSwiperIndex() {
                this.$nextTick(() => {                             //Wanneer een swipe plaatst vindt,  wordt deze functie uitgevoerd
                    this.currentSlide = this.swiper.activeIndex    //Hiermee wordt currentSlide constant geupdatet als
                })                                                 //een slide verandert. De index is nodig voor de Cardboard component
            },

        },

        mounted() {
            this.changeSwiperIndex();
            this.getProducts();
            this.changeImage();
        },

        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper //Hiermee wordt de instantie voor mySwiper gemaakt
            },

            addToSlide() {
                return this.currentSlide
            },
        },

        watch: {
            addToSlide() {
                if ((this.currentSlide + 5) > this.addSlides) {
                    this.checkProductFilter()
                    if (this.currentSlide < this.currentProducts.length) {
                        this.addSlides = this.currentSlide + 10 > this.currentProducts.length ? this.currentProducts.length : this.currentSlide + 10
                        this.getProducts()
                    }
                }
            },

            productSort: function (newVal, oldVal) {
                this.checkProductFilter()
                this.getProducts()
            }
        }
    }
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

    .zoumIn, .zoomOut {
        animation-duration: 0.5s !important;
    }

    .product_image_normal {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s ease-in-out;
    }

    .product_image_big {
        border: 2px solid red;
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
        border: 2px solid rgba(0, 0, 0, 0.24);
        margin: 0px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120px;
        width: 140px;
        transition: 0.3s ease-in-out;
    }

    .mini_images_active {
        transition: 0.3s ease-in-out;
        border: 2px solid #297fca;
    }

    .mini_images img {
        max-height: 100%;
        max-width: 100%;
        height: 75%;
        width: 75%;
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
        max-height: 100%;
        max-width: 100%;
        height: 80%;
        width: 80%;
        transition: 0.3s ease-in-out;
    }

    .product_image img {
        transition: 0.3s ease-in-out;
        width: 307px;
        height: 276px;
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
        font-family: Ubuntu, 'sans-serif';
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
        font-family: Ubuntu, 'sans-serif';
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