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
      page:0
    }
  },
  methods:{
    refresh(){
      let _vc=this;
      console.log(_vc.reloadData)
      let formdata=new FormData();
      formdata.append('size',10);
      let condition=typeof(_vc.reloadData.state);
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
      formdata.append('page',_vc.page);
      _vc.$axios.post(_vc.url+_vc.reloadData.url,formdata).then((res)=>{
        console.log(res);
        if(res.data.code==0){
          _vc.length=_vc.page*10;
          res.data.data.content.forEach((e)=>{
            _vc.$set(e,'num',_vc.length++);
          });
          console.log(res.data.data.content)
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
