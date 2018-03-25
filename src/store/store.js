import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './modules/actions'
import User from './modules/user'
import Navigation from './modules/navigation'
import Messages from './modules/messages'
Vue.use(Vuex)

export const store = new Vuex.Store({
  actions,
  modules: {
    User,
    Navigation,
    Messages
  }
})
