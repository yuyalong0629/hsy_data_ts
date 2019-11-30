import { axios } from '@/utils/request'
// import qs from 'qs'

/**
 * @description: 相似号
 * @param {Object} similar [相似号]
 * @return: api
 * @author yylong 2019/09/16
 */

const api = {
  similarKolList: '/api/similarKolList'
}

/**
 * @description: 相似号 info
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: similarKolList
 */

export function similarKolList(parameter: any) {
  return axios({
    method: 'get',
    url: api.similarKolList,
    params: parameter
  })
}
