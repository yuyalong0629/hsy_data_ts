/**
 * @description: 微信扫码登录
 * @param {function}
 * @return: {*}
 */

export function wxLogin(): any {
  return new WxLogin({
    id: 'login_container',
    appid: 'wx05050984d40b684f',
    scope: 'snsapi_login',
    redirect_uri: 'http://www.hsydata.com/',
    state: 'ef311ed88cf1e31323097f4369a74537',
    style: 'black',
    href:
      'data:text/css;base64,LnRpdGxlIHsKICBkaXNwbGF5OiBub25lOwp9CgouaW5mbyB7CiAgZGlzcGxheTogbm9uZTsKfQo='
  })
}
