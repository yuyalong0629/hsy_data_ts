import { axios } from '@/utils/request'
import qs from 'qs'

/**
 * @description: 账号监控
 * @param {Object} similar [相似号]
 * @return: api
 * @author yylong 2019/09/16
 */

const api = {
  monitorHistory: '/api/user/monitorHistory',
  addMonitor: '/api/user/addMonitor',
  searchKol: '/api/user/searchKol'
}

/**
 * @description: 用户监控历史
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: monitorHistory
 */

export function monitorHistory(parameter: any) {
  return axios({
    method: 'get',
    url: api.monitorHistory,
    params: parameter
  })
}

/**
 * @description: 添加监控
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: addMonitor
 */

export function addMonitor(parameter: any) {
  return axios({
    method: 'post',
    url: api.addMonitor,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 用户搜索kol
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: searchKol
 */

export function searchKol(parameter: any) {
  return axios({
    method: 'post',
    url: api.searchKol,
    data: qs.stringify(parameter)
  })
}
