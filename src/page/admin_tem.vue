<!-- 临时管理员页面 -->
<template lang="html">
  <div class="admin">
    <Header/>
    <el-row>
      <el-col :span="3">
        <div style="box-shadow:0px 0px 10px #999;border-right:1px solid #eee;height:80vh;padding-bottom:150px;overflow-y:auto;" class="terM">
          <el-menu
            default-active="4"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            active-text-color="#000"
            unique-opened
            >
            <el-submenu v-for="(fun,key) in route" :key="'F'+key" :index="fun.in">
              <template slot="title">
                <span>{{fun.name}}</span>
              </template>
              <el-menu-item-group >
                <el-menu-item v-for="(c,index) in fun.usingChannelVOList" :key="'C'+index">
                  <router-link tag="span" :to="c.url" @click.native="pushCru(key,index)">{{c.name}}</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="admin_view">
          <div class="crumbs">
            <ul>
              <li v-for="(crum,index) in abc" @click="choseCru(index)" :key="index+'A'" ref="crum">
                <router-link tag="span" :to="crum.url">{{crum.name}}</router-link>
                <i class="el-icon-circle-close" ref="close" @click.stop="delCru(index)"></i>
              </li>
              <li></li>
            </ul>
          </div>
          <div class="" style="height:85vh;position:relative;">
            <router-view></router-view>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
     return {
       isCollapse: true,
       utlN:0,
       abc:[
         {
           name:'欢迎',
           url:'/admin/wel'
         }
       ],
       length:0,
       route:[
         {
           name:'平台内部管理',
           in:'1-1',
           usingChannelVOList:[
             {
               name:'内部工程师管理',
               url:'/admin/internalEng'
             },
             {
               name:'新注册工程师管理',
               url:'/admin/newEng'
             },
             {
               name:'待认证工程师管理',
               url:'/admin/certifiedEng'
             },
             {
               name:'外部工程师管理',
               url:'/admin/externalEng'
             },
           ]
         },
         {
           name:'管理层',
           in:'1-2',
           usingChannelVOList:[
             {
               name:'项目浏览查询',
               url:'/admin/queryProject'
             },
             {
               name:'项目进度查询',
               url:'/admin/gressProject'
             }
           ]
         },
         {
           name:'技能管理',
           in:'1-3',
           usingChannelVOList:[
             {
               name:'技能管理',
               url:'/admin/skillMent'
             }
           ]
         },
         {
           name:'企业账户管理',
           in:'1-4',
           usingChannelVOList:[
             {
               name:'新注册企业管理',
               url:'/admin/newCom'
             },
             {
               name:'待认证企业管理',
               url:'/admin/certifiedCom'
             },
             {
               name:'已认证企业管理',
               url:'/admin/internalCom'
             },
           ]
         },
         {
           name:'任务管理',
           in:'1-5',
           usingChannelVOList:[
             {
               name:'任务管理',
               url:'/admin/order'
             }
           ]
         },
         {
           name:'项目经理相关',
           in:'1-6',
           usingChannelVOList:[
             {
               name:'项目管理',
               url:'/admin/creatPro'
             },
             {
               name:'客户管理(管理员)',
               url:'/admin/custTion'
             },
             {
               name:'客户管理(项目经理)',
               url:'/admin/custTionManer'
             }
           ]
         },
         {
           name:'工程师相关',
           in:'1-7',
           usingChannelVOList:[
             {
               name:'工作内容管理',
               url:'/admin/workContent'
             },
             {
               name:'潜在风险记录列表(管理员)',
               url:'/admin/riskRcord',
             },
             {
               name:'潜在风险记录列表(工程师)',
               url:'/admin/riskRcordManer',
             },
             {
               name:'项目相关文档管理',
               url:'/admin/projectFile'
             }
           ]
         },
         {
           name:'基础数据管理',
           in:'1-8',
           usingChannelVOList:[
             {
               name:'频道管理',
               url:'/admin/channel'
             },
             {
               name:'角色管理',
               url:'/admin/role'
             },
             {
               name:'操作人员管理',
               url:'/admin/operman'
             },
             {
               name:'地点管理',
               url:'/admin/place'
             },
             {
               name:'进程节点管理',
               url:'/admin/point'
             },
             {
               name:'技术领域及领域管理',
               url:'/admin/field'
             }
           ]
         },
         {
           name:'需求管理',
           in:'1-9',
           usingChannelVOList:[
             {
               name:'需求列表',
               url:'/admin/demand'
             }
           ]
         }
       ],
       closeUrl:null,//暂存页面地址
     }
   },
   components:{
     Header:resolve=>require(['@/components/header'],resolve)
   },
   mounted(){
     this.$refs.crum[0].style.borderBottom='0';
     this.$refs.close[0].style.display='none';
     if(this.abc.length<2){
       this.$router.push('/admin/wel')
     };
     if(window.sessionStorage.getItem('adminMes')){
       let mes=JSON.parse(window.sessionStorage.getItem('adminMes'));
       if(mes.roleVO!=null){
         // console.log(mes.roleVO)
         mes.roleVO.usingTopChannelVOList.forEach((e)=>{
           this.$set(e,'in','1-'+this.length++)
         })
         // this.route=mes.roleVO.usingTopChannelVOList;
       }else{
         this.route=[{name:'暂无权限'}]
       }
     };
   },
   methods: {
     handleOpen(key, keyPath) {
       // console.log(key, keyPath);
     },
     handleClose(key, keyPath) {
       // console.log(key, keyPath);
     },
     choseCru(index){//面包屑选择
       for(let i in this.$refs.crum){
         this.$refs.crum[i].style.borderBottom='1px solid #eb7a1d'
         this.$refs.crum[i].style.color='black'
       };
       setTimeout(()=>{
         this.closeUrl=this.abc[index].url;
         this.$refs.crum[index].style.borderBottom='0';
         this.$refs.crum[index].style.color='#eb7a1d'
       })
     },
     pushCru(key,index){//添加面包屑
       for(let i in this.$refs.crum){
         this.$refs.crum[i].style.borderBottom='1px solid #eb7a1d'
         this.$refs.crum[i].style.color='black'
       };
       let curMes={
         name:null,
         url:null
       };
       curMes.name=this.route[key].usingChannelVOList[index].name;
       curMes.url=this.route[key].usingChannelVOList[index].url;
       this.closeUrl=this.route[key].usingChannelVOList[index].url;
       let a=[];
       this.abc.forEach((e)=>{
         a.push(e.name)
       });
       if(a.indexOf(curMes.name)<0){
         this.abc.push(curMes);
         setTimeout(()=>{
           this.$refs.crum[this.abc.length-1].style.borderBottom='0';
           this.$refs.crum[this.abc.length-1].style.color='#eb7a1d'
         })
       }else{
         this.$refs.crum[a.indexOf(curMes.name)].style.borderBottom='0'
         this.$refs.crum[a.indexOf(curMes.name)].style.color='#eb7a1d'
       }
     },
     delCru(index){//删除面包屑
       this.abc.splice(index,1);
       for(let i in this.$refs.crum){
         this.$refs.crum[i].style.borderBottom='1px solid #eb7a1d'
         this.$refs.crum[i].style.color='black'
       };
       setTimeout(()=>{
         this.$refs.crum[this.abc.length-1].style.borderBottom='0';
          this.$refs.crum[this.abc.length-1].style.color='#eb7a1d';
          this.$router.push(this.abc[this.abc.length-1].url);
       })
     }
   }
}
</script>

<style lang="scss" scoped>
.cru_active{
  border-bottom:0!important;
  color:#eb7a1d!important;
}
.admin{
  margin:0 auto;
  max-height: none;
  height: 100%;
  padding-top: 86px;
  box-sizing: border-box;
  z-index: 100;
  background: white;
  .terM::-webkit-scrollbar {display:none}
  .admin_view{
    background: white;
    max-height: none;
    .crumbs{
      width: 100%;
      height: 30px;
      ul::-webkit-scrollbar {display:none};
      ul{
        width: 100%;
        height: 100%;
        display: flex;
        overflow-y: hidden;
        li{
          min-width: 120px;
          text-align: center;
          float: none;
          line-height: 30px;
          max-width: none;
          border:1px solid #eb7a1d;
          cursor:pointer;
          background: white;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          position: relative;
          span{
            display: inline-block;
            height: 100%;
            padding-left: 25px;
            text-align: center;
            padding-right: 25px;
          }
          i{
            position: absolute;
            right:3px;
            font-size: 13px;
            color:#999;
            top:9px;
          }
          i:hover{
            color:#666;
          }
        }
        li:last-child{
          flex:1;
          border:0;
          border-bottom:1px solid #eb7a1d;
        }
      }

    }
  }
}
</style>
