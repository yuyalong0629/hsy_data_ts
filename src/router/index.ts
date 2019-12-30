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

  // 等待百度统计加载完成之后 设置防盗链 'no-referrer'
  setTimeout(() => {
    let referrer: any = document.getElementById('referrer')
    referrer.setAttribute('content', 'never')
  }, 1000)

  if (to.meta.title) {
    document.title = `${to.meta.title}`
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
