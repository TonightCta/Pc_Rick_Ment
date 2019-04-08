<template>
  <div class="header">
    <div class="companyLogo">

    </div>
    <!-- <img src="../../static/img/tab_logo_home_nor.png" alt=""> -->
    <p class="signMes">
      欢迎您,
      <span style="color:#eb7a1d;cursor:pointer;">{{adminName}}</span>,
      (<span style="color:#eb7a1d;text-decoration: underline;cursor:pointer;" @click="loginOut()">退出登录</span>)
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return{
      adminName:'Admin'
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
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header{
  width: 100%;
  height: 80px;
  box-shadow: 0px 0px 5px #999;
  position: absolute;
  top:0;
  left:0;
  line-height: 80px;
  padding-top: 12px;
  box-sizing: border-box;
  .companyLogo{
    width: 335px;
    height: 52px;
    background: url('../../static/img/tab_logo_home_nor.png');
    background-size: 100% 100%;
    margin-left: 20px;
  }
  .signMes{
    position: absolute;
    right:150px;
    top:10px;
  }
}
</style>
