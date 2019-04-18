import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:resolve=>require(['@/page/login'],resolve),
    },
    {
      name:'Admin',//临时管理员
      path:'/admin',
      component:resolve=>require(['@/page/admin_tem'],resolve),
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
          path:'/admin/externalEng',//外部工程师管理
          name:'ExternalEng',
          component:resolve=>require(['@/page/internalAdmin/externalEng'],resolve)
        },
        {
          path:'/admin/certifiedEng',//待认证工程师管理
          name:'CertifiedEng',
          component:resolve=>require(['@/page/internalAdmin/certifiedEng'],resolve)
        }
      ],
      redirect:'/admin/wel'
    }
  ]
});
router.beforeEach((to,from,next)=>{
  const adminList=['Admin','Wel','Order'];
  if(adminList.indexOf(to.name)>-1){
    if(!window.sessionStorage.getItem('adminMes')){
      next('/')
    }
  };
  next();
})
export default router;
