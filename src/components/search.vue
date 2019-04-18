<!-- 全局筛选 -->
<template lang="html">
  <div class="search">
    <ul>
      <li>日期范围:&nbsp;&nbsp;
        <el-date-picker
           v-model="value7"
           type="daterange"
           align="right"
           unlink-panels
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期"
           :picker-options="pickerOptions2">
         </el-date-picker></li>
       <li>
         工程师信息:&nbsp;&nbsp;<el-input v-model="engName" placeholder="请输入工程师姓名" style="width:300px;" />
         <el-button type="primary" size="medium" icon="el-icon-search" style="margin-left:25px;">搜索</el-button>
       </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7:'',
        engName:null,
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: 100%;
  height: 120px;
  ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    li{
      height: 120px;
      line-height: 120px;
      width: 50%;
      color:#666;
    }
    li:first-child{
      width: 45%;
      text-align: right;
      padding-right: 80px;
      box-sizing: border-box;
    }
  }
}
</style>
