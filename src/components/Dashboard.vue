<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <h3>Dashboard</h3>
        <new-message/>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import NewMessage from './content/NewMessage'
export default {
  data () {
    return {
      id: this.$route.params.id
    }
  },
  components: {
    NewMessage
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
    }
  }
}
</script>
