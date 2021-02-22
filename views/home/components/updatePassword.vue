<template>
  <el-dialog
    title="修改密码"
    :visible.sync="visible"
    :append-to-body="true"
    width="40%"
  >
  <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="80px"
      @keyup.enter.native="dataFormSubmit()"
    >
    <el-form-item label="账号">
        <span>{{ userName }}</span>
      </el-form-item>
      <el-form-item
        label="原密码"
        prop="oldPwd"
      >
      <el-input
          v-model="dataForm.oldPwd"
          size="small"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="newPwd"
      >
      <el-input
          v-model="dataForm.newPwd"
          size="small"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="confirmPassword"
      >
        <el-input
          v-model="dataForm.confirmPassword"
          size="small"
          type="password"
        />
         </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
    <el-button
        size="small"
        @click="visible = false"
      >取消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="dataFormSubmit()"
      >确定</el-button>
      </span>
    <span
      slot="title"
      class="ui-dialog_ico"
    >
      <i class="el-icon-document-copy" />
      <span>修改密码</span>
    </span>
  </el-dialog>
</template>

<script>
import { removeToken } from '@/utils/auth'

export default {
  data() {
   var validateConfirmPassword = (rule, value, callback) => {
      if (this.dataForm.newPwd !== value) {
        callback(new Error('确认密码与新密码不一致'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      dataForm: {
        userName: '',
        oldPwd: '',
        newPwd: '',
        confirmPassword: ''
      },
      dataRule: {
        oldPwd: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
         confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
   computed: {
    userName: {
      get() {
        return this.$store.state.user.name
      }
    }
     },
  methods: {
    // 初始化
    init() {
      this.visible = true
      this.dataForm.userName = this.userName
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/base/user/modifyPwd',
            method: 'post',
             data: this.$http.adornData({
              userName: JSON.parse(sessionStorage.getItem('user')).username,
              oldPwd: this.dataForm.oldPwd,
              newPwd: this.dataForm.newPwd
            })
       }).then(({ data }) => {
            if (data && data.code === 2000) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$nextTick(() => {
                    console.log(this.mainTabs)
                    this.mainTabs = []
                    removeToken
                    this.$router.replace({ name: 'login' })
                  })
                }
              })
              } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
