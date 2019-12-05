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
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="pushOperMan()">添加操作人员</el-button>
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
              <i class="el-icon-remove-outline" @click="stopMan(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="启用操作人员" placement="bottom" v-else>
              <i class="el-icon-circle-check" style="color:#eb7a1d;" @click="stopMan(index)"></i>
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
        <div class="" style="display:flex;width:90%;margin:0 auto;height:400px;overflow:auto;">
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
            <li><el-input type="password" style="width:350px;" placeholder="请输入密码" v-model="addOperMes.passWord"></el-input></li>
            <li><el-input type="password" style="width:350px;" placeholder="请再次输入密码" v-model="addOperMes.turnPass"></el-input></li>
            <li><el-input type="number" style="width:350px;" placeholder="请输入手机号" v-model="addOperMes.phone"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入邮箱地址" v-model="addOperMes.email"></el-input></li>
            <li>
              <el-select v-model="addOperMes.operTypeText" placeholder="请选择角色">
                <el-option
                  v-for="item in operType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addOperMan = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="subOper()" size="medium">提&nbsp;交</el-button>
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
              <el-select v-model="editOperMes.operTypeText" placeholder="请选择角色">
                <el-option
                  v-for="item in operType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editOperMan = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="subEditMan()" size="medium">提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      operType:[],//操作人员类型集合
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
      opermanList:[],//账号列表
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
        operTypeText:null,//操作人员类型文本
      },
      editOperMan:false,//编辑操作人员
      editOperMes:{
        loginName:null,//登录名
        nickName:null,//昵称
        phone:null,//手机号
        email:null,//邮箱
        operTypeText:null,//角色类型
        operID:null,//操作人员ID
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
      let _vm=this;
      _vm.$axios.get(_vm.url+'/getUsingRoleList').then((res)=>{
        if(res.data.code==0){
          _vm.operType=res.data.data;
          _vm.editOperMes.loginName=_vm.opermanList[index].name;
          _vm.editOperMes.nickName=_vm.opermanList[index].nickname;
          _vm.editOperMes.phone=_vm.opermanList[index].mobile;
          _vm.editOperMes.email=_vm.opermanList[index].email;
          _vm.editOperMes.operTypeText=_vm.opermanList[index].roleId;
          _vm.editOperMes.operID=_vm.opermanList[index].id;
          _vm.editOperMan=true;
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
      })

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
    /**
     *时间:2019/11/29
     *人员:崔田
     */
    stopMan(index){//停启用账号
      let formdata=new FormData();
      formdata.append('operatorId',this.opermanList[index].id);
      this.$axios.post(this.url+'/updateOperatorState',formdata).then((res)=>{
        if(res.data.code==0){
          this.$message.success('更新账号状态成功')
          this.getOperList()
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
      })
    },
    resetPass(index){//重置密码
      let _vm=this;
        _vm.$confirm('此操作将重置该账号的密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let formdata=new FormData();
          formdata.append('id',_vm.opermanList[index].id);
          _vm.$axios.post(_vm.url+'/resetPassword',formdata).then((res)=>{
            if(res.data.code==0){
              _vm.$message.success('重置密码成功')
            }else{
              _vm.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            _vm.$message.error('未知错误,请联系管理员')
          })
        });
    },
    pushOperMan(){//添加操作人员
      this.$axios.get(this.url+'/getUsingRoleList').then((res)=>{
        if(res.data.code==0){
          this.operType=res.data.data;
          this.addOperMan=true;
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
      })
    },
    subOper(){//提交操作人员
      let _vm=this;
      let formdata=new FormData();
      if(_vm.addOperMes.loginName==null||_vm.addOperMes.loginName==''){
        _vm.$message.error('请输入登录名')
      }else if(_vm.addOperMes.nickName==null||_vm.addOperMes.nickName==''){
        _vm.$message.error('请输入昵称')
      }else if(_vm.addOperMes.passWord==null||_vm.addOperMes.passWord==''){
        _vm.$message.error('请输入密码')
      }else if(_vm.addOperMes.turnPass==null||_vm.addOperMes.turnPass==''){
        _vm.$message.error('请再次输入密码')
      }else if(_vm.addOperMes.passWord!==_vm.addOperMes.turnPass){
        _vm.$message.error('两次输入密码不一致')
      }else if(_vm.addOperMes.phone==null||_vm.addOperMes.phone==''){
        _vm.$message.error('请输入手机号')
      }else if(_vm.addOperMes.phone.length!=11){
        _vm.$message.error('请输入正确的手机号')
      }else if(_vm.addOperMes.email==null||_vm.addOperMes.email==''){
        _vm.$message.error('请输入邮箱账号')
      }else if(_vm.addOperMes.operTypeText==null||_vm.addOperMes.operTypeText==''){
        _vm.$message.error('请选择角色类型')
      }else{
        formdata.append('name',_vm.addOperMes.loginName)
        formdata.append('nickname',_vm.addOperMes.nickName)
        formdata.append('password',_vm.addOperMes.turnPass)
        formdata.append('email',_vm.addOperMes.email)
        formdata.append('mobile',_vm.addOperMes.phone)
        formdata.append('roleId',_vm.addOperMes.operTypeText)
        formdata.append('creatorId',window.sessionStorage.getItem('Uid'));
        _vm.$axios.post(_vm.url+'/saveOperator_n',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.$message.success('创建角色成功');
            _vm.getOperList();
            _vm.addOperMan=false;
          }else{
            _vm.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          _vm.$message.error('未知错误,请联系管理员');
        })
      }
    },
    subEditMan(){//编辑人员提交
      let _vm=this;
      let formdata=new FormData();
      if(_vm.editOperMes.loginName==null||_vm.editOperMes.loginName==''){
        _vm.$message.error('请输入登录名')
      }else if(_vm.editOperMes.nickName==null||_vm.editOperMes.nickName==''){
        _vm.$message.error('请输入昵称')
      }else if(_vm.editOperMes.phone==null||_vm.editOperMes.phone==''){
        _vm.$message.error('请输入手机号')
      }else if(_vm.editOperMes.phone.length!=11){
        _vm.$message.error('请输入正确的手机号')
      }else if(_vm.editOperMes.email==null||_vm.editOperMes.email==''){
        _vm.$message.error('请输入邮箱账号')
      }else if(_vm.editOperMes.operTypeText==null||_vm.editOperMes.operTypeText==''){
        _vm.$message.error('请选择角色类型')
      }else{
        formdata.append('name',_vm.editOperMes.loginName)
        formdata.append('nickname',_vm.editOperMes.nickName)
        formdata.append('id',_vm.editOperMes.operID)
        formdata.append('email',_vm.editOperMes.email)
        formdata.append('mobile',_vm.editOperMes.phone)
        formdata.append('roleId',_vm.editOperMes.operTypeText)
        formdata.append('creatorId',window.sessionStorage.getItem('Uid'));
        _vm.$axios.post(_vm.url+'/saveOperator_n',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.$message.success('编辑角色角色成功');
            _vm.getOperList();
            _vm.editOperMan=false;
          }else{
            _vm.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          _vm.$message.error('未知错误,请联系管理员');
        })
      }
    },
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
