import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin',
      component:resolve=>require(['@/page/temAdmin/admin_tem'],resolve),
    },
    {
      name:'Admin',//临时管理员
      path:'/admin',
      component:resolve=>require(['@/page/temAdmin/admin_tem'],resolve),
      children:[
        {
          path:'/admin/wel',
          name:'Wel',
          component:resolve=>require(['@/page/temAdmin/admin_welcome'],resolve)
        },
        {
          path:'/admin/order',
          name:'Order',
          component:resolve=>require(['@/page/temAdmin/admin_order'],resolve)
        },
        {
          path:'/admin/role',
          component:resolve=>require(['@/page/temAdmin/admin_role'],resolve)
        },
        {
          path:'/admin/channel',
          component:resolve=>require(['@/page/temAdmin/admin_channel'],resolve)
        },
      ],
      redirect:'/admin/wel'
    }
  ]
})
