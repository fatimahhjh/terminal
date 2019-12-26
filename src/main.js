import Vue from "vue";
import "../common/base.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '../src/assets/iconfont/fonts/iconfont.css'
import axios from 'axios'//引入axios
axios.defaults.baseURL="/apps/onekey/api"
Vue.prototype.$http = axios;//把axios挂载到vue上
// 配置请求的根路径
// axios.defaults.baseURL=''

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");