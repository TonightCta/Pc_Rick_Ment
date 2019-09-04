<!-- 部门管理 -->
<template lang="html">
  <div class="dep_admin">
    <p class="dep_title">
      <span class="depLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <i class="el-icon-refresh" @click="localtion()"></i>
    </p>
    <div class="" style="minHeight:540px;">
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
    <!-- 分页器 -->
    <div class="order_page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :total="pageNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataLength:88,//数据总和
      currentPage3:1,//分页器类型
      page:0,//页码
      pageNum:10,//总页数
    }
  },
  methods:{
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {

    },
    localtion(){
      
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
      cursor:pointer;
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
  .order_page{
    width: 98%;
    text-align: right;
    margin-top: 55px;
    margin-bottom:60px;
  }
}
</style>
