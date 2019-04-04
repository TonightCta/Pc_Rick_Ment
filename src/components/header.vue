<template>
  <div class="header">
    <img src="../../static/img/tab_logo_home_nor.png" alt="">
    <p class="signMes">
      欢迎您,
      <span style="color:#eb7a1d;cursor:pointer;">{{adminName}}</span>,
      (<span style="color:#eb7a1d;text-decoration: underline;cursor:pointer;">退出登录</span>)
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return{
      adminName:'Admin'
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
  .signMes{
    position: absolute;
    right:150px;
    top:10px;
  }
}
</style>
