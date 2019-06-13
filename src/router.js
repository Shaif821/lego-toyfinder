import Vue from 'vue'
import Router from 'vue-router'

const SlideScreen = () => import('./components/SlideScreen')
const ListPage = () => import('./components/list/ListPage')


Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',

    routes: [
        {
            path: '/toyfinder',
            name: 'toyfinder',
            component: SlideScreen
        },
        {
            path: '/:id',
            name: 'list-page',
            component: ListPage
        },
        {
            path: '/',
            name: 'list-page-no',
            component: ListPage
        }
    ]
})
