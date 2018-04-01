<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <h3>Dashboard</h3>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      id: this.$route.params.id
    }
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
    }
  }
}
</script>
