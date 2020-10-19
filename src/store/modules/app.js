
const state = {
  isSmallScreen: false
}

const mutations = {
  SET_IS_SMALL_SCREEN: (state, flag) => {
    state.isSmallScreen = flag
  }
}

const actions = {
  setIsSmallScreen({ commit }, flag) {
    commit('SET_IS_SMALL_SCREEN', flag)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
