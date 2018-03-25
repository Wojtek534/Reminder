import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Messages from '@/components/Messages'
import Tags from '@/components/Tags'
import NotFound from '@/components/common/NotFound'
import UserSignUp from '@/components/user/SignUp'
import UserLogIn from '@/components/user/LogIn'
import Firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/messages',
      name: 'messages',
      component: Messages,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/tags',
      name: 'tags',
      component: Tags,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/notFound',
      component: NotFound
    }, {
      path: '*',
      redirect: '/notFound'
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: UserSignUp
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogIn
    }
  ]
})
router.beforeEach((to, from, next) => {
  let currentuser = Firebase.auth().currentUser
  let log = currentuser ? 'true' : 'false'
  console.log('Is User Logged ', log)
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  console.log('Req authorize', requiresAuth)
  if (!currentuser && requiresAuth) next('login')
  // else if (currentuser && requiresAuth) next('/')
  else next()
})

export default router
