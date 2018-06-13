import Vue from 'vue'
import Router from 'vue-router'
import Hub from './views/Hub.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'hub',
      component: Hub
    }
  ]
})
