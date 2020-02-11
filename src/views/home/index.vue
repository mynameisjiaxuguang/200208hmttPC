<template>
  <div>
    <!-- 布局 -->
    <el-container>
      <!-- 左右布局 -->
  <el-aside width="200px">
    <div>
      <img src="../../assets/logo_admin.png" alt="">
    </div>
  </el-aside>
  <!-- 上下布局 -->
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <!-- 二级路由容器 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  }
}
</script>
