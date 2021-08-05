<template>
  <div>
    <h1>安全教育试题完成情况</h1>
    <div>
      班级名称：
      <el-select v-model="classAry.classId" @change="getClassId(classAry.classId)" placeholder="请选择班级" style="width: 140px">
        <el-option v-for="item in classAry" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
      </el-select>
    </div>
    <div style="height: 10px"></div>
    <div style="width: 800px;height: 40px;margin: auto">
      <div style="float: left;width: 460px">
        <span>完成时间：</span>
        <el-date-picker v-model="wDate1" format="yyyy-MM-dd" placeholder="选择日期" style="width: 160px" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        <span>至</span>
        <el-date-picker v-model="wDate2" format="yyyy-MM-dd" placeholder="选择日期" style="width: 160px" type="date" value-format="yyyy-MM-dd"></el-date-picker>
      </div>
      <div style="width: 240px;float: left;">
        <span>完成情况：</span>
        <el-select clearable v-model="paramAry.pzId" @change="getPzId(paramAry.pzId)" placeholder="请选择" style="width: 140px">
          <el-option v-for="item in paramAry" :key="item.pzid" :label="item.pname" :value="item.pzid"></el-option>
        </el-select>
      </div>
      <div style="width: 100px;float: left">
        <el-button type="primary" plain @click="checkFuzzy">查询</el-button>
      </div>
    </div>
    <div style="height: 10px"></div>
    <div align="center">
      <el-table
        stripe border style="width: 921px;margin: auto;"
        :data="checkSafEduAry.slice((this.currPage-1)*this.pageSize,this.currPage*this.pageSize)"
        highlight-current-row
        :default-sort="{prop: 'completeTime', order: 'descending'}">
        <el-table-column align="center" header-align="center" label="宝宝编号" type="index" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="宝宝名称" prop="biname" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="家长名称" prop="uname" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="视频名称" prop="videoName" width="140"></el-table-column>
        <el-table-column align="center" header-align="center" label="结束时间" prop="endTime" width="140"></el-table-column>
        <el-table-column align="center" header-align="center" label="完成时间" prop="completeTime" sortable width="140"></el-table-column>
        <el-table-column align="center" header-align="center" label="得分" prop="secScore" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="完成情况" prop="pname" width="100"></el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="prev, pager, next,sizes,total" :page-sizes="[5,10]" :page-size="pageSize" :total="checkSafEduAry.length" @current-change="CheckCurrentChange"
                     @size-change="CheckSizeChange"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckSafetyEducation',
  props: ['uacc'],
  data () {
    return {
      checkSafEduAry: [],
      pageSize: 5,
      currPage: 1,
      wDate1: null,
      wDate2: null,
      classAry: [],
      cId: '',
      paramAry: [],
      paramId: 0,
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
      // console.log('你选中了', this.cId)
      this.checkSafEduTestRecord()
    },
    //查询参数
    getParamName () {
      this.$axios.get('teacher/getPName', {
        params: {
          pName: '完成情况'
        }
      }).then(response => {
        // console.log(response.data)
        if (response.data != null) {
          this.paramAry = response.data
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
    //获取完成情况id
    getPzId (value) {
      if (value != '') {
        this.paramId = value
      } else {
        this.paramId = 0
      }
      // console.log('你选中了', this.paramId)
    },
    //查询安全教育试题记录表
    checkSafEduTestRecord () {
      this.$axios.get('teacher/checkSafEduTestRecord', {
        params: {
          classId: this.cId
        }
      }).then(response => {
        // console.log(response)
        if (response.data != null) {
          this.checkSafEduAry = response.data
        } else {
          this.checkSafEduAry = []
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
          message: '错误',
          type: 'error'
        })
      })
    },
    //查询按钮
    checkFuzzy: function () {
      console.log(this.wDate1, this.wDate2, this.paramId, this.cId)
      if (this.cId != '') {
        this.$axios.get('teacher/checkFuzzy', {
          params: {
            classId: this.cId,
            pzid: this.paramId,
            wDate1: this.wDate1,
            wDate2: this.wDate2,
          }
        }).then(res => {
          if (res.data != null) {
            this.checkSafEduAry = res.data
          } else {
            this.checkSafEduAry = []
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
            message: '错误',
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
    }
  },
  mounted () {
    this.getClassName()
    this.getParamName()
  }
}
</script>

<style scoped>

</style>
