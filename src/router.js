import Vue from 'vue'
import Router from 'vue-router'

import SlideScreen from './components/SlideScreen'
import ListPage from './components/list/ListPage'


Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',

    routes: [
        {
            path: '/lego-toyfinder/toyfinder',
            name: 'toyfinder',
            component: SlideScreen
        },
        {
            path: '/lego-toyfinder/:id',
            name: 'list-page',
            component: ListPage
        },
        {
            path: '/lego-toyfinder/',
            name: 'list-page-no',
            component: ListPage
        }
    ]
})

