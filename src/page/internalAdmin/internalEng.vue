<!-- 内部工程师管理 -->
<template lang="html">
  <div class="internalEng">
    <Search :searchUrl="internalEng" @searchData="getSearchData"/>
    <div class="engCon">
      <p class="addEng">
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="addEng=true" @keyup.enter.native="abc($event)">添加工程师</el-button>
        <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
        <Reload :reloadData='internalEng' @reloadList="getReloadList"/>
      </p>
      <div class="internalEng_title">
        <el-row>
          <el-col :span="1"><div class="listTitle">序号</div></el-col>
          <el-col :span="2"><div class="listTitle">姓名</div></el-col>
          <el-col :span="2"><div class="listTitle">项目经理</div></el-col>
          <el-col :span="2"><div class="listTitle">联系电话</div></el-col>
          <el-col :span="2"><div class="listTitle">工作年限</div></el-col>
          <el-col :span="3"><div class="listTitle">登录账号</div></el-col>
          <el-col :span="3"><div class="listTitle">邮箱</div></el-col>
          <el-col :span="5"><div class="listTitle">技术能力</div></el-col>
          <el-col :span="1"><div class="listTitle">状态</div></el-col>
          <el-col :span="3"><div class="listTitle">操作</div></el-col>
        </el-row>
      </div>
      <p v-show="noData" style="height:70px;font-size:18px;line-height:70px;text-align:center;width:90%;color:#666;position:absolute;left:20px;">暂无更多数据</p>
      <div class="internalEng_con" v-loading="engLoad">
        <el-row class="el_con" v-for="(eng,index) in engList" :key="'el'+index">
          <el-col :span="1"><div class="listCon">{{eng.num+1}}</div></el-col>
          <el-col :span="2"><div class="listCon">{{eng.name}}</div></el-col>
          <el-col :span="2"><div class="listCon">
            <span v-show="eng.isManager">是</span>
            <span v-show="!eng.isManager">否</span>
          </div></el-col>
          <el-col :span="2" v-if="eng.phone!=null&&eng.phone!=''"><div class="listCon">{{eng.phone}}</div></el-col>
          <el-col :span="2" v-else><div class="listCon">-</div></el-col>
          <el-col :span="2" v-if="eng.workYear!=null&&eng.workYear!=''"><div class="listCon">{{eng.workYear}}&nbsp;年</div></el-col>
          <el-col :span="2" v-else><div class="listCon">-&nbsp;年</div></el-col>
          <el-col :span="3"><div class="listCon">{{eng.operatorName}}</div></el-col>
          <el-col :span="3" v-if="eng.email!=null"><div class="listCon">{{eng.email}}</div></el-col>
          <el-col :span="3" v-else><div class="listCon">-</div></el-col>
          <el-col :span="5" v-if="eng.levelStr!=''"><div class="listCon">{{eng.levelStr}}</div></el-col>
          <el-col :span="5" v-else><div class="listCon">-</div></el-col>
          <el-col :span="1"><div class="listCon">
            <span v-if="eng.state==2" style="background:green;color:white;border-radius:18px;padding:5px;font-size:12px;">已启用</span>
            <span v-if="eng.state==-1" style="background:#666;color:white;border-radius:18px;padding:5px;font-size:12px;">已停用</span>
          </div></el-col>
          <el-col :span="3"><div class="listCon icon">
            <el-tooltip class="item" effect="dark" content="停用" placement="bottom">
              <i class="el-icon-remove-outline" style="color:#666;" v-show="eng.state==2"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="启用" placement="bottom">
              <i class="el-icon-circle-check-outline" style="color:balck;" v-show="eng.state==-1"></i>
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
      <!-- 新增工程师 弹框-->
      <div class="">
        <el-dialog
          title="新增工程师"
          :visible.sync="addEng"
          width="40%">
          <div class="addEngBox">
            <ul class="add_title">
              <li>姓名:</li>
              <li>手机号码:</li>
              <li>电子邮箱:</li>
              <li>工作年限:</li>
              <li>登录名:</li>
              <li>是否为项目经理:</li>
              <li>接单区域:</li>
              <li>技术领域及能力:</li>
              <li style="margin-top:550px;">身份认证文件:</li>
              <li style="margin-top:70px;">资质证明文件:</li>
            </ul>

            <ul class="add_con">
              <li><el-input v-model="addEngMes.name" placeholder="请输入工程师姓名"/></li>
              <li><el-input v-model="addEngMes.phone" placeholder="请输入手机号码"/></li>
              <li><el-input v-model="addEngMes.email" placeholder="请输入电子邮箱"/></li>
              <li><el-input v-model="addEngMes.workyear" placeholder="请输入工作年限"/></li>
              <li><el-input v-model="addEngMes.logname" placeholder="请输入登录名"/></li>
              <li>
                <el-radio v-model="isMan" label="1" @change="wasMan">是</el-radio>
                <el-radio v-model="isMan" label="2" @change="noMan">否</el-radio>
              </li>
              <li style="display:flex;">
                <Place @getPlace="placeID"/>
              </li>
              <li>
                <p v-for="(engType,index) in a" :key="'type'+index">{{engType.name}}
                  <el-checkbox-group @change="uccChose"  v-model="ucc">
                    <el-checkbox-button v-for="(engExp,index) in engType.children" :label="engExp" :key="engType.name+index">{{engExp.name}}</el-checkbox-button>
                  </el-checkbox-group>
                </p>
              </li>
              <li class="upCard">
                <viewer :images="cardPic">
                  <span v-for="(card,index) in cardPic" :key="'Card'+index" class="uPpic">
                    <img :src="card" alt=""/>
                    <i class="el-icon-circle-close" @click="delCard(index)"></i>
                  </span>
                </viewer>
                <span v-show="showCard" class="upBtn">
                  <input type="file" accept="image/*" @change="upCard" name="" value="">
                </span>
              </li>
              <li class="upSkills">
                <viewer :images="skillPic">
                  <span class="uPpic" v-for="(skill,index) in skillPic" :key="'skill'+index">
                    <i class="el-icon-circle-close" @click="delSkill(index)"></i>
                    <img :src="skill" alt=""/>
                  </span>
                </viewer>
                <span class="upBtn" v-show="showSkill">
                  <input type="file" accept="image/*" @change="upSkill" name="" value="">
                </span>
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelAdd()">取 消</el-button>
            <el-button type="primary" @click="addEng = false">确 定</el-button>
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
      internalEng:{
        url:'/findEngineerListByCondition',
        state:['-1','2'],
        isOfficial:true
      },
      dataLength:0,//数据总和
      list:[
        {
          num:1,
          name:'李荣浩',
          man:'郑总',
          phone:13240891337,
          workyear:3,
          mob:'李荣浩',
          email:'tonightCta@gmail.com',
          work:'数通：初级工程师',
          state:1
        },
        {
          num:2,
          name:'张国荣',
          man:'浩总',
          phone:13240891338,
          workyear:15,
          mob:'张国荣',
          email:'c13240891337@gmail.com',
          work:'能基：中级工程师',
          state:2
        },
      ],
      currentPage3:1,
      page:0,//页码
      pageNum:10,//总页数
      addEng:false,
      addEngMes:{
        name:null,//工程师姓名
        phone:null,//手机号
        email:null,//邮箱
        workyear:null,//工作年限
        logname:null,//登录名
        isman:1,//是否为项目经理
        proList:[],//省级列表
        cityList:[],//市级列表
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
      isMan:'1',//是否为项目经理
      cityID:null,//城市ID
      ucc:[],//Ucc选择
      cation:[],//数通选择
      cardPic:[],//身份证回显列表
      cardFile:[],//身份证上传列表
      skillPic:[],//证书回显列表
      skillFile:[],//证书上传列表
      showCard:true,//是否显示身份证上传按钮
      showSkill:true,//是否显示证书上传按钮
      engList:[],//工程师列表
      engMes:{},//工程师详细信息
      engLoad:false,//是否启用loading
      engMesBox:false,//工程师详情弹框
      staging:[],//工程师工作区域
      places:null,//工程师工作详细地址
      noData:false
    }
  },
  created(){
    this.getEngList();
  },
  watch:{
    cardPic(val,oldVal){
      if(val.length>=2){
        this.showCard=false;
      }else{
        this.showCard=true;
      }
    },
    skillPic(val,oldVal){
      if(val.length>=5){
        this.showSkill=false;
      }else{
        this.showSkill=true;
      }
    },
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
    abc(){
      alert(1)
    },
    getReloadList(engList){
      this.engList=engList;
    },
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page=val-1;
        this.getEngList();
    },
    placeID(vc){//选择地区
      this.cityID=vc;
    },
    upCard(e){//上传身份证
      let _vc=this;
      let file=e.target.files[0];
      this.cardFile.push(file);
      let reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=function(){
        _vc.cardPic.push(this.result)
      }
    },
    upSkill(e){//上传证书
      let _vc=this;
      let file=e.target.files[0];
      this.skillFile.push(file);
      let reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=function(){
        _vc.skillPic.push(this.result)
      }
    },
    cancelAdd(){//取消添加工程师
      this.addEng = false;
      this.cardPic=[];
      this.cardFile=[];
      this.skillPic=[];
      this.skillFile=[]
    },
    delCard(index){//删除当前选中身份证照片
      this.cardPic.splice(index,1);
      this.cardFile.splice(index,1);
    },
    delSkill(index){//删除当前选中证件图片
      this.skillPic.splice(index,1);
      this.skillFile.splice(index,1);
    },
    wasMan(msg){//是否为项目经理
      this.addEngMes.isman=msg;
    },
    noMan(msg){//是否为项目经理
      this.addEngMes.isman=msg;
    },
    uccChose(value){//工程师级别选择
      let a=[]
      value.forEach((e)=>{
        a.push(e.id)
      })
    },
    getEngList(){//获取所有工程师
      let _vm=this;
      _vm.engLoad=true;
      let formdata=new FormData();
      formdata.append('isOfficial',true);
      formdata.append('asc','desc');
      formdata.append('page',_vm.page);
      formdata.append('size',10);
      formdata.append('states',-1);
      formdata.append('states',2);
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
    getSearchData(engList){
      this.engList=engList;
    },
    engDetails(index){//工程师详情
      this.engMesBox=true;
      this.engMes=this.engList[index];
      this.engMes.childPlaces.forEach((e)=>{
        this.staging.push(e.parentPlace.name+'-'+e.name);
      });
      this.places=this.staging.join('/')
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
      height: 42px;
      line-height: 42px;
      .dataLength{
        display: inline-block;
        width: 90%;
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
