<!-- 频道管理 -->
<template lang="html">
  <div class="channel_admin">
    <div class="" style="display:flex;height:100%;">
      <div class="channel_left">
        <el-tree
         :data="data"
         node-key="id"
         default-expand-all
         :expand-on-click-node="false">
         <span class="custom-tree-node" slot-scope="{ node, data }" @mouseleave="closeOper(data,$event)">
           <span :dataType="data.id" @mouseover="openOper(data,$event)">
             {{ node.label }}
           </span>
           <span class="node">
             （
             <span class="operText">
               <span class="operHover" @click="addChannel(data,node)">添加</span>,
               <span class="operHover" @click="editChannel(data,node)">修改</span>,
               <span class="operHover" @click="delChannel(data,node)">删除</span>
              </span>
             )
           </span>
         </span>
        </el-tree>
      </div>
      <div class="channel_right">
        <ul v-for="(risk,index) in riskList" :key="index">
          <li>频道{{risk.num+1}}</li>
          <li style="height:40px;"><span style="color:red;">*</span><span class="channel_title">父频道:</span><span style="display:inline-block;width:400px;fontSize:14.5px;textAlign:left;height:40px;" v-if="risk.parRisk!=null&&risk.parRisk!=''">{{risk.parRisk}}</span><span v-else style="width:400px;display:inline-block;textAlign:left;">-</span></li>
          <li><span style="color:red;">*</span><span class="channel_title">频道名称:</span><el-input type="primary" placeholder="请输入父频道名称" v-model="risk.riskName" style="width:400px;"></el-input></li>
          <li><span style="color:red;opacity:0;">*</span><span class="channel_title">路径:</span><el-input type="primary" placeholder="请输入父频道名称" v-model="risk.riskUrl" style="width:400px;"></el-input></li>
          <li><span style="color:red;">*</span><span class="channel_title">排序:</span><el-input type="primary" placeholder="请输入父频道名称" v-model="risk.riskNum" style="width:400px;"></el-input></li>
          <li v-if="isEdit"><el-button type="primary" size="medium" @click="addRisk(index)">添加</el-button><el-button type="primary" size="medium" @click="delRisk(index)">删除</el-button></li>
        </ul>
        <p style="textAlign:center;marginTop:20px;">
          <el-button type="primary" size="medium">提交</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isEdit:false,
      riskList:[
        {
          num:0,//频道排序
          parRisk:null,//父级频道名称
          riskName:null,//频道名称
          riskUrl:null,//频道路径
          riskNum:null,//频道排序
        }
      ],
      data: [{
         id: 1,
         label: '根目录',
         isOpen:true,
         children: [
           {
             id: 2,
             label: '基础数据管理',
             isOpen:false,
             children: [
               {
                 id: 3,
                 label: '频道管理',
                 isOpen:false,
               },
               {
                 id: 4,
                 label: '角色管理',
                 isOpen:false,
                }
              ]
            },
            {
              id:5,
              label:'平台内部管理',
              isOpen:false,
              children:[
                {
                  id:6,
                  label:'内部工程师管理',
                  isOpen:false,
                },
                {
                  id:7,
                  label:'外部工程师管理',
                  isOpen:false,
                }
              ]
            }
          ]
        }]
    }
  },
  watch:{

  },
  methods:{
    openOper(data,$event){//鼠标移入
      $event.currentTarget.nextElementSibling.setAttribute('class','block');
    },
    closeOper(data,$event){//鼠标移出
      $event.currentTarget.firstElementChild.nextElementSibling.setAttribute('class','none')
    },
    addChannel(data,node){//添加频道
      this.isEdit=true;
      this.riskList[0].riskName=null;
      this.riskList[0].riskUrl=null;
      this.riskList[0].riskNum=null;
      this.riskList[0].parRisk=node.parent.data.label;
    },
    delRisk(index){//删除添加频道
     if(this.riskList.length>=2){
         this.riskList.splice(index,1)
       }else{
         this.$message.warning('不能删除了哦')
       }
    },
    editChannel(data,node){//编辑频道
      this.riskList=[{
       num:0,
       parRisk:null,//父级频道名称
       riskName:null,//频道名称
       riskUrl:null,//频道路径
       riskNum:null,//频道排序
      }];
      this.isEdit=false;
      this.riskList[0].parRisk=node.parent.data.label;
      this.riskList[0].riskName=data.label;
    },
    delChannel(data,node){//删除频道
      console.log(data)
    },
    addRisk(index){//添加频道
      this.riskList.push({
        num:this.riskList[index].num+1,
        parRisk:this.riskList[0].parRisk,//父级频道名称
        riskName:null,//频道名称
        riskUrl:null,//频道路径
        riskNum:null,//频道排序
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  box-sizing: border-box;
  padding-right: 50%;
}
.operText{
  font-size: 15px;
  text-decoration: underline;
}
.operHover:hover{
  color:#eb7a1d;
}
.node{
  display: none;
}
.none{
  display: none;
}
.block{
  display: block;
}
.channel_admin{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .channel_left{
    width: 40%;
    box-sizing: border-box;
    padding-top: 15px;
    padding-left: 30px;
    transition: 1s all;
  }
  .channel_right{
    width: 60%;
    ul{
      width: 70%;
      margin:0 auto;
      box-sizing: border-box;
      padding-bottom:5px;
      border:1px solid #ccc;
      margin-top: 10px;
      box-shadow: 0px 0px 5px #ccc;
      padding-bottom: 15px;
      li{
        margin-top: 15px;
        text-align: center;
        line-height: 40px;
        box-sizing: border-box;
        .channel_title{
          display: inline-block;
          width: 70px;
          text-align: left;
          font-size: 14px;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
