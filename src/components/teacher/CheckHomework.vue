<template>
  <div>
    <h1>查看作业</h1>
    <div>
      班级名称：
      <el-select v-model="classAry.classId" placeholder="请选择班级" style="width: 140px" @change="getClassId(classAry.classId)">
        <el-option v-for="item in classAry" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
      </el-select>
    </div>
    <div align="center">
      <el-table :data="CheckHomeworkAry.slice((this.currPage-1)*this.pageSize,this.currPage*this.pageSize)" :default-sort="{prop: 'arrangementTime', order: 'descending'}" border highlight-current-row stripe
                style="width: 991px;margin: auto;" @current-change="handleCurrentChange">
        <el-table-column align="center" header-align="center" label="序号" type="index" width="50"></el-table-column>
        <el-table-column align="center" header-align="center" label="宝宝编号" prop="biid" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="宝宝名称" prop="biname" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="家长名称" prop="uname" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="作业内容" width="120">
          <template slot-scope="scope">
            <el-button size="small" @click="checkWork(scope.row)">查看作业</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="发布时间" prop="arrangementTime" sortable width="200">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="完成时间" prop="completionTime" width="200"></el-table-column>
        <el-table-column align="center" header-align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button size="small" @click="handleClick(scope.row)">作业打分</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination :page-size="pageSize" :page-sizes="[5,10]" :total="CheckHomeworkAry.length" background layout="prev, pager, next,sizes,total" @current-change="CurrentChange"
                     @size-change="handleSizeChange"></el-pagination>
    </div>
    <div>
      <el-dialog :before-close="handleClose" :visible.sync="dialogFormVisible" center title="作业评分" width="30%">
        <el-form>
          <el-form-item label="作业评级：">
            <el-select v-model="options.value" placeholder="请选择作业评级" @change="getRating(options.value)">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
      // console.log('查看:', row)
      window.location.href = 'http://localhost:9901/images/publishHomework/' + row.workName
    }
  },
  mounted () {
    this.getClassName()
  }
}
</script>

<style scoped>

</style>
