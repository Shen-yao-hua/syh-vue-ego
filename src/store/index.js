import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './module/loginModule'
import editorModule from './module/editorModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginModule,
    editorModule
  }
})
