<!-- 项目进度查询 -->
<template lang="html">
  <div class="gress_project">
    <p>
      <el-date-picker
         v-model="value7"
         type="daterange"
         align="right"
         unlink-panels
         range-separator="至"
         start-placeholder="开始日期"
         end-placeholder="结束日期"
         @blur="chanceTime"
         :picker-options="pickerOptions2">
       </el-date-picker>
    </p>
    <div class="" style="display:flex;overflow:hidden;">
      <div class="gress_left" ref="gress_left" id="gress_left">

      </div>
      <div class="gress_right" ref="gress_right" id="gress_right" :style="{width: '300px', height: '300px'}">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      value7:null,
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
      leftTitle:[],//饼标题
      leftCon:[],//饼内容
      left_option:{

      },
      right_option:{
        tooltip: {},
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data:['5','20','36','10','10','20'],
          itemStyle:{
            color:'rgba(235,122,29,.7)'
          },
          animationType: 'scale', //初始动画效果，scale是缩放，expansion是展开
          animationEasing: 'elasticOut', //初始动画缓动效果
          animationDelay: function (idx) {  //数据更新动画时长，idx限定了每个数据块从无到有的速度
            return Math.random() * 200;
          }
        }],
      }
    }
  },
  created(){
    this.getEcharts();
  },
  mounted(){
    this.$nextTick(()=>{
      this.initEcharts()
    })
  },
  methods:{
    initEcharts(){//初始化图表
      // let left =this.$echarts.init(this.$refs.gress_left);
      // left.setOption({
      //   //需要的话下面内容copy到主体代码块即可
      //     backgroundColor: 'white',
      //     //弹窗，响应鼠标指向，显示具体细节
      //     tooltip : {
      //       trigger: 'item',//以具体项目触发弹窗
      //       /*
      //       内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
      //       value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示
      //       */
      //       formatter: "{a} <br/>{b} : {c} ({d}%)"
      //     },
      //     visualMap: {
      //       show: false,
      //       min: 80,
      //       max: 600,
      //       inRange: {
      //           colorLightness: [0, 1]
      //         }
      //     },
      //     //图例，选择要显示的项目
      //     legend:{
      //       orient:'vertical',
      //       left:'0',
      //       textStyle:{
      //         color:'black',
      //         fontSize:'16'
      //       },
      //       data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']  //注意要和数据的name相对应
      //     },
      //   //数据
      //     series : [
      //       {
      //         name:'访问来源',
      //         type:'pie',
      //         center: ['50%', '50%'],
      //         data:[
      //           {value:335, name:'直接访问'},
      //           {value:310, name:'邮件营销'},
      //           {value:274, name:'联盟广告'},
      //           {value:235, name:'视频广告'},
      //           {value:400, name:'搜索引擎'}
      //         ].sort(function (a, b) { return a.value - b.value; }),
      //         roseType: 'radius',//角度和半径展现百分比，'area'只用半径展现
      //         label: { //饼图图形的文本标签
      //           normal: {  //下同，normal指在普通情况下样式，而非高亮时样式
      //             textStyle: {
      //               color: 'black',
      //               fontSize:'16'
      //             }
      //           }
      //         },
      //         labelLine: {  //引导线样式
      //           normal: {
      //             lineStyle: {
      //               color: '#eb7a1d'
      //             },
      //             smooth: 0.5, //0-1，越大越平滑弯曲
      //             length: 10,  //从块到文字的第一段长
      //             length2: 20  //拐弯到文字的段长
      //           }
      //         },
      //         itemStyle: { //图例样式
      //           normal: {
      //             color: '#eb7a1d',
      //             shadowBlur: 50,//阴影模糊程度
      //             shadowColor: 'rgba(0, 0, 0, 0.5)',//阴影颜色，一般黑
      //           }
      //         },
      //
      //         animationType: 'scale', //初始动画效果，scale是缩放，expansion是展开
      //         animationEasing: 'elasticOut', //初始动画缓动效果
      //         animationDelay: function (idx) {  //数据更新动画时长，idx限定了每个数据块从无到有的速度
      //           return Math.random() * 200;
      //         }
      //       }
      //     ]
      // })
      // left.on('click', function (params) {
      //     console.log(params);
      // });
      let right=this.$echarts.init(document.getElementById('gress_right'));
      right.setOption({
        title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
      });
      // right.on('click',function(params){
      //   console.log(params)
      // })
    },
    getEcharts(){//获取图表数据
      let _vm=this;
      _vm.$axios.get(_vm.url+'/view/statisticsProject').then((res)=>{
        console.log(res)
        if(res.data.code==0){
          res.data.data.projectResultByStateDTOList.forEach((e)=>{
            _vm.leftTitle.push(e.stateStr);
            let data={
              name:e.stateStr,
              value:e.countNumber
            };
            _vm.leftCon.push(data)
          })
          // _vm.left_option.legend.data=_vm.leftTitle;
          // _vm.left_option.series[0].data=_vm.leftCon;

        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    chanceTime(){//筛选图表数据
      console.log(this.value7);
      let _vc=this;
      //开始时间
      let startDate=new Date(_vc.value7[0]);
      let startYear=startDate.getFullYear();
      let startMonth=startDate.getMonth()+1;
      if(startMonth<10){
        startMonth='0'+startMonth
      }
      let startDay=startDate.getDate();
      if(startDay<10){
        startDay='0'+startDay
      };
      let upStart=startYear+'-'+startMonth+'-'+startDay;
      //结束时间
      let endData=new Date(_vc.value7[1]);
      let endYear=endData.getFullYear();
      let endMonth=endData.getMonth()+1;
      if(endMonth<10){
        endMonth='0'+endMonth
      }
      let endDay=endData.getDate();
      if(endDay<10){
        endDay='0'+endDay
      };
      let upEnd=endYear+'-'+endMonth+'-'+endDay;
      _vc.$axios.get(_vc.url+'/view/statisticsProject?minDateStr='+upStart+'&maxDateStr='+upEnd).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.gress_project{
  width: 100%;
  height: 100%;
  padding:30px;
  box-sizing: border-box;
  p{
    width: 100%;
    text-align: center;
    line-height: 100px;
    border-bottom:1px solid #ccc;
  }
  .gress_left{
    width: 50%;
    height: 500px;
  }
  .gress_right{
    width: 50%;
    height: 500px;
  }
}
</style>
