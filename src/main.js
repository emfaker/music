import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/elementui'
import './utils/axios'
// 注册全局过滤器
import * as filters from './filter/filter'
Object.keys(filters).forEach((key) => {
  Vue.filter(key,filters[key]);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
