<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>个人中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">个人信息</el-menu-item>
        <el-menu-item index="1-2">修改密码</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span>安全中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">接送管理</el-menu-item>
        <el-menu-item index="2-2">电子围栏</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-video-camera-solid"></i>
        <span>直播中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">直播管理</el-menu-item>
        <el-menu-item index="3-2">权限管理</el-menu-item>
        <el-menu-item index="3-3">视频管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style>

</style>

<script>
  export default {
    name: "Security-Menu",
    methods: {
      handleSelect(key,keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
