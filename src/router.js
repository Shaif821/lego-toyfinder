import Vue from "vue";
import Router from "vue-router";

import SlideScreen from "./components/SlideScreen.vue";
import ListPage from "./components/list/ListPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",

  routes: [
    {
      path: "/toyfinder",
      name: "toyfinder",
      component: SlideScreen
    },
    {
      path: "/:id",
      name: "list-page",
      component: ListPage
    },
    {
      path: "/",
      name: "list-page-no",
      component: ListPage
    },
    {
      //404 page, redirects back to home (= /)
      path: "*",
      redirect: "/"
    }
  ]
});
