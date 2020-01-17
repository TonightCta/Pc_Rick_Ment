<template>
  <div class="header" ref="header">
    <div class="companyLogo" ref="companyLogo">

    </div>
    <!-- <img src="../../static/img/tab_logo_home_nor.png" alt=""> -->
    <!-- <p style="position:absolute;left:30%;color:red;top:0;">当前环境:<span style="text-decoration:underline;">{{url}}</span></p> -->
    <p class="signMes" ref="signMes">
      欢迎您,
      <el-popover
        placement="bottom"
        width="50"
        trigger="hover">
        <span style="display:inline-block;width:100%;text-align:center;color:#eb7a1d;cursor:pointer;fontSize:14px;text-decoration:underline;" @click="resetPas=true">修改密码</span>
        <span style="color:#eb7a1d;cursor:pointer;"  slot="reference">{{adminName}}</span>
      </el-popover>
      (<span style="color:#eb7a1d;text-decoration: underline;cursor:pointer;" @click="loginOut()">退出登录</span>)
    </p>
    <!-- 修改密码 -->
    <div class="">
      <el-dialog
        title="修改密码"
        :visible.sync="resetPas"
        width="30%">
        <p class="resetPass">&nbsp;&nbsp;&nbsp;<span style="color:red;">*</span>原密码:&nbsp;<el-input type="password" v-model="oldPass" placeholder="请输入旧密码" style="width:240px;"></el-input></p>
        <p class="resetPass">&nbsp;&nbsp;&nbsp;<span style="color:red;">*</span>新密码:&nbsp;<el-input type="password" v-model="newPass" placeholder="请输入新密码" style="width:240px;"></el-input></p>
        <p class="resetPass"><span style="color:red;">*</span>确认密码:&nbsp;<el-input type="password" v-model="turnPass" placeholder="请输入新密码" style="width:240px;"></el-input></p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetPas = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="resetPass()" size="medium">提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return{
      adminName:'Admin',
      resetPas:false,//修改密码
      oldPass:null,//旧密码
      newPass:null,//新密码
      turnPass:null,//确定密码
    }
  },
  mounted(){
    if(window.sessionStorage.getItem('adminMes')){
      let mes=JSON.parse(window.sessionStorage.getItem('adminMes'));
      this.adminName=mes.nickname
    }
  },
  methods:{
    loginOut(){//退出登录
      window.localStorage.clear('adminMes');
      window.localStorage.clear('Uid');
      this.$router.push('/')
    },
    closeHeader(){
      this.$refs.header.style.height='0';
      this.$refs.header.style.boxShadow='0px 0px 0px white';
      this.$refs.companyLogo.style.height='0';
      this.$refs.signMes.style.top='-100px';
    },
    cancelHeader(){
      this.$refs.header.style.height='80px';
      this.$refs.companyLogo.style.height='52px';
      this.$refs.signMes.style.top='10px';
      this.$refs.header.style.boxShadow='0px 0px 5px #999';
    },
    resetPass(){//修改密码
      let formdata=new FormData();
      formdata.append('operatorId',window.sessionStorage.getItem('Uid'))
      if(this.oldPass==null||this.oldPass==''){
        this.$message.error('请输入原密码')
      }else if(this.newPass==null||this.newPass==''){
        this.$message.error('请输入新密码')
      }else if(this.turnPass==null||this.turnPass==''){
        this.$message.error('请输入确认密码')
      }else if(this.turnPass!==this.newPass){
        this.$message.error('两次输入密码不一致')
      }else{
        formdata.append('oldPassword',this.oldPass)
        formdata.append('newPassword',this.turnPass)
        this.$axios.post(this.url+"/updatePassword_n",formdata).then((res)=>{
          if(res.data.code==0){
            this.$message.success('修改成功,下次登录时生效');
            this.resetPas=false;
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.$message.error('未知错误,请联系管理员')
        })
      };
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header{
  width: 100%;
  min-width: 1300px;
  height: 80px;
  box-shadow: 0px 0px 5px #999;
  position: absolute;
  top:0;
  left:0;
  line-height: 80px;
  padding-top: 12px;
  box-sizing: border-box;
  transition: .5s all;
  .companyLogo{
    width: 335px;
    height: 52px;
    background: url('../../static/img/tab_logo_home_nor.png');
    background-size: 100% 100%;
    margin-left: 20px;
    transition: .5s all;
  }
  .signMes{
    position: absolute;
    right:150px;
    transition: .5s all;
    top:10px;
  }
  .resetPass{
    line-height: 60px;
    text-align: center;
  }
}
</style>
