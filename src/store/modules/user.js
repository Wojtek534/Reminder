import firebase from 'firebase'
import router from '../../router'

export default {
  state: {
    user: '',
    token: localStorage.getItem('user-token')
  },
  getters: {
    getUserIsAuthorized (state) {
      if (typeof state.user !== 'undefined') {
        return false
      } else {
        return true
      }
    },
    getUser (state) {
      const user = firebase.auth().currentUser
      return user != null ? user : 'Guest'
    },
    getUserToken (state) {
      // const token = firebase.auth().currentUser.getIdToken()
      return state.token
    }
  },
  mutations: {
    setUser (state, firebaseUser) {
      state.user = firebaseUser
    },
    setUserNull (state) {
      state.user = null
    },
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
    logInUser (context, payload) {
      const auth = firebase.auth()
      const userLog = {
        email: payload.email,
        password: payload.password
      }
      console.log(userLog)
      auth.signInWithEmailAndPassword(userLog.email, userLog.password)
      .then(response => {
        context.commit('setUser', response)
        context.commit('setToken', response.refreshToken)
        console.log(response)
      })
      .then(() => {
        router.push('/home')
      })
    },
    logOutUser (context) {
      firebase.auth().signOut()
      .then(() => {
        context.commit('setUserNull')
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
      .then((response) => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
