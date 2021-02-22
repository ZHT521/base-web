import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'

// 创建axios实例
const request = axios.create({
  withCredentials: false,
  baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// request拦截器
request.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['token'] = getToken() // 请求头带上token
  }
  return config
  }, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
request.interceptors.response.use(
  response => {
   if (response.data && response.data.code == '2000') {
      return response.data
    } else {
     if (response.data && response.data.code == '9000') {
        Message({
          'message': 'token已过期，请重新登录！',
          'type': 'error',
          'offset': 20
        })
        // 30, token失效
         removeToken()
        router.push({ name: 'login' })
      } else {
      // this.$message.error(response.data.msg == null ? '接口请求失败！' : response.data.msg)
        return Promise.reject(response.data.msg)
      }
    }
  },
  error => {
   Message({
      'message': '服务器宕机，请联系接口工程师',
      'type': 'error',
      'offset': 20
    })
    return Promise.reject(error)
  }
)
export default request
