import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/store'
import VAnimateCss from 'v-animate-css';
import VueAwesomeSwiper from 'vue-awesome-swiper'


// require styles
import 'swiper/dist/css/swiper.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

Vue.use(VAnimateCss);
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
