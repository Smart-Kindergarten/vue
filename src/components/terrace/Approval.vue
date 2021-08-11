<template>
  <el-main>
    <div style="float: left">
      <font>查询条件</font>
      <font>审批时间:<input v-model="bgtime" type="text">至<input v-model="overtime" type="text"></font>
      <font>园所名称:<input v-model="nameT" type="text"></font>
      <el-button @click="selectCondition(1)" type="primary" size="min">查询</el-button>
    </div>

    <el-table
      :data="this.tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="ID"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="schoolName"
        label="园所名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="saccount"
        label="账号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="EnrolmentTime"
        label="审批时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="starta"
        label="状态"
        width="80">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="400">
        <template slot-scope="scope">
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :modal="false"
            :before-close="handleClose">
           <input type="text" v-model="schoolID"><br>
            <el-form>园所名称:<input type="text" v-model="schoolname"></el-form><br>
            <el-form>园所账号:<input type="text" v-model="schoolacc"></el-form><br>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="affirmClick">确 定</el-button>
  </span>
          </el-dialog>
          <!--          <el-button @click="updateClick(scope.row)" type="primary" size="min">修改</el-button>-->
          <el-button @click="forbidden(scope.row)" type="primary" size="min">禁用</el-button>
          <el-button @click="resetpwd(scope.row)" type="primary" size="min">重置密码</el-button>
          <el-button @click="handleClick(scope.row)" type="primary" size="min">修改</el-button>
          <el-button @click="delectID(scope.row)" type="primary" size="min">删除</el-button>
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

  </el-main>
</template>

<script>
  export default {
    name: 'Approval',
    data () {
      return {
        schoolID :"",
        schoolname :"",
        schoolacc :"",
        nameT : "",
        bgtime : "",
        overtime: "",
        questionForm: {
          uaccount: "",
          biname:"",
          uname: "",
          uwork: "",
          usite: "",
          uphone: "",
          uchildrelation: "",
        },
        dialogFormVisible: false,
        dialogVisible: false,
        dialogVisibless:false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage: 1,
        pagesize: 5,
        maxlengrh: 0,
        tableData: [],
        babyinf:[
          {
            biname:""
          },
        ],
        biname:[],
      }

    },
    methods: {
      selectCondition: function (val) {
        // let that=this;
        this.$axios.get('SafetyEducationInf/selectSchool', {
          params: {
            biadtime : this.bgtime,
            biadtimes: this.overtime,
            uname : this.nameT,
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
      handleCreate() {
        this.questionForm = {
          uaccount: "",
          biname:"",
          uname: "",
          uwork: "",
          usite: "",
          uphone: "",
          uchildrelation: "",
        };
        this.dialogFormVisible = true;
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      getTableDate: function (val) {
        // let that=this;
        this.$axios.get('SafetyEducationInf/selectSchool', {
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
      delectID (row) {
        console.log(row.uaccount)
        this.$axios.get('SafetyEducationInf/delectID', {
          params: {
            ID: row.ID,
          },
        }).then(response => {
          console.log(response.data)
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 禁用
      forbidden (row) {
        console.log(row.uaccount)
        this.$axios.get('SafetyEducationInf/forbidden', {
          params: {
            starta : row.starta,
            ID: row.ID,
          },
        }).then(response => {
          console.log(response.data)
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 重置密码
      resetpwd (row){
        this.$axios.get('SafetyEducationInf/resetpwd', {
          params: {
            ID: row.ID,
          },
        }).then(response => {
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 修改
      handleClick (row) {
        this.dialogVisible = true
        this.schoolname = row.schoolName
        this.schoolacc = row.saccount
        this.schoolID = row.ID

      },
      // 确认修改
      affirmClick (row) {
        this.dialogVisible = false
        this.$axios.get('SafetyEducationInf/updateID', {
          params: {
            schoolname :  this.schoolname,
            schoolacc : this.schoolacc,
            ID :this.schoolID,
          },
        }).then(response => {
          console.log(response.data)
          this.babyinf = response.data
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 确认新增
      affirmAdd (row) {
        this.dialogVisibless = false
        console.log(this.uaccount)
        console.log(this.uname)
        console.log(this.uwork)
        console.log(this.usite)
        console.log(this.uphone)
        console.log(this.uchildrelation)
        this.$axios.get('Terrace/affirmAdd', {
          params: {
            uaccount: this.uaccount,
            uname: this.uname,
            uwork: this.uwork,
            usite: this.usite,
            uphone: this.uphone,
            uchildrelation: this.uchildrelation,

          },
        }).then(response => {
          console.log(response.data)

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

