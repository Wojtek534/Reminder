<template>
  <div>
    <!-- Left side navigation -->
    <v-navigation-drawer persistent :mini-variant="getNavMiniVariant" :clipped="getNavClipped" v-model="drawerModel" enable-resize-watcher fixed app v-layout="isUserLogged">
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in navItems" :key="i">
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
    <!-- Top navigation -->
    <v-toolbar app :clipped-left="getNavClipped">
      <!-- Left navigation UI  -->
      <!-- Layout Only -->
      <v-toolbar-items v-layout="isUserLogged">
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
      </v-toolbar-items>
      <!-- Title -->
      <v-toolbar-title v-text="title.name"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="check">
          <h3>Check</h3>
        </v-btn>
      </v-toolbar-items>
      <!-- Home Only -->
      <v-toolbar-items class="hidden-sm-and-down" v-home="isUserLogged">
        <v-btn primary flat v-for="(item, index) in homeItems" :key="index" :to="item.link">
          <v-icon>{{item.icon}}</v-icon>
          <h3 style="margin-left: 5px;">{{item.title}}</h3>
        </v-btn>
        <!-- Right side panel -->
        <v-btn flat @click.stop="setNavRightDrawer">
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar-items>
      <!-- Layout only -->
      <v-toolbar-items class="hidden-sm-and-down" v-layout="isUserLogged">
        <!-- User dropdown button -->
        <v-menu offset-y transition="slide-y-transition" bottom>
            <v-btn flat slot="activator">
              <v-icon>account_circle</v-icon>
              <h3 style="margin-left: 5px;">{{getUserName}}</h3>
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in btnItems" :key="item.title" @click="item.callback">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
        </v-menu>
        <!-- Right side panel -->
        <v-btn flat @click.stop="setNavRightDrawer">
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      title: {name: 'Reminder', link: '/'},
      btnItems: [{ title: 'Settings', callback: () => { console.log(this.getUser) } }, {title: 'Logout', callback: () => { this.logOutUser() }}],
      homeItems: [{
        icon: 'home',
        title: 'Home',
        link: '/'
      }, {
        icon: 'account_circle',
        title: 'Login',
        link: '/login'
      },
      {
        icon: 'account_circle',
        title: 'New Account',
        link: '/signup'
      }],
      navItems: [
        {
          icon: 'dashboard',
          title: 'dashboard',
          link: '/layout/' + this.getUserUid + '/dashboard'
        },
        {
          icon: 'description',
          title: 'messages',
          link: '/layout/' + this.getUserUid + '/messages'
        },
        {
          icon: 'loyalty',
          title: 'tags',
          link: '/layout/' + this.getUserUid + '/tags'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['setNavClipper', 'setNavDrawer', 'setNavFixed', 'setNavMiniVariant', 'setNavRight', 'setNavRightDrawer']),
    ...mapActions(['logOutUser']),
    check () {
      console.log('User', this.getUser, 'Uid ', this.getUserUid, 'IsLoggedin', this.isUserLogged)
    }
  },
  computed: {
    ...mapGetters(['getNavClipped', 'getNavDrawer', 'getNavFixed', 'getNavMiniVariant', 'getNavRight', 'getNavItems', 'isUserLogged', 'getUserName', 'getUser', 'getUserUid']),
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
