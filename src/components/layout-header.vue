<template>
  <div>
    <el-row type="flex" align="middle" justify="space-between">
        <!-- 左右两侧 -->
        <el-col :span="7" class="left">
            <i class="el-icon-s-fold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="3" class="right">
            <!-- 头像 -->
            <img src="../assets/avatar.jpg" alt="">
            <!-- 下拉菜单 -->
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    老铁
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>Git地址</el-dropdown-item>
                    <!-- 给组件注册原生js事件使用.native修饰符 -->
                    <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    onLogout () {
    //   console.log('用户推出')
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
        //   确认执行这里弹框
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch()
    //   () => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   }
    }
  }
}
</script>

<style lang="less" scoped>
    .left {
        display: flex;
        align-items: center;
        i {
            font-size: 24px;
            margin-right: 4px;
        }
        // span {
        //     // margin-left: 4px;
        // }
    }
    .right {
        display: flex;
        align-items: center;
        img {
            border-radius: 50%;
            margin-right: 5px;
        }
    }
</style>
