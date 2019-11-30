import { axios } from '@/utils/request'
// import qs from 'qs'

/**
 * @description: 账号监控
 * @param {Object} similar [相似号]
 * @return: api
 * @author yylong 2019/09/16
 */

const api = {
  searchKeyword: '/api/searchKeyword',
  searchKol: '/api/searchKol',
  searchContent: '/api/searchContent'
}

/**
 * @description: 用户搜索记录
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: searchKeyword
 */

export function searchKeyword(parameter: any) {
  return axios({
    method: 'get',
    url: api.searchKeyword,
    params: parameter
  })
}

/**
 * @description: 账号搜索
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: search
 */

export function searchKol(parameter: any) {
  return axios({
    method: 'get',
    url: api.searchKol,
    params: parameter
  })
}

/**
 * @description: 内容搜索
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @param {Number} cType [1标题+简介 / 2标签+评论 / 3评论]
 * @return: searchContent
 */

export function searchContent(parameter: any) {
  return axios({
    method: 'get',
    url: api.searchContent,
    params: parameter
  })
}
