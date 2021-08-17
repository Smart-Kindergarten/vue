<template>
  <el-main>
    <div style="float: left">
      <font>查询条件:</font>
      <font>申请时间:<input v-model="begintime" type="text">至<input v-model="overtime" type="text"></font>
      <font>状态:<select  v-model="types">
        <option>未审批</option>
        <option>未通过</option>
        <option>通过审批</option></select></font><br>
      <font>园所名称:<input v-model="sname" type="text"></font>
      <el-button @click="Enquiry(1)" type="primary" size="min">查询</el-button>
    </div>
    <el-table
      :data="this.tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="ID"
        label="园所编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="schoolName"
        label="园所名称"
        width="80">
      </el-table-column>
      <el-table-column
        prop="applicationDeadline"
        label="申请时间"
        width="80">
      </el-table-column>
      <el-table-column
        prop="EnrolmentTime"
        label="审批时间"
        width="80">
      </el-table-column>
      <el-table-column
        prop="type"
        label="状态"
        width="80">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="260">
        <template slot-scope="scope">
          <el-button type="primary" size="min" @click="examine(scope.row)">审批</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :modal="false"
            :before-close="handleClose">
            <input type="hidden" v-model="IDs"></input>
            <el-form>幼儿园名称:<input type="text" v-model="questionForm.schoolName"></el-form><br>
            <el-form>法人:<input type="text" v-model="questionForm.legalPerson"></el-form><br>
            <el-form>法人身份证:<input type="text" v-model="questionForm.legalPersonId"></el-form><br>
            <el-form>地址:<input type="text" v-model="questionForm.address"></el-form><br>
            <el-form>联系电话:<input type="text" v-model="questionForm.TLE"></el-form><br>
            <el-form>办学许可证:<input type="text" v-model="questionForm.schoolPermit"></el-form><br>
            <el-form>卫生许可证:<input type="text" v-model="questionForm.hygienicLicense"></el-form><br>
            <el-form>消防许可证:<input type="text" v-model="questionForm.firePermit"></el-form><br>
            <el-form>组织代码证:<input type="text" v-model="questionForm.organizationPermit"></el-form><br>
            <el-form>税务登记证:<input type="text" v-model="questionForm.TaxPermit"></el-form><br>
            <span slot="footer" class="dialog-footer">
    <el-button @click="refuse">拒 绝</el-button>
    <el-button type="primary" @click="permit">允 许</el-button>
  </span>
          </el-dialog>
          <!--          <el-button @click="updateClick(scope.row)" type="primary" size="min">修改</el-button>-->
<!--          <el-button @click="handleClick(scope.row)" type="primary" size="min">删除</el-button>-->
<!--          <el-button @click="stateClick(scope.row)" type="primary" size="min">禁用</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </div>

  </el-main>
</template>

<script>
  export default {
    name: 'intelligence',
    data () {
      return {
        IDs :"",
        questionForm: {
          overtime:"",
          begintime:"",
          types:"",
          sname:"",
          ID: "",
          schoolName:"",
          applicationDeadline: "",
          EnrolmentTime: "",
          type: "",

        },
        dialogFormVisible: false,
        dialogVisible: false,
        // dialogVisibless:false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage: 1,
        pagesize: 5,
        tableData: [],

      }

    },
    methods: {
      handleCreate() {
        this.questionForm = {
          ID: "",
          schoolName:"",
          applicationDeadline: "",
          EnrolmentTime: "",
          type: "",
        };
        this.dialogFormVisible = true;
      },
      handleClick(row) {
        console.log(row);
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
        this.$axios.get('intelligence/intelligenceAll', {
          params: {
            page:val,
            pagesize:this.pagesize,
          },
        }).then(response => {
          console.log(response.data)
          this.tableData = response.data
        }).catch(error => {
          console.log(error)
          //sdasd
        })
      },
      Enquiry: function (val) {
        console.log("-----------------");
        console.log(this.begintime)
        console.log(this.overtime)
        console.log(this.types)
        console.log(this.sname)

        // let that=this;
        this.$axios.get('intelligence/select', {
          params: {
            applicationDeadline : this.begintime,
            applicationDeadlines : this.overtime,
            type : this.types,
            schoolName:this.sname,
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
      examine(row) {
        this.IDs = row.ID
        console.log("--------------------")
        this.dialogVisible = true
        this.questionForm.schoolName = row.schoolName
        this.questionForm.legalPerson = row.legalPerson
        this.questionForm.legalPersonId = row.legalPersonId
        this.questionForm.address = row.address
        this.questionForm.TLE = row.TLE
        this.questionForm.schoolPermit = row.schoolPermit
        this.questionForm.hygienicLicense = row.hygienicLicense
        this.questionForm.firePermit = row.firePermit
        this.questionForm.organizationPermit = row.organizationPermit
        this.questionForm.TaxPermit = row.TaxPermit
        // this.$axios.get('Healthmanage/select', {}).then(response => {
        //   console.log(response.data)
        //   this.babyhealth = response.data
        // }).catch(error => {
        //   console.log(error)
        // })
      },
      refuse (row) {
        console.log("------------------");
        this.dialogVisible = false
        // console.log(this.questionForm.babyheid)
        // console.log(this.questionForm.babyname)
        // console.log(this.questionForm.height)
        // console.log(this.questionForm.weight )
        // console.log(this.questionForm.eyesight)
        // console.log(this.questionForm.temperature)
        // console.log(this.questionForm.healthcondition)

        this.$axios.get('intelligence/update', {

          params: {
            ID:this.IDs,
          },

        }).then(response => {
          console.log(response.data)
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      permit(row){
        this.dialogVisible = false
        this.$axios.get('intelligence/updateAll', {

          params: {
            ID:this.IDs,
          },

        }).then(response => {
          console.log(response.data)
          this.getTableDate(1)
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

<style scoped>

</style>
