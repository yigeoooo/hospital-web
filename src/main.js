import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import request from 'request/request'


Vue.use(Antd);
Vue.config.productionTip = false
Vue.prototype.request=request

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
