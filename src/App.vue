<template>
  <div id="app">

    <div class="col-xs-12 col-sm-8 col-md-6 mx-auto">
      <app-header/>
      <img src="./assets/logo.png">
      <transition enter-active-class="animated fadeIn">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "./components/common/Header.vue";
export default {
  components: {
    appHeader: Header
  }
};
</script>

<style lang="scss">
@import "./style/sample.scss";
</style>
