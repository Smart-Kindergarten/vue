<template>
  <div>
    <div class="block">
      <el-image :src="src" style="height: 300px;width: 500px;"></el-image>
    </div>
    <el-button type="primary" plain @click="mesg">联系家长</el-button>
  </div>
</template>

<script>
  export default {
    name: "SendMesgPatriarch",
    data() {
      return {
        src: "./static/images/yry2.jpg"
      }
    },
    methods: {
      mesg() {
        window.open('https://mpkf.weixin.qq.com/cgi-bin/kfindex?token=259525286', '_blank'); //新页面打开
      },
    },
  }
</script>

<style scoped>

</style>
