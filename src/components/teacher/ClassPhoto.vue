<template>
  <div>
    <h1>班级相册</h1>
    <div style="width: 761px;height: 40px;margin: 10px auto;">
      <div style="float: left;">
        班级名称：
        <el-select v-model="classAry.classId" placeholder="请选择班级" @change="getClassId(classAry.classId)">
          <el-option v-for="item in classAry" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
        </el-select>
      </div>
      <div style="float: right;">
        <el-button type="primary" plain @click="newPhotosBtn">新增照片</el-button>
      </div>
    </div>
    <div style="height: 10px"></div>
    <div align="center">
      <el-table stripe border style="width: 761px;margin: auto;" :data="classPhotoAry.slice((this.currPage-1)*this.pageSize,this.currPage*this.pageSize)"
                highlight-current-row>
        <el-table-column align="center" header-align="center" label="照片编号" type="index" width="80"></el-table-column>
        <el-table-column align="center" header-align="center" label="照片名称" prop="phoName" width="140"></el-table-column>
        <el-table-column align="center" header-align="center" label="照片描述" prop="phoDescribe" width="140"></el-table-column>
        <el-table-column align="center" header-align="center" label="照片" width="200">
          <!--                    <img src="http://localhost:9901/images/classPhoto/bingGuo.jpg">-->
          <template slot-scope="scope">
            <el-popover placement="top-start" trigger="hover">
              <img :src="'http://localhost:9901/images/classPhoto/'+scope.row.phoName">
              <img slot="reference" :src="'http://localhost:9901/images/classPhoto/'+scope.row.phoName" style="width: 80px;">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="上传时间" prop="phoUploadTime" width="200"></el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="prev, pager, next,sizes,total" :page-sizes="[5,10]" :page-size="pageSize" :total="classPhotoAry.length" @current-change="currentChange"
                     @size-change="sizeChange"></el-pagination>
    </div>
    <div>
      <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" center title="新增班级相册" width="30%">

        <el-form style="width: 400px;margin: auto">
          <el-upload ref="uploadDemo" :auto-upload="false" :file-list="fileList" :on-change="handleChange" :on-preview="handlePreview" :on-success="handleSuccess"
                     action="/api/classPhoto" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-form-item label="照片描述:">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="uploadFile">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassPhoto',
  props: ['uacc'],
  data () {
    return {
      classAry: [],
      cId: '',
      pageSize: 5,
      currPage: 1,
      dialogVisible: false,
      classPhotoAry: [],
      textarea: '',
      fileList: [],
      photo: '',
    }
  },
  mounted () {
    this.getClassName()
  },
  methods: {
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file) {
      this.photo = file.name
    },
    uploadFile () {
      if (this.photo !== '') {
        this.$refs.uploadDemo.submit()
        this.dialogVisible = false
      } else {
        this.$message({
          showClose: true,
          message: '未选择文件',
          type: 'error'
        })
      }
    },
    handleSuccess (response, file) {
      console.log(response)
      if (response.status === 'success') {
        this.newClassPhoto()
      } else {
        this.$message({
          showClose: true,
          message: response,
          type: 'error'
        })
      }
    },
    newClassPhoto () {
      this.$axios.get('teacher/newClassPhoto', {
        params: {
          classId: this.cId,
          text: this.textarea,
        }
      }).then(response => {
        console.log(response.data)
        if (response.data != null) {
          this.$message({
            showClose: true,
            message: response.data,
            type: 'success'
          })
          this.checkClassPhoto()
        } else {
          this.$message({
            showClose: true,
            message: response.data,
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
      this.checkClassPhoto()
    },
    //查询班级相册
    checkClassPhoto () {
      this.$axios.get('teacher/checkClassPhoto', {
        params: {
          classId: this.cId
        }
      }).then(response => {
        // console.log(response.data)
        if (response.data != null) {
          this.classPhotoAry = response.data
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
    //新增照片按钮
    newPhotosBtn () {
      if (this.cId != '') {
        this.dialogVisible = true
        this.fileList = []
        this.textarea = ''
      } else {
        this.$message({
          showClose: true,
          message: '请先选择班级',
          type: 'error'
        })
      }
    }

  },
}
</script>

<style scoped>
.el-upload-list__item {
  transition: none !important;
}
</style>
