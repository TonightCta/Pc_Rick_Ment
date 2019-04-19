<!-- 外部工程师管理 -->
<template lang="html">
  <div class="internalEng">
    <Search/>
    <div class="engCon">
      <p class="addEng">
        <!-- <el-button type="primary" icon="el-icon-plus" size="medium" @click="addEng=true">添加工程师</el-button> -->
        <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      </p>
      <div class="internalEng_title">
        <el-row>
          <el-col :span="1"><div class="listTitle">序号</div></el-col>
          <el-col :span="2"><div class="listTitle">姓名</div></el-col>
          <el-col :span="2"><div class="listTitle">联系电话</div></el-col>
          <el-col :span="2"><div class="listTitle">工作年限</div></el-col>
          <el-col :span="3"><div class="listTitle">登录账号</div></el-col>
          <el-col :span="3"><div class="listTitle">邮箱</div></el-col>
          <el-col :span="4"><div class="listTitle">技术能力</div></el-col>
          <el-col :span="3"><div class="listTitle">推荐码</div></el-col>
          <el-col :span="1"><div class="listTitle">状态</div></el-col>
          <el-col :span="3"><div class="listTitle">操作</div></el-col>
        </el-row>
      </div>
      <div class="internalEng_con" v-loading="engLoad">
        <el-row class="el_con" v-for="(eng,index) in engList" :key="'el'+index">
          <el-col :span="1"><div class="listCon">{{eng.num+1}}</div></el-col>
          <el-col :span="2"><div class="listCon">{{eng.missionRecordVOList[0].engineerVO.name}}</div></el-col>
          <el-col :span="2"><div class="listCon">{{eng.missionRecordVOList[0].engineerVO.phone}}</div></el-col>
          <el-col :span="2"><div class="listCon">{{eng.missionRecordVOList[0].engineerVO.workYear}}&nbsp;年</div></el-col>
          <el-col :span="3"><div class="listCon">{{eng.missionRecordVOList[0].engineerVO.number}}</div></el-col>
          <el-col :span="3"><div class="listCon">{{eng.missionRecordVOList[0].engineerVO.createTime}}</div></el-col>
          <el-col :span="4"><div class="listCon">{{eng.missionRecordVOList[0].engineerVO.levelStr}}</div></el-col>
          <el-col :span="3"><div class="listCon">何玄</div></el-col>
          <el-col :span="1"><div class="listCon">
            <span v-if="eng.state==-1" style="background:green;color:white;border-radius:18px;padding:5px;font-size:12px;">已启用</span>
            <span v-else style="background:#666;color:white;border-radius:18px;padding:5px;font-size:12px;">已停用</span>
          </div></el-col>
          <el-col :span="3"><div class="listCon icon">
            <el-tooltip class="item" effect="dark" content="停用" placement="bottom">
              <i class="el-icon-remove-outline" style="color:#666;" v-show="eng.state==-1"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="启用" placement="bottom">
              <i class="el-icon-circle-check-outline" style="color:balck;" v-show="eng.state==2"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑工程师" placement="bottom">
              <i class="el-icon-edit" style="color:#eb7a1d;"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看工程师" placement="bottom">
              <i class="el-icon-view" style="color:#eb7a1d;" @click="engDetails(index)"></i>
            </el-tooltip>
          </div></el-col>
        </el-row>
      </div>
      <!-- 工程师详情 弹框 -->
      <div class="engMes">
        <el-dialog
         width="40%"
         title="工程师信息"
         :visible.sync="engMesBox"
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
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;">{{engMes.workYear}}&nbsp;年</span>
           </p>

           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">接单区域:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;">{{places}}</span>
           </p>

           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">技能水平:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;">{{engMes.levelStr}}</span>
           </p>
           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">身份认证:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;display:flex;flex-wrap:wrap;">
               <viewer :images="engMes.identityFiles">
                 <img v-for="(cardPic,index) in engMes.identityFiles"
                 :key="'Skill'+index" :src="url+'/'+cardPic.fileName" alt=""
                 style="width:40%;height:100px;margin-left:15px;margin-top:10px;cursor:pointer;border:1px solid #eb7a1d;border-radius:8px;"
                 >
               </viewer>
             </span>
           </p>
           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">技能证书:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;display:flex;flex-wrap:wrap;">
               <viewer :images="engMes.certificateFiles">
                 <img v-for="(skillPic,index) in engMes.certificateFiles"
                 :key="'Skill'+index" :src="url+'/'+skillPic.fileName" alt=""
                 style="width:40%;height:100px;margin-left:15px;margin-top:10px;cursor:pointer;border:1px solid #eb7a1d;border-radius:8px;"
                 >
               </viewer>
             </span>
           </p>

       </el-dialog>
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
    </div>
  </div>
</template>

<script>
import Search from '@/components/search'
import Place from '@/components/placeChose'
export default {
  data(){
    return{
      dataLength:0,//数据总和
      currentPage3:1,
      page:0,//页码
      pageNum:10,//总页数
      engList:[],//工程师列表
      engMes:{},//工程师详细信息
      engLoad:false,//是否启用loading
      engMesBox:false,//工程师详情弹框
      staging:[],//工程师工作区域
      places:null,//工程师工作详细地址
    }
  },
  created(){
    this.getEngList()
  },
  watch:{
    engMesBox(val,oldVal){
      if(!val){
        this.staging=[];
        this.places=null;
      }else{
        console.log(1)
      }
    }
  },
  components:{
    Search,
    Place
  },
  methods:{
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page=val-1;
    },
    getEngList(){//获取所有工程师
      let _vm=this;
      _vm.engLoad=true;
      let formdata=new FormData();
      formdata.append('sortStr','createTime');
      formdata.append('asc','desc');
      formdata.append('page',_vm.page);
      formdata.append('size',10);
      _vm.$axios.post(_vm.url+'/mission/findMissionListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          console.log(res)
          _vm.engLoad=false;
          _vm.length=_vm.page*10;
          _vm.pageNum=res.data.data.totalPages*10;
          res.data.data.content.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++);
          });
          _vm.dataLength=res.data.data.content.length;
          _vm.engList=res.data.data.content;
        }else{
          _vm.engLoad=false;
          _vm.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        _vm.$message.error('未知异常,请联系管理员');
      })
    },
    engDetails(index){//工程师详情
      this.engMesBox=true;
      this.engMes=this.engList[index].missionRecordVOList[0].engineerVO;
      this.engMes.childPlaces.forEach((e)=>{
        this.staging.push(e.parentPlace.name+'-'+e.name);
        console.log(this.staging)
      });
      this.places=this.staging.join('/')
      console.log(this.engMes)
    }
  }
}
</script>

<style lang="scss" scoped>
.internalEng{
  width: 100%;
  height: 100%;
  .engCon{
    width: 98%;
    margin:0 auto;
    .addEng{
      width: 100%;
      border-bottom:1px solid #ccc;
      padding-bottom: 5px;
      .dataLength{
        display: inline-block;
        width: 98%;
        text-align: right;
      }
    }
    .internalEng_title{
      width: 100%;
      margin-top: 2px;
      .listTitle{
        text-align: center;
        line-height: 40px;
        background: #eb7a1d;
        color:white;
        font-size: 16px;
      }
    }
    .internalEng_con{
      width: 100%;
      min-height: 500px;
      .listCon{
        line-height: 50px;
        text-align: center;
        font-size: 14px;
      }
      .icon{
        font-size: 23px;
        cursor:pointer;
        i:nth-child(3){
          margin-left: 13px;
          margin-right: 13px;
        }
      }
    }
    .el_con:nth-of-type(even){
      background:#eee;
    }
    .addEngBox{
      width: 100%;
      display: flex;
      max-height: 500px;
      overflow: auto;
      .add_title{
        width: 20%;
        text-align: right;
        line-height: 50px;
      }
      .add_con{
        width: 60%;
        line-height: 50px;
        padding-left: 30px;
        .uPpic{
          display: inline-block;
          position: relative;
          height: 100px;
          margin-top: 15px;
          i{
            position: absolute;
            top:-7px;
            right:-10px;
            font-size: 18px;
            color:#eb7a1d;
            cursor:pointer;
          }
        }
        .upCard{
          min-height: 120px;
          display: flex;
          img{
            display: inline-block;
            width: 180px;
            margin-left: 15px;
            height: 100px;
            cursor:pointer;
            border:1px solid #eb7a1d;
            border-radius:10px;
          }
          .upBtn{
            display: inline-block;
            width: 180px;
            height: 103px;
            margin-left: 15px;
            margin-top: 15px;
            position: relative;
            background: url('../../../static/img/card_bg.png');
            background-size: 100% 100%;
            border-radius:8px;
            input{
              width: 100%;
              height: 100%;
              position: absolute;
              top:0;
              left:0;
              opacity: 0;
              cursor:pointer;
            }
          }
        }
        .upSkills{
          min-height: 120px;
          display: flex;
          flex-wrap: wrap;
          img{
            display: inline-block;
            width: 180px;
            margin-left: 15px;
            height: 100px;
            cursor:pointer;
            border:1px solid #eb7a1d;
            border-radius:10px;
          }
          .upBtn{
            display: inline-block;
            width: 180px;
            height: 103px;
            margin-left: 15px;
            margin-top: 15px;
            position: relative;
            background: url('../../../static/img/skill_bg.png');
            background-size: 100% 100%;
            border-radius:8px;
            input{
              width: 100%;
              height: 100%;
              position: absolute;
              top:0;
              left:0;
              opacity: 0;
              cursor:pointer;
            }
          }
        }
      }
    }
    // .addEngBox::-webkit-scrollbar {display:none}
    .order_page{
      width: 98%;
      text-align: right;
    }
  }
}
</style>
