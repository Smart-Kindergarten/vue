<template>
  <el-calendar>
  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
  <template
    slot="dateCell"
    slot-scope="{date, data}">
    <p :class="data.isSelected ? 'is-selected' : ''" >
      {{ data.day.split('-').slice(1).join('-') }}<br />
      上午:<el-tag type="success">正常接送</el-tag>20:20&nbsp妈妈<br />
      下午:<el-tag>放假</el-tag>
<!--      <el-tag type="success">正常接送</el-tag>-->
<!--      <el-tag type="info">请假</el-tag>-->
<!--      <el-tag type="warning">未接送</el-tag>-->

    </p>
  </template>
  </el-calendar>
</template>

<script>
    export default {
        name: "SecurityGuard-Pick-information",
        data(){
          return{

          }
        },
        methods:{
        },
        props:["babyID"]
    }
</script>

<style scoped>

</style>
