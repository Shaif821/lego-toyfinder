import Vue from 'vue'
import Router from 'vue-router'

import SlideScreen from './components/SlideScreen'


Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',

    routes: [
        {
            path: '/lego-toyfinder/',
            name: 'screen-saver',
            component: SlideScreen
        },
        {
            path: '/lego-toyfinder/:id1-:id2-:id3-:id4'
        }
    ]
})

