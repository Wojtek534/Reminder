<template>
  <v-container fluid>
    <v-layout column align-center>
      <h3>Messages</h3>
      <msg-table :messages="getMessages"/>
    </v-layout>
  </v-container>
</template>
<script>
import {mapGetters} from 'vuex'
import MsgTable from './content/MsgTable'
export default {
  data () {
    return {
      messages: '',
      id: this.$route.params.id
    }
  },
  methods: {
    ...mapGetters(['getMessages'])
  },
  components: {
    MsgTable
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
    }
  }
}
</script>
