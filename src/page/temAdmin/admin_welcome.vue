<template lang="html">
  <div class="admin_wel" id="admin_wel">
    <div class="can">
      <Canvas/>
    </div>
    <div class="mask">

    </div>
    <!-- <p class="wel_title">瑞得音信息</p> -->
  </div>
</template>


<script>
import Canvas from '@/components/canvas_wel'
export default {
  components:{
    Canvas
  }
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
  .wel_title{
    position: fixed;
    width: 70%;
    text-align: center;
    color:#eb7a1d;
    font-size: 40px;
    font-weight: bold;
    top:78%;
    left:50%;
    margin-left: -35%;
  }
}

</style>
