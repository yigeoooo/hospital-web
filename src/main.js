import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import request from 'request/request'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';

Vue.use(Antd);
Vue.config.productionTip = false
Vue.prototype.request=request
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
Vue.use(VueMarkdownEditor);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
