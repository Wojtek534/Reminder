import firebase from 'firebase'
import router from '../../router'
import axios from '../../rest/instances/axiosUserConfig'
import globalAxios from '../../rest/instances/axiosDefaultConfig'
import {config} from '../../rest/firebaseConfig'

export default {
  state: {
    userEmail: localStorage.getItem('userEmail') || '',
    userLocalId: localStorage.getItem('userLocalId') || '',
    userTokenId: localStorage.getItem('userTokenId') || null,
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
    getUserLocalId (state) {
      return state.userLocalId
    },
    getUserTokenId (state) {
      return state.userTokenId
    },
    isUserLogged (state) {
      return state.isLoggedIn
    }
  },
  mutations: {
    setAuthUser (state, userData) {
      localStorage.setItem('userEmail', userData.email)
      localStorage.setItem('userLocalId', userData.localId)
      localStorage.setItem('userTokenId', userData.token)
      localStorage.setItem('isLoggedIn', userData.logged)
    }
  },
  actions: {
    logInUser (context, userData) {
      const userLogin = {
        email: userData.email,
        password: userData.password
      }
      console.log(userLogin)
      // firebase.auth().signInWithEmailAndPassword(userLogin.email, userLogin.password)
      axios.post('/verifyPassword?key=' + config.apiKey,
        { email: userLogin.email,
          password: userLogin.password,
          returnSecureToken: true
        })
      .then(response => {
        console.log(response)
        context.commit('setAuthUser', {
          email: response.data.email,
          localId: response.data.localId,
          token: response.data.idToken,
          logged: true
        })
        return response.data.localId
      })
      .then((localId) => {
        window.location.reload()
        router.push('/layout/' + localId + '/dashboard')
      })
      .catch(error => {
        console.log(error)
      })
    },
    logOutUser (context) {
      console.log('logout')
      firebase.auth().signOut()
      .then(() => {
        context.commit('setAuthUser', {
          email: '',
          localId: '',
          token: '',
          logged: false
        })
      })
      .then(() => {
        window.location.reload()
        router.push('/home')
      })
    },
    signUpUser (context, userData) {
      const userCreate = {
        email: userData.email,
        password: userData.password
      }
      //  firebase.auth().createUserWithEmailAndPassword(userCreate.email, userCreate.password)
      axios.post('/signupNewUser?key=' + config.apiKey,
        { email: userCreate.email,
          password: userCreate.password,
          returnSecureToken: true
        })
      .then(response => {
        console.log(response)
        context.commit('setAuthUser', {
          email: response.data.email,
          localId: response.data.localId,
          token: response.data.idToken,
          logged: true
        })
        context.dispatch('storeUser',
          {
            userData,
            token: response.data.idToken
          })
        return response.data.localId
      })
      .then((localId) => {
        window.location.reload()
        router.push('/layout/' + localId + '/dashboard')
      })
      .catch(error => {
        console.log(error)
      })
    },
    storeUser (context, payload) {
      if (!payload.token) {
        return
      }
      globalAxios.post('/users.json' + '?auth=' + payload.token, payload.userData)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
