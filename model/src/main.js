// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueResource)
Vue.use(VueLazyLoad, {
  error: '../static/shoucang.png',
  loading:
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526895226430&di=5a4b2b12fedb3ab409d65e7592db8c73&imgtype=0&src=http%3A%2F%2Fwww.dehong.gov.cn%2Fstatics%2Fimages%2Floading.gif'
})
Vue.config.productionTip = false
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
