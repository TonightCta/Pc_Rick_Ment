<!-- 项目搭建 -->
<template lang="html">
  <div class="crestPro">
    <div class="pro_search">
      <ul>
        <li>
          日期选择:&nbsp;&nbsp;
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
        </li>
        <li>
          项目名称:&nbsp;&nbsp;
          <el-input type="primary" v-model="proName" placeholder="请输入项目名称" style="width:300px;"></el-input>
          <el-button type="primary" icon="el-icon-search" size="medium" style="margin-left:25px;">搜索</el-button>
        </li>
      </ul>
    </div>
    <p class="addEng">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="openPushBox()">添加项目</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
    </p>
    <p class="admin_reload">
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
        <i class="el-icon-refresh" @click="getProList()"></i>
      </el-tooltip>
    </p>
    <div class="pro_list" style="margin-top:2px;">
      <el-row>
        <el-col :span="1"><div class="pro_title">序号</div></el-col>
        <el-col :span="3"><div class="pro_title">项目名称</div></el-col>
        <el-col :span="1"><div class="pro_title ">产品线</div></el-col>
        <el-col :span="2"><div class="pro_title">项目状态</div></el-col>
        <el-col :span="2"><div class="pro_title">项目进度</div></el-col>
        <el-col :span="1"><div class="pro_title">创建人</div></el-col>
        <el-col :span="3"><div class="pro_title">创建时间</div></el-col>
        <el-col :span="2"><div class="pro_title speFont">第一步</br>实施节点及计划</div></el-col>
        <el-col :span="2"><div class="pro_title speFont">第二步</br>人员委派</div></el-col>
        <el-col :span="1"><div class="pro_title speFont">第三步</br>进程管理</div></el-col>
        <el-col :span="2"><div class="pro_title">项目文档</div></el-col>
        <el-col :span="1"><div class="pro_title">验货单</div></el-col>
        <el-col :span="1"><div class="pro_title">浏览</div></el-col>
        <el-col :span="2"><div class="pro_title">操作</div></el-col>
      </el-row>
      <div class="" style="minHeight:500px;" v-loading="proLoad">
        <el-row class="proMes" v-for="(pro,index) in proList" :key="'Pro'+index">
          <el-col :span="1"><div class="pro_oper">{{pro.num+1}}</div></el-col>
          <el-tooltip  class="item" effect="dark" :content="pro.name" placement="bottom">
            <el-col :span="3"><div class="pro_oper" style="cursor:pointer;">{{pro.name.substring(0,8)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="1"><div class="pro_oper ">{{pro.technologyName}}</div></el-col>
          <el-col :span="2"><div class="pro_oper">
            <span v-show="pro.state==2" style="background:rgb(255, 255, 153);">停工</span>
            <span v-show="pro.state==0" style="background:rgb(255, 140, 105);">未开工</span>
            <span v-show="pro.state==1" style="background:rgb(204, 255, 153);">开工</span>
            <span v-show="pro.state==4" style="background:rgb(102, 204, 255);">验收</span>
            <span v-show="pro.state==3" style="background:rgb(204, 255, 255);">完工</span>
          </div></el-col>
          <el-col :span="2"><div class="pro_oper">{{pro.schedule}}%</div></el-col>
          <el-col :span="1"><div class="pro_oper">{{pro.creatorName}}</div></el-col>
          <el-col :span="3"><div class="pro_oper">{{pro.createTimeSec}}</div></el-col>
          <el-col :span="2"><div class="pro_oper">
            <i class="el-icon-edit" @click="firstStep(index)"></i>
          </div></el-col>
          <el-col :span="2"><div class="pro_oper">
            <i class="el-icon-edit" @click="secondStep(index)"></i>
          </div></el-col>
          <el-col :span="1"><div class="pro_oper">
            <i class="el-icon-edit" @click="threeStep(index)"></i>
          </div></el-col>
          <el-col :span="2"><div class="pro_oper">
            <i class="el-icon-upload"></i>
          </div></el-col>
          <el-col :span="1"><div class="pro_oper">
            <i class="el-icon-document"></i>
          </div></el-col>
          <el-col :span="1"><div class="pro_oper">
            <i class="el-icon-document"></i>
          </div></el-col>
          <el-col :span="2"><div class="pro_oper">
            <i class="el-icon-edit-outline" style="margin-right:15px;"></i>
            <i class="el-icon-delete" style="color:black;" @click="delPro(index)"></i>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="project_page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :total="pageNum">
      </el-pagination>
    </div>
    <!-- 添加项目 -->
    <div class="">
      <el-dialog
        title="添加项目"
        :visible.sync="addPro"
        width="45%">
        <div class="addProBox">
          <ul>
            <li><span style="color:red;">*</span>客户名称:</li>
            <li><span style="color:red;">*</span>项目名称:</li>
            <li><span style="color:red;">*</span>合同号:</li>
            <li><span style="color:red;">*</span>项目内容:</li>
            <li style="margin-top:100px;"><span style="color:red;">*</span>联系人:</li>
            <li><span style="color:red;">*</span>联系电话:</li>
            <li><span style="color:red;">*</span>项目人数:</li>
            <li><span style="color:red;">*</span>工期(天):</li>
            <li>成本预算:</li>
            <li>合同金额:</li>
            <li><span style="color:red;">*</span>交付标准:</li>
            <li><span style="color:red;">*</span>项目类型:</li>
            <li><span style="color:red;">*</span>产品线:</li>
            <li><span style="color:red;">*</span>技术要求:</li>
          </ul>
          <ul>
            <li>
              <el-select
                v-model="cusName"
                filterable
                remote
                reserve-keyword
                size="medium"
                style="width:350px;"
                placeholder="请输入客户名称"
                @blur="choseCus"
                :remote-method="remoteMethod"
                :loading="cusLoading">
                <el-option
                  v-for="item in restaurants"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入项目名称" v-model="addProMes.upProName"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入合同号" v-model="addProMes.proNumber"></el-input></li>
            <!-- <li><el-input type="textarea" style="width:350px;" :autosize="{maxRows:6}" placeholder="请输入项目内容" v-model="addProMes.proContent"></el-input></li> -->
            <li style="height:150px;"><textarea v-model="addProMes.proContent" @focus="getTear" @blur="clearTear" ref="proTear" placeholder="请输入项目内容"></textarea></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入联系人" v-model="addProMes.proCusName"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入联系电话" v-model="addProMes.proPhone"></el-input></li>
            <li><el-input type="number" style="width:350px;" placeholder="请输入项目人数" v-model="addProMes.proPeople"></el-input></li>
            <li><el-input type="number" style="width:350px;" placeholder="请输入工期" v-model="addProMes.proDay"></el-input></li>
            <li><el-input type="number" style="width:350px;" placeholder="请输入成本预算" v-model="addProMes.proMount"></el-input></li>
            <li><el-input type="number" style="width:350px;" placeholder="请输入合同金额" v-model="addProMes.proCusMount"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入交付标准" v-model="addProMes.proText"></el-input></li>
            <li>
              <el-select v-model="addProMes.proType" placeholder="请选择" @blur="choseType">
                <el-option
                  v-for="item in addProMes.typeList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </li>
            <li>
              <el-select v-model="addProMes.ductType" placeholder="请选择" @blur="choseDuct">
                <el-option
                  v-for="item in addProMes.skillList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </li>
            <li>
              <p v-for="(engType,index) in addProMes.skillList" :key="'type'+index" style="">
                <span style="">{{engType.name}}</span>
                <el-checkbox-group @change="uccChose"  v-model="ucc">
                  <el-checkbox-button v-for="(engExp,index) in engType.usingLevelVOList" :label="engExp" :key="engType.name+index">{{engExp.name}}</el-checkbox-button>
                </el-checkbox-group>
              </p>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPro = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="turnAddPro()" size="medium">提 交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 第一步实施节点及计划 -->
    <div class="firstPerBox" ref="firstPerBox" v-show="firstBox">
      <p class="mes_close"><i class="el-icon-close" @click="closeFirstBox()"></i></p>
      <p class="mes_titleOne">
        <span>局点编辑</span>
      </p>
      <el-table
       ref="multipleTable"
       :data="tableData3"
       tooltip-effect="dark"
       style="width: 100%"
       @selection-change="handleSelectionChange">
       <el-table-column
         label="序号"
         width="50"
         align="center"
         prop="num"
         >
       </el-table-column>
       <el-table-column
         label="地点"
         width="150"
         align="center"
         >
         <template slot-scope="scope">
           <el-select v-model="value" size="mini">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <el-select v-model="value" size="mini">
             <el-option
              style="marginTop:10px;"
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
              </el-option>
          </el-select>
         </template>
       </el-table-column>
       <el-table-column
         label="施工详细地址"
         align="center"
         width="180">
         <template slot-scope="scope">
           <el-input type="primary" size="small" placeholder="请输入详细地址"></el-input>
         </template>
       </el-table-column>
       <el-table-column
         label="备注"
         align="center"
         width="180">
         <template slot-scope="scope">
           <el-input type="primary" size="small" placeholder="请输入备注信息"></el-input>
         </template>
       </el-table-column>
       <el-table-column
         label="加电单调"
         align="center"
         width="50"
         >
         <template slot-scope="scope">
           <span>{{scope.row.children.name}}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="删除"
         align="center"
         show-overflow-tooltip>
         <template slot-scope="scope">
           <i class="el-icon-delete"></i>
         </template>
       </el-table-column>
     </el-table>
    </div>
    <!-- 第二步人员委派 -->
    <div class="firstPerBox" ref="secondPerBox" v-show="secondBox">
      <p class="mes_close"><i class="el-icon-close" @click="closeSecondtBox()"></i></p>
      <p class="mes_titleOne">
        <span>人员委派</span>
      </p>
      <div class="" style="margin-top:15px;">
        <el-row>
          <el-col :span="2"><div class="gate_title">序号</div></el-col>
          <el-col :span="3"><div class="gate_title">地点</div></el-col>
          <el-col :span="5"><div class="gate_title">施工详细地址</div></el-col>
          <el-col :span="7"><div class="gate_title">添加工程师</div></el-col>
          <el-col :span="7"><div class="gate_title">已选择工程师</div></el-col>
        </el-row>
        <el-row class="proMes" v-for="(choseEng,index) in gateList" :key="'ChoseEng'+index">
          <el-col :span="2"><div class="gate_mes">{{choseEng.num}}</div></el-col>
          <el-col :span="3"><div class="gate_mes">{{choseEng.place}}</div></el-col>
          <el-col :span="5"><div class="gate_mes">{{choseEng.address}}</div></el-col>
          <el-col :span="7"><div class="gate_mes">
            <el-select
              v-model="searchEngText"
              filterable
              remote
              reserve-keyword
              size="medium"
              style="width:200px;"
              placeholder="请输入工程师姓名"
              :remote-method="remoteEng"
              :loading="cusLoading">
              <el-option
                v-for="eng in searchEngList"
                :key="eng.value"
                :label="eng.label"
                :value="eng.value">
              </el-option>
            </el-select>
            <el-button type="primary" size="small">添加</el-button>
          </div></el-col>
          <el-col :span="7"><div class="gate_mes">{{choseEng.turnEng}}</div></el-col>
        </el-row>
        </div>

      </div>
    <!-- 第三步进程管理 -->
    <div class="firstPerBox" ref="threePerBox" v-show="threeBox">
      <p class="mes_close"><i class="el-icon-close" @click="closeThreetBox()"></i></p>
      <p class="mes_titleOne">
        <span>进程管理</span>
      </p>
      <div class="pro_cess">
        <p class="cess_title">项目进程</p>
        <div class="cess_box">
          <ul>
            <li>
              <span>项目状态</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-select v-model="value" placeholder="请选择" style="width:220px;" size="medium">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>预警时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-date-picker
                v-model="value1"
                type="date"
                size="medium"
                placeholder="选择日期">
              </el-date-picker>
            </li>
            <li>
              <span>计划完工时间</span>
              <el-date-picker
                v-model="value1"
                type="date"
                size="medium"
                placeholder="选择日期">
              </el-date-picker>
            </li>
            <li>
              <span>计划验收时间</span>
              <el-date-picker
                v-model="value1"
                type="date"
                size="medium"
                placeholder="选择日期">
              </el-date-picker>
            </li>
          </ul>
          <ul>
            <li>
              <span>项目进度</span>
              <el-input type="primary" size="medium" style="width:220px;" placeholder="请输入项目进度"></el-input>%
            </li>
            <li>
              <span>入场时间</span>
              <el-date-picker
                v-model="value1"
                type="date"
                size="medium"
                placeholder="选择日期">
              </el-date-picker>
            </li>
            <li>
              <span>完工时间</span>
              <el-date-picker
                v-model="value1"
                type="date"
                size="medium"
                placeholder="选择日期">
              </el-date-picker>
            </li>
            <li>
              <span>验收时间</span>
              <el-date-picker
                v-model="value1"
                type="date"
                size="medium"
                placeholder="选择日期">
              </el-date-picker>
            </li>
          </ul>
        </div>
        <p class="cess_btn">
          <el-button type="primary" size="medium">保存</el-button>
        </p>
      </div>
      <div class="pro_point" v-for="(point,index) in pointList" :key="'Point'+index">
        <p class="point_title">局点信息</p>
        <p class="point_place">
          地点:{{point.place}}&nbsp;&nbsp;&nbsp;详细地址:{{point.address}}
        </p>
        <p class="point_title" style="margin-top:10px;">局点状态</p>
        <p class="change_point">
          <el-select v-model="value" placeholder="请选择" style="width:220px;" size="medium">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="value1"
            type="date"
            size="medium"
            placeholder="选择日期">
          </el-date-picker>
          <el-button type="primary" size="medium">保存</el-button>
        </p>
        <p class="point_title" style="margin-top:10px;">局点进程</p>
        <div class="">
          <el-row>
            <el-col :span="3"><div class="edit_title">节点</div></el-col>
            <el-col :span="4"><div class="edit_title">计划开始时间</div></el-col>
            <el-col :span="4"><div class="edit_title">计划结束时间</div></el-col>
            <el-col :span="4"><div class="edit_title">实际开始时间</div></el-col>
            <el-col :span="4"><div class="edit_title">实际完成时间</div></el-col>
            <el-col :span="5"><div class="edit_title">备注</div></el-col>
          </el-row>
          <el-row class="proMes" v-for="(editMes,index) in pointMesList" :key="'EditMes'+index">
            <el-col :span="3"><div class="edit_mes">{{editMes.name}}</div></el-col>
            <el-col :span="4"><div class="edit_mes">
              <el-date-picker
                v-model="value1"
                type="date"
                size="medium"
                placeholder="选择日期">
              </el-date-picker>
            </div></el-col>
            <el-col :span="4"><div class="edit_mes">
              <el-date-picker
                v-model="value1"
                type="date"
                size="medium"
                placeholder="选择日期">
              </el-date-picker>
            </div></el-col>
            <el-col :span="4"><div class="edit_mes">
              <el-date-picker
                v-model="value1"
                type="date"
                size="medium"
                placeholder="选择日期">
              </el-date-picker>
            </div></el-col>
            <el-col :span="4"><div class="edit_mes">
              <el-date-picker
                v-model="value1"
                type="date"
                size="medium"
                placeholder="选择日期">
              </el-date-picker>
            </div></el-col>
            <el-col :span="5"><div class="edit_mes">
              <el-input type="primary" size="small" placeholder="请输入备注信息"></el-input>
            </div></el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      value1:'',
      tableData3: [
        {
          num:'1',
          children:[
            {
              name:'进场开工'
            },
            {
              name:'硬件安装'
            },
          ]
        }
      ],






        multipleSelection: [],
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





      value7:[],//筛选日期数组
      proName:null,//搜索项目名称
      dataLength:88,//共有数据条数
      proList:[],//项目列表
      page:0,//页码
      proLoad:false,//是否启用Loading
      length:0,//数据排序
      pageNum:10,//分页器条数
      currentPage3:1,//分页器类型
      addPro:false,//添加项目
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
      cusName:null,//客户名称
      cusLoading:false,//筛选Loading
      restaurants:[],//客户名称筛选列表
      list:[],
      addProMes:{
        cusID:null,//客户ID
        upProName:null,//项目名称
        proNumber:null,//项目合同号
        proContent:null,//项目内容
        proCusName:null,//项目联系人姓名
        proPhone:null,//项目联系电话
        proPeople:null,//项目人数
        proDay:null,//项目工期
        proMount:null,//项目预算金额
        proCusMount:null,//项目合同金额
        proText:null,//项目交付标准
        ductType:null,//产品线
        ductID:null,//产品线ID
        typeList:[],//项目类型列表
        proType:null,//产品类型
        proTypeID:null,//产品类型ID
        skillList:[],//技能评估列表
        skillIDList:[],//技能ID列表
      },
      addProMesEnd:{
        cusID:null,//客户ID
        upProName:null,//项目名称
        proNumber:null,//项目合同号
        proContent:null,//项目内容
        proCusName:null,//项目联系人姓名
        proPhone:null,//项目联系电话
        proPeople:null,//项目人数
        proDay:null,//项目工期
        proMount:null,//项目预算金额
        proCusMount:null,//项目合同金额
        proText:null,//项目交付标准
        ductType:null,//产品线
        ductID:null,//产品线ID
        typeList:[],//项目类型列表
        proType:null,//产品类型
        proTypeID:null,//产品类型ID
        skillList:[],//技能评估列表
        skillIDList:[],//技能ID列表
      },
      ucc:[],
      firstBox:false,//第一步实施计划
      secondBox:false,//第二步人员委派
      threeBox:false,//第三步进程管理
      gateList:[
        {
          num:'1',
          place:'北京/海淀区',
          address:'马连洼北路8号万霖科技大厦',
          turnEng:'张琳/李璐'
        },
        {
          num:'2',
          place:'北京/昌平',
          address:'融泽家园2号院',
          turnEng:'阿明/阿C'
        }
      ],
      searchEngText:[],//工程师远程查找
      searchEngList:[],//远程查找工程师列表
      engLoading:false,//查找工程师Loading
      pointList:[
        {
          place:'国外/国外',
          address:'马连洼北路万霖科技大厦'
        },
        {
          place:'国外/国外',
          address:'生命科学园'
        }
      ],
      pointMesList:[
        {
          name:'进场开工'
        },
        {
          name:'硬件安装'
        },
        {
          name:'加电单调'
        },
        {
          name:'联调割接'
        },
      ]
    }
  },
  created(){
    this.getProList();
  },
  mounted(){

  },
  watch:{
    addPro(val,oldVal){
      if(!val){
        this.addProMes=this.addProMesEnd;
        this.cusName=null;
      }
    }
  },
  methods:{
    searchEng(){//搜索工程师
      let _vc=this;
      let startDate=new Date(this.value7[0]);
      let startYear=startDate.getFullYear();
      let startMonth=startDate.getMonth()+1;
      if(startMonth<10){
        startMonth='0'+startMonth
      }
      let startDay=startDate.getDate();
      if(startDay<10){
        startDay='0'+startDay
      }
      let endData=new Date(this.value7[1]);
      let endYear=endData.getFullYear();
      let endMonth=endData.getMonth()+1;
      if(endMonth<10){
        endMonth='0'+endMonth
      }
      let endDay=endData.getDate();
      if(endDay<10){
        endDay='0'+endDay
      }
      let formdata=new FormData();
      formdata.append('size',10);
      formdata.append('beginTime',startYear+'-'+startMonth+'-'+startDay);
      formdata.append('endTime',endYear+'-'+endMonth+'-'+endDay);
      if(_vc.proName!=null){
        formdata.append('name',_vc.proName)
      };
      _vc.$axios.post(_vc.url,formdata).then((res)=>{
        if(res.data.code==0){
          _vc.length=_vc.page*10;
          res.data.data.content.forEach((e)=>{
            _vc.$set(e,'num',_vc.length++);
            if(e.email!=null&&e.email!=''){
              if(e.email.length>15){
                _vc.$set(e,'emailToop',true)
              }else{
                _vc.$set(e,'emailToop',false)
              }
            }
          });
          _vc.$emit('searchData',res.data.data.content)
        }else{
          _vc.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vc.$message.error('未知错误,请联系管理员')
        // console.log(err)
      })
    },
    pushPro(){//添加项目
      this.$message.success('添加项目')
    },
    getProList(){//获取所有项目列表
      let _vn=this;
      _vn.proLoad=true;
      let formdata=new FormData();
      let opID=window.localStorage.getItem('Uid');
      formdata.append('page',_vn.page);
      formdata.append('operatorId',opID);
      formdata.append('operateType','creator')
      _vn.$axios.post(_vn.url+'/findProjectListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          _vn.length=_vn.page*10
          res.data.data.content.forEach((e)=>{
            _vn.$set(e,'num',_vn.length++);
            //创建时间-------------------------------------->
            let createDate=new Date(e.createTime);
            let cYear=createDate.getFullYear();
            let cMon=createDate.getMonth()+1;
            if(cMon<10){
              cMon='0'+cMon
            };
            let cDay=createDate.getDate();
            if(cDay<10){
              cDay='0'+cDay
            }
            let cTime=cYear+'-'+cMon+'-'+cDay;
            _vn.$set(e,'createTimeSec',cTime);
          })
          _vn.proList=res.data.data.content;
          _vn.pageNum=res.data.data.totalPages*10;
          _vn.proLoad=false;
          _vn.dataLength=res.data.data.totalElements;
        }else{
          _vn.$message.error(res.data.msg);
          _vn.proLoad=false;
        }
      }).catch((err)=>{
        _vn.$message.error('未知错误,请联系管理员');
        _vn.proLoad=false;
        console.log(err)
      })
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.page=val-1;
      this.getProList();
    },
    remoteMethod(query) {//远程查询客户列表
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
    openPushBox(){//添加项目弹框
      let _vm=this;
      _vm.$axios.get(_vm.url+'/usingTechnologyList').then((res)=>{
        if(res.data.code==0){
          _vm.addProMes.skillList=res.data.data;
          _vm.$axios.get(_vm.url+'/getProjectTypeList').then((res)=>{
            if(res.data.code==0){
              _vm.addProMes.typeList=res.data.data;
            }
          })
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
        // console.log(err)
      });
      setTimeout(()=>{
        _vm.addPro=true;
      })
    },
    choseCus(){//选择客户
      this.restaurants.forEach((e)=>{
        if(e.value===this.cusName){
          this.addProMes.cusID=e.id;
        }
      });
    },
    uccChose(value){//项目能力选择
      let a=[]
      value.forEach((e)=>{
        a.push(e.id)
      });
      this.addProMes.skillIDList=a;
    },
    choseType(){//项目类型选择
      this.addProMes.typeList.forEach((e)=>{
        if(e.name===this.addProMes.proType){
          this.addProMes.proTypeID=e.id;
        }
      })
    },
    choseDuct(){//产品线选择
      this.addProMes.skillList.forEach((x)=>{
        if(x.name===this.addProMes.ductType){
          this.addProMes.ductID=x.id;
        }
      });
    },
    getTear(){//获取文本域焦点
      this.$refs.proTear.style.borderColor='#eb7a1d'
    },
    clearTear(){//失去文本域焦点
      this.$refs.proTear.style.borderColor='#DCDFE6'
    },
    turnAddPro(){//提交新增项目
      let vc=this;
      if(vc.addProMes.cusID==null){
        vc.$message.error('请选择客户名称')
      }else if(vc.addProMes.upProName==null||vc.addProMes.upProName==''){
        vc.$message.error('请输入项目名称')
      }else if(vc.addProMes.proNumber==null||vc.addProMes.proNumber==''){
        vc.$message.error('请输入合同号')
      }else if(vc.addProMes.proContent==null||vc.addProMes.proContent==''){
        vc.$message.error('请输入项目内容')
      }else if(vc.addProMes.proCusName==null||vc.addProMes.proCusName==''){
        vc.$message.error('请输入联系人姓名')
      }else if(vc.addProMes.proPhone==null||vc.addProMes.proPhone==''){
        vc.$message.error('请输入联系人电话')
      }else if(vc.addProMes.proPhone.length!=11){
        vc.$message.error('请输入正确的手机号')
      }else if(vc.addProMes.proPeople==null||vc.addProMes.proPeople==''){
        vc.$message.error('请输入项目人数')
      }else if(vc.addProMes.proDay==null||vc.addProMes.proDay==''){
        vc.$message.error('请输入项目工期')
      }else if(vc.addProMes.proText==null||vc.addProMes.proText.proText==''){
        vc.$message.error('请输入项目交付标准')
      }else if(vc.addProMes.proTypeID==null){
        vc.$message.error('请选择项目类型')
      }else if(vc.addProMes.ductID==null){
        vc.$message.error('请选择产品线')
      }else if(vc.addProMes.skillIDList.length<1){
        vc.$message.error('请选择技术要求')
      }else{
        let opID=window.localStorage.getItem('Uid');
        let formdata=new FormData();
        formdata.append('customerId',vc.addProMes.cusID);
        formdata.append('projectTypeId',vc.addProMes.proTypeID);
        formdata.append('technologyId',vc.addProMes.ductID);
        formdata.append('technologyName',vc.addProMes.ductType);
        formdata.append('name',vc.addProMes.upProName);
        formdata.append('content',vc.addProMes.proContent);
        formdata.append('linkman',vc.addProMes.proCusName);
        formdata.append('phone',vc.addProMes.proPhone);
        formdata.append('peopleNumber',vc.addProMes.proPeople);
        formdata.append('dayNumber',vc.addProMes.proDay);
        formdata.append('standard',vc.addProMes.proText);
        formdata.append('contractNumber',vc.addProMes.proNumber)
        if(vc.addProMes.proMount!=null&&vc.addProMes.proMount!=''){
          formdata.append('budget',vc.addProMes.proMount);
        }
        if(vc.addProMes.proCusMount!=null&&vc.addProMes.proCusMount!=''){
          formdata.append('contractPrice',vc.addProMes.proCusMount);
        }
        formdata.append('operatorId',opID);
        vc.addProMes.skillIDList.forEach((e)=>{
          formdata.append('levelIds',e);
        });
        vc.$axios.post(vc.url+'/saveProject_n',formdata).then((res)=>{
          console.log(res);
          if(res.data.code==0){
            vc.getProList();
            vc.addPro=false;
          }else{
            vc.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          vc.$message.error('未知异常,请联系管理员')
        })
      }
    },
    firstStep(index){//第一步实施计划
      this.firstBox=true;
      setTimeout(()=>{
        this.$refs.firstPerBox.style.width='100%';
        this.$refs.firstPerBox.style.minHeight='100%';
      })
    },
    closeFirstBox(){//关闭第一步实施计划
      this.$refs.firstPerBox.style.width='300px';
      this.$refs.firstPerBox.style.minHeight='200px';
      setTimeout(()=>{
        this.firstBox=false;
      },300)
    },
    secondStep(index){//第二步人员委派
      this.secondBox=true;
      setTimeout(()=>{
        this.$refs.secondPerBox.style.width='100%';
        this.$refs.secondPerBox.style.minHeight='100%';
      })
    },
    closeSecondtBox(){//关闭第二步人员委派
      this.$refs.secondPerBox.style.width='300px';
      this.$refs.secondPerBox.style.minHeight='200px';
      setTimeout(()=>{
        this.secondBox=false;
      },300)
    },
    threeStep(index){//第三步进程管理
      this.threeBox=true;
      setTimeout(()=>{
        this.$refs.threePerBox.style.width='100%';
        this.$refs.threePerBox.style.minHeight='100%';
      })
    },
    closeThreetBox(){//关闭第三步进程管理
      this.$refs.threePerBox.style.width='300px';
      this.$refs.threePerBox.style.minHeight='200px';
      setTimeout(()=>{
        this.threeBox=false;
      },300)
    },
    remoteEng(query) {//远程查询客户列表
        if (query !== '') {
          let formdata=new FormData();
          formdata.append('state',2);
          formdata.append('name',query);
          formdata.append('size',20);
          formdata.append('page',0);
          this.$axios.post(this.url+'/findCustomerListByCondition',formdata).then((res)=>{
            console.log(res)
            if(res.data.code==0){
              this.searchEngList=res.data.data.content.map(item=>{
                return {value:item.name,label:item.name,id:item.id}
              });

            }else{
              this.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            this.$message.error('未知错误,请联系管理员');
            // console.log(err)
          });
          this.engLoading = true;
          setTimeout(() => {
            this.engLoading = false;
            this.searchEngList.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
          console.log(this.searchEngList)
        } else {
          this.searchEngList = [];
        }
    },
    delPro(index){
      console.log(this.proList[index].id)
    },
    handleSelectionChange(val) {//全选
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    }
  }
}
</script>

<style lang="scss" scoped>
.crestPro{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .pro_search{
    width: 100%;
    height: 120px;
    ul{
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        height: 120px;
        line-height: 120px;
        width: 50%;
        color:#666;
      }
      li:first-child{
        width: 45%;
        text-align: right;
        padding-right: 80px;
        box-sizing: border-box;
      }
    }
  }
  .addEng{
    width: 100%;
    border-bottom:1px solid #ccc;
    padding-bottom: 5px;
    height: 42px;
    line-height: 42px;
    .dataLength{
      display: inline-block;
      width: 88%;
      text-align: right;
      box-sizing: border-box;
      padding-right: 50px;
    }
  }
  .pro_title{
    text-align: center;
    height: 40px;
    background: #eb7a1d;
    color:white;
    font-size: 16px;
    line-height: 40px;
  }
  .speFont{
    font-size: 14px;
    line-height: 20px;
  }
  .proMes:nth-of-type(even){
    background:#eee;
  }
  .pro_oper{
    line-height: 50px;
    text-align: center;
    font-size: 15px;
    i{
      cursor: pointer;
      font-size: 20px;
      margin-top:15px;
      color:#eb7a1d;
    }
    span{
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .project_page{
    width: 98%;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .admin_reload{
    position: absolute;
    top:124px;
    right:30px;
    i{
      font-size: 32px;
      color:#eb7a1d;
      cursor:pointer;
    }
  }
  .addProBox{
    width: 100%;
    height: 400px;
    overflow: auto;
    display: flex;
    ul:first-child{
      width: 25%;
      li{
        text-align: right;
        line-height: 50px;
      }
    };
    ul:last-child{
      width: 75%;
      li{
        box-sizing: border-box;
        padding-left: 15px;
        line-height: 50px;
        textarea{
          outline: none;
          border:1px solid #DCDFE6;
          border-radius: 4px;
          padding: 13px;
          box-sizing: border-box;
          resize:none;
          height:150px;
          width:350px;
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
  .firstPerBox{
    width: 300px;
    height: 200px;
    position: fixed;
    background: white;
    overflow: auto;
    left:0;
    top:0;
    transition: .5s all;
    padding-top: 70px;
    padding-bottom:70px;
    box-sizing: border-box;
    .mes_titleOne{
      width: 100%;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      padding-left: 30px;
      // z-index: 8888;
      span{
        font-size: 20px;
        font-weight: bold;
        color: rgba(235,122,29,1);
        border-bottom:2px solid  rgba(235,122,29,1);
      }
    }
    .mes_close{
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: right;
      box-sizing: border-box;
      position: fixed;
      top:0;
      border-bottom:1px solid #eee;
      background: white;
      i{
        font-size: 35px;
        color: rgba(235,122,29,1);
        cursor:pointer;
        top: 12px;
        right:30px;
        position: absolute;
      }
    }
    .gate_title{
      text-align: center;
      line-height: 45px;
      background:#eb7a1d;
      color:white;
    }
    .gate_mes{
      text-align: center;
      line-height: 40px;
      color:black;
    }
    .pro_cess{
      width: 95%;
      background: white;
      box-shadow: 0px 0px 8px #666;
      margin:0 auto;
      margin-top: 15px;
      border-radius: 3px;
      box-sizing: border-box;
      padding: 10px 8px 10px 8px;
      .cess_title{
        width: 100%;
        font-size: 20px;
        font-weight: bold;
      }
      .cess_box{
        width: 100%;
        height: 100%;
        display: flex;
        ul{
          width: 50%;
          height: 100%;
          box-sizing: border-box;
          padding-left: 20px;
          li{
            line-height: 55px;
            span{
              margin-right: 20px;
            }
          }
        }
      }
      .cess_btn{
        width: 100%;
        line-height: 40px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 20px;
      }
    }
    .pro_point{
      width: 95%;
      background: white;
      box-shadow: 0px 0px 8px #666;
      margin:0 auto;
      margin-top: 15px;
      border-radius: 3px;
      box-sizing: border-box;
      padding: 10px 8px 10px 8px;
      .point_title{
        width: 100%;
        font-size: 20px;
        font-weight: bold;
      }
      .point_place{
        width: 100%;
        font-size: 14px;
        margin-top: 15px;
        border-bottom:1px solid #eee;
        padding-bottom: 5px;
      }
      .change_point{
        margin-top:10px;
      }
      .edit_title{
        line-height: 45px;
        color:white;
        background: #eb7a1d;
        text-align: center;
      }
      .edit_mes{
        text-align: center;
        line-height: 40px;
        font-size: 14px;
      }
    }
  }
}
</style>
