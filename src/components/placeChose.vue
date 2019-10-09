<!-- 地点选择 -->
<template lang="html">
  <div class="placeCom">
    <p class="place_inp">
      <el-input v-model="placeStr" placeholder="请选择工作区域"></el-input>
      <span @click="showChooseLoca()"></span>
    </p>
    <!-- 地址选择盒子 -->
      <el-dialog
        title="工作区域选择"
        :visible.sync="placeBox"
        width="40%"
        append-to-body
        >
        <div class="plBox" ref="locaBox" v-if="abbs">
          <!-- <input type="text" name="" value="" v-model="choseTurn"> -->
          <input type="text" name="" value="" v-model="choseText">
          <span class="text_mask"></span>
          <div class="localist">
            <ul class="loca_vince">
              <li v-for="(item,index) in cityList"
              @click="choseInV(index)"
              ref="InV"
              >
              {{item.name}}</li>
            </ul>
            <ul class="loca_city">
              <li ref="allchose">
                <p @click="allChose()">全选</p>
                <span class="cityMask" ref="allicon" @click="cancelAll()">
                  <i class="el-icon-check"></i>
                </span>
              </li>
              <li v-for="(itemlea,index) in delArr"
              ref="city"
              >
              <p @click="choseCity(index)" >{{itemlea.name}}</p>
              <span class="cityMask" @click="delCity(index)">
                <i class="el-icon-check"></i>
              </span>
            </li>
          </ul>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelChose()">取 消</el-button>
          <el-button type="primary" @click="turnChose()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      placeProName:null,//省级名称
      placeCityName:null,//市级名称
      placeList:[],//省级列表
      cityList:[],//城市列表
      placeStr:null,//城市回显
      placeBox:false,//地址选择盒子
      placeArr:[],
      delArr:[],
      showloca:false,
      choseText:'-',
      choseTurn:'-',
      choseVal:null,//当前选择的省份
      isAll:[],//是否全选
      cityID:[],//城市ID
      proID:0,//省份ID
      showPl:[],//回显地址
      cityList:[],
      a:[],//数据暂存数组
      b:[],//数据暂存数组
      abbs:true,
    }
  },
  mounted(){
    this.getLocation()
  },
  methods:{
    getLocation(){//获取服务地址
      let _vm=this;
      _vm.$axios.get(_vm.url+'/mobile/getUsingPlaceList').then((res)=>{
        if(res.data.code==0){
          _vm.cityList=res.data.data.placeList;
          _vm.delArr=_vm.cityList[0].usingChildList;
          _vm.choseVal=_vm.cityList[0].name;
          let b=[];//存放是全选状态
          _vm.delArr.forEach((c)=>{
            _vm.a.push(c.id);
            b.push(c.selected)
          });
          if(b.indexOf(false)>=0){
            // console.log(1)
          }else{
            _vm.isAll.push(_vm.choseVal);
            _vm.isAll.forEach((x)=>{
              if(_vm.choseVal===x){
                _vm.$refs.allchose.style.color='#eb7a1d';
                _vm.$refs.allicon.style.display='block';
              }else{
                _vm.$refs.allchose.style.color='black';
                _vm.$refs.allicon.style.display='none';
              }
            });
          }
          _vm.cityList.forEach((cityL)=>{
            cityL.usingChildList.forEach((x)=>{
              if(x.selected){
                _vm.cityID.push(x.id);
              }
            })
          });
          _vm.b.push(_vm.cityList[0].usingChildList[0].id)
          setTimeout(()=>{
            _vm.cityID.forEach((s)=>{
              let c=_vm.b.indexOf(s);
              if(c>=0){
                _vm.$refs.city[c].style.color='#eb7a1d';
                _vm.$refs.city[c].children[1].style.display='block';
              }else{
                return
              }
            })
          })
        }else{
          _vm.$Toast(res.data.msg)
        }
      }).catch((err)=>{
        _vm.$Toast('未知错误')
        // console.log(err)
      })
    },
    showChooseLoca(){//工作区域选择
      this.placeBox=true;
      this.abbs=true;
    },
    cancelChose(){//取消选择
      this.placeArr=[];
      this.placeBox=false;
      this.choseText='-';
      this.choseTurn='-';
      this.choseVal=null;//当前选择的省份
      this.isAll=[];//是否全选
      this.cityID=[];//城市ID
      this.proID=0;//省份ID
      this.showPl=[];//回显地址
      this.a=[];//数据暂存数组
      this.b=[];//数据暂存数组2
      this.abbs=false;
      this.getLocation()
    },
    choseInV(index){//选择省份
      let _vm=this;
      _vm.a=[]//暂存数据
      _vm.$refs.allchose.style.color='black';
      _vm.$refs.allicon.style.display='none';
      _vm.proID=index;
      for(let i in _vm.$refs.InV){
        _vm.$refs.InV[index].style.color='#eb7a1d'
        _vm.$refs.InV[i].style.color='black';
      };
      _vm.delArr=_vm.cityList[index].usingChildList;
      let b=[];//存放是全选状态
      _vm.delArr.forEach((c)=>{
        _vm.a.push(c.id);
        b.push(c.selected)
      });
      if(b.indexOf(false)>=0){
        // console.log(1)
      }else{
        _vm.isAll.push(_vm.choseVal);
        _vm.isAll.forEach((x)=>{
          if(_vm.choseVal===x){
            _vm.$refs.allchose.style.color='#eb7a1d';
            _vm.$refs.allicon.style.display='block';
          }else{
            _vm.$refs.allchose.style.color='black';
            _vm.$refs.allicon.style.display='none';
          }
        });
      }
      setTimeout(()=>{
        _vm.cityID.forEach((v)=>{
          let b=_vm.a.indexOf(v);
          if(b>=0){
            _vm.$refs.city[b].style.color='#eb7a1d';
            _vm.$refs.city[b].children[1].style.display='block';
          }else{
            return
          }
        })
      })
      _vm.choseVal=_vm.cityList[index].name;
      _vm.$refs.city.forEach((e)=>{
        e.style.color='black';
        e.children[1].style.display='none'
      })
      setTimeout(()=>{
        _vm.placeArr.forEach((e)=>{
          let indexV=[];
          let a=[];
          _vm.delArr.forEach((i)=>{
            a.push(i.name);
            if(a.indexOf(_vm.getCaption(e))!=-1){
              _vm.$refs.city[a.indexOf(_vm.getCaption(e))].children[1].style.display='block'
              _vm.$refs.city[a.indexOf(_vm.getCaption(e))].style.color='#eb7a1d'
            }
          })
        });
      });
    },
    getCaption(obj){
        var index=obj.lastIndexOf("\-");
        obj=obj.substring(index+1,obj.length);
        return obj;
    },
    choseCity(index){//选择城市
      let _vm=this;
      _vm.placeArr.push(_vm.choseVal+'-'+_vm.delArr[index].name);
      setTimeout(()=>{
        _vm.cityID.push(_vm.cityList[_vm.proID].usingChildList[index].id);
      });
      _vm.showPl.push(_vm.choseVal+'-'+_vm.delArr[index].name);
      _vm.choseText=_vm.placeArr.join('/');
      _vm.choseTurn=_vm.showPl.join('/');
      _vm.$refs.city[index].style.color='#eb7a1d';
      _vm.$refs.city[index].children[1].style.display='block';
    },
    delCity(index){//删除当前选中
      let _vm=this;
      let indexT=_vm.placeArr.indexOf(_vm.choseVal+'-'+_vm.delArr[index].name);
      _vm.placeArr.splice(indexT,1);
      let indexE=_vm.showPl.indexOf(_vm.choseVal+'-'+_vm.delArr[index].name);
      if(indexE>=0){
        _vm.showPl.splice(indexE,1);
        _vm.choseTurn=_vm.showPl.join('/');
      }
      let indexID=_vm.cityID.indexOf(_vm.cityList[_vm.proID].usingChildList[index].id);
      _vm.cityID.splice(indexID,1);
      _vm.choseText=_vm.placeArr.join('/');
      _vm.$refs.city[index].children[1].style.display='none';
      _vm.$refs.city[index].style.color='black';
    },
    allChose(){//全选
      this.$refs.allchose.style.color='#eb7a1d';
      this.$refs.allicon.style.display='block';
      this.$refs.city.forEach((e)=>{
        e.style.color='#eb7a1d';
        e.children[1].style.display='block';
      });
      this.delArr.forEach((y)=>{
        let indexD=this.placeArr.indexOf(this.choseVal+'-'+y.name);
        this.placeArr.splice(indexD,1);
        setTimeout(()=>{
          this.placeArr.push(this.choseVal+'-'+y.name);
          this.showPl.push(this.choseVal+'-'+y.name)
          this.choseText=this.placeArr.join('/');
          this.choseTurn=this.showPl.join('/');
        })
      });
      this.delArr.forEach((i)=>{
        this.cityID.push(i.id);
      })
      this.isAll.push(this.choseVal);
    },
    cancelAll(){//取消全选
      let _vm=this;
      _vm.$refs.allchose.style.color='black';
      _vm.$refs.allicon.style.display='none';
      for(let l in this.isAll){
        let indexI=this.isAll.indexOf(this.choseVal);
        this.isAll.splice(indexI,1);
      }
      _vm.$refs.city.forEach((i)=>{
        i.style.color='black';
        i.children[1].style.display='none';
      });
      _vm.delArr.forEach((r)=>{
        let indexT=_vm.placeArr.indexOf(_vm.choseVal+'-'+r.name)
        let indexPc=_vm.showPl.indexOf(_vm.choseVal+'-'+r.name);
        _vm.placeArr.splice(indexT,1)
        _vm.showPl.splice(indexPc,1)
        this.choseText=this.placeArr.join('/');
        this.choseTurn=this.showPl.join('/');
      });
      let arr=[];
      _vm.delArr.forEach((c)=>{
        arr.push(c.id)
      });
      arr.forEach((x)=>{
        let indexDel=_vm.cityID.indexOf(x);
        _vm.cityID.splice(indexDel,1);
      });
    },
    turnChose(){//确认选中
      let vm=this;
      if(vm.cityID.length<0){
        vm.$message.error('请选择工作区域')
      }else{
        vm.$emit('getPlace',vm.cityID);
        vm.placeStr=vm.choseText;
        // console.log(vm.placeStr)
        setTimeout(()=>{
          vm.placeBox=false;
        })
      }
    },
    //禁止页面滑动
    stop(){
      document.body.addEventListener('touchmove', function (e) {
        e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
      }, {passive: false})
    },
    //取消禁止页面滑动
    move(){
      document.body.addEventListener('touchmove', function (e) {
          e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
      }, {passive: true})
    }
  }
}
</script>

<style lang="scss" scoped>
.placeCom{
  width: 100%;
  height: 40px;
  margin-bottom: 12px;
  .place_inp{
    width: 100%;
    height: 40px;
    position: relative;
    span{
      display: inline-block;
      width: 100%;
      height: 100%;
      background: red;
      position: absolute;
      top:5px;
      left:0;
      opacity: 0;
      cursor:pointer;
    }
  }
}

.plBox{
  width: 100%;
  height: 400px;
  background: white;
  z-index: 100;
  margin-bottom: 60px;
  input{
    width: 100%;
    height: 40px;
    padding-left:10px;
    border:0;
    border-bottom:1px solid #ccc;
  }
  .text_mask{
    width: 100%;
    height: 120px;
    position: absolute;
    top:50px;
    left:0;
  }
  .localist{
    width: 100%;
    // overflow-y: auto;
    height: 100%;
    display: flex;
    ul::-webkit-scrollbar {
      display: none!important;
    }
    li:hover{
      color:#eb7a1d!important;
    }
    ul{
      height: 100%;
      overflow-y: auto;
      li{
        height:50px;
        font-size: 15px;
        text-align: center;
        line-height:50px;
        cursor:pointer;
      }
    }
    .loca_vince{
      width: 25%;
      overflow: auto;
      box-sizing: border-box;
      border-right:1px solid #ccc;
      li:nth-child(1){
        color:#eb7a1d;
      }
    }
    .loca_city{
      width: 75%;
      li{
        position: relative;
        .cityMask{
          position: absolute;
          width: 100%;
          height:100%;
          background: rgba(0,0,0,0);
          position: absolute;
          top:0;
          left:0;
          display: none;
          i{
            font-size: 15px;
            font-weight: bold;
            color:#eb7a1d;
            position: absolute;
            right:40px;
            top:18px;
          }
        }
      }
    }
  }
}
</style>
