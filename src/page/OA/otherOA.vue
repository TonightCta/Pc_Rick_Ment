<!-- 其他费用相关 -->
<template lang="html">
  <div class="other_oa">
    <p class="other_title">
      <el-button icon="el-icon-upload" type="primary" size="medium">费用申请</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
        <i class="el-icon-refresh"></i>
      </el-tooltip>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataLength:88,
    }
  }
}
</script>

<style lang="scss" scoped>
.other_oa{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .other_title{
    margin-top: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
    position: relative;
    .dataLength{
      position: absolute;
      right:60px;
      line-height: 40px;
    }
    i{
      font-size: 30px;
      color:#eb7a1d;
      position: absolute;
      right: 20px;
      top:5px;
      cursor:pointer;
    }
  }
}
</style>
