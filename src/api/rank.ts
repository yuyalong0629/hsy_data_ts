import { axios } from '@/utils/request'
// import qs from 'qs'

/**
 * @description: 用户信息API统一管理
 * @param {Object} rank [排行榜]
 * @return: api
 * @author yylong 2019/09/05
 */

const api = {
  ranklist: '/api/ranking',
  details: '/api/koldetails',
  insearch: '/api/insearch',
  histordatas: '/api/histordatas',
  hostRanking: '/api/hostRanking',
  brandKeyword: '/api/brandKeyword',
  boutiqueAnalysis: '/api/boutiqueAnalysis'
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

/**
 * @description: 详情用户信息
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: details
 */

export function details(parameter: any) {
  return axios({
    method: 'get',
    url: api.details,
    params: parameter
  })
}

/**
 * @description: 号内搜索
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: insearch
 */

export function insearch(parameter: any) {
  return axios({
    method: 'get',
    url: api.insearch,
    params: parameter
  })
}

/**
 * @description: 历史作品数据统计
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: histordatas
 */

export function histordatas(parameter: any) {
  return axios({
    method: 'get',
    url: api.histordatas,
    params: parameter
  })
}

/**
 * @description: 火热帮
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: hostRanking
 */

export function hostRanking(parameter: any) {
  return axios({
    method: 'get',
    url: api.hostRanking,
    params: parameter
  })
}

/**
 * @description: 词云图
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: brandKeyword
 */

export function brandKeyword(parameter: any) {
  return axios({
    method: 'get',
    url: api.brandKeyword,
    params: parameter
  })
}

/**
 * @description: 竞品投放
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: boutiqueAnalysis
 */

export function boutiqueAnalysis(parameter: any) {
  return axios({
    method: 'get',
    url: api.boutiqueAnalysis,
    params: parameter
  })
}
