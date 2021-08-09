<template>
  <div>
    <h1>安全教育配置</h1>
    <div style="width: 100px;margin-left: 1000px;">
      <el-button plain @click="dialogVisible = true">新增</el-button>
    </div>
    <div style="height: 10px"></div>
    <div align="center">
      <el-table
        stripe border style="width: 641px;margin: auto;"
        :data="SafEduAry.slice((this.currPage-1)*this.pageSize,this.currPage*this.pageSize)"
        highlight-current-row
        :default-sort="{prop: 'startTime', order: 'descending'}">
        <el-table-column type="index" label="视频编号" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="videoName" label="视频名称" width="140" header-align="center" align="center"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" sortable width="200" header-align="center" align="center"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="200" header-align="center" align="center"></el-table-column>
<!--        <el-table-column label="操作" width="120" header-align="center" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="small" @click="getScope(scope.row)">配置试题</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </div>
    <div>
      <el-pagination :page-size="pageSize" :page-sizes="[5,10]" :total="SafEduAry.length" background layout="prev, pager, next,sizes,total" @current-change="currentChange" @size-change="sizeChange">
      </el-pagination>
    </div>
    <div>
      <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" center title="新增安全教育视频" width="30%">
        <div>
          <el-form style="width: 300px;margin: auto">
            <el-form-item label="视频名称:">
              <el-select v-model="options.videoId" placeholder="请选择视频名称" @change="getRating(options.videoId)">
                <el-option v-for="item in options" :key="item.videoId" :label="item.videoName" :value="item.videoId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间:">
              <el-date-picker v-model="startDate" :picker-options="pickerOptions0" format="yyyy 年 MM 月 dd 日" placeholder="开始日期" type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间:">
              <el-date-picker v-model="endDate" :picker-options="pickerOptions1" format="yyyy 年 MM 月 dd 日" placeholder="结束日期" type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogSubmit">确 定</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SafetyEducationTest',
  data () {
    return {
      SafEduAry: [],
      pageSize: 5,
      currPage: 1,
      dialogVisible: false,
      options: [{
        videoId: '',
        videoName: ''
      }],
      videoId: '',
      startDate: '',
      endDate: '',
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.endDate != '') {
            return time.getTime() > new Date(this.endDate).getTime()
          }
          return time.getTime() < Date.now() - 8.64e7//如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          //减去一天的时间代表可以选择同一天;
          return time.getTime() < new Date(this.startDate).getTime()
        }
      },
    }
  },
  methods: {
    //分页
    currentChange (cPage) {
      this.currPage = cPage
    },
    sizeChange (val) {
      this.pageSize = val
    },
    //Dialog 对话框关闭
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    //下拉框选择
    getRating (val) {
      this.videoId = val
    },
// 查询安全教育
    checkSafEdu () {
      this.$axios.get('teacher/selectSafEdu').then(res => {
        // console.log(res.data)
        this.SafEduAry = res.data
        this.options = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    //选择表格行
    getScope (row) {
      console.log(row)
    },
    //dialog提交
    dialogSubmit () {
      this.dialogVisible = false
      // console.log(this.videoId, this.startDate, this.endDate)
      this.$axios.get('teacher/updateTime', {
        params: {
          videoId: this.videoId,
          startTime: this.startDate,
          endTime: this.endDate,
        }
      }).then(res => {
        // console.log(res.data)
        if (res.data = '200') {
          this.$message({
            showClose: true,
            message: '增加成功',
            type: 'success'
          })
          this.checkSafEdu()
        } else {
          this.$message({
            showClose: true,
            message: '增加失败',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },

  },
  mounted () {
    this.checkSafEdu()
  },
}
</script>

<style scoped>

</style>
