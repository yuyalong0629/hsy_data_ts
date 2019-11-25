import Vue from 'vue'

interface State {
  info: null
  loginModal: boolean
}

const state: State = {
  info: null,
  loginModal: false
}

const getters: any = {
  GET_STORAGE(state: any) {
    if (!state.info) {
      state.info = JSON.parse(Vue.ls.get('USER_INFO'))
    }
    return state.info
  }
}

const mutations: any = {
  SET_LOGIN(state: any, info: any) {
    Vue.ls.set('USER_INFO', JSON.stringify(info))
    state.info = info
  },
  LOGIN_MODAL(state: any, modal: boolean) {
    state.loginModal = modal
  }
}

export default {
  state,
  getters,
  mutations,
  namespaced: true
}
