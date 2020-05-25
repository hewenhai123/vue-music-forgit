import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// Vue.config.productionTip = false

import 'common/stylus/index.styl'

fastclick.attach(document.body)

/* eslint-disable no-new */

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

let vueApp=new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

