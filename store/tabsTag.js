const tabstag = {
  namespaced: true,
  state: {
    tabs: [],
    activeTab: {}
  },
   mutations: {
    SET_TABS: (state, value) => {
      if (value instanceof Array) {
        state.tabs = value
      } else {
      const index = state.tabs.findIndex(item => {
          if (item === value) {
            return true
          } else {
            return false
          }
        })
        if (index == -1) {
          state.tabs = state.tabs.concat(value)
        }
      }
    },
    SET_ACTIVETABTAG: (state, value) => {
      state.activeTab = value
    },
    SET_INITTABS: (state) => {
      state.tabs = []
      state.activeTab = {}
    },
    actions: {
    InitTabsTag({ commit }) {
      commit('SET_INITTABS')
    },
    AddTabsTag({ commit }, data) {
      commit('SET_TABS', data)
      commit('SET_ACTIVETABTAG', data)
    },
    RemoveSingleTabsTag({ commit, state }, data) {
      const Arytabs = state.tabs
      var index = Arytabs.indexOf(data)
      if (index > -1) {
      if (data == state.activeTab) {
          Arytabs.splice(index, 1)
          if (Arytabs.length > 0) {
            commit('SET_ACTIVETABTAG', Arytabs[0])
          } else {
            commit('SET_ACTIVETABTAG', {})
          }
        } else {
          Arytabs.splice(index, 1)
        }
      }
       commit('SET_TABS', Arytabs)
    },
    RemoveOtherTabsTag({ commit, state }) {
      const Arytabs = []
      Arytabs.push(state.activeTab)
      commit('SET_TABS', Arytabs)
    },
     SetActiveTabTag({ commit }, data) {
      commit('SET_ACTIVETABTAG', data)
    }
  }
}
export default tabstag
