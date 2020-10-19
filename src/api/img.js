import request from '@/utils/request'

export function saveImg(data) {
  return request({
    url: '/img/save',
    method: 'post',
    headers: {
      // 'content-type': 'multipart/form-data'
    },
    data
  })
}
