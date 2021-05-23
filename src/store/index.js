import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global/global'
import home from './modules/home/home'
import system from './modules/system/system'
import basic from './modules/basic/basic'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    global,
    home,
    system,
    basic,
  }
})