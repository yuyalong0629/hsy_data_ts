import { axios } from '@/utils/request'

/**
 * @description: 用户首页信息 API
 * @param {Object} Home [*]
 * @return: api
 * @author yylong 2019/11/22
 */

const api = {
  pkData: '/api/index',
  newsContentInfoList: '/api/newsContentInfoList',
  newsContentInfoDetail: '/api/newsContentInfoDetail',
  navFilter: '/api/searchFilter'
}

/**
 * @description: 首页榜单粉丝数
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: pkData
 */

export function pkData() {
  return axios({
    method: 'get',
    url: api.pkData
  })
}

/**
 * @description: 火烧云课堂
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: newsContentInfoList
 */

export function newsContentInfoList(parameter: any) {
  return axios({
    method: 'get',
    url: api.newsContentInfoList,
    params: parameter
  })
}

/**
 * @description: 火烧云课堂详情
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: newsContentInfoDetail
 */

export function newsContentInfoDetail(parameter: any) {
  return axios({
    method: 'get',
    url: api.newsContentInfoDetail,
    params: parameter
  })
}

/**
 * @description: 账号搜索 分类显示
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @param {Number} type [0 排行榜搜索 / 1账号搜索 / 2内容搜索]
 * @return: navFilter
 */

export function navFilter(parameter: any) {
  return axios({
    method: 'get',
    url: api.navFilter,
    params: parameter
  })
}
