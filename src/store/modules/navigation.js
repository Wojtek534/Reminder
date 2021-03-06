export default {
  state: {
    clipped: true,
    drawer: true,
    fixed: false,
    miniVariant: false,
    right: true,
    rightDrawer: false,
    items: [
      {
        icon: 'dashboard',
        title: 'dashboard',
        link: '/layout/dashboard'
      },
      {
        icon: 'description',
        title: 'messages',
        link: '/layout/messages'
      },
      {
        icon: 'loyalty',
        title: 'tags',
        link: '/layout/tags'
      }
    ]
  },
  getters: {
    getNavClipped (state) {
      return state.clipped
    },
    getNavDrawer (state) {
      return state.drawer
    },
    getNavFixed (state) {
      return state.fixed
    },
    getNavMiniVariant (state) {
      return state.miniVariant
    },
    getNavRight (state) {
      return state.right
    },
    getNavRightDrawer (state) {
      return state.rightDrawer
    },
    getNavItems (state) {
      return state.items
    }
  },
  mutations: {
    setNavClipper: (state) => {
      state.clipped = !state.clipped
    },
    setNavDrawer: (state) => {
      state.drawer = !state.drawer
    },
    setNavFixed: (state) => {
      state.fixed = !state.fixed
    },
    setNavMiniVariant: (state) => {
      state.miniVariant = !state.miniVariant
    },
    setNavRight: (state) => {
      // state.right = !state.right
      state.right = true
    },
    setNavRightDrawer: (state) => {
      state.rightDrawer = !state.rightDrawer
    }
  },
  namespaced: false
}
