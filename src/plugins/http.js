import axios from 'axios'
import Vue from 'vue'

const instance = axios.create({
  baseURL:"https://cnodejs.org/api/v1",
  timeout:2000,
})

instance.interceptors.request.use((config) => {
  return config
})

instance.interceptors.response.use((res) =>{
  return res.data
})

// Vue.prototype.$http = instance
export default instance