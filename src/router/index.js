import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'
import Login from '../views/login'
// @代表src
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        // 默认子路由
        path: '/',
        component: Home
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/publish',
        component: Publish
      }
      // ,
      // {
      //   path: '/home',
      //   component: Home
      // }
    ]
  },
  {
    // 主页
    path: '/layout',
    name: 'Layout',
    component: Layout
  }, {
    // 登录页
    path: '/login',
    name: Login,
    component: Login
  },
  {
    path: '/life',
    component: () => import('../views/life')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
// 路由拦截器方法
// to表示去来自哪里的路由信息
// from表示来自哪里的路由信息
// next是方法用于路由放行
// 判断用户登录状态，有就通过，没有就跳转到登录页面不让通过
router.beforeEach((to, form, next) => {
  console.log('所有页面访问都要经过')
  // 登录页面直接放行
  if (to.path === '/login') {
    return next()
  }
  // 如果非登录页面才校验登陆状态
  //  获取用户token
  const token = window.localStorage.getItem('user-token')
  // 判断是否有token，有就通过
  if (token) {
    next()
  } else {
    // 没有就跳转登录页
    next('/login')
  }
})
export default router
