<template lang="html">
  <div class="mine_mes">
    <div class="mine_box">
      <div class="mine_con">
        <ul class="con_title">
          <li>姓名&nbsp;:</li>
          <li>邮箱&nbsp;:</li>
          <li>联系方式&nbsp;:</li>
          <li>工作年限&nbsp;:</li>
          <li>工作区域&nbsp;:</li>
          <li>身份认证&nbsp;:</li>
          <li>技能评估&nbsp;:</li>
          <li>已认证技能&nbsp;:</li>
        </ul>
        <ul class="con_mes">
          <li>{{userMes.nickname}}</li>
          <li>
            <span v-if="userMes.email!=null" style="display:inline-block;minWidth:50%;">{{userMes.email}}</span>
            <span class="must" v-else>-</span>
            <i class="el-icon-edit" @click="editEmail=true"></i>
          </li>
          <li>
            <span v-if="userMes.mobile!=null">{{userMes.mobile}}</span>
            <span v-else>-</span>
          </li>
          <li>{{userMes.engineerVO.workYear}}年</li>
          <li>
            <el-tooltip class="item" effect="dark" :content="choseTurn" placement="bottom" v-if="choseTurn!=null">
              <span style="display:inline-block;minWidth:50%;">{{choseTurn.substring(0,20)}}...</span>
            </el-tooltip>
            <span class="must" v-else>-</span>
            <i class="el-icon-edit" @click="editPlaceC()"></i>
          </li>
          <li>
            <span v-if="hasIdent">{{userMes.name}}</span>
            <span v-else>未认证</span>
          </li>
          <li>
            <span v-if="ment">已评估</span>
            <span v-else>未评估</span>
          </li>
          <li>
            <span v-if="hasCation">已认证</span>
            <span v-else>未认证</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 修改邮箱 -->
    <div class="">
      <el-dialog
        title="邮箱修改"
        :visible.sync="editEmail"
        width="30%">
        <p style="width:100%;text-align:center;"><span style="color:red">*</span>新邮箱&nbsp;:&nbsp;<el-input type="primary" :placeholder="userMes.email" v-model="newEmail" style="width:300px;"></el-input></p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editEmail = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="subNewEmail()" size="medium">提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 修改地址 -->
    <div class="">
      <el-dialog
        title="邮箱修改"
        :visible.sync="editPlace"
        width="30%">
        <p style="width:100%;text-align:center;">
          <choosePlace ref="PlaceEdit"  :editId="editId" :plStr='plStr'  @getPlace="placeID"/>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editPlace = false" size="medium">取&nbsp;消</el-button>
          <el-button type="primary" @click="subNewPlace()" size="medium">提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import choosePlace from '@/components/placeEdit'
export default {
  data(){
    return{
      userMes:{},//用户个人信息
      choseTurn:null,//工作地点
      showPl:[],//工作地点集合
      ment:false,//是否已技能认证
      hasIdent:false,//是否已身份认证
      hasCation:false,//是否已认证
      Ident:'派大星',
      editEmail:false,//修改邮箱
      newEmail:null,//新邮箱
      editPlace:false,//修改地址
      editId:null,
      plStr:null,
      newPlaceList:[],//修改工作区域集合
    }
  },
  created(){
    this.userMes=JSON.parse(window.sessionStorage.getItem('adminMes'));
    if(this.userMes.engineerVO){
      this.editId=this.userMes.engineerVO.id;
      if(this.userMes.engineerVO.childPlaces.length>0){
        for (let a in this.userMes.engineerVO.childPlaces){
          this.showPl.push(this.userMes.engineerVO.childPlaces[a].parentPlace.name+'-'+this.userMes.engineerVO.childPlaces[a].name);
        }
        this.choseTurn=this.showPl.join('/');
      };
      this.plStr=this.showPl;
      if(this.userMes.engineerVO.identifyState==3){
        this.ment=true
      };
      if(this.userMes.engineerVO.levels.length!=0){
        this.hasIdent=true
      };
      if(this.userMes.engineerVO.state==1||this.userMes.engineerVO.state==2){
        this.hasCation=true
      };
    }
  },
  components:{choosePlace},
  methods:{
    placeID(vc){//选择地区
      // console.log(vc)
      this.newPlaceList=vc;
    },
    editPlaceC(){//选择工作区域
      this.editPlace=true;
      setTimeout(()=>{
        this.$refs.PlaceEdit.editEng();
      },200)
    },
    subNewEmail(){//上传新邮箱地址
      let _vm=this;
      let formdata=new FormData();
      if(!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(_vm.newEmail))){
        _vm.$message.error('请输入正确的邮箱格式')
      }else{
        formdata.append('id',_vm.userMes.engineerVO.id)
        formdata.append('email',_vm.newEmail);
        _vm.$axios.post(_vm.url+'/mobile/editEngineer',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.editEmail=false;
            _vm.userMes.email=res.data.data.email;
            _vm.newEmail=null;
            _vm.$message.success('编辑邮箱成功')
          }else{
            _vm.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          _vm.$message.error('未知错误,请联系管理员')
        })
      }
    },
    subNewPlace(){//上传修改地址信息
      let _vm=this;
      let formdata=new FormData();
      if(_vm.newPlaceList.length<1){
        _vm.$message.warning('位置信息未发生改变,请选择后再试')
      }else{
        _vm.showPl=[];
        formdata.append('id',_vm.userMes.engineerVO.id);
        for(let i in _vm.newPlaceList){
          formdata.append('placeIds',_vm.newPlaceList[i]);
        };
        _vm.$axios.post(_vm.url+'/mobile/editEngineer',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.choseTurn=null;
            setTimeout(()=>{
              for (let a in res.data.data.engineerVO.childPlaces){
                _vm.showPl.push(res.data.data.engineerVO.childPlaces[a].parentPlace.name+'-'+res.data.data.engineerVO.childPlaces[a].name);
              }
              _vm.choseTurn=_vm.showPl.join('/');
            })
            _vm.editPlace=false;
            _vm.$message.success('更新地址信息成功');
            window.sessionStorage.setItem('adminMes',JSON.stringify(res.data.data));
            _vm.userMes=JSON.parse(window.sessionStorage.getItem('adminMes'));
          }else{
            _vm.$message.error(res.data.msg)
          }
        }).catch((err)=>{
          _vm.$message.error('未知错误,请联系管理员');
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.mine_mes{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
  padding-top: 50px;
  .mine_box{
    width: 60%;
    box-shadow: 0px 0px 10px #666;
    margin:0 auto;
    padding-bottom: 30px;
    padding-top: 30px;
  }
  .mine_con{
    width: 80%;
    margin:0 auto;
    display: flex;
    ul{
      li{
        line-height: 60px;
      }
    }
    .con_title{
      width: 30%;
      text-align: right;
      box-sizing: border-box;
      padding-right:20px;
    }
    .con_mes{
      width: 70%;
      .must{
        display: inline-block;
        width: 50%;
      }
      i{
        color:#eb7a1d;
        font-size: 22px;
        cursor:pointer;
      }
    }
  }
}
</style>
