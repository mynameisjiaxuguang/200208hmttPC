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
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

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
