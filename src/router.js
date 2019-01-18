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
            path: '/lego-toyfinder/',
            name: 'toyfinder',
            component: SlideScreen
        },
        {
            path: '/lego-toyfinder/list/:id',
            name: 'list-page',
            component: ListPage
        },
        {
            path: '/lego-toyfinder/list/',
            name: 'list-page-no',
            component: ListPage
        }
    ]
})

