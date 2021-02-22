<template>
  <el-row>
    <el-col :span="24">
      <div class="footer">
        <span class="ui-footer">4444</span><span class="pull-right">55555</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      copyright: '',
      version: ''
    }
  },
  created() {
    // this.getTitle();
  },
  methods: {
   }
  }
</script>

<style lang="scss" scoped>
.footer {
		width: 100%;
		height: 37px;
		line-height: 36px;
		background-color: #fff;
              border-top: 1px solid #dcdcdc;
		font-size: 12px;
		font-family: arial;
		color:#757575;
	}
.ui-footer{
		float:left;
		padding-left: 12px;
	}
	.pull-right{
		float:right;
		padding-right: 12px;
  }
</style>
