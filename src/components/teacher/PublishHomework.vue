<template>
  <div>
    <h1>发布作业</h1>
    <div>
      <el-table
        border
        stripe
        :data="tableData"
        style="width: 841px;margin: auto">
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
          <div class="con">
            <div class="tip">选择文件：</div>
            <input class="file" type="file" title="请选择文件" value="请选择文件">
            <div class="tip">输入姓名：</div>
            <input class="inputS" type="text" v-model="name" placeholder="请在此输入姓名">
            <button class="submit" @click="submit">提交</button>
          </div>
        </el-table-column>
      </el-table>
    </div>
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
          date: '',
        }],

      fileList: [],
      name: '',
      // file: ''
    }
  },

  methods: {
    submit: function () {
      formData.append('file', document.querySelector('input[type=file]').files[0]) // 'file' 这个名字要和后台获取文件的名字一样;
      formData.append('user', this.name)
      //'userfile'是formData这个对象的键名
      axios({
        url: 'http://localhost:9901/teacher/upHomework',   //****: 你的ip地址
        data: formData,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
          //这里是为了解决跨域问题，但是博主并没有用这种方式解决。后面会给出解决方案
        }
      }).then((res) => {
        console.log(res.data)
      }) // 发送请求
    },

    handleChange (file, fileList) {
      console.log('文件选择')
      console.log(file.name)
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
