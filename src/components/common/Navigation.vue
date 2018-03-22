<template>
<div>
  <v-navigation-drawer persistent :mini-variant="getNavMiniVariant" :clipped="getNavClipped" v-model="drawerModel" enable-resize-watcher fixed app>
    <v-list>
      <v-list-tile value="true" v-for="(item, i) in getNavItems" :key="i">
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app :clipped-left="getNavClipped">
    <v-toolbar-side-icon @click.stop="setNavDrawer"></v-toolbar-side-icon>
    <v-btn icon @click.stop="setNavMiniVariant">
      <v-icon v-html="getNavMiniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
    </v-btn>
    <v-btn icon @click.stop="setNavClipper">
      <v-icon>web</v-icon>
    </v-btn>
    <v-btn icon @click.stop="setNavFixed">
      <v-icon>remove</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.stop="setNavRightDrawer">
      <v-icon>menu</v-icon>
    </v-btn>
  </v-toolbar>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      title: 'Reminder'
    }
  },
  methods: {
    ...mapMutations(['setNavClipper', 'setNavDrawer', 'setNavFixed', 'setNavMiniVariant', 'setNavRight', 'setNavRightDrawer'])
  },
  computed: {
    ...mapGetters(['getNavClipped', 'getNavDrawer', 'getNavFixed', 'getNavMiniVariant', 'getNavRight', 'getNavItems']),
    drawerModel: {
      get () {
        return this.getNavDrawer
      },
      set () {
        return this.getNavDrawer
      }
    }
  }
}
</script>
