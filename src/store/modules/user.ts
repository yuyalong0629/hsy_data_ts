import Vue from 'vue'

interface State {
  info: null
  loginModal: boolean
  isHot: boolean
}

const state: State = {
  info: null,
  loginModal: false,
  isHot: false
}

const getters: any = {
  GET_STORAGE(state: any) {
    if (!state.info) {
      state.info = JSON.parse(Vue.ls.get('USER_INFO'))
    }
    return state.info
  },
  GET_HOT(state: any) {
    if (!state.isHot) {
      state.isHot = JSON.parse(Vue.ls.get('SETHOT'))
    }
    return state.isHot
  }
}

const mutations: any = {
  SET_LOGIN(state: any, info: any) {
    Vue.ls.set('USER_INFO', JSON.stringify(info))
    state.info = info
  },
  // 登录权限框
  LOGIN_MODAL(state: any, modal: boolean) {
    state.loginModal = modal
  },
  // 设置 Menu 火热榜显示
  SET_HOT(state: any, b: boolean) {
    Vue.ls.set('SETHOT', JSON.stringify(b))
    state.isHot = b
  }
}

export default {
  state,
  getters,
  mutations,
  namespaced: true
}
