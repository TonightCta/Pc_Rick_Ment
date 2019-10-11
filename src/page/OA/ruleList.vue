<!-- 规则列表 -->
<template lang="html">
  <div class="rule_list">
    <p class="other_title">
      <el-button icon="el-icon-plus" type="primary" size="medium" @click="pushRule=true">添加规则</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
        <i class="el-icon-refresh"></i>
      </el-tooltip>
    </p>
    <div class="" style="minHeight:500px;">
      <el-row>
        <el-col :span="2"><div class="rule_title">序号</div></el-col>
        <el-col :span="7"><div class="rule_title">规则名称</div></el-col>
        <el-col :span="12"><div class="rule_title">规则流程</div></el-col>
        <el-col :span="3"><div class="rule_title">操作</div></el-col>
      </el-row>
      <el-row class="el_con publicHover" v-for="(rule,index) in ruleList" :key="'Rule'+index">
        <el-col :span="2"><div class="rule_con">{{rule.num+1}}</div></el-col>
        <el-col :span="7"><div class="rule_con">{{rule.name}}</div></el-col>
        <el-col :span="12"><div class="rule_con">{{rule.people}}</div></el-col>
        <el-col :span="3"><div class="rule_con">
          <i class="el-icon-edit" @click="editRuleEvent(index)"></i>
        </div></el-col>
      </el-row>
    </div>
    <!-- 添加规则 -->
    <div class="">
      <el-dialog
        title="添加规则"
        :visible.sync="pushRule"
        width="45%">
        <div class="" style="display:flex;width:100%;maxHeight:400px;overflow:auto;">
          <ul class="ruleBoxTitle">
            <li>规则名称:</li>
            <li>规则流程:</li>
          </ul>
          <ul class="ruleBoxCon">
            <li><el-input type="primary" v-model="addRuleMes.ruleName" style="width:350px;" size="medium" placeholder="请输入规则名称"></el-input></li>
            <li v-for="(ditor,index) in addRuleMes.ditorList" class="ditorDom" :key="'Ditor'+index">
              <p class="input_rule">
                第&nbsp;<el-input type="primary" size="mini" v-model="ditor.num+1" style="width:40px;height:30px;"></el-input>&nbsp;审核人:
                <el-select
                  v-model="ditor.name"
                  filterable
                  remote
                  reserve-keyword
                  size="medium"
                  style="width:120px;"
                  placeholder="审核人名称"
                  :remote-method="remoteMethod"
                  :loading="cusLoading">
                  <el-option
                    v-for="(item,key) in restaurants"
                    :key="item.value+key"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <i class="el-icon-delete" @click="delDitor(index)"></i>
              </p>
              <p class="pushIcon">
                <span style="opacity:0;">{{ditor.num}}</span>
              </p>
            </li>
            <li>
              <p class="pushBtn">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="additor()">添加审核人</el-button>
              </p>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="pushRule = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="pushRule = false" size="medium">提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 规则编辑 -->
    <div class="">
      <el-dialog
        title="添加规则"
        :visible.sync="editRule"
        width="45%">
        <div class="" style="display:flex;width:100%;maxHeight:400px;overflow:auto;">
          <ul class="ruleBoxTitle">
            <li>规则名称:</li>
            <li>规则流程:</li>
          </ul>
          <ul class="ruleBoxCon">
            <li><el-input type="primary" v-model="editRuleMes.name" style="width:350px;" size="medium" placeholder="请输入规则名称"></el-input></li>
            <li v-for="(ditorEdit,index) in editRuleMes.children" class="ditorDom" :key="'Ditor'+index">
              <p class="input_rule">
                第&nbsp;<el-input type="primary" size="mini" v-model="ditorEdit.num" style="width:40px;height:30px;"></el-input>&nbsp;审核人:
                <el-select
                  v-model="ditorEdit.name"
                  filterable
                  remote
                  reserve-keyword
                  size="medium"
                  style="width:120px;"
                  placeholder="审核人名称"
                  :remote-method="remoteMethod"
                  :loading="cusLoading">
                  <el-option
                    v-for="(item,key) in restaurants"
                    :key="item.value+key"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <i class="el-icon-delete"></i>
              </p>
              <p class="pushIcon">
                <span style="opacity:0;">{{ditorEdit.num}}</span>
              </p>
            </li>
            <li>
              <p class="pushBtn">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="additor()">添加审核人</el-button>
              </p>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editRule = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="editRule = false" size="medium">提&nbsp;交</el-button>
        </span>
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
</template>

<script>
export default {
  data(){
    return{
      currentPage3:1,//分页器类型
      page:0,//页码
      pageNum:10,//总页数
      cusLoading:false,//查询Loading
      restaurants:[],//审核人查询列表
      dataLength:88,
      ruleList:[
        {
          num:0,
          name:'研发部',
          people:'何玄→黄桢',
          children:[
            {
              num:1,
              name:'何玄'
            },
            {
              num:2,
              name:'黄桢'
            }
          ]
        },
        {
          num:1,
          name:'财务部',
          people:'肖丽→何玄→黄桢',
          children:[
            {
              num:1,
              name:'肖丽'
            },
            {
              num:2,
              name:'何玄'
            },
            {
              num:3,
              name:'黄桢'
            }
          ]
        }
      ],
      pushRule:false,//添加规则
      addRuleMes:{
        ruleName:null,//规则名称
        ditorList:[
          {
            num:0,//审核人排序
            name:null,//审核人名称
          }
        ],
      },
      editRuleMes:{//编辑规则
        name:null,
        ditorList:[]
      },
      editRule:false,//编辑规则弹框
    }
  },
  methods:{
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {

    },
    additor(){//添加审核人
      this.addRuleMes.ditorList.push({
        num:this.addRuleMes.ditorList[this.addRuleMes.ditorList.length-1].num+1,
        name:null,
      })
    },
    remoteMethod(query) {//远程查询审核人列表
        if (query !== '') {
          let formdata=new FormData();
          formdata.append('name',query);
          formdata.append('size',20);
          formdata.append('page',0);
          this.$axios.post(this.url+'/findProjectListByCondition',formdata).then((res)=>{
            if(res.data.code==0){
              this.restaurants=res.data.data.content.map(item=>{
                return {value:item.name,label:item.name,id:item.id}
              });
            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            this.$message.error('未知错误,请联系管理员');
            // console.log(err)
          })
          this.cusLoading = true;
          setTimeout(() => {
            this.cusLoading = false;
            this.restaurants.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.restaurants = [];
        }
    },
    delDitor(index){//删除审核人
      if(this.addRuleMes.ditorList.length>1){
        this.addRuleMes.ditorList.splice(index,1);
        for(let i in this.addRuleMes.ditorList){
          this.$set(this.addRuleMes.ditorList[i],'num',i++);
        }
      }else{
        this.$message.error('不能再删除了哦')
      }
    },
    editRuleEvent(index){
      this.editRuleMes=this.ruleList[index];
      this.editRule=true;
    },
  }
}
</script>

<style lang="scss" scoped>
.rule_list{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .other_title{
    margin-top: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
    position: relative;
    .dataLength{
      position: absolute;
      right:60px;
      line-height: 40px;
    }
    i{
      font-size: 30px;
      color:#eb7a1d;
      position: absolute;
      right: 20px;
      top:5px;
      cursor:pointer;
    }
  }
  .rule_title{
    line-height: 40px;
    text-align: center;
    color:white;
    background: #eb7a1d;
  }
  .rule_con{
    line-height: 50px;
    font-size: 14px;
    text-align: center;
    i{
      font-size: 20px;
      color:#eb7a1d;
      cursor:pointer;
    }
  }
  .el_con:nth-of-type(even){
    background:#eee;
  }
  .ruleBoxTitle{
    width: 25%;
    li{
      line-height: 50px;
      text-align: right;
      box-sizing: border-box;
      padding-right: 10px;
    }
  }
  .ruleBoxCon{
    width: 75%;
    li{
      line-height: 50px;
    }
    .ditorDom{
      box-sizing: border-box;
      line-height: 50px;
      position: relative;
      i{
        cursor:pointer;
        color:#eb7a1d;
        font-size:20px;
        position: absolute;
        right:140px;
        top:15px;
      }
      .input_rule{
        width: 100%;
        box-sizing: border-box;
        padding-left: 55px;
      }
      .pushIcon{
        width: 30px;
        height: 66px;
        background: url('../../../static/img/ruleIcon.png');
        background-size: 100% 100%;
        margin:0 auto;
      }

    }
    li:last-child{
      .pushBtn{
        width: 100%;
        text-align: center;
      }
    }
  }
}
.order_page{
  width: 98%;
  text-align: right;
  margin-top: 55px;
  margin-bottom:60px;
}
</style>
