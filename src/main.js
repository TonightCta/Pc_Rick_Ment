import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios';
import '../theme/index.css'
import ElementUI from 'element-ui';
import '../static/css/index.css'
Vue.prototype.$axios=Axios;
Vue.prototype.url="http://hexsoft.top:8080/"
Vue.config.productionTip = false;
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
