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

export default router
