import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import SearchHome from '@/components/SearchHome'
import SearchDetail from '@/components/searchDetail'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchHome',
      component: SearchHome
    },
    {
      path: '/searchDetail',
      name: 'SearchDetail',
      component: SearchDetail
    }
  ]
})
