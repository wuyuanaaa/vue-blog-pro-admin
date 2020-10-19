import request from '@/utils/request'

// 新建文章
export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

// 修改文章
export function editArticle(data) {
  return request({
    url: '/article/edit',
    method: 'put',
    data
  })
}

// 删除文章
export function removeArticle(id) {
  return request({
    url: '/article/remove',
    method: 'delete',
    data: { id }
  })
}

// 获取所有文章
export function getAllArticleList(params) {
  return request({
    url: '/article/page/all',
    method: 'get',
    params
  })
}

// 获取单篇文章详情
export function getArticleDetail(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: {
      id
    }
  })
}
