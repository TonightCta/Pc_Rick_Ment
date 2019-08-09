<!-- 操作人员管理 -->
<template lang="html">
  <div class="operman_admin">
    <p class="operman_titleOper">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="addOperMan=true;">添加操作人员</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <i class="el-icon-refresh"></i>
    </p>
    <div class="" style="minHeight:550px;width:98%;margin:0 auto;">
      <el-row>
        <el-col :span="2"><div class="operman_title">序号</div></el-col>
        <el-col :span="3"><div class="operman_title">登录名</div></el-col>
        <el-col :span="3"><div class="operman_title">昵称</div></el-col>
        <el-col :span="3"><div class="operman_title">手机</div></el-col>
        <el-col :span="3"><div class="operman_title">邮箱</div></el-col>
        <el-col :span="3"><div class="operman_title">角色</div></el-col>
        <el-col :span="3"><div class="operman_title">创建时间</div></el-col>
        <el-col :span="2"><div class="operman_title">状态</div></el-col>
        <el-col :span="2"><div class="operman_title">操作</div></el-col>
      </el-row>
      <el-row class="operTwo" v-for="(operman,index) in opermanList" :key="'Operman'+index">
        <el-col :span="2"><div class="operman_mes">{{operman.num+1}}</div></el-col>
        <el-col :span="3"><div class="operman_mes">{{operman.loginName}}</div></el-col>
        <el-col :span="3"><div class="operman_mes">{{operman.nickName}}</div></el-col>
        <el-col :span="3"><div class="operman_mes">{{operman.phone}}</div></el-col>
        <el-col :span="3"><div class="operman_mes">{{operman.email}}</div></el-col>
        <el-col :span="3"><div class="operman_mes">{{operman.role}}</div></el-col>
        <el-col :span="3"><div class="operman_mes">{{operman.creatTime}}</div></el-col>
        <el-col :span="2"><div class="operman_mes">
          <span v-if="operman.state==1" style="background:green;border-radius:8px;color:white;padding:3px;fontSize:12px;">已启用</span>
          <span v-else style="background:red;border-radius:8px;color:white;padding:3px;fontSize:12px;">已停用</span>
        </div></el-col>
        <el-col :span="2"><div class="operman_mes">
          <el-tooltip class="item" effect="dark" content="停用操作人员" placement="bottom" v-if="operman.state==1">
            <i class="el-icon-remove-outline" ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="启用操作人员" placement="bottom" v-else>
            <i class="el-icon-circle-check-outline" style="color:#eb7a1d;"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑操作人员" placement="bottom">
            <i class="el-icon-edit" style="color:#eb7a1d;marginLeft:5px;marginRight:5px;" @click="editOper(index)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除操作人员" placement="bottom">
            <i class="el-icon-delete"></i>
          </el-tooltip>
        </div></el-col>
      </el-row>
    </div>
    <!-- 分页器 -->
    <p class="operman_page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :total="pageNum">
      </el-pagination>
    </p>
    <!-- 添加操作人员 -->
    <div class="">
      <el-dialog
        title="添加操作人员"
        :visible.sync="addOperMan"
        width="40%">
        <div class="" style="display:flex;width:90%;margin:0 auto;height:350px;overflow:auto;">
          <ul class="operManTitle">
            <li><span style="color:red;">*</span>登录名:</li>
            <li><span style="color:red;">*</span>昵称:</li>
            <li><span style="color:red;">*</span>密码:</li>
            <li><span style="color:red;">*</span>确认密码:</li>
            <li><span style="color:red;">*</span>手机:</li>
            <li><span style="color:red;">*</span>邮箱:</li>
            <li><span style="color:red;">*</span>角色:</li>
          </ul>
          <ul class="operManCon">
            <li><el-input type="primary" style="width:350px;" placeholder="请输入登录名" v-model="addOperMes.loginName"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入昵称" v-model="addOperMes.nickName"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入密码" v-model="addOperMes.passWord"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请再次输入密码" v-model="addOperMes.turnPass"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入手机号" v-model="addOperMes.phone"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入邮箱地址" v-model="addOperMes.email"></el-input></li>
            <li>
              <el-select v-model="value" placeholder="请选择角色">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addOperMan = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="addOperMan = false" size="medium">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑操作人员 -->
    <div class="">
      <el-dialog
        title="添加操作人员"
        :visible.sync="editOperMan"
        width="40%">
        <div class="" style="display:flex;width:90%;margin:0 auto;">
          <ul class="operManTitle">
            <li><span style="color:red;">*</span>登录名:</li>
            <li><span style="color:red;">*</span>昵称:</li>
            <li><span style="color:red;">*</span>手机:</li>
            <li><span style="color:red;">*</span>邮箱:</li>
            <li><span style="color:red;">*</span>角色:</li>
          </ul>
          <ul class="operManCon">
            <li><el-input type="primary" style="width:350px;" placeholder="请输入登录名" v-model="editOperMes.loginName"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入昵称" v-model="editOperMes.nickName"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入手机号" v-model="editOperMes.phone"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入邮箱地址" v-model="editOperMes.email"></el-input></li>
            <li>
              <el-select v-model="value" placeholder="请选择角色">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editOperMan = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="editOperMan = false" size="medium">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{


      options: [{
               value: '选项1',
               label: '黄金糕'
             }, {
               value: '选项2',
               label: '双皮奶'
             }, {
               value: '选项3',
               label: '蚵仔煎'
             }, {
               value: '选项4',
               label: '龙须面'
             }, {
               value: '选项5',
               label: '北京烤鸭'
             }],
             value: '',


      // -------------------
      dataLength:88,//数据条数
      opermanList:[
        {
          num:0,
          loginName:'派大星',
          nickName:'派大星',
          phone:'18888888888',
          email:'tonightCta@gmail.com',
          role:'工程师',
          creatTime:'2019/07/20',
          state:0,
        },
        {
          num:1,
          loginName:'海绵宝宝',
          nickName:'海绵宝宝',
          phone:'19999999999',
          email:'tonightCta@gmail.com',
          role:'工程师',
          creatTime:'2019/07/20',
          state:1,
        }
      ],
      pageNum:10,//总页数
      currentPage3:1,//分页器类型
      addOperMan:false,//添加操作人员
      addOperMes:{
        loginName:null,//登录名
        nickName:null,//昵称
        passWord:null,//密码
        turnPass:null,//确认密码
        phone:null,//手机号
        email:null,//邮箱
        roleID:null,//角色ID
      },
      editOperMan:false,//编辑操作人员
      editOperMes:{
        loginName:null,//登录名
        nickName:null,//昵称
        phone:null,//手机号
        email:null,//邮箱
        roleID:null,//角色ID
      }
    }
  },
  methods:{
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
    editOper(index){//编辑工程师
      this.editOperMes.loginName=this.opermanList[index].loginName;
      this.editOperMes.nickName=this.opermanList[index].nickName;
      this.editOperMes.phone=this.opermanList[index].phone;
      this.editOperMes.email=this.opermanList[index].email;
      this.editOperMan=true;
    },
  }
}
</script>

<style lang="scss" scoped>
.operman_admin{
  width: 100%;
  margin:0 auto;
  height: 100%;
  overflow-x: hidden;
  .operman_titleOper{
    width: 98%;
    margin:0 auto;
    margin-top: 50px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    position: relative;
    .dataLength{
      display: inline-block;
      width: 85%;
      text-align: right;
      box-sizing: border-box;
      padding-right: 50px;
    }
    i{
      font-size: 32px;
      color:#eb7a1d;
      cursor:pointer;
      position: absolute;
      right:32px;
      top:0;
    }
  }
  .operman_title{
    line-height: 40px;
    text-align: center;
    background: #eb7a1d;
    color:white;
  }
  .operman_mes{
    text-align: center;
    font-size: 13px;
    line-height: 50px;
    i{
      font-size: 20px;
      cursor: pointer;
    }
  }
  .operTwo:nth-of-type(even){
    background:#eee;
  }
  .operman_page{
    width: 98%;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .operManTitle{
    width: 20%;
    li{
      line-height: 50px;
      text-align: right;
      box-sizing: border-box;
      padding-right: 10px;
    }
  }
  .operManCon{
    width: 80%;
    li{
      line-height: 50px;
    }
  }
}
</style>
