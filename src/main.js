import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios';
import '../theme/index.css'
import ElementUI from 'element-ui';
import '../static/css/index.css'
import Viewer from 'v-viewer'
import './assets/iconfont/iconfont.css'
// import 'element-ui/lib/theme-chalk/index.css';
import 'viewerjs/dist/viewer.css'
Vue.prototype.$axios=Axios;
// Vue.prototype.url="http://hexsoft.top:8080"
Vue.prototype.url="http://10.0.0.28:8080"
// Vue.prototype.url='http://admin.rightservicetech.com'
Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': false, 'toolbar': false, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': false, 'scalable': false, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
