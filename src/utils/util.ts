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

/**
 * @description: 关键词高亮
 * @param {String} value [目标字符串]
 * @param {String} keyword [关键词]
 * @return: heightLight
 */

export function heightLight(value: string, keyword: string): string {
  return value.replace(
    new RegExp(keyword, 'gi'),
    `<span style="color: red;font-weight: bold;">${keyword}</span>`
  )
}

/**
 * @description: 转换单位 => 万
 * @param {Number} value [数字]
 * @return:numFixed
 */

export function numFixed(value: number) {
  return value > 9999 ? (value / 10000).toFixed(1) + '万' : value
}
