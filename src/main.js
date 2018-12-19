import Vue from 'vue'
import router from './router'
import VAnimateCss from 'v-animate-css';
import VueAwesomeSwiper from 'vue-awesome-swiper'

import App from './App.vue'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VAnimateCss);
Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
