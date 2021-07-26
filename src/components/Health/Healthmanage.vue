<!--     <h1 style="font-family: 'Helvetica Neue',Helvetica,'PingFang SC',-->
<!--     'Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif; margin-left: auto">体检管理</h1>-->
<!--    <span style="margin-left: auto">班级名称:</span>-->
<!--    <button style="margin-left: 500px">新增体检情况</button>-->

<template>
<el-main>
  <el-button type="primary" style="margin-left: 600px">新增体检情况</el-button>

  <el-table
    :data="tableData"
    border
    style="width: 100%">

    <el-table-column
            fixed
            prop="babyheid"
            label="宝宝编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="babyname"
            label="宝宝名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="height"
            label="身高"
            width="80">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="体重"
            width="80">
          </el-table-column>
          <el-table-column
            prop="eyesight"
            label="视力"
            width="80">
          </el-table-column>
          <el-table-column
            prop="temperature"
            label="体温"
            width="80">
          </el-table-column>
          <el-table-column
            prop="healthcondition"
            label="健康状况"
            width="120">
          </el-table-column>
          <el-table-column
            prop="checkuptime"
            label="体检时间"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
</el-main>
      </template>
<script>
 export default {
   name:"Healthmanage"
 }
 function f () {

 }
</script>

<style scoped>

</style>
