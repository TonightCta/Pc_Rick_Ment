<!-- 客户管理 -->
<template lang="html">
  <div class="cust_page">
    <div class="cust_search">
      <ul>
        <li>日期范围:
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </li>
        <li>
          <el-input type="primary" style="width:350px;" placeholder="请输入客户名称"></el-input>
          <el-button type="primary" icon="el-icon-search" v-model="cusName" size="medium">搜索</el-button>
        </li>
      </ul>
    </div>
    <p class="cust_title">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="pushCus()">添加客户</el-button>
      <span>共有数据:&nbsp;<font style="color:#eb7a1d;font-weight:bold;">58</font>&nbsp;条</span>
      <el-tooltip class="item" effect="dark" content="刷新列表" placement="bottom">
        <i class="el-icon-refresh" style="color:#eb7a1d;fontSize:30px;cursor:pointer;"></i>
      </el-tooltip>
    </p>
    <div class="cust_con">
      <el-row>
        <el-col :span="2"><div class="cusMesTitle">序号</div></el-col>
        <el-col :span="5"><div class="cusMesTitle">公司名称</div></el-col>
        <el-col :span="3"><div class="cusMesTitle">公司所在地</div></el-col>
        <el-col :span="4"><div class="cusMesTitle">详细地址</div></el-col>
        <el-col :span="2"><div class="cusMesTitle">联系人</div></el-col>
        <el-col :span="2"><div class="cusMesTitle">联系电话</div></el-col>
        <el-col :span="2"><div class="cusMesTitle">操作账号</div></el-col>
        <el-col :span="2"><div class="cusMesTitle">状态</div></el-col>
        <el-col :span="2"><div class="cusMesTitle">操作</div></el-col>
      </el-row>
      <el-row class="operTwo" v-for="(cusMes,index) in cusList" :key="'CusMes'+index">
        <el-col :span="2"><div class="cusMesCon">{{cusMes.num}}</div></el-col>
        <el-col :span="5"><div class="cusMesCon">{{cusMes.name}}</div></el-col>
        <el-col :span="3"><div class="cusMesCon">{{cusMes.place}}</div></el-col>
        <el-col :span="4"><div class="cusMesCon">{{cusMes.address}}</div></el-col>
        <el-col :span="2"><div class="cusMesCon">{{cusMes.cusName}}</div></el-col>
        <el-col :span="2"><div class="cusMesCon">{{cusMes.cusName}}</div></el-col>
        <el-col :span="2"><div class="cusMesCon">{{cusMes.cusPhone}}</div></el-col>
        <el-col :span="2"><div class="cusMesCon">
          <span v-if="cusMes.state==1" style="background:green;">已启用</span>
          <span v-else style="background:red;">已停用</span>
        </div></el-col>
        <el-col :span="2"><div class="cusMesCon">
          <el-tooltip class="item" effect="dark" content="启用" placement="bottom" v-if="cusMes.state==2">
            <i class="el-icon-circle-check-outline" style="color:#eb7a1d;"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="停用" placement="bottom" v-else>
            <i class="el-icon-remove-outline"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑客户" placement="bottom">
            <i class="el-icon-edit" style="color:#eb7a1d;" @click="editCust(index)"></i>
          </el-tooltip>
        </div></el-col>
      </el-row>
    </div>
    <!-- 添加客户 -->
    <div class="">
      <el-dialog
        title="添加客户"
        :visible.sync="addCus"
        width="45%">
        <div class="add_cus">
          <ul>
            <li><span style="color:red;">*</span>公司名称:</li>
            <li>详细地址:</li>
            <li>联系人:</li>
            <li>手机号:</li>
            <li><span style="color:red;">*</span>登录名:</li>
            <li>电子邮箱:</li>
            <li>公司所在地:</li>
          </ul>
          <ul>
            <li><el-input type="medium" v-model="addCusMes.companyName" placeholder="请输入公司名称"></el-input></li>
            <li><el-input type="medium" v-model="addCusMes.address" placeholder="请输入详细地址"></el-input></li>
            <li><el-input type="medium" v-model="addCusMes.cusName" placeholder="请输入联系人"></el-input></li>
            <li><el-input type="medium" v-model="addCusMes.cusPhone" placeholder="请输入联系人手机号"></el-input></li>
            <li><el-input type="medium" v-model="addCusMes.operName" placeholder="请输入登录名"></el-input></li>
            <li><el-input type="medium" v-model="addCusMes.email" placeholder="请输入公司邮箱"></el-input></li>
            <li>
              <el-select v-model="addCusMes.vinceName" placeholder="选择省" style="width:150px;" @change="chosePro">
                <el-option
                  v-for="(item,index) in placeList"
                  :key="'Vince'+index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-select v-model="addCusMes.cityName" placeholder="选择市" style="width:150px;" @change="choseCity">
                <el-option
                  v-for="(item,index) in cityList"
                  :key="'City'+index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCus = false">取 消</el-button>
          <el-button type="primary" @click="addCus = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑客户 -->
    <div class="">
      <el-dialog
        title="添加客户"
        :visible.sync="editCus"
        width="45%">
        <div class="add_cus">
          <ul>
            <li><span style="color:red;">*</span>公司名称:</li>
            <li>详细地址:</li>
            <li>联系人:</li>
            <li>手机号:</li>
            <li><span style="color:red;">*</span>登录名:</li>
            <li>电子邮箱:</li>
            <li>公司所在地:</li>
          </ul>
          <ul>
            <li><el-input type="medium" v-model="editCusMes.name" placeholder="请输入公司名称"></el-input></li>
            <li><el-input type="medium" v-model="editCusMes.address" placeholder="请输入详细地址"></el-input></li>
            <li><el-input type="medium" v-model="editCusMes.cusName" placeholder="请输入联系人"></el-input></li>
            <li><el-input type="medium" v-model="editCusMes.cusPhone" placeholder="请输入联系人手机号"></el-input></li>
            <li><el-input type="medium" v-model="editCusMes.operNum" placeholder="请输入登录名"></el-input></li>
            <li><el-input type="medium" v-model="editCusMes.email" placeholder="请输入公司邮箱"></el-input></li>
            <li>
              <el-select v-model="editCusMes.place" placeholder="选择省" style="width:150px;" @change="chosePro">
                <el-option
                  v-for="(item,index) in placeList"
                  :key="'Vince'+index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-select v-model="editCusMes.place" placeholder="选择市" style="width:150px;" @change="choseCity">
                <el-option
                  v-for="(item,index) in cityList"
                  :key="'City'+index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCus = false">取 消</el-button>
          <el-button type="primary" @click="editCus = false">确 定</el-button>
        </span>
      </el-dialog>
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
      value7:[],//搜索时间段
      cusName:null,//搜索客户名称
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
      cusList:[
        {
          num:'1',
          name:'海油2018年度数通改造服务项目',
          place:'厦门市',
          address:'厦门',
          cusName:'吕杰民',
          cusPhone:'18965824299',
          operNum:'吕杰民',
          state:1,
          email:null,
        },
        {
          num:'2',
          name:'北京爱奇艺科技有限公司',
          place:'北京',
          address:'北京市海淀区北一街2号',
          cusName:'吴海龙',
          cusPhone:'18618199091',
          operNum:'北京爱奇艺科技有限公司',
          state:2,
          email:null,
        }
      ],
      currentPage3:1,//分页器类型
      pageNum:10,//分页器页数
      addCus:false,//添加客户
      addCusMes:{
        companyName:null,//公司名称
        address:null,//详细地址
        cusName:null,//联系人
        cusPhone:null,//联系人电话
        operName:null,//登录名
        email:null,//电子邮箱
        vinceName:null,//省级
        cityName:null,//市级
      },
      editCusMes:{},//
      placeID:null,//公司所在地
      placeList:[],//省级列表
      cityList:[],//城市列表
      editCus:false,//编辑客户资料
    }
  },
  methods:{
    pushCus(){//添加客户
      let _vm=this;
      _vm.$axios.get(_vm.url+'/mobile/getUsingPlaceList').then((res)=>{
        if(res.data.code==0){
          _vm.addCus=true;
          _vm.placeList=res.data.data.placeList
        }else{
          _vm.addCus=false;
          _vm.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        _vm.addCus=false;
        _vm.$message.error('未知错误,请联系管理员')
      });
    },
    chosePro(index){//选择省
      this.addCusMes.cityName=''
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
    editCust(index){//编辑客户信息
      this.editCusMes=this.cusList[index];
      this.editCus=true;
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
  }
}
</script>

<style lang="scss" scoped>
.cust_page{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .cust_search{
    width: 100%;
    height: 120px;
    ul{
      height: 100%;
      width: 100%;
      display: flex;
      li{
        width: 50%;
        line-height: 120px;
      }
      li:first-child{
        text-align: center;
        box-sizing: border-box;
      }
    }
  }
  .cust_title{
    width: 100%;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    position: relative;
    span{
      margin-left: 70%;
      position: absolute;
      line-height: 40px;
      right: 60px;
      font-size: 16px;
    }
    i{
      position: absolute;
      right:10px;
      top:5px;
    }
  }
  .cust_con{
    min-height: 500px;
    .operTwo:nth-of-type(odd){
      background:#e5e4e4;
    }
    margin-top: 5px;
    .cusMesTitle{
      line-height: 40px;
      text-align: center;
      background: #eb7a1d;
      color:white;
    }
    .cusMesCon{
      line-height: 38px;
      text-align: center;
      font-size: 14px;
      span{
        padding: 3px;
        border-radius: 10px;
        font-size: 13px;
        color:white;
      }
      i{
        font-size: 22px;
        cursor:pointer;
        margin-left: 5px;
        margin-top:3px;
      }
    }
  }
  .add_cus{
    width: 90%;
    display: flex;
    ul:first-child{
      width: 30%;
      li{
        text-align: right;
        box-sizing: border-box;
        padding-right: 20px;
      }
    }
    ul:last-child{
      width: 70%;
    }
    ul{
      li{
        line-height: 50px;
      }
    }
  }
  .project_page{
    width: 98%;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 50px;
  }
}
</style>
