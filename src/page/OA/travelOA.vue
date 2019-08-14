<!-- 差旅费用相关 -->
<template lang="html">
  <div class="travel_oa">
    <p class="travel_title">
      <el-button icon="el-icon-upload" type="primary" size="medium" @click="applyTraval()">申请差旅</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
        <i class="el-icon-refresh"></i>
      </el-tooltip>
    </p>
    <!-- 申请差旅 -->
    <div class="apply_travel" ref="apply_travel" v-if="applyIS">
      <p class="apply_title">
        <span>申请差旅</span>
        <i class="el-icon-close" @click="closeApply()"></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataLength:88,//数据总和
      applyIS:false,
    }
  },
  methods:{
    applyTraval(){//添加申请差旅
      this.applyIS=true;
      setTimeout(()=>{
        this.$refs.apply_travel.style.width='100%';
        this.$refs.apply_travel.style.height='100%';
      })
    },
    closeApply(){
      this.$refs.apply_travel.style.width='300px';
      this.$refs.apply_travel.style.height='200px';
      setTimeout(()=>{
        this.applyIS=false;
      },350)
    }
  }
}
</script>

<style lang="scss" scoped>
.travel_oa{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .travel_title{
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
  .apply_travel{
    width: 300px;
    height: 200px;
    background: white;
    position: fixed;
    transition: .5s all;
    top:0;
    left:0;
    .apply_title{
      width: 95%;
      margin:0 auto;
      margin-top:20px;
      position: fixed;
      top:0;
      left:30px;
      span{
        font-size:22px;
        color:#eb7a1d;
        border-bottom:4px solid #eb7a1d;
      }
      i{
        font-size: 35px;
        color:#eb7a1d;
        cursor:pointer;
        position: fixed;
        right:20px;
        top:20px;
      }
    }
  }
}
</style>
