import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './modules/actions'
Vue.use(Vuex)

export const store = new Vuex.Store({
  actions
})
