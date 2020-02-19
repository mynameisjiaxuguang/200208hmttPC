import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
// 引入样式
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import JSONbig from 'json-bigint'
// 加载nprogress顶部样式文件，路径不需要写具体的
import 'nprogress/nprogress.css'
// 设置axios常态地址
// axios默认会把后端返回的数据用JSON.parse转为对象给我们使用，同时他也提供自定义转化功能
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios默认使用json.parse把后端返回的数据字符串转化为对象
axios.defaults.transformResponse = [function (data, header) {
  // console.log('后端原始数据', data, header)
  // return JSONbig.parse(data)   /会在有些请求下有问题
  // try catch相当于if else 如果try里面代码执行异常，就执行patch
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
  }
}]
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config)
  const token = window.localStorage.getItem('user-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config // 是用于放行的
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
// 将vue实例共享给全局使用
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
