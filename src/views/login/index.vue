<template>
  <div class="login">
      <el-card class="login-card">
          <!-- 黑马头条图片 -->
          <div class="title">
              <img src="../../assets/logo_index.png" alt="">
          </div>
          <!-- 表单 -->
          <!-- model属性要绑定表单数据对象 -->
          <!-- rules校验规则对象 -->
          <el-form style="margin-top:30px" :model="loginForm" :rules='loginRules' ref="formObj">
              <!-- 手机号 -->
              <el-form-item prop="mobile">
                  <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <!-- 验证码及其按钮 -->
              <el-form-item prop="code">
                  <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
                  <el-button plain style="float:right">发送验证码</el-button>
              </el-form-item>
              <!-- 用户须知同意框 -->
              <el-form-item prop="checked">
                   <el-checkbox v-model="loginForm.checked"> 我已阅读并同意用户协议和隐私条款 </el-checkbox>
              </el-form-item>
              <!-- 登录按钮 -->
              <el-form-item>
                  <el-button @click="login" type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 要校验的整个表单数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否勾选
      },
      //    校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码错误' }
        ],
        // rule代表当前规则，没什么用/value代表当前的值=>checked的值/callback回调函数
        checked: [{
          validator: function (rules, value, callback) {
            if (value) {
            // 如果是true，表示选中直接执行callback
              callback()
            } else {
            //   不通过也直接执行callback
              callback(new Error('您必须同意此条款'))
            }
          }
        }]
      }
    }
  },
  methods: {
    login () {
      // this.$refs.formObj获取el-form的对象实例
      this.$refs.formObj.validate(function (isOk) {
        if (isOk) {
          // 如果为true弹出登录成功
          alert('登录成功')
        //   此时需要调用接口登录
        }
      })
    }
  }
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
