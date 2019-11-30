import Exception from '@/components/Layouts/Exception.vue'
import BasicLayout from '@/components/Layouts/BasicLayout.vue'

const routes = [
  // Basic
  {
    path: '/',
    name: 'basicLayout',
    redirect: '/index',
    component: BasicLayout,
    children: [
      // 首页
      {
        path: '/index',
        name: 'index',
        meta: { hidden: false },
        component: () => import('../views/home/Home.vue')
      },
      // 排行榜
      {
        path: '/rank',
        name: 'rank',
        meta: { hidden: false },
        component: () => import('../views/rank/Index.vue')
      },
      // 排行榜账号详情
      {
        path: '/rank/detail',
        name: 'detail',
        meta: { hidden: false },
        component: () => import('../views/rank/pages/Detail.vue')
      },
      // 投前分析
      {
        path: '/analysis',
        name: 'analysis',
        meta: { hidden: true },
        component: () => import('../views/analysis/Analysis.vue')
      },
      // 相似号
      {
        path: '/similar',
        name: 'similar',
        meta: { hidden: true },
        component: () => import('../views/similar/Index.vue')
      },
      // 账号搜索
      {
        path: '/search',
        name: 'search',
        meta: { hidden: true },
        component: () => import('../views/search/Index.vue')
      },
      // 内容查询
      {
        path: '/contentquery',
        name: 'contentquery',
        meta: { hidden: true },
        component: () => import('../views/content_query/Index.vue')
      },
      // 数据监控
      {
        path: '/monitoring',
        name: 'monitoring',
        meta: { hidden: true },
        component: () => import('../views/monitoring/Index.vue')
      },
      // 帮助中心
      {
        path: '/helper',
        name: 'helper',
        meta: { hidden: true },
        component: () => import('../views/helper/Index.vue')
      },
      // 关于我们
      {
        path: '/mine',
        component: () => import('@/views/mine/Mine.vue'),
        children: [
          {
            path: '/',
            redirect: '/mine/list'
          },
          {
            path: '/mine/list',
            component: () => import('../components/Classroom/List.vue')
          },
          {
            path: '/mine/detail',
            component: () => import('../components/Classroom/Detail.vue')
          }
        ]
      }
    ]
  },
  // exception
  {
    path: '/exception',
    name: 'exception',
    component: Exception,
    redirect: '/exception/404',
    meta: { title: '权限页' },
    children: [
      {
        path: '/exception/404',
        name: 'exception404',
        component: () => import('../views/exception/404.vue')
      },
      {
        path: '/exception/403',
        name: 'exception403',
        component: () => import('../views/exception/403.vue')
      },
      {
        path: '/exception/500',
        name: 'exception500',
        component: () => import('../views/exception/500.vue')
      }
    ]
  },
  {
    path: '*', redirect: '/exception/404'
  }
]

export default routes
