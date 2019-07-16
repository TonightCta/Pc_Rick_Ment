<!-- 潜在风险记录 -->
<template lang="html">
  <div class="risk_rcord">
    <p class="risk_reload">
      <i class="el-icon-refresh"></i>
    </p>
    <div class="" style="minHeight:500px;">
      <el-row>
        <el-col :span="2"><div class="risk_title">序号</div></el-col>
        <el-col :span="4"><div class="risk_title">项目/局点</div></el-col>
        <el-col :span="10"><div class="risk_title">需求简介</div></el-col>
        <el-col :span="3"><div class="risk_title">上报人员</div></el-col>
        <el-col :span="3"><div class="risk_title">上报时间</div></el-col>
        <el-col :span="2"><div class="risk_title">操作</div></el-col>
      </el-row>
    </div>
    <!-- 分页器 -->
    <p class="project_page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :total="pageNum">
      </el-pagination>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pageNum:10,//总页数
      currentPage3:1,//分页器类型
    }
  },
  methods:{
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
  }
}
</script>

<style lang="scss" scoped>
.risk_rcord{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
}
.risk_reload{
  width: 100%;
  text-align: right;
  padding-top: 12px;
  padding-bottom: 10px;
  box-sizing: border-box;
  padding-right: 20px;
  i{
    color:#eb7a1d;
    font-size: 30px;
    cursor:pointer;
  }
}
.risk_title{
  line-height: 40px;
  text-align: center;
  background: #eb7a1d;
  color:white;
}
.project_page{
  width: 98%;
  text-align: right;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
