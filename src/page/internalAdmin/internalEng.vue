<!-- 内部工程师管理 -->
<template lang="html">
  <div class="internalEng">
    <Search/>
    <div class="engCon">
      <p class="addEng">
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="addEng=true">添加工程师</el-button>
        <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      </p>
      <div class="internalEng_title">
        <el-row>
          <el-col :span="1"><div class="listTitle">序号</div></el-col>
          <el-col :span="2"><div class="listTitle">姓名</div></el-col>
          <el-col :span="2"><div class="listTitle">项目经理</div></el-col>
          <el-col :span="2"><div class="listTitle">联系电话</div></el-col>
          <el-col :span="2"><div class="listTitle">工作年限</div></el-col>
          <el-col :span="3"><div class="listTitle">登录账号</div></el-col>
          <el-col :span="3"><div class="listTitle">邮箱</div></el-col>
          <el-col :span="5"><div class="listTitle">技术能力</div></el-col>
          <el-col :span="1"><div class="listTitle">状态</div></el-col>
          <el-col :span="3"><div class="listTitle">操作</div></el-col>
        </el-row>
      </div>
      <div class="internalEng_con">
        <el-row class="el_con" v-for="(eng,index) in list">
          <el-col :span="1"><div class="listCon">{{eng.num}}</div></el-col>
          <el-col :span="2"><div class="listCon">{{eng.name}}</div></el-col>
          <el-col :span="2"><div class="listCon">{{eng.man}}</div></el-col>
          <el-col :span="2"><div class="listCon">{{eng.phone}}</div></el-col>
          <el-col :span="2"><div class="listCon">{{eng.workyear}}&nbsp;年</div></el-col>
          <el-col :span="3"><div class="listCon">{{eng.mob}}</div></el-col>
          <el-col :span="3"><div class="listCon">{{eng.email}}</div></el-col>
          <el-col :span="5"><div class="listCon">{{eng.work}}</div></el-col>
          <el-col :span="1"><div class="listCon">
            <span v-if="eng.state==1" style="background:green;color:white;border-radius:18px;padding:5px;font-size:12px;">已启用</span>
            <span v-else style="background:#666;color:white;border-radius:18px;padding:5px;font-size:12px;">已停用</span>
          </div></el-col>
          <el-col :span="3"><div class="listCon icon">
            <el-tooltip class="item" effect="dark" content="停用" placement="bottom">
              <i class="el-icon-remove-outline" style="color:#666;" v-show="eng.state==1"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="启用" placement="bottom">
              <i class="el-icon-circle-check-outline" style="color:balck;" v-show="eng.state==2"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑工程师" placement="bottom">
              <i class="el-icon-edit" style="color:#eb7a1d;"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看工程师" placement="bottom">
              <i class="el-icon-view" style="color:#eb7a1d;"></i>
            </el-tooltip>
          </div></el-col>
        </el-row>
      </div>
      <!-- 新增工程师 弹框-->
      <div class="">
        <el-dialog
          title="新增工程师"
          :visible.sync="addEng"
          width="40%">
          <div class="addEngBox">
            <ul class="add_title">
              <li>姓名:</li>
              <li>手机号码:</li>
              <li>电子邮箱:</li>
              <li>工作年限:</li>
              <li>登录名:</li>
              <li>是否为项目经理:</li>
              <li>接单区域:</li>
              <li>技术领域及能力:</li>
              <li style="margin-top:550px;">身份认证文件:</li>
              <li style="margin-top:70px;">资质证明文件:</li>
            </ul>

            <ul class="add_con">
              <li><el-input v-model="addEngMes.name" placeholder="请输入工程师姓名"/></li>
              <li><el-input v-model="addEngMes.phone" placeholder="请输入手机号码"/></li>
              <li><el-input v-model="addEngMes.email" placeholder="请输入电子邮箱"/></li>
              <li><el-input v-model="addEngMes.workyear" placeholder="请输入工作年限"/></li>
              <li><el-input v-model="addEngMes.logname" placeholder="请输入登录名"/></li>
              <li>
                <el-radio v-model="isMan" label="1">是</el-radio>
                <el-radio v-model="isMan" label="2">否</el-radio>
              </li>
              <li style="display:flex;">
                <Place @getPlace="placeID"/>
              </li>
              <li>
                <p>UCC
                  <el-checkbox-group v-model="checkboxGroup1">
                    <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                  </el-checkbox-group>
                </p>
                <p>数通
                  <el-checkbox-group v-model="checkboxGroup1">
                    <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                  </el-checkbox-group>
                </p>
                <p>IT
                  <el-checkbox-group v-model="checkboxGroup1">
                    <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                  </el-checkbox-group>
                </p>
                <p>能基
                  <el-checkbox-group v-model="checkboxGroup1">
                    <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                  </el-checkbox-group>
                </p>
                <p>VC
                  <el-checkbox-group v-model="checkboxGroup1">
                    <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                  </el-checkbox-group>
                </p>
                <p>光伏
                  <el-checkbox-group v-model="checkboxGroup1">
                    <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                  </el-checkbox-group>
                </p>
              </li>
              <li class="upCard">
                <viewer :images="cardList">
                  <img v-for="(card,index) in cardList" :key="'Card'+index" :src="card" alt=""/>
                </viewer>
                <span>
                  <input type="file" accept="image/*" name="" value="">
                </span>
              </li>
              <li class="upSkills">
                <viewer :images="cardList">
                  <img v-for="(card,index) in cardList" :key="'Card'+index" :src="card" alt=""/>
                </viewer>
                <span>
                  <input type="file" accept="image/*" name="" value="">
                </span>
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addEng = false">取 消</el-button>
            <el-button type="primary" @click="addEng = false">确 定</el-button>
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
  </div>
</template>

<script>
import Search from '@/components/search'
import Place from '@/components/placeChose'
export default {
  data(){
    return{
      dataLength:81,//数据总和
      list:[
        {
          num:1,
          name:'李荣浩',
          man:'郑总',
          phone:13240891337,
          workyear:3,
          mob:'李荣浩',
          email:'tonightCta@gmail.com',
          work:'数通：初级工程师',
          state:1
        },
        {
          num:2,
          name:'张国荣',
          man:'浩总',
          phone:13240891338,
          workyear:15,
          mob:'张国荣',
          email:'c13240891337@gmail.com',
          work:'能基：中级工程师',
          state:2
        },
      ],
      currentPage3:1,
      page:0,//页码
      pageNum:10,//总页数
      addEng:false,
      addEngMes:{
        name:null,//工程师姓名
        phone:null,//手机号
        email:null,//邮箱
        workyear:null,//工作年限
        logname:null,//登录名
        isman:false,
        proList:[],//省级列表
        cityList:[],//市级列表
      },
      isMan:1,//是否为项目经理
      cityID:null,//城市ID
      cities:['初级工程师','中级工程师','高级工程师'],
      checkboxGroup1:null,
      cardList:['../../../static/img/tab_logo_home_nor.png'],//身份证列表
    }
  },
  components:{
    Search,
    Place
  },
  methods:{
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page=val-1;
    },
    placeID(vc){
      this.cityID=vc;
      console.log(this.cityID)
    }
  }
}
</script>

<style lang="scss" scoped>
.internalEng{
  width: 100%;
  height: 100%;
  .engCon{
    width: 98%;
    margin:0 auto;
    .addEng{
      width: 100%;
      border-bottom:1px solid #ccc;
      padding-bottom: 5px;
      .dataLength{
        display: inline-block;
        width: 90%;
        text-align: right;
      }
    }
    .internalEng_title{
      width: 100%;
      margin-top: 2px;
      .listTitle{
        text-align: center;
        line-height: 40px;
        background: #eb7a1d;
        color:white;
        font-size: 16px;
      }
    }
    .internalEng_con{
      width: 100%;
      min-height: 500px;
      .listCon{
        line-height: 50px;
        text-align: center;
        font-size: 14px;
      }
      .icon{
        font-size: 23px;
        cursor:pointer;
        i:nth-child(3){
          margin-left: 13px;
          margin-right: 13px;
        }
      }
    }
    .el_con:nth-of-type(even){
      background:#eee;
    }
    .addEngBox{
      width: 100%;
      display: flex;
      max-height: 500px;
      overflow: auto;
      .add_title{
        width: 20%;
        text-align: right;
        line-height: 50px;
      }
      .add_con{
        width: 60%;
        line-height: 50px;
        padding-left: 30px;
        .upCard{
          min-height: 120px;
          display: flex;
          img{
            width: 50%;
            height: 100px;
            cursor:pointer;
          }
          span{
            display: inline-block;
            width: 50%;
            height: 100px;
            position: relative;
            background: url('../../../static/img/card_bg.png');
            background-size: 100% 100%;
            border-radius:8px;
            input{
              width: 100%;
              height: 100%;
              position: absolute;
              top:0;
              left:0;
              opacity: 0;
              cursor:pointer;
            }
          }
        }
        .upSkills{
          min-height: 120px;
          display: flex;
          img{
            width: 50%;
            height: 100px;
            cursor:pointer;
          }
          span{
            display: inline-block;
            width: 50%;
            height: 100px;
            position: relative;
            background: url('../../../static/img/skill_bg.png');
            background-size: 100% 100%;
            border-radius:8px;
            input{
              width: 100%;
              height: 100%;
              position: absolute;
              top:0;
              left:0;
              opacity: 0;
              cursor:pointer;
            }
          }
        }
      }
    }
    // .addEngBox::-webkit-scrollbar {display:none}
    .order_page{
      width: 98%;
      text-align: right;
    }
  }
}
</style>
