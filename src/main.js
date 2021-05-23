// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui'
import Vant from 'vant'
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css'
import echarts from 'echarts'
import VCharts from 'v-charts'
import moment from 'moment'
// import axios from 'axios'
import Qs from 'qs'
import axios from '@/axios/index'

window.echarts = require('echarts');

// ElementUI.Select.computed.readonly = function () {
//   const isIE = !this.$isServer && !Number.isNaN(Number(document.documentMode));

//   return !(this.filterable || this.multiple || !isIE) && !this.visible;
// };

Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;

// Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(Vant)
Vue.use(echarts);
Vue.use(VCharts);

Vue.config.productionTip = false;

Vue.filter('dateFormat', (value, fmtstring) => {
  if(!value){
    return ''
  }
  return moment(value).format(fmtstring)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// getAllMessages(store)
