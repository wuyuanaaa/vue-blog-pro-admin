import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/theme/index.css'
import ElementUI from 'element-ui'

import './day'

import 'normalize.css'
import './styles/index.scss'

import './filters'

import './permission'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
