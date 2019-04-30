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
          <el-col :span="5"><div class="projectTitle">项目名称</div></el-col>
          <el-col :span="2"><div class="projectTitle">项目状态</div></el-col>
          <el-col :span="2"><div class="projectTitle">产品线</div></el-col>
          <el-col :span="2"><div class="projectTitle">项目负责人</div></el-col>
          <el-col :span="2"><div class="projectTitle">创建时间</div></el-col>
          <el-col :span="2"><div class="projectTitle">入场时间</div></el-col>
          <el-col :span="2"><div class="projectTitle">完工时间</div></el-col>
          <el-col :span="2"><div class="projectTitle">验收时间</div></el-col>
          <el-col :span="2"><div class="projectTitle">进度</div></el-col>
          <el-col :span="2"><div class="projectTitle">浏览</div></el-col>
        </el-row>
      </div>
      <div class="project_con">
        <el-row class="el_con" v-for="(pro,index) in proList" :key="index">
          <el-col :span="1"><div class="projectCon">{{pro.num+1}}</div></el-col>
          <el-tooltip class="item" effect="dark" :content="pro.name" placement="bottom">
            <el-col :span="5" v-if="pro.name!=null&&pro.name!='null'"><div class="projectCon" style="cursor:pointer;">{{pro.name.substring(0,10)}}...</div></el-col>
            <el-col :span="5" v-else><div class="projectCon" style="cursor:pointer;">-</div></el-col>
          </el-tooltip>
          <el-col :span="2"><div class="projectCon status">
            <span v-show="pro.state==2" style="background:rgb(255, 255, 153);">停工</span>
            <span v-show="pro.state==0" style="background:rgb(255, 140, 105);">未开工</span>
            <span v-show="pro.state==1" style="background:rgb(204, 255, 153);">开工</span>
            <span v-show="pro.state==4" style="background:rgb(102, 204, 255);">验收</span>
            <span v-show="pro.state==3" style="background:rgb(204, 255, 255);">完工</span>
          </div></el-col>
          <el-col :span="2" v-if="pro.technologyName!=null&&pro.technologyName!='null'"><div class="projectCon">{{pro.technologyName}}</div></el-col>
          <el-col :span="2" v-else><div class="projectCon">-</div></el-col>
          <el-col :span="2"><div class="projectCon">{{pro.creatorName}}</div></el-col>
          <el-col :span="2"><div class="projectCon">{{pro.createTimeSec}}</div></el-col>
          <el-col :span="2" v-if="pro.startTime!=null&&pro.startTime!='null'"><div class="projectCon">{{pro.entranceTimeSec}}</div></el-col>
          <el-col :span="2" v-else><div class="projectCon">-</div></el-col>
          <el-col :span="2" v-if="pro.finishTime!=null&&pro.finishTime!='null'"><div class="projectCon">{{pro.finishTimeSec}}</div></el-col>
          <el-col :span="2" v-else><div class="projectCon">-</div></el-col>
          <el-col :span="2" v-if="pro.acceptTime!=null&&pro.acceptTime!='null'"><div class="projectCon">{{pro.acceptTimeSec}}</div></el-col>
          <el-col :span="2" v-else><div class="projectCon">-</div></el-col>
          <el-col :span="2"><div class="projectCon">{{pro.schedule}}%</div></el-col>
          <el-col :span="2"><div class="projectCon">
            <i class="el-icon-view" style="color:#eb7a1d;font-size:23px;cursor:pointer;" @click="hasDetials(index)"></i>
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
        <div class="" v-show="showMes" style="min-height:650px;">
          <ul class="con_mes">
            <li>客户名称:&nbsp;&nbsp;&nbsp;<span>{{projectMes.customerName}}</span></li>
            <li class="flex">
              <p>项目名称:&nbsp;&nbsp;&nbsp;<span>{{projectMes.name}}</span></p>
              <p>项目类型:&nbsp;&nbsp;&nbsp;<span v-if="projectMes.projectType">{{projectMes.projectType.name}}</span><span v-else>-</span></p>
            </li>
            <li>项目内容:&nbsp;&nbsp;&nbsp;<span>{{projectMes.content}}</span></li>
            <li class="flex">
              <p>联系人:&nbsp;&nbsp;&nbsp;<span>{{projectMes.linkman}}</span></p>
              <p>联系电话:&nbsp;&nbsp;&nbsp;<span>{{projectMes.phone}}</span></p>
            </li>
            <li class="flex">
              <p>项目人数:&nbsp;&nbsp;&nbsp;<span>{{projectMes.peopleNumber}}人</span></p>
              <p>工期:&nbsp;&nbsp;&nbsp;<span>{{projectMes.dayNumber}}天</span></p>
            </li>
            <li class="flex">
              <p>交付标准:&nbsp;&nbsp;&nbsp;<span>{{projectMes.standard}}</span></p>
              <p>技能要求:&nbsp;&nbsp;&nbsp;<span>{{projectMes.levelStr}}</span></p>
            </li>
            <li class="flex">
              <p>项目状态:&nbsp;&nbsp;&nbsp;<span>{{projectMes.stateStr}}</span></p>
              <p>项目进度:&nbsp;&nbsp;&nbsp;<span>{{projectMes.schedule}}%</span></p>
            </li>
            <li class="flex">
              <p>预警时间:&nbsp;&nbsp;&nbsp;
                <span v-if="projectMes.warnTime!=null&&projectMes.warnTime!='null'">{{projectMes.warnTimeSec}}</span>
                <span v-else>-</span>
              </p>
              <p>入场时间:&nbsp;&nbsp;&nbsp;
                <span v-if="projectMes.startTime!=null&&projectMes.startTime!='null'">{{projectMes.startTimeSec}}</span>
                <span v-else>-</span>
              </p>
            </li>
            <li class="flex">
              <p>计划完工时间:&nbsp;&nbsp;&nbsp;
                <span v-if="projectMes.planFinishTime!=null&&projectMes.planFinishTime!='null'">{{projectMes.planFTimeSec}}</span>
                <span v-else>-</span>
              </p>
              <p>完工时间:&nbsp;&nbsp;&nbsp;
                <span v-if="projectMes.finishTime!=null&&projectMes.finishTime!='null'">{{projectMes.finishTimeSec}}</span>
                <span v-else>-</span>
              </p>
            </li>
            <li class="flex">
              <p>计划验收时间:&nbsp;&nbsp;&nbsp;
                <span v-if="projectMes.planAcceptTime!=null&&projectMes.planAcceptTime!='null'">{{projectMes.planATimeSec}}</span>
                <span v-else>-</span>
              </p>
              <p>验收时间:&nbsp;&nbsp;&nbsp;
                <span v-if="projectMes.acceptTime!=null&&projectMes.acceptTime!='null'">{{projectMes.acceptTimeSec}}</span>
                <span v-else>-</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="" v-show="showMes" v-for="(point,index) in projectMes.projectPointVOList" :key="'point'+index">
          <p class="mes_titleOne">
            <span>局点信息</span>
          </p>
          <ul class="con_mes">
            <li>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:&nbsp;&nbsp;&nbsp;<span>{{point.placeName}}</span></li>
            <li>详细地址:&nbsp;&nbsp;&nbsp;<span>{{point.address}}</span></li>
            <li>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:&nbsp;&nbsp;&nbsp;<span>{{point.remark}}</span></li>
            <li>人员组成:&nbsp;&nbsp;&nbsp;<span>{{point.engineerNameListStr}}</span></li>
            <li>
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="1">
                  <template slot="title">
                   <span style="color:rgba(235,122,29,1);fontSize:16px;">项目进程【点击展开】</span>
                  </template>
                  <el-row>
                    <el-col :span="4"><div class="gress_title">进程节点</div></el-col>
                    <el-col :span="5"><div class="gress_title">实际开始时间</div></el-col>
                    <el-col :span="5"><div class="gress_title">实际完成时间</div></el-col>
                    <el-col :span="6"><div class="gress_title">项目说明</div></el-col>
                    <el-col :span="4"><div class="gress_title">项目附件</div></el-col>
                  </el-row>
                  <el-row v-for="(gress,index) in point.usingProjectCourseNodeVOList" :key="'gress'+index">
                    <el-col :span="4"><div class="gress_con">{{gress.courseNodeName}}</div></el-col>
                    <el-col :span="5"><div class="gress_con">
                      <span v-if="gress.startTime!=null&&gress.startTime!='null'">{{gress.startTimeSec}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                    <el-col :span="5"><div class="gress_con">
                      <span v-if="gress.endTime!=null&&gress.endTime!='null'">{{gress.endTimeSec}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                    <el-col :span="4"><div class="gress_con">
                      <span v-if="gress.remark!=null&&gress.remark!='null'">{{gress.remark}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                    <el-col :span="6"><div class="gress_con">
                      <span>-</span>
                    </div></el-col>
                    <el-col :span="4"><div class="gress_con">
                      <span>-</span>
                    </div></el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template slot="title">
                   <span style="color:rgba(235,122,29,1);fontSize:16px;">项目文档【点击展开】</span>
                  </template>
                  <p v-for="(file,index) in point.projectFileVOList" :key="'file'+index" style="line-height:40px;">
                    <span v-show="file.fileType==1">【开会检查项】</span>
                    <span v-show="file.fileType==2">【会议纪要】</span>
                    <span v-show="file.fileType==3">【技术方案】</span>
                    <span v-show="file.fileType==4">【安装报告】</span>
                    <span v-show="file.fileType==5">【加电测试】</span>
                    <span v-show="file.fileType==6">【割接调测】</span>
                    <span v-show="file.fileType==7">【完工报告】</span>
                    <span v-show="file.fileType==8">【验收报告】</span>
                    <a :href="url+'/'+file.fileName">{{file.fileName}}</a>
                  </p>
                </el-collapse-item>
                <el-collapse-item name="3">
                  <template slot="title">
                   <span style="color:rgba(235,122,29,1);fontSize:16px;">验&nbsp;&nbsp;货&nbsp;&nbsp;单【点击展开】</span>
                  </template>
                  <div class="" v-for="(ins,index) in point.inspectionVOList" :key="'ins'+index">
                    <p style="width:100%;text-align:center;fontSize:16px;marginTop:15px;marginBottom:15px;">设备</p>
                    <el-row>
                      <el-col :span="3"><div class="insTitle">网元名称<span style="color:red;">*</span></div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.name!=null&&ins.name!=''">{{ins.name}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                      <el-col :span="3"><div class="insTitle">设备型号</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.model!=null&&ins.model!=''">{{ins.model}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                      <el-col :span="3"><div class="insTitle">整机、机框条码</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.code!=null&&ins.code!=''">{{ins.code}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3"><div class="insTitle">省份</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.province!=null&&ins.province!=''">{{ins.province}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                      <el-col :span="3"><div class="insTitle">城市</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.city!=null&&ins.city!=''">{{ins.city}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                      <el-col :span="3"><div class="insTitle">地址</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.address!=null&&ins.address!=''">{{ins.address}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3"><div class="insTitle">主机版本</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.hostVersion!=null&&ins.hostVersion!=''">{{ins.hostVersion}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                      <el-col :span="3"><div class="insTitle">补丁版本</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.patchVersion!=null&&ins.patchVersion!=''">{{ins.patchVersion}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                      <el-col :span="3"><div class="insTitle">槽位号及单板名称</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.boardName!=null&&ins.boardName!=''">{{ins.boardName}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3"><div class="insTitle">单板型号</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.boardModel!=null&&ins.boardModel!=''">{{ins.boardModel}}</span>
                        <span>-</span>
                      </div></el-col>
                      <el-col :span="3"><div class="insTitle">单板条码</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.boardCode!=null&&ins.boardCode!=''">{{ins.boardCode}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                      <el-col :span="3"><div class="insTitle">单板版本(软件)</div></el-col>
                      <el-col :span="5"><div class="insTitle">
                        <span v-if="ins.boardVersion!=null&&ins.boardVersion!=''">{{ins.boardVersion}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3"><div class="insTitle">备注</div></el-col>
                      <el-col :span="21"><div class="insTitle">
                        <span v-if="ins.remark!=null&&ins.remark!=''">{{ins.remark}}</span>
                        <span v-else>-</span>
                      </div></el-col>
                    </el-row>
                  </div>
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
      page:0,//当前页
      activeNames: [],
      length:0,
      projectMes:{},
      proList:[],
      projectNum:0,
      gressList:[
        {
          name:'进场开工',
          time1:'2019-01-04',
          time2:'2019-05-05',
          msg:'符号感受',
          text:'萨达所大所大所多',
          file:'-'
        },
        {
          name:'硬件暗转',
          time1:'2019-01-04',
          time2:'2019-05-05',
          msg:'符号感受',
          text:'萨达所大所大所多',
          file:'-'
        },
        {
          name:'加电单调',
          time1:'2019-01-04',
          time2:'2019-05-05',
          msg:'符号感受',
          text:'萨达所大所大所多',
          file:'-'
        },
      ]
    }
  },
  components:{
    Search,
    Reload
  },
  created(){
    this.getProjectList()
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
        this.getProjectList()
    },
    getProjectList(){//获取全部项目
      let _vc=this;
      let formdata=new FormData();
      formdata.append('page',_vc.page);
      _vc.$axios.post(_vc.url+'/findProjectListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vc.dataLength=res.data.data.totalElements;
          _vc.pageNum=res.data.data.totalPages*10;
          _vc.length=_vc.page*10;
          res.data.data.content.forEach((e)=>{
            _vc.$set(e,'num',_vc.length++);
            //创建时间-------------------------------------->
            let createDate=new Date(e.createTime);
            let cYear=createDate.getFullYear();
            let cMon=createDate.getMonth()+1;
            if(cMon<10){
              cMon='0'+cMon
            };
            let cDay=createDate.getDate();
            if(cDay<10){
              cDay='0'+cDay
            }
            let cTime=cYear+'-'+cMon+'-'+cDay;
            _vc.$set(e,'createTimeSec',cTime);
            //入场时间-------------------------------------->
            let entranceDate=new Date(e.startTime);
            let eYear=entranceDate.getFullYear();
            let eMon=entranceDate.getMonth()+1;
            if(eMon<10){
              eMon='0'+eMon
            };
            let eDay=entranceDate.getDate();
            if(eDay<10){
              eDay='0'+eDay
            }
            let eTime=eYear+'-'+eMon+'-'+eDay;
            _vc.$set(e,'entranceTimeSec',eTime);
            //完工时间-------------------------------------->
            let finishDate=new Date(e.finishTime);
            let fYear=finishDate.getFullYear();
            let fMon=finishDate.getMonth()+1;
            if(fMon<10){
              fMon='0'+fMon
            };
            let fDay=finishDate.getDate();
            if(fDay<10){
              fDay='0'+fDay
            }
            let fTime=fYear+'-'+fMon+'-'+fDay;
            _vc.$set(e,'finishTimeSec',fTime);
            //验收时间-------------------------------------->
            let acceptDate=new Date(e.acceptTime);
            let aYear=acceptDate.getFullYear();
            let aMon=acceptDate.getMonth()+1;
            if(aMon<10){
              aMon='0'+aMon
            };
            let aDay=acceptDate.getDate();
            if(aDay<10){
              aDay='0'+aDay
            }
            let aTime=aYear+'-'+aMon+'-'+aDay;
            _vc.$set(e,'acceptTimeSec',aTime);
          });
          _vc.proList=res.data.data.content;
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    hasDetials(index){//查看项目详情
      let _vc=this;
      // +_vc.proList[index].id
      _vc.$axios.get(_vc.url+'/projectInfo?projectId=afdd571d-f10d-4a88-998f-06c412b155b6').then((res)=>{
        if(res.data.code==0){
          //入场时间
          let startDate=new Date(res.data.data.startTime);
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
          _vc.$set(res.data.data,'startTimeSec',sTime);
          //完工时间
          let finishDate=new Date(res.data.data.finishTime);
          let fYear=finishDate.getFullYear();
          let fMon=finishDate.getMonth()+1;
          if(fMon<10){
            fMon='0'+fMon
          };
          let fDay=finishDate.getDate();
          if(fDay<10){
            fDay='0'+fDay
          }
          let fTime=fYear+'-'+fMon+'-'+fDay;
          _vc.$set(res.data.data,'finishTimeSec',fTime);
          //验收时间
          let acceptDate=new Date(res.data.data.acceptTime);
          let aYear=acceptDate.getFullYear();
          let aMon=acceptDate.getMonth()+1;
          if(aMon<10){
            aMon='0'+aMon
          };
          let aDay=acceptDate.getDate();
          if(aDay<10){
            aDay='0'+aDay
          }
          let aTime=aYear+'-'+aMon+'-'+aDay;
          _vc.$set(res.data.data,'acceptTimeSec',aTime);
          //预警时间
          let warnDate=new Date(res.data.data.warnTime );
          let wYear=warnDate.getFullYear();
          let wMon=warnDate.getMonth()+1;
          if(wMon<10){
            wMon='0'+wMon
          };
          let wDay=warnDate.getDate();
          if(wDay<10){
            wDay='0'+wDay
          }
          let wTime=wYear+'-'+wMon+'-'+wDay;
          _vc.$set(res.data.data,'warnTimeSec',wTime);
          //计划完工时间
          let planFDate=new Date(res.data.data.planFinishTime);
          let pfYear=planFDate.getFullYear();
          let pfMon=planFDate.getMonth()+1;
          if(pfMon<10){
            pfMon='0'+pfMon
          };
          let pfDay=planFDate.getDate();
          if(pfDay<10){
            pfDay='0'+pfDay
          }
          let pfTime=pfYear+'-'+pfMon+'-'+pfDay;
          _vc.$set(res.data.data,'planFTimeSec',pfTime);
          //计划验收时间
          let planADate=new Date(res.data.data.planAcceptTime);
          let paYear=planADate.getFullYear();
          let paMon=planADate.getMonth()+1;
          if(paMon<10){
            paMon='0'+paMon
          };
          let paDay=planADate.getDate();
          if(paDay<10){
            paDay='0'+paDay
          }
          let paTime=paYear+'-'+paMon+'-'+paDay;
          _vc.$set(res.data.data,'planATimeSec',paTime);
          for(let i in res.data.data.projectPointVOList){
            for(let x in res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList){
              //开始时间
              let startDate=new Date(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x].startTime);
              let sYear=startDate.getFullYear();
              let sMon=startDate.getMonth()+1;
              if(sMon<10){
                sMon='0'+sMon
              };
              let sDay=startDate.getDate();
              if(sDay<10){
                sDay='0'+sDay
              };
              let sTime=sYear+'-'+sMon+'-'+sDay
              _vc.$set(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x],'startTimeSec',sTime)
              //结束时间
              let endDate=new Date(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x].endTime);
              let eYear=endDate.getFullYear();
              let eMon=endDate.getMonth()+1;
              if(eMon<10){
                eMon='0'+eMon
              };
              let eDay=endDate.getDate();
              if(eDay<10){
                eDay='0'+eDay
              };
              let eTime=eYear+'-'+eMon+'-'+eDay
              _vc.$set(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x],'endTimeSec',eTime)
            }
          }
          _vc.projectMes=res.data.data;
          _vc.openDetils=true;
          setTimeout(()=>{
            _vc.$refs.project_mes.style.width='100%'
            _vc.$refs.project_mes.style.minHeight='100%';
            setTimeout(()=>{
              _vc.showMes=true;
            },200)
          })
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
        console.log(err)
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
        .insTitle{
          text-align: center;
          line-height: 40px;
          border:1px solid #eee;
        }
      }
      .gress_title{
        text-align: center;
        line-height: 40px;
        background: rgba(235,122,29,.5);
        color:black;
        font-size: 15px;
      }
      .gress_con{
        line-height: 50px;
        text-align: center;
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
