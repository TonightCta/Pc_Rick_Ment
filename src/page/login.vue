<!-- 登录 -->
<template lang="html">
  <div class="login" ref="login_sub">
    <div class="login_con">
      <el-row>
        <el-col :span="6">
          <div class="login_title">
            <ul>
              <li>登录名:</li>
              <li>密码:</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="login_input">
            <ul>
              <li>
                <el-input placeholder="请输入用户名" type="text" v-model="userName"></el-input>
              </li>
              <li>
                <el-input placeholder="请输入密码" type="password" v-model="userPass" @keyup.delete.native="delPass"></el-input>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <p class="login_sub">
        <el-button type="primary" style="fontSize:16px;" size="small" :disabled="disabled" @click="loginSub()">&nbsp;&nbsp;登录&nbsp;&nbsp;</el-button>
      </p>
    </div>
    <canvas ref="loginCanv" style="zIndex:-1;" class="loginCan"></canvas>
    <canvas ref="loginCanvT" width="500" height="500" style="zIndex:-1;" class="loginCan"></canvas>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userName:'',//登录名
      userPass:'',//密码
      disabled:true
    }
  },
  watch:{
    userName(val,oldVal){
      if(val!==''&&this.userPass!==''){
        this.disabled=false;
      }else{
        this.disabled=true;
      }
    },
    userPass(val,oldVal){
      if(val!=''&&this.userName!==''){
        this.disabled=false;
      }else{
        this.disabled=true;
      }
    }
  },
  created(){
    let _vc=this;
    document.onkeydown = function(e) {
         let key = window.event.keyCode;
         if (key == 13) {
             _vc.loginSub();
         }
     };
  },
  mounted(){
    this.ani()
  },
  beforeRouteLeave(to,from,next){
    document.onkeydown = undefined;
    next()
  },
  methods:{
    loginSub(){
      let _vm=this;
      if(_vm.userName==''){
        _vm.$message.error('请输入用户名')
      }else if(_vm.userPass==''){
        _vm.$message.error('请输入密码')
      }else{
        let formdata=new FormData();
        formdata.append('name',_vm.userName);
        formdata.append('password',_vm.userPass);
        _vm.$axios.post(_vm.url+'/login',formdata).then((res)=>{
          if(res.data.code==0){
            _vm.$message({
             message: '登陆成功',
             type: 'success'
           });
           window.sessionStorage.setItem('adminMes',JSON.stringify(res.data.data));
           _vm.$router.push('/admin')
           console.log(res);
           window.localStorage.setItem('Uid',res.data.data.id)
           setTimeout(()=>{
             // this.$refs.loginCanv.style.display='none';
             // this.$refs.loginCanvT.style.display='none';
             // console.log(this.$refs.loginCanv.style)
           },500);
         }else{
           _vm.$message.error(res.data.msg)
         }
       }).catch((err)=>{
         _vm.$message.error('未知错误,请联系管理员')
       })
      }
    },
    delPass(){//键盘删除事件
      this.userPass=''
    },
    ani(){
      /**
       *3D海洋效应与 Canvas2D
       */

      // Init Context
      let c =this.$refs.loginCanv.getContext('2d')
      let postctx =this.$refs.loginCanvT.getContext('2d')
      let canvas = c.canvas
      let vertices = []

      // Effect Properties
      let vertexCount = 7000
      let vertexSize = 3
      let oceanWidth = 204
      let oceanHeight = -80
      let gridSize = 32;
      let waveSize = 16;
      let perspective = 100;

      // Common variables
      let depth = (vertexCount / oceanWidth * gridSize)
      let frame = 0
      let { sin, cos, tan, PI } = Math

      // Render loop
      let loop = () => {
      	let rad = sin(frame / 100) * PI / 20
        let rad2 = sin(frame / 50) * PI / 10
      	frame++
      	if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) {
        	postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth
          postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight
        }


      	c.fillStyle = `hsl(200deg, 100%, 2%)`
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)

        c.beginPath()
        vertices.forEach((vertex, i) => {
        	let ni = i + oceanWidth
        	let x = vertex[0] - frame % (gridSize * 2)
          let z = vertex[2] - frame * 2 % gridSize + (i % 2 === 0 ? gridSize / 2 : 0)
        	let wave = (cos(frame / 45 + x / 50) - sin(frame / 20 + z / 50) + sin(frame / 30 + z*x / 10000))
          let y = vertex[1] + wave * waveSize
          let a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth)
          let tx, ty, tz

          y -= oceanHeight

          // Transformation variables
         	tx = x
          ty = y
          tz = z

          // Rotation Y
          tx = x * cos(rad) + z * sin(rad)
          tz = -x * sin(rad) + z * cos(rad)

          x = tx
          y = ty
          z = tz

          // Rotation Z
          tx = x * cos(rad) - y * sin(rad)
          ty = x * sin(rad) + y * cos(rad)

          x = tx;
          y = ty;
          z = tz;

          // Rotation X

          ty = y * cos(rad2) - z * sin(rad2)
          tz = y * sin(rad2) + z * cos(rad2)

          x = tx;
          y = ty;
          z = tz;

          x /= z / perspective
          y /= z / perspective



          if (a < 0.01) return
          if (z < 0) return


          c.globalAlpha = a
          c.fillStyle = `hsl(${180 + wave * 20}deg, 100%, 50%)`
          c.fillRect(x - a * vertexSize / 2, y - a * vertexSize / 2, a * vertexSize, a * vertexSize)
          c.globalAlpha = 1
        })
        c.restore()

        // Post-processing
        postctx.drawImage(canvas, 0, 0)

        postctx.globalCompositeOperation = "screen"
        postctx.filter = 'blur(16px)'
        postctx.drawImage(canvas, 0, 0)
        postctx.filter = 'blur(0)'
        postctx.globalCompositeOperation = "source-over"

        requestAnimationFrame(loop)
      }

      // Generating dots
      for (let i = 0; i < vertexCount; i++) {
      	let x = i % oceanWidth
        let y = 0
        let z = i / oceanWidth >> 0
      	let offset = oceanWidth / 2
      	vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize])
      }
      loop()
    }
  }
}
</script>

<style lang="scss" scoped>
.loginCan{
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 box-sizing: border-box;
 color:red;
}
.login{
  width:100%;
  height: 100vh;
  position: relative;
  .login_con{
    width: 800px;
    height: 300px;
    position: absolute;
    top:35%;
    left:20%;
    margin-left: -400px;
    margin-top: -150px;
    border-radius:12px;
    box-sizing: border-box;
    padding-top: 20px;
    color:white;
    .login_sub{
      width: 100%;
      text-align: left;
      margin-top: 26px;
      box-sizing: border-box;
      padding-left: 200px;
      .el-button--primary{
        background: rgba(235,122,29,.3);
      }
    }
    .login_title{
      ul{
        li{
          line-height: 50px;
          margin-top: 10px;
          margin-bottom: 10px;
          text-align: right;
          padding-right: 12px;
          font-size: 15px;
        }
      }
    }
    .login_input{
      ul{
        li{
          line-height: 49px;
          margin-top: 10px;
          margin-bottom: 10px;
          .el-input__inner{
            background:rgba(0,0,0,0);
            border-radius:0;
            color:white;
            border:none;
            border-bottom:1px solid #666;
          }
        }
      }
    }
  }
}
</style>
