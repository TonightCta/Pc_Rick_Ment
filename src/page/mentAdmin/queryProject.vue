<!-- 项目查询 -->
<template lang="html">
  <div class="query_project">
    <Search/>
    <div class="project_con">
      <p class="addEng">
        <!-- <el-button type="primary" icon="el-icon-plus" size="medium" @click="addEng=true" @keyup.enter.native="abc($event)">添加工程师</el-button> -->
        <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
        <Reload/>
      </p>
      <div class="project_title">
        <el-row>
          <el-col :span="1"><div class="projectTitle">序号</div></el-col>
          <el-col :span="8"><div class="projectTitle">项目名称</div></el-col>
          <el-col :span="3"><div class="projectTitle">项目状态</div></el-col>
          <el-col :span="3"><div class="projectTitle">项目进度</div></el-col>
          <el-col :span="3"><div class="projectTitle">创建人</div></el-col>
          <el-col :span="3"><div class="projectTitle">创建时间</div></el-col>
          <el-col :span="3"><div class="projectTitle">浏览</div></el-col>
        </el-row>
      </div>
      <div class="project_con">
        <el-row class="el_con" v-for="(pro,index) in proList" :key="index">
          <el-col :span="1"><div class="projectCon">{{pro.num}}</div></el-col>
          <el-tooltip class="item" effect="dark" :content="pro.name" placement="bottom">
            <el-col :span="8"><div class="projectCon" style="cursor:pointer;">{{pro.name.substring(0,22)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="3"><div class="projectCon status">
            <span v-show="pro.status==1" style="background:rgb(255, 255, 153);">停工</span>
            <span v-show="pro.status==2" style="background:rgb(204, 255, 153);">开工</span>
            <span v-show="pro.status==3" style="background:rgb(102, 204, 255);">验收</span>
            <span v-show="pro.status==4" style="background:rgb(204, 255, 255);">完工</span>
          </div></el-col>
          <el-col :span="3"><div class="projectCon">{{pro.gress}}%</div></el-col>
          <el-col :span="3"><div class="projectCon">{{pro.creat}}</div></el-col>
          <el-col :span="3"><div class="projectCon">{{pro.time}}</div></el-col>
          <el-col :span="3"><div class="projectCon">
            <i class="el-icon-view" style="color:#eb7a1d;font-size:23px;cursor:pointer;" @click="hasDetials()"></i>
          </div></el-col>
        </el-row>
      </div>
      <!-- 蒙层 -->
      <div class="project_mask" v-show="openDetils" @click="closeMes()">

      </div>
      <!-- 详情弹框 -->
      <div class="project_mes" v-show="openDetils" ref="project_mes">
        <p class="mes_close"><i class="el-icon-close" @click="closeMes()"></i></p>
        <p class="mes_titleOne">
          <span>项目信息</span>
        </p>
        <div class="" v-show="showMes" style="min-height:70%;">
          <ul class="con_mes">
            <li>客户名称:&nbsp;&nbsp;&nbsp;<span>上海朋邦实业有限公司</span></li>
            <li class="flex">
              <p>项目名称:&nbsp;&nbsp;&nbsp;<span>边界会话控制器(SBC)项目文档归档</span></p>
              <p>项目类型:&nbsp;&nbsp;&nbsp;<span>新建</span></p>
            </li>
            <li>项目内容:&nbsp;&nbsp;&nbsp;<span>设备安装调测</span></li>
            <li class="flex">
              <p>联系人:&nbsp;&nbsp;&nbsp;<span>黎良金</span></p>
              <p>联系电话:&nbsp;&nbsp;&nbsp;<span>18888888888</span></p>
            </li>
            <li class="flex">
              <p>项目人数:&nbsp;&nbsp;&nbsp;<span>1人</span></p>
              <p>工期:&nbsp;&nbsp;&nbsp;<span>10天</span></p>
            </li>
            <li class="flex">
              <p>交付标准:&nbsp;&nbsp;&nbsp;<span>签署完工报告及验收报告</span></p>
              <p>技能要求:&nbsp;&nbsp;&nbsp;<span>UCC:中级工程师</span></p>
            </li>
            <li class="flex">
              <p>项目状态:&nbsp;&nbsp;&nbsp;<span>验收</span></p>
              <p>项目进度:&nbsp;&nbsp;&nbsp;<span>20%</span></p>
            </li>
            <li class="flex">
              <p>预警时间:&nbsp;&nbsp;&nbsp;<span>2019/05/05</span></p>
              <p>入场时间:&nbsp;&nbsp;&nbsp;<span>2019/03/02</span></p>
            </li>
            <li class="flex">
              <p>计划完工时间:&nbsp;&nbsp;&nbsp;<span>2019/05/01</span></p>
              <p>完工时间:&nbsp;&nbsp;&nbsp;<span>2019/05/08</span></p>
            </li>
            <li class="flex">
              <p>计划验收时间:&nbsp;&nbsp;&nbsp;<span>2019/05/06</span></p>
              <p>验收时间:&nbsp;&nbsp;&nbsp;<span>2019/05/10</span></p>
            </li>
          </ul>
        </div>
        <p class="mes_titleOne">
          <span>局点信息</span>
        </p>
        <div class="" v-show="showMes">
          <ul class="con_mes">
            <li>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:&nbsp;&nbsp;&nbsp;<span>广州市</span></li>
            <li>详细地址:&nbsp;&nbsp;&nbsp;<span>广东省广州市</span></li>
            <li>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:&nbsp;&nbsp;&nbsp;<span></span></li>
            <li>人员组成:&nbsp;&nbsp;&nbsp;<span>耿海涛</span></li>
            <li>
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="1">
                  <template slot="title">
                   <span style="color:rgba(235,122,29,1);fontSize:16px;">项目文档【点击展开】</span>
                  </template>
                  <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                  <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template slot="title">
                   <span style="color:rgba(235,122,29,1);fontSize:16px;">验&nbsp;&nbsp;货&nbsp;&nbsp;单【点击展开】</span>
                  </template>
                  <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item name="3">
                  <template slot="title">
                   <span style="color:rgba(235,122,29,1);fontSize:16px;">项目进程【点击展开】</span>
                  </template>
                  <div>简化流程：设计简洁直观的操作流程；</div>
                  <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                  <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item name="4">
                  <template slot="title">
                   <span style="color:rgba(235,122,29,1);fontSize:16px;">潜在风险【点击展开】</span>
                  </template>
                  <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                  <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
              </el-collapse>
            </li>
          </ul>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="project_page">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :total="pageNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/search'
import Reload  from '@/components/reloadBtn'
export default {
  data(){
    return{
      dataLength:88,//总数据
      currentPage3:1,//日期类型
      pageNum:10,//页码
      openDetils:false,//打开详情弹框
      showMes:false,//显示内容
      activeNames: ['1'],
      proList:[
        {
          num:1,
          name:'边界会话控制器(SBC)项目文档归档',
          status:1,
          gress:'20',
          creat:'耿达',
          time:'2019-08-03'
        },
        {
          num:2,
          name:'武汉品道建筑园林工程有限公司网络及监控系统工程PRO2018049430112-实施服务',
          status:2,
          gress:'100',
          creat:'凌寒涛',
          time:'2019-05-23'
        },
        {
          num:3,
          name:'湖北中烟武汉卷烟厂易地技术改造项目安防系统采购项目（网络、存储）',
          status:4,
          gress:'81',
          creat:'张江林',
          time:'2019-05-23'
        },
        {
          num:4,
          name:'天津市政府合作办公室视频会议项目',
          status:3,
          gress:'100',
          creat:'王龙飞',
          time:'2019-05-23'
        },
      ]
    }
  },
  components:{
    Search,
    Reload
  },
  methods:{
    handleChange(val) {//折叠面板
       console.log(val);
     },
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page=val-1;
    },
    hasDetials(){//查看项目详情
      this.openDetils=true;
      setTimeout(()=>{
        this.$refs.project_mes.style.width='100%'
        this.$refs.project_mes.style.minHeight='100%';
        setTimeout(()=>{
          this.showMes=true;
        },200)
      })
    },
    closeMes(){//关闭项目详情
      this.$refs.project_mes.style.width='300px'
      this.$refs.project_mes.style.height='200px'
      setTimeout(()=>{
        this.showMes=false;
      },100)
      setTimeout(()=>{
        this.openDetils=false;
      },200)
    }
  }
}
</script>

<style lang="scss" scoped>
.query_project{
  width: 100%;
  height: 100%;
  position: relative;
  .project_con{
    width: 98%;
    margin:0 auto;
    .addEng{
      width: 100%;
      border-bottom:1px solid #ccc;
      padding-bottom: 5px;
      height: 42px;
      line-height: 42px;
      .dataLength{
        display: inline-block;
        width: 98%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 50px;
      }
    }
    .project_title{
      width: 100%;
      margin-top: 2px;
      .projectTitle{
        text-align: center;
        line-height: 40px;
        background: #eb7a1d;
        color:white;
        font-size: 16px;
      }
    }
    .project_con{
      width: 100%;
      margin-top: 2px;
      min-height: 500px;
      .projectCon{
        text-align: center;
        line-height: 50px;
        color:black;
        font-size: 15px;
      }
      .status{
        span{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .el_con:nth-of-type(even){
      background:#eee;
    }
  }
  .project_mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    left:0;
    top:0;
    z-index: 666;
  }
  .project_mes{
    width: 300px;
    height: 200px;
    position: absolute;
    background: white;
    overflow: auto;
    top:0;
    left:0;
    z-index: 667;
    transition: .5s all;
    .mes_close{
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: right;
      box-sizing: border-box;
      position: relative;
      border-bottom:1px solid #eee;
      i{
        font-size: 35px;
        color: rgba(235,122,29,1);
        cursor:pointer;
        top: 12px;
        right:30px;
        position: absolute;
      }
    }
    .mes_titleOne{
      width: 100%;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      padding-left: 30px;
      span{
        font-size: 20px;
        font-weight: bold;
        color: rgba(235,122,29,1);
        border-bottom:2px solid  rgba(235,122,29,1);
      }
    }
    .con_mes{
      width: 100%;
      box-sizing: border-box;
      padding-left: 40px;
      height: 55px;
      li{
        width: 100%;
        text-align: left;
        line-height: 55px;
        min-height: 55px;
        max-height: none;
        font-weight: bold;
        span{
          font-weight:normal;
        }
      }
      .flex{
        width: 100%;
        display: flex;
        p:first-child{
          width: 55%;
        }
        p:last-child{
          width: 35%;
        }
      }
    }
  }
  .project_page{
    width: 98%;
    text-align: right;
  }
}
</style>
