<!-- 工作内容管理 -->
<template lang="html">
  <div class="work_content">
    <div class="work_search">
      日期范围:
      <el-date-picker
        v-model="workDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="searchWork()">搜索</el-button>
    </div>
    <p class="work_title">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="pushWork()">添加工作内容</el-button>
      <span>共有数据:&nbsp;<font style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</font>&nbsp;条</span>
      <el-tooltip class="item" effect="dark" content="刷新列表" placement="bottom">
        <i class="el-icon-refresh" style="color:#eb7a1d;fontSize:30px;cursor:pointer;" @click="getWorkList()"></i>
      </el-tooltip>
    </p>
    <div class="cust_con">
      <el-row>
        <el-col :span="2"><div class="cusMesTitle">序号</div></el-col>
        <el-col :span="9"><div class="cusMesTitle">项目名称/节点</div></el-col>
        <el-col :span="3"><div class="cusMesTitle">项目进程节点</div></el-col>
        <el-col :span="3"><div class="cusMesTitle">创建人</div></el-col>
        <el-col :span="2"><div class="cusMesTitle">时间</div></el-col>
        <el-col :span="3"><div class="cusMesTitle">阅览状态</div></el-col>
        <el-col :span="2"><div class="cusMesTitle">操作</div></el-col>
      </el-row>
      <p style="textAlign:center;lineHeight:80px;color:#666;" v-if="noWork">暂无更多记录</p>
      <div class="" style="minHeight:500px;" v-loading="workLoading">
        <el-row class="operTwo publicHover" v-for="(cusMes,index) in workList" :key="'CusMes'+index">
          <el-col :span="2"><div class="cusMesCon">{{cusMes.num+1}}</div></el-col>
          <el-tooltip class="item" effect="dark" :content="cusMes.projectName+'/'+cusMes.projectPointPlace" placement="bottom">
            <el-col :span="9"><div class="cusMesCon" style="cursor:pointer;">{{cusMes.projectName.substring(0,33)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="3"><div class="cusMesCon">{{cusMes.projectCourseNodeName}}</div></el-col>
          <el-col :span="3"><div class="cusMesCon">{{cusMes.engineerName}}</div></el-col>
          <el-col :span="2"><div class="cusMesCon">{{cusMes.startTimeSec}}</div></el-col>
          <el-col :span="3"><div class="cusMesCon">
            <span v-if="cusMes.checked" style="color:#eb7a1d;">已阅览</span>
            <span v-else style="color:#666;">未阅览</span>
          </div></el-col>
          <el-col :span="2"><div class="cusMesCon">
            <el-tooltip class="item" effect="dark" content="工作详情" placement="bottom">
              <i class="el-icon-document" style="color:#eb7a1d;" @click="workDetails(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除当前记录" placement="bottom">
              <i class="el-icon-delete" @click="delWork(index)"></i>
            </el-tooltip>
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
    <!-- 添加工作内容 -->
    <div class="">
      <el-dialog
        title="添加工作内容"
        :visible.sync="addWork"
        width="45%">
        <div class="add_work">
          <ul>
            <li><span style="color:red;">*</span>项目</li>
            <li><span style="color:red;">*</span>进程节点</li>
            <li><span style="color:red;">*</span>工作内容</li>
            <li style="marginTop:90px;"><span style="color:red;">*</span>工作时间</li>
            <li><span style="color:red;">*</span>工作时间段</li>
            <li>图片附件</li>
            <li>文档附件</li>
            <li>潜在风险描述</li>
          </ul>
          <ul>
            <li>
              <el-select v-model="addworkMes.pushName" @change="choosePro" placeholder="请选择项目" size="medium" style="width:365px;">
                <el-option
                  v-for="(item,index) in addworkMes.pushProList"
                  :key="index"
                  :label="item.projectName+'/'+item.placeName+'/'+item.address"
                  :value="item.projectName+'/'+item.placeName+'/'+item.address">
                </el-option>
              </el-select>
            </li>
            <li>
              <el-select v-model="addworkMes.pointName" @change="choosePoint" placeholder="请选择进程节点" size="medium" style="width:365px;">
                <el-option
                  v-for="item in addworkMes.pointList"
                  :key="item.id"
                  :label="item.courseNodeName"
                  :value="item.courseNodeName">
                </el-option>
              </el-select>
            </li>
            <li>
              <textarea @focus="getTear" @blur="clearTear" ref="proTear" v-model="addworkMes.pushContent" placeholder="请输入工作内容"></textarea>
            </li>
            <li>
              <el-date-picker
                 v-model="addworkMes.workDate"
                 type="date"
                 size="medium"
                 value-format="yyyy-MM-dd"
                 placeholder="选择日期">
               </el-date-picker>
            </li>
            <li style="marginTop:-5px;">
              <el-time-select
                style="width:130px;"
                placeholder="起始时间"
                v-model="startTime"
                :picker-options="{
                  start: '08:00',
                  step: '01:00',
                  end: '23:00'
                }">
              </el-time-select>
              <el-time-select
                style="width:130px;"
                placeholder="结束时间"
                v-model="endTime"
                :picker-options="{
                  start: '09:00',
                  step: '01:00',
                  end: '24:00',
                  minTime: startTime
                }">
              </el-time-select>
            </li>
            <li class="file_up">
              <el-input type="primary" v-model="addworkMes.picName" size="medium" style="width:240px;" placeholder="请选择图片附件"></el-input>
              <el-button type="primary" size="medium" icon="el-icon-upload">浏览文件</el-button>
              <input type="file" name="" value="" accept="image/*" class="file_dom" @change="upWorkPic">
            </li>
            <li class="file_up">
              <el-input type="primary" v-model="addworkMes.exName" size="medium" style="width:240px;" placeholder="请选择文档附件"></el-input>
              <el-button type="primary" size="medium" icon="el-icon-upload">浏览文件</el-button>
              <input type="file" name="" value="" class="file_dom"   Accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="upWorkEx">
            </li>
            <li>
              <textarea @focus="getTear" @blur="clearTear" ref="proTear" v-model="addworkMes.potenText" placeholder="若项目存在项目风险，请在此处进行描述反馈"></textarea>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addWork = false">取 消</el-button>
          <el-button type="primary" @click="subAddWork()">提 交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 工作内容详情 -->
    <div class="">
      <el-dialog
        title="工作详情"
        :visible.sync="workBox"
        width="45%">
        <div class="work_detials">
          <p class="work_left">
            <span>项目名称:</span>
          </p>
          <p class="work_right">
            {{workMes.projectName}}/{{workMes.projectPointPlace}}
          </p>
        </div>
        <div class="work_detials">
          <p class="work_left">
            <span>进程节点:</span>
          </p>
          <p class="work_right">
            {{workMes.projectCourseNodeName}}
          </p>
        </div>
        <div class="work_detials">
          <p class="work_left">
            <span>工作内容:</span>
          </p>
          <p class="work_right">
            {{workMes.content}}
          </p>
        </div>
        <div class="work_detials">
          <p class="work_left">
            <span>工作时间:</span>
          </p>
          <p class="work_right">
            {{workMes.startTimeSec}}
          </p>
        </div>
        <div class="work_detials">
          <p class="work_left">
            <span>文档附件:</span>
          </p>
          <p class="work_right" style="minHeight:15px;">
            <a :href="url+'/'+file.fileName" v-for="(file,index) in workMes.fileUploads" target="_blank">{{file.fileName}}</a>
          </p>
        </div>
        <div class="work_detials" style="marginTop:15px;">
          <p class="work_left">
            <span>图片附件:</span>
          </p>
          <div class="work_right">
            <viewer :images="workMes.imgUploads" style="width:100%;">
              <img v-for="(pic,index) in workMes.imgUploads"
              :key="'Skill'+index" :src="url+'/'+pic.fileName" alt=""
              style="width:40%;height:100px;margin-left:15px;margin-top:10px;cursor:pointer;border:1px solid #eb7a1d;border-radius:8px;"
              >
            </viewer>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="workBox = false" size="medium" type="primary">关&nbsp;闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      startTime:'09:00',
      endTime:'18:00',
      // 临时数据
      pageNum:10,//总页数
      currentPage3:1,//分页器类型
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
      workList:[],
      addWork:false,//添加工作内容
      restaurants:[],//查询返回列表
      cusName:null,//查询名称
      workBox:false,//工作内容详情
      workMes:{
        projectName:null,
        projectCourseNodeName:null,
        content:null,
        startTimeSec:null,
        fileUploads:[],
        projectPointPlace:null,
      },
      page:0,//页码
      dataLength:0,//数据总条数
      length:0,//数据排序
      proID:null,//添加项目选中ID
      addworkMes:{
        pushProList:[],//添加项目列表
        pushName:null,//添加项目名称
        pushProID:null,//添加项目ID
        pointName:null,//局点名称
        pointList:[],//添加项目选择局点
        pointID:null,//添加局点ID
        pushContent:null,//添加工作内容
        filePic:null,//图片文件
        fileEx:null,//文档文件
        picName:null,//图片名称
        exName:null,//文档名称
        potenText:null,//潜在风险
        workDate:null,//工作日期
      },
      workLoading:false,//日志加载
      workDate:[],//搜索日期
      noWork:false,//是否有日子
    }
  },
  watch:{
    addWork(val,oldVal){
      if(!val){
        this.addworkMes={
            pushProList:[],//添加项目列表
            pushName:null,//添加项目名称
            pushProID:null,//添加项目ID
            pointName:null,//局点名称
            pointList:[],//添加项目选择局点
            pointID:null,//添加局点ID
            pushContent:null,//添加工作内容
            filePic:null,//图片文件
            fileEx:null,//文档文件
            picName:null,//图片名称
            exName:null,//文档名称
            potenText:null,//潜在风险
            workDate:null,
        }
      }
    },
    workList(val,oldVal){
      if(val==null||val.length<1){
        this.noWork=true;
      }else{
        this.noWork=false;
      }
    }
  },
  created(){
    this.getWorkList()
  },
  methods:{
    getWorkList(){//获取工作内容列表
      let formdata=new FormData();
      formdata.append('engineerId',window.sessionStorage.getItem('engID'));
      formdata.append('page',this.page);
      formdata.append('size',10);
      this.workLoading=true;
      this.$axios.post(this.url+'/mobile/findWorkRecordListByEngineerId',formdata).then((res)=>{
        if(res.data.code==0){
          this.dataLength=res.data.data.totalElements;
          this.pageNum=res.data.data.totalPages*10;
          this.length=this.page*10;
          this.workList=res.data.data.content;
          this.workLoading=false;
          this.workList.forEach((e)=>{
            this.$set(e,'num',this.length++);
            let startDate=new Date(e.workTime);
            let sYear=startDate.getFullYear();
            let sMon=startDate.getMonth()+1;
            if(sMon<10){
              sMon='0'+sMon
            };
            let sDay=startDate.getDate();
            if(sDay<10){
              sDay='0'+sDay
            }
            let sTime=sYear+'-'+sMon+'-'+sDay;
            this.$set(e,'startTimeSec',sTime);
          })
        }else{
          this.workLoading=false;
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.workLoading=false;
        this.$message.error('未知错误,请联系管理员')
        // console.log(err)
      })
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.page=val-1;
      if(this.workDate!=null&&this.workDate.length>1){
        this.searchWork()
      }else{
        this.getWorkList()
      }
    },
    getTear(){//获取文本域焦点
      this.$refs.proTear.style.borderColor='#eb7a1d'
    },
    clearTear(){//失去文本域焦点
      this.$refs.proTear.style.borderColor='#DCDFE6'
    },
    workDetails(index){//项目详情
      this.workMes=this.workList[index];
      console.log(this.workList[index])
      this.workBox=true;
    },
    pushWork(){//添加项目
      let formdata=new FormData();
      const loading = this.$loading({
          lock: true,
          text: '拼命加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      formdata.append('engineerId',window.sessionStorage.getItem('engID'));
      this.$axios.post(this.url+'/mobile/findProjectPointAndProjectCourseNodeByEngineer',formdata).then((res)=>{
        if(res.data.code==0){
          let date=new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          if(month > 0 && month < 9) {
            month = '0' + month
          }
          let day = date.getDate();
          if(day > 0 && day < 9) {
            day = '0' + day
          }
          this.addworkMes.workDate = year + '-' + month + '-' + day;
          this.addworkMes.pushProList=res.data.data;
          this.addWork=true;
          loading.close()
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
      })
    },
    choosePro(val){//选择项目
      this.addworkMes.pushProList.forEach((e)=>{
        if(e.projectName+'/'+e.placeName==val){
          this.addworkMes.pushProID=e.id;
          this.addworkMes.pointList=e.usingProjectCourseNodeVOList;
        }
      })
    },
    choosePoint(val){//选择局点
      this.addworkMes.pointList.forEach((e)=>{
        if(e.courseNodeName==val){
          this.addworkMes.pointID=e.id;
        }
      });
    },
    upWorkPic(e){//上传日志图片
      this.addworkMes.picName=e.target.files[0].name;
      this.addworkMes.filePic=e.target.files[0];
    },
    upWorkEx(e){//上传文档文件
      this.addworkMes.exName=e.target.files[0].name;
      this.addworkMes.fileEx=e.target.files[0];
    },
    subAddWork(){//提交新增日志
      let _vm=this;
      let formdata=new FormData();
      if(_vm.addworkMes.pushProID==null||_vm.addworkMes.pushProID==''){
        _vm.$message.error('请选择项目')
      }else if(_vm.addworkMes.pointID==null||_vm.addworkMes.pointID==''){
        _vm.$message.error('请选择局点')
      }else if(_vm.addworkMes.pushContent==null||_vm.addworkMes.pushContent==''){
        _vm.$message.error('请输入工作内容')
      }else if(_vm.startTime==null||_vm.startTime==''){
        _vm.$message.error('请选择开始时间')
      }else if(_vm.endTime==null||_vm.endTime==''){
        _vm.$message.error('请选择结束时间')
      }else{
        formdata.append('engineerId',window.sessionStorage.getItem('engID'));
        formdata.append('projectCourseNodeId',_vm.addworkMes.pointID);
        formdata.append('content',_vm.addworkMes.pushContent);
        formdata.append('startTime',Number(_vm.startTime.substring(0,2)));
        formdata.append('endTime',Number(_vm.endTime.substring(0,2)));

        formdata.append('workTime',_vm.addworkMes.workDate);
        if(_vm.addworkMes.filePic!=null&&_vm.addworkMes.filePic!=''){
          formdata.append('imageFiles',_vm.addworkMes.filePic);
        }
        if(_vm.addworkMes.fileEx!=null&&_vm.addworkMes.fileEx!=''){
          formdata.append('otherFiles',_vm.addworkMes.fileEx);
        };
        if(_vm.addworkMes.potenText!=null&&_vm.addworkMes.potenText!=''){
          formdata.append('warnRecordContent',_vm.addworkMes.potenText);
        };
        _vm.$axios.post(_vm.url+'/mobile/saveWorkRecord',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.$message.success('添加成功');
            _vm.addWork=false;
            _vm.getWorkList();
          }else{
            _vm.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          _vm.$message.error('未知错误,请联系管理员')
        })
      }
    },
    searchWork(){//搜索日志
      if(this.workDate!=null&&this.workDate.length>1){
        let formdata=new FormData();
        formdata.append('engineerId',window.sessionStorage.getItem('engID'));
        formdata.append('page',this.page);
        formdata.append('size',10);
        formdata.append('beginTime',this.workDate[0])
        formdata.append('endTime',this.workDate[1])
        this.workLoading=true;
        this.$axios.post(this.url+'/mobile/findWorkRecordListByEngineerId',formdata).then((res)=>{
          if(res.data.code==0){
            this.dataLength=res.data.data.totalElements;
            this.pageNum=res.data.data.totalPages*10;
            this.length=this.page*10;
            this.workList=res.data.data.content;
            this.workLoading=false;
            this.workList.forEach((e)=>{
              this.$set(e,'num',this.length++);
              let startDate=new Date(e.workTime);
              let sYear=startDate.getFullYear();
              let sMon=startDate.getMonth()+1;
              if(sMon<10){
                sMon='0'+sMon
              };
              let sDay=startDate.getDate();
              if(sDay<10){
                sDay='0'+sDay
              }
              let sTime=sYear+'-'+sMon+'-'+sDay;
              this.$set(e,'startTimeSec',sTime);
            })
          }else{
            this.workLoading=false;
            this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.workLoading=false;
          this.$message.error('未知错误,请联系管理员')
          // console.log(err)
        })
      }else{
        this.$message.error('未选择时间')
      }
    },
    delWork(index){//删除日志
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         let formdata=new FormData();
         formdata.append('id',this.workList[index].id)
         this.$axios.post(this.url+'/deleteWorkRecord',formdata).then((res)=>{
           if(res.data.code==0){
             this.$message.success('删除成功');
             this.getWorkList()
           }else{
             this.$message.error(res.data.msg)
           }
         })
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         });
       });
    },
  }
}
</script>

<style lang="scss" scoped>
.work_content{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .work_search{
    width: 100%;
    text-align: center;
    line-height: 120px;
  }
  .work_title{
    width: 100%;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    position: relative;
    span{
      margin-left: 70%;
      position: absolute;
      line-height: 40px;
      right: 60px;
      font-size: 16px;
    }
    i{
      position: absolute;
      right:10px;
      top:5px;
    }
  }
  .cust_con{
    min-height: 500px;
    .operTwo:nth-of-type(odd){
      background:#e5e4e4;
    }
    margin-top: 5px;
    .cusMesTitle{
      line-height: 40px;
      text-align: center;
      background: #eb7a1d;
      color:white;
    }
    .cusMesCon{
      line-height: 50px;
      text-align: center;
      font-size: 14px;
      i{
        font-size: 20px;
        cursor:pointer;
        margin-left: 5px;
        margin-top:3px;
      }
    }
  }
  .project_page{
    width: 98%;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .add_work{
    width: 100%;
    display: flex;
    ul{
      li{
        line-height: 50px;
      }
    }
    ul:first-child{
      width: 30%;
      li{
        text-align: right;
        box-sizing: border-box;
        padding-right: 20px;
      }
    }
    ul:last-child{
      width: 70%;
      .file_up{
        position: relative;
        .file_dom{
          display: inline-block;
          width: 365px;
          height: 100%;
          position: absolute;
          left: 0;
          top:0;
          opacity: 0;
        }
      }
      li{
        textarea{
          outline: none;
          border:1px solid #DCDFE6;
          border-radius: 4px;
          padding: 13px;
          box-sizing: border-box;
          resize:none;
          height:120px;
          width:365px;
          transition: .3s all;
        }
        textarea::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #bebec8;
        }
        textarea:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #bebec8;
        }
        textarea::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #bebec8;
        }
        textarea::-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #bebec8;

        }
      }
    }
  }
  .work_detials{
    width: 95%;
    margin:0 auto;
    display: flex;
    color:#333;
    font-size: 15px;
    margin-bottom: 15px;
    .work_left{
      width: 25%;
      position: relative;
      span{
        position: absolute;
        top:0;
        right:20px;
      }
    }
    .work_right{
      width: 75%;
    }
  }
}
</style>
