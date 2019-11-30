import Vue from 'vue'
import { formatDate } from './date'

/**
 * @description 时间格式化
 * @time 2019/10/24 16:14
 */

Vue.filter('formatDate', function (time: any) {
  var date = new Date(time)
  return formatDate(date, 'yyyy-MM-dd hh:ss')
})
