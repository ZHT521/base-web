<template>
  <div class="tabsBar">
    <el-tabs
      :value="activeTabs.name"
      closable
      @tab-remove="removeTab"
      @tab-click="handleClick"
    >
    <el-tab-pane
        v-for="item in tabsTag"
        :key="item.name"
        :label="item.meta.title"
        :name="item.name"
      />
    </el-tabs>
    <el-dropdown
      class="dropdown"
    >
    <i class="el-icon-arrow-down el-icon--right" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          @click.native="tabsCloseCurrentHandle"
        >
          关闭当前标签页
         </el-dropdown-item>
        <el-dropdown-item
          @click.native="tabsCloseOtherHandle"
        >
          关闭其它标签页
        </el-dropdown-item>
        <el-dropdown-item
          @click.native="tabsCloseAllHandle"
        >
          关闭全部标签页
        </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    }
  },
  computed: {
    tabsTag: {
      get() {
        return this.$store.state.tabsTag.tabs
      },
      set(val) {
        this.$store.dispatch('tabsTag/AddTabsTag', val)
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
    tabsTag(val) {
      if (val.length == 0) {
        this.$router.push({
          name: 'home'
        })
      }
    }
  },
  mounted() {},
  methods: {
    handleClick(tab) {
      this.activeTabs = this.tabsTag[tab.index]
      this.$router.push({
        name: tab.name
      })
    },
    removeTab(target) {
      const findResult = this.tabsTag.find((item, index) => {
        return item.name === target
      })
       this.$store.dispatch('tabsTag/RemoveSingleTabsTag', findResult)
      this.$router.push({
        path: this.activeTabs.path
      })
    },
    // tabs, 关闭当前
    tabsCloseCurrentHandle() {
      this.$store.dispatch('tabsTag/RemoveSingleTabsTag', this.activeTabs)
      this.$router.push({
        path: this.activeTabs.path
      })
    },
    // tabs, 关闭其它
    tabsCloseOtherHandle() {
      this.$store.dispatch('tabsTag/RemoveOtherTabsTag', this.activeTabs)
    },
    // tabs, 关闭全部
    tabsCloseAllHandle() {
      this.$store.dispatch('tabsTag/InitTabsTag', this.activeTabs)
      this.$router.push({
        name: 'home'
      })
    }
    }
}
</script>

<style lang="scss" scope>
.tabsBar {
    display: flex;
    justify-content: space-between;
  height: 40px;
  padding: 0px 10px;
  .dropdown {
      height:100%;
      width:40px;
      font-size:18px;
      cursor: pointer;
      text-align: center;
      padding: 10px 0px;
  }
  }
</style>
