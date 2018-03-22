import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './modules/actions'
import Navigation from './modules/navigation'
Vue.use(Vuex)

export const store = new Vuex.Store({
  actions,
  modules: {
    Navigation
  }
})
