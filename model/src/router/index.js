import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import HomePage from '@/components/HomePage'
// import Page from '@/components/page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      // component: HelloWorld
      component: resolve => require(['@/components/HelloWorld'], resolve)
    },
    {
      path: '/home',
      name: 'HomePage',
      // component: HomePage
      component: resolve => require(['@/components/HomePage'], resolve)
    }
  ]
})
