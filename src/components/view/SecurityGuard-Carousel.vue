<template>
  <el-carousel height="150px">
    <el-carousel-item v-for="(item,Indexes) in 4" :key="item">
      <img :src="'/api/Security/getCarousel?Carousel='+Indexes" :id=Indexes>
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
