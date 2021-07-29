<template>
  <div>
    <h1>发布作业</h1>
    <div>
      <el-table
        border
        stripe
        :data="tableData"
        style="width: 851px;margin: auto;text-align: center">
        <el-table-column
          label="班级编号"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="班级名称"
          width="180"
          align="center">
          <select style="width: 160px;height: 30px">
            <option></option>
          </select>
        </el-table-column>
        <el-table-column
          prop="fileWork"
          label="作业内容"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="布置时间"
          width="180"
          align="=center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="220"
          align="=center">
          <!--          <el-form :model="form">-->
          <el-button size="medium" type="primary" @click="uploadFile">发布作业</el-button>
          <!--          </el-form>-->
        </el-table-column>
      </el-table>
    </div>
    <el-upload
      ref="uploadDemo"
      action="/api/elUpload"
      :auto-upload="false"
      :file-list="fileList"
      :show-file-list="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-success="handleSuccess">
      <el-button slot="trigger" size="medium" type="primary">上传作业</el-button>
    </el-upload>

  </div>
</template>

<script>

var formData = new FormData() // 声明一个FormData对象
var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
export default {
  name: 'PublishHomework',
  data () {
    return {
      tableData: [
        {
          fileWork: '',
          date: this.addDate(),
        }],

      form: {
        file: ''
      },
      fileList: []
    }
  },

  methods: {
    uploadFile () {
      this.$refs.uploadDemo.submit()
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
    handleSuccess (response, file, fileList) {
      console.log(response)
      if (response == '上传成功') {
        this.$message({
          showClose: true,
          message: response,
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: response,
          type: 'error'
        })
      }
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      console.log('文件选择')
      console.log(file.name)
      console.log(this.fileList)
      this.tableData = [
        {
          fileWork: file.name,
          date: this.addDate(),
        }]
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
  }
}
</script>

<style scoped>

</style>
