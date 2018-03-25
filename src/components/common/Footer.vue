<template>
  <v-footer :fixed="getNavFixed" app>
    <span>&copy; 2018</span>
  </v-footer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getNavFixed'])
  }
}
</script>
