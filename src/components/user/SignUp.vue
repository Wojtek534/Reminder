<template>
  <v-card class="pa-3">
    <v-card-title primary-title>
      <div class="headline">Create New Account</div>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          label="Email"
          v-model.lazy="userData.email"
          :rules="emailRules"
          :counter="6"
          placeholder="Email Address"
          type="Text"
          required>
        </v-text-field>
        <v-text-field
          label="Password"
          v-model.lazy="userData.password"
          :rules="passwordRules"
          :counter="10"
          placeholder="Password"
          type="Password"
          required>
        </v-text-field>
        <v-checkbox
        label="Do you agree?"
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        required>
      </v-checkbox>
      <v-card-actions>
        <v-btn round color="primary" dark @click="signUpUser({email: userData.email, password: userData.password})">Sign Up</v-btn>
      </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      userData: {
        email: '',
        password: ''
      },
      valid: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      checkbox: false
    }
  },
  methods: {
    ...mapActions(['signUpUser'])
  }
}
</script>
