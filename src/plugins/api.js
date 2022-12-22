// 二次封装
import http from './http'

// 获取主题列表
// tab 类别
// page 页数
// limit 条数 默认 40
export const getTopics = ({ tab, page = 1,limit = 40 }) =>{
  // get 请求传递参数 地址栏 直接?
  // xxx?a=10&tab=all&page=5&limit=100
  return http.get('/topics',{params:{ tab, page, limit }})
}
// 获取主题详情
export const getTopic = (id,accesstoken) => http.get(`/topic/${id}`,accesstoken ? { params:{accesstoken:accesstoken}} : {})

export const getUserInfo = (loginname) => http.get(`/user/${loginname}`)

export const login = (accesstoken) => http.post('/accesstoken',{accesstoken : accesstoken})

export const collected = (topic_id , accesstoken) => http.post('/topic_collect/collect', {accesstoken,topic_id})

export const de_collected = (topic_id , accesstoken) => http.post('/topic_collect/de_collect', {accesstoken,topic_id})

export const zan = (reply_id , accesstoken) => http.post(`/reply/${reply_id}/ups `, {accesstoken})

export const reply = (topic_id,accesstoken,content) => http.post(`/topic/${topic_id}/replies`,{accesstoken,content})

export const create = (accesstoken,title,tab,content) => http.post('/topics',{accesstoken,title,tab,content})


export const getMessageCount = (accesstoken) => http.get('/message/count',{params:{accesstoken}})


export const getMessage = (accesstoken) => http.get('/messages',{params:{accesstoken}})

export const markAllMessage = (accesstoken) => http.post('/message/mark_all',{accesstoken})

// 命名导出
// export {getTopics , getTopic}