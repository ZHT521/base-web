import request from '@/utils/request'

// 登录方法
export function login(username, password) {
  const data = {
    bizPara: { username, password },
    pagePara: {}
  }
 return request({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}

export function loginOut() {
  return request({
    url: '/auth/logout',
    method: 'post',
    data: {}
  })
}
