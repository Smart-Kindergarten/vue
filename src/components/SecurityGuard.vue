<template>
  <el-container style="height: 100%">
    <el-header height="150px">
      <Security_Carousel></Security_Carousel>
    </el-header>
    <el-container>
      <el-aside width="201px" style="background-color: rgb(84, 92, 100);">
<!--          <div :style="conheight">-->
          <Security_Menu></Security_Menu>
<!--          </div>-->
      </el-aside>
      <el-main >2</el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Security_Carousel from './security/SecurityGuard-Carousel'
  import Security_Menu from './security/SecurityGuard-Menu'
    export default {
        name: "Security",
        data(){
          conheight:{
            height:document.body.clientHeight
          }
        },
        components: {
          Security_Carousel,
          Security_Menu
        }
    }
</script>

<style scoped>
  @import "../assets/css/Security.css";
</style>
