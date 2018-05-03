<template>
  <v-app>
    <v-content>
      <div class="body">
        <Navigation/>
          <router-view/>
        <NavigationDrawer/>
        <Footer/>
      </div>
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
  name: 'App',
  created () {
    this.$store.dispatch('tryAutoLogin')
  }
}
</script>
<style lang="scss">
  @import './style/main.scss';
</style>

