<template>
  <div>
    <!-- 布局 -->
    <el-container>
      <!-- 左右布局 -->
  <el-aside class="left" style="width:220px">
    <div class="menu-title" style="background-color:#2e2f32 ">
      <img src="../../assets/logo_admin.png" alt="">
    </div>
    <el-menu router style="width:221px" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
      <!-- 一级菜单el-menu-item -->
      <el-menu-item index="/">首页</el-menu-item>
      <!-- 二级菜单el-submenu -->
      <el-submenu index='1'>
        <template slot="title">内容管理</template>
        <el-menu-item index="/publish">发布文章</el-menu-item>
        <el-menu-item index="/article">内容列表</el-menu-item>
        <el-menu-item index="/comment">评论管理</el-menu-item>
        <el-menu-item>素材管理</el-menu-item>
        </el-submenu>
      <el-submenu index='2'>
        <template slot="title">粉丝列表</template>
        <el-menu-item>图文数据</el-menu-item>
        <el-menu-item>粉丝概况</el-menu-item>
        <el-menu-item>粉丝画像</el-menu-item>
        <el-menu-item>粉丝列表</el-menu-item>
        </el-submenu>
      <el-menu-item>账户信息</el-menu-item>
    </el-menu>
  </el-aside>
  <!-- 上下布局 -->
  <el-container>
    <el-header>
      <layout-header></layout-header>
    </el-header>
    <el-main>
      <!-- 二级路由容器 -->
      <!-- router-view路由出口上给key禁用缓存 key唯一即可-->
      <router-view :key="$route.path"></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import layoutHeader from '../../components/layout-header'
export default {
  name: 'Home',
  components: {
    'layout-header': layoutHeader
  }
}
</script>
<style lang="less" scoped>
    .left {
      height: 100vh;
      background-color: #2e2f32;
      overflow: hidden;
      .menu-title {
        text-align: center;
        padding: 15px 0;
        img {
          height: 30px;
        }
      }
    }
</style>
