<template>
  <!--  <el-button type="primary" icon="el-icon-platform-eleme" @click="pay">进行缴费</el-button>-->
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-button type="primary" @click="pay">进行缴费</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Alipay",
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
