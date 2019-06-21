import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/store'
import VAnimateCss from 'v-animate-css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VeeValidate from 'vee-validate'
import VModal from 'vue-js-modal'
import { VLazyImagePlugin } from "v-lazy-image";
import VueGtm from 'vue-gtm';

Vue.use(VAnimateCss);
Vue.use(VLazyImagePlugin);
Vue.use(VueAwesomeSwiper);
Vue.use(VeeValidate);
Vue.use(VModal);

Vue.use(VueGtm, {
    id: 'GTM-5LV9SZR', // Your GTM ID
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: true, // Whether or not display console logs debugs (optional)
    vueRouter: router, // Pass the router instance to automatically sync with router (optional)
    // ignoredViews: ['homepage'] // If router, you can exclude some routes name (case insensitive) (optional)
});

Vue.config.productionTip = false
Vue.config.performance = true

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
