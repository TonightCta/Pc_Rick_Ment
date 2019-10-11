<!-- 技能管理 -->
<template lang="html">
  <div class="skill_ment">
    <div class="" style="width:98%;margin:0 auto;">
      <div class="search_skill" ref="search_skill">
        <ul v-show="searchList">
          <li>
            <p>技能标签名称:&nbsp;&nbsp;<el-input type="primary" style="width:60%;" v-model="searchName" placeholder="请输入项目名称"></el-input></p>
            <p>技能标签分类:&nbsp;
              <el-select v-model="SearchSkillText" placeholder="技能分类" style="width:60%;" @change="SchooseType">
                <el-option
                  v-for="item in skillType"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </p>
          </li>
          <li>
            <p>技能标签类型:&nbsp;
              <el-select v-model="SearchStatusText" placeholder="技能类型" style="width:60%;" @change="SchooseState">
                <el-option
                  v-for="item in skillStatus"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </p>
            <p><el-button type="primary" size="medium" icon="el-icon-zoom-in" @click="searchSkill()">筛选</el-button>
              <el-button size="medium" type="primary" icon="el-icon-remove" @click="cancelSearch()">取消筛选</el-button></p>
          </li>
        </ul>
        <el-tooltip class="item" effect="dark" :content="closeText" placement="bottom">
          <p class="add" @click="searchSwitch" ref="add">
            <img :src="operClose" alt="">
          </p>
        </el-tooltip>
      </div>
      <p class="skill_title">
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="addSkill=true;change=false;">添加技能标签</el-button>
        <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
        <i class="el-icon-refresh" @click="getSkillList"></i>
      </p>
      <div class="skillList" v-loading='skillLoad'>
        <el-row>
          <el-col :span="4"><div class="list_title">序号</div></el-col>
          <el-col :span="4"><div class="list_title">名称</div></el-col>
          <el-col :span="4"><div class="list_title">分类</div></el-col>
          <el-col :span="4"><div class="list_title">类型</div></el-col>
          <el-col :span="4"><div class="list_title">状态</div></el-col>
          <el-col :span="4"><div class="list_title">操作</div></el-col>
        </el-row>
        <el-row class="skillCon publicHover" v-for="(skill,index) in skillList" :key="'SK'+index">
          <el-col :span="4"><div class="list_con">{{skill.num+1}}</div></el-col>
          <el-col :span="4"><div class="list_con">{{skill.name}}</div></el-col>
          <el-col :span="4"><div class="list_con">
            <span v-show="skill.category==0">其他</span>
            <span v-show="skill.category==1">厂商</span>
            <span v-show="skill.category==2">产品类型</span>
            <span v-show="skill.category==3">专项技能</span>
          </div></el-col>
          <el-col :span="4"><div class="list_con">
            <span v-if="skill.type==0">默认</span>
            <span v-else>自定义</span>
          </div></el-col>
          <el-col :span="4"><div class="list_con">
            <span v-if="skill.state==2" style="background:green;
            borderRadius:10px;color:white;fontSize:12px;padding:5px;">启用</span>
            <span v-else style="background:red;
            borderRadius:10px;color:white;fontSize:12px;padding:5px;">停用</span>
          </div></el-col>
          <el-col :span="4"><div class="list_con oper">
            <el-tooltip class="item" effect="dark" content="启用" placement="bottom">
              <i class="el-icon-circle-check" style="color:#eb7a1d;" v-show="skill.state==-1" @click="upStatus(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="停用" placement="bottom">
              <i class="el-icon-remove-outline" style="color:black;" v-show="skill.state==2" @click="upStatus(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
              <i class="el-icon-edit cen" style="color:#eb7a1d;" @click="changeSkill(index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <i class="el-icon-delete" @click="delSkill(index)"></i>
            </el-tooltip>
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
      <!-- 添加技能弹框 -->
      <el-dialog
        title="添加技能"
        :visible.sync="addSkill"
        width="30%">
        <p class="addSkill">技能名称:&nbsp;<el-input type="primary" style="width:60%;" v-model="addSkillText"
          placeholder="请输入技能名称"
        ></el-input></p>
        <p class="addSkill">技能分类:&nbsp;
          <el-select v-model="AddTypeText" placeholder="技能分类" style="width:60%;" @change="AchooseType">
            <el-option
              v-for="item in skillType"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </p>
        <p class="addSkill">技能类型:&nbsp;
          <el-select v-model="AddStatusText" placeholder="技能类型" style="width:60%;" @change="AchooseState">
            <el-option
              v-for="item in skillStatus"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addSkill = false">取 消</el-button>
          <el-button type="primary" @click="subAddSkill()" v-loading="isUpSkill"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255,255,255, 0.8)"
          :disabled="isUpSkill"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 确认删除弹框 -->
      <el-dialog
        title="确认删除"
        :visible.sync="delSkillBox"
        width="30%">
        <span>确认删除当前技能吗？此操作将不可撤销。</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delSkillBox = false">取 消</el-button>
          <el-button type="primary" @click="turnDel()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentPage3:1,//分页器类型
      pageNum:10,//总页数
      page:0,//当前页码
      dataLength:'-',//总数据
      addSkill:false,//添加技能
      searchName:null,//搜索项目名称
      searchTypeID:null,//搜索技能分类ID
      searrchStateID:null,//搜索技能类型ID
      SearchSkillText:null,//技能分类选择
      addSkillText:null,//添加技能名称
      AddTypeText:null,//添加技能分类选择
      AddStatusText:null,//添加技能类型选择
      AddTypeID:null,//添加技能分类ID
      AddStatusID:null,//添加技能类型ID
      skillType:[
        '其他','厂商','产品类型','专项技能'
      ],
      skillStatus:[
        '默认','自定义'
      ],
      dataNum:0,//数据排序
      SearchStatusText:null,//搜素技能类型选择
      skillLoad:false,//是否启用loading
      skillList:[],//数据总列表
      isUpSkill:false,//是否禁用上传按钮
      delSkillBox:false,//确认删除弹框
      delSkillID:null,//删除技能ID
      changeID:null,//修改技能ID
      change:false,//是否为修改技能
      closeText:'收起筛选',
      searchList:true,
      operClose:'./static/img/close_search.png'
    }
  },
  watch:{
    addSkill(val,oldVal){
      if(!val){
        this.addSkillText=null;
        this.AddTypeID=null;
        this.AddStatusID=null;
        this.AddTypeText=null;
        this.AddStatusText=null;
        this.changeID=null;
      }
    }
  },
  mounted(){
    this.getSkillList()
  },
  methods:{
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page=val-1;
        this.getSkillList()
    },
    getSkillList(){//获取所有技能数据
      let _vc=this;
      let formdata=new FormData();
      _vc.skillLoad=true;
      formdata.append('page',_vc.page);
      _vc.$axios.post(_vc.url+'/skillTag/findSkillTagListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vc.skillLoad=false;
          _vc.dataLength=res.data.data.totalElements;
          _vc.dataNum=_vc.page*10;
          _vc.pageNum=res.data.data.totalPages*10;
          res.data.data.content.forEach((e)=>{
            _vc.$set(e,'num',this.dataNum++)
          });
          _vc.skillList=res.data.data.content;
        }else{
          _vc.skillLoad=false;
          _vc.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vc.skillLoad=false;
        // console.log(err)
      })
    },
    SchooseType(value){//Search选择技能ID
      if(value==='其他'){
        this.searchTypeID=0;
      }else if(value==='厂商'){
        this.searchTypeID=1;
      }else if(value==='产品类型'){
        this.searchTypeID=2;
      }else{
        this.searchTypeID=3;
      }
    },
    SchooseState(value){//Search选择类型ID
      if(value==='默认'){
        this.searrchStateID=0;
      }else{
        this.searrchStateID=1;
      };
    },
    searchSkill(){//筛选
      let _vc=this;
      let formdata=new FormData();
      formdata.append('page',_vc.page);
      if(_vc.searchTypeID!=null){
        formdata.append('category',_vc.searchTypeID);
      };
      if(_vc.searrchStateID!=null){
        formdata.append('type',_vc.searrchStateID)
      };
      if(_vc.searchName!=null&&_vc.searchName!=''){
        formdata.append('name',_vc.searchName)
      }
      _vc.$axios.post(_vc.url+'/skillTag/findSkillTagListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vc.dataLength=res.data.data.totalElements;
          _vc.dataNum=_vc.page*10;
          _vc.pageNum=res.data.data.totalPages*10;
          res.data.data.content.forEach((e)=>{
            _vc.$set(e,'num',this.dataNum++)
          });
          _vc.skillList=res.data.data.content;
        }
      }).catch((err)=>{
        // console.log(err)
      })
    },
    cancelSearch(){//取消筛选
      this.getSkillList();
      this.SearchSkillText=null;
      this.searchName=null;
      this.SearchStatusText=null;
      this.searchTypeID=null;
      this.searrchStateID=null;
    },
    AchooseType(value){//新增选择技能分类
      if(value==='其他'){
        this.AddTypeID=0;
      }else if(value==='厂商'){
        this.AddTypeID=1;
      }else if(value==='产品类型'){
        this.AddTypeID=2;
      }else{
        this.AddTypeID=3;
      };
    },
    AchooseState(value){//新增选择类型分类
      if(value==='默认'){
        this.AddStatusID=0;
      }else{
        this.AddStatusID=1;
      }
    },
    subAddSkill(){//上传新增技能
      if(this.addSkillText==null||this.addSkillText==''){
        this.$message.error('请输入技能名称')
      }else if(this.AddTypeID==null){
        this.$message.error('请选择技能分类')
      }else if(this.AddStatusID==null){
        this.$message.error('请选择技能类型')
      }else{
        let formdata=new FormData();
        this.isUpSkill=true;
        formdata.append('name',this.addSkillText);
        formdata.append('type',this.AddStatusID);
        formdata.append('category',this.AddTypeID);
        let ID=window.localStorage.getItem('Uid');
        formdata.append('operatorId',ID)
        if(this.change){
          formdata.append('id',this.changeID)
        }
        this.$axios.post(this.url+'/skillTag/saveSkillTag',formdata).then((res)=>{
          if(res.data.code==0){
            this.$message.success('添加成功')
            this.isUpSkill=false;
            this.addSkill=false;
            this.changeID=null;
            this.getSkillList();
          }else{
            this.isUpSkill=false;
            this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.isUpSkill=false;
          this.$message.error('未知错误,请联系管理员')
        })
      }
    },
    delSkill(index){//删除当前技能
      this.delSkillID=this.skillList[index].id;
      this.delSkillBox=true;
    },
    turnDel(){//确认删除技能
      this.$axios.get(this.url+'/skillTag/deleteSkillTag?id='+this.delSkillID).then((res)=>{
        if(res.data.code==0){
          this.delSkillBox=false;
          this.$message.success('删除成功');
          this.searchSkill();
        }else{
          this.delSkillBox=false;
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
      })
    },
    changeSkill(index){//修改技能
      this.addSkillText=this.skillList[index].name;
      this.AddStatusText=this.skillList[index].typeStr;
      this.AddTypeText=this.skillList[index].categoryStr;
      this.AddStatusID=this.skillList[index].type
      this.AddTypeID=this.skillList[index].category;
      this.changeID=this.skillList[index].id
      this.change=true;
      this.addSkill=true;
    },
    upStatus(index){//更新技能状态
      this.$axios.get(this.url+'/skillTag/updateSkillTagState?id='+this.skillList[index].id).then((res)=>{
        if(res.data.code==0){
          this.$message.success('更新技能状态成功');
          this.searchSkill();
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
      })
    },
    searchSwitch(){//闭合搜索
      if(this.closeText==='收起筛选'){
        this.closeText='展开筛选';
        this.operClose='./static/img/open_search.png';
        this.$refs.search_skill.style.height="10px";
        this.$refs.add.style.bottom='-20px'
        setTimeout(()=>{
          this.searchList=false;
        },50)
      }else{
        this.closeText='收起筛选';
        this.operClose='./static/img/close_search.png';
        this.$refs.search_skill.style.height="200px";
        this.$refs.add.style.bottom='0'
        setTimeout(()=>{
          this.searchList=true;
        },200)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.skill_ment{
  width:100%;
  height: 100%;
  overflow-x: hidden;
  .search_skill{
    width: 100%;
    margin:0 auto;
    height: 200px;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-bottom: 20px;
    transition: .5s all;
    margin-bottom: 20px;
    .add{
      width: 80px;
      height: 20px;
      position: absolute;
      bottom:0;
      left:50%;
      margin-left: -40px;
      cursor:pointer;
      transition: .5s all;
      img{
        width: 100%;
        height: 100%;
        opacity: 1;
      }
    }
    ul{
      width: 80%;
      margin:0 auto;
      box-sizing: border-box;
      padding-top: 60px;
      li{
        width: 100%;
        display: flex;
        margin-bottom:30px;
        box-sizing: border-box;
        padding-left: 150px;
        p{
          width: 45%;
        }
      }
    }
  }
  .skill_title{
    width: 100%;
    border-bottom:1px solid #ccc;
    padding-bottom: 5px;
    height: 42px;
    line-height: 42px;
    position: relative;
    .dataLength{
      display: inline-block;
      width: 90%;
      text-align: right;
      box-sizing: border-box;
      padding-right: 50px;
    }
    i{
      font-size: 32px;
      position: absolute;
      right:20px;
      top:5px;
      color:#eb7a1d;
      cursor:pointer;
    }
  }
  .skillList{
    width: 100%;
    min-height: 500px;
    .list_title{
      text-align: center;
      background: #eb7a1d;
      font-size: 16px;
      color:white;
      line-height: 40px;
    }
    .list_con{
      text-align: center;
      line-height: 40px;
    }
    .oper{
      font-size: 22px;
      cursor:pointer;
      .cen{
        margin-left: 10px;
        margin-right: 10px;
      }
    }
    .skillCon:nth-of-type(even){
      background: #eee;
    }
  }
  .addSkill{
    width: 100%;
    box-sizing: border-box;
    padding-left: 60px;
    height: 80px;
  }
  .order_page{
    width: 98%;
    text-align: right;
  }
}
</style>
