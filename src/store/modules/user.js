import firebase from 'firebase'
import router from '../../router'

export default {
  state: {
    user: undefined,
    uid: '',
    isLoggedIn: false
  },
  getters: {
    getUserName (state) {
      let name = ''
      if (state.isLoggedIn) {
        name = state.user.email
      } else name = 'guest'
      return name
    },
    getUserUid (state) {
      return state.uid
    },
    getUser (state) {
      return state.user
    },
    isUserLogged (state) {
      return state.isLoggedIn
      /*
      const user = new Promise((resolve, reject) => {
        resolve(firebase.auth().currentUser)
      }).then((result) => {
        return result
      })
      if (user !== null || typeof user !== 'undefined') {
        return true
      } else {
        return false
      }
      */
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUid (state, uid) {
      state.uid = uid
    },
    setIsLoggedIn (state, value) {
      state.isLoggedIn = value
    }
  },
  actions: {
    logInUser (context, payload) {
      const auth = firebase.auth()
      const userLog = {
        email: payload.email,
        password: payload.password
      }
      auth.signInWithEmailAndPassword(userLog.email, userLog.password)
      .then(response => {
        context.commit('setUser', response)
        context.commit('setUid', response.uid)
        context.commit('setIsLoggedIn', true)
        console.log('Setters done!')
      })
      .then(() => {
        router.push('/layout/' + context.state.uid + '/dashboard')
      })
    },
    logOutUser (context) {
      firebase.auth().signOut()
      .then(() => {
        context.commit('setUser', undefined)
        context.commit('setUid', '')
        context.commit('setIsLoggedIn', false)
      })
      .then(() => {
        router.push('/home')
      })
    },
    signUpUser (context, payload) {
      const userCreate = {
        email: payload.email,
        password: payload.password
      }
      firebase.auth().createUserWithEmailAndPassword(userCreate.email, userCreate.password)
      .catch(error => {
        console.log(error)
      })
    }
  }
}
