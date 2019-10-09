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
      };
      if(_vc.reloadData.isCompany){
        formdata.append('isCompany',_vc.reloadData.isCompany);
      }
      if(window.sessionStorage.getItem('eName')){
        if(window.sessionStorage.getItem('eName')!=null&&window.sessionStorage.getItem('eName')!=''){
          formdata.append('name',window.sessionStorage.getItem('eName'))
        }
      };
      if(window.sessionStorage.getItem('beginTime')){
        formdata.append('beginTime',window.sessionStorage.getItem('beginTime'));
        formdata.append('endTime',window.sessionStorage.getItem('endTime'));
      }
      formdata.append('page',_vc.page);
      _vc.$axios.post(_vc.url+_vc.reloadData.url,formdata).then((res)=>{
        if(res.data.code==0){
          _vc.length=_vc.page*10;
          res.data.data.content.forEach((e)=>{
            _vc.$set(e,'num',_vc.length++);
          });
          _vc.$emit('reloadList',res.data.data.content)
        }else{
          _vc.$message.error(res.data.msg )
        }
      }).catch((err)=>{
        _vc.$message.error('未知错误,请联系管理员')
        // console.log(err)
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
