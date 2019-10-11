<!-- 员工管理 -->
<template lang="html">
  <div class="staff_tion">
    <div class="staff_con">
      <div class="staff_choose">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="staff_lst">
        <p class="staff_oper">
          <el-button icon="el-icon-plus" type="primary" size="medium">添加员工</el-button>
          <span class="staff_length">
            共有员工:<span style="color:#eb7a1d;font-weight:bold;">&nbsp;{{dataLength}}&nbsp;</span>人
          </span>
          <i class="el-icon-refresh"></i>
        </p>
        <el-row>
          <el-col :span="2"><div class="staffTitle">序号</div></el-col>
          <el-col :span="7"><div class="staffTitle">待定</div></el-col>
          <el-col :span="4"><div class="staffTitle">待定</div></el-col>
          <el-col :span="3"><div class="staffTitle">待定</div></el-col>
          <el-col :span="3"><div class="staffTitle">待定</div></el-col>
          <el-col :span="3"><div class="staffTitle">待定</div></el-col>
          <el-col :span="2"><div class="staffTitle">操作</div></el-col>
        </el-row>
        <div class="" style="minHeight:500px;">
          <el-row class="el_con publicHover" v-for="(staff,index) in staffList" :key="'Staff'+index">
            <el-col :span="2"><div class="staffCon">{{staff.num+1}}</div></el-col>
            <el-col :span="7"><div class="staffCon">{{staff.text}}</div></el-col>
            <el-col :span="4"><div class="staffCon">{{staff.text}}</div></el-col>
            <el-col :span="3"><div class="staffCon">{{staff.text}}</div></el-col>
            <el-col :span="3"><div class="staffCon">{{staff.text}}</div></el-col>
            <el-col :span="3"><div class="staffCon">{{staff.text}}</div></el-col>
            <el-col :span="2"><div class="staffCon">
              <i class="el-icon-edit"></i>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        currentPage3:1,//分页器类型
        page:0,//页码
        pageNum:10,//总页数
        staffList:[
          {
            num:0,
            text:'待定'
          },
          {
            num:1,
            text:'待定',
          }
        ],
        dataLength:88,//数据总和
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
  },
  methods:{
    handleNodeClick(data) {
       // console.log(data);
    },
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {

    },
  }
}
</script>

<style lang="scss" scoped>
.staff_tion{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .staff_con{
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding-top: 30px;
    .staff_choose{
      width: 20%;
      box-sizing: border-box;
    }
    .staff_lst{
      width: 80%;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 10px;
      overflow-y: auto;
      height: 80vh;
      .staff_oper{
        height: 40px;
        border-bottom:1px solid #eee;
        margin-bottom: 5px;
        position: relative;
        .staff_length{
          position: absolute;
          right:55px;
          line-height: 40px;
        }
        i{
          font-size: 30px;
          position: absolute;
          right:15px;
          top:5px;
          color:#eb7a1d;
          cursor:pointer;
        }
      }
      .staffTitle{
        line-height: 40px;
        text-align: center;
        background: #eb7a1d;
        color:white;
      }
      .staffCon{
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        i{
          font-size: 18px;
          color:#eb7a1d;
          cursor:pointer;
        }
      }
      .el_con:nth-of-type(even){
        background:#eee;
      }
      .order_page{
        width: 98%;
        text-align: right;
        margin-top: 55px;
        margin-bottom:60px;
      }
    }
  }
}
</style>
