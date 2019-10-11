<!-- 业务费用相关 -->
<template lang="html">
  <div class="business_oa">
    <p class="other_title">
      <el-button icon="el-icon-upload" type="primary" size="medium" @click="applyMuch()">费用申请</el-button>
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
        <el-col :span="2"><div class="oaTitle">状态</div></el-col>
        <el-col :span="2"><div class="oaTitle">操作</div></el-col>
      </el-row>
      <el-row class="el_con publicHover" v-for="(oA,index) in OAList" :key="'OA'+index">
        <el-col :span="2"><div class="oaMes">{{oA.num+1}}</div></el-col>
        <el-col :span="6"><div class="oaMes">{{oA.proName}}</div></el-col>
        <el-col :span="3"><div class="oaMes">￥{{oA.mount}}</div></el-col>
        <el-col :span="3"><div class="oaMes">{{oA.creatTime}}</div></el-col>
        <el-col :span="3"><div class="oaMes">{{oA.beginTime}}</div></el-col>
        <el-col :span="3"><div class="oaMes">{{oA.endTime}}</div></el-col>
        <el-col :span="2"><div class="oaMes">
          <span v-show="oA.state==0" style="color:#333;">未审核</span>
          <span v-show="oA.state==1" style="color:#eb7a1d;">审核中</span>
          <span v-show="oA.state==2" style="color:green;">已审核</span>
          <span v-show="oA.state==3" style="color:#666;">审核未通过</span>
        </div></el-col>
        <el-col :span="2"><div class="oaMes" style="textAlign:left;box-sizing:border-box;padding-left:18px;">
          <i class="el-icon-document" style="color:#eb7a1d;" @click="details(index)"></i>
          <i class="el-icon-edit" v-show="oA.state==0||oA.state==3"></i>
          <i class="el-icon-delete" v-show="oA.state==0||oA.state==3"></i>
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
    <!-- 新增费用申请 -->
    <div class="">
      <el-dialog
        title="费用申请"
        :visible.sync="addBusiness"
        width="45%">
        <div class="" style="maxHeight:500px;overflow:auto;">
          <div class="" style="width:100%;display:flex;">
            <ul class="addOa_title">
              <li>项目名称:</li>
              <li>出差地:</li>
              <li>开始时间:</li>
              <li>结束时间:</li>
              <li>附件:</li>
              <li>备注:</li>
            </ul>
            <ul class="addOa_con">
              <li>
                <el-select
                  v-model="cusName"
                  filterable
                  remote
                  reserve-keyword
                  size="medium"
                  style="width:400px;"
                  placeholder="请输入项目名称"
                  :remote-method="remoteMethod"
                  :loading="cusLoading">
                  <el-option
                    v-for="item in restaurants"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <el-select v-model="placeProName" @change="chosePro" style="width:180px;" size="medium" placeholder="选择省">
                  <el-option
                  v-for="(placePro,index) in placeList"
                  :key="'Pro'+index"
                  :label="placePro.name"
                  :value="placePro.name"
                  >
                  </el-option>
                </el-select>
                <span style="display:inline-block;width:10px;"></span>
                <el-select v-model="placeCityName" @change="choseCity" style="width:190px;" size="medium" placeholder="选择市">
                  <el-option
                  v-for="(placePro,index) in cityList"
                  :key="'City'+index"
                  :label="placePro.name"
                  :value="placePro.name"
                  >
                  </el-option>
                </el-select>
              </li>
              <li>
                <el-date-picker
                  v-model="beginTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="开始日期">
                </el-date-picker>
              </li>
              <li>
                <el-date-picker
                  v-model="endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="结束日期">
                </el-date-picker>
              </li>
              <li class="fileDom">
                <el-input type="primary" v-model="fileName" style="width:280px;" placeholder="请选择文件" size="medium"></el-input>
                <input type="file" name="" value="" class="fileInput">
                <el-button type="primary" icon="el-icon-upload" size="medium" style="width:110px;">上传文档</el-button>
              </li>
              <li>
                <el-input type="primary" v-model="remark" placeholder="请输入备注" style="width:400px;" size="medium"></el-input>
              </li>
            </ul>
          </div>
          <p class="muchType" v-for="(mount,index) in muchTypeList">
            <span class="select">
              <el-select v-model="mount.type" placeholder="费用类型" size="medium" style="width:120px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              :
            </span>
            <span class="mount">
              <el-input type="number" @change="docuMount(index)" v-model="mount.mount" size="medium" style="width:280px;" placeholder="请输入金额"></el-input>
              <el-input type="number" v-model="mount.rate" size="medium" style="width:80px;" placeholder="利率"></el-input>
              <i class="el-icon-delete" style="marginLeft:10px;color:#eb7a1d;fontSize:18px;cursor:pointer;" @click="delMuchType(index)"></i>
            </span>
          </p>
          <p style="textAlign:left;box-sizeing:border-box;padding-left:14px;textAlign:center;">
            <el-button icon="el-icon-plus" type="primary" size="medium" @click="addType">添加费用类型</el-button>
          </p>
          <p class="muchType">
            <span class="select">
              <el-select v-model="ruleName" placeholder="审核部门" size="medium" style="width:120px;" @change="chooseDep">
                <el-option
                  v-for="item in optionsRule"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              :
            </span>
            <span class="mount">
              {{temText}}
            </span>
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addBusiness = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="addBusiness = false" size="medium">提&nbsp;交</el-button>
        </span>
      </el-dialog>
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
            <li>报销类型:</li>
            <li>报销金额:</li>
            <li>申请时间:</li>
            <li>开始时间:</li>
            <li>结束时间:</li>
            <li>审核状态:</li>
          </ul>
          <ul class="detailsMes">
            <li>{{detailsMes.proName}}</li>
            <li>{{detailsMes.muchType}}</li>
            <li>￥{{detailsMes.mount}}</li>
            <li>{{detailsMes.creatTime}}</li>
            <li>{{detailsMes.beginTime}}</li>
            <li>{{detailsMes.endTime}}</li>
            <li>
              <span v-if="detailsMes.state==0">未审核</span>
              <span v-if="detailsMes.state==1">审核中</span>
              <span v-if="detailsMes.state==2">已审核</span>
              <span v-if="detailsMes.state==3">审核未通过</span>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="muchDetils = false">关&nbsp;闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      temText:'-',
      options: [{
        value: '选项1',
        label: '长途交通费'
        }, {
        value: '选项2',
        label: '住宿费'
        }, {
        value: '选项3',
        label: '出租车费'
        }, {
        value: '选项4',
        label: '办公用品费'
        }, {
        value: '选项5',
        label: '其他费用'
      }],
      value: '',
      optionsRule:[
        {
          value: '研发部',
          label: '研发部'
        },
        {
          value: '财务部',
          label: '财务部'
        },
      ],

      //--------------------------
      dataLength:88,//数据总和
      addBusiness:false,//添加业务
      currentPage3:1,//分页器类型
      page:0,//页码
      pageNum:10,//总页数
      restaurants:[],//客户名称筛选列表
      cusName:null,//客户名称
      cusLoading:false,//筛选Loading
      placeProName:null,//省级名称
      placeCityName:null,//市级名称
      placeList:[],//省级列表
      cityList:[],//市级列表
      placeID:null,//地点ID
      beginTime:null,//开始时间
      endTime:null,//结束时间
      fileName:null,//文件名称
      remark:null,//新增备注
      muchTypeList:[
        {
          type:null,//报销金额类型
          mount:null,//报销金额
          rate:null,//金额利率
        }
      ],
      ruleName:null,//审核规则
      muchDetils:false,//报销详情
      detailsMes:{
        proName:null,
        mount:null,
        creatTime:null,
        beginTime:null,
        endTime:null,
        state:null,
      },
      OAList:[
        {
          num:0,
          proName:'20190725杭州数喜科技机房升级改造项目',
          mount:1000,
          beginTime:'2019/07/08',
          endTime:'2019/07/28',
          creatTime:'2019/07/30',
          state:0,
          muchType:'长途汽车费'
        },
        {
          num:1,
          proName:'通信产业工程建设有限公司机房建设项目',
          mount:400,
          beginTime:'2019/08/08',
          endTime:'2019/08/12',
          creatTime:'2019/08/02',
          state:2,
          muchType:'长途汽车费'
        },
        {
          num:2,
          proName:'中国建材集团视频会议项目',
          mount:677,
          beginTime:'2019/06/10',
          endTime:'2019/06/18',
          creatTime:'2019/05/24',
          state:1,
          muchType:'长途汽车费'
        },
        {
          num:3,
          proName:'机房建设升级改造1',
          mount:1057,
          beginTime:'2019/05/09',
          endTime:'2019/05/17',
          creatTime:'2019/05/01',
          state:3,
          muchType:'长途汽车费'
        },
        {
          num:4,
          proName:'天津市人民检察院桌面云第二分院',
          mount:109,
          beginTime:'2019/05/10',
          endTime:'2019/05/16',
          creatTime:'2019/05/01',
          state:0,
          muchType:'长途汽车费'
        },
        {
          num:5,
          proName:'	海南州职业技术学院信息化建设',
          mount:90,
          beginTime:'2019/04/25',
          endTime:'2019/04/12',
          creatTime:'2019/04/02',
          state:2,
          muchType:'长途汽车费'
        }
      ],
    }
  },
  methods:{
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {

    },
    remoteMethod(query) {//远程查询客户列表
        if (query !== '') {
          let formdata=new FormData();
          formdata.append('name',query);
          formdata.append('size',20);
          formdata.append('page',0);
          this.$axios.post(this.url+'/findProjectListByCondition',formdata).then((res)=>{
            if(res.data.code==0){
              this.restaurants=res.data.data.content.map(item=>{
                return {value:item.name,label:item.name,id:item.id}
              });
            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            this.$message.error('未知错误,请联系管理员');
          })
          this.cusLoading = true;
          setTimeout(() => {
            this.cusLoading = false;
            this.restaurants.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.restaurants = [];
        }
    },
    applyMuch(){//费用申请
      let _vm=this;
      _vm.$axios.get(_vm.url+'/mobile/getUsingPlaceList').then((res)=>{
        if(res.data.code==0){
          _vm.addBusiness=true;
          _vm.placeList=res.data.data.placeList
        }else{
          _vm.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
      })
    },
    chosePro(index){//选择省
      this.placeCityName=''
      this.placeList.forEach((e)=>{
        if(index===e.name){
          this.cityList=e.usingChildList
        }
      })
    },
    choseCity(index){//选择市
      this.cityList.forEach((e)=>{
        if(index===e.name){
          this.placeID=e.id;
        }
      })
    },
    addType(){//添加费用类型
      this.muchTypeList.push({
        type:null,//报销金额类型
        mount:null,//报销金额
        rate:null,//金额利率
      })
    },
    docuMount(index){//利率换算
      this.muchTypeList[index].rate=this.muchTypeList[index].mount*0.2
    },
    delMuchType(index){//删除费用类型
      if(this.muchTypeList.length>1){
        this.muchTypeList.splice(index,1);
      }else{
        this.$message.error('不能再删除了哦')
      }
    },
    details(index){//申请详情
      this.detailsMes=this.OAList[index];
      this.muchDetils=true;
    },
    chooseDep(label){
      if(label==='研发部'){
        this.temText='何玄————黄桢'
      }else if(label==='财务部'){
        this.temText='肖丽————何玄————陈德见'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.business_oa{
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
  .addOa_title{
    width: 25%;
    li{
      line-height: 50px;
      text-align: right;
      box-sizing: border-box;
      padding-right: 10px;
      font-size: 15px;
    }
  }
  .addOa_con{
    width: 75%;
    li{
      line-height: 50px;
      box-sizing: border-box;
      font-size: 15px;
    }
    .fileDom{
      position: relative;
      .fileInput{
        position: absolute;
        height: 40px;
        top:5px;
        left: 0;
        width: 400px;
        opacity: 0;
      }
    }
  }
  .muchType{
    line-height: 50px;
    width: 100%;
    display: flex;
    .select{
      width: 25%;
      display: inline-block;
      text-align: right;
      box-sizing: border-box;
      padding-right: 10px;
    }
    .mount{
      width: 75%;
      box-sizing: border-box;
    }
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
