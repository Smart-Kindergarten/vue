<template>
  <div>
    <h1>班级信息</h1>
    <div>
      班级名称：
      <el-select v-model="classAry.classId" @change="getClassId(classAry.classId)" placeholder="请选择班级" style="width: 140px">
        <el-option v-for="item in classAry" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
      </el-select>
    </div>
    <div style="height: 10px"></div>
    <div style="width: 800px;height: 40px;margin: auto">
      <div style="float: left;width: 460px">
        <span>入学时间：</span>
        <el-date-picker v-model="admissionTime1" format="yyyy-MM-dd" placeholder="选择日期" style="width: 160px" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        <span>至</span>
        <el-date-picker v-model="admissionTime2" format="yyyy-MM-dd" placeholder="选择日期" style="width: 160px" type="date" value-format="yyyy-MM-dd"></el-date-picker>
      </div>
      <div style="width: 100px;float: left;margin-left: 200px">
        <el-button type="primary" plain @click="fuzzySelect">查询</el-button>
      </div>
    </div>
    <div style="height: 10px"></div>
    <div align="center">
      <el-table
        stripe border style="width: 781px;margin: auto;"
        :data="classInfoAry.slice((this.currPage-1)*this.pageSize,this.currPage*this.pageSize)"
        highlight-current-row
        :default-sort="{prop: 'biadtime', order: 'descending'}">
        <el-table-column align="center" header-align="center" label="宝宝编号" type="index" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="宝宝名称" prop="biname" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="家长名称" prop="uname" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="入学时间" prop="biadtime" sortable width="200"></el-table-column>
        <el-table-column align="center" header-align="center" label="性别" prop="bisex" width="140"></el-table-column>
        <el-table-column align="center" header-align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">宝宝信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination :page-size="pageSize" :page-sizes="[5,10]" :total="classInfoAry.length" background layout="prev, pager, next,sizes,total" @current-change="CheckCurrentChange"
                     @size-change="CheckSizeChange"></el-pagination>
    </div>
    <div>
      <el-dialog :before-close="handleClose" :visible.sync="centerDialogVisible" center title="信息" width="30%">
        <div class="dialog_div_b">
          <h1>宝宝信息</h1>
          <div class="dialog_div_b_c">
            <div class="dialog_div_b_l"></div>
            <div class="dialog_div_b_r">
              <p>宝宝姓名：{{ babyName }}</p>
              <p>出生年月：{{ babyYears }}</p>
              <p>宝宝性别：{{ babySex }}</p>
              <p>户口地址：{{ babyAdd }}</p>
            </div>
          </div>
        </div>
        <div class="dialog_div">
          <h1>家长信息</h1>
          <div class="dialog_div_c">
            <div class="dialog_div_l"></div>
            <div class="dialog_div_r">
              <p>家长姓名：{{ parentsName }}</p>
              <p>亲子关系：{{ Parent_childRelationship }}</p>
              <p>电话号码：{{ parentsPhone }}</p>
              <p>家庭地址：{{ homeAdd }}</p>
              <p>　　职业：{{ job }}</p>
            </div>
          </div>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="clearDialog">确 定</el-button>
          <el-button @click="clearDialog">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassInfo',
  props: ['uacc'],
  data () {
    return {
      classInfoAry: [],
      pageSize: 10,
      currPage: 1,
      classAry: [],
      cId: '',
      admissionTime1: null,
      admissionTime2: null,
      centerDialogVisible: false,
      babyName: '',
      babyYears: '',
      babySex: '',
      babyAdd: '',
      parentsName: '',
      Parent_childRelationship: '',
      parentsPhone: '',
      homeAdd: '',
      job: '',
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.clearDialog()
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
      // console.log('你选中了', this.cId)
      this.classInfo()
    },
    //宝宝信息按钮
    handleEdit (row) {
      this.centerDialogVisible = true
      console.log(row.biid)
      this.babyInfo(row.biid)
      this.parentsInfo(row.biid)
    },
    //宝宝信息
    babyInfo (babyId) {
      this.$axios.get('teacher/getBabyInfo', {
        params: {
          id: babyId
        }
      }).then(res => {
        console.log(res.data)
        if (res.data != null) {
          this.babyName = res.data.biname
          this.babyYears = res.data.biytd
          this.babySex = res.data.bisex
          this.babyAdd = res.data.biresidence
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
    //家长信息
    parentsInfo (babyId) {
      this.$axios.get('teacher/getParentsInfo', {
        params: {
          id: babyId
        }
      }).then(res => {
        console.log(res.data)
        if (res.data != null) {
          this.parentsName = res.data.uname
          this.Parent_childRelationship = res.data.uchildrelation
          this.parentsPhone = res.data.uphone
          this.homeAdd = res.data.usite
          this.job = res.data.uwork
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
    //dialog确定按钮
    clearDialog () {
      this.centerDialogVisible = false
      this.babyName = ''
      this.babyYears = ''
      this.babySex = ''
      this.babyAdd = ''
      this.parentsName = ''
      this.Parent_childRelationship = ''
      this.parentsPhone = ''
      this.homeAdd = ''
      this.job = ''
    },
    //班级信息
    classInfo () {
      this.$axios.get('teacher/getClassInfo', {
        params: {
          classId: this.cId
        }
      }).then(response => {
        if (response.data != null) {
          this.classInfoAry = response.data
        } else {
          this.classInfoAry = []
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
    //模糊查询入学时间
    fuzzySelect () {
      if (this.cId != '') {
        this.$axios.get('teacher/fuzzySelectATime', {
          params: {
            classId: this.cId,
            aTime1: this.admissionTime1,
            aTime2: this.admissionTime2,
          }
        }).then(response => {
          if (response.data != null) {
            this.classInfoAry = response.data
            this.$message({
              showClose: true,
              message: '有数据',
              type: 'success'
            })
          } else {
            this.classInfoAry = []
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
      } else {
        this.$message({
          showClose: true,
          message: '请先选择班级',
          type: 'error'
        })
      }

    },

  },
  mounted () {
    this.getClassName()

  },

}
</script>

<style scoped>
.dialog_div_b {
  width: 500px;
  height: 160px;
  margin: 20px auto;
  text-align: center;
}

.dialog_div_b_c {
  height: 120px;
}

.dialog_div_b_l {
  width: 160px;
  height: 120px;
  float: left;
  margin-left: 1%;
  border: 1px black solid;
}

.dialog_div_b_r {
  width: 64%;
  height: 120px;
  float: right;
  margin-right: 1%;
  text-align: left;
  font-size: 18px;
  line-height: 30px;
}

.dialog_div {
  width: 500px;
  height: 200px;
  margin: 20px auto;
  text-align: center;
}

.dialog_div_c {
  height: 160px;
}

.dialog_div_l {
  width: 160px;
  height: 160px;
  float: left;
  margin-left: 1%;
  border: 1px black solid;
}

.dialog_div_r {
  width: 64%;
  height: 160px;
  float: right;
  margin-right: 1%;
  text-align: left;
  font-size: 18px;
  line-height: 32px;
}
</style>
