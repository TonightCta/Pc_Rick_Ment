<!-- 地点选择 -->
<template lang="html">
  <div class="placeCom">
    <p style="width:200px;">
      <el-select v-model="placeProName" @change="chosePro">
        <el-option
        v-for="(placePro,index) in placeList"
        :key="'Pro'+index"
        :label="placePro.name"
        :value="placePro.name"
        >
        </el-option>
      </el-select>
    </p>
    <p style="width:200px;">
      <el-select v-model="placeCityName" @change="choseCity">
        <el-option
        v-for="(placePro,index) in cityList"
        :key="'City'+index"
        :label="placePro.name"
        :value="placePro.name"
        >
        </el-option>
      </el-select>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      placeProName:null,//省级名称
      placeCityName:null,//市级名称
      placeList:[],//省级列表
      cityList:[],//城市列表
    }
  },
  mounted(){
    let _vm=this;
    _vm.$axios.get(_vm.url+'/mobile/getUsingPlaceList').then((res)=>{
      if(res.data.code==0){
        console.log(res)
        _vm.placeList=res.data.data.placeList
      }else{
        _vm.pushOrder=false;
        _vm.$message.error(res.data.msg);
      }
    }).catch((err)=>{
      _vm.pushOrder=false;
      _vm.$message.error('未知错误,请联系管理员')
    })
  },
  methods:{
    chosePro(index){//选择省
      this.placeCityName=''
      this.placeList.forEach((e)=>{
        if(index===e.name){
          this.cityList=e.usingChildList
        }
      })
    },
    choseCity(index){//选择市
      let _vm=this;
      this.cityList.forEach((e)=>{
        if(index===e.name){
          _vm.$emit('getPlace',e.id);
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.placeCom{
  display: flex!important;
  p{
    width: 200px;
  }
}
</style>
