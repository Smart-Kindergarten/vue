<template>
  <div>
    <h1>发布作业</h1>
    <div align="center">
      <el-table
        border
        stripe
        :data="[tableData]"
        style="width: 861px;margin: auto;text-align: center">
        <el-table-column
          prop="id"
          label="班级编号"
          width="100"
          align="center">
          <span>{{ cId }}</span>
        </el-table-column>
        <el-table-column
          label="班级名称"
          width="180"
          align="center">
          <select style="width: 160px;height: 30px" @click="getClassId($event)">
            <option v-for="(item,index) in classAry" :key="index" :value="item.classId">{{ item.className }}</option>
          </select>
        </el-table-column>
        <el-table-column
          label="作业内容"
          width="180"
          align="center">
          <span>{{ work }}</span>
        </el-table-column>
        <el-table-column
          label="布置时间"
          width="180"
          align="=center">
          <span>{{ createTime }}</span>
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
      action="/api/upload"
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
export default {
  name: 'PublishHomework',
  data () {
    return {
      tableData: [],

      form: {
        file: ''
      },
      fileList: [],
      classAry: [],
      cId: '',
      createTime: this.addDate(),
      work: '',
    }
  },
  props: ['uacc'],

  methods: {
    uploadFile () {
      if (this.work!=''){
        this.$refs.uploadDemo.submit()
      }else {
        this.$message({
          showClose: true,
          message: "未选择文件",
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
        // console.log(res)
        this.$message({
          showClose: true,
          message: res.data,
          type: 'success'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    handleSuccess (response, file, fileList) {
      console.log(response)
      if (response.status == 'success') {
        this.UploadedSuccess()
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
    getClassId (event) {
      this.cId = event.target.value //获取option对应的value值
      // console.log('你选中了', this.cId)
    },

  },

  mounted () {
    this.getClassName()
  },

}
</script>

<style scoped>

</style>
