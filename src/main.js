import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http'
import store from './store'
import global from '@/utils/global'
import ElementUI from 'element-ui'
import './mock'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'
import '@/styles/common.scss';


Vue.use(ElementUI)
Vue.use(api)

Vue.prototype.global = global;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
