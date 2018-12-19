import Vue from 'vue'
import Router from 'vue-router'


import ScreenSaver from './components/ScreenSaver'
import LegoSurvey from './components/LegoSurvey'

import SurveyAge from './components/SurveyAge'
import SurveyInterest from './components/SurveyInterest'

Vue.use(Router);

export default new Router({
    mode: 'history',

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
            path: '/survey/age',
            name: 'survey-age',
            component: SurveyAge
        },
        {
            path: '/survey/interest',
            name: 'survey-interest',
            component: SurveyInterest
        }
    ]
})