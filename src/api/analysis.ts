import { axios } from '@/utils/request'
// import qs from 'qs'

/**
 * @description: 投前分析 API 统一管理
 * @param {Object} analysis [投前分析]
 * @return: api
 * @author yylong 2019/12/09
 */

const api = {
  videoData: '/api/videoData',
  fansPortrait: '/api/fansPortrait',
  videoDayData: '/api/videoDayData'
}

/**
 * @description: 投前分析 初始化信息
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: videoData
 */

export function videoData(parameter: any) {
  return axios({
    method: 'get',
    url: api.videoData,
    params: parameter
  })
}

/**
 * @description: 粉丝画像分析
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: videoData
 */

export function fansPortrait(parameter: any) {
  return axios({
    method: 'get',
    url: api.fansPortrait,
    params: parameter
  })
}

/**
 * @description: 粉丝数据趋势
 * @param {string} method [请求方式]
 * @param {object} params [传入参数]
 * @return: videoDayData
 */

export function videoDayData(parameter: any) {
  return axios({
    method: 'get',
    url: api.videoDayData,
    params: parameter
  })
}
