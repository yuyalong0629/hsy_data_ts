import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './router.config'
import store from '../store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = `火烧云数据-${to.meta.title}`
  }

  if (to.fullPath === '/index') {
    store.commit('user/SET_HOT', false)
  } else {
    store.commit('user/SET_HOT', true)
  }

  if (to.meta.hidden) {
    const isLogin = store.getters['user/GET_STORAGE']

    if (isLogin) {
      next()
      NProgress.done()
      return
    }
    // 未登录状态显示登录 Modal
    store.commit('user/LOGIN_MODAL', true)
    next({ path: from.fullPath, query: { redirect: to.fullPath } })
    NProgress.done()
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
