<template>

  <el-main>
    <div style="float: left">
      <font>查询条件</font>
      <font>创建时间:<input v-model="bgtime" type="text">至<input v-model="overtime" type="text"></font>
      <font>资讯名称:<input v-model="nameT" type="text"></font>
      <el-button @click="selectCondition(1)" type="primary" size="min">查询</el-button>
      <el-button @click="newClick" type="primary" size="min">新增</el-button>
      <el-button @click="reptile" type="primary" size="min">开始爬虫</el-button>
      <el-dialog
        title="新增资讯"
        :visible.sync="dialogVisibless"
        width="30%"
        :modal="false"
        :before-close="handleCloses">
        <el-form>资讯类型：<select v-model="types">
          <option>亲子</option>
          <option>交通</option>
        </select></el-form>

        <el-form>资讯名称:<input v-model="ttid"></input></el-form>
        <br>

        <el-form>资讯内容: <br><textarea v-model="iftcontent" style="width: 300px;height: 200px"></textarea></el-form>
        <br>

        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibless = false">取 消</el-button>
    <el-button type="primary" @click="affirmAdd">确 定</el-button>
          <!--          //撒大声地-->
  </span>
      </el-dialog>
    </div>

    <el-table
      :data="this.tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="ttid"
        label="资讯编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="iftcontent"
        label="公告名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="Createtime"
        label="公告内容"
        width="400">
      </el-table-column>
      <el-table-column
        prop="reserve1"
        label="创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="min" @click="updateClick(scope.row)">修改</el-button>
          <el-button @click="handleClick(scope.row)" type="primary" size="min">删除</el-button>
          <el-button @click="stateClick(scope.row)" type="primary" size="min">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogs"
      width="30%"
      :modal="false"
      :before-close="handleClose">
      <el-form>资讯编号:<input type="text" v-model="ttid"></el-form>

      <el-form>资讯名称:<input v-model="iftcontent"></input></el-form>
      <br>

      <el-form>资讯内容: <br><textarea v-model="iftcontent" style="width: 300px;height: 200px"></textarea></el-form>
      <br>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogs = false">取 消</el-button>
    <el-button type="primary" @click="affirmClick()">确 定</el-button>
  </span>
    </el-dialog>
  </el-main>
</template>

<script>
  export default {
    name: 'TerraceInformation',
    data () {
      return {
        nameT: '',
        bgtime: '',
        overtime: '',
        types: '',
        ttid: '',
        iftcontent: '',
        Createtime: '',
        questionForm: {
          uaccount: '',
          biname: '',
          uname: '',
          uwork: '',
          usite: '',
          uphone: '',
          uchildrelation: '',
        },
        dialogFormVisible: false,
        dialogVisible: false,
        dialogVisibless: false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage: 1,
        pagesize: 5,
        dialogs: false,
        maxlengrh: 0,
        tableData: [],
        babyinf: [
          {
            biname: ''
          },
        ],
        biname: [],
      }

    },
    methods: {

      reptile: function (val) {
        // let that=this;
        this.$axios.get('SafetyEducationInf/reptile', {
          params: {},
        }).then(response => {
          console.log(response.data)
          this.getTableDate(1)
          this.$message({
            showClose: true,
            message: '爬虫成功',
            type: 'success'
          })
        }).catch(error => {
          console.log(error)
          //sdasd
        })

      },
      selectCondition: function (val) {
        // let that=this;
        this.$axios.get('SafetyEducationInf/TerraceInf', {
          params: {
            Createtime: this.bgtime,
            Createtimes: this.overtime,
            iftcontent: this.nameT,
            page: val,
          },
        }).then(response => {
          console.log(response.data)
          this.tableData = response.data
          this.maxlengrh = response.data.length
          this.$message({
            showClose: true,
            message: '查询成功',
            type: 'success'
          })
        }).catch(error => {
          console.log(error)
          //sdasd
        })

      },
      handleCreate () {
        this.questionForm = {
          uaccount: '',
          biname: '',
          uname: '',
          uwork: '',
          usite: '',
          uphone: '',
          uchildrelation: '',
        }
        this.dialogFormVisible = true
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      handleCloses (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      getTableDate: function (val) {
        // let that=this;
        this.$axios.get('SafetyEducationInf/TerraceInf', {
          params: {
            page: val,
          },
        }).then(response => {
          console.log(response.data)
          this.tableData = response.data
          this.maxlengrh = response.data.length
        }).catch(error => {
          console.log(error)
          //sdasd
        })
      },
      // 删除
      handleClick (row) {
        console.log(row.ttid)
        this.$axios.get('SafetyEducationInf/delectTerraceInf', {
          params: {
            ttid: row.ttid,
          },
        }).then(response => {
          console.log(response.data)
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 发布
      stateClick (row) {
        this.$axios.get('SafetyEducationInf/issue', {
          params: {
            ttid: row.ttid,
          },
        }).then(response => {
          this.$message({
            showClose: true,
            message: '发布成功',
            type: 'success'
          })
          console.log(response.data)
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 新增资讯
      newClick () {
        this.dialogVisibless = true
      },
      // 修改
      updateClick (row) {
        this.dialogs = true
        this.ttid = row.ttid
        this.iftcontent = row.Createtime
        this.Createtime = row.iftcontent

        // this.$axios.get('Terrace/selectBabyinf', {
        // }).then(response => {
        //   console.log(response.data)
        //   this.babyinf = response.data
        // }).catch(error => {
        //   console.log(error)
        // })
      },
      // 确认修改
      affirmClick () {
        console.log('qqq')
        this.dialogs = false
        this.$axios.get('SafetyEducationInf/updateTerraceInf', {
          params: {
            ttid: this.ttid,
            iftcontent: this.iftcontent,
            Createtime: this.Createtime,
          },
        }).then(response => {
          console.log(response.data)
          this.getTableDate(1)
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.log(error)
        })
      },
      // 确认新增
      affirmAdd () {
        this.$axios.get('SafetyEducationInf/addTerraceInf', {
          params: {
            ttid: this.ttid,
            iftcontent: this.iftcontent,
            types: this.types,
          },
        }).then(response => {
          this.$message({
            showClose: true,
            message: '新增成功',
            type: 'success'
          })
          this.babyinf = response.data
          this.getTableDate(1)
          this.dialogVisibless = false
        }).catch(error => {
          console.log(error)
        })
      },
      //分页
      handleSizeChange: function (val) {
        console.log(`每页 ${val} 条`)
        this.getTableDate(val)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.getTableDate(val)
      }
    },
    mounted () {
      this.getTableDate(1)
    }
  }

</script>

