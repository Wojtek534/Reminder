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
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    expirationDate: localStorage.getItem('expirationDate') || ''
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
      return state.userTokenId !== null
    },
    getExpirationDate (state) {
      return state.expirationDate
    }
  },
  mutations: {
    authUser (state, userData) {
      state.userTokenId = userData.token
      state.userLocalid = userData.localId
    },
    setAuthUser (state, userData) {
      localStorage.setItem('userEmail', userData.email)
      localStorage.setItem('userLocalId', userData.localId)
      localStorage.setItem('userTokenId', userData.token)
      const now = new Date()
      localStorage.setItem('expirationDate', new Date(now.getTime() + (userData.expiresId * 1000)))
    },
    clearAuthUser (state) {
      // localStorage.setItem('userEmail', '')
      localStorage.setItem('userLocalId', '')
      localStorage.setItem('userTokenId', '')
      localStorage.setItem('expirationDate', '')
    }
  },
  actions: {
    tryAutoLogin (context) {
      const token = context.getters.getUserTokenId
      if (!token) {
        return
      }
      const isTokenValid = context.getters.getExpirationDate
      const now = new Date()
      if (now >= isTokenValid) {
        return
      }
      const localId = context.getters.getLocalId
      context.commit('authUser', {token, localId})
    },
    setLogoutTimer (context, expirationTime) {
      setTimeout(() => { context.commit('clearAuthUser') }, expirationTime * 1000)
    },
    logInUser (context, userData) {
      const userLogin = {
        email: userData.email,
        password: userData.password
      }
      axios.post('/verifyPassword?key=' + config.apiKey,
        { email: userLogin.email,
          password: userLogin.password,
          returnSecureToken: true
        })
      .then(response => {
        context.commit('setAuthUser', {
          email: response.data.email,
          localId: response.data.localId,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn
        })
        // context.dispatch('setLogoutTimer', response.data.expiresIn)
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
        context.commit('clearAuthUser')
        // localStorage.clear()
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
      axios.post('/signupNewUser?key=' + config.apiKey,
        { email: userCreate.email,
          password: userCreate.password,
          returnSecureToken: true
        })
      .then(response => {
        context.commit('setAuthUser', {
          email: response.data.email,
          localId: response.data.localId,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn
        })
        // context.dispatch('setLogoutTimer', response.data.expiresIn)
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
