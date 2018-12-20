import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        surveyOptions: [{
            age : [],
            interest: [],
        }]
    }
})
export default store;