<template>
  <v-container fluid>
    <v-layout column align-center>
      <h3>Messages</h3>
      <msg-table :messages="msg"/>
    </v-layout>
  </v-container>
</template>
<script>
import {mapActions} from 'vuex'
import MsgTable from './content/MsgTable'
export default {
  data () {
    return {
      id: this.$route.params.id
    }
  },
  methods: {
    ...mapActions(['getMessages']),
    async fetchData () {
      this.$store.dispatch('getMessages')
      .then((response) => {
        console.log('resp', response)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    msg () {
      return this.$store.getters.getMessages
    }
  },
  components: {
    MsgTable
  },
  created () {
    this.$store.dispatch('fetchMessages')
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.id
    }
  }
}
</script>
