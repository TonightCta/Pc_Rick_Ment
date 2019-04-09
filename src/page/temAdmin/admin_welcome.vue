<template lang="html">
  <div class="admin_wel" id="admin_wel">
    <div class="can">
      <Canvas/>
    </div>
    <div class="mask">

    </div>
    <p class="wel_title">瑞得音信息</p>
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
  margin:0 auto;
  z-index: 866;
  .can{
    width: 100%;
    height: 100%;
    // background: linear-gradient(#464646 ,#626669);
    box-sizing: border-box;
    padding-top: 15%;
  }
  .can::-webkit-scrollbar {
        display: none;
    }
  .mask{
    width: 100%;
    height: 1000px;
    position: fixed;
    background: linear-gradient(#464646 ,#626669);
    top:116px;
    // z-index: -1;
  }
  .wel_title{
    position: fixed;
    width: 70%;
    text-align: center;
    color:#eb7a1d;
    font-size: 40px;
    font-weight: bold;
    top:30%;
    left:23%;
  }
}

</style>
