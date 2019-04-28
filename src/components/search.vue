<!-- 全局筛选 -->
<template lang="html">
  <div class="search">
    <ul>
      <li>日期范围:&nbsp;&nbsp;
        <el-date-picker
           v-model="value7"
           type="daterange"
           align="right"
           unlink-panels
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期"
           :picker-options="pickerOptions2">
         </el-date-picker></li>
       <li>
         工程师信息:&nbsp;&nbsp;<el-input v-model="engName" placeholder="请输入工程师姓名" style="width:300px;" />
         <el-button type="primary" size="medium" icon="el-icon-search" style="margin-left:25px;" @click="searchEng()">搜索</el-button>
       </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    searchUrl: Object,
    required: true
  },
  data(){
    return{
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7:'',
        engName:null,
        startTime:null,
        endTime:null
    }
  },
  methods:{
    searchEng(){//搜索工程师
      let _vc=this;
      if(_vc.value7.length>=2){
        _vc.startTime=this.value7[0]
        _vc.endTime=this.value7[1]
      }
      let startDate=new Date(_vc.startTime);
      let startYear=startDate.getFullYear();
      let startMonth=startDate.getMonth()+1;
      if(startMonth<10){
        startMonth='0'+startMonth
      }
      let startDay=startDate.getDate();
      if(startDay<10){
        startDay='0'+startDay
      }
      let endData=new Date(_vc.endTime);
      let endYear=endData.getFullYear();
      let endMonth=endData.getMonth()+1;
      if(endMonth<10){
        endMonth='0'+endMonth
      }
      let endDay=endData.getDate();
      if(endDay<10){
        endDay='0'+endDay
      }
      let formdata=new FormData();
      formdata.append('size',10);
      if(_vc.searchUrl.state.length){
        _vc.searchUrl.state.forEach((e)=>{
          formdata.append('states',e);
        })
      }else{
        formdata.append('states',_vc.searchUrl.state);
      };
      if(_vc.searchUrl.isOfficial){
        formdata.append('isOfficial',_vc.searchUrl.isOfficial);
      }
      if(_vc.startTime!=null&&_vc.endTime!=null){
        formdata.append('beginTime',startYear+'-'+startMonth+'-'+startDay);
        formdata.append('endTime',endYear+'-'+endMonth+'-'+endDay);
      }
      if(_vc.engName!=null){
        formdata.append('name',_vc.engName)
      }
      _vc.$axios.post(_vc.url+_vc.searchUrl.url,formdata).then((res)=>{
        if(res.data.code==0){
          let length=0;
          console.log(res)
          res.data.data.content.forEach((e)=>{
            _vc.$set(e,'num',length++);
          });
          _vc.$emit('searchData',res.data.data.content)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: 100%;
  height: 120px;
  ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    li{
      height: 120px;
      line-height: 120px;
      width: 50%;
      color:#666;
    }
    li:first-child{
      width: 45%;
      text-align: right;
      padding-right: 80px;
      box-sizing: border-box;
    }
  }
}
</style>
