import { axios } from '@/utils/request'
import qs from 'qs'

interface Api {
  [key: string]: string
}

/**
 * @description: 用户信息 API
 * @param {Object} login [登录]
 * @return: api
 * @author yylong 2019/11/12
 */

const api: Api = {
  login: '/api/gologin',
  logout: '/api/logout',
  verificationCode: '/api/valicode.jpg?+Math.round(Math.random()*10000)',
  verifyCode: '/api/smsVerifyCode',
  register: '/api/goregister',
  weixinLogin: '/api/weixinLogin',
  weixinBinding: '/api/user/weixinBinding',
  forgetpwd: '/api/forgetpwd',
  userInfo: '/api/user/userInfo',
  setCoverImage: '/api/user/setCoverImage',
  updatepwd: '/api/user/updatepwd',
  updatePhone: '/api/user/updatePhone',
  verifyOldPhone: '/api/user/verifyOldPhone'
}

/**
 * @description: 用户登录api
 * @param {String} url [请求url]
 * @param {string} method [请求方式]
 * @param {object} data [传入参数]
 * @return: login
 */

export function login(parameter: any) {
  return axios({
    url: api.login,
    method: 'post',
    data: qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * @description: 退出登录
 * @param {Object} parameter [*]
 * @return: logout
 */

export function logout() {
  return axios({
    method: 'get',
    url: api.logout
  })
}

/**
 * @description: 用户注册获取图片验证码
 * @param {type} null
 * @return: verificationCode
 */

export function verificationCode() {
  return axios({
    method: 'get',
    url: api.verificationCode,
    responseType: 'arraybuffer'
  })
}

/**
 * @description: 用户注册获取短信验证码
 * @param {object} parameter [验证用户名/验证码]
 * @return: verifyCode
 */

export function verifyCode(parameter: any) {
  return axios({
    method: 'post',
    url: api.verifyCode,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 用户注册提交
 * @param {Object} parameter [注册信息]
 * @return: verificationCode
 */

export function register(parameter: any) {
  return axios({
    method: 'post',
    url: api.register,
    data: qs.stringify(parameter),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * @description: 微信扫码登录回调
 * @param {Object} parameter [注册信息]
 * @return: weixinLogin
 */

export function weixinLogin(parameter: any) {
  return axios({
    method: 'get',
    url: api.weixinLogin,
    params: parameter
  })
}

/**
 * @description: 微信绑定回调
 * @param {Object} parameter [注册信息]
 * @return: weixinBinding
 */

export function weixinBinding(parameter: any) {
  return axios({
    method: 'get',
    url: api.weixinBinding,
    params: parameter
  })
}

/**
 * @description: 忘记密码
 * @param {Object} parameter [用户信息]
 * @return: forgetpwd
 */

export function forgetpwd(parameter: any) {
  return axios({
    method: 'post',
    url: api.forgetpwd,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 获取用户信息
 * @param {Object} parameter [注册信息]
 * @return: userInfo
 */

export function userInfo() {
  return axios({
    method: 'get',
    url: api.userInfo
  })
}

/**
 * @description: 更新头像
 * @param {Object} parameter [*]
 * @return: setCoverImage
 */

export function setCoverImage(parameter: any) {
  return axios({
    method: 'post',
    url: api.setCoverImage,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 修改密码
 * @param {Object} parameter [注册信息]
 * @return: updatepwd
 */

export function updatepwd(parameter: any) {
  return axios({
    method: 'post',
    url: api.updatepwd,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 更新手机号
 * @param {Object} parameter [注册信息]
 * @return: updatePhone
 */

export function updatePhone(parameter: any) {
  return axios({
    method: 'post',
    url: api.updatePhone,
    data: qs.stringify(parameter)
  })
}

/**
 * @description: 验证原手机号
 * @param {Object} parameter [注册信息]
 * @return: erifyOldPhone
 */

export function verifyOldPhone(parameter: any) {
  return axios({
    method: 'post',
    url: api.verifyOldPhone,
    data: qs.stringify(parameter)
  })
}
