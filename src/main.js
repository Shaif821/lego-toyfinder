import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import store from "./store/store";
import VAnimateCss from "v-animate-css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VeeValidate from "vee-validate";
import VModal from "vue-js-modal";
import { VLazyImagePlugin } from "v-lazy-image";
import VueAnalytics from "vue-analytics";

Vue.use(VAnimateCss);
Vue.use(VLazyImagePlugin);
Vue.use(VueAwesomeSwiper);
Vue.use(VeeValidate);
Vue.use(VModal);

Vue.use(VueAnalytics, {
  id: "UA-138977338-2 ",
  // debug: {
  //   enabled: true, // default value
  //   trace: false, // default value
  //   sendHitTask: true // default value
  // }
});

Vue.config.productionTip = false;
Vue.config.performance = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
