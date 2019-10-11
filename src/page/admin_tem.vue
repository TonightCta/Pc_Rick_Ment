<!-- 管理员页面 -->
<template lang="html">
  <div class="admin" ref="admin">
    <Header ref="header"></Header>
    <div class="" style="width:100%;display:flex;">
      <div style="width:16%;transition:.5s all;" ref="titleBox">
        <div style="box-shadow:0px 0px 10px #999;border-right:1px solid #eee;height:80vh;padding-bottom:150px;overflow-y:auto;" class="terM" ref="terM">
          <el-menu
            default-active="4"
            @open="handleOpen"
            @close="handleClose"
            class="el-menu-vertical-demo"
            active-text-color="#000"
            :collapse="isCollapse"
            unique-opened
            >
            <el-submenu v-for="(fun,key) in route" :key="'F'+key" :index="fun.in">
              <template slot="title">
                 <i :class="'iconfont icon-'+fun.icon" style="fontSize:20px;"></i>
                <span>{{fun.name}}</span>
              </template>
              <el-menu-item-group>
                <span slot="title">{{fun.name}}</span>
                <el-menu-item v-for="(c,index) in fun.usingChannelVOList" :key="'C'+index">
                  <router-link tag="span" :to="c.url" @click.native="pushCru(key,index)">{{c.name}}</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <div style="width:84%;transition:.5s all;" ref="contentBox">
        <div class="admin_view">
          <div class="crumbs">
            <ul>
              <li v-for="(crum,index) in abc" @click="choseCru(index)" :key="index+'A'" ref="crum">
                <router-link tag="span" :to="crum.url">{{crum.name}}</router-link>
                <i class="el-icon-error" ref="close" @click.stop="delCru(index)"></i>
              </li>
              <li class="full" style="min-width:60px;">
                <el-tooltip class="item" effect="dark" content="全屏模式" placement="bottom">
                  <img src="../../static/img/fulle_icon.png" alt="" class="fullBtn" @click="full()" ref="fullBtn" v-show="isFull">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="退出全屏" placement="bottom">
                  <img src="../../static/img/cancelFull_icon.png" alt="" class="canFullBtn" @click="canCelfull()" v-show="!isFull" ref="canFullBtn">
                </el-tooltip>
              </li>
              <li></li>
            </ul>
          </div>
          <div class="" style="height:85vh;position:relative;" ref="conHeight">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   data(){
     return {
       isCollapse:false,
       title:4,//菜单占比
       content:20,//主视图占比
       isFull:true,
       utlN:0,
       abc:[
         {
           name:'欢迎',
           url:'/admin/wel'
         }
       ],
       length:0,
       iconList:[
         'shujufenxi','pingtaizijiankong','huaban-','kehufuwu','chengshijinglitianch','laoban','shangwu','ziyuanxuqiu','wenzhang','renwuguanli','tongji','guanli1'
       ],
       route:[],
       closeUrl:null,//暂存页面地址
       beforeIndex:null,//上一次选择的面包屑
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
         this.route=mes.roleVO.usingTopChannelVOList;
       }else{
         this.route=[{name:'暂无权限'}]
       }
     };
     this.route.forEach((e)=>{
       if(this.iconList[e.sort-1]!=undefined){
         this.$set(e,'icon',this.iconList[e.sort-1])
       }else{
         this.$set(e,'icon','tianqizitiku51')
       }
     });
   },
   methods: {
     handleOpen(key, keyPath) {
       // console.log(key, keyPath);
     },
     handleClose(key, keyPath) {
       // console.log(key, keyPath);
     },
     choseCru(index){//面包屑选择
       this.beforeIndex=index;
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
       let curMes={
         name:null,
         url:null
       };
       curMes.name=this.route[key].usingChannelVOList[index].name;
       curMes.url=this.route[key].usingChannelVOList[index].url;
       this.closeUrl=this.route[key].usingChannelVOList[index].url;
       let a=[];
       let b=[];
       this.abc.forEach((e)=>{
         a.push(e.name)
         b.push(e.url)
       });
       for(let i in this.$refs.crum){
         this.$refs.crum[i].style.borderBottom='1px solid #eb7a1d'
         this.$refs.crum[i].style.color='black'
       };
       if(a.indexOf(curMes.name)<0&&!window.localStorage.getItem('noUrl')){
         this.abc.push(curMes);
         setTimeout(()=>{
           this.$refs.crum[this.abc.length-1].style.borderBottom='0';
           this.$refs.crum[this.abc.length-1].style.color='#eb7a1d'
         })
       }else{
         if(this.$refs.crum[a.indexOf(curMes.name)]!=undefined){
           this.$refs.crum[a.indexOf(curMes.name)].style.borderBottom='0'
           this.$refs.crum[a.indexOf(curMes.name)].style.color='#eb7a1d'
         }else{
           this.$refs.crum[b.indexOf(window.location.hash.substr(1))].style.borderBottom='0'
           this.$refs.crum[b.indexOf(window.location.hash.substr(1))].style.color='#eb7a1d'
         }
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
     },
     full(){//全屏模式
       this.$refs.fullBtn.style.opacity="0";
       this.$refs.canFullBtn.style.opacity="1";
       this.$refs.admin.style.paddingTop='0';
       this.$refs.conHeight.style.height='97vh';
       this.$refs.terM.style.height='90vh';
       this.$refs.contentBox.style.width="96%";
       this.$refs.titleBox.style.width='4%';
       this.$refs.header.closeHeader();
       this.isCollapse=true;
       setTimeout(()=>{
         this.isFull=false;
       },200)
     },
     canCelfull(){//取消全屏
       this.$refs.fullBtn.style.opacity="1";
       this.$refs.canFullBtn.style.opacity="0";
       this.$refs.admin.style.paddingTop='86px';
       this.$refs.conHeight.style.height='85vh';
       this.$refs.terM.style.height='80vh';
       this.$refs.contentBox.style.width="84%";
       this.$refs.titleBox.style.width='16%';
       this.$refs.header.cancelHeader()
       this.isCollapse=false;
       setTimeout(()=>{
         this.isFull=true;
       },200)
     },
   }
}
</script>

<style lang="scss" scoped>
.cru_active{
  border-bottom:0!important;
  color:#eb7a1d!important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
   width: 100%;
   min-height: 400px;
 }
.admin{
  margin:0 auto;
  max-height: none;
  height: 100%;
  padding-top: 86px;
  box-sizing: border-box;
  z-index: 100;
  background: white;
  transition: .5s all;
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
        // position: relative;
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
        .full{
          position: fixed;
          height: 29px;
          right:-5px;
          z-index: 1;
          border:0;
          border-bottom:1px solid #eb7a1d;
          img{
            width: 30px;
            height: 30px;
            transition: .2s all;
          }
          .fullBtn{
            opacity: 1;
          }
          .canFullBtn{
            opacity: 0;
          }
        }
      }

    }
  }
}
</style>
