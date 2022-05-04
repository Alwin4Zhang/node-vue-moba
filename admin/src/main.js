import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

//把公共资源混入其他组件，可以全局使用
Vue.mixin({
  computed:{
    // 计算属性
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    // 计算方法
    getAuthHeaders() {
      return {
        Authorization:`Bearar ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
