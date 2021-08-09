<template>
  <div>
    <h1>班级考勤</h1>
    <div>
      班级名称：
      <el-select v-model="classAry.classId" @change="getClassId(classAry.classId)" placeholder="请选择班级" style="width: 140px">
        <el-option v-for="item in classAry" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
      </el-select>
    </div>
    <div style="height: 10px"></div>
    <div style="width: 800px;height: 40px;margin: auto;">
      <div style="float: left;width: 400px;margin-left: 20px;">
        <span>宝宝名称：</span>
        <el-input v-model="babyName" clearable placeholder="请输入内容" prefix-icon="el-icon-search" style="width: 300px"></el-input>
      </div>
      <div style="width: 100px;float: left;margin-left: 250px">
        <el-button type="primary" plain>查询</el-button>
      </div>
    </div>
    <div style="height: 10px"></div>
    <div align="center">
      <el-table
        stripe border style="width: 781px;margin: auto;"
        :data="classAttendanceAry.slice((this.currPage-1)*this.pageSize,this.currPage*this.pageSize)"
        highlight-current-row
        :default-sort="{prop: 'completeTime', order: 'descending'}">
        <el-table-column type="index" label="宝宝编号" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="biname" label="宝宝名称" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="uname" label="家长名称" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column label="考勤时间" width="200" header-align="center" align="center"></el-table-column>
        <el-table-column label="性别" width="140" header-align="center" align="center"></el-table-column>
        <el-table-column label="操作" width="140" header-align="center" align="center">

        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="prev, pager, next,sizes,total" :page-sizes="[5,10]" :page-size="pageSize" :total="classAttendanceAry.length" @current-change="CheckCurrentChange"
                     @size-change="CheckSizeChange"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassAttendance',
  props: ['uacc'],
  data () {
    return {
      classAry: [],
      cId: '',
      babyName: '',
      classAttendanceAry: [],
      pageSize: 5,
      currPage: 1,
    }
  },
  methods: {
    //分页
    CheckCurrentChange (cPage) {
      this.currPage = cPage
    },
    CheckSizeChange (val) {
      this.pageSize = val
    },
    //获取班级名称
    getClassName () {
      this.$axios.get('teacher/getClassName', {
        params: {
          uAccount: this.uacc
        }
      }).then(response => {
        if (response.data != null) {
          this.classAry = response.data
          this.$forceUpdate()
        } else {
          this.$message({
            showClose: true,
            message: '无数据',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
        this.$message({
          showClose: true,
          message: error,
          type: 'error'
        })
      })
    },
    //获取班级id
    getClassId (value) {
      this.cId = value
    },
  },
  mounted () {
    this.getClassName()

  },
}
</script>

<style scoped>

</style>
