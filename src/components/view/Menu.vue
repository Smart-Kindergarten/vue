<template>
  <div>
    菜单栏
<!--    <h2>{{msg}}</h2>-->
    {{getParam}}
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    computed: {
      getParam: function () {
         return this.$route.params.cid;
      },
      data () {
        return {}
      },
      // props: ["msg"],
      //adsfasdasdasdasdas
    }
  }
</script>

<style scoped>

</style>
