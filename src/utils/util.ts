import Vue from 'vue'

/**
 * @description: 微信扫码登录
 * @param {function}
 * @return: {*}
 */

export function wxLogin(userId: string = 'ef311ed88cf1e31323097f4369a74537'): any {
  return new WxLogin({
    id: 'login_container',
    appid: 'wx05050984d40b684f',
    scope: 'snsapi_login',
    redirect_uri: 'http://www.hsydata.com/',
    state: userId,
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

/**
 * @description: 非会员权限提示
 * @param {type} [*]
 * @return: notice
 */

export async function vipNotice(this: any, content: string, onCancel: any = () => { }) {
  const self = this
  this.$confirm({
    title: '权限受限',
    content: content,
    okText: '立即升级',
    cancelText: '取消',
    destroyOnClose: true,
    maskStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)'
    },
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          self.$router.push({ path: '/members/pay' })
          resolve()
        }, 1000)
      }).catch(() => console.log('Oops errors!'))
    },
    onCancel
  })
}

/**
 * @description: 数组对象排序
 * @param {type} [*]
 * @return: objectSort
 */

export function objectSort(field: any) {
  return function (obj1: any, obj2: any) {
    var value1 = obj1[field]
    var value2 = obj2[field]
    return value2 - value1 // 降序
  }
}
