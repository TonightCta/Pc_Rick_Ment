<template lang="html">
  <div class="reload_icon">
    <p class="admin_reload">
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
        <i class="el-icon-refresh" @click="refresh()"></i>
      </el-tooltip>
    </p>
  </div>
</template>

<script>
export default {
  props:{
    reloadData:Object,
    required:true,
  },
  data(){
    return{
      lenth:0,
      page:10
    }
  },
  methods:{
    refresh(){
      let _vc=this;
      let formdata=new FormData();
      formdata.append('size',10);
      if(_vc.reloadData.state.length){
        _vc.reloadData.state.forEach((e)=>{
          formdata.append('states',e);
        })
      }else{
        formdata.append('states',_vc.reloadData.state);
      };
      if(_vc.reloadData.isOfficial){
        formdata.append('isOfficial',_vc.reloadData.isOfficial);
      }
      if(_vc.engName!=null){
        formdata.append('name',_vc.engName)
      }
      _vc.$axios.post(_vc.url+_vc.reloadData.url,formdata).then((res)=>{
        if(res.data.code==0){
          console.log(res)
          _vc.length=_vc.page*10;
          res.data.data.content.forEach((e)=>{
            _vc.$set(e,'num',_vc.length++);
          });
          _vc.$emit('reloadList',res.data.data.content)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.admin_reload{
  position: absolute;
  top:124px;
  right:30px;
  i{
    font-size: 32px;
    color:#eb7a1d;
    cursor:pointer;
  }
}
</style>
