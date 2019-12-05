<!-- 项目相关文档管理 -->
<template lang="html">
  <div class="project_file">
    <p class="file_reload">
      <i class="el-icon-refresh"></i>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
    </p>
    <div class="">
      <el-row>
        <el-col :span="12"><div class="fileMes_title">项目名称</div></el-col>
        <el-col :span="6"><div class="fileMes_title">局点</div></el-col>
        <el-col :span="3"><div class="fileMes_title">文档管理</div></el-col>
        <el-col :span="3"><div class="fileMes_title">验货单管理</div></el-col>
      </el-row>
      <div class="" style="minHeight:500px;" v-loading="loadFile">
        <p style="textAlign:center;lineHeight:80px;color:#666;" v-if="noFile">暂无更多数据</p>
        <el-row class="operTwo publicHover" v-for="(proMes,indexFile) in proList" :key="'proMes'+indexFile">
          <el-col :span="12"><div class="file_con">{{proMes.projectPointVO.projectName}}</div></el-col>
          <el-col :span="6" v-if="proMes.projectPointVO.placeName!=null&&proMes.projectPointVO.placeName!=''"><div class="file_con">{{proMes.projectPointVO.placeName}}</div></el-col>
          <el-col :span="6" v-else><div class="file_con">-</div></el-col>
          <el-col :span="3"><div class="file_con">
            <i class="el-icon-upload" @click="fileUp(indexFile)"></i>
          </div></el-col>
          <el-col :span="3"><div class="file_con">
            <i class="el-icon-edit-outline" @click="insUp(indexFile)"></i>
          </div></el-col>
        </el-row>
      </div>
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
      <div class="file_point" v-if="fileConBox">
        <p class="file_title">局点信息</p>
        <p class="file_place">地点:&nbsp;&nbsp;{{pointFileMes.place}}</p>
        <p class="file_place">详细地址:&nbsp;&nbsp;{{pointFileMes.address}}</p>
        <ul>
          <li v-for="(fileUp,index) in pointFileList" :key="'FileUp'+index">
            <span>{{fileUp.name}}:</span>
            <el-input type="primary" style="width:600px;" v-model="fileUp.filename"></el-input>
            <input type="file" name="" value="" @change="upFile($event,index)"  Accept=".csv, .docx,.doc,.pdf,application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            <el-button type="primary" icon="el-icon-search" size="small">浏览文件</el-button>
            <el-button type="primary" icon="el-icon-upload" size="small" @click="upSerFile(index)">上传</el-button>
            <a  :href="url+fileUp.path" target="_blank">
              <el-button type="primary" icon="el-icon-download" size="small">下载模板</el-button>
            </a>
            <p v-for="(fileBack,indexBack) in backFileList" v-if="fileBack.fileType==fileUp.code" style="width:100%;textAlign:left;box-sizing:border-box;paddingLeft:130px;">
              <a :href="url+'/'+fileBack.fileName" target="_blank">{{fileBack.fileName}}</a>
              <i class="el-icon-delete" style="fontSize:16px;margin-left:10px;cursor:pointer;" @click="delServiceFile(index,indexBack)"></i>
            </p>
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
      <p  style="line-height:100px;fontSize:18px;color:#666;width:100%;textAlign:center;display:none;" ref="InsNoData">暂无局点，请前往建立</p>
      <div class="ins_point" v-if="insConBox">
        <p class="file_title">局点信息</p>
        <p class="file_place">地点:&nbsp;&nbsp;{{pointInsList.placeName}}</p>
        <p class="file_place">详细地址:&nbsp;&nbsp;{{pointInsList.address}}</p>
        <p class="file_place">Excel导入:
          <el-input type="primary" size='small' style="width:500px;" disab v-model="pointInsList.fileName"></el-input>
          <el-button type="primary" size="small" icon="el-icon-search">浏览文件</el-button>
          <el-button type="primary" size="small" icon="el-icon-d-arrow-left" @click="upInsFile()">导入Excel</el-button>
          <a :href="url+'/inspectionTemplate.xlsx'" target="_blank">
            <el-button type="primary" size="small" icon="el-icon-download">下载模板</el-button>
          </a>
          <el-button type="primary" size="small" icon="el-icon-d-arrow-right">导出Excel</el-button>
          <span class="place_mask"></span>
          <input type="file" name="" value="" @change="choseInsFile" Accept=".csv, .docx,.doc,.pdf,application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" class="upBtnPlace">
        </p>
        <ul>
          <li v-for="(tableMes,index) in pointInsList.inspectionVOList">
            <p class="table_title"><span>设备{{tableMes.num+1}}</span><el-button type="primary" icon="el-icon-delete" size="small" style="margin-left:20px;marginTop:-5px;" @click="delIns(index)">删除</el-button></p>
            <p class="table_mes">
              <span>网元名<font style="color:red;">*</font></span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入网元名" v-model="tableMes.name"></el-input>
              <span>设备型号</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入设备型号" v-model="tableMes.model"></el-input>
              <span>整机、机框条码</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入整机、机框条码" v-model="tableMes.code"></el-input>
            </p>
            <p class="table_mes">
              <span>省份</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入省份" v-model="tableMes.province"></el-input>
              <span>城市</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入城市" v-model="tableMes.city"></el-input>
              <span>地址</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入详细地址" v-model="tableMes.address"></el-input>
            </p>
            <p class="table_mes">
              <span>主机版本</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入主机版本" v-model="tableMes.hostVersion"></el-input>
              <span>补丁版本</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入补丁版本" v-model="tableMes.patchVersion"></el-input>
              <span>槽位号及单板名称</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入槽位号及单板名称" v-model="tableMes.boardName"></el-input>
            </p>
            <p class="table_mes">
              <span>单板型号</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入单板型号" v-model="tableMes.boardModel"></el-input>
              <span>单板条码</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入单板条码" v-model="tableMes.boardCode"></el-input>
              <span>单板版本(软件)</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入单板版本(软件)" v-model="tableMes.boardVersion"></el-input>
            </p>
            <p style="width:95%;margin:0 auto;margin-top:15px;">
              <span style="fontSize:13px;width:110px;textAlign:center;display:inline-block;">备注</span>
              <el-input type="primary" style="width:90.5%;" size="small" placeholder="请输入备注" v-model="tableMes.remark"></el-input>
            </p>
          </li>
        </ul>
        <p class="table_oper">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="pushTable()">添加</el-button>
          <el-button type="primary" icon="el-icon-upload" size="small" @click="upSerIns()">提交</el-button>
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
      proList:[],
      pageNum:10,//总页数
      currentPage3:1,//分页器类型
      pointFileList:[],
      pointFileMes:{
        proID:null,//项目ID
        pointID:null,//局点ID
        place:null,//局点地址
        address:null,//详细地址
      },
      pointInsList:{},
      page:0,//页码
      dataLength:0,//数据总和
      loadFile:false,//数据加载
      backFileList:[],//回显文件列表
      insNum:0,//验货单排序
      noFile:false,//无数据
    }
  },
  watch:{
    insBox(val,oldVal){
      if(!val){
        // this.getProList()
      }
    },
    proList(val,oldVal){
      if(val==null||val.length<1){
        this.noFile=true;
      }else{
        this.noFile=false;
      }
    }
  },
  created(){
    this.getProList()
  },
  methods:{
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.page=val-1;
      this.getProList()
    },
    getProList(){//获取文档列表
      let _vn=this;
      _vn.loadFile=true;
      _vn.proLoad=true;
      let formdata=new FormData();
      formdata.append('page',_vn.page);
      formdata.append('engineerId',window.sessionStorage.getItem('engID'));
      _vn.$axios.post(_vn.url+'/findPersonnelRecordByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vn.loadFile=false;
          _vn.dataLength=res.data.data.totalElements;
          _vn.proList=res.data.data.content;
          _vn.pageNum=res.data.data.totalPages*10;
        }else{
          _vn.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        _vn.$message.error('未知错误,请联系管理员');
      })
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
    fileUp(indexFile){//项目文档
      this.$axios.get(this.url+'/projectFileTypeList').then((res)=>{
        if(res.data.code==0){
          this.pointFileList=res.data.data;
          this.pointFileList.forEach((e)=>{
            this.$set(e,'filename',null)
            this.$set(e,'file',null)
          });
          this.pointFileMes.proID=this.proList[indexFile].projectPointVO.projectId;
          this.pointFileMes.pointID=this.proList[indexFile].projectPointVO.id;
          this.backFileList=this.proList[indexFile].projectPointVO.projectFileVOList;
          this.pointFileMes.place=this.proList[indexFile].projectPointVO.placeName;
          this.pointFileMes.address=this.proList[indexFile].projectPointVO.address;
          this.fileBox=true;
          setTimeout(()=>{
            this.fileConBox=true;
          },250)
          setTimeout(()=>{
            this.$refs.filePerBox.style.width='100%';
            this.$refs.filePerBox.style.minHeight='100%';
          })
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
      })

    },
    insUp(indexFile){//验货单
      let _vm=this;
      _vm.pointInsList=this.proList[indexFile].projectPointVO;
      _vm.insNum=0;
      _vm.$set(_vm.pointInsList,'fileName',null)
      _vm.$set(_vm.pointInsList,'file',null)
      if(_vm.pointInsList.inspectionVOList==null||_vm.pointInsList.inspectionVOList==''){
        _vm.pointInsList.inspectionVOList=[
          {
              num:0,
              name:null,//网元名称
              model:null,//设备型号
              code:null,//整机条码
              province:null,//省份
              city:null,//城市
              address:null,//详细地址
              hostVersion:null,//主机版本
              patchVersion:null,//补丁版本
              boardName:null,//槽位号
              boardModel:null,//单板型号
              boardCode:null,//单板条码
              boardVersion:null,//软件版本
              remark:null,//备注
           }
          ];
      }else{
        _vm.pointInsList.inspectionVOList.forEach((x)=>{
          _vm.$set(x,'num',_vm.insNum++);
        })
      }
      setTimeout(()=>{
        this.insConBox=true;
      },250)
      this.insBox=true;
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
    pushTable(){//添加验货单设备
      this.pointInsList.inspectionVOList.push({
        num:this.pointInsList.inspectionVOList.length,
        name:null,//网元名称
        model:null,//设备型号
        code:null,//整机条码
        province:null,//省份
        city:null,//城市
        address:null,//详细地址
        hostVersion:null,//主机版本
        patchVersion:null,//补丁版本
        boardName:null,//槽位号
        boardModel:null,//单板型号
        boardCode:null,//单板条码
        boardVersion:null,//软件版本
        remark:null,//备注
      });
    },
    delIns(index){//删除验货单设备
      if(this.pointInsList.inspectionVOList[index].id!=undefined){
        let formdata=new FormData();
        formdata.append('inspectionId',this.pointInsList.inspectionVOList[index].id);
        this.$axios.post(this.url+'/deleteInspection',formdata).then((res)=>{
          if(res.data.code==0){
            this.$message.success('删除设备成功');
            this.pointInsList.inspectionVOList.splice(index,1);
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.$message.error('未知错误,请联系管理员')
        })
      }else{
        this.pointInsList.inspectionVOList.splice(index,1);
      }
    },
    choseInsFile(e){//选择验货单文件
      this.pointInsList.fileName=e.target.files[0].name;
      this.pointInsList.file=e.target.files[0];
    },
    upSerIns(){//上传验货单
      let vm=this;
      let formdata=new FormData();
      for(let i in vm.pointInsList.inspectionVOList){
        if(vm.pointInsList.inspectionVOList[i].name==null||vm.pointInsList.inspectionVOList[i].name==''){
          vm.$message.error('请输入网元名称');
        }else{
          formdata.append('inspectionFormList['+i+'].name',vm.pointInsList.inspectionVOList[i].name);
          formdata.append('inspectionFormList['+i+'].projectPointId',vm.pointInsList.id);
          formdata.append('inspectionFormList['+i+'].projectId',vm.pointInsList.projectId);
          if(vm.pointInsList.inspectionVOList[i].model!=null&&vm.pointInsList.inspectionVOList[i].model!=''){
            formdata.append('inspectionFormList['+i+'].model',vm.pointInsList.inspectionVOList[i].model);
          };
          if(vm.pointInsList.inspectionVOList[i].code!=null&&vm.pointInsList.inspectionVOList[i].code!=''){
            formdata.append('inspectionFormList['+i+'].code',vm.pointInsList.inspectionVOList[i].code);
          };
          if(vm.pointInsList.inspectionVOList[i].province!=null&&vm.pointInsList.inspectionVOList[i].province!=''){
            formdata.append('inspectionFormList['+i+'].province',vm.pointInsList.inspectionVOList[i].province);
          };
          if(vm.pointInsList.inspectionVOList[i].city!=null&&vm.pointInsList.inspectionVOList[i].city!=''){
            formdata.append('inspectionFormList['+i+'].city',vm.pointInsList.inspectionVOList[i].city);
          };
          if(vm.pointInsList.inspectionVOList[i].address!=null&&vm.pointInsList.inspectionVOList[i].address!=''){
            formdata.append('inspectionFormList['+i+'].address',vm.pointInsList.inspectionVOList[i].address);
          };
          if(vm.pointInsList.inspectionVOList[i].hostVersion!=null&&vm.pointInsList.inspectionVOList[i].hostVersion!=''){
            formdata.append('inspectionFormList['+i+'].hostVersion',vm.pointInsList.inspectionVOList[i].hostVersion);
          };
          if(vm.pointInsList.inspectionVOList[i].patchVersion!=null&&vm.pointInsList.inspectionVOList[i].patchVersion!=''){
            formdata.append('inspectionFormList['+i+'].patchVersion',vm.pointInsList.inspectionVOList[i].patchVersion);
          };
          if(vm.pointInsList.inspectionVOList[i].boardName!=null&&vm.pointInsList.inspectionVOList[i].boardName!=''){
            formdata.append('inspectionFormList['+i+'].boardName',vm.pointInsList.inspectionVOList[i].boardName);
          };
          if(vm.pointInsList.inspectionVOList[i].boardModel!=null&&vm.pointInsList.inspectionVOList[i].boardModel!=''){
            formdata.append('inspectionFormList['+i+'].boardModel',vm.pointInsList.inspectionVOList[i].boardModel);
          };
          if(vm.pointInsList.inspectionVOList[i].boardCode!=null&&vm.pointInsList.inspectionVOList[i].boardCode!=''){
            formdata.append('inspectionFormList['+i+'].boardCode',vm.pointInsList.inspectionVOList[i].boardCode);
          };
          if(vm.pointInsList.inspectionVOList[i].boardVersion!=null&&vm.pointInsList.inspectionVOList[i].boardVersion!=''){
            formdata.append('inspectionFormList['+i+'].boardVersion',vm.pointInsList.inspectionVOList[i].boardVersion);
          };
          if(vm.pointInsList.inspectionVOList[i].remark!=null&&vm.pointInsList.inspectionVOList[i].remark!=''){
            formdata.append('inspectionFormList['+i+'].remark',vm.pointInsList.inspectionVOList[i].remark);
          };
          if(vm.pointInsList.inspectionVOList[i].id!=undefined&&vm.pointInsList.inspectionVOList[i].id!=null){
            formdata.append('inspectionFormList['+i+'].id',vm.pointInsList.inspectionVOList[i].id);
          }
        };
      };
      vm.$axios.post(vm.url+'/saveInspectionList',formdata).then((res)=>{
        if(res.data.code==0){
          vm.$message.success('编辑验货单成功')
          vm.pointInsList.inspectionVOList=res.data.data;
          vm.insNum=0;
          this.pointInsList.inspectionVOList.forEach((e)=>{
            vm.$set(e,'num',vm.insNum++);
          })
        }else{
          vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        vm.$message.error('未知错误,请联系管理员')
      })
    },
    upInsFile(){//上传局点文件
      let formdata=new FormData();
      if(this.pointInsList.file!=null&&this.pointInsList.fileName!=null){
        formdata.append('projectId',this.pointInsList.projectId);
        formdata.append('projectPointId',this.pointInsList.id);
        formdata.append('file',this.pointInsList.file);
        this.insNum=0;
        this.$axios.post(this.url+'/importInspectionExcel',formdata).then((res)=>{
          if(res.data.code==0){
            this.$message.success('导入成功');
            this.pointInsList.inspectionVOList=res.data.data;
            this.pointInsList.inspectionVOList.forEach((e)=>{
              this.$set(e,'num',this.insNum++);
            })
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.$message.error('未知错误,请联系管理员')
        })
      }else{
        this.$message.error('未选择上传文件')
      }
    },
    upFile(e,index){//选择文件
      this.pointFileList[index].file=e.target.files[0];
      this.pointFileList[index].filename=e.target.files[0].name;
    },
    upSerFile(index){//上传选择文件
      if(this.pointFileList[index].file==null||this.pointFileList[index].filename==null){
        this.$message.error('没有选择文件哦')
      }else{
        let formdata=new FormData();
        formdata.append('projectId',this.pointFileMes.proID);
        formdata.append('projectPointId',this.pointFileMes.pointID);
        formdata.append('fileType',this.pointFileList[index].code);
        formdata.append('file',this.pointFileList[index].file);
        this.$axios.post(this.url+'/saveProjectFile',formdata).then((res)=>{
          if(res.data.code==0){
            this.$message.success('上传文档成功')
            this.backFileList.push(res.data.data)
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.$message.error('未知错误,请联系管理员')
        })
      }
    },
    delServiceFile(index,indexBack){//删除已上传文档
      let formdata=new FormData();
      formdata.append('projectFileId',this.backFileList[indexBack].id);
      this.$axios.post(this.url+'/deleteProjectFile',formdata).then((res)=>{
        if(res.data.code==0){
          this.$message.success('删除文件成功')
          this.backFileList.splice(indexBack,1);
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
      })
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
  position: relative;
  .dataLength{
    position: absolute;
    right:60px;
    top:16px;
  }
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
  line-height: 50px;
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
  z-index: 10;
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
        // height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        input{
          width: 730px;
          background: red;
          position: absolute;
          height: 50px;
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
              box-sizing: border-box;
              margin-top:5px;
              height: 100%;
              // background: red;
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
