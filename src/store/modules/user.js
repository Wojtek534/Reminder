import firebase from 'firebase'
import router from '../../router'
import axios from '../../rest/instances/axiosUserConfig'
import globalAxios from '../../rest/instances/axiosDefaultConfig'
import {config} from '../../rest/firebaseConfig'

// jeśli state wygaśnie to przypisz z local storage
export default {
  state: {
    userEmail: null,
    userLocalId: null,
    userTokenId: null,
    expirationDate: null
  },
  getters: {
    getUserEmail (state) {
      let name = ''
      if (state.userEmail !== null) {
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
    }
  },
  mutations: {
    authUser (state, userData) {
      state.userEmail = userData.email
      state.userTokenId = userData.token
      state.userLocalId = userData.localId
      state.expirationDate = userData.expiresIn
    },
    storeUser (state, userData) {
      localStorage.setItem('userEmail', userData.email)
      localStorage.setItem('userLocalId', userData.localId)
      localStorage.setItem('userTokenId', userData.token)
      const now = new Date()
      console.log('exp date storeage', new Date(now.getTime() + (userData.expiresIn * 1000)))
      localStorage.setItem('expirationDate', new Date(now.getTime() + (userData.expiresIn * 1000)))
    },
    clearStoreUser (state) {
      localStorage.setItem('userEmail', '')
      localStorage.setItem('userLocalId', '')
      localStorage.setItem('userTokenId', '')
      localStorage.setItem('expirationDate', '')
    },
    clearStates (state) {
      state.userEmail = null
      state.userLocalId = null
      state.userTokenId = null
      state.expirationDate = null
    }
  },
  actions: {
    tryAutoLogin (context) {
      console.log('Autologin Action')
      const token = localStorage.getItem('userTokenId')
      if (!token) {
        return
      }
      const expDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expDate) {
        return
      }
      const localId = localStorage.getItem('userLocalId')
      const email = localStorage.getItem('userEmail')
      context.commit('authUser', {email: email, localId: localId, token: token, 'expiresIn': expDate})
    },
    setLogoutTimer (context, expirationTime) {
      setTimeout(() => { context.commit('clearStoreUser') }, expirationTime * 1000)
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
        context.commit('storeUser', {
          email: response.data.email,
          localId: response.data.localId,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn
        })
        console.log(response.data.expiresIn)
        context.commit('authUser', {
          email: response.data.email,
          localId: response.data.localId,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn
        })
        // context.dispatch('setLogoutTimer', response.data.expiresIn)
        return response.data.localId
      })
      .then((localId) => {
        // window.location.reload()
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
        context.commit('clearStates')
        context.commit('clearStoreUser')
        // localStorage.clear()
      })
      .then(() => {
        // window.location.reload()
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
        context.commit('storeUser', {
          email: response.data.email,
          localId: response.data.localId,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn
        })
        context.commit('authUser', {
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
