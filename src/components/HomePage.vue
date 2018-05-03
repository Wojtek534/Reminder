<template>
  <div>
  <Header/>
    <v-container fluid mt-5>
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
            <h3>Home</h3>
          </v-layout>
        </v-slide-y-transition>
      </v-flex>
    </v-container>
  </div>
</template>
<script>
import Header from './front/Header'
export default {
  components: {
    Header
  }
}
</script>
