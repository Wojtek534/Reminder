<template>
  <router-link :to="'/'+Link" tag="li" class="nav-item" exact>
    <a class="nav-link">{{Name}}</a>
  </router-link>
</template>
<script>
export default {
  props: ['Name', 'Link']
};
</script>
