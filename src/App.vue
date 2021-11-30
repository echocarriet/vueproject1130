<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link>
  </div> -->
  <router-view />
</template>
<script>
import emitter from './methods/emitter';
import pushMessageState from './methods/pushMessageState';

export default {
  provide() {
    return {
      emitter,
      pushMessageState,
    };
  },
};
</script>
<style lang="scss">
@import './assets/all';
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css');
</style>
