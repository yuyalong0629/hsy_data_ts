import { axios } from '@/utils/request'
// import qs from 'qs'

/**
 * @description: 用户信息API统一管理
 * @param {Object} rank [排行榜]
 * @return: api
 * @author yylong 2019/09/05
 */

const api = {
  ranklist: '/api/ranking'
}

/**
 * @description: 排行榜 Table 数据
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: ranklist
 */

export function ranklist(parameter: any) {
  return axios({
    method: 'get',
    url: api.ranklist,
    params: parameter
  })
}
