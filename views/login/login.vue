<template>
  <div class="login">
    <div class="loginTitle">
      南和信用管理平台
    </div>
    <div class="loginBox">
      <div class="subtitle">
        <span>用户登录</span>
        <span>UserLogin</span>
      </div>
      <el-form
        ref="dataForm"
        :model="formData"
        :rules="rules"
        status-icon
        @keyup.enter.native="dataFormSubmit()"
      >
      <el-form-item prop="userName">
          <el-input
            v-model="formData.userName"
            prefix-icon="el-icon-user"
            placeholder="帐号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="密码"
          />
       </el-form-item>

        <el-form-item>
        <el-button
            v-loading.fullscreen.lock="fullscreenLoading"
            class="loginbtn"
            type="primary"
            @click="dataFormSubmit()"
          >
            登录
          </el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
   return {
      fullscreenLoading: false,
      formData: {
        bizPara: { username: 'sysadmin', password: '123456' },
        pagePara: {}
      },
      dataForm: {
        userName: '',
        password: '',
        uuid: '',
        title: '智慧市容环卫管理平台'
      },
      rules: {
        userName: [
          {
            required: true,
            message: '帐号不能为空',
            trigger: 'blur'
          }
        ],
         password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
          ]
      }
    }
  },
   computed: {},
  mounted() {},
  methods: {
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
         this.fullscreenLoading = true
          this.$store.dispatch('user/Login', { username: 'sysadmin', password: '123456' }).then((res) => {
            this.fullscreenLoading = false
            this.msgSuccess('登录成功！')
            this.$router.replace({
              name: 'home'
            })
          }).catch(() => {
            this.fullscreenLoading = false
          })
        }
      })
    },
 </script>
 
 <style lang="scss" scope>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  background: url("../../assets/img/bg_back.jpg") no-repeat;
  background-size: 100% 100%;
  .loginTitle {
    height: 40px;
    margin-bottom: 80px;
    text-align: center;
    color: white;
    font-family: 微软雅黑;
    font-weight: bold;
    font-size: 36px;
    letter-spacing: 5px;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
  .loginBox {
    width: 600px;
    height: 300px;
    margin: 0px auto;
    border-radius: 10px;
    background-color: rgba($color: #000000, $alpha: 0.5);
    padding: 30px 100px;
    .subtitle{
      margin-bottom: 20px;
    span:nth-child(1) {
      margin-right: 15px;
      font-size: 24px;
      color: white;
      }
     span:nth-child(2) {
      font-size: 20px;
      color: #989898;
      }
    }
    .loginbtn {
      width: 100%;
      height: 44px;
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
