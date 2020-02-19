import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'
import Login from '../views/login'
// @代表src
import Home from '@/views/home'
import Comment from '@/views/comment'
import CommentDetail from '@/views/comment-detail'
import Article from '@/views/article'
import Publish from '@/views/publish'
import NProgress from 'nprogress'
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
      },
      {
        path: '/publish/:articleId',
        component: Publish
      }, {
        path: '/comment',
        component: Comment
      },
      {
        path: '/comment/:articleId',
        component: CommentDetail,
        // 将路由参数映射给组件的props
        props: true
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
// 路由拦截器/导航守卫方法
// to表示去来自哪里的路由信息
// from表示来自哪里的路由信息
// next是方法用于路由放行
// 判断用户登录状态，有就通过，没有就跳转到登录页面不让通过
// 全局前置守卫
router.beforeEach((to, form, next) => {
  // 开启顶部导航条特效
  NProgress.start()
  // console.log('所有页面访问都要经过')
  // 登录页面直接放行
  // console.log(to)
  // 通过控制台找到的path

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
    // 在登录页非登录状态访问其他组件时没有token则一直执行next('/login')
    // ，即登录页往登录页跳转所以进度条会卡，所以需要手动终止进度条
    NProgress.done()
  }
})
router.afterEach((to, form) => {
  // 结束顶部导航进度条
  NProgress.done()
})
export default router
