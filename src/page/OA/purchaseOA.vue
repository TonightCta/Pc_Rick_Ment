<!-- 采购、外包相关 -->
<template lang="html">
  <div class="purchase_oa">
    <p class="purchase_title">
      <el-button icon="el-icon-upload" type="primary" size="medium" @click="addPurChase=true">采购/外包申请</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
        <i class="el-icon-refresh"></i>
      </el-tooltip>
    </p>
    <div class="">
      <el-dialog
        title="申请采购/外包"
        :visible.sync="addPurChase"
        width="45%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPurChase = false">取 消</el-button>
          <el-button type="primary" @click="addPurChase = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataLength:88,//数据总和
      addPurChase:false,//申请采购
    }
  }
}
</script>

<style lang="scss" scoped>
.purchase_oa{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .purchase_title{
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
