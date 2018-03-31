<template>
  <v-app>
    <v-content>
      <Navigation/>
        <router-view/>
      <NavigationDrawer/>
      <Footer/>
    </v-content>
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

