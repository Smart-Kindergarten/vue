<template>
  <div>
    <h1>查看作业</h1>
    <div>
      班级名称：
      <el-select
        v-model="classAry.classId"
        @change="getClassId(classAry.classId)"
        placeholder="请选择班级"
        style="width: 140px">
        <el-option
          v-for="item in classAry"
          :key="item.classId"
          :label="item.className"
          :value="item.classId">
        </el-option>
      </el-select>
    </div>
    <div align="center">
      <el-table
        stripe
        border
        style="width: 991px;margin: auto;"
        :data="CheckHomeworkAry.slice((this.currPage-1)*this.pageSize,this.currPage*this.pageSize)"
        highlight-current-row
        @current-change="handleCurrentChange"
        :default-sort="{prop: 'arrangementTime', order: 'descending'}">
        <el-table-column
          type="index"
          label="序号"
          width="50"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="biid"
          label="宝宝编号"
          width="100"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="biname"
          label="宝宝名称"
          width="100"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="uname"
          label="家长名称"
          width="100"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          label="作业内容"
          width="120"
          header-align="center"
          align="center">
          <el-row>
            <el-button size="small">查看作业</el-button>
          </el-row>
        </el-table-column>
        <el-table-column
          prop="arrangementTime"
          label="发布时间"
          sortable
          width="200"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="completionTime"
          label="完成时间"
          width="200"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
          header-align="center"
          align="center">
          <el-row>
            <el-button size="small">作业打分</el-button>
          </el-row>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        background
        layout="prev, pager, next,sizes,total"
        :page-sizes="[5,10]"
        :page-size="pageSize"
        :total="CheckHomeworkAry.length"
        @current-change="CurrentChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckHomework',
  data () {
    return {
      classAry: [],
      cId: '',
      CheckHomeworkAry: [],
      currentRow: null,
      pageSize: 5,
      currPage: 1,
    }
  },
  props: ['uacc'],
  methods: {
    CurrentChange: function (cPage) {
      this.currPage = cPage
    },
    handleSizeChange: function (val) {
      this.pageSize = val
    },

    handleCurrentChange (val) {
      this.currentRow = val
      console.log(this.currentRow)
    },
    //获取班级名称
    getClassName () {
      // console.log(this.uacc)
      this.$axios.get('teacher/getClassName', {
        params: {
          uAccount: this.uacc
        }
      }).then(response => {
        // console.log('--------------')
        this.classAry = response.data
        this.cId = response.data[0].classId
        // console.log(this.classAry[0].classId)
        this.$forceUpdate()
      }).catch(error => {
        console.log(error)
        this.$message({
          showClose: true,
          message: '不存在所教班级',
          type: 'error'
        })
      })
    },
    //获取班级id
    getClassId (value) {
      this.cId = value
      console.log('你选中了', this.cId)
      this.getHomework()
    },
//查看作业
    getHomework () {
      this.$axios.get('teacher/checkHomework', {
        params: {
          classId: this.cId
        }
      }).then(res => {
        console.log(res.data)
        if (res.data != null) {
          this.CheckHomeworkAry = res.data
        } else {
          this.CheckHomeworkAry = []
        }
      }).catch(error => {
        console.log(error)
      })
    },

  },
  mounted () {
    this.getClassName()
  }
}
</script>

<style scoped>

</style>
