<!-- 潜在风险记录(工程师) -->
<template lang="html">
  <div class="risk_rcord">
    <div class="risk_search">
      日期范围:
      <el-date-picker
        v-model="riskData"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="searchRisk()">搜索</el-button>
    </div>
    <p class="risk_reload">
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
        <i class="el-icon-refresh" @click="getRiskList()"></i>
      </el-tooltip>
    </p>
    <div class="">
      <el-row>
        <el-col :span="2"><div class="risk_title">序号</div></el-col>
        <el-col :span="4"><div class="risk_title">项目/局点</div></el-col>
        <el-col :span="10"><div class="risk_title">内容</div></el-col>
        <el-col :span="3"><div class="risk_title">上报人员</div></el-col>
        <el-col :span="3"><div class="risk_title">上报时间</div></el-col>
        <el-col :span="2"><div class="risk_title">操作</div></el-col>
      </el-row>
      <p style="textAlign:center;lineHeight:80px;color:#666;" v-if="noRisk">暂无更多记录</p>
      <div class="" style="minHeight:500px;" v-loading="riskLoading">
        <el-row class="publicHover" v-for="(risk,index) in riskList" :key="'Risk'+index">
          <el-col :span="2"><div class="risk_mes">{{risk.num+1}}</div></el-col>
          <el-tooltip class="item" effect="dark" :content="risk.projectPointVO.projectName" placement="bottom">
            <el-col :span="4"><div class="risk_mes">{{risk.projectPointVO.projectName.substring(0,10)}}...</div></el-col>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="risk.content" placement="bottom">
            <el-col :span="10"><div class="risk_mes" style="cursor:pointer;">{{risk.content.substring(0,18)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="3"><div class="risk_mes">{{risk.engineerName}}</div></el-col>
          <el-col :span="3"><div class="risk_mes">{{risk.createTime}}</div></el-col>
          <el-col :span="2"><div class="risk_mes">
            <i class="el-icon-delete" style="fontSize:18px;cursor:pointer;" @click="delRisk(index)"></i>
          </div></el-col>
        </el-row>
      </div>
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
      page:0,//页码
      currentPage3:1,//分页器类型
      riskList:[],//风险列表
      length:0,//数据排序
      dataLength:0,//数据总和
      riskData:[],//搜索日期
      riskLoading:false,//数据加载
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
      noRisk:false,//列表是否为空
    }
  },
  watch:{
    riskList(val,oldVal){
      if(val==null||val.length<1){
        this.noRisk=true;
      }else{
        this.noRisk=false;
      }
    }
  },
  created(){
    this.getRiskList();
  },
  methods:{
    getRiskList(){//获取风险列表
      let _vm=this;
      let formdata=new FormData();
      _vm.riskLoading=true;
      formdata.append('operateType','creator');
      formdata.append('creatorId',window.sessionStorage.getItem('Uid'));
      formdata.append('page',_vm.page);
      formdata.append('size',10);
      _vm.$axios.post(_vm.url+'/findWarnRecordListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.riskLoading=false;
          _vm.riskList=res.data.data.content;
          _vm.dataLength=res.data.data.totalElements;
          _vm.pageNum=res.data.data.totalPages*10;
          _vm.length=_vm.page*10;
          _vm.riskList.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++)
          })
        }else{
          _vm.riskLoading=false;
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.riskLoading=false;
        _vm.$message.error('未知错误,请联系管理员')
      })
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.page=val-1;
      if(this.riskData!=null&&this.riskData.length>1){
        this.searchRisk()
      }else{
        this.getRiskList()
      }
    },
    delRisk(index){//删除记录
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'error'
       }).then(() => {
         let formdata=new FormData();
         formdata.append('id',this.riskList[index].id);
         this.$axios.post(this.url+'/deleteWarnRecord',formdata).then((res)=>{
           if(res.data.code==0){
             this.$message.success('删除成功');
             this.getRiskList()
           }else{
             this.$message.error(res.data.msg)
           }
         }).catch((err)=>{
           this.$message.error('未知错误,请联系管理员')
         })
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         });
       });
    },
    searchRisk(){
      let _vm=this;
      let formdata=new FormData();
      if(this.riskData!=null&&this.riskData.length>1){
        _vm.riskLoading=true;
        formdata.append('beginTime',_vm.riskData[0])
        formdata.append('overTime',_vm.riskData[1])
        formdata.append('operateType','creator');
        formdata.append('creatorId',window.sessionStorage.getItem('Uid'));
        formdata.append('page',_vm.page);
        formdata.append('size',10);
        _vm.$axios.post(_vm.url+'/findWarnRecordListByCondition',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.riskLoading=false;
            _vm.riskList=res.data.data.content;
            _vm.dataLength=res.data.data.totalElements;
            _vm.pageNum=res.data.data.totalPages*10;
            _vm.length=_vm.page*10;
            _vm.riskList.forEach((e)=>{
              _vm.$set(e,'num',_vm.length++)
            })
          }else{
            _vm.riskLoading=false;
            _vm.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          _vm.riskLoading=false;
          _vm.$message.error('未知错误,请联系管理员')
        })
      }else{
        _vm.$message.error('未选择时间')
      }
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
.risk_search{
  width: 100%;
  text-align: center;
  line-height: 120px;
}
.risk_reload{
  width: 100%;
  text-align: right;
  padding-top: 12px;
  padding-bottom: 10px;
  box-sizing: border-box;
  padding-right: 20px;
  position: relative;
  .dataLength{
    position: absolute;
    right:60px;
    top:16px;
  }
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
.risk_mes{
  line-height: 50px;
  font-size: 14px;
  text-align: center;
}
.project_page{
  width: 98%;
  text-align: right;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
