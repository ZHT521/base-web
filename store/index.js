import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import permissionRoutes from './permissionRoutes'
import tabsTag from './tabsTag'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    permissionRoutes,
    tabsTag
  }
})
