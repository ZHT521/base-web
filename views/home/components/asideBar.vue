<template>
  <div class="aside">
    <div
      class="titleLogoBox"
      :class="{ titleLogoBoxCollapse: isCollapse }"
      @click="goToHomeView"
    >
    <img
        src="../../../assets/logo.png"
        alt="logo"
        :class="{ imgSize: isCollapse }"
      >
      <div
        class="title"
        :class="{ titlehidden: isCollapse }"
      >
       信用南和管理平台
      </div>
    </div>
    <el-menu
      ref="asideMenu"
      class="el-menu-vertical-demo"
      :default-active="activeTabs.path"
      :collapse="isCollapse"
    >
       <el-submenu
        v-for="(item ,index) in currentMenuList.children"
        :key="index"
        :index="item.name"
      >
         <template slot="title">
          <i class="el-icon-location" />
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="(subitem ,subindex) in item.children"
          :key="subindex"
          :index="subitem.path"
          @click="gotoRouteHandle(subitem)"
        >
        <i class="el-icon-location" />
          {{ subitem.meta.title }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        }
  },
  computed: {
    currentMenuList: {
      get() {
        return this.$store.state.permissionRoutes.currentRoutes
      },
       set(val) {
        this.$store.commit('permissionRoutes/SET_CURRENTROUTES', val)
      }
    },
    activeTabs: {
      get() {
        return this.$store.state.tabsTag.activeTab
      },
      set(val) {
        this.$store.dispatch('tabsTag/SetActiveTabTag', val)
         }
       }
     },
  watch: {
    //   监听路由状态并用ref直接改变activeIndex
    $route(route) {
      const path = this.$route.path
      this.$refs.asideMenu.activedIndex = path
    }
  },
   mounted() {
  },
  methods: {
    goToHomeView() {
      this.$router.push({ name: 'home' })
    },
    gotoRouteHandle(item) {
      this.$store.dispatch('tabsTag/AddTabsTag', item)
      this.$router.push({ path: item.path })
    }
  }
}
</script>

<style lang="scss" scope>
.aside {
  height: 100%;
  .titleLogoBox {
  display: flex;
    height: $navbar-height;
    background-color: $--color-primary;
    overflow: hidden;
    padding: 5px 10px;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
    }
     .title {
      font-size: 18px;
      font-weight: 700;
      color: white;
      line-height: 40px;
      text-align: center;
    }
  }
  .titleLogoBoxCollapse {
    justify-content: center;
    align-items: center;
    .titlehidden {
      display: none;
    }
    .imgSize {
      width: 20px;
      height: 20px;
    }
  }
}
.el-menu {
  // border-right: 0px !important;
  //   border-right: $border-style;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 100%;
}
</style>
