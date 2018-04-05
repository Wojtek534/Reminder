import firebase from 'firebase'
import router from '../../router'

export default {
  state: {
    userEmail: localStorage.getItem('userEmail') || '',
    userUid: localStorage.getItem('userUid') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') || false
  },
  getters: {
    getUserEmail (state) {
      let name = ''
      if (state.isLoggedIn) {
        name = state.userEmail
      } else name = 'guest'
      return name
    },
    getUserUid (state) {
      return state.userUid
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
    setUserEmail (state, email) {
      localStorage.setItem('userEmail', email)
    },
    setUserUid (state, uid) {
      localStorage.setItem('userUid', uid)
    },
    setIsLoggedIn (state, value) {
      localStorage.setItem('isLoggedIn', value)
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
        context.commit('setUserEmail', response.email)
        context.commit('setUserUid', response.uid)
        context.commit('setIsLoggedIn', true)
      })
      // then
      const uid = context.state.userUid
      console.log('Push', uid)
      router.push('/layout/' + 1 + uid + '/dashboard')
        // window.location.reload()
    },
    logOutUser (context) {
      console.log('logout')
      firebase.auth().signOut()
      .then(() => {
        context.commit('setUserEmail', '')
        context.commit('setUserUid', '')
        context.commit('setIsLoggedIn', false)
      })
      .then(() => {
        window.location.reload()
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
