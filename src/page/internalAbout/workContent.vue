<!-- 工作内容管理 -->
<template lang="html">
  <div class="work_content">
    <div class="work_search">
      日期范围:
      <el-date-picker
        v-model="value7"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
    </div>
    <p class="work_title">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="addWork=true;">添加工作内容</el-button>
      <span>共有数据:&nbsp;<font style="color:#eb7a1d;font-weight:bold;">58</font>&nbsp;条</span>
      <el-tooltip class="item" effect="dark" content="刷新列表" placement="bottom">
        <i class="el-icon-refresh" style="color:#eb7a1d;fontSize:30px;cursor:pointer;"></i>
      </el-tooltip>
    </p>
    <div class="cust_con">
      <el-row>
        <el-col :span="2"><div class="cusMesTitle">序号</div></el-col>
        <el-col :span="9"><div class="cusMesTitle">项目名称/节点</div></el-col>
        <el-col :span="3"><div class="cusMesTitle">项目进程节点</div></el-col>
        <el-col :span="3"><div class="cusMesTitle">创建人</div></el-col>
        <el-col :span="2"><div class="cusMesTitle">时间</div></el-col>
        <el-col :span="3"><div class="cusMesTitle">阅览状态</div></el-col>
        <el-col :span="2"><div class="cusMesTitle">操作</div></el-col>
      </el-row>
      <el-row class="operTwo" v-for="(cusMes,index) in workList" :key="'CusMes'+index">
        <el-col :span="2"><div class="cusMesCon">{{cusMes.num}}</div></el-col>
        <el-col :span="9"><div class="cusMesCon">{{cusMes.name}}</div></el-col>
        <el-col :span="3"><div class="cusMesCon">{{cusMes.point}}</div></el-col>
        <el-col :span="3"><div class="cusMesCon">{{cusMes.ceratName}}</div></el-col>
        <el-col :span="2"><div class="cusMesCon">{{cusMes.time}}</div></el-col>
        <el-col :span="3"><div class="cusMesCon">
          <span v-if="cusMes.state==1" style="color:#eb7a1d;">已阅览</span>
          <span v-else style="color:#666;">未阅览</span>
        </div></el-col>
        <el-col :span="2"><div class="cusMesCon">
          <el-tooltip class="item" effect="dark" content="工作详情" placement="bottom">
            <i class="el-icon-document" style="color:#eb7a1d;" @click="workDetails(index)"></i>
          </el-tooltip>
          <i class="el-icon-delete"></i>
        </div></el-col>
      </el-row>
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
    <!-- 添加工作内容 -->
    <div class="">
      <el-dialog
        title="添加客户"
        :visible.sync="addWork"
        width="45%">
        <div class="add_work">
          <ul>
            <li><span style="color:red;">*</span>项目</li>
            <li><span style="color:red;">*</span>进程节点</li>
            <li><span style="color:red;">*</span>工作内容</li>
            <li style="marginTop:85px;"><span style="color:red;">*</span>工作时间段</li>
            <li>图片附件</li>
            <li>文档附件</li>
            <li>潜在风险描述</li>
          </ul>
          <ul>
            <li>
              <el-select
                v-model="cusName"
                filterable
                remote
                reserve-keyword
                size="medium"
                style="width:365px;"
                placeholder="请输入项目名称"
                :remote-method="remoteMethod"
                :loading="workLoading">
                <el-option
                  v-for="item in restaurants"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <el-select v-model="value" placeholder="请选择进程节点" size="medium" style="width:365px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <textarea @focus="getTear" @blur="clearTear" ref="proTear" placeholder="请输入工作内容"></textarea>
            </li>
            <li style="marginTop:-5px;">
              <el-time-select
                style="width:130px;"
                placeholder="起始时间"
                v-model="startTime"
                :picker-options="{
                  start: '08:00',
                  step: '01:00',
                  end: '23:00'
                }">
              </el-time-select>
              <el-time-select
                style="width:130px;"
                placeholder="结束时间"
                v-model="endTime"
                :picker-options="{
                  start: '09:00',
                  step: '01:00',
                  end: '24:00',
                  minTime: startTime
                }">
              </el-time-select>
            </li>
            <li class="file_up">
              <el-input type="primary" size="medium" style="width:240px;" placeholder="请选择图片附件"></el-input>
              <el-button type="primary" size="medium" icon="el-icon-upload">浏览文件</el-button>
              <input type="file" name="" value="" accept="image/*" class="file_dom">
            </li>
            <li class="file_up">
              <el-input type="primary" size="medium" style="width:240px;" placeholder="请选择文档附件"></el-input>
              <el-button type="primary" size="medium" icon="el-icon-upload">浏览文件</el-button>
              <input type="file" name="" value="" class="file_dom">
            </li>
            <li>
              <textarea @focus="getTear" @blur="clearTear" ref="proTear" placeholder="若项目存在项目风险，请在此处进行描述反馈"></textarea>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addWork = false">取 消</el-button>
          <el-button type="primary" @click="addWork = false">提 交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 工作内容详情 -->
    <div class="">
      <el-dialog
        title="添加客户"
        :visible.sync="workBox"
        width="45%">
        <div class="add_work">
          <ul>
            <li>项目:</li>
            <li>进程节点:</li>
            <li>工作内容:</li>
            <li>工作时间:</li>
            <li>文档附件:</li>
            <li>图片附件:</li>
          </ul>
          <ul>
            <li>{{workMes.name}}</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="workBox = false">取 消</el-button>
          <el-button type="primary" @click="workBox = false">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      startTime:null,
      endTime:null,
      value7:[],
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
      // 临时数据
      pageNum:10,//总页数
      currentPage3:1,//分页器类型
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      workList:[
        {
          num:1,
          name:'天津信息所数据设备更新项目/天津市',
          point:'加电单调',
          ceratName:'彭闯',
          time:'2019/05/17',
          state:1,
        },
        {
          num:2,
          name:'1Y01001812090L民生银行北京分行安防/贵阳市',
          point:'联调割接',
          ceratName:'彭闯',
          time:'2019/05/17',
          state:2,
        }
      ],
      addWork:false,//添加工作内容
      workLoading:false,//查询加载
      restaurants:[],//查询返回列表
      cusName:null,//查询名称
      workBox:false,//工作内容详情
      workMes:{},
    }
  },
  methods:{
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
    getTear(){//获取文本域焦点
      this.$refs.proTear.style.borderColor='#eb7a1d'
    },
    clearTear(){//失去文本域焦点
      this.$refs.proTear.style.borderColor='#DCDFE6'
    },
    workDetails(index){//项目详情
      this.workMes=this.workList[index];
      this.workBox=true;
    },
    remoteMethod(query) {//远程查询项目列表
        if (query !== '') {
          let formdata=new FormData();
          formdata.append('state',2);
          formdata.append('name',query);
          formdata.append('size',20);
          formdata.append('page',0);
          this.$axios.post(this.url+'/findCustomerListByCondition',formdata).then((res)=>{
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
          this.workLoading = true;
          setTimeout(() => {
            this.workLoading = false;
            this.restaurants.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.restaurants = [];
        }
    },
  }
}
</script>

<style lang="scss" scoped>
.work_content{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .work_search{
    width: 100%;
    text-align: center;
    line-height: 120px;
  }
  .work_title{
    width: 100%;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    position: relative;
    span{
      margin-left: 70%;
      position: absolute;
      line-height: 40px;
      right: 60px;
      font-size: 16px;
    }
    i{
      position: absolute;
      right:10px;
      top:5px;
    }
  }
  .cust_con{
    min-height: 500px;
    .operTwo:nth-of-type(odd){
      background:#e5e4e4;
    }
    margin-top: 5px;
    .cusMesTitle{
      line-height: 40px;
      text-align: center;
      background: #eb7a1d;
      color:white;
    }
    .cusMesCon{
      line-height: 38px;
      text-align: center;
      font-size: 14px;
      i{
        font-size: 20px;
        cursor:pointer;
        margin-left: 5px;
        margin-top:3px;
      }
    }
  }
  .project_page{
    width: 98%;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .add_work{
    width: 100%;
    display: flex;
    ul{
      li{
        line-height: 50px;
      }
    }
    ul:first-child{
      width: 30%;
      li{
        text-align: right;
        box-sizing: border-box;
        padding-right: 20px;
      }
    }
    ul:last-child{
      width: 70%;
      .file_up{
        position: relative;
        .file_dom{
          display: inline-block;
          width: 365px;
          height: 100%;
          position: absolute;
          left: 0;
          top:0;
          opacity: 0;
        }
      }
      li{
        textarea{
          outline: none;
          border:1px solid #DCDFE6;
          border-radius: 4px;
          padding: 13px;
          box-sizing: border-box;
          resize:none;
          height:120px;
          width:365px;
          transition: .3s all;
        }
        textarea::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #bebec8;
        }
        textarea:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #bebec8;
        }
        textarea::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #bebec8;
        }
        textarea::-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #bebec8;

        }
      }
    }
  }
}
</style>
