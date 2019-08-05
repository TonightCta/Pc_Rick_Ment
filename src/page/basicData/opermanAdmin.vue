<!-- 操作人员管理 -->
<template lang="html">
  <div class="operman_admin">
    <p class="operman_titleOper">
      <el-button type="primary" icon="el-icon-plus" size="medium">添加操作人员</el-button>
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
            <i class="el-icon-edit" style="color:#eb7a1d;marginLeft:5px;marginRight:5px;"></i>
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
  </div>
</template>

<script>
export default {
  data(){
    return{
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
    }
  },
  methods:{
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

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
    line-height: 40px;
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
}
</style>
