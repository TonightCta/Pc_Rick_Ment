<!-- 频道管理 -->
<template lang="html">
  <div class="channel_admin">
    <div class="" style="display:flex;height:100%;">
      <div class="channel_left">
        <p style="position:relative;box-sizing:border-box;padding-left:20px;" class="ori_title" @mouseenter="data[0].isOper=true" @mouseleave="data[0].isOper=false">{{data[0].name}}
          <span v-if="data[0].isOper">(<span class="root_title" @click="pushRoot()">添加</span>)</span>
          <span class="hideChannel">
          <el-button type="primary" icon="el-icon-minus" circle @click="isOpen=false" v-if="isOpen"></el-button>
          <el-button type="primary" icon="el-icon-plus" circle @click="isOpen=true" v-if="!isOpen"></el-button>
        </span></p>
        <ul v-for="(name,index) in data[0].children" :class="{active:name.isOpen==false}">
          <li style="position:relative;">
            <span>
              <span class="hideChannel" style="left:8px;">
                <el-button type="primary" icon="el-icon-minus" @click="closeOper(index)" circle v-if="name.isOpen"></el-button>
                <el-button type="primary" icon="el-icon-plus" @click="openOper(index)" circle v-if="!name.isOpen"></el-button>
              </span>
            </span>
          </li>
          <li style="color:#eb7a1d;padding-left:25px;fontSize:15px;" @mouseenter="name.isOper=true" @mouseleave="name.isOper=false;">
            {{name.name}}
            <span v-if="name.isOper" style="color:black;">
              (<span class="parOper" @click="pushRiskPar(index)">添加</span>&nbsp;,&nbsp;<span class="parOper" @click="editRiskPar(index)">修改</span>&nbsp;,&nbsp;<span class="parOper">删除</span>)
            </span>
          </li>
          <li v-for="(item,key) in name.child" style="box-sizing:border-box;padding-left:35px;fontSize:14px;" v-show="name.isOpen" @mouseenter="showOper(index,key)" @mouseleave="hideOper(index,key)">
            {{item.name}}<span class="oper" v-if="item.isOper">(<span @click="pushRisk(index,key)">添加</span>&nbsp;,&nbsp;<span @click="editRisk(index,key)">修改</span>&nbsp;,&nbsp;<span>删除</span>)</span>
          </li>
        </ul>
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
      parRisk:null,//父级频道名称
      isOpen:true,
      isEdit:true,//是否为编辑
      riskList:[
        {
          num:0,//频道排序
          parRisk:null,//父级频道名称
          riskName:null,//频道名称
          riskUrl:null,//频道路径
          riskNum:null,//频道排序
        }
      ],
      data:[
        {
          name:'根目录',
          isOper:false,
          children:[
            {
              name:'基础数据管理',
              isOpen:true,
              isOper:false,
              code:1,
              url:'a-a',
              child:[
                {
                  name:'频道管理',
                  code:1,
                  url:'a',
                  isOper:false,
                },
                {
                  name:'角色管理',
                  isOper:false,
                  code:2,
                  url:'b',
                }
              ]
            },
            {
              name:'平台内部管理',
              isOpen:true,
              isOper:false,
              code:2,
              url:'a-b',
              child:[
                {
                  name:'内部工程师管理',
                  isOper:false,
                  code:3,
                  url:'c',
                },
                {
                  name:'项目列表',
                  isOper:false,
                  code:4,
                  url:'d',
                }
              ]
            }
          ]
        }
      ]
    }
  },
  watch:{
    isOpen(val,oldVal){
      if(!val){
        this.data[0].children=[];
      }else{
        return this.data[0]
      }
    }
  },
  methods:{
    showOper(index,key){//鼠标移入
      this.data[0].children[index].child[key].isOper=true;
    },
    hideOper(index,key){//鼠标移出
      this.data[0].children[index].child[key].isOper=false;
    },
    openOper(index){//打开菜单
      this.data[0].children[index].isOpen=true;
    },
    closeOper(index){//关闭菜单
      this.data[0].children[index].isOpen=false;
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
    editRisk(index,key){//编辑频道
      this.riskList=[{
        num:0,
        parRisk:null,//父级频道名称
        riskName:null,//频道名称
        riskUrl:null,//频道路径
        riskNum:null,//频道排序
      }];
      this.isEdit=false;
      this.riskList[0].parRisk=this.data[0].children[index].name;
      this.riskList[0].riskName=this.data[0].children[index].child[key].name;
      this.riskList[0].riskUrl=this.data[0].children[index].child[key].url;
      this.riskList[0].riskNum=this.data[0].children[index].child[key].code;
    },
    pushRisk(index,key){//添加频道
      this.isEdit=true;
      this.riskList[0].riskName=null;
      this.riskList[0].riskUrl=null;
      this.riskList[0].riskNum=null;
      this.riskList[0].parRisk=this.data[0].children[index].child[key].name;
    },
    delRisk(index){//删除添加频道
      if(this.riskList.length>=2){
        this.riskList.splice(index,1)
      }else{
        this.$message.warning('不能删除了哦')
      }
    },
    pushRiskPar(index){//添加父级频道
      this.isEdit=true;
      this.riskList[0].riskName=null;
      this.riskList[0].riskUrl=null;
      this.riskList[0].riskNum=null;
      this.riskList[0].parRisk=this.data[0].children[index].name;
    },
    editRiskPar(index){//编辑父级频道
      this.riskList=[{
        num:0,
        parRisk:null,//父级频道名称
        riskName:null,//频道名称
        riskUrl:null,//频道路径
        riskNum:null,//频道排序
      }];
      this.isEdit=false;
      this.riskList[0].parRisk=this.data[0].name;
      this.riskList[0].riskName=this.data[0].children[index].name;
      this.riskList[0].riskUrl=this.data[0].children[index].url;
      this.riskList[0].riskNum=this.data[0].children[index].code;
    },
    pushRoot(){//根目录下添加
      this.isEdit=true;
      this.riskList[0].riskName=null;
      this.riskList[0].riskUrl=null;
      this.riskList[0].riskNum=null;
      this.riskList[0].parRisk=this.data[0].name;
    }
  }
}
</script>

<style lang="scss" scoped>
.active{
  max-height: 20px!important;
  transition: 1s all;
  background: red;
}
.el-button.is-circle{
  padding: 0px!important;
}
.channel_admin{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .channel_left{
    width: 30%;
    box-sizing: border-box;
    padding-top: 15px;
    padding-left: 30px;
    transition: 1s all;
    .root_title:hover{
      color:#eb7a1d;
    }
    .ori_title:hover{
      cursor:pointer;
      text-decoration: underline;
    }
    .hideChannel{
      position: absolute;
      left:0;
      top:-2px;
    }
    ul{
      transition:1s all;
      box-sizing: border-box;
      li{
        transition:1s all;
        .oper{
          font-size: 13px;
          span:hover{
            color:#eb7a1d ;
          }
        }
        .parOper:hover{
          color:#eb7a1d;
        }
      }
      li:hover{
        cursor:pointer;
        text-decoration: underline;
      }
    }
  }
  .channel_right{
    width: 70%;
    ul{
      width: 60%;
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
