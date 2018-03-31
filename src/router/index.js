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
import Firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
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
          path: '/layout/*',
          redirect: '/layout'
        },
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
  /*
  if (store.getters.getUserIsAuthorized) {
    next()
    return
  }
  next('/login')
  if (!store.getters.getUserIsAuthorized) {
    next()
    return
  }
  next('/')
  */
  let currentuser = Firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!currentuser && requiresAuth) next('login')
  // else if (currentuser && requiresAuth) next('/')
  else next()
})

export default router
