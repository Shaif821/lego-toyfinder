import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/store'
import VAnimateCss from 'v-animate-css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueQRCode from 'vue-qrcode-component'
import VeeValidate from 'vee-validate'
import VueLazyload from 'vue-lazyload'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VAnimateCss);
Vue.use(VueAwesomeSwiper);
Vue.use(VueQRCode);
Vue.use(VeeValidate);
// Vue.use(Buefy)
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: require('./../src/assets/images/layout/loader.png')
})


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
