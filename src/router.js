import Vue from 'vue'
import Router from 'vue-router'

import SlideScreenSurvey from './components/SlideScreenSurvey'
import LegoSurvey from './components/survey/LegoSurvey'
import ProductList from './components/product/ProductList'


Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',

    routes: [
        {
            path: '/',
            name: 'screen-saver',
            component: SlideScreenSurvey
        },
        {
          path: '/survey',
          name: 'survey',
          component: LegoSurvey
        },
        {
            path: '/survey/theme',
            name: 'survey-theme',
            component: LegoSurvey
        },
        {
            path: '/products',
            name: 'products-all',
            component: ProductList
        },
        {
            path: '/products/age/:age/interest/:interest',
            name: 'products-age-interest',
            component: ProductList
        },
    ]
})

