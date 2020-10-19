import { setToken, encryption } from '@/utils/auth'
import { login, getUserInfoByToken } from '@/api/user'

const state = {
  userInfo: null
}

const mutations = {
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo

    const login_info = encryption({
      data: {
        username,
        password
      },
      param: ['password']
    })
    return new Promise((resolve, reject) => {
      login(login_info)
        .then(response => {
          setToken(response.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },
  logout({ commit }) {
    setToken('')
    commit('SET_USER_INFO', null)
  },
  getUserInfo({ commit }) {
    return getUserInfoByToken()
      .then(info => {
        commit('SET_USER_INFO', info)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
