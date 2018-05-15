import Vue from 'vue'
import Router from 'vue-router'
// import {store} from '../store/store'
// home
import Home from '@/components/Home'
import HomePage from '@/components/HomePage'
import UserSignUp from '@/components/user/SignUp'
import UserLogIn from '@/components/user/LogIn'
import NotFound from '@/components/common/NotFound'
// layout
import Layout from '@/components/Layout'
import Dashboard from '@/components/Dashboard'
import Messages from '@/components/Messages'
import Tags from '@/components/Tags'
// store
import {store} from '../store/store'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: '/home',
          redirect: '/'
        },
        {
          path: '/',
          name: 'homePage',
          component: HomePage,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: '/login',
          name: 'login',
          component: UserLogIn,
          meta: {
            requiresAuth: false
          }
        }, {
          path: '/signUp',
          name: 'signUp',
          component: UserSignUp,
          meta: {
            requiresAuth: false
          }}]
    }, {
      path: '/layout/:id',
      name: 'layout',
      component: Layout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'messages',
          name: 'messages',
          component: Messages,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'tags',
          name: 'tags',
          component: Tags,
          meta: {
            requiresAuth: true
          }
        }, {
          path: '/layout/*',
          redirect: '/layout',
          meta: {
            requiresAuth: true
          }
        }]
    }, {
      path: '/notFound',
      component: NotFound
    }, {
      path: '/*',
      redirect: '/notFound'
    }
  ]
})
router.beforeEach((to, from, next) => {
  const IsUserLogged = true
  let IsAuthRequired = to.matched.some(record => record.meta.requiresAuth)
  if (!IsUserLogged && !IsAuthRequired) {
    next()
  } else if (!IsUserLogged && IsAuthRequired) {
    next()
  } else if (IsUserLogged && IsAuthRequired) {
    next()
  } else if (IsUserLogged && !IsAuthRequired) {
    next()
  } else next()
})

export default router
