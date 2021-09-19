import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();
Vue.use(toast)

// 解决移动端300ms延时
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/meidusha.jpg')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
