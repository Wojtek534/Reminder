<template>
 <v-container fluid mt-5>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md2>
      <v-card class="pa-3">
      <v-card-title primary-title>
      <div class="headline">Login</div>
      </v-card-title>
      <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          label="Email"
          v-model.lazy="userData.email"
          placeholder="Email Address"
          type="Text"
          required>
        </v-text-field>
        <v-text-field
          label="Password"
          v-model.lazy="userData.password"
          placeholder="Password"
          type="Password"
          required>
        </v-text-field>
      </v-form>
      </v-card-text>
      <v-card-actions>
      <v-btn round color="primary" dark @click="loginFireBase">Login</v-btn>
      <v-btn round color="primary" dark @click="checkUser">Check</v-btn>
      <v-btn round color="primary" dark @click="logOutFireBase">LogOut</v-btn>
      </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
// import axios from '../../rest/restDefaultConfig.js'
import firebase from 'firebase'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  data () {
    return {
      userData: {
        email: '',
        password: ''
      },
      valid: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    ...mapActions(['logOutUser']),
    loginFireBase () {
      // auth user
      const auth = firebase.auth()
      const userInput = {
        email: this.userData.email,
        password: this.userData.password
      }
      auth.signInWithEmailAndPassword(userInput.email, userInput.password)
      .then(response => {
        this.setUser(response)
        console.log(response)
      })
      // set user in store
    },
    logOutFireBase () {
      this.logOutUser()
    },
    checkUser () {
      // let user = firebase.auth().currentUser
      console.log(this.getUser)
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>
