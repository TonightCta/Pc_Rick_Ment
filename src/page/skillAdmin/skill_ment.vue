<!-- 技能管理 -->
<template lang="html">
  <div class="skill_ment">
    <div class="search_skill">
      <ul>
        <li>
          <p>技能名称:&nbsp;<el-input type="primary" style="width:60%;" v-model="searchName" placeholder="请输入项目名称"></el-input></p>
          <p>技能分类:&nbsp;
            <el-select v-model="skillText" placeholder="技能分类" style="width:60%;">
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
          <p>技能类型:&nbsp;
            <el-select v-model="statusText" placeholder="技能类型" style="width:60%;">
              <el-option
                v-for="item in skillStatus"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </p>
          <p><el-button type="primary" size="medium" icon="el-icon-zoom-in">筛选</el-button>
            <el-button size="medium" type="primary" icon="el-icon-remove">取消筛选</el-button></p>
        </li>
      </ul>
    </div>
    <p class="skill_title">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="addSkill=true">添加技能</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <i class="el-icon-refresh"></i>
    </p>
    <div class="skillList">
      <el-row>
        <el-col :span="4"><div class="list_title">序号</div></el-col>
        <el-col :span="4"><div class="list_title">名称</div></el-col>
        <el-col :span="4"><div class="list_title">分类</div></el-col>
        <el-col :span="4"><div class="list_title">类型</div></el-col>
        <el-col :span="4"><div class="list_title">状态</div></el-col>
        <el-col :span="4"><div class="list_title">操作</div></el-col>
      </el-row>
      <el-row class="skillCon" v-for="(skill,index) in skillList" :key="'SK'+index">
        <el-col :span="4"><div class="list_con">{{skill.num}}</div></el-col>
        <el-col :span="4"><div class="list_con">{{skill.name}}</div></el-col>
        <el-col :span="4"><div class="list_con">
          <span v-show="skill.fica==0">其他</span>
          <span v-show="skill.fica==1">厂商</span>
          <span v-show="skill.fica==2">产品类型</span>
          <span v-show="skill.fica==3">专项技能</span>
        </div></el-col>
        <el-col :span="4"><div class="list_con">
          <span v-if="skill.type==0">默认</span>
          <span v-else>自定义</span>
        </div></el-col>
        <el-col :span="4"><div class="list_con">
          <span v-if="skill.status==0">启用</span>
          <span v-else>停用</span>
        </div></el-col>
        <el-col :span="4"><div class="list_con oper">
          <el-tooltip class="item" effect="dark" content="启用" placement="bottom">
            <i class="el-icon-circle-check-outline" style="color:green;" v-if="skill.status==1"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="停用" placement="bottom">
            <i class="el-icon-remove-outline" style="color:red;" v-if="skill.status==0"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <i class="el-icon-edit cen" style="color:#eb7a1d;"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <i class="el-icon-delete"></i>
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
      title="提示"
      :visible.sync="addSkill"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSkill = false">取 消</el-button>
        <el-button type="primary" @click="addSkill = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentPage3:1,//分页器类型
      pageNum:10,//总页数
      dataLength:282,//总数据
      addSkill:false,//添加技能
      searchName:null,//搜索项目名称
      skillText:null,//技能分类选择
      skillType:[
        '其他','厂商','产品类型','专项技能'
      ],
      skillStatus:[
        '默认','自定义'
      ],
      statusText:null,//技能类型选择
      skillList:[
        {
          num:0,
          name:'思科',
          fica:0,
          type:0,
          status:0,
        },
        {
          num:1,
          name:'思科',
          fica:1,
          type:1,
          status:1,
        },
        {
          num:2,
          name:'思科',
          fica:2,
          type:0,
          status:1,
        },
        {
          num:3,
          name:'思科',
          fica:3,
          type:0,
          status:1,
        },
      ]
    }
  },
  methods:{
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page=val-1;
    },
  }
}
</script>

<style lang="scss" scoped>
.skill_ment{
  width:98%;
  margin:0 auto;
  .search_skill{
    width: 80%;
    margin:0 auto;
    height: 200px;
    ul{
      width: 100%;
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
      right:30px;
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
  .order_page{
    width: 98%;
    text-align: right;
  }
}
</style>
