import { login, loginOut } from '@/views/login/Api.js'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    user: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },
  actions: {
    // 登录
    Login({ commit, dispatch }, userInfo) {
      const username = userInfo.username
      const password = userInfo.password
      return login(username, password).then(res => {
       setToken(res.data.token)
        commit('SET_TOKEN', res.data.token)
        commit('SET_USER', res.data.user)
        dispatch('setPermissionsRoutes', res.data.menus)
      }).catch(error => {
        this.$message.error(error == null ? '登录失败' : error)
      })
    },
    // 退出登录
    LoginOut({ commit }) {
      return loginOut().then(res => {
        removeToken()
        commit('SET_TOKEN', '')
        commit('SET_USER', {})
      }).catch(error => {
       this.$message.error(error == null ? '退出失败' : error)
      })
    },
     // 动态路由传值
    setPermissionsRoutes({ dispatch }, data) {
      dispatch('permissionRoutes/GenerateRoutes', data, { root: true }) // 调menu里的方法
    }
  }
}
export default user
