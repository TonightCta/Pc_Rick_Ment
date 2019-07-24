<!-- 项目搭建 -->
<template lang="html">
  <div class="crestPro">
    <div class="query_search" ref="query_search">
      <ul v-show="searchList">
        <li>
          <p>项目名称:&nbsp;<el-input type="primary" v-model="searchMes.proName" style="width:70%;" placeholder="请输入项目名称"></el-input/></p>
          <p>客户名称:&nbsp;<el-input type="primary" v-model="searchMes.cusName" style="width:70%;" placeholder="请输入客户名称"></el-input></p>
          <p>合同单号:
            <el-input type="primary" v-model="searchMes.conNumber" style="width:70%;" placeholder="请输入合同单号"></el-input/>
          </p>
        </li>
        <li>
          <p>&nbsp;&nbsp;&nbsp;产品线:
            <el-select v-model="searchMes.lineName" placeholder="请选择产品线" style="width:70%;" @change="chooseLine">
              <el-option
                v-for="(item,index) in searchMes.lineList"
                :key="item.name"
                :value="item.name"
                >
              </el-option>
            </el-select>
          </p>
          <p>项目状态:
            <el-select v-model="searchMes.proStatus" placeholder="请选择项目状态" style="width:70%;" @change="chooseStatus">
              <el-option
                v-for="item in searchMes.typeList"
                :key="item"
                :value="item"
                >
              </el-option>
            </el-select>
          </p>
          <p style="opacity:0;">合同单号:
            <el-input type="primary" v-model="searchMes.conNumber" style="width:70%;" placeholder="请输入合同单号"></el-input/>
          </p>
          <p style="position:absolute;background:red;height:61px;right:30px;opacity:0;"></p>
        </li>
        <li style="padding-left:25px;">
          <span style="width:160px;display:inline-block;">
              <el-select v-model="searchMes.dateText" placeholder="时间类型" style="width:70%;" @change="chooseDate">
                <el-option
                  v-for="item in searchMes.dateList"
                  :key="item"
                  :value="item">
                </el-option>
              </el-select>
          :</span>
          <span style="width:40%;display:inline-block;">
            <el-date-picker
               v-model="searchMes.dateChoose"
               type="daterange"
               :picker-options="pickerOptions2"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               value-format="yyyy-MM-dd"
               align="right"
               >
             </el-date-picker>
          </span>
          <span>
            <el-button type="primary" icon="el-icon-zoom-in" @click="serchPro()">筛选</el-button>
            <el-button type="primary" icon="el-icon-remove" @click="cancelPro()">取消筛选</el-button>
          </span>
        </li>
      </ul>
      <el-tooltip class="item" effect="dark" :content="closeText" placement="bottom">
        <p class="add" @click="searchSwitch" ref="add">
          <img :src="operClose" alt="">
        </p>
      </el-tooltip>
    </div>
    <p class="addEng">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="openPushBox()">添加项目</el-button>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
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
            <i class="el-icon-edit" @click="firstStep(index)" v-loading.fullscreen.lock="fullscreenLoading"></i>
          </div></el-col>
          <el-col :span="2"><div class="pro_oper">
            <i class="el-icon-edit" @click="secondStep(index)"></i>
          </div></el-col>
          <el-col :span="1"><div class="pro_oper">
            <i class="el-icon-edit" @click="threeStep(index)"></i>
          </div></el-col>
          <el-col :span="2"><div class="pro_oper">
            <i class="el-icon-upload" @click="fileUp(index)"></i>
          </div></el-col>
          <el-col :span="1"><div class="pro_oper">
            <i class="el-icon-document" @click="insUp(index)"></i>
          </div></el-col>
          <el-col :span="1"><div class="pro_oper">
            <i class="el-icon-document" @click="hasDetials(index)"></i>
          </div></el-col>
          <el-col :span="2"><div class="pro_oper">
            <i class="el-icon-edit-outline" style="margin-right:15px;" @click="editProject(index)"></i>
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
            <!-- <li>成本预算:</li>
            <li>合同金额:</li> -->
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
                @change="choseCus"
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
            <!-- <li><el-input type="number" style="width:350px;" placeholder="请输入成本预算" v-model="addProMes.proMount"></el-input></li>
            <li><el-input type="number" style="width:350px;" placeholder="请输入合同金额" v-model="addProMes.proCusMount"></el-input></li> -->
            <li><el-input type="primary" style="width:350px;" placeholder="请输入交付标准" v-model="addProMes.proText"></el-input></li>
            <li>
              <el-select v-model="addProMes.proType" placeholder="请选择" @change="choseType">
                <el-option
                  v-for="item in addProMes.typeList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </li>
            <li>
              <el-select v-model="addProMes.ductType" placeholder="请选择" @change="choseDuct">
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
    <!-- 编辑项目 -->
    <div class="" v-if="isDown">
      <el-dialog
        title="编辑项目"
        :visible.sync="editPro"
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
            <!-- <li>成本预算:</li>
            <li>合同金额:</li> -->
            <li><span style="color:red;">*</span>交付标准:</li>
            <li><span style="color:red;">*</span>项目类型:</li>
            <li><span style="color:red;">*</span>产品线:</li>
            <li><span style="color:red;">*</span>技术要求:</li>
          </ul>
          <ul>
            <li>
              <el-select
                v-model="editProMes.customerName"
                filterable
                remote
                reserve-keyword
                size="medium"
                style="width:350px;"
                placeholder="请输入客户名称"
                @change="editCus"
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
            <li><el-input type="primary" style="width:350px;" placeholder="请输入项目名称" v-model="editProMes.name"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入合同号" v-model="editProMes.contractNumber"></el-input></li>
            <!-- <li><el-input type="textarea" style="width:350px;" :autosize="{maxRows:6}" placeholder="请输入项目内容" v-model="addProMes.proContent"></el-input></li> -->
            <li style="height:150px;"><textarea v-model="editProMes.content" @focus="getTear" @blur="clearTear" ref="proTear" placeholder="请输入项目内容"></textarea></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入联系人" v-model="editProMes.linkman"></el-input></li>
            <li><el-input type="primary" style="width:350px;" placeholder="请输入联系电话" v-model="editProMes.phone"></el-input></li>
            <li><el-input type="number" style="width:350px;" placeholder="请输入项目人数" v-model="editProMes.peopleNumber"></el-input></li>
            <li><el-input type="number" style="width:350px;" placeholder="请输入工期" v-model="editProMes.dayNumber"></el-input></li>
            <!-- <li><el-input type="number" style="width:350px;" placeholder="请输入成本预算" v-model="editProMes.proMount"></el-input></li>
            <li><el-input type="number" style="width:350px;" placeholder="请输入合同金额" v-model="editProMes.contractPrice"></el-input></li> -->
            <li><el-input type="primary" style="width:350px;" placeholder="请输入交付标准" v-model="editProMes.standard"></el-input></li>
            <li>
              <el-select v-model="editProMes.projectType.name" placeholder="请选择" @change="editType">
                <el-option
                  v-for="item in editProMes.typeList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </li>
            <li>
              <el-select v-model="editProMes.technologyName" placeholder="请选择" @change="editDuct">
                <el-option
                  v-for="item in editProMes.skillList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </li>
            <li>
              <p v-for="(engType,index) in editProMes.skillList" :key="'type'+index" style="">
                <span style="">{{engType.name}}</span>
                <el-checkbox-group @change="editChoose"  v-model="ucc">
                  <el-checkbox-button v-for="(engExp,index) in engType.usingLevelVOList" :checked="engExp.selected" :label="engExp" :key="engType.name+index">{{engExp.name}}</el-checkbox-button>
                </el-checkbox-group>
              </p>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editPro = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="turnEditPro()" size="medium">提 交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 第一步实施节点及计划 -->
    <div class="firstPerBox" ref="firstPerBox" v-if="firstBox">
      <p class="mes_close"><i class="el-icon-close" @click="closeFirstBox()"></i></p>
      <p class="mes_titleOne">
        <span>局点编辑</span>
      </p>
      <div class="" v-if="firstConBox">
        <div class="" style="width:100%;overflow:auto;">
          <ul class="mes_titleTwo">
            <li>序号</li>
            <li>地点</li>
            <li>施工详细地址</li>
            <li>备注</li>
            <li class="loadMes" v-for="(chosePoint,index) in planList" :key="'ChosePoint'+index">
              <input type="checkbox" name="" value="" id="" :ref="'PointCheck'+index" @click="allChoosePoint(index)">
              <span :ref="'MaskTitle'+index" @click="cancelAll(index)"></span>
              {{chosePoint.name}}
            </li>
            <li>删除</li>
          </ul>
          <div class="" v-loading="loadPoint">
            <ul class="mes_titleTwo operTwo" v-for="(operTwo,indexOper) in operTwoList" ref="ChosePointParent">
              <li>{{operTwo.num+1}}</li>
              <li>
                <el-select v-model="operTwo.viceName" @change="chooseVince(indexOper)" placeholder="请选择"   style="width:100px;" size="medium">
                  <el-option
                    v-for="item in placeList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <el-select v-model="operTwo.cityName" @change="chooseCity(indexOper)" placeholder="请选择" style="width:100px;" size="medium">
                  <el-option
                    v-for="item in operTwo.cityList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </li>
              <li>
                <el-input type="primary" size="small" v-model="operTwo.address" placeholder="请输入施工详细地址"></el-input>
              </li>
              <li>
                <el-input type="primary" size="small" v-model="operTwo.remark" placeholder="请输入备注信息"></el-input>
              </li>
              <li class="loadMes" v-for="(chosePoint,index) in planList" :key="'ChosePoint'+index" ref="ChosePointBox">
                <input type="checkbox" name="" value="" id="" :ref="'PointCheck'+index" @click="choosePoint(indexOper,index)">
                <span :ref="'MaskTitle'+index" @click="cancelPoint(indexOper,index)"></span>
                {{chosePoint.name}}
              </li>
              <li>
                <i class="el-icon-delete" style="cursor:pointer;" @click="delOperTwo(indexOper)"></i>
              </li>
            </ul>
          </div>
        </div>
        <p class="firstPoer">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="pushPoint()">添加局点</el-button>
          <el-button type="primary" icon="el-icon-upload" size="small" @click="submitPoint()">提交</el-button>
        </p>
      </div>
    </div>
    <!-- 第二步人员委派 -->
    <div class="firstPerBox" ref="secondPerBox" v-if="secondBox">
      <p class="mes_close"><i class="el-icon-close" @click="closeSecondtBox()"></i></p>
      <p class="mes_titleOne">
        <span>人员委派</span>
      </p>
      <div class="" v-if="secondConBox">
        <el-row>
          <el-col :span="2"><div class="gate_title">序号</div></el-col>
          <el-col :span="3"><div class="gate_title">地点</div></el-col>
          <el-col :span="5"><div class="gate_title">施工详细地址</div></el-col>
          <el-col :span="7"><div class="gate_title">添加工程师</div></el-col>
          <el-col :span="7"><div class="gate_title">已选择工程师</div></el-col>
        </el-row>
        <p style="line-height:100px;fontSize:18px;color:#666;width:100%;textAlign:center;" v-if="hasPoint">暂无局点，请前往建立</p>
        <el-row class="proMes" v-for="(choseEng,index) in gateList" :key="'ChoseEng'+index">
          <el-col :span="2"><div class="gate_mes">{{choseEng.num+1}}</div></el-col>
          <el-col :span="3"><div class="gate_mes">{{choseEng.placeName}}</div></el-col>
          <el-col :span="5"><div class="gate_mes">{{choseEng.address}}</div></el-col>
          <el-col :span="7"><div class="gate_mes">
            <el-select
              v-model="choseEng.searchEngText"
              filterable
              remote
              reserve-keyword
              size="medium"
              style="width:200px;"
              placeholder="请输入工程师姓名"
              :remote-method="remoteEng"
              @change="chooseEng"
              :loading="cusLoading">
              <el-option
                v-for="eng in searchEngList"
                :key="eng.value"
                :label="eng.label"
                :value="eng.value">
              </el-option>
            </el-select>
            <el-button type="primary" size="small" @click="subTurnEng(index)">添加</el-button>
          </div></el-col>
          <el-col :span="7" v-if="choseEng.personnelRecordVOList==null"><div class="gate_mes">-</div></el-col>
          <el-col :span="7" v-else><div class="gate_mes" :class="{ceed:choseEng.isCeed=true}">
            <span v-for="(turnEng,engIndex) in choseEng.personnelRecordVOList">
              <span>{{turnEng.engineerName}}<i class="el-icon-delete" style="margin-left:5px;color:#eb7a1d;cursor:pointer;" @click="delTurnEng(index,engIndex)"></i></span>/
            </span>
          </div></el-col>
        </el-row>
        </div>

      </div>
    <!-- 第三步进程管理 -->
    <div class="firstPerBox" ref="threePerBox" v-if="threeBox">
      <p class="mes_close"><i class="el-icon-close" @click="closeThreetBox()"></i></p>
      <p class="mes_titleOne">
        <span>进程管理</span>
      </p>
      <div class="" v-if="threeConBox">
        <div class="pro_cess">
          <p class="cess_title">项目进程</p>
          <div class="cess_box">
            <ul>
              <li>
                <span>项目状态</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-select v-model="proStateMes.stateText" placeholder="请选择" @change="chooseProState" style="width:220px;" size="medium">
                  <el-option
                    v-for="item in proStateList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>预警时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-date-picker
                  v-model="proStateMes.warnTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
              <li>
                <span>计划完工时间</span>
                <el-date-picker
                  v-model="proStateMes.planEndTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
              <li>
                <span>计划验收时间</span>
                <el-date-picker
                  v-model="proStateMes.planAcceptTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
            </ul>
            <ul>
              <li>
                <span>项目进度</span>
                <el-input type="primary" v-model="proStateMes.proGress" size="medium" style="width:220px;" placeholder="请输入项目进度"></el-input>%
              </li>
              <li>
                <span>入场时间</span>
                <el-date-picker
                  v-model="proStateMes.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
              <li>
                <span>完工时间</span>
                <el-date-picker
                  v-model="proStateMes.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
              <li>
                <span>验收时间</span>
                <el-date-picker
                  v-model="proStateMes.acceptTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
            </ul>
          </div>
          <p class="cess_btn">
            <el-button type="primary" size="medium" @click="saveProState()">保存</el-button>
          </p>
        </div>
        <div class="pro_point" v-for="(point,index) in pointList" :key="'Point'+index">
          <p class="point_title">局点信息</p>
          <p class="point_place">
            地点:{{point.placeName}}&nbsp;&nbsp;&nbsp;详细地址:{{point.address}}
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
            <el-row class="proMes" v-for="(editMes,indexK) in point.usingProjectCourseNodeVOList" :key="'EditMes'+indexK">
              <el-col :span="3"><div class="edit_mes">{{editMes.courseNodeName}}</div></el-col>
              <el-col :span="4"><div class="edit_mes">
                <el-date-picker
                  v-model="editMes.planStartTimeStr"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </div></el-col>
              <el-col :span="4"><div class="edit_mes">
                <el-date-picker
                  v-model="editMes.planEndTimeStr"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </div></el-col>
              <el-col :span="4"><div class="edit_mes">
                <el-date-picker
                  v-model="editMes.startTimeStr"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </div></el-col>
              <el-col :span="4"><div class="edit_mes">
                <el-date-picker
                  v-model="editMes.endTimeStr"
                  type="date"
                  value-format="yyyy-MM-dd"
                  size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </div></el-col>
              <el-col :span="5"><div class="edit_mes">
                <el-input type="primary" size="small" placeholder="请输入备注信息" v-model="editMes.remark"></el-input>
              </div></el-col>
            </el-row>
            <p style="textAlign:center;lineHeight:50px;">
              <el-button type="primary" size="medium" @click="subTurnPoint(index)">提交</el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 项目文档上传 -->
    <div class="firstPerBox" ref="filePerBox" v-if="fileBox">
      <p class="mes_close"><i class="el-icon-close" @click="closeFileBox()"></i></p>
      <p class="mes_titleOne">
        <span>项目文档</span>
      </p>
      <p  style="line-height:100px;fontSize:18px;color:#666;width:100%;textAlign:center;display:none;" ref="FileNoData">暂无局点，请前往建立</p>
      <div class="file_point" v-for="(pointFile,indexFile) in pointFileList" :key="'PointFile'+indexFile" v-if="fileConBox">
        <p class="file_title">局点信息</p>
        <p class="file_place">地点:&nbsp;&nbsp;{{pointFile.placeName}}</p>
        <p class="file_place">详细地址:&nbsp;&nbsp;{{pointFile.address}}</p>
        <ul>
          <li v-for="(fileUpDom,fileUpIn) in pointFile.fileList" :key="'FileUp'+fileUpIn">
            <span>{{fileUpDom.name}}:</span>
            <el-input type="primary" style="width:600px;" v-model="fileUpDom.fileName"></el-input>
            <input type="file" name="" value="" @change="upPointFile($event,indexFile,fileUpIn)">
            <el-button type="primary" icon="el-icon-search" size="small">浏览文件</el-button>
            <el-button type="primary" icon="el-icon-upload" size="small" @click="upFile(indexFile,fileUpIn)">上传</el-button>
            <a :href="url+fileUpDom.path">
              <el-button type="primary" icon="el-icon-download" size="small">下载模板</el-button>
            </a>
            <p v-for="(fileBack,indexBack) in pointFile.projectFileVOList" v-if="fileBack.fileType==fileUpDom.code">
              <a :href="url+'/'+fileBack.fileName">{{fileBack.fileName}}</a>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 验货单上传 -->
    <div class="firstPerBox" ref="insPerBox" v-if="insBox">
      <p class="mes_close"><i class="el-icon-close" @click="closeInsBox()"></i></p>
      <p class="mes_titleOne">
        <span>验货单</span>
      </p>
      <p  style="line-height:100px;fontSize:18px;color:#666;width:100%;textAlign:center;display:none;" ref="InsNoData">暂无局点，请前往建立</p>
      <div class="ins_point"  v-for="(pointIns,key) in pointInsList" v-if="insConBox">
        <p class="file_title">局点信息</p>
        <p class="file_place">地点:&nbsp;&nbsp;{{pointIns.placeName}}</p>
        <p class="file_place">详细地址:&nbsp;&nbsp;{{pointIns.address}}</p>
        <p class="file_place">Excel导入:
          <el-input type="primary" size='small' style="width:500px;" v-model="pointIns.fileName"></el-input>
          <el-button type="primary" size="small" icon="el-icon-search">浏览文件</el-button>
          <el-button type="primary" size="small" icon="el-icon-d-arrow-left" @click="upInsFile(key)">导入Excel</el-button>
          <a :href="url+'/inspectionTemplate.xlsx'">
            <el-button type="primary" size="small" icon="el-icon-download">下载模板</el-button>
          </a>
          <a :href="url+'/exportInspectionExcel?projectPointId='+pointIns.id">
            <el-button type="primary" size="small" icon="el-icon-d-arrow-right">导出Excel</el-button>
          </a>
          <span class="place_mask"></span>
          <input type="file" name="" value=""  Accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" class="upBtnPlace" @change="upPiontIns($event,key)">
        </p>
        <ul>
          <li v-for="(tableMes,index) in pointIns.inspectionVOList">
            <p class="table_title"><span>设备{{tableMes.num+1}}</span><el-button type="primary" icon="el-icon-delete" size="small" style="margin-left:100px;" @click="delIns(key,index)">删除</el-button></p>
            <p class="table_mes">
              <span>网元名称<font style="color:red;">*</font></span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入网元名" v-model="tableMes.name"></el-input>
              <span>设备型号</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入设备型号" v-model="tableMes.model"></el-input>
              <span>整机、机框条码</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入整机、机框条码" v-model="tableMes.code"></el-input>
            </p>
            <p class="table_mes">
              <span>省份</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入省份" v-model="tableMes.province"></el-input>
              <span>城市</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入城市" v-model="tableMes.city"></el-input>
              <span>地址</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入详细地址" v-model="tableMes.address"></el-input>
            </p>
            <p class="table_mes">
              <span>主机版本</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入主机版本" v-model="tableMes.hostVersion"></el-input>
              <span>补丁版本</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入补丁版本" v-model="tableMes.patchVersion"></el-input>
              <span>槽位号及单板名称</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入槽位号及单板名称" v-model="tableMes.boardName"></el-input>
            </p>
            <p class="table_mes">
              <span>单板型号</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入单板型号" v-model="tableMes.boardModel"></el-input>
              <span>单板条码</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入单板条码" v-model="tableMes.boardCode"></el-input>
              <span>单板版本(软件)</span>
              <el-input type="primary" style="width:300px;" size="small" placeholder="请输入单板版本(软件)" v-model="tableMes.boardVersion"></el-input>
            </p>
            <p style="width:95%;margin:0 auto;margin-top:15px;">
              <span style="fontSize:13px;width:110px;textAlign:center;display:inline-block;">备注</span>
              <el-input type="primary" style="width:90.5%;" size="small" placeholder="请输入备注" v-model="tableMes.remark"></el-input>
            </p>
          </li>
        </ul>
        <p class="table_oper">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="pushTable(key)">添加</el-button>
          <el-button type="primary" icon="el-icon-upload" size="small" @click="subIns(key)">提交</el-button>
        </p>
      </div>
    </div>
    <!-- 项目详情 -->
    <div class="project_mes" v-show="openDetils" ref="project_mes">
      <p class="mes_close"><i class="el-icon-close" @click="closeMes()"></i></p>
      <p class="mes_titleOne bigTitle">
        <span>项目信息</span>
      </p>
      <div class="" v-show="showMes" style="min-height:650px;">
        <ul class="con_mes">
          <li>客户名称:&nbsp;&nbsp;&nbsp;<span>{{projectMes.customerName}}</span></li>
          <li class="flex">
            <p>项目名称:&nbsp;&nbsp;&nbsp;<span>{{projectMes.name}}</span></p>
            <p>项目类型:&nbsp;&nbsp;&nbsp;<span v-if="projectMes.projectType">{{projectMes.projectType.name}}</span><span v-else>-</span></p>
          </li>
          <li>
            <p>项目合同单号:&nbsp;&nbsp;&nbsp;<span>{{projectMes.contractNumber}}</span></p>
          </li>
          <li>项目内容:&nbsp;&nbsp;&nbsp;<span>{{projectMes.content}}</span></li>
          <li class="flex">
            <p>联系人:&nbsp;&nbsp;&nbsp;<span>{{projectMes.linkman}}</span></p>
            <p>联系电话:&nbsp;&nbsp;&nbsp;<span>{{projectMes.phone}}</span></p>
          </li>
          <li class="flex">
            <p>项目人数:&nbsp;&nbsp;&nbsp;<span>{{projectMes.peopleNumber}}人</span></p>
            <p>工期:&nbsp;&nbsp;&nbsp;<span>{{projectMes.dayNumber}}天</span></p>
          </li>
          <li class="flex">
            <p>交付标准:&nbsp;&nbsp;&nbsp;<span>{{projectMes.standard}}</span></p>
            <p>技能要求:&nbsp;&nbsp;&nbsp;<span>{{projectMes.levelStr}}</span></p>
          </li>
          <li class="flex">
            <p>项目状态:&nbsp;&nbsp;&nbsp;<span>{{projectMes.stateStr}}</span></p>
            <p>项目进度:&nbsp;&nbsp;&nbsp;<span>{{projectMes.schedule}}%</span></p>
          </li>
          <li class="flex">
            <p>预警时间:&nbsp;&nbsp;&nbsp;
              <span v-if="projectMes.warnTime!=null&&projectMes.warnTime!='null'">{{projectMes.warnTimeSec}}</span>
              <span v-else>-</span>
            </p>
            <p>入场时间:&nbsp;&nbsp;&nbsp;
              <span v-if="projectMes.startTime!=null&&projectMes.startTime!='null'">{{projectMes.startTimeSec}}</span>
              <span v-else>-</span>
            </p>
          </li>
          <li class="flex">
            <p>计划完工时间:&nbsp;&nbsp;&nbsp;
              <span v-if="projectMes.planFinishTime!=null&&projectMes.planFinishTime!='null'">{{projectMes.planFTimeSec}}</span>
              <span v-else>-</span>
            </p>
            <p>完工时间:&nbsp;&nbsp;&nbsp;
              <span v-if="projectMes.finishTime!=null&&projectMes.finishTime!='null'">{{projectMes.finishTimeSec}}</span>
              <span v-else>-</span>
            </p>
          </li>
          <li class="flex">
            <p>计划验收时间:&nbsp;&nbsp;&nbsp;
              <span v-if="projectMes.planAcceptTime!=null&&projectMes.planAcceptTime!='null'">{{projectMes.planATimeSec}}</span>
              <span v-else>-</span>
            </p>
            <p>验收时间:&nbsp;&nbsp;&nbsp;
              <span v-if="projectMes.acceptTime!=null&&projectMes.acceptTime!='null'">{{projectMes.acceptTimeSec}}</span>
              <span v-else>-</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="" v-show="showMes" v-for="(point,key) in projectMes.projectPointVOList" :key="'point'+key" style="minHeight:450px;maxHeight:none;margin-top:20px;">
        <p class="mes_titleOne">
          <span>局点信息</span>
        </p>
        <ul class="con_mes">
          <li>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:&nbsp;&nbsp;&nbsp;<span>{{point.placeName}}</span></li>
          <li>详细地址:&nbsp;&nbsp;&nbsp;<span>{{point.address}}</span></li>
          <li>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:&nbsp;&nbsp;&nbsp;<span>{{point.remark}}</span></li>
          <li>人员组成:&nbsp;&nbsp;&nbsp;<span>{{point.engineerNameListStr}}</span></li>

        </ul>
        <div class="coll">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :name="point.openKey">
                <template slot="title">
                 <span style="color:rgba(235,122,29,1);fontSize:16px;">项目进程【点击展开】</span>
                </template>
                <el-row>
                  <el-col :span="4"><div class="gress_title">进程节点</div></el-col>
                  <el-col :span="5"><div class="gress_title">实际开始时间</div></el-col>
                  <el-col :span="5"><div class="gress_title">实际完成时间</div></el-col>
                  <el-col :span="6"><div class="gress_title">项目说明</div></el-col>
                  <el-col :span="4"><div class="gress_title">项目日报</div></el-col>
                </el-row>
                <el-row v-for="(gress,index) in point.usingProjectCourseNodeVOList" :key="'gress'+index">
                  <el-col :span="4"><div class="gress_con">{{gress.courseNodeName}}</div></el-col>
                  <el-col :span="5"><div class="gress_con">
                    <span v-if="gress.startTime!=null&&gress.startTime!='null'">{{gress.startTimeSec}}</span>
                    <span v-else>-</span>
                  </div></el-col>
                  <el-col :span="5"><div class="gress_con">
                    <span v-if="gress.endTime!=null&&gress.endTime!='null'">{{gress.endTimeSec}}</span>
                    <span v-else>-</span>
                  </div></el-col>
                  <el-col :span="6"><div class="gress_con">
                    <span v-if="gress.remark!=null&&gress.remark!=''">{{gress.remark}}</span>
                    <span v-else>-</span>
                  </div></el-col>
                  <el-col :span="4"><div class="gress_con">
                    <span class="el-icon-tickets"
                    @click="proDay(key,index)" style="fontSize:18px;color:rgba(235,122,29,1);cursor:pointer;"
                    v-if="gress.workRecordVOList!=null&&gress.workRecordVOList!=''"
                    ></span>
                    <span v-else>-</span>
                  </div></el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item :name="point.openKey">
                <template slot="title">
                 <span style="color:rgba(235,122,29,1);fontSize:16px;">项目文档【点击展开】</span>
                </template>
                <p v-for="(file,index) in point.projectFileVOList" :key="'file'+index" style="line-height:40px;">
                  <span v-show="file.fileType==0">【项目经理任命】</span>
                  <span v-show="file.fileType==1">【开会检查项】</span>
                  <span v-show="file.fileType==2">【会议纪要】</span>
                  <span v-show="file.fileType==3">【技术方案】</span>
                  <span v-show="file.fileType==4">【安装报告】</span>
                  <span v-show="file.fileType==5">【加电测试】</span>
                  <span v-show="file.fileType==6">【割接调测】</span>
                  <span v-show="file.fileType==7">【完工报告】</span>
                  <span v-show="file.fileType==8">【验收报告】</span>
                  <span v-show="file.fileType==9">【进场报告】</span>
                  <span v-show="file.fileType==10">【离场报告】</span>
                  <a :href="url+'/'+file.fileName">{{file.fileName}}</a>
                </p>
            </el-collapse-item>
            <el-collapse-item :name="point.openKey">
                <template slot="title">
                 <span style="color:rgba(235,122,29,1);fontSize:16px;">验&nbsp;&nbsp;货&nbsp;&nbsp;单【点击展开】</span>
                </template>
                <div class="" v-for="(ins,index) in point.inspectionVOList" :key="'ins'+index">
                  <p style="width:100%;text-align:center;fontSize:16px;marginTop:15px;marginBottom:15px;">设备</p>
                  <el-row>
                    <el-col :span="3"><div class="insTitle">网元名称<span style="color:red;">*</span></div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.name!=null&&ins.name!=''">{{ins.name}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                    <el-col :span="3"><div class="insTitle">设备型号</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.model!=null&&ins.model!=''">{{ins.model}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                    <el-col :span="3"><div class="insTitle">整机、机框条码</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.code!=null&&ins.code!=''">{{ins.code}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="3"><div class="insTitle">省份</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.province!=null&&ins.province!=''">{{ins.province}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                    <el-col :span="3"><div class="insTitle">城市</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.city!=null&&ins.city!=''">{{ins.city}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                    <el-col :span="3"><div class="insTitle">地址</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.address!=null&&ins.address!=''">{{ins.address}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="3"><div class="insTitle">主机版本</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.hostVersion!=null&&ins.hostVersion!=''">{{ins.hostVersion}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                    <el-col :span="3"><div class="insTitle">补丁版本</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.patchVersion!=null&&ins.patchVersion!=''">{{ins.patchVersion}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                    <el-col :span="3"><div class="insTitle">槽位号及单板名称</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.boardName!=null&&ins.boardName!=''">{{ins.boardName}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="3"><div class="insTitle">单板型号</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.boardModel!=null&&ins.boardModel!=''">{{ins.boardModel}}</span>
                      <span>-</span>
                    </div></el-col>
                    <el-col :span="3"><div class="insTitle">单板条码</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.boardCode!=null&&ins.boardCode!=''">{{ins.boardCode}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                    <el-col :span="3"><div class="insTitle">单板版本(软件)</div></el-col>
                    <el-col :span="5"><div class="insTitle">
                      <span v-if="ins.boardVersion!=null&&ins.boardVersion!=''">{{ins.boardVersion}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="3"><div class="insTitle">备注</div></el-col>
                    <el-col :span="21"><div class="insTitle">
                      <span v-if="ins.remark!=null&&ins.remark!=''">{{ins.remark}}</span>
                      <span v-else>-</span>
                    </div></el-col>
                  </el-row>
                </div>
            </el-collapse-item>
            <el-collapse-item :name="point.openKey">
              <template slot="title">
               <span style="color:rgba(235,122,29,1);fontSize:16px;">潜在风险【点击展开】</span>
              </template>
              <el-row>
                <el-col :span="20"><div class="warnTitle" style="text-align:left;box-sizing:border-box;padding-left:30px;background:rgba(235,122,29,1);">潜在风险描述</div></el-col>
                <el-col :span="2"><div class="warnTitle" style="text-align:center;background:rgba(235,122,29,1);">提交人员</div></el-col>
                <el-col :span="2"><div class="warnTitle" style="text-align:center;background:rgba(235,122,29,1);">创建时间</div></el-col>
              </el-row>
              <el-row class="el_con" v-for="(warnMes,indexWarn) in point.warnRecordVOList" :key="indexWarn">
                <el-col :span="20"><div class="warnCon" style="text-align:left;box-sizing:border-box;padding-left:30px;">{{warnMes.content}}</div></el-col>
                <el-col :span="2"><div class="warnCon" style="text-align:center;">{{warnMes.engineerName}}</div></el-col>
                <el-col :span="2"><div class="warnCon" style="text-align:center;">{{warnMes.warnTimeCreat}}</div></el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <!-- 项目日报 -->
    <div class="project_day" ref="project_day" v-show="showProDay">
      <p class="close_day">
        <span class="day_title">项目日报</span>
        <span class="el-icon-close close" @click="closeProDay()"></span>
      </p>
      <ul>
        <li v-for="(proDay,index) in dayList" :key="'DayWork'+index">
          <p class="engName">{{proDay.engineerName}}&nbsp;<span>[{{proDay.workTimeSec}}]</span></p>
          <p class="proName">项目名称:&nbsp;{{proDay.projectName}}</p>
          <p class="nodeTime">
            <span>进程节点:&nbsp;{{proDay.projectCourseNodeName}}</span>
            <span>工作时长:&nbsp;{{proDay.workDay}}天 [<span>{{proDay.startTime}}:00</span>-<span>{{proDay.endTime}}:00</span>]</span>
          </p>
          <p class="proContent">工作内容:&nbsp;{{proDay.content}}</p>
          <p>日报附件:
            <a :href="url+'/'+dayFile.fileName" v-for="(dayFile,index) in proDay.fileUploads">{{dayFile.fileName}}</a>
          </p>
          <p>日报图片:
            <viewer :images="proDay.imgUploads">
              <img alt="" v-for="(dayPic,index) in proDay.imgUploads" :key="'DayPic'+index" :src="url+'/'+dayPic.fileName">
            </viewer>
          </p>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      proList:[],
      value1:'',
      multipleSelection: [],
      placeList: [],
      value: '',
      planList:[
        {name:'进场开工',id:'01'},
        {name:'硬件安装',id:'02'},
        {name:'加电单调',id:'03'},
        {name:'联调割接',id:'04'},
        {name:'培训',id:'05'},
        {name:'完工',id:'06'},
        {name:'验收',id:'07'}
      ],
      searchMes:{//筛选条件
        proName:null,//项目名称
        cusName:null,//客户名称
        manName:null,//项目经理
        lineName:null,//产品线
        lineID:null,//产品线ID
        proStatus:null,//项目状态
        proStatusNum:null,//项目状态值  0未开工   1开工   2停工  3完工  4验收
        dateText:null,//时间文本
        dateUpText:null,//上传时间类型字段
        lineList:[],//产品线选择列表
        typeList:['未开工','开工','停工','完工','验收'],//项目状态选择列表
        dateList:['创建时间','预警时间','入场时间','计划完工时间','完工时间','计划验收时间','验收时间'],//时间类型选择列表
        dateChoose:[],//时间选择
        startTime:null,//筛选开始时间
        endTime:null,//筛选结束时间
        conNumber:null,//合同号
      },
      closeText:'收起筛选',
      searchList:true,//闭合搜索
      operClose:'./static/img/close_search.png',
      dataLength:88,//共有数据条数
      // proList:[],//项目列表
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
      editPro:false,//编辑项目信息
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
      firstConBox:false,//第一步实施计划内容盒子
      secondBox:false,//第二步人员委派
      secondConBox:false,//第二步人员委派内容盒子
      threeBox:false,//第三步进程管理
      threeConBox:false,//第三步进程管理内容盒子
      fileBox:false,//项目文档上传
      fileConBox:false,//项目文档上传内容盒子
      insBox:false,//验货单上传
      insConBox:false,//验货单内容盒子
      openDetils:false,//项目详情
      showProDay:false,//项目日报projectMes
      showMes:false,//项目详情内容显示
      projectMes:{},//项目详情内容
      dayList:[],//项目日报列表
      activeNames:[],//折叠面板参数
      gateList:[],
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
      ],
      pointFileList:[
        {
          place:'国外/国外',
          address:'纽约市',
          children:[
            '项目经理认命','开工检查项','会议纪要','技术方案'
          ]
        },
        {
          place:'中国/北京',
          address:'海淀区马连洼北路8号',
          children:[
            '项目经理认命','开工检查项','会议纪要'
          ]
        }
      ],
      pointInsList:[],
      operTwoList:[
        {
          num:0,
          placeID:110100,//地址ID
          address:null,//详细地址
          remark:null,//备注
          chooseMes:[
            {pointID:false,id:'04c10200-88c1-4c5a-a831-43a4b78f9789'},//进场开工
            {pointID:false,id:'ea0e6c9b-a014-484b-8a36-442a53b07438'},//硬件安装
            {pointID:false,id:'84f9bbab-dfbb-4326-bf49-05fff21dd6d0'},//加电单调
            {pointID:false,id:'60a95b32-59c9-4b15-ad25-5d74e577592f'},//联调割接
            {pointID:false,id:'03c3fa6b-5440-45c6-855a-ee4cc7a739b8'},//培训
            {pointID:false,id:'8ded2067-2ffe-47d0-959c-d1bd994c5dfd'},//完工
            {pointID:false,id:'c93bc808-f703-4c86-b124-5fac8319504d'},//验收
          ],
          viceName:'北京',//省级名称
          cityName:'北京市',//城市名称
          cityList:[],
        },
      ],
      editProMes:{},//编辑项目内容
      isDown:false,//编辑项目信息是否数据加载完毕
      abilityIDList:[],//技能评定ID列表
      proID:null,//项目ID
      length:0,
      fullscreenLoading:false,//全屏Loading
      tem:[],//临时数据
      temTwo:[],//临时数据
      temThree:[],//临时数据
      temFour:[],//临时数据
      temFive:[],//临沭数据
      temSix:[],//临时数据
      temSeven:[],//临时数据
      loadPoint:false,//据点加载Loading
      callIndex:null,//调用Index
      hasPoint:false,//是否含有局点
      pointNum:0,//局点派遣排序
      proStateList:[],//项目状态选项
      insNum:0,//验货单排序
      proStateMes:{
        stateText:null,//项目状态
        state:null,//项目状态code
        warnTime:null,//预警时间
        planEndTime:null,//计划完工时间
        planAcceptTime:null,//计划验收时间
        proGress:null,//项目进度
        startTime:null,//入场时间
        endTime:null,//完工时间
        acceptTime:null,//验收时间
      },
    }
  },
  created(){
    this.getProList();
    this.getLineList()
  },
  watch:{
    addPro(val,oldVal){
      if(!val){
        this.addProMes=this.addProMesEnd;
        this.cusName=null;
      }
    },
    editPro(val,oldVal){
      if(!val){
        this.editProMes={};
        this.isDown=false;
        // console.log(this.editProMes)
      }
    }
  },
  methods:{
    getLineList(){//获取产品线选项
      this.$axios.get(this.url+'/usingTechnologyList').then((res)=>{
        if(res.data.code==0){
          this.searchMes.lineList=res.data.data;
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('获取产品线失败,请联系管理员')
      })
    },
    serchPro(){//搜索项目
      let formdata=new FormData();
      let opID=window.localStorage.getItem('Uid');
      formdata.append('operatorId',opID);
      formdata.append('operateType','creator');
      if(this.searchMes.proName!=null&&this.searchMes.proName!=''){
        formdata.append('name',this.searchMes.proName)
      };
      if(this.searchMes.cusName!=null&&this.searchMes.cusName!=''){
        formdata.append('customerName',this.searchMes.cusName)
      };
      if(this.searchMes.lineID!=null&&this.searchMes.lineID!=''){
        formdata.append('technologyId',this.searchMes.lineID)
      };
      if(this.searchMes.proStatus!=null&&this.searchMes.proStatus!=''){
        formdata.append('state',this.searchMes.proStatusNum)
      };
      if(this.searchMes.conNumber!=null&&this.searchMes.conNumber!=''){
        formdata.append('contractNumber',this.searchMes.conNumber)
      };
      if(this.searchMes.dateUpText!=null&&this.searchMes.dateChoose!=null){
        formdata.append('dateType',this.searchMes.dateUpText);
        formdata.append('beginTime',this.searchMes.dateChoose[0]);
        formdata.append('endTime',this.searchMes.dateChoose[1]);
      };
      this.$axios.post(this.url+'/findProjectListByCondition',formdata).then((res)=>{
        if(res.data.code==0){
          this.length=this.page*10
          res.data.data.content.forEach((e)=>{
            this.$set(e,'num',this.length++);
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
            this.$set(e,'createTimeSec',cTime);
          })
          this.proList=res.data.data.content;
          this.pageNum=res.data.data.totalPages*10;
          this.proLoad=false;
          this.dataLength=res.data.data.totalElements;
        }else{
          this.$message.error(res.data.msg);
          this.proLoad=false;
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员');
        this.proLoad=false;
        // console.log(err)
      })
    },
    searchSwitch(){//闭合搜索
      if(this.closeText==='收起筛选'){
        this.closeText='展开筛选';
        this.$refs.query_search.style.height="10px";
        this.operClose='./static/img/open_search.png';
        this.$refs.add.style.bottom='-20px'
        setTimeout(()=>{
          this.searchList=false;
        },50)
      }else{
        this.closeText='收起筛选';
        this.$refs.query_search.style.height="230px";
        this.operClose='./static/img/close_search.png';
        this.$refs.add.style.bottom='0'
        setTimeout(()=>{
          this.searchList=true;
        },200)
      }
    },
    chooseStatus(){//选择项目状态
      if(this.searchMes.proStatus==='未开工'){
        this.searchMes.proStatusNum=0;
      }else if(this.searchMes.proStatus==='开工'){
        this.searchMes.proStatusNum=1;
      }else if(this.searchMes.proStatus==='停工'){
        this.searchMes.proStatusNum=2;
      }else if(this.searchMes.proStatus==='完工'){
        this.searchMes.proStatusNum=3;
      }else{
        this.searchMes.proStatusNum=4;
      }
    },
    chooseLine(){//选择产品线
      this.searchMes.lineList.forEach((e)=>{
        if(e.name===this.searchMes.lineName){
          this.searchMes.lineID=e.id;
        }else{
          return
        }
      })
    },
    chooseDate(){//选择时间类型
      if(this.searchMes.dateText==='创建时间'){
        this.searchMes.dateUpText='createTime'
      }else if(this.searchMes.dateText==='预警时间'){
        this.searchMes.dateUpText='warnTime'
      }else if(this.searchMes.dateText==='入场时间'){
        this.searchMes.dateUpText='startTime'
      }else if(this.searchMes.dateText==='计划完工时间'){
        this.searchMes.dateUpText='planFinishTime'
      }else if(this.searchMes.dateText==='完工时间'){
        this.searchMes.dateUpText='finishTime'
      }else if(this.searchMes.dateText==='计划验收时间'){
        this.searchMes.dateUpText='planAcceptTime'
      }else{
        this.searchMes.dateUpText='acceptTime'
      };
    },
    cancelPro(){//取消筛选
      this.page=0;
      this.getProList();
      this.searchMes.proName=null;
      this.searchMes.cusName=null;
      this.searchMes.manName=null;
      this.searchMes.lineID=null;
      this.searchMes.proStatusNum=null;
      this.searchMes.dateUpText=null;
      this.searchMes.startTime=null;
      this.searchMes.endTime=null;
      this.searchMes.lineName=null;
      this.searchMes.dateText=null;
      this.searchMes.proStatus=null;
      this.searchMes.dateChoose=[];
      this.searchMes.conNumber=null;
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
        // console.log(err)
      })
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.page=val-1;
      if(this.searchMes.proName!=null||this.searchMes.cusName!=null||this.searchMes.manName!=null||this.searchMes.lineID!=null||this.searchMes.proStatus!=null||this.searchMes.dateChoose!=null||this.searchMes.conNumber){
        this.serchPro()
      }else{
        this.getProList()
      }
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
              _vm.addPro=true;
            }else{
              _vm.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            _vm.$message.error('未知错误,请联系管理员')
          })
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
      });
    },
    choseCus(){//选择客户
      this.restaurants.forEach((e)=>{
        if(e.value===this.cusName){
          this.addProMes.cusID=e.id;
        }
      });
    },
    editCus(){//编辑项目信息选择客户
      this.restaurants.forEach((e)=>{
        if(e.value===this.editProMes.customerName){
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
    editChoose(value){
      let a=[];
      value.forEach((e)=>{
        a.push(e.id)
      });
      this.editProMes.skillIDList=a;
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
      let _vm=this;
      _vm.loadPoint=true;
      _vm.callIndex=index;
      _vm.fullscreenLoading=true;
      _vm.proID=_vm.proList[index].id;
      _vm.$axios.get(_vm.url+'/projectInfo?projectId='+_vm.proID).then((res)=>{
        if(res.data.code==0){
          if(res.data.data.projectPointVOList!=null){
            _vm.operTwoList=[];
            for(let i in res.data.data.projectPointVOList){
              _vm.operTwoList.push({
                placeID:res.data.data.projectPointVOList[i].placeId,
                address:res.data.data.projectPointVOList[i].address,
                remark:res.data.data.projectPointVOList[i].remark,
                chooseMes:[

                ],
                viceName:res.data.data.projectPointVOList[i].placeVO.parentName,//省级名称
                cityName:res.data.data.projectPointVOList[i].placeVO.name,//城市名称
                cityList:[],
                projectPointId:res.data.data.projectPointVOList[i].id
              });
              for(let x in res.data.data.projectPointVOList[i].projectCourseNodeVOList){
                _vm.operTwoList.forEach((e)=>{
                  e.chooseMes.push(
                    {
                      pointID:res.data.data.projectPointVOList[i].projectCourseNodeVOList[x].isUsed,
                      id:res.data.data.projectPointVOList[i].projectCourseNodeVOList[x].courseNodeId,
                      pointId:res.data.data.projectPointVOList[i].projectCourseNodeVOList[x].id
                    },
                  )
                })
              };
            }
            _vm.length=0;
            for(let u in _vm.operTwoList){
              _vm.$set(_vm.operTwoList[u],'num',_vm.length++);
              _vm.operTwoList[u].chooseMes.splice(7,14);
              setTimeout(()=>{
                for(let o in _vm.operTwoList[u].chooseMes){
                  if(_vm.operTwoList[u].chooseMes[o].pointID){
                    _vm.$refs.ChosePointParent[u].children[Number(o)+4].children[0].checked=true;
                    _vm.$refs.ChosePointParent[u].children[Number(o)+4].children[1].style.display='block';
                  }
                }
              },550);
            };
            _vm.operTwoList.forEach((t)=>{
                _vm.tem.push(t.chooseMes[0].pointID);
                if(_vm.tem.indexOf(false)>-1){
                  setTimeout(()=>{
                    _vm.$refs.PointCheck0[0].checked=false;
                    _vm.$refs.MaskTitle0[0].style.display='none';
                  },500);
                }else{
                  setTimeout(()=>{
                    _vm.$refs.PointCheck0[0].checked=true;
                    _vm.$refs.MaskTitle0[0].style.display='block';
                  },500)
                };
                _vm.temTwo.push(t.chooseMes[1].pointID);
                if(_vm.temTwo.indexOf(false)>-1){
                  setTimeout(()=>{
                    _vm.$refs.PointCheck1[0].checked=false;
                    _vm.$refs.MaskTitle1[0].style.display='none';
                  },500);
                }else{
                  setTimeout(()=>{
                    _vm.$refs.PointCheck1[0].checked=true;
                    _vm.$refs.MaskTitle1[0].style.display='block';
                  },500)
                };
                _vm.temThree.push(t.chooseMes[2].pointID);
                if(_vm.temThree.indexOf(false)>-1){
                  setTimeout(()=>{
                    _vm.$refs.PointCheck2[0].checked=false;
                    _vm.$refs.MaskTitle2[0].style.display='none';
                  },500);
                }else{
                  setTimeout(()=>{
                    _vm.$refs.PointCheck2[0].checked=true;
                    _vm.$refs.MaskTitle2[0].style.display='block';
                  },500)
                };
                _vm.temFour.push(t.chooseMes[3].pointID);
                if(_vm.temFour.indexOf(false)>-1){
                  setTimeout(()=>{
                    _vm.$refs.PointCheck3[0].checked=false;
                    _vm.$refs.MaskTitle3[0].style.display='none';
                  },500);
                }else{
                  setTimeout(()=>{
                    _vm.$refs.PointCheck3[0].checked=true;
                    _vm.$refs.MaskTitle3[0].style.display='block';
                  },500)
                };
                _vm.temFive.push(t.chooseMes[4].pointID);
                if(_vm.temFive.indexOf(false)>-1){
                  setTimeout(()=>{
                    _vm.$refs.PointCheck4[0].checked=false;
                    _vm.$refs.MaskTitle4[0].style.display='none';
                  },500);
                }else{
                  setTimeout(()=>{
                    _vm.$refs.PointCheck4[0].checked=true;
                    _vm.$refs.MaskTitle4[0].style.display='block';
                  },500)
                };
                _vm.temSix.push(t.chooseMes[5].pointID);
                if(_vm.temSix.indexOf(false)>-1){
                  setTimeout(()=>{
                    _vm.$refs.PointCheck5[0].checked=false;
                    _vm.$refs.MaskTitle5[0].style.display='none';
                  },500);
                }else{
                  setTimeout(()=>{
                    _vm.$refs.PointCheck5[0].checked=true;
                    _vm.$refs.MaskTitle5[0].style.display='block';
                  },500)
                };
                _vm.temSeven.push(t.chooseMes[6].pointID);
                if(_vm.temSeven.indexOf(false)>-1){
                  setTimeout(()=>{
                    _vm.$refs.PointCheck6[0].checked=false;
                    _vm.$refs.MaskTitle6[0].style.display='none';
                  },500);
                }else{
                  setTimeout(()=>{
                    _vm.$refs.PointCheck6[0].checked=true;
                    _vm.$refs.MaskTitle6[0].style.display='block';
                  },500)
                };
              });
            _vm.$axios.get(_vm.url+'/getUsingCourseNodeList').then((res)=>{
              if(res.data.code==0){
                _vm.planList=res.data.data;
                _vm.$axios.get(_vm.url+'/mobile/getUsingPlaceList').then((res)=>{
                  if(res.data.code==0){
                    _vm.placeList=res.data.data.placeList;
                    _vm.firstBox=true;
                    _vm.fullscreenLoading=false;
                    _vm.loadPoint=false;
                    setTimeout(()=>{
                      _vm.firstConBox=true;
                    },100)
                    setTimeout(()=>{
                      _vm.$refs.firstPerBox.style.width='100%';
                      _vm.$refs.firstPerBox.style.minHeight='100%';
                    })
                  }else{
                    _vm.loadPoint=false;
                    _vm.fullscreenLoading=false;
                    _vm.$message.error(res.data.msg);
                  }
                }).catch((err)=>{
                  _vm.loadPoint=false;
                  _vm.fullscreenLoading=false;
                  _vm.$message.error('未知错误,请联系管理员')
                })
              }else{
                _vm.loadPoint=false;
                _vm.fullscreenLoading=false;
                _vm.$message.error(res.data.msg)
              }
            }).catch((err)=>{
              _vm.loadPoint=false;
              _vm.fullscreenLoading=false;
              _vm.$message.error('未知错误,请联系管理员')
            })
          }else{
            _vm.$axios.get(_vm.url+'/mobile/getUsingPlaceList').then((res)=>{
              if(res.data.code==0){
                _vm.placeList=res.data.data.placeList;
                _vm.firstBox=true;
                _vm.fullscreenLoading=false;
                _vm.loadPoint=false;
                setTimeout(()=>{
                  _vm.firstConBox=true;
                },100)
                setTimeout(()=>{
                  _vm.$refs.firstPerBox.style.width='100%';
                  _vm.$refs.firstPerBox.style.minHeight='100%';
                })
              }else{
                _vm.loadPoint=false;
                _vm.fullscreenLoading=false;
                _vm.$message.error(res.data.msg);
              }
            }).catch((err)=>{
              _vm.loadPoint=false;
              _vm.fullscreenLoading=false;
              _vm.$message.error('未知错误,请联系管理员')
            })
            // alert(1)
          }
        }else{
          _vm.loadPoint=false;
          _vm.fullscreenLoading=false;
          _vm.$message.error(res.data.msdg)
        }
      }).catch((err)=>{
        _vm.loadPoint=false;
        _vm.fullscreenLoading=false;
        _vm.$message.error('未知错误,请联系管理员')
      })

    },
    closeFirstBox(){//关闭第一步实施计划
      this.$refs.firstPerBox.style.width='300px';
      this.$refs.firstPerBox.style.minHeight='200px';
      this.proID=null;
      this.tem=[];//临时数据
      this.temTwo=[];//临时数据
      this.temThree=[];//临时数据
      this.temFour=[];//临时数据
      this.temFive=[];//临沭数据
      this.temSix=[];//临时数据
      this.temSeven=[];//临时数据
      setTimeout(()=>{
        this.firstConBox=false;
      },100)
      setTimeout(()=>{
        this.operTwoList=[
          {
            num:0,
            placeID:110100,//地址ID
            address:null,//详细地址
            remark:null,//备注
            chooseMes:[
              {pointID:false,id:'04c10200-88c1-4c5a-a831-43a4b78f9789'},//进场开工
              {pointID:false,id:'ea0e6c9b-a014-484b-8a36-442a53b07438'},//硬件安装
              {pointID:false,id:'84f9bbab-dfbb-4326-bf49-05fff21dd6d0'},//加电单调
              {pointID:false,id:'60a95b32-59c9-4b15-ad25-5d74e577592f'},//联调割接
              {pointID:false,id:'03c3fa6b-5440-45c6-855a-ee4cc7a739b8'},//培训
              {pointID:false,id:'8ded2067-2ffe-47d0-959c-d1bd994c5dfd'},//完工
              {pointID:false,id:'c93bc808-f703-4c86-b124-5fac8319504d'},//验收
            ],
            viceName:'北京',//省级名称
            cityName:'北京市',//城市名称
            cityList:[],
          },
        ]
        this.firstBox=false;
      },300)
    },
    secondStep(index){//第二步人员委派
      let _vm=this;
      _vm.proID=_vm.proList[index].id;
      _vm.$axios.get(_vm.url+'/projectInfo?projectId='+_vm.proID).then((res)=>{
        if(res.data.code==0){
          _vm.gateList=res.data.data.projectPointVOList;
          if(_vm.gateList==null||_vm.gateList.length<0){
            _vm.hasPoint=true;
          }else{
            _vm.hasPoint=false;
            _vm.gateList.forEach((e)=>{
              _vm.$set(e,'num',_vm.pointNum++);
              _vm.$set(e,'searchEngText',null);
              if(e.personnelRecordVOList!=null&&e.personnelRecordVOList.length>4){
                _vm.$set(e,'isCeed',true);
              }else{
                _vm.$set(e,'isCeed',false);
              }
            });
          };
          this.secondBox=true;
          setTimeout(()=>{
            this.secondConBox=true;
          },200)
          setTimeout(()=>{
            this.$refs.secondPerBox.style.width='100%';
            this.$refs.secondPerBox.style.minHeight='100%';
          })
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
      });
    },
    closeSecondtBox(){//关闭第二步人员委派
      this.$refs.secondPerBox.style.width='300px';
      this.$refs.secondPerBox.style.minHeight='200px';
      this.gateList=[];
      this.pointNum=0;
      setTimeout(()=>{
        this.secondConBox=false;
      },100)
      setTimeout(()=>{
        this.secondBox=false;
      },300)
    },
    conversionTime(value){//转换时间
      let timeDate=new Date(value);
      let tYear=timeDate.getFullYear();
      let tMon=timeDate.getMonth()+1;
      if(tMon<10){
        tMon='0'+tMon
      };
      let tDay=timeDate.getDate();
      if(tDay<10){
        tDay='0'+tDay
      }
      let tTime=tYear+'-'+tMon+'-'+tDay;
      if(value!=null&&value!=''){
        return tTime;
      }else{
        return null;
      }
    },
    threeStep(index){//第三步进程管理
      let _vm=this;
      _vm.proID=_vm.proList[index].id;
      _vm.$axios.get(_vm.url+'/projectInfo?projectId='+_vm.proID).then((res)=>{
        if(res.data.code==0){
          _vm.pointList=res.data.data.projectPointVOList;
          this.proStateMes.stateText=res.data.data.stateStr;
          this.proStateMes.state=res.data.data.state;
          this.proStateMes.proGress=res.data.data.schedule;
          this.proStateMes.warnTime=this.conversionTime(res.data.data.warnTime);
          this.proStateMes.planEndTime=this.conversionTime(res.data.data.planFinishTime);
          this.proStateMes.planAcceptTime=this.conversionTime(res.data.data.planAcceptTime);
          this.proStateMes.startTime=this.conversionTime(res.data.data.startTime);
          this.proStateMes.endTime=this.conversionTime(res.data.data.finishTime);
          this.proStateMes.acceptTime=this.conversionTime(res.data.data.acceptTime);
          _vm.$axios.get(_vm.url+'/enum/projectStateList').then((res)=>{
            if(res.data.code==0){
              _vm.proStateList=res.data.data;
              _vm.threeBox=true;
              setTimeout(()=>{
                _vm.threeConBox=true;
              },150)
              setTimeout(()=>{
                _vm.$refs.threePerBox.style.width='100%';
                _vm.$refs.threePerBox.style.minHeight='100%';
              })
            }else{
              _vm.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            _vm.$message.error('未知错误,请联系管理员')
          })
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
      });
    },
    closeThreetBox(){//关闭第三步进程管理
      this.$refs.threePerBox.style.width='300px';
      this.$refs.threePerBox.style.minHeight='200px';
      this.pointList=[];
      this.getProList()
      setTimeout(()=>{
        this.threeConBox=false;
      },100)
      setTimeout(()=>{
        this.threeBox=false;
      },300)
    },
    fileUp(index){//项目文档
      let _vm=this;
      _vm.proID=_vm.proList[index].id;
      _vm.$axios.get(_vm.url+'/projectInfo?projectId='+_vm.proID).then((res)=>{
        if(res.data.code==0){
          let a=res.data.data.projectPointVOList;
          if(a!=null&&a!=''){
            for(let i in a){
              _vm.$set(a[i],'fileList',[]);
              _vm.$axios.get(_vm.url+'//projectFileTypeList').then((res)=>{
                if(res.data.code==0){
                  for(let x in res.data.data){
                    a[i].fileList.push(res.data.data[x]);
                  };
                  a[i].fileList.forEach((e)=>{
                    _vm.$set(e,'fileName',null);
                    _vm.$set(e,'file',null);
                  })
                }else{
                  _vm.$message.error(res.data.msg)
                }
              }).catch((err)=>{
                _vm.$message.error('未知错误,请联系管理员')
              })
            }
          }else{
            setTimeout(()=>{
              _vm.$refs.FileNoData.style.display='block'
            },250)
          }
          this.fileBox=true;
          setTimeout(()=>{
            this.fileConBox=true;
          },250)
          setTimeout(()=>{
            this.$refs.filePerBox.style.width='100%';
            this.$refs.filePerBox.style.minHeight='100%';
          })
          _vm.pointFileList=a;
          console.log(_vm.pointFileList)
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误');
      });
    },
    closeFileBox(){//关闭项目文档
      this.$refs.filePerBox.style.width='300px';
      this.$refs.filePerBox.style.minHeight='200px';
      setTimeout(()=>{
        this.fileConBox=false;
      },100)
      setTimeout(()=>{
        this.fileBox=false;
      },300)
    },
    insUp(index){//验货单
      let _vm=this;
      _vm.proID=_vm.proList[index].id;
      _vm.$axios.get(_vm.url+'/projectInfo?projectId='+_vm.proID).then((res)=>{
        if(res.data.code==0){
          _vm.pointInsList=res.data.data.projectPointVOList;
          if(_vm.pointInsList==null){
            setTimeout(()=>{
              _vm.$refs.InsNoData.style.display='block';
            },250)
          }else{
            _vm.pointInsList.forEach((e)=>{
              _vm.insNum=0;
              _vm.$set(e,'fileName',null)
              _vm.$set(e,'file',null)
              if(e.inspectionVOList==null||e.inspectionVOList==''){
                e.inspectionVOList=[
                  {
                      num:0,
                      name:null,//网元名称
                      model:null,//设备型号
                      code:null,//整机条码
                      province:null,//省份
                      city:null,//城市
                      address:null,//详细地址
                      hostVersion:null,//主机版本
                      patchVersion:null,//补丁版本
                      boardName:null,//槽位号
                      boardModel:null,//单板型号
                      boardCode:null,//单板条码
                      boardVersion:null,//软件版本
                      remark:null,//备注
                    }
                ]
              }else{
                e.inspectionVOList.forEach((x)=>{
                  _vm.$set(x,'num',_vm.insNum++);
                })
              }
            });
            console.log(_vm.pointInsList)
          };
          _vm.insBox=true;
          setTimeout(()=>{
            _vm.insConBox=true;
          },250)
          setTimeout(()=>{
            _vm.$refs.insPerBox.style.width='100%';
            _vm.$refs.insPerBox.style.minHeight='100%';
          });
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员');
        console.log(err)
      });
    },
    closeInsBox(){//关闭验货单
      this.insNum=0;
      this.$refs.insPerBox.style.width='300px';
      this.$refs.insPerBox.style.minHeight='200px';
      setTimeout(()=>{
        this.insConBox=false
      },100)
      setTimeout(()=>{
        this.insBox=false;
      },300)
    },
    remoteEng(query) {//远程查询工程师列表
        if (query !== '') {
          let formdata=new FormData();
          formdata.append('state',2);
          formdata.append('name',query);
          formdata.append('size',20);
          formdata.append('page',0);
          this.$axios.post(this.url+'/findEngineerListByCondition',formdata).then((res)=>{
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
        } else {
          this.searchEngList = [];
        }
    },
    delPro(index){//删除当前项目
      console.log(this.proList[index].id)
    },
    delOperTwo(indexOper){//删除当前局点
      if(this.operTwoList[indexOper].projectPointId!=undefined){
        let formdata=new FormData();
        formdata.append('projectPointId',this.operTwoList[indexOper].projectPointId)
        this.$axios.post(this.url+'/deleteProjectPoint',formdata).then((res)=>{
          if(res.data.code==0){
            this.$message.success('删除局点成功');
            this.firstStep(this.callIndex)
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.$message.error('未知错误,请联系管理员')
        })
      }else{
        this.operTwoList.splice(indexOper,1)
      }
    },
    handleSelectionChange(val) {//全选
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    hasDetials(index){//查看项目详情
      let _vc=this;
      _vc.$axios.get(_vc.url+'/projectInfo?projectId='+_vc.proList[index].id).then((res)=>{
        if(res.data.code==0){
          //入场时间
          let startDate=new Date(res.data.data.startTime);
          let sYear=startDate.getFullYear();
          let sMon=startDate.getMonth()+1;
          if(sMon<10){
            sMon='0'+sMon
          };
          let sDay=startDate.getDate();
          if(sDay<10){
            sDay='0'+sDay
          }
          let sTime=sYear+'-'+sMon+'-'+sDay;
          _vc.$set(res.data.data,'startTimeSec',sTime);
          //完工时间
          let finishDate=new Date(res.data.data.finishTime);
          let fYear=finishDate.getFullYear();
          let fMon=finishDate.getMonth()+1;
          if(fMon<10){
            fMon='0'+fMon
          };
          let fDay=finishDate.getDate();
          if(fDay<10){
            fDay='0'+fDay
          }
          let fTime=fYear+'-'+fMon+'-'+fDay;
          _vc.$set(res.data.data,'finishTimeSec',fTime);
          //验收时间
          let acceptDate=new Date(res.data.data.acceptTime);
          let aYear=acceptDate.getFullYear();
          let aMon=acceptDate.getMonth()+1;
          if(aMon<10){
            aMon='0'+aMon
          };
          let aDay=acceptDate.getDate();
          if(aDay<10){
            aDay='0'+aDay
          }
          let aTime=aYear+'-'+aMon+'-'+aDay;
          _vc.$set(res.data.data,'acceptTimeSec',aTime);
          //预警时间
          let warnDate=new Date(res.data.data.warnTime );
          let wYear=warnDate.getFullYear();
          let wMon=warnDate.getMonth()+1;
          if(wMon<10){
            wMon='0'+wMon
          };
          let wDay=warnDate.getDate();
          if(wDay<10){
            wDay='0'+wDay
          }
          let wTime=wYear+'-'+wMon+'-'+wDay;
          _vc.$set(res.data.data,'warnTimeSec',wTime);
          //计划完工时间
          let planFDate=new Date(res.data.data.planFinishTime);
          let pfYear=planFDate.getFullYear();
          let pfMon=planFDate.getMonth()+1;
          if(pfMon<10){
            pfMon='0'+pfMon
          };
          let pfDay=planFDate.getDate();
          if(pfDay<10){
            pfDay='0'+pfDay
          }
          let pfTime=pfYear+'-'+pfMon+'-'+pfDay;
          _vc.$set(res.data.data,'planFTimeSec',pfTime);
          //计划验收时间
          let planADate=new Date(res.data.data.planAcceptTime);
          let paYear=planADate.getFullYear();
          let paMon=planADate.getMonth()+1;
          if(paMon<10){
            paMon='0'+paMon
          };
          let paDay=planADate.getDate();
          if(paDay<10){
            paDay='0'+paDay
          }
          let paTime=paYear+'-'+paMon+'-'+paDay;
          _vc.$set(res.data.data,'planATimeSec',paTime);
          for(let i in res.data.data.projectPointVOList){
            for(let x in res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList){
              //开始时间
              let startDate=new Date(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x].startTime);
              let sYear=startDate.getFullYear();
              let sMon=startDate.getMonth()+1;
              if(sMon<10){
                sMon='0'+sMon
              };
              let sDay=startDate.getDate();
              if(sDay<10){
                sDay='0'+sDay
              };
              let sTime=sYear+'-'+sMon+'-'+sDay
              _vc.$set(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x],'startTimeSec',sTime)
              //结束时间
              let endDate=new Date(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x].endTime);
              let eYear=endDate.getFullYear();
              let eMon=endDate.getMonth()+1;
              if(eMon<10){
                eMon='0'+eMon
              };
              let eDay=endDate.getDate();
              if(eDay<10){
                eDay='0'+eDay
              };
              let eTime=eYear+'-'+eMon+'-'+eDay
              _vc.$set(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x],'endTimeSec',eTime);
              _vc.$set(res.data.data.projectPointVOList[i].usingProjectCourseNodeVOList[x],'openKey',_vc.lengthNum++);
            }
            for(let y in res.data.data.projectPointVOList[i].warnRecordVOList){
              //风险创建时间
              let startDate=new Date(res.data.data.projectPointVOList[i].warnRecordVOList[y].createTime);
              let sYear=startDate.getFullYear();
              let sMon=startDate.getMonth()+1;
              if(sMon<10){
                sMon='0'+sMon
              };
              let sDay=startDate.getDate();
              if(sDay<10){
                sDay='0'+sDay
              };
              let sTime=sYear+'-'+sMon+'-'+sDay
              _vc.$set(res.data.data.projectPointVOList[i].warnRecordVOList[y],'warnTimeCreat',sTime)
            }
          }
          _vc.projectMes=res.data.data;
          // console.log(_vc.projectMes)
          _vc.openDetils=true;
          setTimeout(()=>{
            _vc.$refs.project_mes.style.width='100%'
            _vc.$refs.project_mes.style.minHeight='100%';
            setTimeout(()=>{
              _vc.showMes=true;
            },200)
          })
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
        // console.log(err)
      })
    },
    closeMes(){//关闭项目详情
      this.$refs.project_mes.style.width='300px'
      this.$refs.project_mes.style.height='200px'
      setTimeout(()=>{
        this.showMes=false;
      },100)
      setTimeout(()=>{
        this.openDetils=false;
      },200)
    },
    proDay(key,index){//显示项目日报
      this.dayList=this.projectMes.projectPointVOList[key].usingProjectCourseNodeVOList[index].workRecordVOList;
      this.dayList.forEach((e)=>{
        let crDate=new Date(e.workTime);
        let cYear=crDate.getFullYear();
        let cMon=crDate.getMonth()+1;
        if(cMon<10){
          cMon='0'+cMon
        };
        let cDay=crDate.getDate();
        if(cDay<10){
          cDay='0'+cDay
        }
        let cTime=cYear+'-'+cMon+'-'+cDay;
        this.$set(e,'workTimeSec',cTime);
      })
      this.showProDay=true;
      setTimeout(()=>{
        this.$refs.project_day.style.opacity='1'
      },10)
    },
    closeProDay(){//关闭项目日报
      this.$refs.project_day.style.opacity='0';
      setTimeout(()=>{
        this.showProDay=false;
      },500)
    },
    handleChange(val) {//折叠面板
       // console.log(val);
    },
    pushTable(key){//添加验货单设备
      this.pointInsList[key].inspectionVOList.push({
        num:this.pointInsList[key].inspectionVOList.length,
        name:null,//网元名称
        model:null,//设备型号
        code:null,//整机条码
        province:null,//省份
        city:null,//城市
        address:null,//详细地址
        hostVersion:null,//主机版本
        patchVersion:null,//补丁版本
        boardName:null,//槽位号
        boardModel:null,//单板型号
        boardCode:null,//单板条码
        boardVersion:null,//软件版本
        remark:null,//备注
      });
    },
    delIns(key,index){//删除验货单设备
      if(this.pointInsList[key].inspectionVOList[index].id!=undefined){
        let formdata=new FormData();
        formdata.append('inspectionId',this.pointInsList[key].inspectionVOList[index].id);
        this.$axios.post(this.url+'/deleteInspection',formdata).then((res)=>{
          if(res.data.code==0){
            this.$message.success('删除设备成功');
            this.pointInsList[key].inspectionVOList.splice(index,1);
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.$message.error('未知错误,请联系管理员')
        })
      }else{
        this.pointInsList[key].inspectionVOList.splice(index,1);
      }
    },
    pushPoint(){//添加实施地点
      this.operTwoList.push({
        num:this.operTwoList.length,
        placeID:110100,//地址ID
        address:null,//详细地址
        remark:null,//备注
        chooseMes:[
          {pointID:false,id:'04c10200-88c1-4c5a-a831-43a4b78f9789'},//进场开工
          {pointID:false,id:'ea0e6c9b-a014-484b-8a36-442a53b07438'},//硬件安装
          {pointID:false,id:'84f9bbab-dfbb-4326-bf49-05fff21dd6d0'},//加电单调
          {pointID:false,id:'60a95b32-59c9-4b15-ad25-5d74e577592f'},//联调割接
          {pointID:false,id:'03c3fa6b-5440-45c6-855a-ee4cc7a739b8'},//培训
          {pointID:false,id:'8ded2067-2ffe-47d0-959c-d1bd994c5dfd'},//完工
          {pointID:false,id:'c93bc808-f703-4c86-b124-5fac8319504d'},//验收
        ],
        viceName:'北京',//省级名称
        cityName:'北京市',//城市名称
        cityList:[],
      })
    },
    editProject(index){//编辑项目信息
      let _vm=this;
      _vm.editProMes=this.proList[index];
      _vm.$set(_vm.editProMes,'skillList',[]);
      _vm.$set(_vm.editProMes,'skillIDList',[]);
      _vm.$set(_vm.editProMes,'typeList',[]);
      _vm.$set(_vm.editProMes,'ductList',[]);
      _vm.$axios.get(_vm.url+'/usingTechnologyList').then((res)=>{
        if(res.data.code==0){
          _vm.editProMes.skillList=res.data.data;
          _vm.addProMes.cusID=_vm.editProMes.customerId;
          _vm.$axios.get(_vm.url+'/projectInfo?projectId='+_vm.proList[index].id).then((res)=>{
            if(res.data.code==0){
              let a=res.data.data.levelVOList;
              _vm.editProMes.skillList.forEach((e)=>{
                for(let x in a){
                  _vm.editProMes.skillIDList.push(a[x].id);
                  for(let i in e.usingLevelVOList){
                    if(a[x].id===e.usingLevelVOList[i].id){
                      _vm.$set(e.usingLevelVOList[i],'selected',true)
                    }
                  }
                }

              });
              _vm.$axios.get(_vm.url+'/getProjectTypeList').then((res)=>{
                if(res.data.code==0){
                  _vm.editProMes.typeList=res.data.data;
                  _vm.editPro=true;
                  _vm.isDown=true;
                }
              })
            }else{
              _vm.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            _vm.$message.error('未知错误,请联系管理员')
          })
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
        // console.log(err)
      });

    },
    editType(value){//编辑项目修改项目类型
      this.editProMes.typeList.forEach((e)=>{
        if(e.name===value){
          this.editProMes.projectType.id=e.id;
        }
      });
    },
    editDuct(value){//编辑项目修改产品线
      this.editProMes.skillList.forEach((e)=>{
        if(e.name===value){
          this.editProMes.technologyId=e.id;
        }
      });
    },
    turnEditPro(){//确认修改项目
      let vc=this;
      if(vc.addProMes.cusID==null){
        vc.$message.error('请选择客户名称')
      }else if(vc.editProMes.name==null||vc.editProMes.name==''){
        vc.$message.error('请输入项目名称')
      }else if(vc.editProMes.contractNumber==null||vc.editProMes.contractNumber==''){
        vc.$message.error('请输入合同号')
      }else if(vc.editProMes.content==null||vc.editProMes.content==''){
        vc.$message.error('请输入项目内容')
      }else if(vc.editProMes.linkman==null||vc.editProMes.linkman==''){
        vc.$message.error('请输入联系人姓名')
      }else if(vc.editProMes.phone==null||vc.editProMes.phone==''){
        vc.$message.error('请输入联系人电话')
      }else if(vc.editProMes.phone.length!=11){
        vc.$message.error('请输入正确的手机号')
      }else if(vc.editProMes.peopleNumber==null||vc.editProMes.peopleNumber==''){
        vc.$message.error('请输入项目人数')
      }else if(vc.editProMes.dayNumber==null||vc.editProMes.dayNumber==''){
        vc.$message.error('请输入项目工期')
      }else if(vc.editProMes.standard==null||vc.editProMes.standard==''){
        vc.$message.error('请输入项目交付标准')
      }else if(vc.editProMes.projectType.id==null){
        vc.$message.error('请选择项目类型')
      }else if(vc.editProMes.technologyId==null){
        vc.$message.error('请选择产品线')
      }else if(vc.editProMes.skillIDList.length<1){
        vc.$message.error('请选择技术要求')
      }else{
        let opID=window.localStorage.getItem('Uid');
        let formdata=new FormData();
        formdata.append('id',vc.editProMes.id)
        formdata.append('customerId',vc.addProMes.cusID);
        formdata.append('projectTypeId',vc.editProMes.projectType.id);
        formdata.append('technologyId',vc.editProMes.technologyId);
        formdata.append('technologyName',vc.editProMes.technologyName);
        formdata.append('name',vc.editProMes.name);
        formdata.append('content',vc.editProMes.content);
        formdata.append('linkman',vc.editProMes.linkman);
        formdata.append('phone',vc.editProMes.phone);
        formdata.append('peopleNumber',vc.editProMes.peopleNumber);
        formdata.append('dayNumber',vc.editProMes.dayNumber);
        formdata.append('standard',vc.editProMes.standard);
        formdata.append('contractNumber',vc.editProMes.contractNumber)
        if(vc.editProMes.proMount!=null&&vc.editProMes.proMount!=''){
          formdata.append('budget',vc.editProMes.proMount);
        }
        formdata.append('operatorId',opID);
        vc.editProMes.skillIDList.forEach((e)=>{
          formdata.append('levelIds',e);
        });
        vc.$axios.post(vc.url+'/saveProject_n',formdata).then((res)=>{
          if(res.data.code==0){
            vc.$message.success('修改项目信息成功')
            vc.getProList();
            vc.editPro=false;
            vc.addProMes.cusID=null;
          }else{
            vc.editPro=false;
            vc.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          vc.editPro=false;
          vc.$message.error('未知异常,请联系管理员')
        })
      };
    },
    allChoosePoint(index){//局点全选
      if(index==0){
        this.$refs.PointCheck0.forEach((e)=>{
          e.checked=true;
        });
        this.$refs.MaskTitle0.forEach((x)=>{
          x.style.display='block'
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[0].pointID=true;
        });
      }else if(index==1){
        this.$refs.PointCheck1.forEach((e)=>{
          e.checked=true;
        });
        this.$refs.MaskTitle1.forEach((x)=>{
          x.style.display='block'
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[1].pointID=true
        });
      }else if(index==2){
        this.$refs.PointCheck2.forEach((e)=>{
          e.checked=true;
        });
        this.$refs.MaskTitle2.forEach((x)=>{
          x.style.display='block'
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[2].pointID=true
        });
      }else if(index==3){
        this.$refs.PointCheck3.forEach((e)=>{
          e.checked=true;
        });
        this.$refs.MaskTitle3.forEach((x)=>{
          x.style.display='block'
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[3].pointID=true
        });
      }else if(index==4){
        this.$refs.PointCheck4.forEach((e)=>{
          e.checked=true;
        });
        this.$refs.MaskTitle4.forEach((x)=>{
          x.style.display='block'
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[4].pointID=true
        });
      }else if(index==5){
        this.$refs.PointCheck5.forEach((e)=>{
          e.checked=true;
        });
        this.$refs.MaskTitle5.forEach((x)=>{
          x.style.display='block'
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[5].pointID=true
        });
      }else if(index==6){
        this.$refs.PointCheck6.forEach((e)=>{
          e.checked=true;
        });
        this.$refs.MaskTitle6.forEach((x)=>{
          x.style.display='block'
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[6].pointID=true
        });
      };
    },
    cancelAll(index){//取消全选
      if(index==0){
        this.$refs.MaskTitle0.forEach((x)=>{
          x.style.display='none'
        });
        this.$refs.PointCheck0.forEach((e)=>{
          e.checked=false;
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[0].pointID=false;
        });
      }else if(index==1){
        this.$refs.MaskTitle1.forEach((x)=>{
          x.style.display='none'
        });
        this.$refs.PointCheck1.forEach((e)=>{
          e.checked=false;
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[1].pointID=false;
        });
      }else if(index==2){
        this.$refs.MaskTitle2.forEach((x)=>{
          x.style.display='none'
        });
        this.$refs.PointCheck2.forEach((e)=>{
          e.checked=false;
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[2].pointID=false;
        });
      }else if(index==3){
        this.$refs.MaskTitle3.forEach((x)=>{
          x.style.display='none'
        });
        this.$refs.PointCheck3.forEach((e)=>{
          e.checked=false;
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[3].pointID=false;
        });
      }else if(index==4){
        this.$refs.MaskTitle4.forEach((x)=>{
          x.style.display='none'
        });
        this.$refs.PointCheck4.forEach((e)=>{
          e.checked=false;
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[4].pointID=false;
        });
      }else if(index==5){
        this.$refs.MaskTitle5.forEach((x)=>{
          x.style.display='none'
        });
        this.$refs.PointCheck5.forEach((e)=>{
          e.checked=false;
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[5].pointID=false;
        });
      }else if(index==6){
        this.$refs.MaskTitle6.forEach((x)=>{
          x.style.display='none'
        });
        this.$refs.PointCheck6.forEach((e)=>{
          e.checked=false;
        });
        this.operTwoList.forEach((a)=>{
          a.chooseMes[6].pointID=false;
        });
      }
    },
    choosePoint(indexOper,index){//选择当前局点
      if(this.planList[index].name==='进场开工'){
        this.operTwoList[indexOper].chooseMes[0].pointID=true;
      }else if(this.planList[index].name==='硬件安装'){
        this.operTwoList[indexOper].chooseMes[1].pointID=true
      }else if(this.planList[index].name==='加电单调'){
        this.operTwoList[indexOper].chooseMes[2].pointID=true
      }else if(this.planList[index].name==='联调割接'){
        this.operTwoList[indexOper].chooseMes[3].pointID=true
      }else if(this.planList[index].name==='培训'){
        this.operTwoList[indexOper].chooseMes[4].pointID=true
      }else if(this.planList[index].name==='完工'){
        this.operTwoList[indexOper].chooseMes[5].pointID=true
      }else if(this.planList[index].name==='验收'){
        this.operTwoList[indexOper].chooseMes[6].pointID=true
      }
      this.$refs.ChosePointParent[indexOper].children[index+4].children[1].style.display='block';
    },
    cancelPoint(indexOper,index){//取消选择局点
      if(this.planList[index].name==='进场开工'){
        this.operTwoList[indexOper].chooseMes[0].pointID=false;
      }else if(this.planList[index].name==='硬件安装'){
        this.operTwoList[indexOper].chooseMes[1].pointID=false
      }else if(this.planList[index].name==='加电单调'){
        this.operTwoList[indexOper].chooseMes[2].pointID=false
      }else if(this.planList[index].name==='联调割接'){
        this.operTwoList[indexOper].chooseMes[3].pointID=false
      }else if(this.planList[index].name==='培训'){
        this.operTwoList[indexOper].chooseMes[4].pointID=false
      }else if(this.planList[index].name==='完工'){
        this.operTwoList[indexOper].chooseMes[5].pointID=false
      }else if(this.planList[index].name==='验收'){
        this.operTwoList[indexOper].chooseMes[6].pointID=false
      }
      this.$refs.ChosePointParent[indexOper].children[index+4].children[1].style.display='none';
      this.$refs.ChosePointParent[indexOper].children[index+4].children[0].checked=false;
    },
    chooseVince(indexOper){//选择省
      this.operTwoList[indexOper].cityName=null;
      this.placeList.forEach((e)=>{
        if(this.operTwoList[indexOper].viceName===e.name){
          this.operTwoList[indexOper].cityList=e.usingChildList
        }
      })
    },
    chooseCity(indexOper){//选择市
      this.operTwoList[indexOper].cityList.forEach((e)=>{
        if(this.operTwoList[indexOper].cityName===e.name){
          this.operTwoList[indexOper].placeID=e.id;
        }
      })
    },
    submitPoint(){//提交局点编辑
      let vc=this;
      let formdata=new FormData();
      formdata.append('operatorId',window.localStorage.getItem('Uid'));
      formdata.append('projectId',vc.proID);
      for(let i in vc.operTwoList){
        if(vc.operTwoList[i].placeID==null||vc.operTwoList[i].address==null||vc.operTwoList[i].address==''){
          vc.$message.error('请补全局点信息')
        }else{
          formdata.append('projectPointDTOList['+i+'].placeId',vc.operTwoList[i].placeID);
          formdata.append('projectPointDTOList['+i+'].address',vc.operTwoList[i].address);
          if(vc.operTwoList[i].remark!=null&&vc.operTwoList[i].remark!=''){
            formdata.append('projectPointDTOList['+i+'].remark',vc.operTwoList[i].remark);
          }
          if(vc.operTwoList[i].projectPointId!=undefined){
            formdata.append('projectPointDTOList['+i+'].projectPointId',vc.operTwoList[i].projectPointId);
          }
          for(let x in vc.operTwoList[i].chooseMes){
            formdata.append('projectPointDTOList['+i+'].projectCourseNodeDTOList['+x+'].courseNodeId',vc.operTwoList[i].chooseMes[x].id);
            formdata.append('projectPointDTOList['+i+'].projectCourseNodeDTOList['+x+'].isUsed',vc.operTwoList[i].chooseMes[x].pointID);
            if(vc.operTwoList[i].chooseMes[x].pointId!=undefined){
              formdata.append('projectPointDTOList['+i+'].projectCourseNodeDTOList['+x+'].projectCourseNodeId',vc.operTwoList[i].chooseMes[x].pointId);
            }
          }
        }
      };
      vc.$axios.post(vc.url+'/saveProjectPoint_n',formdata).then((res)=>{
        if(res.data.code==0){
          vc.$message.success('提交局点成功');
          vc.firstStep(vc.callIndex)
        }else{
          vc.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        vc.$message.error('未知异常,请联系管理员')
      })
    },
    chooseEng(value){//选择派遣工程师
      this.searchEngList.forEach((e)=>{
        if(value==e.label){
          this.gateList.forEach((x)=>{
            if(value==x.searchEngText){
              this.$set(x,'engID',e.id);
            }
          })
        }
      })
    },
    subTurnEng(index){//提交派遣工程师
      let _vm=this;
      if(this.gateList[index].engID==undefined||this.gateList[index].engID==null){
        this.$message.error('请选择工程师')
      }else{
        let formdata=new FormData();
        formdata.append('projectPointId',this.gateList[index].id);
        formdata.append('engineerId',this.gateList[index].engID);
        formdata.append('operatorId',window.localStorage.getItem('Uid'));
        this.$axios.post(this.url+'/savePersonnelRecord_n',formdata).then((res)=>{
          if(res.data.code==0){
            this.$message.success('添加工程师成功');
            _vm.$axios.get(_vm.url+'/projectInfo?projectId='+_vm.proID).then((res)=>{
              if(res.data.code==0){
                console.log(res)
                _vm.gateList=res.data.data.projectPointVOList;
                if(_vm.gateList==null||_vm.gateList.length<0){
                  _vm.hasPoint=true;
                }else{
                  _vm.hasPoint=false;
                  _vm.gateList.forEach((e)=>{
                    _vm.$set(e,'num',_vm.pointNum++);
                    _vm.$set(e,'searchEngText',null);
                    if(e.personnelRecordVOList!=null&&e.personnelRecordVOList.length>4){
                      _vm.$set(e,'isCeed',true);
                    }else{
                      _vm.$set(e,'isCeed',false);
                    }
                  });
                };
              }else{
                _vm.$message.error(res.data.msg)
              }
            }).catch((err)=>{
              _vm.$message.error('未知错误,请联系管理员')
            });
          }else{
            _vm.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.$message.error('未知错误,请联系管理员')
        })
      }

    },
    delTurnEng(index,engIndex){
      let formdata=new FormData();
      let _vm=this;
      formdata.append('id',this.gateList[index].personnelRecordVOList[engIndex].id);
      this.$axios.post(this.url+'/deletePersonnelRecord',formdata).then((res)=>{
        if(res.data.code==0){
          this.$message.success('删除派遣工程师成功');
          _vm.$axios.get(_vm.url+'/projectInfo?projectId='+_vm.proID).then((res)=>{
            if(res.data.code==0){
              _vm.gateList=res.data.data.projectPointVOList;
              if(_vm.gateList==null||_vm.gateList.length<0){
                _vm.hasPoint=true;
              }else{
                _vm.hasPoint=false;
                _vm.gateList.forEach((e)=>{
                  _vm.$set(e,'num',_vm.pointNum++);
                  _vm.$set(e,'searchEngText',null);
                  if(e.personnelRecordVOList!=null&&e.personnelRecordVOList.length>4){
                    _vm.$set(e,'isCeed',true);
                  }else{
                    _vm.$set(e,'isCeed',false);
                  }
                });
              };
            }else{
              _vm.$message.error(res.data.msg)
            }
          }).catch((err)=>{
            _vm.$message.error('未知错误,请联系管理员')
          });
        }else{
          _vm.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$message.error('未知错误,请联系管理员')
      })
    },
    chooseProState(value){//选择项目状态
      this.proStateList.forEach((e)=>{
        if(value==e.name){
          this.proStateMes.state=e.code
        }
      });
    },
    saveProState(){//保存项目状态更改
      let formdata=new FormData();
      if(this.proStateMes.stateText==null&&this.proStateMes.stateText==''){
        this.$message.error('请选择项目状态')
      }else{
        formdata.append('id',this.proID);
        formdata.append('state',this.proStateMes.state);
        if(this.proStateMes.warnTime!=null&&this.proStateMes.warnTime!==''){
          formdata.append('warnTime',this.proStateMes.warnTime);
        };
        if(this.proStateMes.planEndTime!=null&&this.proStateMes.planEndTime!==''){
          formdata.append('planFinishTime',this.proStateMes.planEndTime);
        }
        if(this.proStateMes.planAcceptTime!=null&&this.proStateMes.planAcceptTime!==''){
          formdata.append('planAcceptTime',this.proStateMes.planAcceptTime);
        }
        if(this.proStateMes.startTime!=null&&this.proStateMes.startTime!==''){
          formdata.append('startTime',this.proStateMes.startTime);
        }
        if(this.proStateMes.endTime!=null&&this.proStateMes.endTime!==''){
          formdata.append('finishTime',this.proStateMes.endTime);
        }
        if(this.proStateMes.acceptTime!=null&&this.proStateMes.acceptTime!==''){
          formdata.append('acceptTime',this.proStateMes.acceptTime);
        };
        if(this.proStateMes.proGress!=null&&this.proStateMes.proGress!==''){
          formdata.append('schedule',this.proStateMes.proGress);
        };
        this.$axios.post(this.url+'/saveProjectCourse',formdata).then((res)=>{
          if(res.data.code==0){
            this.$message.success('更新项目信息成功')
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch((err)=>{
          this.$message.error('未知错误,请联系管理员')
        })
      };
    },
    subTurnPoint(index){//保存局点编辑
      let formdata=new FormData();
      for(let i in this.pointList[index].usingProjectCourseNodeVOList){
        formdata.append('projectCourseNodeFormList['+i+'].id',this.pointList[index].usingProjectCourseNodeVOList[i].id)
        if(this.pointList[index].usingProjectCourseNodeVOList[i].planStartTimeStr!=null&&this.pointList[index].usingProjectCourseNodeVOList[i].planStartTimeStr!=''){
          formdata.append('projectCourseNodeFormList['+i+'].planStartTime',this.pointList[index].usingProjectCourseNodeVOList[i].planStartTimeStr)
        };
        if(this.pointList[index].usingProjectCourseNodeVOList[i].planEndTimeStr!=null&&this.pointList[index].usingProjectCourseNodeVOList[i].planEndTimeStr!=''){
          formdata.append('projectCourseNodeFormList['+i+'].planEndTime',this.pointList[index].usingProjectCourseNodeVOList[i].planEndTimeStr)
        };
        if(this.pointList[index].usingProjectCourseNodeVOList[i].startTimeStr!=null&&this.pointList[index].usingProjectCourseNodeVOList[i].startTimeStr!=''){
          formdata.append('projectCourseNodeFormList['+i+'].startTime',this.pointList[index].usingProjectCourseNodeVOList[i].startTimeStr)
        };
        if(this.pointList[index].usingProjectCourseNodeVOList[i].endTimeStr!=null&&this.pointList[index].usingProjectCourseNodeVOList[i].endTimeStr!=''){
          formdata.append('projectCourseNodeFormList['+i+'].endTime',this.pointList[index].usingProjectCourseNodeVOList[i].endTimeStr)
        };
        if(this.pointList[index].usingProjectCourseNodeVOList[i].remark!=null&&this.pointList[index].usingProjectCourseNodeVOList[i].remark!=''){
          formdata.append('projectCourseNodeFormList['+i+'].remark',this.pointList[index].usingProjectCourseNodeVOList[i].remark)
        };
      }
      this.$axios.post(this.url+'/updateProjectCourseNodeList',formdata).then((res)=>{
        if(res.data.code==0){
          this.$message.success('更新局点信息成功');
        }else{
          this.$message.error(res.data.msg)
        }
      }).catch((err)=>{
        this.$message.error('未知错误,请联系管理员')
      })
    },
    upPointFile(e,indexFile,fileUpIn){//项目文档上传
      let a=this.pointFileList[indexFile];
      a.fileList[fileUpIn].fileName=e.target.files[0].name;
      a.fileList[fileUpIn].file=e.target.files[0];
    },
    upFile(indexFile,fileUpIn){//提交文档
      let formdata=new FormData();
      if(this.pointFileList[indexFile].fileList[fileUpIn].file!=null&&this.pointFileList[indexFile].fileList[fileUpIn].file!=''){
        formdata.append('fileType',this.pointFileList[indexFile].fileList[fileUpIn].code);
        formdata.append('file',this.pointFileList[indexFile].fileList[fileUpIn].file);
        formdata.append('projectPointId',this.pointFileList[indexFile].id);
        formdata.append('projectId',this.proID);
        this.$axios.post(this.url+'/saveProjectFile',formdata).then((res)=>{
          if(res.data.code==0){
            if(this.pointFileList[indexFile].projectFileVOList==null){
              this.pointFileList[indexFile].projectFileVOList=[];
            }
            this.pointFileList[indexFile].projectFileVOList.push({
              fileType:res.data.data.fileType,
              fileName:res.data.data.fileName
            })
            this.$message.success('上传成功')
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.$message.error('未知错误,请联系管理员')
        })
      }else{
        this.$message.error('未选择文件')
      };
    },
    upPiontIns(e,key){//验货单局点文件上传
      this.pointInsList[key].fileName=e.target.files[0].name;
      this.pointInsList[key].file=e.target.files[0];
    },
    upInsFile(key){//上传局点文件
      let formdata=new FormData();
      if(this.pointInsList[key].file!=null&&this.pointInsList[key].file!=null){
        formdata.append('projectId',this.proID);
        formdata.append('projectPointId',this.pointInsList[key].id);
        formdata.append('file',this.pointInsList[key].file);
        this.insNum=0;
        this.$axios.post(this.url+'/importInspectionExcel',formdata).then((res)=>{
          if(res.data.code==0){
            this.$message.success('导入成功');
            this.pointInsList[key].inspectionVOList=res.data.data;
            this.pointInsList[key].inspectionVOList.forEach((e)=>{
              this.$set(e,'num',this.insNum++);
            })
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          this.$message.error('未知错误,请联系管理员')
        })
      }else{
        this.$message.error('未选择上传文件')
      }
    },
    subIns(key){//提交验货单
      let vm=this;
      let formdata=new FormData();
      for(let i in vm.pointInsList[key].inspectionVOList){
        if(vm.pointInsList[key].inspectionVOList[i].name==null||vm.pointInsList[key].inspectionVOList[i].name==''){
          vm.$message.error('请输入网元名称');
        }else{
          formdata.append('inspectionFormList['+i+'].name',vm.pointInsList[key].inspectionVOList[i].name);
          formdata.append('inspectionFormList['+i+'].projectPointId',vm.pointInsList[key].id);
          formdata.append('inspectionFormList['+i+'].projectId',vm.proID);
          if(vm.pointInsList[key].inspectionVOList[i].model!=null&&vm.pointInsList[key].inspectionVOList[i].model!=''){
            formdata.append('inspectionFormList['+i+'].model',vm.pointInsList[key].inspectionVOList[i].model);
          };
          if(vm.pointInsList[key].inspectionVOList[i].code!=null&&vm.pointInsList[key].inspectionVOList[i].code!=''){
            formdata.append('inspectionFormList['+i+'].code',vm.pointInsList[key].inspectionVOList[i].code);
          };
          if(vm.pointInsList[key].inspectionVOList[i].province!=null&&vm.pointInsList[key].inspectionVOList[i].province!=''){
            formdata.append('inspectionFormList['+i+'].province',vm.pointInsList[key].inspectionVOList[i].province);
          };
          if(vm.pointInsList[key].inspectionVOList[i].city!=null&&vm.pointInsList[key].inspectionVOList[i].city!=''){
            formdata.append('inspectionFormList['+i+'].city',vm.pointInsList[key].inspectionVOList[i].city);
          };
          if(vm.pointInsList[key].inspectionVOList[i].address!=null&&vm.pointInsList[key].inspectionVOList[i].address!=''){
            formdata.append('inspectionFormList['+i+'].address',vm.pointInsList[key].inspectionVOList[i].address);
          };
          if(vm.pointInsList[key].inspectionVOList[i].hostVersion!=null&&vm.pointInsList[key].inspectionVOList[i].hostVersion!=''){
            formdata.append('inspectionFormList['+i+'].hostVersion',vm.pointInsList[key].inspectionVOList[i].hostVersion);
          };
          if(vm.pointInsList[key].inspectionVOList[i].patchVersion!=null&&vm.pointInsList[key].inspectionVOList[i].patchVersion!=''){
            formdata.append('inspectionFormList['+i+'].patchVersion',vm.pointInsList[key].inspectionVOList[i].patchVersion);
          };
          if(vm.pointInsList[key].inspectionVOList[i].boardName!=null&&vm.pointInsList[key].inspectionVOList[i].boardName!=''){
            formdata.append('inspectionFormList['+i+'].boardName',vm.pointInsList[key].inspectionVOList[i].boardName);
          };
          if(vm.pointInsList[key].inspectionVOList[i].boardModel!=null&&vm.pointInsList[key].inspectionVOList[i].boardModel!=''){
            formdata.append('inspectionFormList['+i+'].boardModel',vm.pointInsList[key].inspectionVOList[i].boardModel);
          };
          if(vm.pointInsList[key].inspectionVOList[i].boardCode!=null&&vm.pointInsList[key].inspectionVOList[i].boardCode!=''){
            formdata.append('inspectionFormList['+i+'].boardCode',vm.pointInsList[key].inspectionVOList[i].boardCode);
          };
          if(vm.pointInsList[key].inspectionVOList[i].boardVersion!=null&&vm.pointInsList[key].inspectionVOList[i].boardVersion!=''){
            formdata.append('inspectionFormList['+i+'].boardVersion',vm.pointInsList[key].inspectionVOList[i].boardVersion);
          };
          if(vm.pointInsList[key].inspectionVOList[i].remark!=null&&vm.pointInsList[key].inspectionVOList[i].remark!=''){
            formdata.append('inspectionFormList['+i+'].remark',vm.pointInsList[key].inspectionVOList[i].remark);
          };
          if(vm.pointInsList[key].inspectionVOList[i].id!=undefined&&vm.pointInsList[key].inspectionVOList[i].id!=null){
            formdata.append('inspectionFormList['+i+'].id',vm.pointInsList[key].inspectionVOList[i].id);
          }
        }
      };
      vm.$axios.post(vm.url+'/saveInspectionList',formdata).then((res)=>{
        if(res.data.code==0){
          vm.$message.success('编辑验货单成功')
          vm.pointInsList[key].inspectionVOList=res.data.data;
          vm.insNum=0;
          this.pointInsList[key].inspectionVOList.forEach((e)=>{
            vm.$set(e,'num',vm.insNum++);
          })
        }else[
          vm.$message.error(res.data.msg)
        ]
      }).catch((err)=>{
        vm.$message.error('未知错误,请联系管理员')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.ceed{
  line-height: 22px!important;
}
input[type=checkbox]:after {
  position: absolute;
  width: 10px;
  height: 15px;
  top: 0;
  content: " ";
  background-color: white;
  color: white;
  display: inline-block;
  visibility: visible;
  padding: 0px 3px;
  border-radius: 3px;
}
input[type=checkbox]:checked:after {
  content: "✓";
  font-size: 14px;
  background-color:#00b034;
}

.crestPro{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .query_search{
    width: 100%;
    height: 230px;
    margin:0 auto;
    border-bottom:1px solid #eee;
    padding-bottom: 20px;
    position: relative;
    transition: .5s all;
    margin-bottom: 20px;
    .add{
      width: 80px;
      height: 20px;
      position: absolute;
      bottom:0;
      left:50%;
      margin-left: -40px;
      cursor:pointer;
      transition: .5s all;
      img{
        width: 100%;
        height: 100%;
        opacity: 1;
      }
    }
    ul{
      width: 1224px;
      margin:0 auto;
      height: 100%;
      box-sizing: border-box;
      padding-top: 30px;
      li{
        display: flex;
        width: 100%;
        margin:0 auto;
        line-height: 60px;
        p{
          width: 30%;
          margin:0 auto;
        }
      }
      li:nth-child(2){
        p{
          // margin-left: 28px;
        }
      }
    }
  }
  .addEng{
    width: 100%;
    border-bottom:1px solid #ccc;
    padding-bottom: 5px;
    height: 42px;
    line-height: 42px;
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
      top:5px;
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
      width:200px;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      padding-left: 30px;
      position: fixed;
      top:10px;
      z-index: 1000;
      span{
        font-size: 20px;
        font-weight: bold;
        color: rgba(235,122,29,1);
        border-bottom:2px solid  rgba(235,122,29,1);
      }
    }
    .mes_titleTwo{
      width: 95%;
      height: 40px;
      display: flex;
      margin:0 auto;
      background: #eb7a1d;
      color:white;
      line-height: 40px;
      li{
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid white;
      }
      li:nth-child(1){
        min-width: 60px;
        width: 10%;
      }
      li:nth-child(2){
        min-width: 130px;
        width: 21%;
      }
      li:nth-child(3){
        min-width: 188px;
        width: 31%;
      }
      li:nth-child(4){
        width: 31%;
        min-width: 188px;
      }
      li:last-child{
        min-width: 60px;
        width: 10%;
      }
      .loadMes{
        min-width: 105px;
        width: 17.5%;
        position: relative;
        padding-left: 18px;
        span{
          display: inline-block;
          width: 20px;
          height: 20px;
          background: red;
          position: absolute;
          left: 10px;
          top:10px;
          display: none;
          opacity: 0;
        }
        input{
          position: absolute;
          left:10%;
          top:32%;
        }
      }
    }
    .operTwo{
      height: 80px;
      li{
        line-height: 80px;
        color:black;
      }
      li:nth-child(2){
        line-height: 40px;
      }
      .loadMes{
        position: relative;
        span{
          display: inline-block;
          width: 20px;
          height: 20px;
          background: red;
          position: absolute;
          left: 10px;
          top:30px;
          display: none;
          opacity: 0;
        }
        input{
          position: absolute;
          left:10%;
          top:40%;
        }
      }
    }
    .operTwo:nth-of-type(even){
      background:#eee;
    }
    .operTwo:nth-of-type(odd){
      background:#e5e4e4;
    }
    .firstPoer{
      width: 100%;
      text-align: center;
      margin-top: 15px;
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
      z-index: 999;
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
      min-height: 45px;
      line-height: 45px;
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
    .file_point{
      width: 95%;
      box-shadow: 0px 0px 5px #666;
      padding-bottom: 30px;
      margin:0 auto;
      margin-top: 10px;
      .file_title{
        box-sizing: border-box;
        padding-left: 10px;
        line-height: 40px;
        font-size: 20px;
        color:#eb7a1d;
        text-decoration: underline;
      }
      .file_place{
        box-sizing: border-box;
        padding-left: 10px;
        font-size: 14px;
        line-height: 30px;
      }
      ul{
        box-sizing: border-box;
        padding-left: 10px;
        border-top:1px solid #eee;
        padding-top: 10px;
        li{
          font-size: 14px;
          position: relative;
          min-height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #eee;
          input{
            width: 730px;
            background: red;
            position: absolute;
            height: 50px;
            left:120px;
            outline: none;
            opacity: 0;
            cursor: pointer;
          }
          span{
            width: 120px;
            text-align: center;
            display: inline-block;
          }
          p{
            width: 100%;
            box-sizing: border-box;
            padding-left: 130px;
          }
        }
      }
    }
    .ins_point{
      width: 95%;
      box-shadow: 0px 0px 5px #666;
      padding-bottom: 30px;
      margin:0 auto;
      margin-top: 10px;
      .file_title{
        box-sizing: border-box;
        padding-left: 10px;
        line-height: 40px;
        font-size: 20px;
        color:#eb7a1d;
        text-decoration: underline;
      }
      .file_place{
        box-sizing: border-box;
        padding-left: 10px;
        font-size: 14px;
        line-height: 30px;
        position: relative;
        .place_mask{
          display: inline-block;
          width: 500px;
          height:40px;
          opacity: 0;
          position: absolute;
          left:80px;
          top:-5px;
        }
        .upBtnPlace{
          width: 100px;
          height: 40px;
          cursor: pointer;
          position: absolute;
          top:-5px;
          left:585px;
          outline: none;
          opacity: 0;
        }
      }
      ul{
        li{
          width: 95%;
          margin:0 auto;
          box-sizing: border-box;
          padding: 10px;
          border:1px solid #eee;
          margin-top:20px;
          .table_title{
            width: 100%;
            text-align: center;
            line-height: 60px;
            position: relative;
            span{
              font-size: 20px;
              box-sizing: border-box;
              position: absolute;
              left:46.5%;
              bottom: -2px;
            }
          }
          .table_mes{
            width: 95%;
            margin:0 auto;
            margin-top: 15px;
            display: flex;
            justify-content: space-around;
            line-height: 40px;
            span{
              width: 120px;
              text-align: center;
              font-size: 13px;
            }
          }
        }
      }
      .table_oper{
        width: 100%;
        text-align: center;
        margin-top: 15px;
      }
    }
  }
  .project_mes{
    width: 300px;
    height: 200px;
    position: fixed;
    background: white;
    overflow: auto;
    top:0;
    left:0;
    z-index: 667;
    transition: .5s all;
    padding-top: 30px;
    padding-bottom:70px;
    box-sizing: border-box;
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
    .mes_titleOne{
      width: 100%;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      padding-left: 30px;
      span{
        font-size: 20px;
        font-weight: bold;
        color: rgba(235,122,29,1);
        border-bottom:2px solid  rgba(235,122,29,1);
      }
    }
    .bigTitle{
      width: 200px;
      position: fixed;
      top:10px;
      z-index: 1000;
    }
    .con_mes{
      width: 100%;
      box-sizing: border-box;
      padding-left: 40px;
      margin-top: 40px;
      li{
        width: 100%;
        text-align: left;
        line-height: 55px;
        min-height: 55px;
        max-height: none;
        font-weight: bold;
        span{
          font-weight:normal;
        }
        .insTitle{
          text-align: center;
          line-height: 40px;
          border:1px solid #eee;
        }
      }
      .flex{
        width: 100%;
        display: flex;
        p:first-child{
          width: 55%;
        }
        p:last-child{
          width: 35%;
        }
      }
    }
    .coll{
      box-sizing: border-box;
      padding-left: 40px;
      .gress_title{
        text-align: center;
        line-height: 40px;
        background: rgba(235,122,29,1);
        color:white;
        font-size: 16px;
      }
      .gress_con{
        font-size: 15px;
        line-height: 50px;
        text-align: center;
      }
      .warnTitle{
        line-height: 40px;
        color:white;
        font-size: 16px;
      }
      .warnCon{
        line-height: 60px;
        font-size: 15px;
      }
    }
  }
  .project_day{
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: auto;
    top:0;
    left:0;
    z-index: 668;
    background: white;
    opacity: 0;
    transition: .5s all;
    box-sizing: border-box;
    padding-top:70px;
    .close_day{
      width: 100%;
      height: 60px;
      line-height: 60px;
      box-sizing: border-box;
      position: fixed;
      top:0;
      border-bottom:1px solid #eee;
      background: white;
      padding-left: 30px;
      text-align: left;
      .day_title{
        font-size: 20px;
        font-weight: bold;
        color: rgba(235,122,29,1);
        position: static;
      }
      .close{
        font-size: 35px;
        color: rgba(235,122,29,1);
        cursor:pointer;
        top: 12px;
        right:30px;
        position: absolute;
      }

    }
    ul{
      width: 100%;
      height: 100%;
      overflow: auto;
      li{
        min-height: 200px;
        width: 97%;
        margin:0 auto;
        box-shadow: 0px 0px 10px #999;
        margin-top: 15px;
        p{
          line-height: 50px;
          box-sizing: border-box;
          padding-left: 15px;
          a{
            display: inline-block;
            width: 80%;
            color:#e86521;
            padding-left: 70px;
          }
          a:first-child{
            padding-left: 0;
          }
          img:first-child{
            margin-left: 70px;
          }
          img{
            margin-left: 15px;
          }
        }
        .engName{
          width: 100%;
          font-weight: bold;
          font-size: 18px;
          color:#e86521;
          span{
            color:black;
          }
        }
        .nodeTime{
          display: flex;
          span:first-child{
            width: 15%;
          }
        }
      }
      li:last-child{
        margin-bottom: 70px;
      }
    }
  }
}
</style>
