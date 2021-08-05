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
          <template slot-scope="scope">
            <el-button size="small" @click="checkWork(scope.row)">查看作业</el-button>
          </template>
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
          <template slot-scope="scope">
            <el-button size="small" @click="handleClick(scope.row)">作业打分</el-button>
          </template>
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
    <div>
      <el-dialog title="作业评分" :visible.sync="dialogFormVisible" width="30%" center :before-close="handleClose">
        <el-form>
          <el-form-item label="作业评级：">
            <el-select v-model="options.value" placeholder="请选择作业评级" @change="getRating(options.value)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="ratingSubmit">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
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
      dialogFormVisible: false,
      options: [{
        value: 'A',
        label: 'A'
      }, {
        value: 'B',
        label: 'B'
      }, {
        value: 'C',
        label: 'C'
      }, {
        value: 'D',
        label: 'D'
      }],
      value: '',
    }
  },
  props: ['uacc'],
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    CurrentChange (cPage) {
      this.currPage = cPage
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    //获取班级名称
    getClassName () {
      this.$axios.get('teacher/getClassName', {
        params: {
          uAccount: this.uacc
        }
      }).then(response => {
        this.classAry = response.data
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
      // console.log('你选中了', this.cId)
      this.getHomework()
    },

    //查看作业
    getHomework () {
      this.$axios.get('teacher/checkHomework', {
        params: {
          classId: this.cId
        }
      }).then(res => {
        // console.log(res.data)
        if (res.data != null) {
          this.CheckHomeworkAry = res.data
        } else {
          this.CheckHomeworkAry = []
          this.$message({
            showClose: true,
            message: '无数据',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },

    //作业评级
    handleClick (row) {
      console.log('查看:', row)
      this.dialogFormVisible = true
      this.currentRow = row
    },
    getRating (val) {
      this.value = val
      console.log('评级：', this.value)
    },
    //作业评分提交
    ratingSubmit () {
      this.dialogFormVisible = false
      console.log(this.currentRow, this.value)
      this.$axios.get('teacher/workRating', {
        params: {
          chId: this.currentRow.chId,
          rating: this.value
        }
      }).then(res => {
        console.log(res)
        if (res.data = '修改完成！') {
          this.$message({
            showClose: true,
            message: res.data,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.data,
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
      })
      this.options.value = ''
    },

    //下载作业
    checkWork (row) {
      console.log('查看:', row.homeworkURL)
      // window.location = 'teacher/download?file=' + row.homeworkURL
      // this.$axios({
      //   method: 'GET',
      //   url: 'teacher/download',
      //   responseType: 'blob',
      //   params: {
      //     path: row.homeworkURL
      //   },
      // }).then(response => {
      //   const blob = new Blob([response.data])
      //   const url = window.URL.createObjectURL(blob)
      //   window.location.href = url
      // }).catch(error => this.$message.error(error))
    }
  },
  mounted () {
    this.getClassName()
  }
}
</script>

<style scoped>

</style>
