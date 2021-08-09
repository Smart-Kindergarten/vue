<template>
  <div>
    <h1>班级公告</h1>
    <div style="width: 521px;height: 40px;margin: auto;">
      <div style="float: left;width: 240px;">
        班级名称：
        <el-select v-model="classAry.classId" placeholder="请选择班级" style="width: 140px" @change="getClassId(classAry.classId)">
          <el-option v-for="item in classAry" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
        </el-select>
      </div>
      <div style="float: right;">
        <el-button plain @click="classMessageBtn">新增班级公告</el-button>
      </div>
    </div>
    <div style="height: 10px"></div>
    <div align="center">
      <el-table stripe border style="width: 521px;margin: auto;" :data="classMessageAry.slice((this.currPage-1)*this.pageSize,this.currPage*this.pageSize)"
                highlight-current-row>
        <el-table-column align="center" header-align="center" label="公告编号" type="index" width="80"></el-table-column>
        <el-table-column align="center" header-align="center" label="公告内容" prop="message" width="280"></el-table-column>
        <el-table-column align="center" header-align="center" label="公告时间" prop="messageTime"></el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="prev, pager, next,sizes,total" :page-sizes="[5,10]" :page-size="pageSize" :total="classMessageAry.length" @current-change="currentChange"
                     @size-change="sizeChange"></el-pagination>
    </div>
    <div>
      <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" center title="班级公告" width="20%">
        <div>
          <el-form>
            <el-form-item label="班级名称：">{{ clName }}</el-form-item>
            <el-form-item label="照片描述:">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="message"></el-input>
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
  name: 'ClassMessage',
  data () {
    return {
      classMessageAry: [],
      pageSize: 5,
      currPage: 1,
      dialogVisible: false,
      classAry: [],
      cId: '',
      clName: '',
      message: '',
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
      this.checkClassMessage()
    },
    //使用班级id获取班级名称
    getClName () {
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
    //dialog提交
    dialogSubmit () {
      if (this.message != '') {
        this.dialogVisible = false
        this.newClassMessage()
      } else {
        this.$message({
          showClose: true,
          message: '输入内容',
          type: 'error'
        })
      }

    },
    classMessageBtn () {
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
    //查询班级所有公告
    checkClassMessage () {
      this.$axios.get('teacher/checkClassMessage', {
        params: {
          classId: this.cId
        }
      }).then(response => {
        if (response.data != null) {
          this.classMessageAry = response.data
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
    //新增班级公告
    newClassMessage () {
      this.$axios.get('teacher/newClassMessage', {
        params: {
          classId: this.cId,
          text: this.message,
        }
      }).then(response => {
        if (response.data != null) {
          this.$message({
            showClose: true,
            message: response.data,
            type: 'success'
          })
          this.checkClassMessage()
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

  },

  mounted () {
    this.getClassName()
  },

}
</script>

<style scoped>

</style>
