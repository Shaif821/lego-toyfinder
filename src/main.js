import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VeeValidate from 'vee-validate'
import VModal from 'vue-js-modal'
import { VLazyImagePlugin } from "v-lazy-image";

Vue.use(VLazyImagePlugin);
Vue.use(VueAwesomeSwiper);
Vue.use(VeeValidate);
Vue.use(VModal)

Vue.config.productionTip = false
Vue.config.performance = true

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
