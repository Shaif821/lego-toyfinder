import Vue from 'vue'
import Router from 'vue-router'


import ScreenSaver from './components/ScreenSaver'

Vue.use(Router);

export default new Router({
    mode: 'history',

    routes: [
        {
            path: '/',
            name: 'screen-saver',
            component: ScreenSaver
        },
    ]
})