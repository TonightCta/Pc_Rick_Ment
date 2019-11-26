<!-- 操作人员管理 -->
<template lang="html">
  <div class="operman_admin">
    <div class="oper_search" ref="query_search">
      <div class="" v-if="searchList">
        <p>
          <span>
            登录名:&nbsp;<el-input type="primary" size="medium" style="width:300px;" placeholder="请输入登录名" v-model="searchMes.name"></el-input>
          </span>
          <span>
            手机号:&nbsp;<el-input type="number" size="medium" style="width:300px;" placeholder="请输入手机号" v-model="searchMes.phone"></el-input>
          </span>
        </p>
        <p>
          <span>
            &nbsp;&nbsp;&nbsp;邮箱:&nbsp;<el-input type="primary" size="medium" style="width:300px;" placeholder="请输入邮箱" v-model="searchMes.email"></el-input>
          </span>
          <span>
            &nbsp;&nbsp;&nbsp;昵称:&nbsp;<el-input type="primary" size="medium" style="width:300px;" placeholder="请输入昵称" v-model="searchMes.nickName"></el-input>
          </span>
        </p>
        <div style="width:100%;text-align:center;">
          <el-button size="medium" @click="getOperList()">取消筛选</el-button>
          <el-button type="primary" size="medium" icon="el-icon-search" @click="sunSearch()">筛选</el-button>
        </div>
      </div>
      <el-tooltip class="item" effect="dark" :content="closeText" placement="bottom">
        <p class="add" @click="searchSwitch" ref="add">
          <img :src="operClose" alt="">
        </p>
      </el-tooltip>
    </div>
    <p class="operman_titleOper">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="addOperMan=true;">添加操作人员</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <i class="el-icon-refresh" @click="getOperList()"></i>
    </p>
    <div class="" style="minHeight:550px;width:98%;margin:0 auto;">
      <el-row>
        <el-col :span="2"><div class="operman_title">序号</div></el-col>
        <el-col :span="3"><div class="operman_title">登录名</div></el-col>
        <el-col :span="3"><div class="operman_title">昵称</div></el-col>
        <el-col :span="3"><div class="operman_title">手机</div></el-col>
        <el-col :span="3"><div class="operman_title">邮箱</div></el-col>
        <el-col :span="3"><div class="operman_title">角色</div></el-col>
        <el-col :span="3"><div class="operman_title">创建时间</div></el-col>
        <el-col :span="2"><div class="operman_title">状态</div></el-col>
        <el-col :span="2"><div class="operman_title">操作</div></el-col>
      </el-row>
      <div class="" v-loading="operLoad" style="minHeight:500px;">
        <el-row class="operTwo publicHover" v-for="(operman,index) in opermanList" :key="'Operman'+index">
          <el-col :span="2"><div class="operman_mes">{{operman.num+1}}</div></el-col>
          <el-tooltip class="item" effect="dark" :content="operman.name" placement="bottom">
            <el-col :span="3"><div class="operman_mes" style="cursor:pointer;">{{operman.name.substring(0,10)}}...</div></el-col>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="operman.nickname" placement="bottom">
            <el-col :span="3"><div class="operman_mes" style="cursor:pointer;">{{operman.nickname.substring(0,10)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="3" v-if="operman.mobile!=null&&operman.mobile!=''"><div class="operman_mes">{{operman.mobile}}</div></el-col>
          <el-col :span="3" v-else><div class="operman_mes">-</div></el-col>
          <el-col :span="3" v-if="operman.email!=null&&operman.email!=''"><div class="operman_mes">{{operman.email}}</div></el-col>
          <el-col :span="3" v-else><div class="operman_mes">-</div></el-col>
          <el-col :span="3" v-if="operman.roleName!=null&&operman.roleName!=''"><div class="operman_mes">{{operman.roleName}}</div></el-col>
          <el-col :span="3" v-else><div class="operman_mes">-</div></el-col>
          <el-col :span="3"><div class="operman_mes">{{operman.createTime}}</div></el-col>
          <el-col :span="2"><div class="operman_mes">
            <span v-if="operman.state==2" style="background:green;border-radius:8px;color:white;padding:3px;fontSize:12px;">已启用</span>
            <span v-else style="background:red;border-radius:8px;color:white;padding:3px;fontSize:12px;">已停用</span>
          </div></el-col>
          <el-col :span="2"><div class="operman_mes">
            <el-tooltip class="item" effect="dark" content="停用操作人员" placement="bottom" v-if="operman.state==2">
              <i class="el-icon-remove-outline" ></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="启用操作人员" placement="bottom" v-else>
              <i class="el-icon-circle-check" style="color:#eb7a1d;"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑操作人员" placement="bottom">
              <i class="el-icon-edit" style="color:#eb7a1d;marginLeft:5px;marginRight:5px;" @click="editOper(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="重置密码" placement="bottom">
              <i class="el-icon-s-tools" @click="resetPass(index)"></i>
            </el-tooltip>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 分页器 -->
    <p class="operman_page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :total="pageNum">
      </el-pagination>
    </p>
    <!-- 添加操作人员 -->
    <div class="">
      <el-dialog
        title="添加操作人员"
        :visible.sync="addOperMan"
        width="40%">
        <div class="" style="display:flex;width:90%;margin:0 auto;height:350px;overflow:auto;">
          <ul class="operManTitle">
            <li><span style="color:red;">*</span>登录名:</li>
            <li><span style="color:red;">*</span>昵称:</li>
            <li><span style="color:red;">*</span>密码:</li>
            <li><span style="color:red;">*</span>确认密码:</li>
            <li><span style="color:red;">*</span>手机:</li>
            <li><span style="color:red;">*</span>邮箱:</li>
            <li><span style="color:red;">*</span>角色:</li>
          </ul>
          <ul class="operManCon">
            <li><el-input type="primary" style="width:350px;" placeholder="请输入登录名" v-model="addOperMes.loginName"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入昵称" v-model="addOperMes.nickName"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入密码" v-model="addOperMes.passWord"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请再次输入密码" v-model="addOperMes.turnPass"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入手机号" v-model="addOperMes.phone"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入邮箱地址" v-model="addOperMes.email"></el-input></li>
            <li>
              <el-select v-model="value" placeholder="请选择角色">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addOperMan = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="addOperMan = false" size="medium">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑操作人员 -->
    <div class="">
      <el-dialog
        title="添加操作人员"
        :visible.sync="editOperMan"
        width="40%">
        <div class="" style="display:flex;width:90%;margin:0 auto;">
          <ul class="operManTitle">
            <li><span style="color:red;">*</span>登录名:</li>
            <li><span style="color:red;">*</span>昵称:</li>
            <li><span style="color:red;">*</span>手机:</li>
            <li><span style="color:red;">*</span>邮箱:</li>
            <li><span style="color:red;">*</span>角色:</li>
          </ul>
          <ul class="operManCon">
            <li><el-input type="primary" style="width:350px;" placeholder="请输入登录名" v-model="editOperMes.loginName"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入昵称" v-model="editOperMes.nickName"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入手机号" v-model="editOperMes.phone"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入邮箱地址" v-model="editOperMes.email"></el-input></li>
            <li>
              <el-select v-model="value" placeholder="请选择角色">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editOperMan = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="editOperMan = false" size="medium">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{


      options: [{
               value: '选项1',
               label: '黄金糕'
             }, {
               value: '选项2',
               label: '双皮奶'
             }, {
               value: '选项3',
               label: '蚵仔煎'
             }, {
               value: '选项4',
               label: '龙须面'
             }, {
               value: '选项5',
               label: '北京烤鸭'
             }],
             value: '',


      // -------------------
      searchMes:{//搜索信息集合
        name:null,//登录名
        phone:null,//手机号
        email:null,//邮箱
        nickName:null,//昵称
      },
      closeText:'收起筛选',
      searchList:true,//闭合搜索
      operClose:'./static/img/close_search.png',
      dataLength:88,//数据条数
      opermanList:[],
      pageNum:10,//总页数
      page:0,//页码
      length:0,//数据排序
      currentPage3:1,//分页器类型
      addOperMan:false,//添加操作人员
      addOperMes:{
        loginName:null,//登录名
        nickName:null,//昵称
        passWord:null,//密码
        turnPass:null,//确认密码
        phone:null,//手机号
        email:null,//邮箱
        roleID:null,//角色ID
      },
      editOperMan:false,//编辑操作人员
      editOperMes:{
        loginName:null,//登录名
        nickName:null,//昵称
        phone:null,//手机号
        email:null,//邮箱
        roleID:null,//角色ID
      },
      operLoad:false,//加载动画
    }
  },
  created(){
    this.getOperList()
  },
  methods:{
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.page=val-1;
      this.getOperList()
    },
    editOper(index){//编辑工程师
      this.editOperMes.loginName=this.opermanList[index].loginName;
      this.editOperMes.nickName=this.opermanList[index].nickName;
      this.editOperMes.phone=this.opermanList[index].phone;
      this.editOperMes.email=this.opermanList[index].email;
      this.editOperMan=true;
    },
    getOperList(){//获取账号列表
      let _vm=this;
      _vm.searchMes={
        name:null,//登录名
        phone:null,//手机号
        email:null,//邮箱
        nickName:null,//昵称
      }
      _vm.operLoad=true;
      let formdata=new FormData();
      formdata.append('page',_vm.page)
      _vm.$axios.post(_vm.url+'/findOperatorListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.dataLength=res.data.data.totalElements;
          _vm.pageNum=res.data.data.totalPages*10;
          _vm.length=_vm.page*10;
          res.data.data.content.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++)
          })
          _vm.opermanList=res.data.data.content;
          _vm.operLoad=false;
        }else{
          _vm.operLoad=false;
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.operLoad=false;
        // console.log(err)
        _vm.$message.error('未知错误,请联系管理员')
      })
    },
    searchSwitch(){//闭合搜索
      if(this.closeText==='收起筛选'){
        this.closeText='展开筛选';
        this.$refs.query_search.style.height="10px";
        this.operClose='./static/img/open_search.png';
        this.$refs.add.style.bottom='-20px'
        setTimeout(()=>{
          this.searchList=false;
        },50)
      }else{
        this.closeText='收起筛选';
        this.$refs.query_search.style.height="220px";
        this.operClose='./static/img/close_search.png';
        this.$refs.add.style.bottom='0'
        setTimeout(()=>{
          this.searchList=true;
        },200)
      };
    },
    sunSearch(){//筛选数据
      let _vm=this;
      let formdata=new FormData();
      if(_vm.searchMes.name!=null&&_vm.searchMes.name!=''){
        formdata.append('name',_vm.searchMes.name)
      }
      if(_vm.searchMes.phone!=null&&_vm.searchMes.phone!=''){
        formdata.append('mobile',_vm.searchMes.phone)
      }
      if(_vm.searchMes.email!=null&&_vm.searchMes.email!=''){
        formdata.append('email',_vm.searchMes.email)
      }
      if(_vm.searchMes.nickName!=null&&_vm.searchMes.nickName!=''){
        formdata.append('nickName',_vm.searchMes.nickName)
      }
      _vm.operLoad=true;
      _vm.$axios.post(_vm.url+'/findOperatorListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.dataLength=res.data.data.totalElements;
          _vm.pageNum=res.data.data.totalPages*10;
          _vm.length=_vm.page*10;
          res.data.data.content.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++)
          })
          _vm.opermanList=res.data.data.content;
          _vm.operLoad=false;
        }else{
          _vm.operLoad=false;
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.operLoad=false;
        // console.log(err)
        _vm.$message.error('未知错误,请联系管理员')
      })
    },
    resetPass(index){
        this.$confirm('此操作将重置该账号的密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '重置成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
      }
  }
}
</script>

<style lang="scss" scoped>
.operman_admin{
  width: 100%;
  margin:0 auto;
  height: 100%;
  overflow-x: hidden;
  .oper_search{
    width: 70%;
    height: 220px;
    margin:0 auto;
    border-bottom:1px solid #eee;
    position: relative;
    transition: .5s all;
    p{
      width: 100%;
      display: flex;
      line-height: 70px;
      span{
        display: inline-block;
        width: 50%;
        text-align: center;
      }
    }
    .add{
      width: 80px;
      height: 20px;
      position: absolute;
      bottom:0;
      left:50%;
      margin-left: -40px;
      cursor:pointer;
      transition: .5s all;
      img{
        width: 100%;
        height: 100%;
        opacity: 1;
      }
    }
  }
  .operman_titleOper{
    width: 98%;
    margin:0 auto;
    margin-top: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    position: relative;
    .dataLength{
      display: inline-block;
      width: 85%;
      text-align: right;
      box-sizing: border-box;
      padding-right: 50px;
    }
    i{
      font-size: 32px;
      color:#eb7a1d;
      cursor:pointer;
      position: absolute;
      right:32px;
      top:0;
    }
  }
  .operman_title{
    line-height: 40px;
    text-align: center;
    background: #eb7a1d;
    color:white;
  }
  .operman_mes{
    text-align: center;
    font-size: 13px;
    line-height: 50px;
    i{
      font-size: 20px;
      cursor: pointer;
    }
  }
  .operTwo:nth-of-type(even){
    background:#eee;
  }
  .operman_page{
    width: 98%;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .operManTitle{
    width: 20%;
    li{
      line-height: 50px;
      text-align: right;
      box-sizing: border-box;
      padding-right: 10px;
    }
  }
  .operManCon{
    width: 80%;
    li{
      line-height: 50px;
    }
  }
}
</style>
