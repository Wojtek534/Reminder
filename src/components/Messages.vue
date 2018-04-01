<template>
  <v-container fluid>
    <v-layout column align-center>
      <h3>Messages</h3>
    </v-layout>
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
