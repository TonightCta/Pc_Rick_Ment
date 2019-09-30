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
  /* margin:0 auto; */
  font-family: '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1300px;
  height: 100%;
}
</style>
