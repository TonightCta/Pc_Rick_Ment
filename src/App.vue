<template>
  <div id="app">
    <router-view v-if="$route.meta.keep"></router-view>
    <router-view v-if="!$route.meta.keep"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  margin:0 auto;
  font-family: 'MyriadPro Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
