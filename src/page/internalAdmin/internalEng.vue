<!-- 内部工程师管理 -->
<template lang="html">
  <div class="internalEng">
    <Search :searchUrl="internalEng" @searchData="getSearchData"/>
    <div class="engCon">
      <p class="addEng">
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="pushEng()" @keyup.enter.native="abc($event)">添加工程师</el-button>
        <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>

      </p>
      <p class="admin_reload">
        <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
          <i class="el-icon-refresh" @click="getEngList()"></i>
        </el-tooltip>
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
          <el-col :span="3" v-if="eng.email!=null&&!eng.emailToop"><div class="listCon">{{eng.email}}</div></el-col>
          <el-tooltip class="item" effect="dark" v-if="eng.email!=null&&eng.emailToop" :content="eng.email" placement="bottom">
            <el-col :span="3" ><div class="listCon" style="cursor:pointer;">{{eng.email.substring(0,12)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="3" v-if="eng.email==null||eng.email==''"><div class="listCon">-</div></el-col>
          <el-tooltip class="item" effect="dark" :content="eng.levelStr" placement="bottom"  v-if="eng.levelStr!=''&&eng.levelStr!=null">
            <el-col :span="5"><div class="listCon" style="cursor:pointer;">{{eng.levelStr.substring(0,12)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="5" v-else><div class="listCon">-</div></el-col>
          <el-col :span="1"><div class="listCon">
            <span v-if="eng.state==2" style="background:green;color:white;border-radius:18px;padding:5px;font-size:12px;">已启用</span>
            <span v-if="eng.state==-1" style="background:red;color:white;border-radius:18px;padding:5px;font-size:12px;">已停用</span>
          </div></el-col>
          <el-col :span="3"><div class="listCon icon">
            <el-tooltip class="item" effect="dark" content="停用" placement="bottom">
              <i class="el-icon-remove-outline" style="color:black;" v-show="eng.state==2" @click="isStop(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="启用" placement="bottom">
              <i class="el-icon-circle-check-outline" style="color:#eb7a1d;" v-show="eng.state==-1" @click="isStop(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑工程师" placement="bottom">
              <i class="el-icon-edit" style="color:#eb7a1d;" @click="editEng(index)"></i>
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
          width="45%">
          <div class="addEngBox">
            <ul class="add_title">
              <li>姓名:</li>
              <li>手机号码:</li>
              <li>电子邮箱:</li>
              <li>工作年限:</li>
              <li>登录名:</li>
              <li>是否为项目经理:</li>
              <li>是否为内部员工:</li>
              <li>接单区域:</li>
              <li>技术领域及能力:</li>
              <li style="margin-top:550px;">身份认证文件:</li>
              <li style="margin-top:80px;">资质证明文件:</li>
            </ul>

            <ul class="add_con">
              <li><el-input v-model="addEngMes.name" placeholder="请输入工程师姓名"/></li>
              <li><el-input v-model="addEngMes.phone" placeholder="请输入手机号码"/></li>
              <li><el-input v-model="addEngMes.email" placeholder="请输入电子邮箱"/></li>
              <li><el-input v-model="addEngMes.workyear" placeholder="请输入工作年限"/></li>
              <li><el-input v-model="addEngMes.logname" placeholder="请输入登录名"/></li>
              <li>
                <el-radio v-model="isMan" label="1">是</el-radio>
                <el-radio v-model="isMan" label="2">否</el-radio>
              </li>
              <li>
                <el-radio v-model="isInside" label="1">是</el-radio>
                <el-radio v-model="isInside" label="2">否</el-radio>
              </li>
              <li style="display:flex;">
                <Place @getPlace="placeID"/>
              </li>
              <li>
                <p v-for="(engType,index) in skillList" :key="'type'+index">{{engType.name}}
                  <el-checkbox-group @change="uccChose"  v-model="ucc">
                    <el-checkbox-button v-for="(engExp,index) in engType.usingLevelVOList" :label="engExp" :key="engType.name+index">{{engExp.name}}</el-checkbox-button>
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
                  <span class="upBtn" v-show="showSkill">
                    <input type="file" accept="image/*" @change="upSkill" name="" value="">
                  </span>
                </viewer>
              </li>
              <li style="margin-top:25px;padding-bottom:20px;">
                <span>评定说明:</span>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 15}"
                  placeholder="请输入评定说明"
                  v-model="skillText">
                </el-input>
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelAdd()">取 消</el-button>
            <el-button type="primary" @click="subNewEng()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 编辑工程师弹框 -->
      <div class="">
        <el-dialog
          title="编辑工程师"
          :visible.sync="editEngShow"
          width="45%">
          <div class="addEngBox">
            <ul class="add_title">
              <li>姓名:</li>
              <li>手机号码:</li>
              <li>电子邮箱:</li>
              <li>工作年限:</li>
              <li>登录名:</li>
              <li>是否为项目经理:</li>
              <li>是否为内部员工:</li>
              <li>接单区域:</li>
              <li>技术领域及能力:</li>
              <li style="margin-top:550px;">身份认证文件:</li>
              <li style="margin-top:88px;">资质证明文件:</li>
            </ul>

            <ul class="add_con">
              <li><el-input v-model="editEngMes.name" placeholder="请输入工程师姓名"/></li>
              <li><el-input v-model="editEngMes.phone" placeholder="请输入手机号码"/></li>
              <li><el-input v-model="editEngMes.email" placeholder="请输入电子邮箱"/></li>
              <li><el-input v-model="editEngMes.workYear" placeholder="请输入工作年限"/></li>
              <li><el-input v-model="editEngMes.operatorName" placeholder="请输入登录名"/></li>
              <li>
                <el-radio v-model="editEngMes.manState" label="1" @change="wasMan">是</el-radio>
                <el-radio v-model="editEngMes.manState" label="2" @change="noMan">否</el-radio>
              </li>
              <li>
                <el-radio v-model="editEngMes.calState" label="1" @change="wasCal">是</el-radio>
                <el-radio v-model="editEngMes.calState" label="2" @change="noCal">否</el-radio>
              </li>
              <li style="display:flex;">
                <PlaceC  ref="PlaceEdit" :editId="editId" :plStr='plStr'  @getPlace="placeID"/>
              </li>
              <li>
                <p v-for="(engType,index) in abilityList" :key="'type'+index">{{engType.name}}
                  <el-checkbox-group @change="uccChose"  v-model="ucc">
                    <el-checkbox-button v-for="(engExp,index) in engType.usingLevelVOList" :checked="engExp.selected" :label="engExp" :key="engType.name+index">{{engExp.name}}</el-checkbox-button>
                  </el-checkbox-group>
                </p>
              </li>
              <li class="upCard">
                <viewer :images="webCard">
                  <span v-for="(card,index) in webCard" :key="'Card'+index" class="uPpic">
                    <img :src="url+'/'+card.fileName" alt=""/>
                    <i class="el-icon-circle-close" @click="deWeclCard(index)"></i>
                  </span>
                </viewer>
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
                <!-- <viewer :images="webSkill">
                  <span class="uPpic" v-for="(skill,index) in webSkill" :key="'skill'+index">
                    <i class="el-icon-circle-close" @click="delWebSkill(index)"></i>
                    <img :src="url+'/'+skill.fileName" alt=""/>
                  </span>
                </viewer> -->
                <viewer :images="skillPic">
                  <span class="uPpic" v-for="(skillL,index) in webSkill" :key="'skillL'+index">
                    <i class="el-icon-circle-close" @click="delWebSkill(index)"></i>
                    <img :src="url+'/'+skillL.fileName" alt=""/>
                  </span>
                  <span class="uPpic" v-for="(skill,index) in skillPic" :key="'skill'+index">
                    <i class="el-icon-circle-close" @click="delSkill(index)"></i>
                    <img :src="skill" alt=""/>
                  </span>
                  <span class="upBtn" v-show="showSkill">
                    <input type="file" accept="image/*" @change="upSkill" name="" value="">
                  </span>
                </viewer>
              </li>
              <li style="margin-top:30px;padding-bottom:20px;">
                <span>评定说明:</span>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 15}"
                  placeholder="请输入评定说明"
                  v-model="editEngMes.remark">
                </el-input>
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit()">取 消</el-button>
            <el-button type="primary" @click="turnEditEng()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 工程师详情 弹框 -->
      <div class="engMes">
        <el-dialog
         width="45%"
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
             <span style="width:25%;text-align:right;">擅长领域:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;" v-if="engMes.skillTagNames!=null&&engMes.skillTagNames!=''">{{engMes.skillTagNames.join('/')}}</span>
           </p>
           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">技能水平:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;">{{engMes.levelStr}}</span>
           </p>
           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">身份认证:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;display:flex;flex-wrap:wrap;">
               <viewer :images="engMes.identityFiles" style="width:100%;">
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
               <viewer :images="engMes.certificateFiles" style="width:100%;">
                 <img v-for="(skillPic,index) in engMes.certificateFiles"
                 :key="'Skill'+index" :src="url+'/'+skillPic.fileName" alt=""
                 style="width:40%;height:100px;margin-left:15px;margin-top:10px;cursor:pointer;border:1px solid #eb7a1d;border-radius:8px;"
                 >
               </viewer>
             </span>
           </p>
           <p style="font-size:16px;line-height:40px;width:100%;display:flex;">
             <span style="width:25%;text-align:right;">评定说明:</span>
             <span style="width:75%;text-align:left;box-sizing:border-box;padding-left:20px;">{{engMes.remark}}</span>
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
import PlaceC from '@/components/placeEdit'
import Place from '@/components/placeChose'
import Reload from '@/components/reloadBtn'
export default {
  data(){
    return{
      editId:null,//传递工程师ID
      plStr:null,//回显地点
      length:0,
      internalEng:{
        url:'/findEngineerListByCondition',
        state:['-1','2'],
        isOfficial:true
      },
      dataLength:0,//数据总和
      skillList:[],//能力标签列表
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
      },
      editEngMes:{
        name:'',
        phone:'',
        email:'',
        workyear:'',
        logname:'',
      },
      succMes:{
        name:null,//工程师姓名
        phone:null,//手机号
        email:null,//邮箱
        workyear:null,//工作年限
        logname:null,//登录名
      },
      isMan:'0',//是否为项目经理
      isInside:'0',//是否为内部员工
      isManBoolean:null,//是否为项目经理
      isInsideBoolean:null,//是否为项目经理
      cityID:[],//城市ID
      skillText:null,//技术能力说明
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
      noData:false,
      skillID:[],//工程师能力ID
      editEngShow:false,//编辑工程师
      abilityList:[],//工程师能力列表
      abilityIDList:[],//修改工程师能力ID
      webCard:[],//已上传身份证照片
      webSkill:[],//已上传技能证书
    }
  },
  created(){
    this.getEngList();
  },
  computed:{
    publicCardLength(){
        return this.webCard.length+this.cardFile.length
    },
    publicSkillLength(){
      return this.webSkill.length+this.skillFile.length
    }
  },
  watch:{
    publicCardLength(val,oldVal){
      if(val>=2){
        this.showCard=false;
      }else{
        this.showCard=true;
      }
    },
    publicSkillLength(val,oldVal){
      if(val>=5){
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
        return 1
      }
    },
    engList(val,oldVal){
      if(val.length<1){
        this.noData=true;
      }else{
        this.noData=false;
      }
    },
    isMan(val,oldVal){
      if(val==='1'){
        this.isManBoolean=true;
      }else{
        this.isManBoolean=false;
      }
    },
    isInside(val,oldVal){
      if(val==='1'){
        this.isInsideBoolean=true;
      }else{
        this.isInsideBoolean=false;
      }
    },
    editEngShow(val,oldVal){
      if(!val){
        this.abilityList=[];
        this.abilityIDList=[];
        this.plStr=null;
        this.staging=[];
        this.cityID=[];
        this.webCard=[];
        this.webSkill=[];
        this.cardPic=[];
        this.cardFile=[];
        this.skillPic=[];
        this.skillFile=[];
        this.getEngList()
      }else{
        return 1
      }
    },
    addEng(val,oldVal){
      if(!val){
        this.abilityList=[];
        this.abilityIDList=[];
        this.plStr=null;
        this.staging=[];
        this.cityID=[];
        this.webCard=[];
        this.webSkill=[];
        this.cardPic=[];
        this.cardFile=[];
        this.skillPic=[];
        this.skillFile=[];
        this.addEngMes=this.succMes;
      }
    }
  },
  components:{
    Search,
    Place,
    Reload,
    PlaceC
  },
  beforeRouteLeave(to,from,next){
    window.sessionStorage.clear('eName');
    window.sessionStorage.clear('beginTime');
    window.sessionStorage.clear('endTime');
    next();
  },
  methods:{
    getReloadList(engList){
      this.engList=engList;
    },
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
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
      this.skillFile=[];
      this.abilityIDList=[];
    },
    deWeclCard(index){//删除已上传身份证
      let _vm=this;
      let formdata=new FormData();
      formdata.append('id',this.webCard[index].id);
      formdata.append('type','identityFile')
      _vm.$axios.post(_vm.url+'/mobile/deleteEngineerFile',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.$message.success('删除当前身份证成功')
          _vm.webCard.splice(index,1);
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员');
        // console.log(err)
      })
    },
    delCard(index){//删除当前选中身份证照片
      this.cardPic.splice(index,1);
      this.cardFile.splice(index,1);
    },
    delWebSkill(index){//删除已上传证书图片
      let _vm=this;
      let formdata=new FormData();
      formdata.append('id',this.webSkill[index].id);
      formdata.append('type','certificateFile');
      _vm.$axios.post(_vm.url+'/mobile/deleteEngineerFile',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.$message.success('删除当前技能证书成功');
          _vm.webSkill.splice(index,1)
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        // console.log(err);
        _vm.$message.error('未知错误,请联系管理员')
      })
    },
    delSkill(index){//删除当前选中证件图片
      this.skillPic.splice(index,1);
      this.skillFile.splice(index,1);
    },
    uccChose(value){//工程师级别选择
      let a=[]
      value.forEach((e)=>{
        a.push(e.id)
      });
      this.abilityIDList=a;
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
      if(window.sessionStorage.getItem('eName')){
        formdata.append('name',window.sessionStorage.getItem('eName'))
      }
      if(window.sessionStorage.getItem('beginTime')){
        formdata.append('beginTime',window.sessionStorage.getItem('beginTime'));
        formdata.append('endTime',window.sessionStorage.getItem('endTime'));
      }
      _vm.$axios.post(_vm.url+'/findEngineerListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vm.engLoad=false;
          _vm.length=_vm.page*10;
          _vm.pageNum=res.data.data.totalPages*10;
          res.data.data.content.forEach((e)=>{
            _vm.$set(e,'num',_vm.length++);
            if(e.email!=null&&e.email!=''){
              if(e.email.length>15){
                _vm.$set(e,'emailToop',true)
              }else{
                _vm.$set(e,'emailToop',false)
              }
            }
          });
          _vm.dataLength=res.data.data.totalElements;
          _vm.engList=res.data.data.content;
        }else{
          _vm.engLoad=false;
          _vm.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        _vm.$message.error('未知异常,请联系管理员');
        // console.log(err)
      })
    },
    getSearchData(engList){//获取筛选数据
      this.engList=engList;
    },
    engDetails(index){//工程师详情
      this.engMesBox=true;
      this.engMes=this.engList[index];
      this.engMes.childPlaces.forEach((e)=>{
        this.staging.push(e.parentPlace.name+'-'+e.name);
      });
      this.places=this.staging.join('/')
    },
    isStop(index){//停启用工程师
      let formdata=new FormData();
      formdata.append('id',this.engList[index].id)
      this.$axios.post(this.url+'/updateEngineerState',formdata).then((res)=>{
        if(res.data.code==0){
          this.$message.success('更新成功')
          this.getEngList()
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员');
        // console.log(err)
      })
    },
    pushEng(){//添加工程师
      this.$axios.get(this.url+'/usingTechnologyList').then((res)=>{
        if(res.data.code==0){
          this.skillList=res.data.data;
          this.addEng=true;
        }else{
          this.addEng=false;
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.addEng=false;
        this.$message.error('未知错误,请联系管理员');
        // console.log(err)
      })
    },
    subNewEng(){//提交新增工程师
      let _vm=this;
      if(_vm.addEngMes.name==null||_vm.addEngMes.name==''){
        _vm.$message.error('请输入工程师姓名')
      }else if(_vm.addEngMes.phone==null||_vm.addEngMes.phone==''){
        _vm.$message.error('请输入手机号码')
      }else if(!(/^1[34578]\d{9}$/.test(_vm.addEngMes.phone))){
        _vm.$message.error('请输入正确的手机号')
      }else if(_vm.addEngMes.email==null||_vm.addEngMes.email==''){
        _vm.$message.error('请输入邮箱')
      }else if(!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(_vm.addEngMes.email))){
        _vm.$message.error('请输入正确的邮箱')
      }else if(_vm.addEngMes.workyear==null||_vm.addEngMes.workyear==''){
        _vm.$message.error('请输入工作年限')
      }else if(_vm.addEngMes.logname==null||_vm.addEngMes.logname==''){
        _vm.$message.error('请输入登录名')
      }else if(_vm.isManBoolean==null){
        _vm.$message.error('请确认工程师是否为项目经理')
      }else if(_vm.isInsideBoolean==null){
        _vm.$message.error('请确认工程师是否为内部员工')
      }else if(_vm.cityID.length<1){
        _vm.$message.error('请选择至少一个接单区域')
      }else if(_vm.abilityIDList.length<1){
        _vm.$message.error('请选择技术能力')
      }else{
        let formdata=new FormData();
        formdata.append('operatorId',window.localStorage.getItem('Uid'));
        formdata.append('name',_vm.addEngMes.name);
        formdata.append('phone',_vm.addEngMes.phone);
        formdata.append('username',_vm.addEngMes.logname);
        formdata.append('email',_vm.addEngMes.email);
        formdata.append('workYear',_vm.addEngMes.workyear);
        if(_vm.skillText!=null&&_vm.skillText!=''){
          formdata.append('remark',_vm.skillText)
        };
        formdata.append('isOfficial',_vm.isInsideBoolean);
        formdata.append('isManager',_vm.isManBoolean);
        _vm.cityID.forEach((e)=>{
          formdata.append('placeIds',e)
        });
        _vm.abilityIDList.forEach((x)=>{
          formdata.append('levelIds',x)
        });
        if(_vm.cardFile.length>0){
          _vm.cardFile.forEach((y)=>{
            formdata.append('identityUploadFiles',y)
          })
        };
        if(_vm.skillFile.length>0){
          _vm.skillFile.forEach((i)=>{
            formdata.append('certificateUploadFiles',i)
          })
        };
        setTimeout(()=>{
          _vm.$axios.post(_vm.url+'/saveEngineer_n',formdata).then((res)=>{
            if(res.data.code==0){
              _vm.addEngMes=_vm.succMes;
              _vm.isManBoolean=null;
              _vm.isInsideBoolean=null;
              _vm.cityID=[];
              _vm.skillID=[];
              _vm.cardFile=[];
              _vm.skillFile=[];
              _vm.cardPic=[];
              _vm.skillPic=[];
              _vm.isMan='0';
              _vm.isInside='0';
              _vm.addEng=false;
              _vm.getEngList();
              _vm.$message.success('添加成功');
              window.localStorage.clear('editID');
            }else{
              _vm.$message.error(res.data.msg);
            }
          }).catch((err)=>{
            _vm.$message.error('未知错误,请联系管理员');
            // console.log(err)
          })
        })
      }
    },
    editEng(index){//编辑工程师
      let _vc=this;
      _vc.editEngMes=_vc.engList[index];
      _vc.$axios.get(_vc.url+'/usingTechnologyList?engineerId='+_vc.engList[index].id).then((res)=>{
        if(res.data.code==0){
          _vc.abilityList=res.data.data;
          _vc.abilityList.forEach((e)=>{
            e.usingLevelVOList.forEach((x)=>{
              if(x.selected){
                _vc.abilityIDList.push(x.id)
              }
            })
          });
          if(_vc.editEngMes.isManager){
            _vc.$set(_vc.editEngMes,'manState','1')
          }else{
            _vc.$set(_vc.editEngMes,'manState','2')
          };
          if(_vc.editEngMes.isOfficial){
            _vc.$set(_vc.editEngMes,'calState','1')
          }else{
            _vc.$set(_vc.editEngMes,'calState','2')
          };
          _vc.editEngMes.childPlaces.forEach((i)=>{
            this.cityID.push(i.id)
          });
          _vc.editEngMes.identityFiles.forEach((g)=>{
            _vc.webCard.push(g);
          });
          _vc.editEngMes.certificateFiles.forEach((h)=>{
            _vc.webSkill.push(h)
          });
          _vc.engMes=_vc.engList[index]
          _vc.engMes.childPlaces.forEach((e)=>{
            _vc.staging.push(e.parentPlace.name+'-'+e.name);
          });
          _vc.editId=_vc.engList[index].id;
          _vc.plStr=_vc.staging;
          setTimeout(()=>{
            _vc.editEngShow=true;
            setTimeout(()=>{
              _vc.$refs.PlaceEdit.editEng();
            },200)
          });
        }else{
          _vc.changeEng=false;
          _vc.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vc.changeEng=false;
        _vc.$message.error('未知错误,请联系管理员')
      });
    },
    wasMan(){//是否为项目经理
      this.editEngMes.isManager=true;
    },
    noMan(){//是否为项目经理
      this.editEngMes.isManager=false;
    },
    wasCal(){//是否为内部员工
      this.editEngMes.isOfficial=true;
    },
    noCal(){//是否为内部员工
      this.editEngMes.isOfficial=false;
    },
    cancelEdit(){//取消编辑工程师
      this.editEngShow=false;
    },
    turnEditEng(){//上传修改工程师
      let vm=this;
      if(vm.editEngMes.name===''||vm.editEngMes.name==null){
        vm.$message.error('请输入工程师姓名')
      }else if(vm.editEngMes.phone==''||vm.editEngMes.phone==null){
        vm.$message.error('请输入手机号')
      }else if(vm.editEngMes.email==''||vm.editEngMes.email==null){
        vm.$message.error('请输入电子邮箱')
      }else if(vm.editEngMes.workYear==''||vm.editEngMes.workYear==null){
        vm.$message.error('请输入工作年限')
      }else if(vm.editEngMes.operatorName==''||vm.editEngMes.operatorName==null){
        vm.$message.error('请输入登录账号')
      }else if(vm.cityID.length<1){
        vm.$message.error('请选择至少一个工作区域')
      }else if(vm.abilityIDList.length<1){
        vm.$message.error('请对工程师的能力进行最少一项评定')
      }else{
        let formdata=new FormData();
        formdata.append('id',vm.editEngMes.id);
        formdata.append('operatorId',window.localStorage.getItem('Uid'));
        formdata.append('name',vm.editEngMes.name);
        formdata.append('phone',vm.editEngMes.phone);
        formdata.append('username',vm.editEngMes.operatorName);
        formdata.append('email',vm.editEngMes.email);
        formdata.append('workYear',vm.editEngMes.workYear);
        formdata.append('isOfficial',vm.editEngMes.isOfficial);
        formdata.append('isManager',vm.editEngMes.isManager);
        vm.cityID.forEach((e)=>{
          formdata.append('placeIds',e)
        });
        vm.cardFile.forEach((t)=>{
          formdata.append('identityUploadFiles',t);
        });
        vm.abilityIDList.forEach((y)=>{
          formdata.append('levelIds',y)
        });
        if(vm.skillFile.length>0){
          vm.skillFile.forEach((a)=>{
            formdata.append('certificateUploadFiles',a)
          })
        };
        if(vm.editEngMes.remark!=null&&vm.editEngMes!=''){
          formdata.append('remark',vm.editEngMes.remark)
        };
        vm.$axios.post(vm.url+'/saveEngineer_n',formdata).then((res)=>{
          if(res.data.code==0){
            vm.$message.success('更新工程师成功');
            vm.cardFile=[];
            vm.abilityIDList=[];
            vm.editEngShow=false;
            vm.skillFile=[];
            vm.cardPic=[];
            vm.skillPic=[];
            vm.cityID=[];
            vm.plStr=null;
          }else{
            vm.$message.error(res.data.msg);
          }
        }).catch((err)=>{
          vm.$message.error('未知异常,请联系管理员')
          // console.log(err)
        })
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.internalEng{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
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
    .admin_reload{
      position: absolute;
      top:124px;
      right:30px;
      i{
        font-size: 32px;
        color:#eb7a1d;
        cursor:pointer;
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
            min-width: 180px;
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
          width: 110%;
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
            min-width: 180px;
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
        li:last-child{
          position: relative;
          span{
            display: inline-block;
            position: absolute;
            left:-115px;
            top:-12px;
          }
        }
      }
    }
    // .addEngBox::-webkit-scrollbar {display:none}
    .order_page{
      width: 98%;
      text-align: right;
      margin-top: 55px;
      margin-bottom:60px;
    }
  }
}
</style>
