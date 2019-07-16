<!-- 项目相关文档管理 -->
<template lang="html">
  <div class="project_file">
    <p class="file_reload">
      <i class="el-icon-refresh"></i>
    </p>
    <div class="" style="minHeight:500px;">
      <el-row>
        <el-col :span="12"><div class="fileMes_title">项目名称</div></el-col>
        <el-col :span="6"><div class="fileMes_title">局点</div></el-col>
        <el-col :span="3"><div class="fileMes_title">文档管理</div></el-col>
        <el-col :span="3"><div class="fileMes_title">验货单管理</div></el-col>
      </el-row>
      <el-row class="operTwo" v-for="(proMes,index) in fileList" :key="'proMes'+index">
        <el-col :span="12"><div class="file_con">{{proMes.name}}</div></el-col>
        <el-col :span="6"><div class="file_con">{{proMes.point}}</div></el-col>
        <el-col :span="3"><div class="file_con">
          <i class="el-icon-upload" @click="fileUp(index)"></i>
        </div></el-col>
        <el-col :span="3"><div class="file_con">
          <i class="el-icon-edit-outline" @click="insUp(index)"></i>
        </div></el-col>
      </el-row>
    </div>
    <!-- 分页器 -->
    <p class="project_page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :total="pageNum">
      </el-pagination>
    </p>
    <!-- 项目文档上传 -->
    <div class="firstPerBox" ref="filePerBox" v-if="fileBox">
      <p class="mes_close"><i class="el-icon-close" @click="closeFileBox()"></i></p>
      <p class="mes_titleOne">
        <span>项目文档</span>
      </p>
      <div class="file_point" v-for="(pointFile,index) in pointFileList" :key="'PointFile'+index" v-if="fileConBox">
        <p class="file_title">局点信息</p>
        <p class="file_place">地点:&nbsp;&nbsp;{{pointFile.place}}</p>
        <p class="file_place">详细地址:&nbsp;&nbsp;{{pointFile.address}}</p>
        <ul>
          <li v-for="(fileUp,index) in pointFile.children" :key="'FileUp'+index">
            <span>{{fileUp}}:</span>
            <el-input type="primary" style="width:600px;"></el-input>
            <input type="file" name="" value="">
            <el-button type="primary" icon="el-icon-search" size="small">浏览文件</el-button>
            <el-button type="primary" icon="el-icon-upload" size="small">上传</el-button>
            <a href="http://www.baidu.com">
              <el-button type="primary" icon="el-icon-download" size="small">下载模板</el-button>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 验货单上传 -->
    <div class="firstPerBox" ref="insPerBox" v-if="insBox">
      <p class="mes_close"><i class="el-icon-close" @click="closeInsBox()"></i></p>
      <p class="mes_titleOne">
        <span>验货单</span>
      </p>
      <div class="ins_point"  v-for="(pointIns,key) in pointInsList" v-if="insConBox">
        <p class="file_title">局点信息</p>
        <p class="file_place">地点:&nbsp;&nbsp;{{pointIns.place}}</p>
        <p class="file_place">详细地址:&nbsp;&nbsp;{{pointIns.address}}</p>
        <p class="file_place">Excel导入:
          <el-input type="primary" size='small' style="width:500px;" disab></el-input>
          <el-button type="primary" size="small" icon="el-icon-search">浏览文件</el-button>
          <el-button type="primary" size="small" icon="el-icon-d-arrow-left">导入Excel</el-button>
          <a href="http://www.baidu.com">
            <el-button type="primary" size="small" icon="el-icon-download">下载模板</el-button>
          </a>
          <el-button type="primary" size="small" icon="el-icon-d-arrow-right">导出Excel</el-button>
          <span class="place_mask"></span>
          <input type="file" name="" value="" class="upBtnPlace">
        </p>
        <ul>
          <li v-for="(tableMes,index) in pointIns.children">
            <p class="table_title"><span>设备{{tableMes.num}}</span><el-button type="primary" icon="el-icon-delete" size="small" style="margin-left:100px;" @click="delIns(key,index)">删除</el-button></p>
            <p class="table_mes">
              <span>网元名<font style="color:red;">*</font></span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入网元名" v-model="tableMes.unitName"></el-input>
              <span>设备型号</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入设备型号" v-model="tableMes.modelName"></el-input>
              <span>整机、机框条码</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入整机、机框条码" v-model="tableMes.barCodeName"></el-input>
            </p>
            <p class="table_mes">
              <span>省份</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入省份" v-model="tableMes.vinceName"></el-input>
              <span>城市</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入城市" v-model="tableMes.cityName"></el-input>
              <span>地址</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入详细地址" v-model="tableMes.address"></el-input>
            </p>
            <p class="table_mes">
              <span>主机版本</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入主机版本" v-model="tableMes.hostName"></el-input>
              <span>补丁版本</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入补丁版本" v-model="tableMes.patchName"></el-input>
              <span>槽位号及单板名称</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入槽位号及单板名称" v-model="tableMes.soltName"></el-input>
            </p>
            <p class="table_mes">
              <span>单板型号</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入单板型号" v-model="tableMes.vennerName"></el-input>
              <span>单板条码</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入单板条码" v-model="tableMes.vCodeName"></el-input>
              <span>单板版本(软件)</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入单板版本(软件)" v-model="tableMes.appliName"></el-input>
            </p>
            <p style="width:95%;margin:0 auto;margin-top:15px;">
              <span style="fontSize:13px;width:110px;textAlign:center;display:inline-block;">备注</span>
              <el-input type="primary" style="width:90.5%;" size="small" placeholder="请输入备注" v-model="tableMes.remark"></el-input>
            </p>
          </li>
        </ul>
        <p class="table_oper">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="pushTable(key)">添加</el-button>
          <el-button type="primary" icon="el-icon-upload" size="small">提交</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      fileBox:false,//项目文档上传
      fileConBox:false,//项目上文内容
      insBox:false,//验货单上传
      insConBox:false,//验货单内容
      fileList:[
        {
          name:'爱奇艺2018Q4网络设备采购95期_第四批、第五批',
          point:'北京-北京市'
        },
        {
          name:'1Y01001812090L民生银行北京分行安防',
          point:'天津-天津市'
        }
      ],
      pageNum:10,//总页数
      currentPage3:1,//分页器类型
      pointFileList:[
        {
          place:'国外/国外',
          address:'纽约市',
          children:[
            '项目经理认命','开工检查项','会议纪要','技术方案'
          ]
        },
        {
          place:'中国/北京',
          address:'海淀区马连洼北路8号',
          children:[
            '项目经理认命','开工检查项','会议纪要'
          ]
        }
      ],
      pointInsList:[
        {
          place:'国外/国外',
          address:'纽约市',
          children:[
            {
              num:1,
              unitName:null,//网元名称
              modelName:null,//设备型号
              barCodeName:null,//整机条码
              vinceName:null,//省份
              cityName:null,//城市
              address:null,//详细地址
              hostName:null,//主机版本
              patchName:null,//补丁版本
              soltName:null,//槽位号
              vennerName:null,//单板型号
              vCodeName:null,//单板条码
              appliName:null,//软件版本
              remark:null,//备注
            },
          ]
        }
      ],
    }
  },
  methods:{
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
    closeFileBox(){//关闭项目文档
      this.$refs.filePerBox.style.width='300px';
      this.$refs.filePerBox.style.minHeight='200px';
      setTimeout(()=>{
        this.fileConBox=false;
      },100)
      setTimeout(()=>{
        this.fileBox=false;
      },300)
    },
    fileUp(index){//项目文档
      this.fileBox=true;
      setTimeout(()=>{
        this.fileConBox=true;
      },250)
      setTimeout(()=>{
        this.$refs.filePerBox.style.width='100%';
        this.$refs.filePerBox.style.minHeight='100%';
      })
    },
    insUp(index){//验货单
      this.insBox=true;
      setTimeout(()=>{
        this.insConBox=true;
      },250)
      setTimeout(()=>{
        this.$refs.insPerBox.style.width='100%';
        this.$refs.insPerBox.style.minHeight='100%';
      });
    },
    closeInsBox(){//关闭验货单
      this.$refs.insPerBox.style.width='300px';
      this.$refs.insPerBox.style.minHeight='200px';
      setTimeout(()=>{
        this.insConBox=false
      },100)
      setTimeout(()=>{
        this.insBox=false;
      },300)
    },
    pushTable(key){//添加验货单设备
      this.pointInsList[key].children.push({
        num:this.pointInsList[key].children.length+1,
        unitName:null,//网元名称
        modelName:null,//设备型号
        barCodeName:null,//整机条码
        vinceName:null,//省份
        cityName:null,//城市
        address:null,//详细地址
        hostName:null,//主机版本
        patchName:null,//补丁版本
        soltName:null,//槽位号
        vennerName:null,//单板型号
        vCodeName:null,//单板条码
        appliName:null,//软件版本
        remark:null,//备注
      });
    },
    delIns(key,index){//删除验货单设备
      this.pointInsList[key].children.splice(index,1)
    },
  }
}
</script>

<style lang="scss" scoped>
.project_file{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
}
.file_reload{
  width: 100%;
  text-align: right;
  padding-top: 12px;
  padding-bottom: 10px;
  box-sizing: border-box;
  padding-right: 20px;
  i{
    color:#eb7a1d;
    font-size: 30px;
    cursor:pointer;
  }
}
.operTwo:nth-of-type(odd){
  background:#e5e4e4;
}
.fileMes_title{
  line-height: 40px;
  text-align: center;
  background: #eb7a1d;
  color:white;
}
.file_con{
  width: 100%;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  i{
    color:#eb7a1d;
    font-size: 20px;
    cursor:pointer;
  }
}
.project_page{
  width: 98%;
  text-align: right;
  margin-top: 20px;
  margin-bottom: 50px;
}
.firstPerBox{
  width: 300px;
  height: 200px;
  position: fixed;
  background: white;
  overflow: auto;
  left:0;
  top:0;
  transition: .5s all;
  padding-top: 70px;
  padding-bottom:70px;
  box-sizing: border-box;
  .mes_titleOne{
    width:200px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 30px;
    position: fixed;
    top:10px;
    z-index: 1000;
    span{
      font-size: 20px;
      font-weight: bold;
      color: rgba(235,122,29,1);
      border-bottom:2px solid  rgba(235,122,29,1);
    }
  }
  .mes_close{
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: right;
    box-sizing: border-box;
    position: fixed;
    top:0;
    border-bottom:1px solid #eee;
    background: white;
    z-index: 999;
    i{
      font-size: 35px;
      color: rgba(235,122,29,1);
      cursor:pointer;
      top: 12px;
      right:30px;
      position: absolute;
    }
  }
  .file_point{
    width: 95%;
    box-shadow: 0px 0px 5px #666;
    padding-bottom: 30px;
    margin:0 auto;
    margin-top: 10px;
    .file_title{
      box-sizing: border-box;
      padding-left: 10px;
      line-height: 40px;
      font-size: 20px;
      color:#eb7a1d;
      text-decoration: underline;
    }
    .file_place{
      box-sizing: border-box;
      padding-left: 10px;
      font-size: 14px;
      line-height: 30px;
    }
    ul{
      box-sizing: border-box;
      padding-left: 10px;
      border-top:1px solid #eee;
      padding-top: 10px;
      li{
        font-size: 14px;
        position: relative;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        input{
          width: 730px;
          background: red;
          position: absolute;
          height: 100%;
          left:120px;
          outline: none;
          opacity: 0;
          cursor: pointer;
        }
        span{
          width: 120px;
          text-align: center;
          display: inline-block;
        }
      }
    }
  }
  .ins_point{
      width: 95%;
      box-shadow: 0px 0px 5px #666;
      padding-bottom: 30px;
      margin:0 auto;
      margin-top: 10px;
      .file_title{
        box-sizing: border-box;
        padding-left: 10px;
        line-height: 40px;
        font-size: 20px;
        color:#eb7a1d;
        text-decoration: underline;
      }
      .file_place{
        box-sizing: border-box;
        padding-left: 10px;
        font-size: 14px;
        line-height: 30px;
        position: relative;
        .place_mask{
          display: inline-block;
          width: 500px;
          height:40px;
          opacity: 0;
          position: absolute;
          left:80px;
          top:-5px;
        }
        .upBtnPlace{
          width: 100px;
          height: 40px;
          cursor: pointer;
          position: absolute;
          top:-5px;
          left:585px;
          outline: none;
          opacity: 0;
        }
      }
      ul{
        li{
          width: 95%;
          margin:0 auto;
          box-sizing: border-box;
          padding: 10px;
          border:1px solid #eee;
          margin-top:20px;
          .table_title{
            width: 100%;
            text-align: center;
            line-height: 60px;
            position: relative;
            span{
              font-size: 20px;
              box-sizing: border-box;
              position: absolute;
              left:46.5%;
              bottom: -2px;
            }
          }
          .table_mes{
            width: 95%;
            margin:0 auto;
            margin-top: 15px;
            display: flex;
            justify-content: space-around;
            line-height: 40px;
            span{
              width: 120px;
              text-align: center;
              font-size: 13px;
            }
          }
        }
      }
      .table_oper{
        width: 100%;
        text-align: center;
        margin-top: 15px;
      }
    }
}
</style>
