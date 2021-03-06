// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Qs from 'qs';
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import BaiduMap from 'vue-baidu-map'


import VueParticles from 'vue-particles'
Vue.use(VueParticles)


import echarts from 'echarts';
Vue.prototype.$echarts = echarts;


Vue.prototype.$video = Video
Vue.use(ElementUI)
Vue.use(BaiduMap, {
  ak: 'kHh6RIvClwEnteofGiGoeAhO7HQPxmjl'
})


Vue.config.productionTip = false
Vue.prototype.$axios =Axios
Vue.prototype.$qs =Qs;
Axios.defaults.baseURL='api'

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  router :router,
  // 渲染
  render:h=>h(App)
}).$mount("#app")
