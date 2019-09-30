<!-- 案例管理 -->
<template lang="html">
  <div class="news_admin">
    <p class="news_title">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="pushNews()">添加案例</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-radio v-model="radio" label="1">全部</el-radio>
      <el-radio v-model="radio" label="2">解决方案</el-radio>
      <el-radio v-model="radio" label="3">成功案例</el-radio>
      <span class="dataLength">共有数据:&nbsp;<span style="color:#eb7a1d;font-weight:bold;">{{dataLength}}</span>&nbsp;条</span>
      <el-tooltip  class="item" effect="dark" content="刷新数据" placement="bottom">
        <i class="el-icon-refresh"></i>
      </el-tooltip>
    </p>
    <div class="" style="minHeight:550px;marginTop:5px;">
      <el-row>
        <el-col :span="1"><div class="news_titleSec">序号</div></el-col>
        <el-col :span="2"><div class="news_titleSec">案例类别</div></el-col>
        <el-col :span="2"><div class="news_titleSec">类型</div></el-col>
        <el-col :span="2"><div class="news_titleSec">行业</div></el-col>
        <el-col :span="3"><div class="news_titleSec">标题</div></el-col>
        <el-col :span="7"><div class="news_titleSec">简介</div></el-col>
        <el-col :span="3"><div class="news_titleSec">题图</div></el-col>
        <el-col :span="2"><div class="news_titleSec">浏览</div></el-col>
        <el-col :span="2"><div class="news_titleSec">操作</div></el-col>
      </el-row>
      <el-row class="el_con" v-for="(news,index) in newsList" :key="'News'+index">
        <el-col :span="1"><div class="news_con">{{news.num+1}}</div></el-col>
        <el-col :span="2"><div class="news_con">行业资讯</div></el-col>
        <el-col :span="2"><div class="news_con">{{news.type}}</div></el-col>
        <el-col :span="2"><div class="news_con">{{news.company}}</div></el-col>
        <el-col :span="3"><div class="news_con">{{news.title.substring(0,9)}}...</div></el-col>
        <el-tooltip  class="item" effect="dark" :content="news.remark" placement="bottom">
          <el-col :span="7"><div class="news_con remark">
            {{news.remark.substring(0,22)}}...
          </div></el-col>
        </el-tooltip>
        <el-col :span="3"><div class="news_con thum">
          <img src="../../../static/img/card_bg.png" alt="">
        </div></el-col>
        <el-col :span="2"><div class="news_con">
          <el-tooltip  class="item" effect="dark" content="查看案例" placement="bottom">
            <i class="el-icon-search" style="color:#eb7a1d;"></i>
          </el-tooltip>
        </div></el-col>
        <el-col :span="2"><div class="news_con">
          <el-tooltip  class="item" effect="dark" content="编辑案例" placement="bottom">
            <i class="el-icon-edit" style="color:#eb7a1d;"></i>
          </el-tooltip>
          <span style="width:5px;display:inline-block;"></span>
          <el-tooltip  class="item" effect="dark" content="删除案例" placement="bottom">
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
    <!-- 添加新闻 -->
    <div class="addNews" ref="addNews" v-show="addNews">
      <p class="mes_close"><i class="el-icon-close" @click="closeAddNews()"></i></p>
      <p class="mes_titleOne">
        <span>添加案例</span>
      </p>
      <div class="news_mes">
        <p class="news_mes_title"><span style="color:red;">*</span>类型:</p>
        <p class="news_mes_sec">
          <el-radio v-model="radio" label="1">解决方案</el-radio>
          <el-radio v-model="radio" label="2">成功案例</el-radio>
        </p>
      </div>
      <div class="news_mes">
        <p class="news_mes_title"><span style="color:red;">*</span>标题:</p>
        <p class="news_mes_sec">
          <el-select v-model="value" placeholder="请选择" style="width:400px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </p>
      </div>
      <div class="news_mes">
        <p class="news_mes_title"><span style="color:red;">*</span>标题:</p>
        <p class="news_mes_sec">
          <el-select v-model="value" placeholder="请选择" style="width:400px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
      </div>
      <div class="news_mes">
        <p class="news_mes_title"><span style="color:red;">*</span>标题:</p>
        <p class="news_mes_sec">
          <el-input type="primary" size="medium" placeholder="请输入标题"></el-input>
        </p>
      </div>
      <div class="news_mes">
        <p class="news_mes_title"><span style="color:red;">*</span>简介:</p>
        <p class="news_mes_sec">
          <el-input type="textarea" size="medium" placeholder="请输入简介" :rows="6"></el-input>
        </p>
      </div>
      <div class="news_mes" style="marginTop:15px;">
        <p class="news_mes_title"><span style="color:red;">*</span>内容:</p>
        <p class="news_mes_sec" ref="news_mes_sec">

        </p>
      </div>
      <div class="news_mes">
        <p class="news_mes_title"><span style="color:red;">*</span>题图:</p>
        <p class="news_mes_sec upFile">
          <el-input type="primary" size="medium" placeholder="请选择题图文件" style="width:80%;"></el-input>
          <el-button type="primary" icon="el-icon-upload" size="medium">浏览文件</el-button>
          <input type="file" accept="image/*" name="" value="">
        </p>
      </div>
      <p style="color:red; textAlign:right;width:53%;lineHeight:50px;">题图：jpg格式；图片尺寸：800x400或等比例。</p>
      <div class="news_mes">
        <p class="news_mes_title">题图预览:</p>
        <p class="news_mes_sec">
          <img src="../../../static/img/card_bg.png" alt="">
        </p>
      </div>
      <p style="width:100%;textAlign:center;">
        <el-button type="primary" size="medium" @click="submitNews()">提交</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data(){
    return{
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
      //临时数据
      radio:'1',//数据类型
      currentPage3:1,//分页器类型
      page:0,//页码
      pageNum:10,//总页数
      dataLength:88,//数据总和
      newsList:[
        {
          num:0,
          title:'中国石化销售有限公司 区内呼叫中心项目',
          type:'UC & C',
          company:'大企业',
          remark:'新系统能够实现全网呼叫统一分配、资源共享、负载均衡，“一点接入、全网服务”。',
        },
        {
          num:1,
          title:'某监狱管理局服刑人员教育改造云平台建设',
          type:'IT及云计算',
          company:'政府',
          remark:' 提升生产系统的可用性成为必然趋势。推荐客户使用华为FusionCloud桌面云解决方案，帮助用户解决生产系统的软硬件可靠性问题。'
        }
      ],
      addNews:false,//添加新闻
      editor: null,//富文本功能
      editorContent: '',//富文本内容
    }
  },
  mounted(){
    this.editor = new E(this.$refs.news_mes_sec);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ];
    this.editor.create(); // 创建富文本实例
  },
  methods:{
    handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {

    },
    pushNews(){//添加新闻
      this.addNews=true;
      setTimeout(()=>{
        this.$refs.addNews.style.width="100%";
        this.$refs.addNews.style.height="100%";
      });
    },
    closeAddNews(){//关闭添加新闻
      this.$refs.addNews.style.width="300px";
      this.$refs.addNews.style.height="200px";
      setTimeout(()=>{
        this.addNews=false;
      },400);
    },
    submitNews(){//提交新闻
      // console.log(this.editorContent)
    },
  }
}
</script>

<style lang="scss" scoped>
.news_admin{
  width: 98%;
  margin:0 auto;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  .news_title{
    width: 100%;
    border-bottom:1px solid #eee;
    padding-bottom: 5px;
    margin-top: 20px;
    position: relative;
    .dataLength{
      position: absolute;
      line-height: 40px;
      right:60px;
    }
    i{
      font-size: 30px;
      color:#eb7a1d;
      cursor:pointer;
      position: absolute;
      right: 20px;
      top:5px;
    }
  }
  .news_titleSec{
    line-height: 40px;
    text-align: center;
    color:white;
    background: #eb7a1d;
  }
  .news_con{
    line-height: 70px;
    font-size: 14px;
    text-align: center;
    i{
      font-size: 18px;
      cursor: pointer;
    }
  }
  .thum{
    height: 70px;
    box-sizing: border-box;
    padding-top: 5px;
    img{
      width: 90%;
      height: 60px;
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
  //添加新闻
  .addNews{
    width: 300px;
    height: 200px;
    position: fixed;
    background: white;
    top:0;
    left:0;
    transition: .5s all;
    box-sizing: border-box;
    padding-top:60px;
    overflow-y: auto;
    padding-bottom: 30px;
    z-index: 1;
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
    .news_mes{
      width: 70%;
      margin:0 auto;
      display: flex;
      line-height: 60px;
      .news_mes_title{
        width: 20%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 20px;
      }
      .news_mes_sec{
        width: 80%;
        img{
          border:1px solid #eb7a1d;
          width: 200px;
          border-radius:8px;
        }
      }
      .upFile{
        position: relative;
        input{
          position: absolute;
          width: 100%;
          opacity: 0;
          height: 80%;
          top:10%;
          left:0;
        }
      }
    }
  }
}
</style>
