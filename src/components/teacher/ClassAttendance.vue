<template>
  <div>
    <h1>班级考勤</h1>
    <div style="margin: 5px auto">
      班级名称：
      <el-select v-model="classAry.classId" @change="getClassId(classAry.classId)" placeholder="请选择班级">
        <el-option v-for="item in classAry" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
      </el-select>
    </div>
    <div style="height: 10px"></div>
    <div style="width: 781px;height: 40px;margin: auto;">
      <div style="float: left;">
        <span>宝宝名称：</span>
        <el-input v-model="babyName" clearable placeholder="请输入内容" prefix-icon="el-icon-search" style="width: 300px"></el-input>
      </div>
      <div style="float: right;">
        <el-button type="primary" plain @click="checkClassAttenBtn">查　　询</el-button>
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
        <el-table-column align="center" header-align="center" label="宝宝名称" prop="biname" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="家长名称" prop="uname" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="考勤时间" prop="attendanceDate" width="200"></el-table-column>
        <el-table-column align="center" header-align="center" label="性别" prop="bisex" width="140"></el-table-column>
        <el-table-column align="center" header-align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">查看考勤</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="prev, pager, next,sizes,total" :page-sizes="[5,10]" :page-size="pageSize" :total="classAttendanceAry.length" @current-change="CheckCurrentChange"
                     @size-change="CheckSizeChange"></el-pagination>
    </div>
    <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" center title="宝宝考勤" width="30%">
      <div>
        <div>
          <el-row :gutter="4">
            <el-col :span="7">
              <div class="grid-content ">宝宝名称：{{ babyName }}</div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content ">班级名称：{{ className }}</div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content ">日期：{{ attenDate }}</div>
            </el-col>
          </el-row>
        </div>
        <div style="margin: 10px auto"></div>
        <div class="table-wrapper">
          <table>
            <thead>
            <tr>
              <th>时间段</th>
              <th v-for='(week, index) in weeks' :key='index'> {{ '星期' + digital2Chinese(index + 1, 'week') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='(item, index) in atten' :key='index'>
              <td>
                <p>{{ timePeriod(index) }}</p>
              </td>
              <td v-for='(week, index) in weeks' :key='index'>
                {{ item[week] || '-' }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="determine">确　　定</el-button>
  </span>
    </el-dialog>
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
      dialogVisible: false,
      weeks: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      atten: [],
      className: '',
      attenDate: '',
    }
  },
  methods: {
    /*
    * 数字转中文
    * @param {Number} num 需要转换的数字
    * @param {String} identifier 标识符
    * @returns {String} 转换后的中文
    */
    digital2Chinese (num, identifier) {
      const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
      return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num]
    },
    timePeriod (num) {
      const str = ['上午', '下午']
      return str[num]
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
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
      this.checkClassAtten()
      this.getClName()
    },
    //使用班级id获取班级名称
    getClName () {
      this.$axios.get('teacher/getClName', {
        params: {
          classId: this.cId
        }
      }).then(response => {
        if (response.data != null) {
          this.className = response.data
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
    //查询按钮
    checkClassAttenBtn () {
      if (this.cId != '') {
        this.fuzzySelectClassAtten()
      } else {
        this.$message({
          showClose: true,
          message: '请选择班级',
        })
      }
    },
    //查询班级考勤
    checkClassAtten () {
      this.$axios.get('teacher/checkClassAtten', {
        params: {
          id: this.cId
        }
      }).then(response => {
        // console.log(response.data)
        if (response.data != null) {
          this.classAttendanceAry = response.data
        } else {
          this.classAttendanceAry =[]
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
    //模糊查询
    fuzzySelectClassAtten () {
      this.$axios.get('teacher/fuzzySelectClassAtten', {
        params: {
          id: this.cId,
          name: this.babyName,
        }
      }).then(response => {
        if (response.data != null) {
          this.classAttendanceAry = response.data
        } else {
          this.classAttendanceAry =[]
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
    //查看考勤
    handleEdit (row) {
      // console.log(row)
      this.dialogVisible = true
      this.babyName = row.biname
      this.attenDate = row.attendanceDate
      this.$axios.get('teacher/BabyAtten', {
        params: {
          classId: this.cId,
          babyId: row.biid,
          date: row.attendanceDate,
        }
      }).then(response => {
        // console.log(response.data)
        if (response.data != null) {
          this.atten = [
            {
              'monday': response.data[0].monday,
              'tuesday': response.data[0].tuesday,
              'wednesday': response.data[0].wednesday,
              'thursday': response.data[0].thursday,
              'friday': response.data[0].friday,
            },
            {
              'monday': response.data[1].monday,
              'tuesday': response.data[1].tuesday,
              'wednesday': response.data[1].wednesday,
              'thursday': response.data[1].thursday,
              'friday': response.data[1].friday,
            }]
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
    //dialog确定
    determine () {
      this.dialogVisible = false
      this.babyName = ''
      this.attenDate = ''
      this.atten = []
    },
  },
  mounted () {
    this.getClassName()

  },
}
</script>

<style scoped>


.table-wrapper {
  width: 100%;
  height: 100%;
  /*overflow: auto;*/
  /*border: 1px black solid;*/
}


table {
  table-layout: fixed;
  width: 100%;
}

thead {
  background-color: #67a1ff;
}

th {
  color: #fff;
  line-height: 17px;
  font-weight: normal;
}


tbody {
  background-color: #eaf2ff;
}

td {
  color: #677998;
  line-height: 12px;
}


th, td {
  width: 70px;
  padding: 12px 2px;
  font-size: 12px;
  text-align: center;
}

tr td:first-child {
  color: #333;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
  font-size: 15px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
