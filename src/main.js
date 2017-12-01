// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mini from 'mint-ui'
import 'mint-ui/lib/style.css'
import Icon from 'vue-svg-icon/Icon.vue'
import './config/rem'

Vue.component('icon',Icon);
Vue.use(Mini);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
