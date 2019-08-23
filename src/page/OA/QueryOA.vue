<!-- 报销记录查询 -->
<template lang="html">
  <div class="query_oa">
    <div class="query_search">
      <ul>
        <li>
          <p>申请时间:
            <el-date-picker
               v-model="searchMes.creatTime"
               type="date"
               size="medium"
               style="width:250px;"
               value-format="yyyy-MM-dd"
               placeholder="选择日期时间">
            </el-date-picker>
          </p>
          <p>过审时间:
            <el-date-picker
               v-model="searchMes.outTime"
               type="date"
               size="medium"
               style="width:250px;"
               value-format="yyyy-MM-dd"
               placeholder="选择日期时间">
            </el-date-picker>
          </p>
        </li>
        <li>
          <p>金额范围:&nbsp;<el-input v-model="searchMes.minMuch" value="number" type="number" size="medium" style="width:105px;" placeholder="￥"></el-input><span style="color:#ccc;">-</span><el-input v-model="searchMes.maxMuch" type="number" size="medium" style="width:105px;" placeholder="￥"></el-input></p>
          <p>&nbsp;&nbsp;&nbsp;申请人:&nbsp;<el-input v-model="searchMes.contactName" type="primary" size="medium" style="width:250px;" placeholder="请输入申请人"></el-input></p>
        </li>
      </ul>
    </div>
    <p class="other_title">
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
        <i class="el-icon-refresh"></i>
      </el-tooltip>
    </p>
    <div class="" style="minHeight:500px;">
      <el-row>
        <el-col :span="2"><div class="oaTitle">序号</div></el-col>
        <el-col :span="6"><div class="oaTitle">项目名称</div></el-col>
        <el-col :span="3"><div class="oaTitle">报销金额</div></el-col>
        <el-col :span="3"><div class="oaTitle">申请时间</div></el-col>
        <el-col :span="3"><div class="oaTitle">开始时间</div></el-col>
        <el-col :span="3"><div class="oaTitle">结束时间</div></el-col>
        <el-col :span="2"><div class="oaTitle">申请人</div></el-col>
        <el-col :span="2"><div class="oaTitle">操作</div></el-col>
      </el-row>
      <el-row class="el_con" v-for="(oA,index) in OAList" :key="'OA'+index">
        <el-col :span="2"><div class="oaMes">{{oA.num+1}}</div></el-col>
        <el-col :span="6"><div class="oaMes">{{oA.proName}}</div></el-col>
        <el-col :span="3"><div class="oaMes">￥{{oA.mount}}</div></el-col>
        <el-col :span="3"><div class="oaMes">{{oA.creatTime}}</div></el-col>
        <el-col :span="3"><div class="oaMes">{{oA.beginTime}}</div></el-col>
        <el-col :span="3"><div class="oaMes">{{oA.endTime}}</div></el-col>
        <el-col :span="2"><div class="oaMes">{{oA.contact}}</div></el-col>
        <el-col :span="2"><div class="oaMes">
          <i class="el-icon-document" style="color:#eb7a1d;" @click="muchDetilsEvent(index)"></i>
        </div></el-col>
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
    <!-- 申请详情 -->
    <div class="">
      <el-dialog
        title="申请详情"
        :visible.sync="muchDetils"
        width="45%">
        <div class="" style="width:100%;display:flex;">
          <ul class="detailsTitle">
            <li>项目名称:</li>
            <li>报销金额:</li>
            <li>申请时间:</li>
            <li>开始时间:</li>
            <li>结束时间:</li>
            <li>申请人:</li>
            <li>备注:</li>
          </ul>
          <ul class="detailsMes">
            <li>{{detailsMes.proName}}</li>
            <li>￥{{detailsMes.mount}}</li>
            <li>{{detailsMes.creatTime}}</li>
            <li>{{detailsMes.beginTime}}</li>
            <li>{{detailsMes.endTime}}</li>
            <li>{{detailsMes.contact}}</li>
            <li>
              备注
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="muchDetils = false" size="medium">关&nbsp;闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentPage3:1,//分页器类型
      page:0,//页码
      pageNum:10,//总页数
      dataLength:99,//数据总和
      OAList:[
        {
          num:0,
          proName:'20190725杭州数喜科技机房升级改造项目',
          mount:1000,
          beginTime:'2019/07/08',
          endTime:'2019/07/28',
          creatTime:'2019/07/30',
          contact:'派大星',
          state:0,
        },
        {
          num:1,
          proName:'通信产业工程建设有限公司机房建设项目',
          mount:400,
          beginTime:'2019/08/08',
          endTime:'2019/08/12',
          contact:'海绵宝宝',
          creatTime:'2019/08/02',
          state:2,
        },
        {
          num:2,
          proName:'中国建材集团视频会议项目',
          contact:'章鱼哥',
          mount:677,
          beginTime:'2019/06/10',
          endTime:'2019/06/18',
          creatTime:'2019/05/24',
          state:1,
        },
        {
          num:3,
          proName:'机房建设升级改造1',
          mount:1057,
          contact:'蟹老板',
          beginTime:'2019/05/09',
          endTime:'2019/05/17',
          creatTime:'2019/05/01',
          state:3,
        },
        {
          num:4,
          proName:'天津市人民检察院桌面云第二分院',
          mount:109,
          beginTime:'2019/05/10',
          contact:'痞老板',
          endTime:'2019/05/16',
          creatTime:'2019/05/01',
          state:0,
        },
        {
          num:5,
          proName:'	海南州职业技术学院信息化建设',
          contact:'珊迪',
          mount:90,
          beginTime:'2019/04/25',
          endTime:'2019/04/12',
          creatTime:'2019/04/02',
          state:2,
        }
      ],
      muchDetils:false,//报销详情
      detailsMes:{//申请详情信息
        proName:null,
        mount:null,
        creatTime:null,
        beginTime:null,
        endTime:null,
        contact:null,
        state:null,
      },
      searchMes:{
        creatTime:null,//申请时间
        outTime:null,//过审时间
        minMuch:null,//最小金额
        maxMuch:null,//最大金额
        contactName:null,//申请人
      }
    }
  },
  methods:{
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {

    },
    muchDetilsEvent(index){
      this.detailsMes=this.OAList[index];
      this.muchDetils=true;
    }
  }
}
</script>

<style lang="scss" scoped>
.query_oa{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .query_search{
    height: 120px;
    width: 100%;
    box-sizing: border-box;
    padding-top: 30px;
    ul{
      width: 70%;
      margin:0 auto;
      li{
        width: 100%;
        display: flex;
        line-height: 60px;
        p{
          width: 50%;
        }
      }
    }
  }
  .other_title{
    margin-top: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
    position: relative;
    height: 30px;
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
  .oaTitle{
    margin-top: 5px;
    line-height: 40px;
    background: #eb7a1d;
    color:white;
    text-align: center;
  }
  .oaMes{
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    i{
      font-size: 18px;
      cursor:pointer;
    }
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
  .detailsTitle{
    width: 30%;
    line-height: 40px;
    text-align: right;
    li{
      box-sizing: border-box;
      padding-right: 20px;
    }
  }
  .detailsMes{
    width: 70%;
    line-height: 40px;
    text-align: left;
  }
}
</style>
