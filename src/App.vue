<template>
  <v-app>
    <Navigation/>
    <v-content>
      <router-view/>
      <NavigationDrawer/>
    </v-content>
    <v-footer :fixed="getNavFixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from './components/common/Navigation'
import NavigationDrawer from './components/common/NavigationDrawer'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getNavFixed'])
  },
  components: {
    Navigation,
    NavigationDrawer
  },
  name: 'App'
}
</script>

