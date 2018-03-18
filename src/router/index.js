import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/common/NotFound'

const Home = resolve => {
  require.ensure(['@/components/Home'], () => {
    resolve(require('@/components/Home'))
  })
}
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/NotFound',
    component: NotFound
  }, {
    path: '*',
    redirect: '/NotFound'
  }]
})
