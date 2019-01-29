import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/store'
import VAnimateCss from 'v-animate-css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VeeValidate from 'vee-validate'


Vue.use(VAnimateCss);
Vue.use(VueAwesomeSwiper);
Vue.use(VeeValidate);



Vue.config.productionTip = false
Vue.config.performance = true

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
