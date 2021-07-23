<template>
  <div>
    <Security_Carousel></Security_Carousel>
  </div>
</template>

<script>
  import Security_Carousel from './Security/SecurityGuard-Carousel'
    export default {
        name: "Security",
        components: {
          Security_Carousel
        }
    }
</script>

<style scoped>
  @import "../assets/css/Security.css";
</style>
