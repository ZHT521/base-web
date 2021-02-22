import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$request = request // ajax请求方法
Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}
Vue.prototype.msgWaring = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'warning' })
}
Vue.prototype.msgError = function(msg) {
 this.$message({ showClose: true, message: msg, type: 'error' })
}
Vue.prototype.msgInfo = function(msg) {
  this.$message({ showClose: true, message: '这是一条消息提示' })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
