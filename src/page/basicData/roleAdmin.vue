<!-- 角色管理 -->
<template lang="html">
  <div class="role_admin">
    <p class="role_titleOper">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="addRole=true">添加角色</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <el-tooltip>

      </el-tooltip>
      <i class="el-icon-refresh"></i>
    </p>
    <div class="" style="minHeight:550px;width:98%;margin:0 auto;">
      <el-row>
        <el-col :span="2"><div class="role_title">序号</div></el-col>
        <el-col :span="4"><div class="role_title">角色名称</div></el-col>
        <el-col :span="6"><div class="role_title">说明</div></el-col>
        <el-col :span="3"><div class="role_title">菜单</div></el-col>
        <el-col :span="3"><div class="role_title">创建时间</div></el-col>
        <el-col :span="3"><div class="role_title">状态</div></el-col>
        <el-col :span="3"><div class="role_title">操作</div></el-col>
      </el-row>
      <el-row class="operTwo" v-for="(role,index) in roleList" :key="'Role'+index">
        <el-col :span="2"><div class="role_mes">{{role.num+1}}</div></el-col>
        <el-col :span="4"><div class="role_mes">{{role.name}}</div></el-col>
        <el-col :span="6"><div class="role_mes">{{role.remark}}</div></el-col>
        <el-col :span="3"><div class="role_mes">
          <i class="el-icon-menu" style="color:#eb7a1d;"></i>
        </div></el-col>
        <el-col :span="3"><div class="role_mes">{{role.creatTime}}</div></el-col>
        <el-col :span="3"><div class="role_mes">
          <span v-if="role.state==1" style="background:green;border-radius:8px;color:white;padding:3px;fontSize:12px;">已启用</span>
          <span v-else style="background:red;border-radius:8px;color:white;padding:3px;fontSize:12px;">已停用</span>
        </div></el-col>
        <el-col :span="3"><div class="role_mes">
          <el-tooltip class="item" effect="dark" content="停用角色" placement="bottom" v-if="role.state==1">
            <i class="el-icon-remove-outline" ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="启用角色" placement="bottom" v-else>
            <i class="el-icon-circle-check-outline" style="color:#eb7a1d;"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑角色" placement="bottom">
            <i class="el-icon-edit" style="color:#eb7a1d;marginLeft:5px;marginRight:5px;" @click="addRole=true"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除角色" placement="bottom">
            <i class="el-icon-delete"></i>
          </el-tooltip>
        </div></el-col>
      </el-row>
    </div>
    <!-- 分页器 -->
    <p class="role_page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :total="pageNum">
      </el-pagination>
    </p>
    <!-- 添加角色 -->
    <div class="addRole">
      <el-dialog
        title="添加角色"
        :visible.sync="addRole"
        width="40%">
        <p class="input"><span style="color:red;">*</span>角色名称:&nbsp;<el-input type="primary" style="width:350px;" v-model="addRoleMes.name" placeholder="请输入角色名称"></el-input></p>
        <p class="input" style="marginTop:10px;"><span style="color:red;opacity:0;">*</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;说明:&nbsp;<el-input type="primary" style="width:350px;" v-model="addRoleMes.remark" placeholder="请输入说明"></el-input></p>
        <div class="roleTree">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red;">*</span>频道:&nbsp;
          </p>
          <div class="" style="width:80%;">
            <el-tree
              :data="data2"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[1,2,3]"
              @check-change="abc"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addRole = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="addRole = false" size="medium">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataLength:88,
      roleList:[
        {
          num:0,
          name:'派大星',
          remark:'海绵海绵我是大星',
          creatTime:'2019/07/26',
          state:0,
        },
        {
          num:1,
          name:'海绵宝宝',
          remark:'大星大星我是海绵',
          creatTime:'2019/07/26',
          state:1,
        }
      ],
      pageNum:10,//总页数
      currentPage3:1,//分页器类型
      addRole:false,//添加角色
      addRoleMes:{
        name:null,//角色名称
        remark:null,//说明
      },
      data2: [{
       id: 1,
       label: '一级 1',
       children: [{
         id: 4,
         label: '二级 1-1',
         children: [{
           id: 9,
           label: '三级 1-1-1'
         }, {
           id: 10,
           label: '三级 1-1-2'
         }]
       }]
       }, {
         id: 2,
         label: '一级 2',
         children: [{
           id: 5,
           label: '二级 2-1'
         }, {
           id: 6,
           label: '二级 2-2'
         }]
       }, {
         id: 3,
         label: '一级 3',
         children: [{
           id: 7,
           label: '二级 3-1'
         }, {
           id: 8,
           label: '二级 3-2'
         }]
      }],
      defaultProps: {
          children: 'children',
          label: 'label'
      },
    }
  },
  methods:{
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
    abc(value){
      // console.log(value.label)
    }
  }
}
</script>

<style lang="scss" scoped>
.role_admin{
  width: 100%;
  margin:0 auto;
  height: 100%;
  overflow-x: hidden;
  .role_titleOper{
    width: 98%;
    margin:0 auto;
    margin-top: 50px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    position: relative;
    .dataLength{
      display: inline-block;
      width: 88%;
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
  .role_title{
    line-height: 40px;
    background: #eb7a1d;
    text-align: center;
    color:white;
    margin-top: 10px;
  }
  .role_mes{
    line-height: 40px;
    text-align: center;
    font-size: 13px;
    i{
      font-size: 20px;
      cursor: pointer;
    }
  }
  .operTwo:nth-of-type(even){
    background:#eee;
  }
  .role_page{
    width: 98%;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .addRole{
    .roleTree{
      width: 80%;
      margin:0 auto;
      display: flex;
      margin-top: 10px;
      p{
        width: 80px!important;
        // text-align: center;
      }
    }
    .input{
      width: 80%;
      margin:0 auto;
    }
  }
}
</style>
