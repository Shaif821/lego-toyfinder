import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/store'
import VAnimateCss from 'v-animate-css';

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VAnimateCss);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
