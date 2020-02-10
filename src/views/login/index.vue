<template>
  <div class="login">
      <el-card class="login-card">
          <!-- 黑马头条图片 -->
          <div class="title">
              <img src="../../assets/logo_index.png" alt="">
          </div>
          <!-- 表单 -->
          <el-form style="margin-top:30px">
              <!-- 手机号 -->
              <el-form-item>
                  <el-input placeholder="请输入手机号"></el-input>
              </el-form-item>
              <!-- 验证码及其按钮 -->
              <el-form-item>
                  <el-input placeholder="请输入验证码" style="width:240px"></el-input>
                  <el-button plain style="float:right">发送验证码</el-button>
              </el-form-item>
              <!-- 用户须知同意框 -->
              <el-form-item>
                   <el-checkbox> 我已阅读并同意用户协议和隐私条款 </el-checkbox>
              </el-form-item>
              <!-- 登录按钮 -->
              <el-form-item>
                  <el-button type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .login {
        height: 100vh;
        background: url('../../assets/login_bg.jpg');
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-card {
            width: 400px;
            height: 360px;
        }
        .title {
            text-align: center;
            img {
                height: 45px;
            }
        }
    }
</style>
