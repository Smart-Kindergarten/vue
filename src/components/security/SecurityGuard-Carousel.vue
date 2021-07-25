<template>
  <el-carousel height="150px">
    <el-carousel-item v-for="(item,Indexes) in 4" :key="item">
      <img :src="'http://127.0.0.1:9900/Security/GetCarousel?Carousel='+item" :id=Indexes style="width: 100%;height: 100%">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
    export default {
        name: "Security-Carousel"
    }
</script>

<style scoped>

</style>
