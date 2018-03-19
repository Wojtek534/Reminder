<template>
  <div id="app">

    <div class="col-xs-12 col-sm-8 col-md-6 mx-auto">
      <side-header/>
      <img src="./assets/logo.png">
      <transition enter-active-class="animated fadeIn">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import TopHeader from "./components/common/TopHeader.vue";
import SideHeader from "./components/common/SideHeader.vue";
export default {
  components: {
    topHeader: TopHeader,
    sideHeader: SideHeader
  }
};
</script>

<style lang="scss">
@import "./style/sample.scss";
</style>
