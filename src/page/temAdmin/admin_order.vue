<!-- 管理员派单 -->
<template lang="html">
  <div class="admin_order w100">
    <p class="admin_add">
      <el-button type="primary" icon="el-icon-plus" @click="mePushOrder()">添加项目</el-button>
    </p>
    <p class="admin_reload">
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
        <i class="el-icon-refresh" @click="refresh()"></i>
      </el-tooltip>
    </p>
    <div class="order_title">
      <el-row>
        <el-col :span="2"><div class="title">序号</div></el-col>
        <el-col :span="3"><div class="title">任务名称</div></el-col>
        <el-col :span="3"><div class="title">任务内容</div></el-col>
        <el-col :span="3"><div class="title">任务地点</div></el-col>
        <el-col :span="3"><div class="title">详细地址</div></el-col>
        <el-col :span="3"><div class="title">创建日期</div></el-col>
        <el-col :span="3"><div class="title">任务状态</div></el-col>
        <el-col :span="4"><div class="title">申请接单记录</div></el-col>
      </el-row>
    </div>
    <p style="text-align:center;color:#666;margin-top:30px;width:90%;" v-show="hasOrder">暂无更多数据</p>
    <div class="order_con"  v-loading="loadOrder">
      <el-row v-for="(orderCon,index) in msgList" :key="index" class="el_con">
        <el-col :span="2"><div class="title_con">{{orderCon.num+1}}</div></el-col>
        <el-tooltip class="item" effect="dark" :content="orderCon.name" placement="bottom">
          <el-col :span="3" style="cursor:pointer;"><div class="title_con">{{orderCon.name.substring(0,6)+'...'}}</div></el-col>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="orderCon.content" placement="bottom">
          <el-col :span="3" style="cursor:pointer;"><div class="title_con">{{orderCon.content.substring(0,6)+'...'}}</div></el-col>
        </el-tooltip>
        <el-col :span="3"><div class="title_con">{{orderCon.placeVO.parentName+'-'+orderCon.placeVO.name}}</div></el-col>
        <el-tooltip class="item" effect="dark" :content="orderCon.address" placement="bottom">
          <el-col :span="3" style="cursor:pointer;"><div class="title_con">{{orderCon.address.substring(0,6)+'...'}}</div></el-col>
        </el-tooltip>
        <el-col :span="3"><div class="title_con">{{orderCon.createTimeStr}}</div></el-col>
        <el-col :span="3"><div class="title_con">
          <el-select v-model="orderCon.orderStatus" @change="upStatus(index)">
            <el-option
              size="mini"
              :label="orderCon.choseStatus"
              :value="value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="4"><div class="title_con">
          <i class="el-icon-tickets" style="font-size:20px;cursor:pointer;" @click="takeDis(index)"></i>
        </div></el-col>
      </el-row>
    </div>
    <!-- 分页器 -->
    <div class="order_page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :total="pageNum">
      </el-pagination>
    </div>
    <!-- 查看申请人弹出框 -->
    <div class="choseEng">
      <el-dialog
        title="查看申请人"
        :visible.sync="takeOrder"
        width="50%">
        <ul class="choseTitle">
          <li>姓名</li>
          <li>联系方式</li>
          <li>工作年限</li>
          <li>技能水平</li>
          <li>详细资料</li>
          <li>操作</li>
        </ul>
        <ul class="choseCon">
          <li v-for="(eng,index) in engList" :key="index+'B'">
            <span>{{eng.engineerVO.name}}</span>
            <span class="contact">{{eng.engineerVO.phone}}</span>
            <span>{{eng.engineerVO.workYear}}</span>
            <!-- <span v-for="(item,index) in eng.engineerVO.levels">{{item.technology.name+'-'+item.name}}</span> -->
            <el-tooltip class="item" effect="dark" :content="eng.engineerVO.levelStr" placement="top">
              <span style="cursor:pointer">{{eng.engineerVO.levelStr.substring(0,8)+'...'}}</span>
            </el-tooltip>
            <span>
              <i class="el-icon-search" @click="viewEng(index)" style="font-size:20px;cursor:pointer;margin-top:10px;"></i>
            </span>
            <span class="select">
              <el-select v-model="eng.engineerVO.stateStr" @change="choseSelEng(index)" ref="stateText">
                <el-option
                  size="mini"
                  placeholder="请选择"
                  v-for="opa in eng.engineerVO.stateV0"
                  :key="index+'C'"
                  :label="opa"
                  :value="opa">
                </el-option>
              </el-select>
            </span>
          </li>
        </ul>
        <p style="width:100%;color:#666;text-align:center;font-size:16px;
        line-height:50px;" v-show="noEng">暂无申请者</p>
      </el-dialog>
      <div class="engMes">
        <el-dialog
         width="40%"
         title="工程师信息"
         :visible.sync="innerVisible"
         append-to-body>
           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">姓名:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;">{{engMes.name}}</span>
           </p>

           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">联系方式:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;">{{engMes.phone}}</span>
           </p>

           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">工作年限:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;">{{engMes.workyear}}</span>
           </p>

           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">接单区域:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;">{{engMes.places}}</span>
           </p>

           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">技能水平:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;">{{engMes.skills}}</span>
           </p>
           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">技能证书:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;display:flex;flex-wrap:wrap;">
               <viewer :images="engMes.skillPic">
                 <img v-for="(skillPic,index) in engMes.skillPic"
                 :key="'Skill'+index" :src="url+'/'+skillPic.fileName" alt=""
                 style="width:20%;height:100px;margin-left:15px;margin-top:10px;cursor:pointer;"
                 >
               </viewer>
             </span>
           </p>
       </el-dialog>
     </div>
    </div>
    <!-- 添加项目弹出框 -->
    <div class="pushProject">
      <el-dialog
        title="新增项目"
        :visible.sync="pushOrder"
        width="40%">
        <el-row>
          <el-col :span="6"><div class="proTitle">
            <ul>
              <li>项目名称:</li>
              <li>项目地点:</li>
              <li>详细地址:</li>
              <li>项目内容:</li>
            </ul>
          </div></el-col>
          <el-col :span="16"><div class="proCon">
            <ul>
              <li>
                <el-input placeholder="请输入项目名称" v-model="projectName"></el-input>
              </li>
              <li>
                <p>
                  <el-select v-model="placeProName" @change="chosePro">
                    <el-option
                    v-for="(placePro,index) in placeList"
                    :key="'Pro'+index"
                    :label="placePro.name"
                    :value="placePro.name"
                    >
                    </el-option>
                  </el-select>
                </p>
                <p>
                  <el-select v-model="placeCityName" @change="choseCity">
                    <el-option
                    v-for="(placePro,index) in cityList"
                    :key="'City'+index"
                    :label="placePro.name"
                    :value="placePro.name"
                    >
                    </el-option>
                  </el-select>
                </p>
              </li>
              <li>
                <el-input placeholder="请输入详细地址" v-model="addRess"></el-input>
              </li>
              <li>
                <el-input v-model="projectCon" type="textarea" :autosize="{minRows:8}" resize="none" placeholder="请输入项目内容"></el-input>
              </li>
            </ul>
          </div></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="placeProName='';placeCityName='';projectName='';placeID=null;addRess='';projectCon='';pushOrder = false">取 消</el-button>
          <el-button type="primary" @click="subOrder" v-loading="hasSub"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, .9)"
          :disabled="hasSub"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      choseEngVal:null,
      msgList:[],
      currentPage3:1,
      page:0,//当前页码
      userMes:{},//用户信息
      options:[
        {
          value:'派大星',
          label:'派大星'
        }
      ],
      value:null,
      length:0,//数据排序
      pageNum:10,//总页码
      loadOrder:false,//是否启用loading
      takeOrder:false,//接单记录查看
      pushOrder:false,//添加项目
      engList:[],//申请人列表
      noEng:false,//是否有申请人
      placeProName:null,//省级名称
      placeCityName:null,//市级名称
      placeID:null,//城市ID
      placeList:[],//省级列表
      cityList:[],//城市列表
      projectName:'',//项目名称
      addRess:'',//项目详细地址
      projectCon:'',//项目内容
      hasSub:false,//是否禁用按钮
      hasOrder:false,//是否有数据
      innerVisible:false,//二级弹框
      engMes:{
        name:null,//工程师姓名
        phone:null,//联系方式
        workyear:null,//工作年限
        skills:null,//技能水平
        skillPic:[],//技能图片
        places:null,//接单区域
      },
      staging:[],//暂存数据
    }
  },
  watch:{
    innerVisible(val,oldVal){
      if(!val){
        this.engMes.places=null;
        this.staging=[];
      }else{
        console.log(1)
      }
    }
  },
  mounted(){
    this.getOrderList()
  },
  methods:{
    viewEng(index){
      console.log(this.engList[index]);
      this.engMes.name=this.engList[index].engineerVO.name;
      this.engMes.phone=this.engList[index].engineerVO.phone;
      this.engMes.workyear=this.engList[index].engineerVO.workYear;
      this.engMes.skills=this.engList[index].engineerVO.levelStr;
      this.engMes.skillPic=this.engList[index].engineerVO.certificateFiles;
      this.engList[index].engineerVO.childPlaces.forEach((e)=>{
        this.staging.push(e.parentPlace.name+'-'+e.name);
        console.log(this.staging)
      });
      setTimeout(()=>{
        this.engMes.places=this.staging.join('/')
      })
      this.innerVisible=true
    },
    mePushOrder(){//添加项目
      let _vm=this;
      _vm.pushOrder=true;
      _vm.$axios.get(_vm.url+'/mobile/getUsingPlaceList').then((res)=>{
        if(res.data.code==0){
          console.log(res)
          _vm.placeList=res.data.data.placeList
        }else{
          _vm.pushOrder=false;
          _vm.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        _vm.pushOrder=false;
        _vm.$message.error('未知错误,请联系管理员')
      })
    },
    chosePro(index){//选择省
      this.placeCityName=''
      this.placeList.forEach((e)=>{
        if(index===e.name){
          this.cityList=e.usingChildList
        }
      })
    },
    choseCity(index){//选择市
      this.cityList.forEach((e)=>{
        if(index===e.name){
          this.placeID=e.id;
          console.log(this.placeID)
        }
      })
    },
    subOrder(){//上传新增任务
      let _vm=this;
      let formdata=new FormData;
      if(_vm.projectName==''){
        _vm.$message.error('请输入项目名称')
      }else if(_vm.placeID==null){
        _vm.$message.error('请选择项目地点')
      }else if(_vm.addRess==''){
        _vm.$message.error('请输入项目详细地址')
      }else if(_vm.projectCon==''){
        _vm.$message.error('请输入项目内容')
      }else{
        console.log(_vm.projectName)
        console.log(_vm.projectCon)
        console.log(_vm.addRess)
        console.log(_vm.placeID)
        _vm.hasSub=true;
        formdata.append('name',_vm.projectName);
        formdata.append('content',_vm.projectCon);
        formdata.append('address',_vm.addRess);
        formdata.append('placeId',_vm.placeID);
        _vm.$axios.post(_vm.url+'/mission/saveMission',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.$message({
              message:'添加成功',
              type:'success'
            });
            _vm.hasSub=false;
            _vm.pushOrder=false;
            _vm.getOrderList();
            _vm.projectName='';
            _vm.placeID=null;
            _vm.addRess='';
            _vm.projectCon='';
            console.log(this.placeID)
            _vm.placeProName=null;
            _vm.placeCityName=null;
          }else{
            _vm.pushOrder=false;
            _vm.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          _vm.pushOrder=false;
          _vm.$message.error('未知错误,请联系管理员')
        })
      }
    },
    refresh(){//刷新数据
      this.page=0;
      this.getOrderList();
    },
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page=val-1;
        this.getOrderList()
    },
    getOrderList(){//获取可用订单列表
      let _vm=this;
      _vm.loadOrder=true;
      let formdata=new FormData();
      formdata.append('sortStr','createTime');
      formdata.append('asc','desc');
      formdata.append('page',_vm.page);
      formdata.append('size',10);
      _vm.$axios.post(_vm.url+'/mission/findMissionListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.length=_vm.page*10;
          _vm.pageNum=res.data.data.totalPages*10;
          res.data.data.content.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++);
            if(e.state==-1){
              _vm.$set(e,'orderStatus','截单状态');
              _vm.$set(e,'choseStatus','接单状态');
            }else{
              _vm.$set(e,'orderStatus','接单状态');
              _vm.$set(e,'choseStatus','截单状态');
            }
          });
          _vm.loadOrder=false;
          _vm.msgList=res.data.data.content;
          if(_vm.msgList.length<1){
            _vm.hasOrder=true
          }else{
            _vm.hasOrder=false;
          }
        }else{
          _vm.loadOrder=false;
          _vm.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        _vm.loadOrder=false;
        _vm.$message.error('未知异常,请联系管理员');
      })
    },
    upStatus(index){//更新订单状态
      if(this.msgList[index].state==-1){
        let formdata=new FormData();
        formdata.append('id',this.msgList[index].id);
        formdata.append('state',2);
        this.$axios.post(this.url+'/mission/updateMissionState',formdata).then((res)=>{
          if(res.data.code==0){
            this.$set(this.msgList[index],'orderStatus','接单状态');
            this.$set(this.msgList[index],'choseStatus','截单状态');
            this.msgList[index].state=2;
            this.$message({
              message: '更新订单状态成功',
              type: 'success'
            });
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch((err)=>{
          this.$message.error('未知异常,请联系管理员');
        })
      }else{
        let formdata=new FormData();
        formdata.append('id',this.msgList[index].id);
        formdata.append('state',-1);
        this.$axios.post(this.url+'/mission/updateMissionState',formdata).then((res)=>{
          if(res.data.code==0){
            this.$set(this.msgList[index],'orderStatus','截单状态');
            this.$set(this.msgList[index],'choseStatus','接单状态');
            this.msgList[index].state=-1;
            this.$message({
              message: '更新订单状态成功',
              type: 'success'
            });
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch((err)=>{
          this.$message.error('未知异常,请联系管理员');
        })
      }
    },
    takeDis(index){//派发订单
      let _vm=this;
      _vm.takeOrder=true;
      if(_vm.msgList[index].missionRecordVOList==null){
        _vm.noEng=true;
      }else{
        _vm.noEng=false;
      }
      setTimeout(()=>{
        for(let i in _vm.msgList[index].missionRecordVOList){
          let e=_vm.msgList[index].missionRecordVOList[i];
          if(e.state==0){
            let a=['已入选','未入选'];
            _vm.$set(e.engineerVO,'stateV0',a);
            _vm.$set(e.engineerVO,'stateStr',null)
          }else if(e.state==1){
            let b=['未入选'];
            _vm.$set(e.engineerVO,'stateV0',b);
            _vm.$set(e.engineerVO,'stateStr','已入选')
          }else if(e.state==-1){
            let c=['已入选'];
            _vm.$set(e.engineerVO,'stateV0',c);
            _vm.$set(e.engineerVO,'stateStr','未入选')
          }
        }
        _vm.engList=_vm.msgList[index].missionRecordVOList;
      })
    },
    choseSelEng(index){//更新入选状态
      let _vm=this;
      let id=_vm.engList[index].id;
      if(_vm.engList[index].state==1){
        let formdata=new FormData();
        formdata.append('id',id);
        formdata.append('state',-1);
        _vm.$axios.post(_vm.url+'/mission/updateMissionRecordState',formdata).then((res)=>{
          if(res.data.code==0){
            let b=['已入选']
            _vm.$set(_vm.engList[index].engineerVO,'stateV0',b);
            _vm.engList[index].engineerVO.stateStre='未入选';
            _vm.engList[index].state=-1;
            _vm.$message({
               message: '更新入选状态成功',
               type: 'success'
             });
          }else{
            _vm.$message.error(res.msg);
          }
        }).catch((err)=>{
            _vm.$message.error('未知错误,请联系管理员');
        })

      }else if(_vm.engList[index].state==-1){
        let formdata=new FormData();
        formdata.append('id',id);
        formdata.append('state',1);
        _vm.$axios.post(_vm.url+'/mission/updateMissionRecordState',formdata).then((res)=>{
          if(res.data.code==0){
            let a=['未入选']
            _vm.$set(_vm.engList[index].engineerVO,'stateV0',a);
            _vm.engList[index].engineerVO.stateStre='已入选';
            _vm.engList[index].state=1;
            _vm.$message({
               message: '更新接单状态成功',
               type: 'success'
             });
          }else{
            _vm.$message.error(res.msg);
          }
        }).catch((err)=>{
            _vm.$message.error('未知错误,请联系管理员');
        })
      }else{
        setTimeout(()=>{
          let stateVal=_vm.$refs.stateText[index].value;
          if(stateVal==='已入选'){
            let formdata=new FormData();
            formdata.append('id',id);
            formdata.append('state',1);
            _vm.$axios.post(_vm.url+'/mission/updateMissionRecordState',formdata).then((res)=>{
              if(res.data.code==0){
                _vm.engList[index].engineerVO.stateStre='已入选';
                let a=['未入选']
                _vm.$set(_vm.engList[index].engineerVO,'stateV0',a);
                _vm.engList[index].state=1;
                _vm.$message({
                   message: '更新接单状态成功',
                   type: 'success'
                 });
              }else{
                _vm.$message.error(res.msg);
              }
            }).catch((err)=>{
              _vm.$message.error('未知错误,请联系管理员');
            })
          }else{
            let formdata=new FormData();
            formdata.append('id',id);
            formdata.append('state',-1);
            _vm.$axios.post(_vm.url+'/mission/updateMissionRecordState',formdata).then((res)=>{
              if(res.data.code==0){
                _vm.engList[index].engineerVO.stateStre='未入选';
                let b=['已入选']
                _vm.$set(_vm.engList[index].engineerVO,'stateV0',b);
                _vm.engList[index].state=-1;
                _vm.$message({
                   message: '更新接单状态成功',
                   type: 'success'
                 });
              }else{
                _vm.$message.error(res.msg);
              }
            }).catch((err)=>{
              _vm.$message.error('未知错误,请联系管理员');
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.admin_order{
  margin:0 auto;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .admin_add{
    width: 100%;
    padding-top: 30px;
    box-sizing: border-box;
    padding-left: 20px;
  }
  .admin_reload{
    position: absolute;
    top:30px;
    right:20px;
    i{
      font-size: 32px;
      color:#eb7a1d;
      cursor:pointer;
    }
  }
  .order_title{
    margin-top: 15px;
    width: 98%;
    margin-left: 20px;
    .title{
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      background: rgba(235,122,29,.8);
      color:white;
    }
  }
  .order_con{
    width: 98%;
    margin-left: 20px;
    min-height: 550px;
    .title_con{
      text-align: center;
      font-size: 15px;
      line-height: 50px;
      max-height: none;
      i:hover{
        color:#eb7a1d;
      }
    }
  }
  .el_con:nth-of-type(even){
    background:#eee;
  }
  .order_page{
    width: 90%;
    text-align: right;
    margin-bottom: 100px;
  }
  .choseEng{
    .choseTitle{
        width: 100%;
        height: 20px;
        display: flex;
        li{
          width: 20%;
          height: 100%;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          color:black;
        }
    }
    .choseCon{
      width: 100%;
      margin-top: 10px;
      max-height: none;
      li{
        width: 100%;
        color:#666;
        display: flex;
        span{
          display: inline-block;
          width: 20%;
          color:black;
          text-align: center;
          line-height: 40px;
        }
      }
    }
  }
  .pushProject{
    .proTitle{
      text-align: right;
      box-sizing: border-box;
      padding-right: 15px;
      ul{
        li{
          line-height: 40px;
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
    .proCon{
      ul{
        li{
          margin-top: 10px;
          margin-bottom: 10px;
        }
        li:nth-child(2){
          display: flex;
          p{
            width: 30%;
          }
        }
      }
    }
  }
}
</style>
