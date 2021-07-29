import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/login',
      component: ()=> import('@/views/login/index'),
      name: 'login',
      meta: {
        needLogin: false
      },

    },
    {
      path: '/',
      component: () => import('@/views/custom-index/index'),
      name: 'customindex',
      meta: {
        needLogin: true
      }
    },
    {
      path: '/test',
      component: () => import('@/views/compTest'),
      name: 'test',
    },
  ]
})


// router.beforeEach((to, from, next) => {
//   if (to.meta.needLogin) {
//     if(window.sessionStorage.loginUser){
//       console.log(window.sessionStorage.loginUser+ "已登录"+window.sessionStorage.token)
//       next()
//     }else{
//       console.log("未登录")
//       next({path: '/login'})
//     }
//   } else {
//     next()
//   }

// })

export default router

