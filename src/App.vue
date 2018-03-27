<template>
  <v-app>
    <v-content v-if="getUserIsAuthorized == false">
      <NavigationHome/>
      <router-view/>
      <NavigationDrawer/>
      <Footer/>
    </v-content>
    <v-content v-if="getUserIsAuthorized == true">
      <Navigation/>
      <router-view/>
      <NavigationDrawer/>
      <Footer/>
    </v-content>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import NavigationHome from './components/home/NavigationHome'
import Navigation from './components/common/Navigation'
import NavigationDrawer from './components/common/NavigationDrawer'
import Footer from './components/common/Footer'
export default {
  methods: {
    ...mapGetters(['getUserIsAuthorized'])
  },
  components: {
    NavigationHome,
    Navigation,
    NavigationDrawer,
    Footer
  },
  name: 'App'
}
</script>

