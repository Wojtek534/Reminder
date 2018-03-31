<template>
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
      <v-btn round color="primary" dark @click="logInUser({email: userData.email, password: userData.password})">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
// import axios from '../../rest/restDefaultConfig.js'
import {mapActions} from 'vuex'
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
    ...mapActions(['logInUser'])
  }
}
</script>
