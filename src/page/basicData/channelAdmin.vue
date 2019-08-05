<!-- 频道管理 -->
<template lang="html">
  <div class="channel_admin">
    <div class="" style="display:flex;height:100%;">
      <div class="channel_left">
        <p style="position:relative;box-sizing:border-box;padding-left:20px;">{{data[0].name}}<span class="hideChannel">
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
          <li style="color:#eb7a1d;padding-left:25px;fontSize:15px;">{{name.name}}</li>
          <li v-for="(item,key) in name.child" style="box-sizing:border-box;padding-left:35px;fontSize:14px;" v-show="name.isOpen" @mouseenter="showOper(index,key)" @mouseleave="hideOper(index,key)">
            {{item.name}}<span class="oper" v-if="item.isOper">(<span>添加</span>&nbsp;,&nbsp;<span>修改</span>&nbsp;,&nbsp;<span>删除</span>)</span>
          </li>
        </ul>
      </div>
      <div class="channel_right">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isOpen:true,
      data:[
        {
          name:'根目录',
          children:[
            {
              name:'基础数据管理',
              isOpen:true,
              child:[
                {
                  name:'频道管理',
                  isOper:false,
                },
                {
                  name:'角色管理',
                  isOper:false,
                }
              ]
            },
            {
              name:'平台内部管理',
              isOpen:true,
              child:[
                {
                  name:'内部工程师管理',
                  isOper:false,
                },
                {
                  name:'项目列表',
                  isOper:false,
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
    openOper(index){
      this.data[0].children[index].isOpen=true;
    },
    closeOper(index){
      this.data[0].children[index].isOpen=false;
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
      }
      li:hover{
        cursor:pointer;
        text-decoration: underline;
      }
    }
  }
  .channel_right{
    width: 70%;
    background: blue;
  }
}
</style>
