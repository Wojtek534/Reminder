<template>
  <v-navigation-drawer temporary :right="getNavRight" v-model="rightDrawerModel" fixed app>
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>compare_arrows</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getNavRight', 'getNavRightDrawer']),
    rightDrawerModel: {
      get () {
        return this.getNavRightDrawer
      },
      set () {
        return this.getNavRightDrawer
      }
    }
  }
}
</script>
