<!-- 客户管理 -->
<template lang="html">
  <div class="cust_page">
    <div class="cust_search">
      <ul>
        <li>日期范围:
          <el-date-picker
            v-model="cusDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </li>
        <li>
          <el-input type="primary" style="width:350px;" placeholder="请输入客户名称" v-model="cusName"></el-input>
          <el-button type="primary" icon="el-icon-search" size="medium" @click="searchCus()">搜索</el-button>
        </li>
      </ul>
    </div>
    <p class="cust_title">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="pushCus()">添加客户</el-button>
      <span>共有数据:&nbsp;<font style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</font>&nbsp;条</span>
      <el-tooltip class="item" effect="dark" content="刷新列表" placement="bottom">
        <i class="el-icon-refresh" style="color:#eb7a1d;fontSize:30px;cursor:pointer;" @click="getCusList()"></i>
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
      <p style="textAlign:center;lineHeight:80px;color:#666;" v-if="noCus">暂无更多客户</p>
      <div class="" v-loading="cusLoading" style="minHeight:450px;">
        <el-row class="operTwo publicHover" v-for="(cusMes,index) in cusList" :key="'CusMes'+index">
          <el-col :span="2"><div class="cusMesCon">{{cusMes.num+1}}</div></el-col>
          <el-tooltip class="item" effect="dark" :content="cusMes.name" placement="bottom">
            <el-col :span="5"><div class="cusMesCon" style="cursor:pointer;">{{cusMes.name.substring(0,14)}}...</div></el-col>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="cusMes.placeStr" placement="bottom" v-if="cusMes.placeStr!=null&&cusMes.placeStr!=''">
            <el-col :span="3"><div class="cusMesCon" style="cursor:pointer;">{{cusMes.placeStr.substring(0,9)}}...</div></el-col>

          </el-tooltip>
          <el-col :span="3" v-else><div class="cusMesCon">-</div></el-col>
          <el-tooltip class="item" effect="dark" :content="cusMes.address" placement="bottom"v-if="cusMes.address!=null&&cusMes.address!=''">
            <el-col :span="4"><div class="cusMesCon" style="cursor:pointer;">{{cusMes.address.substring(0,10)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="4" v-else><div class="cusMesCon">-</div></el-col>
          <el-col :span="2" v-if="cusMes.linkman!=null&&cusMes.linkman!=''"><div class="cusMesCon">{{cusMes.linkman}}</div></el-col>
          <el-col :span="2" v-else><div class="cusMesCon">-</div></el-col>
          <el-col :span="2" v-if="cusMes.phone!=null&&cusMes.phone!=''"><div class="cusMesCon">{{cusMes.phone}}</div></el-col>
          <el-col :span="2" v-else><div class="cusMesCon">-</div></el-col>
          <el-tooltip class="item" effect="dark" :content="cusMes.operatorName" placement="bottom">
            <el-col :span="2"><div class="cusMesCon">{{cusMes.operatorName.substring(0,5)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="2"><div class="cusMesCon">
            <span v-if="cusMes.state==2" style="background:green;">已启用</span>
            <span v-else style="background:red;">已停用</span>
          </div></el-col>
          <el-col :span="2"><div class="cusMesCon">
            <el-tooltip class="item" effect="dark" content="启用" placement="bottom" v-if="cusMes.state==-1">
              <i class="el-icon-circle-check" style="color:#eb7a1d;" @click="disCon(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="停用" placement="bottom" v-else>
              <i class="el-icon-remove-outline" @click="disCon(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑客户" placement="bottom">
              <i class="el-icon-edit" style="color:#eb7a1d;" @click="editCust(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除客户" placement="bottom">
              <i class="el-icon-delete" style="color:#eb7a1d;" @click="delCust(index)"></i>
            </el-tooltip>
          </div></el-col>
        </el-row>
      </div>
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
          <el-button type="primary" @click="turnAddCus()">确 定</el-button>
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
            <li><el-input type="medium" v-model="editCusMes.linkman" placeholder="请输入联系人"></el-input></li>
            <li><el-input type="medium" v-model="editCusMes.phone" placeholder="请输入联系人手机号"></el-input></li>
            <li><el-input type="medium" v-model="editCusMes.operatorName" placeholder="请输入登录名"></el-input></li>
            <li><el-input type="medium" v-model="editCusMes.email" placeholder="请输入公司邮箱"></el-input></li>
            <li>
              <el-select v-model="editCusMes.placeVO.parentName" placeholder="选择省" style="width:150px;" @change="chosePro">
                <el-option
                  v-for="(item,index) in placeList"
                  :key="'Vince'+index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-select v-model="editCusMes.placeVO.name" placeholder="选择市" style="width:150px;" @change="choseCity">
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
          <el-button type="primary" @click="turnEditCus()">确 定</el-button>
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
      cusDate:[],//搜索时间段
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
      cusList:[],
      currentPage3:1,//分页器类型
      pageNum:10,//分页器页数
      page:0,//页码
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
      editCusMes:{
        name:null,
        address:null,
        linkman:null,
        phone:null,
        operatorName:null,
        placeVO:{
          parentName:null,
          name:null
        }
      },//修改客户信息
      placeID:null,//公司所在地
      placeList:[],//省级列表
      cityList:[],//城市列表
      editCus:false,//编辑客户资料
      dataLength:0,//总条数
      length:0,//数据序号
      cusLoading:false,//数据加载动画
      cusID:null,//客户ID
      noCus:false,//是否有客户
    }
  },
  created(){
    this.getCusList()
  },
  watch:{
    addCus(val,oldVal){
      if(!val){
        this.addCusMes={
          companyName:null,//公司名称
          address:null,//详细地址
          cusName:null,//联系人
          cusPhone:null,//联系人电话
          operName:null,//登录名
          email:null,//电子邮箱
          vinceName:null,//省级
          cityName:null,//市级
        };
      }else{
        return 1
      }
    },
    editCus(val,oldVal){
      if(!val){
        this.placeID=null;
        this.editCusMes={
          name:null,
          address:null,
          linkman:null,
          phone:null,
          operatorName:null,
          placeVO:{
            parentName:null,
            name:null
          }
        }
      }else{
        return 1;
      }
    },
    cusList(val,oldVal){
      if(val==null||val.length<1){
        this.noCus=true;
      }else{
        this.noCus=false;
      }
    }
  },
  methods:{
    getCusList(){//获取客户列表
      let _vm=this;
      let formdata=new FormData();
      _vm.cusLoading=true;
      formdata.append('stateList',2);
      formdata.append('stateList',-1);
      formdata.append('size',10);
      formdata.append('page',_vm.page);
      _vm.$axios.post(_vm.url+'/findCustomerListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.dataLength=res.data.data.totalElements;
          _vm.pageNum=res.data.data.totalPages*10;
          _vm.cusList=res.data.data.content;
          _vm.length=_vm.page*10;
          _vm.cusList.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++);
            // if(e.parentName)
          })
          _vm.cusLoading=false;
        }else{
          _vm.$message.error(res.data.msg)
          _vm.cusLoading=false;
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
        _vm.cusLoading=false;
      })
    },
    searchCus(){//搜索客户
      let _vm=this;
      let formdata=new FormData();
      if(this.cusDate!=null&&this.cusDate.length>1){
        formdata.append('beginTime',this.cusDate[0])
        formdata.append('endTime',this.cusDate[1])
      };
      if(this.cusName!=null&&this.cusName!=''){
        formdata.append('name',this.cusName)
      };
      formdata.append('stateList',2);
      formdata.append('stateList',-1);
      formdata.append('size',10);
      formdata.append('page',_vm.page);
      _vm.$axios.post(_vm.url+'/findCustomerListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.dataLength=res.data.data.totalElements;
          _vm.pageNum=res.data.data.totalPages*10;
          _vm.cusList=res.data.data.content;
          _vm.length=_vm.page*10;
          _vm.cusList.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++)
          })
          _vm.cusLoading=false;
        }else{
          _vm.$message.error(res.data.msg)
          _vm.cusLoading=false;
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
        _vm.cusLoading=false;
      })
    },
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
      });
    },
    editCust(index){//编辑客户信息
      let _vm=this;
      _vm.$axios.get(_vm.url+'/mobile/getUsingPlaceList').then((res)=>{
        if(res.data.code==0){
          this.editCusMes=this.cusList[index];
          if(this.editCusMes.placeVO==null){
            this.editCusMes.placeVO={
              parentName:null,
              name:null
            }
          }
          this.placeID=this.cusList[index].placeId;
          this.cusID=this.cusList[index].id;
          this.editCus=true;
          _vm.placeList=res.data.data.placeList
        }else{
          _vm.editCus=false;
          _vm.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        _vm.editCus=false;
        _vm.$message.error('未知错误,请联系管理员')
      });

    },
    delCust(index){//删除客户
      let formdata=new FormData();
      this.$confirm('此操作将永久删除该客户,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          formdata.append('id',this.cusList[index].id);
          this.$axios.post(this.url+'/deleteCustomer',formdata).then((res)=>{
            if(res.data.code==0){
              this.$message.success('删除客户成功');
              this.getCusList()
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
    turnEditCus(){//编辑客户信息上传
      let _vm=this;
      let formdata=new FormData();
      if(_vm.editCusMes.name==null||_vm.editCusMes.name==''){
        _vm.$message.error('请输入公司名称')
      }else if(_vm.editCusMes.operatorName==null||_vm.editCusMes.operatorName==''){
        _vm.$message.error('请输入登录名')
      }else{
        formdata.append('id',_vm.cusID);
        formdata.append('name',_vm.editCusMes.name);
        formdata.append('operatorName',_vm.editCusMes.operatorName);
        formdata.append('operatorId',window.sessionStorage.getItem('Uid'));
        if(_vm.editCusMes.address!=null&&_vm.editCusMes.address!=''){
          formdata.append('address',_vm.editCusMes.address)
        };
        if(_vm.editCusMes.linkman!=null&&_vm.editCusMes.linkman!=''){
          formdata.append('linkman',_vm.editCusMes.linkman)
        };
        if(_vm.editCusMes.phone!=null&&_vm.editCusMes.phone!=''){
          formdata.append('phone',_vm.editCusMes.phone)
        };
        if(_vm.editCusMes.email!=null&&_vm.editCusMes.email!=''){
          formdata.append('email',_vm.editCusMes.email)
        };
        if(_vm.placeID!=null&&_vm.placeID!=''){
          formdata.append('placeId',_vm.placeID)
        };
        _vm.$axios.post(_vm.url+'/saveCustomer_n',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.$message.success('修改客户信息成功');
            _vm.getCusList();
            _vm.editCus=false;
          }else{
            _vm.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          _vm.$message.error('未知错误,请联系管理员')
          // console.log(err)
        })
      }
    },
    turnAddCus(){//提交新增客户
      let _vm=this;
      let formdata=new FormData();
      if(_vm.addCusMes.companyName==null||_vm.addCusMes.companyName==''){
        _vm.$message.error('请输入公司名称')
      }else if(_vm.addCusMes.operName==null||_vm.addCusMes.operName==''){
        _vm.$message.error('请输入登录名')
      }else{
        formdata.append('name',_vm.addCusMes.companyName);
        formdata.append('operatorName',_vm.addCusMes.operName);
        formdata.append('operatorId',window.sessionStorage.getItem('Uid'))
        if(_vm.addCusMes.address!=null&&_vm.addCusMes.address!=''){
          formdata.append('address',_vm.addCusMes.address)
        };
        if(_vm.addCusMes.cusName!=null&&_vm.addCusMes.cusName!=''){
          formdata.append('linkman',_vm.addCusMes.cusName)
        };
        if(_vm.addCusMes.cusPhone!=null&&_vm.addCusMes.cusPhone!=''){
          formdata.append('phone',_vm.addCusMes.cusPhone)
        };
        if(_vm.addCusMes.email!=null&&_vm.addCusMes.email!=''){
          formdata.append('email',_vm.addCusMes.email)
        };
        if(_vm.placeID!=null&&_vm.placeID!=''){
          formdata.append('placeId',_vm.placeID)
        };
        _vm.$axios.post(_vm.url+'/saveCustomer_n',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.$message.success('添加成功');
            _vm.addCus=false;
            _vm.getCusList();
          }else{
            _vm.$message.error(res.data.msg);
          }
        }).catch((err)=>{
          _vm.$message.error('未知错误,请联系管理员');
        })
      }
    },
    disCon(index){//停启用客户
      let formdata=new FormData();
      formdata.append('id',this.cusList[index].id)
      this.$axios.post(this.url+'/updateCustomerState',formdata).then((res)=>{
        if(res.data.code==0){
          this.$message.success('更新状态成功');
          this.getCusList();
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
      })
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.page=val-1;
      this.getCusList();
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
      line-height: 50px;
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
