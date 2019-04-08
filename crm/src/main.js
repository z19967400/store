// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import VueResource from 'vue-resource' 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as api  from './api/api.js';
Vue.prototype.$api = api;
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
