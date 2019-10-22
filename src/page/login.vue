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
          <el-button type="primary" style="fontSize:16px;" size="mini" :disabled="disabled" @click="loginSub()">&nbsp;&nbsp;登录&nbsp;&nbsp;</el-button>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      userName:'',//登录名
      userPass:'',//密码
      disabled:true
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
           window.localStorage.setItem('Uid',res.data.data.id);
           if(res.data.data.engineerVO!=null){
             window.localStorage.setItem('engID',res.data.data.engineerVO.id);
           }
         }else{
           _vm.$message.error(res.data.msg)
         }
       }).catch((err)=>{
         _vm.$message.error('未知错误,请联系管理员');
       })
      }
    },
    delPass(){//键盘删除事件
      this.userPass=''
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
  .con_bg{
    width: 75%;
    margin:0 auto;
    position: relative;
    img{
      width: 100%;
      height: 400px;
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
}
</style>
