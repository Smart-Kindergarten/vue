<template>

  <div class="class-table">
    <div style="height: 40px;font-size: 30px">课程表</div>
    <div>班级名称：
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
    <span>{{ startTime }}~{{ endTime }}</span>
    <div class="table-wrapper">
      <div class="table-container">
        <table>
          <thead>
          <tr>
            <th>课节</th>
            <th v-for='(week, index) in weeks' :key='index'> {{ '周' + digital2Chinese(index + 1, 'week') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for='(item, index) in classTableData' :key='index'>
            <td>
              <p>{{ '第' + digital2Chinese(index + 1) + '节' }}</p>
            </td>

            <td v-for='(week, index) in weeks' :key='index'>
              {{ item[week] || '-' }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        style="float: left;margin-left: 20px"
        @click="getWeek('LastWeek')">上一周
      </el-button>
      <el-button
        type="primary"
        style="float: right;margin-right: 20px"
        @click="getWeek('NextWeek')">下一周<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
  </div>
</template>

<script>
let systemTime = ''

export default {
  name: 'Curriculum',
  data () {
    return {
      classAry: [],
      cId: '',
      startTime: '',
      endTime: '',
      weeks: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      classTableData: [],
      tableShow: false
    }
  },
  props: ['uacc'],

  mounted: function () {
    this.addDate()
    this.getClassName()

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

    //当前时间
    addDate () {
      let nowDate = new Date()
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      this.systemTime = date.year + '-' + date.month + '-' + date.date
      // console.log(this.systemTime)
    },
    //获取班级名称
    getClassName () {
      this.$axios.get('teacher/getClassName', {
        params: {
          uAccount: this.uacc
        }
      }).then(response => {
        this.classAry = response.data
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
      this.checkCurr()
    },
    checkCurr () {
      this.$axios.get('teacher/selectCurrAll', {
        params: {
          classId: this.cId,
          date: this.systemTime,
        }
      }).then(response => {
        if (response.data != null) {
          this.className = response.data[0].classId
          var currDate = response.data[0].currDate
          var date = currDate.split(',')
          this.startTime = date[0]
          this.endTime = date[1]
          this.classTableData = [
            {
              'monday': response.data[0].currMonday,
              'tuesday': response.data[0].currTuesday,
              'wednesday': response.data[0].currWednesday,
              'thursday': response.data[0].currThursday,
              'friday': response.data[0].currFriday,
            },
            {
              'monday': response.data[1].currMonday,
              'tuesday': response.data[1].currTuesday,
              'wednesday': response.data[1].currWednesday,
              'thursday': response.data[1].currThursday,
              'friday': response.data[1].currFriday,
            },
            {
              'monday': response.data[2].currMonday,
              'tuesday': response.data[2].currTuesday,
              'wednesday': response.data[2].currWednesday,
              'thursday': response.data[2].currThursday,
              'friday': response.data[2].currFriday,
            },
            {
              'monday': response.data[3].currMonday,
              'tuesday': response.data[3].currTuesday,
              'wednesday': response.data[3].currWednesday,
              'thursday': response.data[3].currThursday,
              'friday': response.data[3].currFriday,
            },
            {
              'monday': response.data[4].currMonday,
              'tuesday': response.data[4].currTuesday,
              'wednesday': response.data[4].currWednesday,
              'thursday': response.data[4].currThursday,
              'friday': response.data[4].currFriday,
            }]
        } else {
          this.classTableData = []
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
    getWeek: function (string) {
      this.$axios.get('teacher/getWeekDate', {
        params: {
          classId: this.cId,
          week: string,
          date: this.startTime,
        }
      }).then(response => {
        if (response.data != null) {
          this.className = response.data[0].classId
          var currDate = response.data[0].currDate
          var date = currDate.split(',')
          this.startTime = date[0]
          this.endTime = date[1]
          this.classTableData = [
            {
              'monday': response.data[0].currMonday,
              'tuesday': response.data[0].currTuesday,
              'wednesday': response.data[0].currWednesday,
              'thursday': response.data[0].currThursday,
              'friday': response.data[0].currFriday,
            },
            {
              'monday': response.data[1].currMonday,
              'tuesday': response.data[1].currTuesday,
              'wednesday': response.data[1].currWednesday,
              'thursday': response.data[1].currThursday,
              'friday': response.data[1].currFriday,
            },
            {
              'monday': response.data[2].currMonday,
              'tuesday': response.data[2].currTuesday,
              'wednesday': response.data[2].currWednesday,
              'thursday': response.data[2].currThursday,
              'friday': response.data[2].currFriday,
            },
            {
              'monday': response.data[3].currMonday,
              'tuesday': response.data[3].currTuesday,
              'wednesday': response.data[3].currWednesday,
              'thursday': response.data[3].currThursday,
              'friday': response.data[3].currFriday,
            },
            {
              'monday': response.data[4].currMonday,
              'tuesday': response.data[4].currTuesday,
              'wednesday': response.data[4].currWednesday,
              'thursday': response.data[4].currThursday,
              'friday': response.data[4].currFriday,
            }]
        } else {
          this.$message({
            // showClose: true,
            message: '无数据',
            type: 'error'
          })
        }

      }).catch(error => {
        console.log(error)
      })
    },

  }
}
</script>
<style scoped>
.class-table {
  width: 800px;
  /*border: 1px black solid;*/
  margin: 0 auto;
}

.table-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  /*border: 1px black solid;*/

}

.table-container {
  margin: 7px;
  /*border: 1px black solid;*/
  height: 240px;
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
  width: 60px;
  padding: 12px 2px;
  font-size: 12px;
  text-align: center;
}

tr td:first-child {
  color: #333;
}

.period {
  font-size: 8px;
}

</style>
