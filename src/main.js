import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
// 引入样式
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// 设置axios常态地址
axios.defaults.baseURL('http://ttapi.research.itcast.cn/mp/v1_0')
// 将vue实例共享给全局使用
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
