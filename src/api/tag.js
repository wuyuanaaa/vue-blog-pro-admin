import request from '@/utils/request'

export function createTag(data) {
  return request({
    url: '/tag/create',
    method: 'post',
    data
  })
}

export function getTagList() {
  return request({
    url: '/tag/list',
    method: 'get'
  })
}

export function getTagPage(params) {
  return request({
    url: '/tag/page',
    method: 'get',
    params
  })
}

// 修改标签
export function editTag(data) {
  return request({
    url: '/tag/edit',
    method: 'put',
    data
  })
}

export function removeTag(id) {
  return request({
    url: '/tag/remove',
    method: 'delete',
    data: { id }
  })
}
