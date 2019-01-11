import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/store'
import VAnimateCss from 'v-animate-css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueQRCode from 'vue-qrcode-component'
import VeeValidate from 'vee-validate';
import Slick from 'vue-slick'


// require styles
import 'swiper/dist/css/swiper.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

Vue.use(VAnimateCss);
Vue.use(VueAwesomeSwiper);
Vue.use(VueQRCode);
Vue.use(VeeValidate);
Vue.use(Slick);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
