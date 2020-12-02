import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.css'

import './utils/eventbus'
import './plugins/element.js'
import './plugins/myComponents.js'
import './plugins/i18n.js'
import i18n from './plugins/i18n.js'

import {initProject} from './utils/init' //刷新页面初始化
initProject()


import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './plugins/element.js'

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
