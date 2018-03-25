<template>
<div>
  <v-navigation-drawer persistent :mini-variant="getNavMiniVariant" :clipped="getNavClipped" v-model="drawerModel" enable-resize-watcher fixed app>
    <v-list>
      <v-list-tile value="true" v-for="(item, i) in getNavItems" :key="i">
        <router-link :to="item.link" tag="li" class="router-link" exact>
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
        </router-link>
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
    <div class="text-xs-center">
      <v-menu offset-y>
        <v-btn flat slot="activator">
          <v-icon>account_circle</v-icon>
          <h3 style="margin-left: 5px;">{{getUser.email}}</h3>
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
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
      title: 'Reminder',
      items: [{title: 'Settings'}, {title: 'Logout'}]
    }
  },
  methods: {
    ...mapMutations(['setNavClipper', 'setNavDrawer', 'setNavFixed', 'setNavMiniVariant', 'setNavRight', 'setNavRightDrawer'])
  },
  computed: {
    ...mapGetters(['getNavClipped', 'getNavDrawer', 'getNavFixed', 'getNavMiniVariant', 'getNavRight', 'getNavItems', 'getUser']),
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
<style>
.router-link{
  cursor: pointer;
  display: inherit;
  align-items: inherit;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
