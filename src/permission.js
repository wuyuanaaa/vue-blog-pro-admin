import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { getToken } from './utils/auth'

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  const hasToken = !!getToken()

  if (hasToken) {
    const hasUserInfo = !!store.getters.userInfo
    try {
      !hasUserInfo && await store.dispatch('user/getUserInfo')
    } catch (e) {
      console.log('getInfo err', e)
    }

    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach((to, from) => {
  document.title = to.meta ? `后台 -- ${to.meta.title}` : '后台'
  NProgress.done()
})
