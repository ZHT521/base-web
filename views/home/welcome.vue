<template>
  <div class="welcome">
    <div class="textBox">
      <ul>
      <li class="enbt">
          WELCOME
        </li>
        <li class="cnbt">
          {{ title }}
        </li>
        <li class="btnbt">
          便捷、规范、高效、管理
        </li>
        </ul>
    </div>
    <el-image :src="url" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      url: require('../../assets/img/welcome.png'),
      title: '信用管理系统'
    }
  },
   computed: {},
  mounted() {
    this.getTitle()
  },
  methods: {
    getTitle() {
    this.$request({
        url: '/base/systemInfo/getDefault',
        method: 'post',
        data: {
          bizPara: {
          },
          pagePara: {}
        }
         }).then(({ data }) => {
        if (data && data.code === 2000) {
          this.title = data.data.systemInfo.title
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.welcome {
  height: 100%;
  background: url("../../assets/img/index-bg.png") 100% 100%;
  display: flex;
  margin-top: 150px;
  .el-image {
    transform: translateX(-20%);
  width: 1000px;
  height: 534px;
}
  .textBox {
      display: flex;
      justify-content: center;
      z-index: 100;
      transform: translateX(50%);
       .enbt {
      margin-top: 87px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 45px;
      color: #faba65;
    }
    .cnbt {
      height: 80px;
      line-height: 80px;
      font-family: 微软雅黑;
      font-size: 38px;
      font-weight: bold;
      padding-left: 100px;
      color: #3c8dbc;
    }
    .btnbt {
      margin-top: 17px;
      width: 348px;
      height: 45px;
      line-height: 45px;
      background-color: #3c8dbc;
      border-radius: 45px;
      text-align: center;
      font-family: 微软雅黑;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
    }
  }
}

ul li {
  list-style: none;
}
</style>
