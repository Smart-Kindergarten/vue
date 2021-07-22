<template>
    <div id="left">
      <router-link to="/UserAdmin">用户管理</router-link>
      <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'AdminIndex'
  }
</script>

<style scoped>

</style>
