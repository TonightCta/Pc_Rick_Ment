<!-- 需求管理 -->
<template lang="html">
  <div class="demand_admin">
    <p class="demand_titleOper">
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <i class="el-icon-refresh"></i>
    </p>
    <el-row>
      <el-col :span="2"><div class="demand_title">序号</div></el-col>
      <el-col :span="3"><div class="demand_title">联系人</div></el-col>
      <el-col :span="3"><div class="demand_title">联系方式</div></el-col>
      <el-col :span="3"><div class="demand_title">预算</div></el-col>
      <el-col :span="7"><div class="demand_title">需求简介</div></el-col>
      <el-col :span="2"><div class="demand_title">创建时间</div></el-col>
      <el-col :span="2"><div class="demand_title">状态</div></el-col>
      <el-col :span="2"><div class="demand_title">操作</div></el-col>
    </el-row>
    <div class="">
      <el-row class="operTwo publicHover" v-for="(demand,index) in demandList" :key="'Demand'+index">
        <el-col :span="2"><div class="demand_con">{{demand.num+1}}</div></el-col>
        <el-col :span="3"><div class="demand_con">{{demand.contacts}}</div></el-col>
        <el-col :span="3"><div class="demand_con">{{demand.phone}}</div></el-col>
        <el-col :span="3"><div class="demand_con">{{demand.mount}}</div></el-col>
        <el-tooltip class="item" effect="dark" :content="demand.text" placement="bottom">
          <el-col :span="7"><div class="demand_con">{{demand.text.substring(0,18)}}...</div></el-col>
        </el-tooltip>
        <el-col :span="2"><div class="demand_con">{{demand.time}}</div></el-col>
        <el-col :span="2"><div class="demand_con">
          <span style="border-radius:3px;background:#ccc;fontSize:12px;padding:3px;" v-if="demand.state==0">未处理</span>
          <span style="border-radius:3px;background:green; color:white;fontSize:12px;padding:3px;" v-else>已处理</span>
        </div></el-col>
        <el-col :span="2"><div class="demand_con">
          <i class="el-icon-edit" style="color:#eb7a1d;"></i>
          <i class="el-icon-delete"></i>
        </div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataLength:88,
      demandList:[
        {
          num:0,
          contacts:'派大星',
          phone:'18888888888',
          mount:10000,
          text:'接网络调试项目，设计到网络、安全、无线、语音、SDN，华为出生，最好是华为',
          time:'2019/08/20',
          state:1,
        },
        {
          num:1,
          contacts:'海绵宝宝',
          phone:'19999999999',
          mount:9999,
          text:'123',
          time:'2019/10/22',
          state:0,
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.demand_admin{
  width: 98%;
  margin:0 auto;
  height: 100%;
  overflow-x: hidden;
  .demand_titleOper{
    width: 98%;
    margin:0 auto;
    margin-top: 50px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    position: relative;
    margin-bottom: 5px;
    .dataLength{
      display: inline-block;
      width: 99%;
      text-align: right;
      box-sizing: border-box;
      padding-right: 50px;
    }
    i{
      font-size: 32px;
      color:#eb7a1d;
      cursor:pointer;
      position: absolute;
      right:12px;
      top:-6px;
    }
  }
  .demand_title{
    text-align: center;
    line-height: 40px;
    background: #eb7a1d;
    color:white;
  }
  .demand_con{
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    i{
      font-size: 20px;
      cursor:pointer;
    }
  }
  .operTwo:nth-of-type(even){
    background:#eee;
  }
}
</style>
