<!-- 待认证工程师管理 -->
<template lang="html">
  <div class="internalEng">
    <Search :searchUrl="certifiedlEng" @searchData="getSearchData"/>
    <div class="engCon">
      <p class="addEng">
        <!-- <el-button type="primary" icon="el-icon-plus" size="medium" @click="addEng=true">添加工程师</el-button> -->
        <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
        <Reload :reloadData='certifiedlEng' @reloadList="getReloadList"/>
      </p>
      <div class="internalEng_title">
        <el-row>
          <el-col :span="2"><div class="listTitle">序号</div></el-col>
          <el-col :span="3"><div class="listTitle">姓名</div></el-col>
          <el-col :span="3"><div class="listTitle">联系电话</div></el-col>
          <el-col :span="3"><div class="listTitle">工作年限</div></el-col>
          <el-col :span="3"><div class="listTitle">登录账号</div></el-col>
          <el-col :span="3"><div class="listTitle">邮箱</div></el-col>
          <el-col :span="3"><div class="listTitle">技术能力认证</div></el-col>
          <el-col :span="4"><div class="listTitle">操作</div></el-col>
        </el-row>
      </div>
      <p v-show="noData" style="height:70px;font-size:18px;line-height:70px;text-align:center;width:90%;color:#666;position:absolute;left:20px;">暂无更多数据</p>
      <div class="internalEng_con" v-loading="engLoad">
        <el-row class="el_con" v-for="(eng,index) in engList" :key="'el'+index">
          <el-col :span="2"><div class="listCon">{{eng.num+1}}</div></el-col>
          <el-col :span="3"><div class="listCon">{{eng.name}}</div></el-col>
          <el-col :span="3" v-if="eng.phone!=null&&eng.phone!=''&&eng.phone!='null'"><div class="listCon">{{eng.phone}}</div></el-col>
          <el-col :span="3" v-else><div class="listCon">-</div></el-col>
          <el-col :span="3" v-if="eng.workYear!=null&&eng.workYear!=''&&eng.workYear!='null'"><div class="listCon">{{eng.workYear}}&nbsp;年</div></el-col>
          <el-col :span="3" v-else><div class="listCon">-&nbsp;年</div></el-col>
          <el-col :span="3"><div class="listCon">{{eng.operatorName}}</div></el-col>
          <el-col :span="3" v-if="eng.email!=null&&eng.email!=''&&eng.email!='null'"><div class="listCon">{{eng.email}}</div></el-col>
          <el-col :span="3" v-else><div class="listCon">-</div></el-col>
          <el-col :span="3"><div class="listCon" style="box-sizing:border-box;padding-top:5px;">
            <i class="el-icon-edit-outline" style="color:#eb7a1d;font-size:23px;cursor:pointer;" @click="operEng=true"></i>
          </div></el-col>
          <el-col :span="4"><div class="listCon icon">
            <el-tooltip class="item" effect="dark" content="查看工程师" placement="bottom">
              <i class="el-icon-view" style="color:#eb7a1d;" @click="engDetails(index)"></i>
            </el-tooltip>
          </div></el-col>
        </el-row>
      </div>
      <!-- 评定工程师能力 弹框 -->
      <div class="operWork">
        <el-dialog
          title="能力评定"
          :visible.sync="operEng"
          width="25%">
          <p v-for="(engType,index) in a" :key="'type'+index" style="">
            <span style="">{{engType.name}}</span>
            <el-checkbox-group @change="uccChose"  v-model="ucc">
              <el-checkbox-button v-for="(engExp,index) in engType.children" :label="engExp" :key="engType.name+index">{{engExp.name}}</el-checkbox-button>
            </el-checkbox-group>
          </p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="operEng = false">取 消</el-button>
            <el-button type="primary" @click="operEng = false">确 定</el-button>
          </span>
        </el-dialog>
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
import Reload from '@/components/reloadBtn'
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
      ucc:[],//工程师能力列表
      places:null,//工程师工作详细地址
      operEng:false,//操作工程师弹框
      noData:false,
      certifiedlEng:{
        url:'/findEngineerListByCondition',
        state:1,
        isOfficial:false
      },
      a:[
        {
          name:'Ucc',
          children:[
            {name:'初级工程师',id:1},
            {name:'中级工程师',id:2},
            {name:'高级工程师',id:3}
          ]
        },
        {
          name:'数通',
          children:[
            {name:'初级工程师',id:4},
            {name:'中级工程师',id:5},
            {name:'高级工程师',id:6}
          ]
        },
        {
          name:'IT',
          children:[
            {name:'初级工程师',id:7},
            {name:'中级工程师',id:8},
            {name:'高级工程师',id:9}
          ]
        },
        {
          name:'能基',
          children:[
            {name:'初级工程师',id:10},
            {name:'中级工程师',id:11},
            {name:'高级工程师',id:12}
          ]
        },
        {
          name:'VC',
          children:[
            {name:'初级工程师',id:13},
            {name:'中级工程师',id:14},
            {name:'高级工程师',id:15}
          ]
        },
        {
          name:'光伏',
          children:[
            {name:'初级工程师',id:16},
            {name:'中级工程师',id:17},
            {name:'高级工程师',id:18}
          ]
        },
      ],
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
    },
    engList(val,oldVal){
      if(val.length<1){
        this.noData=true;
      }else{
        this.noData=false;
      }
    }
  },
  components:{
    Search,
    Place,
    Reload
  },
  methods:{
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page=val-1;
        this.getEngList();
    },
    getEngList(){//获取所有工程师
      let _vm=this;
      _vm.engLoad=true;
      let formdata=new FormData();
      formdata.append('isOfficial',false);
      formdata.append('asc','desc');
      formdata.append('page',_vm.page);
      formdata.append('size',10);
      formdata.append('states',1);
      _vm.$axios.post(_vm.url+'/findEngineerListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.engLoad=false;
          _vm.length=_vm.page*10;
          _vm.pageNum=res.data.data.totalPages*10;
          res.data.data.content.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++);
          });
          _vm.dataLength=res.data.data.totalElements;
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
      this.engMes=this.engList[index];
      this.engMes.childPlaces.forEach((e)=>{
        this.staging.push(e.parentPlace.name+'-'+e.name);
      });
      this.places=this.staging.join('/')
    },
    uccChose(value){//工程师级别选择
      let a=[]
      value.forEach((e)=>{
        a.push(e.id)
      })
    },
    getSearchData(engList){
      this.engList=engList;
    },
    getReloadList(engList){
      this.engList=engList;
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
      line-height: 42px;
      height: 42px;
      .dataLength{
        display: inline-block;
        width: 98%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 50px;
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
      }
    }
    .operWork{
      p{
        width:100%;
        text-align:center;
        span{
          display:inline-block;
          text-align:left;
          width:100%;
          margin-top:10px;
          margin-bottom:10px;
          box-sizing:border-box;
          padding-left:20px;
          font-size:16px;
          color:black;
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
