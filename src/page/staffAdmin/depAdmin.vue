<!-- 部门管理 -->
<template lang="html">
  <div class="dep_admin">
    <p class="dep_title">
      <span class="depLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <i class="el-icon-refresh"></i>
    </p>
    <div class="">
      <el-row>
        <el-col :span="2"><div class="depTitle">序号</div></el-col>
        <el-col :span="4"><div class="depTitle">待定</div></el-col>
        <el-col :span="4"><div class="depTitle">待定</div></el-col>
        <el-col :span="2"><div class="depTitle">待定</div></el-col>
        <el-col :span="2"><div class="depTitle">待定</div></el-col>
        <el-col :span="2"><div class="depTitle">待定</div></el-col>
        <el-col :span="2"><div class="depTitle">待定</div></el-col>
        <el-col :span="2"><div class="depTitle">待定</div></el-col>
        <el-col :span="2"><div class="depTitle">待定</div></el-col>
        <el-col :span="2"><div class="depTitle">操作</div></el-col>
      </el-row>
      <el-row class="el_con">
        <el-col :span="2"><div class="depCon">序号</div></el-col>
        <el-col :span="4"><div class="depCon">待定</div></el-col>
        <el-col :span="4"><div class="depCon">待定</div></el-col>
        <el-col :span="2"><div class="depCon">待定</div></el-col>
        <el-col :span="2"><div class="depCon">待定</div></el-col>
        <el-col :span="2"><div class="depCon">待定</div></el-col>
        <el-col :span="2"><div class="depCon">待定</div></el-col>
        <el-col :span="2"><div class="depCon">待定</div></el-col>
        <el-col :span="2"><div class="depCon">待定</div></el-col>
        <el-col :span="2"><div class="depCon">操作</div></el-col>
      </el-row>
    </div>
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
.dep_admin{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .dep_title{
    height: 50px;
    text-align: right;
    line-height: 50px;
    position: relative;
    box-sizing: border-box;
    margin-bottom: 5px;
    border-bottom: 1px solid #eee;
    padding-right: 60px;
    i{
      font-size: 30px;
      color:#eb7a1d;
      position: absolute;
      right:20px;
      top:10px;
    }
  }
  .depTitle{
    line-height: 40px;
    text-align: center;
    background:#eb7a1d;
    color:white;
  }
  .depCon{
    text-align: center;
    line-height: 50px;
    font-size: 14px;
  }
  .el_con:nth-of-type(even){
    background:#eee;
  }
}
</style>
