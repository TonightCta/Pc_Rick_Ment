import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios';
import '../theme/index.css'
import ElementUI from 'element-ui';
import '../static/css/index.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.prototype.$axios=Axios;
Vue.prototype.url="http://hexsoft.top:8080/"
Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
