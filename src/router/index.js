import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:resolve=>require(['@/page/login'],resolve),
      meta:{
        keep:true
      }
    },
    {
      name:'Admin',//临时管理员
      path:'/admin',
      component:resolve=>require(['@/page/admin_tem'],resolve),
      meta:{
        keep:false
      },
      children:[
        {
          path:'/admin/wel',
          name:'Wel',
          component:resolve=>require(['@/page/temAdmin/admin_welcome'],resolve)
        },
        {
          path:'/admin/order',//派单管理
          name:'Order',
          component:resolve=>require(['@/page/temAdmin/admin_order'],resolve)
        },
        {
          path:'/admin/internalEng',//内部工程师管理
          name:'InternalEng',
          component:resolve=>require(['@/page/internalAdmin/internalEng'],resolve)
        },
        {
          path:'/admin/newEng',//新注册工程师管理
          name:'NewEng',
          component:resolve=>require(['@/page/internalAdmin/newEng'],resolve)
        },
        {
          path:'/admin/externalEng',//外部工程师管理
          name:'ExternalEng',
          component:resolve=>require(['@/page/internalAdmin/externalEng'],resolve)
        },
        {
          path:'/admin/certifiedEng',//待认证工程师管理
          name:'CertifiedEng',
          component:resolve=>require(['@/page/internalAdmin/certifiedEng'],resolve)
        },
        {
          path:'/admin/queryProject',//项目查询
          name:'QueryProject',
          component:resolve=>require(['@/page/mentAdmin/queryProject'],resolve)
        },
        {
          path:'/admin/gressProject',//项目进度查询
          name:'GressProject',
          component:resolve=>require(['@/page/mentAdmin/gressProject'],resolve)
        },
        {
          path:'/admin/skillMent',//技能管理
          name:'skillMent',
          component:resolve=>require(['@/page/skillAdmin/skill_ment'],resolve)
        },
        {
          path:'/admin/internalCom',//内部企业管理,
          name:'internalCom',
          component:resolve=>require(['@/page/companyAdmin/internalCom'],resolve)
        },
        {
          path:'/admin/newCom',//新注册企业管理,
          name:'newCom',
          component:resolve=>require(['@/page/companyAdmin/newCom'],resolve)
        },
        {
          path:'/admin/certifiedCom',//待认证企业管理,
          name:'certifiedCom',
          component:resolve=>require(['@/page/companyAdmin/certifiedCom'],resolve)
        },
        {
          path:'/admin/creatPro',//项目搭建
          name:'CreatPro',
          component:resolve=>require(['@/page/managerAdmin/creatPro'],resolve)
        },
        {
          path:'/admin/custTion',//客户列表管理
          name:'CustTion',
          component:resolve=>require(['@/page/managerAdmin/customer'],resolve)
        },
        {
          path:'/admin/custTionManer',//客户列表管理(项目经理级别)
          name:'custTionManer',
          component:resolve=>require(['@/page/managerAdmin/customerManer'],resolve)
        },
        {
          path:'/admin/workContent',//工作内容管理
          name:'WorkContent',
          component:resolve=>require(['@/page/internalAbout/workContent'],resolve)
        },
        {
          path:'/admin/riskRcord',//潜在风险记录列表(管理员)
          name:'RiskRecord',
          component:resolve=>require(['@/page/internalAbout/riskRcord'],resolve)
        },
        {
          path:'/admin/riskRcordManer',//潜在风险记录列表(工程师)
          name:'riskRcordManer',
          component:resolve=>require(['@/page/internalAbout/riskRcordManer'],resolve)
        },
        {
          path:'/admin/projectFile',//项目相关文档管理
          name:'ProjectFile',
          component:resolve=>require(['@/page/internalAbout/projectFile'],resolve)
        },
        {
          path:'/admin/channel',//频道管理
          name:'Channel',
          component:resolve=>require(['@/page/basicData/channelAdmin'],resolve)
        },
        {
          path:'/admin/role',//角色管理
          name:'Role',
          component:resolve=>require(['@/page/basicData/roleAdmin'],resolve)
        },
        {
          path:'/admin/operman',//操作人员管理
          name:'OperMan',
          component:resolve=>require(['@/page/basicData/opermanAdmin'],resolve)
        },
        {
          path:'/admin/place',//地点管理
          name:'Place',
          component:resolve=>require(['@/page/basicData/placeAdmin'],resolve)
        },
        {
          path:'/admin/point',//进程节点管理
          name:'Point',
          component:resolve=>require(['@/page/basicData/pointAdmin'],resolve)
        },
        {
          path:'/admin/field',//技术领域及能力管理
          name:'Field',
          component:resolve=>require(['@/page/basicData/fieldAdmin'],resolve)
        }
      ],
      redirect:'/admin/wel'
    }
  ]
});
//全局拦截
// router.beforeEach((to,from,next)=>{
//   const adminList=['Admin','Wel','Order'];
//   if(adminList.indexOf(to.name)>-1){
//     if(!window.sessionStorage.getItem('adminMes')){
//       next('/')
//     }
//   };
//   next();
// })
export default router;
