import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import store from '../store/index'

Vue.use(VueRouter)

// 3.1+版本以后 防止进入的路由是当前路由而报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 3.1+版本以后 防止进入的路由是当前路由而
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const constantRoutes =
  {
    path: '/home',
    name: 'home',
    redirect: '/welcome',
    meta: { title: '首页' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/home/home.vue'),
     children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () =>
          import(/* webpackChunkName: "" */ '../views/home/welcome.vue'),
        meta: { title: '欢迎使用' }
      }
 
 export const staticRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    // redirect: '/homeView',
    meta: { title: '登录' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue')
  }
  // { path: '*', name: '404', component: () => import('@/views/exception/404'), hidden: true }
]

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: staticRoutes
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
   if (getToken()) {
    /* has token*/
    if (to.path == '/login') {
      next()
      NProgress.done()
    } else {
     if (router.options.isAddDynamicMenuRoutes) {
        next()
      } else {
       constantRoutes.children = constantRoutes.children.concat(store.state.permissionRoutes.allSubRoutes)// 动态添加可访问路由表
        router.addRoute(constantRoutes)
         router.addRoute({ path: '*', name: '404', component: () => import('@/views/exception/404'), hidden: true })
        router.options.isAddDynamicMenuRoutes = true
       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
      }
    }
    } else {
    if (to.path == '/login') {
      next()
      NProgress.done()
      } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
