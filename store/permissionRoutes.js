import { staticRoutes } from '@/router/index'

const menu = {
  namespaced: true,
  state: {
    routes: [], // 所有路由
    addRoutes: [], // 服务器返回的动态路由
    currentRoutes: [], // 当前路由
    allSubRoutes: [] // 所有的子路由集
    },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = staticRoutes.concat(routes)
    },
    SET_CURRENTROUTES: (state, routes) => {
      state.currentRoutes = routes
    },
    SET_ALLSUBROUTES: (state, routes) => {
      state.allSubRoutes = routes
    },
    SET_TABSBARROUTES: (state, routes) => {
      state.tabsBarRoutes = routes
    }
  },
   actions: {
    // 生成路由
    GenerateRoutes({ commit }, data) {
     // 路由数据
      const rdata = JSON.parse(JSON.stringify(data))
      const rewriteRoutes = filterAsyncRouter(rdata)
      const allsubroutes = getAllSubRoutes(rdata)
       commit('SET_ROUTES', rewriteRoutes)
      commit('SET_CURRENTROUTES', rewriteRoutes[0])
      commit('SET_ALLSUBROUTES', allsubroutes)
      }
    }
  }
  // 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  let ary = []
  asyncRouterMap.forEach((el, index) => {
    const parentRoute = {}
    if (el.children && el.children.length && el.children != null) {
      parentRoute.name = el.id
      parentRoute.meta = { title: el.text }
      parentRoute.children = filterChildren(el.children)
    } else {
      delete el['children']
      delete el['redirect']
    }
    ary = ary.concat(parentRoute)
    return true
     })
  return ary
}
function filterChildren(childrenMap, lastRouter = false) {
  let children = []
  childrenMap.forEach((el, index) => {
    const parentRoute = {}
     if (el.children && el.children.length) {
      parentRoute.name = el.id
      parentRoute.meta = { title: el.text }
      parentRoute.children = []
      el.children.forEach(c => {
        const route = {}
        route.path = '/' + c.url
        route.name = c.id
        route.component = loadView(c.url)
        route.meta = { title: c.text }
         parentRoute.children.push(route)
      })
    }
    children = children.concat(parentRoute)
  })
  return children
}

function getAllSubRoutes(router) {
  let aryRoutes = []
  router.forEach((el1, index) => { // 第一层主路由
    if (el1.children) {
     el1.children.forEach((el2, index) => { // 第二层主路由
        if (el2.children) {
          el2.children.forEach((el3, index) => { // 第三层主路由
           const route = {}
            route.path = '/' + el3.url
            route.name = el3.id
            route.component = loadView(el3.url)
            route.meta = { title: el3.text }
            aryRoutes = aryRoutes.concat(route)
          })
        } else { // 第二层路由 且没有第三层children
         if (el2.url) {
            const route = {}
            route.path = '/' + el2.url
            route.name = el2.id
            route.component = loadView(el2.url)
            route.meta = { title: el2.text }
            aryRoutes = aryRoutes.concat(route)
          }
        }
      })
    }
  })
  return aryRoutes
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}.vue`], resolve)
}

export default menu
     
  
