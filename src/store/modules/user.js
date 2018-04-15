import firebase from 'firebase'
import router from '../../router'
import axios from '../../rest/instances/axiosUserConfig'
import globalAxios from '../../rest/instances/axiosDefaultConfig'
import {config} from '../../rest/firebaseConfig'
import chalk from 'chalk'

export default {
  state: {
    email: null,
    localId: null,
    token: null,
    refreshToken: null,
    expirationDate: null
  },
  getters: {
    getLocalId (state) {
      return state.localId
    },
    getToken (state) {
      return state.token
    },
    getRefreshToken (state) {
      return state.refreshToken
    },
    getExpirationDate (state) {
      return state.expirationDate
    },
    isUserLogged (state) {
      return state.token !== null && state.token !== 'null' && state.token !== ''
    },
    getUserStates (state) {
      return {
        email: state.email,
        localId: state.localId,
        token: state.token,
        refreshToken: state.refreshToken,
        expirationDate: state.expirationDate
      }
    }
  },
  mutations: {
    // Authorize user on login or account creation
    authUser (state, userData) {
      state.email = userData.email
      state.token = userData.token
      state.refreshToken = userData.refreshToken
      state.localId = userData.localId
      state.expirationDate = userData.expiresIn
    },
    // Authorize user after token refresh
    authRefreshUser (state, userData) {
      state.token = userData.token
      state.expirationDate = userData.expiresIn
    },
    // Store states values in local storage
    storeUser (state, userData) {
      localStorage.setItem('email', userData.email)
      localStorage.setItem('localId', userData.localId)
      localStorage.setItem('token', userData.token)
      localStorage.setItem('refreshToken', userData.refreshToken)
      const now = new Date()
      localStorage.setItem('expirationDate', new Date(now.getTime() + (userData.expiresIn * 1000)))
    },
    // Modify local storage with new token and expiration date
    storeRefreshUser (state, userData) {
      localStorage.setItem('token', userData.token)
      const now = new Date()
      localStorage.setItem('expirationDate', new Date(now.getTime() + (userData.expiresIn * 1000)))
    },
    // Clear local storage
    clearStoreUser (state) {
      // Only string value
      localStorage.setItem('email', '')
      localStorage.setItem('localId', '')
      localStorage.setItem('token', '')
      localStorage.setItem('refreshToken', '')
      localStorage.setItem('expirationDate', '')
    },
    // Set default state values
    clearStates (state) {
      // Default
      state.email = null
      state.localId = null
      state.token = null
      state.refreshToken = null
      state.expirationDate = null
    }
  },
  actions: {
    // Help function to dispatch selected action
    checkStore (context) {
      context.dispatch('logUserStates')
    },
    // Log current states
    logUserStates ({state}) {
      const log = console.log
      log(chalk.green.bold('Email: '), state.email)
      log(chalk.green.bold('LocalId: '), state.localId)
      log(chalk.green.bold('Token: '), state.token)
      log(chalk.green.bold('Refresh Token: '), state.refreshToken)
      log(chalk.green.bold('Expiration Date: '), state.expirationDate)
    },
    // Get new token from refreshToken id
    refreshToken (context) {
      console.log('refresh')
      if (context.state.refreshToken !== null) {
        axios.post('https://securetoken.googleapis.com/v1/token?key=' + config.apiKey, {
          grant_type: 'refresh_token',
          refresh_token: context.state.refreshToken
        })
        .then((response) => {
          context.commit('storeRefreshUser', {
            token: response.data.id_token,
            expiresIn: response.data.expires_in
          })
          context.commit('authRefreshUser', {
            token: response.data.id_token,
            expiresIn: response.data.expires_in
          })
        })
      }
    },
    // Set states from local storage on spa refresh
    tryAutoLogin (context) {
      console.log('Autologin')
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expDate = localStorage.getItem('expirationDate')
      const now = new Date()
      now.toString()
      if (now >= expDate) {
        context.dispatch('refreshToken')
        return
      }
      const localId = localStorage.getItem('localId')
      const email = localStorage.getItem('email')
      const refreshToken = localStorage.getItem('refreshToken')
      context.commit('authUser', {email: email, localId: localId, token: token, refreshToken: refreshToken, 'expiresIn': expDate})
    },
    // Login user on email and password
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
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn
        })
        context.commit('authUser', {
          email: response.data.email,
          localId: response.data.localId,
          token: response.data.idToken,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn
        })
        return response.data.localId
      })
      .then((localId) => {
        router.push('/layout/' + localId + '/dashboard')
      })
      .catch(error => {
        console.log(error)
      })
    },
    // Logout user, clear states and storage
    logOutUser (context) {
      firebase.auth().signOut()
      .then(() => {
        context.commit('clearStates')
        context.commit('clearStoreUser')
      })
      .then(() => {
        // window.location.reload()
        router.push('/home')
      })
    },
    // Create new user
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
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn
        })
        context.commit('authUser', {
          email: response.data.email,
          localId: response.data.localId,
          token: response.data.idToken,
          refreshToken: response.data.refreshToken,
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
    // Create additional user information in seperate column
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
