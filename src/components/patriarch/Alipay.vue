<template>
  <div>
    <div class="block">
      <el-image :src="src" style="height: 300px;width: 500px;"></el-image>
    </div>

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" plain @click="pay">进行缴费</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: "Alipay",
    data() {
      return {
        src: "./static/images/yry1.jpg"
      }
    },
    methods: {
      pay() {
        this.$axios.post("alipay").then(response => {
          document.querySelector('body').innerHTML = response;
          const div = document.createElement('div');
          div.innerHTML = response.data;
          document.body.appendChild(div);
          document.forms[0].setAttribute('target', '_blank');// 新建窗口页面
          this.$router.go(0);
          document.forms[0].submit();
        }).catch(error => {
          console.log(error)
        });
      },
    }

  }
</script>

<style scoped>

</style>
