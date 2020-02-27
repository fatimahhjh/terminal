import Vue from "vue";
import "../common/base.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '../assets/icon/iconfont.css';
import axios from 'axios' //引入axios
import Hub from './utils/hub.js'
let _ = require('lodash')
// axios.defaults.baseURL="/staff/"
Vue.prototype.$http = axios; //把axios挂载到vue上
// 配置请求的根路径
// axios.defaults.baseURL=''

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  data() {
    return {
      Hub
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");