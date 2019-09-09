<!-- 出差地管理 -->
<template lang="html">
  <div class="place_about">
    <h1>出差地管理</h1>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      点我打开
    </el-button>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data(){
    return{
      drawer: false,
      direction: 'rtl',
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
