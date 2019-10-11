<!-- 进程节点管理 -->
<template lang="html">
  <div class="point_admin">
    <p class="point_titleOper">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="addPoint=true">添加进程节点</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <i class="el-icon-refresh"></i>
    </p>
    <div class="" style="minHeight:550px;width:98%;margin:0 auto;">
      <el-row>
        <el-col :span="2"><div class="point_title">序号</div></el-col>
        <el-col :span="10"><div class="point_title">名称</div></el-col>
        <el-col :span="4"><div class="point_title">排序号</div></el-col>
        <el-col :span="4"><div class="point_title">状态</div></el-col>
        <el-col :span="4"><div class="point_title">操作</div></el-col>
      </el-row>
      <el-row class="operTwo publicHover" v-for="(point,index) in pointList" :key="'Point'+index">
        <el-col :span="2"><div class="point_mes">{{point.num+1}}</div></el-col>
        <el-col :span="10"><div class="point_mes">{{point.name}}</div></el-col>
        <el-col :span="4"><div class="point_mes">{{point.num+1}}</div></el-col>
        <el-col :span="4"><div class="point_mes">
          <span v-if="point.state==1" style="background:green;border-radius:8px;color:white;padding:3px;fontSize:12px;">已启用</span>
          <span v-else style="background:red;border-radius:8px;color:white;padding:3px;fontSize:12px;">已停用</span>
        </div></el-col>
        <el-col :span="4"><div class="point_mes">
          <el-tooltip class="item" effect="dark" content="停用节点" placement="bottom" v-if="point.state==1">
            <i class="el-icon-remove-outline" ></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="启用节点" placement="bottom" v-else>
            <i class="el-icon-circle-check-outline" style="color:#eb7a1d;"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑节点" placement="bottom">
            <i class="el-icon-edit" style="color:#eb7a1d;marginLeft:5px;marginRight:5px;" @click="editPointPar(index)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除节点" placement="bottom">
            <i class="el-icon-delete"></i>
          </el-tooltip>
        </div></el-col>
      </el-row>
    </div>
    <!-- 分页器 -->
    <p class="point_page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :total="pageNum">
      </el-pagination>
    </p>
    <!-- 添加进程节点 -->
    <div class="">
      <el-dialog
        title="添加局点"
        :visible.sync="addPoint"
        width="45%">
        <ul class="addPoint">
          <li>
            <span><i style="color:red;">*</i>名称:</span>
            <el-input type="primary" placeholder="请输入节点名称" style="width:300px;" v-model="pointName"></el-input>
          </li>
          <li>
            <span><i style="color:red;">*</i>排序号:</span>
            <el-input type="primary" placeholder="请输入排序号" style="width:300px;" v-model="pointNum"></el-input>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPoint = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="addPoint = false" size="medium">提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑进程节点 -->
    <div class="">
      <el-dialog
        title="编辑局点"
        :visible.sync="editPoint"
        width="45%">
        <ul class="addPoint">
          <li>
            <span><i style="color:red;">*</i>名称:</span>
            <el-input type="primary" placeholder="请输入节点名称" style="width:300px;" v-model="editPointMes.pointName"></el-input>
          </li>
          <li>
            <span><i style="color:red;">*</i>排序号:</span>
            <el-input type="primary" placeholder="请输入排序号" style="width:300px;" v-model="editPointMes.pointNum"></el-input>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editPoint = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="editPoint = false" size="medium">提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataLength:88,//数据条数,
      pointList:[
        {
          num:0,
          name:'进场开工',
          state:1
        },
        {
          num:1,
          name:'硬件安装',
          state:0
        },
      ],
      pageNum:10,//总页数
      currentPage3:1,//分页器类型
      addPoint:false,//添加进程节点
      pointName:null,//添加节点名称
      pointNum:null,//添加节点排序号
      editPointMes:{
        pointName:null,//修改局点名称
        pointNum:null,//修改排序号
      },
      editPoint:false,//编辑进程节点
    }
  },
  methods:{
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
    editPointPar(index){
      this.editPointMes.pointName=this.pointList[index].name;
      this.editPointMes.pointNum=this.pointList[index].num;
      this.editPoint=true;
    },
  }
}
</script>

<style lang="scss" scoped>
.point_admin{
  width: 100%;
  margin:0 auto;
  height: 100%;
  overflow-x: hidden;
  .point_titleOper{
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
  .point_title{
    line-height: 40px;
    text-align: center;
    background: #eb7a1d;
    color:white;
  }
  .point_mes{
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
  .addPoint{
    width: 80%;
    margin:0 auto;
    li{
      line-height: 60px;
      span{
        display: inline-block;
        width: 100px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 20px;
      }
    }
  }
  .point_page{
    width: 98%;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 50px;
  }
}
</style>
