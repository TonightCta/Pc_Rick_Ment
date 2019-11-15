<!-- 技术领域及能力管理 -->
<template lang="html">
  <div class="field_admin">
    <p class="field_titleOper">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="addField=true">添加技术领域</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <i class="el-icon-refresh"></i>
    </p>
    <div class="">
      <el-row>
        <el-col :span="3"><div class="field_title">序号</div></el-col>
        <el-col :span="4"><div class="field_title">技术领域</div></el-col>
        <el-col :span="5"><div class="field_title">能力</div></el-col>
        <el-col :span="3"><div class="field_title">日薪</div></el-col>
        <el-col :span="3"><div class="field_title">排序号</div></el-col>
        <el-col :span="3"><div class="field_title">状态</div></el-col>
        <el-col :span="3"><div class="field_title">操作</div></el-col>
      </el-row>
      <div class="" style="minHeight:500px;">
        <div class="" v-for="(field,index) in fieldList">
          <el-row class="operTwo publicHover">
            <el-col :span="3"><div class="field_con">{{field.num+1}}</div></el-col>
            <el-col :span="4"><div class="field_con">{{field.name}}</div></el-col>
            <el-col :span="5"><div class="field_con">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="addAbility(index)">添加能力</el-button>
            </div></el-col>
            <el-col :span="3"><div class="field_con">&nbsp;&nbsp;</div></el-col>
            <el-col :span="3"><div class="field_con">{{field.num+1}}</div></el-col>
            <el-col :span="3"><div class="field_con">
              <span style="background:green;border-radius:8px;fontSize:12px;color:white;padding:4px;" v-if="field.state==1">已启用</span>
              <span style="background:red;border-radius:8px;fontSize:12px;color:white;padding:4px;" v-else>已停用</span>
            </div></el-col>
            <el-col :span="3"><div class="field_con">
              <el-tooltip class="item" effect="dark" content="停用能力" placement="bottom" v-if="field.state==1">
                <i class="el-icon-remove-outline"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="启用能力" placement="bottom" v-else>
                <i class="el-icon-circle-check" style="color:#eb7a1d;"></i>
              </el-tooltip>
              <i class="el-icon-edit" @click="editFieldPar(index)"></i>
              <i class="el-icon-delete"></i>
            </div></el-col>
          </el-row>
          <el-row v-for="(fieldCh,key) in field.children" class="publicHover" :key="'FieldCh'+key">
            <el-col :span="3"><div class="field_con">{{fieldCh.num}}</div></el-col>
            <el-col :span="4"><div class="field_con">&nbsp;&nbsp;</div></el-col>
            <el-col :span="5"><div class="field_con">{{fieldCh.name}}</div></el-col>
            <el-col :span="3"><div class="field_con">{{fieldCh.daymoney}}</div></el-col>
            <el-col :span="3"><div class="field_con">{{fieldCh.num}}</div></el-col>
            <el-col :span="3"><div class="field_con">
              <span style="background:green;border-radius:8px;fontSize:12px;color:white;padding:4px;" v-if="fieldCh.state==1">已启用</span>
              <span style="background:red;border-radius:8px;fontSize:12px;color:white;padding:4px;" v-else>已停用</span>
            </div></el-col>
            <el-col :span="3"><div class="field_con">
              <el-tooltip class="item" effect="dark" content="停用能力" placement="bottom" v-if="fieldCh.state==1">
                <i class="el-icon-remove-outline"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="启用能力" placement="bottom" v-else>
                <i class="el-icon-circle-check" style="color:#eb7a1d;"></i>
              </el-tooltip>
              <i class="el-icon-edit" @click="editAbilityPar(index,key)"></i>
              <i class="el-icon-delete"></i>
            </div></el-col>
          </el-row>
        </div>
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
    <!-- 添加技术领域 -->
    <div class="pushField">
      <el-dialog
        title="添加技术领域"
        :visible.sync="addField"
        width="60%">
        <div class="" style="height:500px;overflow:auto;">
          <p><span><span style="color:red;">*</span>技术领域:<el-input type="primary" style="width:400px;" v-model="addFieldMes.fieldName"></el-input></span></p>
          <p style="marginTop:15px;"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red;">*</span>排序:<el-input type="primary" style="width:400px;" v-model="addFieldMes.fieldNum"></el-input></span></p>
          <el-row>
            <el-col :span="24"><div style="lineHeight:40px;textAlign:center;fontSize:16px;">能力列表</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="1"><div class="pushTitle">序号</div></el-col>
            <el-col :span="7"><div class="pushTitle">能力<span style="color:red;">*</span></div></el-col>
            <el-col :span="7"><div class="pushTitle">日薪<span style="color:red;">*</span></div></el-col>
            <el-col :span="7"><div class="pushTitle">排序<span style="color:red;">*</span></div></el-col>
            <el-col :span="2"><div class="pushTitle">删除</div></el-col>
          </el-row>
          <el-row v-for="(pushField,index) in addFieldMes.fieldList" :key="'PushField'+index" class="operTwo">
            <el-col :span="1"><div class="pushCon">{{pushField.num+1}}</div></el-col>
            <el-col :span="7"><div class="pushCon">
              <el-input type="primary" v-model="pushField.fieldText" style="width:90%;" placeholder="请输入能力"></el-input>
              </div></el-col>
            <el-col :span="7"><div class="pushCon">
              <el-input type="primary" v-model="pushField.dayMoney" style="width:90%;" placeholder="请输入日薪"></el-input>
            </div></el-col>
            <el-col :span="7"><div class="pushCon">
              <el-input type="primary" v-model="pushField.fieldNum" style="width:90%;" placeholder="请输入序号"></el-input>
            </div></el-col>
            <el-col :span="2"><div class="pushCon">
              <i class="el-icon-delete" @click="delLocaField(index)"></i>
            </div></el-col>
          </el-row>
          <p style="marginTop:10px;">
            <el-button type="primary" size="medium" @click="addLocaField()">添加能力行</el-button>
            <el-button type="primary" size="medium">提交</el-button>
          </p>
        </div>
      </el-dialog>
    </div>
    <!-- 添加能力 -->
    <div class="">
      <el-dialog
        title="添加能力"
        :visible.sync="abilityBox"
        width="60%">
        <el-row>
          <el-col :span="24"><div style="lineHeight:40px;textAlign:center;fontSize:16px;">[{{abilityName}}]能力列表</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="1"><div class="pushTitle">序号</div></el-col>
          <el-col :span="7"><div class="pushTitle">能力<span style="color:red;">*</span></div></el-col>
          <el-col :span="7"><div class="pushTitle">日薪<span style="color:red;">*</span></div></el-col>
          <el-col :span="7"><div class="pushTitle">排序<span style="color:red;">*</span></div></el-col>
          <el-col :span="2"><div class="pushTitle">删除</div></el-col>
        </el-row>
        <el-row v-for="(pushField,index) in addFieldMes.fieldList" :key="'PushFieldC'+index" class="operTwo">
          <el-col :span="1"><div class="pushCon">{{pushField.num+1}}</div></el-col>
          <el-col :span="7"><div class="pushCon">
            <el-input type="primary" v-model="pushField.fieldText" style="width:90%;" placeholder="请输入能力"></el-input>
            </div></el-col>
          <el-col :span="7"><div class="pushCon">
            <el-input type="primary" v-model="pushField.dayMoney" style="width:90%;" placeholder="请输入日薪"></el-input>
          </div></el-col>
          <el-col :span="7"><div class="pushCon">
            <el-input type="primary" v-model="pushField.fieldNum" style="width:90%;" placeholder="请输入序号"></el-input>
          </div></el-col>
          <el-col :span="2"><div class="pushCon">
            <i class="el-icon-delete" @click="delLocaField(index)"></i>
          </div></el-col>
        </el-row>
        <p style="marginTop:10px;textAlign:center;">
          <el-button type="primary" size="medium" @click="addLocaField()">添加能力行</el-button>
          <el-button type="primary" size="medium">提交</el-button>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="abilityBox = false">取 消</el-button>
          <el-button type="primary" @click="abilityBox = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 技术领域编辑 -->
    <div class="editField">
      <el-dialog
        title="技术领域编辑"
        :visible.sync="editField"
        width="40%">
        <p><span style="color:red;">*</span>技术领域:&nbsp;<el-input type="primary" v-model="editFieldMes.name" style="width:350px;" placeholder="请输入技术领域名称"></el-input></p>
        <p style="marginTop:15px;"><span style="color:red;opacity:0;">*</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;排序:&nbsp;<el-input type="primary" placeholder="请输入排序" v-model="editFieldMes.num" style="width:350px;"></el-input></p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editField = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="editField = false" size="medium">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 能力编辑 -->
    <div class="editField">
      <el-dialog
        title="能力编辑"
        :visible.sync="editAbility"
        width="40%">
        <p><span style="color:red;">*</span>技术领域:&nbsp;<el-input type="primary" v-model="editAbilityMes.name" style="width:350px;" placeholder="请输入技术领域名称"></el-input></p>
        <p style="marginTop:15px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red;">*</span>日薪:&nbsp;<el-input type="primary" placeholder="请输入日薪" v-model="editAbilityMes.dayMoney" style="width:350px;"></el-input></p>
        <p style="marginTop:15px;"><span style="color:red;opacity:0;">*</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;排序:&nbsp;<el-input type="primary" placeholder="请输入排序" v-model="editAbilityMes.num" style="width:350px;"></el-input></p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editAbility = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="editAbility = false" size="medium">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataLength:99,//数据总和
      pageNum:10,//总页数
      currentPage3:1,//分页器类型
      addField:false,//添加技术领域
      addFieldMes:{
        fieldName:null,//技术领域名称
        fieldNum:null,//排序
        fieldList:[
          {
            num:0,//排序
            fieldText:null,//能力说明
            dayMoney:null,//日薪
            fieldNum:null,//排序
          }
        ]
      },
      abilityBox:false,//添加能力
      abilityName:null,//能力名称
      editField:false,//技术领域编辑
      editFieldMes:{
        name:null,//技术领域名称
        num:null,//排序
      },
      editAbility:false,//能力编辑
      editAbilityMes:{
        name:null,//能力名称
        dayMoney:null,//日薪
        num:null,//排序
      },
      fieldList:[
        {
          num:0,
          name:'Ucc',
          state:1,
          children:[
            {
              name:'初级工程师',
              daymoney:200,
              state:1,
              num:'1-1'
            },
            {
              name:'中级工程师',
              daymoney:400,
              state:1,
              num:'1-2'
            },
            {
              name:'高级工程师',
              daymoney:500,
              state:1,
              num:'1-3'
            },
          ]
        },
        {
          num:1,
          name:'数通',
          state:2,
          children:[
            {
              name:'初级工程师',
              daymoney:200,
              state:1,
              num:'2-1'
            },
            {
              name:'中级工程师',
              daymoney:400,
              state:1,
              num:'2-2'
            },
            {
              name:'高级工程师',
              daymoney:500,
              state:1,
              num:'2-3'
            },
          ]
        },
      ]
    }
  },
  methods:{
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
    addLocaField(){//添加能力行
      this.addFieldMes.fieldList.push({
        num:this.addFieldMes.fieldList.length,//排序
        fieldText:null,//能力说明
        dayMoney:null,//日薪
        fieldNum:null,//排序
      })
    },
    delLocaField(index){//删除能力行
      if(this.addFieldMes.fieldList.length>1){
        this.addFieldMes.fieldList.splice(index,1)
      }else{
        this.$message.error('不能再删了哦')
      }
    },
    addAbility(index){//添加能力
      this.abilityBox=true;
      this.abilityName=this.fieldList[index].name;
    },
    editFieldPar(index){//编辑技术领域
      this.editFieldMes.name=this.fieldList[index].name;
      this.editFieldMes.num=this.fieldList[index].num;
      this.editField=true;
    },
    editAbilityPar(index,key){
      this.editAbility=true;
      this.editAbilityMes.name=this.fieldList[index].children[key].name;
      this.editAbilityMes.dayMoney=this.fieldList[index].children[key].daymoney;
      this.editAbilityMes.num=this.fieldList[index].children[key].num;
    }
  },
}
</script>

<style lang="scss" scoped>
.field_admin{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .field_titleOper{
    width: 98%;
    margin:0 auto;
    margin-top: 50px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    position: relative;
    .dataLength{
      display: inline-block;
      width: 87%;
      text-align: right;
      box-sizing: border-box;
      padding-right: 50px;
    }
    i{
      font-size: 32px;
      color:#eb7a1d;
      cursor:pointer;
      position: absolute;
      right:20px;
      top:0;
    }
  }
  .operTwo:nth-of-type(odd){
    background:#e5e4e4;
  }
  .field_title{
    text-align: center;
    line-height: 40px;
    background: #eb7a1d;
    color:white;
  }
  .field_con{
    text-align: center;
    line-height: 50px;
    i{
      font-size: 20px;
      cursor:pointer;
    }
    i:nth-child(2){
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  .project_page{
    width: 98%;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .pushField{
    max-height:500px;
    overflow-y: auto;
    p{
      width: 100%;
      text-align: center;
    }
    .pushTitle{
      text-align: center;
      background: #eb7a1d;
      color:white;
      line-height: 40px;
    }
    .pushCon{
      text-align: center;
      line-height: 50px;
      i{
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .pushTitle{
    text-align: center;
    background: #eb7a1d;
    color:white;
    line-height: 40px;
  }
  .pushCon{
    text-align: center;
    line-height: 50px;
    i{
      font-size: 20px;
      cursor: pointer;
    }
  }
  .editField{
    p{
      width: 80%;
      margin:0 auto;
    }
  }
}
</style>
