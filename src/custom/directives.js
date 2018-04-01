import Vue from 'vue'

// Hide elements if authorized.
Vue.directive('home', {
  bind (el, binding, vnode) {
    if (binding.value === true) {
      el.style.display = 'none'
    }
  }
})

// Hide elements if not authorized.
Vue.directive('layout', {
  bind (el, binding, vnode) {
    if (binding.value === false) {
      el.style.display = 'none'
    }
  }
})
