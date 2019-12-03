import { axios } from '@/utils/request'
import qs from 'qs'

/**
 * @description: 收藏账号-新建分组
 * @param {Object} detail [收藏账号]
 * @return: api
 * @author yylong 2019/09/16
 */

const api = {
  collectGroupList: '/api/user/collectGroupList',
  addCollectGroup: '/api/user/addCollectGroup',
  addCollect: '/api/user/addCollect',
  myCollect: '/api/user/myCollect',
  myCollectDelete: '/api/user/myCollectDelete'
}

/**
 * @description: 收藏账号
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: collectGroupList
 */

export function collectGroupList() {
  return axios({
    method: 'get',
    url: api.collectGroupList
  })
}

/**
 * @description: 添加分组
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: addCollectGroup
 */

export function addCollectGroup(parameter: any) {
  return axios({
    method: 'post',
    url: api.addCollectGroup,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 添加收藏
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: addCollectGroup
 */

export function addCollect(parameter: any) {
  return axios({
    method: 'post',
    url: api.addCollect,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 我的收藏
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: ranklist
 */

export function myCollect(parameter: any) {
  return axios({
    method: 'get',
    url: api.myCollect,
    params: parameter
  })
}

/**
 * @description: 删除收藏
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: myCollectDelete
 */

export function myCollectDelete(parameter: any) {
  return axios({
    method: 'get',
    url: api.myCollectDelete,
    params: parameter
  })
}
