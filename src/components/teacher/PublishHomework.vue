<template>
  <div>
    <h1>发布作业</h1>
    <div style="width: 641px;height: 40px;margin: auto;">
      <div style="float: left;width: 240px;">
        班级名称：
        <el-select v-model="classAry.classId" placeholder="请选择班级" style="width: 140px" @change="getClassId(classAry.classId)">
          <el-option v-for="item in classAry" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
        </el-select>
      </div>
      <div style="width: 100px;float: right;">
        <el-button plain @click="arrangementHomework">布置作业</el-button>
      </div>
    </div>
    <div style="height: 10px"></div>
    <div align="center">
      <el-table stripe border style="width: 641px;margin: auto;" :data="publishHomeworkAry.slice((this.currPage-1)*this.pageSize,this.currPage*this.pageSize)"
                highlight-current-row>
        <el-table-column align="center" header-align="center" label="作业编号" type="index" width="100"></el-table-column>
        <el-table-column align="center" header-align="center" label="作业名称" prop="homeworkContent" width="140"></el-table-column>
        <el-table-column align="center" header-align="center" label="教师名称" prop="uname" width="140"></el-table-column>
        <el-table-column align="center" header-align="center" label="布置时间" prop="arrangementTime"></el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="prev, pager, next,sizes,total" :page-sizes="[5,10]" :page-size="pageSize" :total="publishHomeworkAry.length" @current-change="currentChange"
                     @size-change="sizeChange"></el-pagination>
    </div>
    <div>
      <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" center title="布置作业" width="40%">
        <div align="center">
          <el-table :data="[tableData]" border highlight-current-row stripe style="width: 640px;margin: auto;text-align: center">
            <el-table-column align="center" header-align="center" label="班级名称" width="140">
              <span>{{ clName }}</span>
            </el-table-column>
            <el-table-column align="center" header-align="center" label="作业内容" width="140">
              <span>{{ work }}</span>
            </el-table-column>
            <el-table-column align="center" header-align="center" label="布置时间" width="140">
              <span>{{ createTime }}</span>
            </el-table-column>
            <el-table-column align="center" header-align="center" label="操作">
              <el-upload ref="uploadDemo" :file-list="fileList" :on-change="handleChange" :on-preview="handlePreview" :on-success="handleSuccess" :show-file-list="false"
                         action="/api/upload" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">上传作业</el-button>
                <el-button size="small" type="success" @click="uploadFile">发布作业</el-button>
              </el-upload>
            </el-table-column>
          </el-table>
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
  name: 'PublishHomework',
  data () {
    return {
      tableData: [],
      publishHomeworkAry: [],
      pageSize: 5,
      currPage: 1,
      dialogVisible: false,
      form: {
        file: ''
      },
      fileList: [],
      classAry: [],
      cId: '',
      createTime: this.addDate(),
      work: '',
      clName: '',
    }
  },
  props: ['uacc'],

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
    uploadFile () {
      if (this.work !== '') {
        this.$refs.uploadDemo.submit()
      } else {
        this.$message({
          showClose: true,
          message: '未选择文件',
          type: 'error'
        })
      }
    },
    // submit(params) { // 如果要自定义submit的话el-upload需要加上:http-request="submit"
    //   console.log(params)
    //   const form = new FormData()
    //   form.append('xml', params.file)
    //   this.$http.post('/elupload', form, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }).then(() => {
    //     this.$notify({
    //       title: '成功',
    //       message: '导入成功',
    //       type: 'success',
    //       duration: 2000
    //     })
    //   })
    // },
    UploadedSuccess () {
      this.$axios.get('teacher/upHomework', {
        params: {
          id: this.cId,
          uacc: this.uacc
        }
      }).then(res => {
        this.$message({
          showClose: true,
          message: res.data,
          type: 'success'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    handleSuccess (response, file) {
      console.log(response)
      if (response.status === 'success') {
        this.UploadedSuccess()
      } else {
        this.$message({
          showClose: true,
          message: response,
          type: 'error'
        })
      }
    },
    handlePreview (file) {
      console.log('123', file.url)
    },
    handleChange (file) {
      this.work = file.name
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
      return date.year + '-' + date.month + '-' + date.date
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
      this.getClName()
      this.checkPublishHomework()
    },
    //使用班级id获取班级名称
    getClName(){
      this.$axios.get('teacher/getClName', {
        params: {
          classId: this.cId
        }
      }).then(response => {
        if (response.data != null) {
          this.clName = response.data
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
    //查询发布作业
    checkPublishHomework () {
      this.$axios.get('teacher/checkPublishHomeworkint', {
        params: {
          classId: this.cId
        }
      }).then(res => {
        console.log(res.data)
        if (res.data != null) {
          this.publishHomeworkAry = res.data
        } else {
          this.publishHomeworkAry = []
          this.clName = ''
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
    //布置作业
    arrangementHomework () {
      if (this.cId != '') {
        this.dialogVisible = true
      } else {
        this.$message({
          showClose: true,
          message: '请先选择班级',
          type: 'error'
        })
      }
    },
    //dialog提交
    dialogSubmit () {
      this.dialogVisible = false
      this.checkPublishHomework()
    },

  },

  mounted () {
    this.getClassName()
  },

}
</script>

<style scoped>

</style>
