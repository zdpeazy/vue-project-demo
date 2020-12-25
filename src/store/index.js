import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);
import user from './modules/user'
import menu from './modules/menu'
import app from './modules/app'

const store = new vuex.Store({
  modules: {
    app: app,
    user: user,
    menu: menu
  }
})

export default store