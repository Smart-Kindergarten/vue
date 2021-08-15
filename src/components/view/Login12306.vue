<template>
  <div>
    <div style="font-family: STCaiyun; font-size: 40px; color: #2E7250; background-color: #E6F2EC;height: 50px;">
      <marquee behavior="1" direction="">欢迎光临智慧幼儿园管理系统</marquee>
    </div>

    <el-image :src="src" style="height: 550px;margin: 20px;">
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
    </el-image>
  </div>
</template>
<script>
  export default {
    name: 'Login12306',
    data() {
      return {
        src: '/static/images/yry3.jpg',
      }
    }
  }
</script>

<style scoped>

</style>
