<template>
  <v-app>
    <Navigation/>
    <v-content>
      <router-view/>
      <NavigationDrawer/>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Navigation from './components/common/Navigation'
import NavigationDrawer from './components/common/NavigationDrawer'
import Footer from './components/common/Footer'
export default {
  components: {
    Navigation,
    NavigationDrawer,
    Footer
  },
  name: 'App'
}
</script>

