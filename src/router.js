import Vue from 'vue'
import Router from 'vue-router'


import ScreenSaver from './components/layout/ScreenSaver'
import LegoSurvey from './components/survey/LegoSurvey'


Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',

    routes: [
        {
            path: '/',
            name: 'screen-saver',
            component: ScreenSaver
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
        }
    ]
})