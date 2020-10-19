import request from '@/utils/request'

// 获取所有文章
export function getCommentPage(params) {
  return request({
    url: '/comment/page',
    method: 'get',
    params
  })
}

// 获取所有文章
export function removeComment(id) {
  return request({
    url: '/comment/remove',
    method: 'delete',
    data: { id }
  })
}
