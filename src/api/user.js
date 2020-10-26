import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login/admin',
    method: 'post',
    data
  })
}

export function getUserInfoByToken() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}
