<template>
  <div class="home">
    <asideBar :is-collapse="isCollapse" />
    <div class="container">
      <navBar @iscollapse="getCollapse($event)" />
      <tabsBar v-if="this.$route.path != '/welcome'" />
    <div
        class="mainView"
        :class="{ mainViewHeight : this.$route.path == '/welcome'}"
      >
        <router-view />
      </div>
      <footerBar />
    </div>
  </div>
</template>

<script>
import navBar from './components/navBar.vue'
import asideBar from './components/asideBar.vue'
import footerBar from './components/footerBar.vue'
import tabsBar from './components/tabsBar.vue'

export default {
  components: { navBar, asideBar, footerBar, tabsBar },
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    getCollapse(value) {
      this.isCollapse = value
     }
  }
}
</script>

<style lang="scss" scope>
.home {
  display: flex;
  height: calc(100% - 50px);
  .container {
    width: 100%;
    height: 100%;
    .mainView {
     height: calc(100% - 100px);//100 footerBar40+tabsbar40+padding20
      background-color: white;
      margin: 10px;
      padding: 10px;
      box-shadow: 0 0 20px rgb(201, 207, 201);
      overflow: auto;
      }
    .mainViewHeight {
       height: calc(100% - 60px);//60 footerBar40+padding20
    }
  }
}
</style>
