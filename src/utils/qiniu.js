import * as qiniu from 'qiniu-js'
import { getToken } from '@/api/qiniu'

let token = ''
const BASE_URL = 'http://qiniu.yuanaaa.top/'

// 图片压缩参数
const compressOptions = {
  quality: 0.92,
  noCompressIfLarger: true
}

function checkAndUpdateToken() {
  return new Promise((resolve, reject) => {
    if (token !== '') {
      resolve(token)
    } else {
      getToken()
        .then(res => {
          token = res.token
          resolve(res.token)
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}

/**
 * 获取文件名
 */
function createFileKey() {
  return '' + new Date().getTime() + Math.floor(Math.random() * 10000000)
}

export async function upload(file, fileName) {
  const token = await checkAndUpdateToken()

  return new Promise((resolve, reject) => {
    qiniu.compressImage(file, compressOptions)
      .then(data => {
        console.log(data)
        const key = createFileKey()
        const observable = qiniu.upload(data.dist, key, token, {
          fname: fileName
        })

        observable.subscribe({
          next(res) {
            // ...
          },
          error(err) {
            reject(err)
          },
          complete(res) {
            resolve(BASE_URL + res.key)
          }
        })
      })
  })
}

