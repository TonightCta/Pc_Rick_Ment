<!-- 内部工程师管理 -->
<template lang="html">
  <div class="internalEng">
    <Search :searchUrl="internalEng" @searchData="getSearchData"/>
    <div class="engCon">
      <p class="addEng">
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="pushEng()" @keyup.enter.native="abc($event)">添加工程师</el-button>
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
          <el-tooltip class="item" effect="dark" :content="eng.levelStr" placement="bottom">
            <el-col :span="5" v-if="eng.levelStr!=''&&eng.levelStr!=null"><div class="listCon" style="cursor:pointer;">{{eng.levelStr.substring(0,12)}}...</div></el-col>
            <el-col :span="5" v-else><div class="listCon">-</div></el-col>
          </el-tooltip>
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
          width="40%">
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
              <li style="margin-top:70px;">资质证明文件:</li>
              <li style="margin-top:80px;">技术能力说明:</li>
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
                </viewer>
                <span class="upBtn" v-show="showSkill">
                  <input type="file" accept="image/*" @change="upSkill" name="" value="">
                </span>
              </li>
              <li style="margin-top:25px;padding-bottom:20px;">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 15}"
                  placeholder="请输入能力说明"
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
          title="新增工程师"
          :visible.sync="editEngShow"
          width="40%">
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
              <li style="margin-top:70px;">资质证明文件:</li>
              <li style="margin-top:80px;">技术能力说明:</li>
            </ul>

            <ul class="add_con">
              <li><el-input v-model="editEngMes.name" placeholder="请输入工程师姓名"/></li>
              <li><el-input v-model="editEngMes.phone" placeholder="请输入手机号码"/></li>
              <li><el-input v-model="editEngMes.email" placeholder="请输入电子邮箱"/></li>
              <li><el-input v-model="editEngMes.workyear" placeholder="请输入工作年限"/></li>
              <li><el-input v-model="editEngMes.logname" placeholder="请输入登录名"/></li>
              <li>
                <el-radio v-model="isMan" label="1">是</el-radio>
                <el-radio v-model="isMan" label="2">否</el-radio>
              </li>
              <li>
                <el-radio v-model="isInside" label="1">是</el-radio>
                <el-radio v-model="isInside" label="2">否</el-radio>
              </li>
              <li style="display:flex;">
                <PlaceC  ref="PlaceEdit" :editId="editId" :plStr='plStr'  @getPlace="placeID"/>
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
                </viewer>
                <span class="upBtn" v-show="showSkill">
                  <input type="file" accept="image/*" @change="upSkill" name="" value="">
                </span>
              </li>
              <li style="margin-top:25px;padding-bottom:20px;">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 15}"
                  placeholder="请输入能力说明"
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
    }
  },
  components:{
    Search,
    Place,
    Reload,
    PlaceC
  },
  methods:{
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
      console.log(this.cityID)
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
      this.skillID=[];
    },
    delCard(index){//删除当前选中身份证照片
      this.cardPic.splice(index,1);
      this.cardFile.splice(index,1);
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
      this.skillID=a;
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
      console.log(this.engList[index].id);
      let formdata=new FormData();
      formdata.append('id',this.engList[index].id)
      this.$axios.post(this.url+'/updateEngineerState',formdata).then((res)=>{
        console.log(res);
        if(res.data.code==0){
          this.$message.success('更新成功')
          this.getEngList()
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员');
        console.log(err)
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
        console.log(err)
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
      }else if(_vm.skillID.length<1){
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
        _vm.skillID.forEach((x)=>{
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
            console.log(res);
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
              _vm.addEng=false;
            }
          }).catch((err)=>{
            _vm.$message.error('未知错误,请联系管理员');
            console.log(err)
          })
        })
      }
    },
    editEng(index){//编辑工程师
      this.editEngMes=this.engList[index];
      if(this.editEngMes.isManager){
        this.$set(this.editEngMes,'manState','1')
      }else{
        this.$set(this.editEngMes,'manState','2')
      };
      this.engMes=this.engList[index]
      this.engMes.childPlaces.forEach((e)=>{
        this.staging.push(e.parentPlace.name+'-'+e.name);
      });
      this.editId=this.engList[index].id;
      this.plStr=this.staging;
      console.log(this.staging)
      setTimeout(()=>{
        this.editEngShow=true;
        setTimeout(()=>{
          this.$refs.PlaceEdit.editEng();
        },200)
      });
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
      margin-top: 55px;
      margin-bottom: 100px;
    }
  }
}
</style>
