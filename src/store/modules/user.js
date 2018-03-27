import firebase from 'firebase'

export default {
  state: {
    user: null
  },
  getters: {
    getUserIsAuthorized (state) {
      return state.user.IsAuthorized
    },
    getUser (state) {
      const user = firebase.auth().currentUser
      return user != null ? user : 'Guest'
    }
  },
  mutations: {
    setUser (state, firebaseUser) {
      state.user = firebaseUser
    },
    setUserNull (state) {
      state.user = null
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
        console.log(response)
      })
    },
    logOutUser (context) {
      firebase.auth().signOut()
      .then(() => {
        context.commit('setUserNull')
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
