<template lang="html">
  <div class="admin_wel" id="admin_wel">
    <div class="can">
      <img src="../../../static/img/rick_logo.png" alt="">
    </div>
    <p class="wel_title">瑞得音信息</p>
  </div>
</template>


<script>
export default {
}
</script>

<style lang="scss" scoped>
.admin_wel{
  z-index: 866;
  width: 100%;
  margin:0 auto;
  height: 110%;
  position: relative;
  overflow-x: hidden;
  background: url('../../../static/img/login_bg_2.png');
  background-size: 100% 100%;
  .can{
    width: 20%;
    margin: 0 auto;
    padding-top: 5%;
    img{
      width: 100%;
    }
  }
  .wel_title{
    width: 100%;
    color:#eb7a1d;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  }
}

</style>
