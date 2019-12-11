<!-- 登录 -->
<template lang="html">
  <div class="login" ref="login_sub">
    <div class="con_bg">
      <img src="../../static/img/login_bg.png" alt="">
      <div class="login_con">
        <el-row>
          <el-col :span="6">
            <div class="login_title">
              <ul>
                <li>登录名:</li>
                <li>密码:</li>
              </ul>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="login_input">
              <ul>
                <li>
                  <el-input placeholder="请输入用户名" type="text" v-model="userName" size="medium"></el-input>
                </li>
                <li>
                  <el-input placeholder="请输入密码" type="password" v-model="userPass" @keyup.delete.native="delPass" size="medium"></el-input>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <p class="login_sub">
          <el-button type="primary" style="fontSize:16px;margin-left:40px;" size="mini" :disabled="disabled" @click="loginSub()">&nbsp;&nbsp;登录&nbsp;&nbsp;</el-button>
          <el-button type="primary" style="fontSize:16px;" size="mini" @click="registerBox=true">&nbsp;&nbsp;注册&nbsp;&nbsp;</el-button>
        </p>
      </div>
    </div>
    <div class="register_box">
      <el-dialog
        title="注册"
        :visible.sync="registerBox"
        width="45%">
        <p class="register_title">*提示:&nbsp;此注册为【外部工程师】注册，如果公司内部员工请联系主管领导注册账号。</p>
        <div class="register_con">
          <ul class="con_title">
            <li>账户类型:</li>
            <li>姓名/企业名称:</li>
            <li>手机号:</li>
            <li>密码:</li>
            <li>确认密码:</li>
            <li>邀请码（选填）:</li>
          </ul>
          <ul class="con_mes">
            <li>
              <el-radio v-model="isCompany" label="1">个人</el-radio>
              <el-radio v-model="isCompany" label="2">企业</el-radio>
            </li>
            <li><el-input type="primary" v-model="registerMes.name" style="width:400px;" size="medium" placeholder="请输入姓名或企业名称"></el-input></li>
            <li><el-input type="primary" v-model="registerMes.phone" style="width:400px;" size="medium" placeholder="请输入手机号"></el-input></li>
            <li><el-input type="password" v-model="registerMes.pass" style="width:400px;" size="medium" placeholder="请输入密码"></el-input></li>
            <li><el-input type="password" v-model="registerMes.turnPass" style="width:400px;" size="medium" placeholder="请再次输入密码"></el-input></li>
            <li><el-input type="primary" v-model="registerMes.code" style="width:400px;" size="medium" placeholder="请输入邀请码(选填)"></el-input></li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="registerBox = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="subRes()" medium>注&nbsp;册</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userName:'',//登录名
      userPass:'',//密码
      disabled:true,//是否禁用登录按钮
      registerBox:false,//注册窗口
      isCompany:'1',//是否为公司账户
      registerMes:{
        name:null,//名称
        phone:null,//手机号
        pass:null,//密码
        turnPass:null,//确认密码
        code:null,//邀请码
      }
    }
  },
  watch:{
    userName(val,oldVal){
      if(val!==''&&this.userPass!==''){
        this.disabled=false;
      }else{
        this.disabled=true;
      }
    },
    userPass(val,oldVal){
      if(val!=''&&this.userName!==''){
        this.disabled=false;
      }else{
        this.disabled=true;
      }
    }
  },
  created(){
    let _vc=this;
    document.onkeydown = function(e) {
         let key = window.event.keyCode;
         if (key == 13) {
             _vc.loginSub();
         }
     };
  },
  beforeRouteLeave(to,from,next){
    document.onkeydown = undefined;
    next()
  },
  methods:{
    loginSub(){
      let _vm=this;
      if(_vm.userName==''){
        _vm.$message.error('请输入用户名')
      }else if(_vm.userPass==''){
        _vm.$message.error('请输入密码')
      }else{
        let formdata=new FormData();
        formdata.append('name',_vm.userName);
        formdata.append('password',_vm.userPass);
        _vm.$axios.post(_vm.url+'/login',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.$message({
             message: '登陆成功',
             type: 'success'
           });
           window.sessionStorage.setItem('adminMes',JSON.stringify(res.data.data));
           _vm.$router.push('/admin')
           window.sessionStorage.setItem('Uid',res.data.data.id);
           if(res.data.data.engineerVO!=null){
             window.sessionStorage.setItem('engID',res.data.data.engineerVO.id);
           }
         }else{
           _vm.$message.error(res.data.msg)
         }
       }).catch((err)=>{
         _vm.$message.error('未知错误,请联系管理员');
         console.log(err)
       })
      }
    },
    delPass(){//键盘删除事件
      this.userPass=''
    },
    subRes(){//注册
      let _vm=this;
      let formdata=new FormData();
      if(_vm.registerMes.name==null||_vm.registerMes.name==''){
        _vm.$message.error('请输入姓名或企业名称')
      }else if(_vm.registerMes.phone==null||_vm.registerMes.phone==''){
        _vm.$message.error('请输入手机号')
      }else if(_vm.registerMes.pass==null||_vm.registerMes.pass==''){
        _vm.$message.error('请输入密码')
      }else if(_vm.registerMes.turnPass==null||_vm.registerMes.turnPass==''){
        _vm.$message.error('请再次输入秘密')
      }else if(_vm.registerMes.pass!==_vm.registerMes.turnPass){
        _vm.$message.error('两次输入密码不一致')
      }else{
        if(this.isCompany==1){
          formdata.append('isCompany',false)
        }else{
          formdata.append('isCompany',true)
        }
        formdata.append('name',_vm.registerMes.name);
        formdata.append('phone',_vm.registerMes.phone);
        formdata.append('username',_vm.registerMes.phone);
        formdata.append('password',_vm.registerMes.turnPass);
        if(_vm.registerMes.code!=null&&_vm.registerMes.code!=''){
          formdata.append('recommendCode',_vm.registerMes.code)
        };
        _vm.$axios.post(_vm.url+'/saveExternalEngineer',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.$message({
             message: '注册成功',
             type: 'success'
           });
           window.sessionStorage.setItem('adminMes',JSON.stringify(res.data.data));
           _vm.$router.push('/admin')
           window.localStorage.setItem('Uid',res.data.data.id);
           if(res.data.data.engineerVO!=null){
             window.localStorage.setItem('engID',res.data.data.engineerVO.id);
           }
         }else{
           _vm.$message.error(res.data.msg)
         }
        }).catch((err)=>{
          _vm.$message.error('未知错误,请联系管理员');
          console.log(err)
        })
      };
    },
  }
}
</script>

<style lang="scss" scoped>
.login{
  width:100%;
  height: 100vh;
  background: #313131;
  padding-top: 10%;
  @media screen and (max-width: 1920px){
    padding-top: 6%;
  }
  .con_bg{
    width: 75%;
    margin:0 auto;
    position: relative;
    img{
      width: 100%;
      @media screen and (min-width: 2560px){
        height: 450px;
      }
      @media screen and (min-width: 1920px){
        height: 500px;
      }
    }
    .login_con{
      width: 25%;
      height: 50%;
      position: absolute;
      top:51%;
      left:55%;
      border-radius:12px;
      box-sizing: border-box;
      padding-top: 20px;
      color:white;
      @media screen and (max-width: 1920px){
        top:56%;
      }
      .login_sub{
        width: 100%;
        text-align: center;
        box-sizing: border-box;
      }
      .login_title{
        ul{
          li{
            line-height: 50px;
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: right;
            padding-right: 12px;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
      .login_input{
        ul{
          li{
            line-height: 49px;
            margin-top: 10px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .register_box{
    .register_title{
      width: 100%;
      font-size: 16px;
      text-align: center;
      color:red;
    }
    .register_con{
      margin-top: 15px;
      width: 90%;
      display: flex;
      .con_title{
        width: 30%;
        li{
          line-height: 60px;
          text-align: right;
        }
      }
      .con_mes{
        line-height: 60px;
        box-sizing: border-box;
        padding-left: 15px;
      }
    }
  }
}
</style>
