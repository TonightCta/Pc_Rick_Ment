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
            <el-col :span="8"><div class="projectCon">{{pro.name.substring(0,22)}}...</div></el-col>
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
      <div class="project_mask" v-show="openDetils">

      </div>
      <!-- 详情弹框 -->
      <div class="project_mes" v-show="openDetils" ref="project_mes">
        <i class="el-icon-close"></i>
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
      dataLength:88,
      currentPage3:1,
      pageNum:10,
      openDetils:false,
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
        this.$refs.project_mes.style.height='100%'
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
    top:0;
    left:0;
    z-index: 667;
    transition: .5s all;
  }
  .project_page{
    width: 98%;
    text-align: right;
  }
}
</style>
