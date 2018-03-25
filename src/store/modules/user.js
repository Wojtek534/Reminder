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
    logOutUser (state) {
      state.user = null
    }
  },
  actions: {
    logOutUser (context) {
      firebase.auth().signOut()
      .then(() => {
        context.commit('logOutUser')
      })
    }
  }
}
