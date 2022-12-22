import moment from 'moment/moment'
import Vue from 'vue'
import 'moment/locale/zh-cn'

// 日期格式化
moment.locale('zh-cn')
Vue.filter('fromNow',(time) => moment(time).fromNow())

// 类别文字转换 
Vue.filter('tabTextTransform',(tab) => tab === 'share' ? '分享' : tab === 'ask' ? '问答' : tab === 'job' ? '招聘' : '客户端测试')