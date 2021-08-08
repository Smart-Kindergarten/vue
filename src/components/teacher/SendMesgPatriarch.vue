<template>
  <div>
    <el-button type="primary" @click="mesg">联系家长</el-button>
  </div>
</template>

<script>
  export default {
    name: "SendMesgPatriarch",
    methods: {
      mesg() {
        window.open('https://mpkf.weixin.qq.com/cgi-bin/kfindex?token=259525286', '_blank'); //新页面打开
      },
    },
  }
</script>

<style scoped>

</style>
