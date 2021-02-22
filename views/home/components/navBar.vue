<template>
  <div class="navBar">
    <div>
      <!-- 折叠按钮 -->
      <el-button
        type="text"
        :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="clickFold"
      />
<!-- 刷新按钮 -->
      <el-button
        type="text"
        style="margin-left: 0px"
        icon="el-icon-refresh-right"
        @click="refresh"
      />
    <!-- 一级菜单栏 -->
      <template v-if="menuList.length > 6">
        <el-button
          v-for="(item, index) in menuList.slice(0, 6)"
          :key="index"
          type="text"
          style="font-size: 14px; margin-left: 20px"
          @click="btnMethod(item)"
        >
          {{ item.meta.title }}
        </el-button>
        <el-dropdown
          trigger="click"
          placement="bottom"
          style="
            width: 60px;
            line-height: 50px;
            margin-left: 20px;
             padding: 0px 5px;
          "
        >
          <span class="el-dropdown-link">
            更多<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
           <el-dropdown-item
              v-for="(menu, index) in menuList.slice(6, menuList.length)"
              :key="index"
              @click.native="btnMethod(menu)"
            >
               <!-- <i :class="menu.icon"> </i>  -->
              {{ menu.meta.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
      </template>
      <template v-else>
       <el-button
          v-for="(item, index) in menuList"
          :key="index"
          type="text"
          style="font-size: 14px; margin-left: 20px"
          @click="btnMethod(item)"
        >
        {{ item.meta.title }}
        </el-button>
      </template>
    </div>
     <!-- 右边个人信息、退出登录 -->
    <el-dropdown
      trigger="click"
      placement="bottom"
      style="height: 50px; margin-right: 20px"
      @command="rightHandleCommand"
    >
    <div class="el-dropdown-link-right">
        <el-avatar
          icon="../../assets/logo.png"
          style="margin: 5px 10px"
        >
         头像
        </el-avatar>
        <div class="right-title">
          用户名称啊啊啊<i class="el-icon-arrow-down el-icon--right" />
        </div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="修改密码">
          修改密码
        </el-dropdown-item>
        <el-dropdown-item command="退出登录">
          退出登录
        </el-dropdown-item>
     </el-dropdown-menu>
    </el-dropdown>
    <updatePassword
      v-if="updatePassowrdVisible"
      ref="updatePassowrd"
    />
  </div>
</template>

<script>
import updatePassword from './updatePassword.vue'

export default {
  components: { updatePassword },
  data() {
    return {
    isCollapse: false,
      updatePassowrdVisible: false
    }
  },
   computed: {
    menuList: {
      get() {
        return this.$store.state.permissionRoutes.addRoutes
      },
      set(val) {
        this.$store.commit('permissionRoutes/SET_ROUTES', val)
      }
    },
    currentMenuList: {
     get() {
        return this.$store.state.permissionRoutes.currentRoutes
      },
      set(val) {
        this.$store.commit('permissionRoutes/SET_CURRENTROUTES', val)
      }
    }
  },
   mounted() {},
  methods: {
    clickFold() {
      this.isCollapse = !this.isCollapse
      this.$emit('iscollapse', this.isCollapse)
    },
    refresh() {
      location.reload()
    },
    btnMethod(value) {
      this.currentMenuList = value
      this.$store.dispatch('tabsTag/InitTabsTag')
      this.$router.push({
        name: 'home'
      })
    },
    rightHandleCommand(command) {
      if (command == '修改密码') {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      } else {
        this.logoutHandle()
      }
    },
     // 退出
    logoutHandle() {
      this.$confirm(`确定进行[退出]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
      this.$store.dispatch('user/LoginOut').then(() => {
            this.msgSuccess('退出成功！')
            this.$router.replace({
              name: 'login'
            })
             }).catch(() => {
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scope>
.navBar {
 display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  background-color: $--color-primary;
}
.el-button--text.is-active,
.el-button--text:active {
  background-color: transparent;
  border: none;
}
.el-button--text:focus,
.el-button--text:hover {
  background-color: rgba($color: #646464, $alpha: 0.3);
  border: none;
  color: #fff;
}
.el-button--text {
  border: none;
  color: #fff;
  font-size: 18px;
  min-width: 40px;
  height: 46px;
  padding: 10px 0px;
  // margin-left: 0px !important;
}
.el-dropdown:hover {
  background-color: rgba($color: #646464, $alpha: 0.3);
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-link-right {
  cursor: pointer;
  color: #fff;
  display: flex;
  height: 50px;
  .right-title {
    text-align: center;
    line-height: 50px;
  }
}
</style>
         
