<template>
  <el-main>
    <div style="float: left">
      <font>查询条件</font>
      <font>创建时间:<input type="text">至<input type="text"></font>
      <font>家长名称:<input type="text"></font>
      <el-button @click="" type="primary" size="min">查询</el-button>
      <el-button @click="newClick" type="primary" size="min">上传绘本</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibless"
        width="30%"
        :modal="false"
        :before-close="handleClose">
        <el-form>账号:<input type="text" v-model="uaccount"></el-form><br>
        <el-form >宝宝名:
          <select style="width: 180px;">
            <option v-for="(item,index) in babyinf" value="item.name">{{item.biname}}</option>
          </select>
        </el-form><br>
        <el-form>用户名:<input type="text" v-model="uname"></el-form><br>
        <el-form>工作:<input type="text" v-model="usite"></el-form><br>
        <el-form>地址:<input type="text" v-model="uwork"></el-form><br>
        <el-form>电话号码:<input type="text" v-model="uphone"></el-form><br>
        <el-form>亲子关系:<input type="text" v-model="uchildrelation"></el-form>
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
        prop="bookid"
        label="绘本编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="bookname"
        label="绘本名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="Folderaddress"
        label="文件夹地址"
        width="150">
      </el-table-column>
      <el-table-column
        prop="UploadTime"
        label="上传时间"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="400">
        <template slot-scope="scope">
          <el-button type="primary" size="min" @click="updateClick(scope.row)">查看绘本</el-button>
          <el-button @click="handleClick(scope.row)" type="primary" size="min">重新上传</el-button>
          <el-button @click="stateClick(scope.row)" type="primary" size="min">删除</el-button>
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
    name: 'ParentChildReading',
    data () {
      return {
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
        this.$axios.get('SafetyEducationInf/readInf', {
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
        console.log(row.uaccount)
        this.$axios.get('Terrace/delect', {
          params: {
            uaccount: row.uaccount,
          },
        }).then(response => {
          console.log(response.data)
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 禁用
      stateClick (row) {
        console.log(row.uaccount)
        this.$axios.get('Terrace/updateState', {
          params: {
            uaccount: row.uaccount,
            ustate: row.pname,
          },
        }).then(response => {
          console.log(response.data)

          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 新建用户
      newClick (){
        this.$axios.get('Terrace/selectBabyinf', {
        }).then(response => {
          // console.log(response.data)
          this.babyinf = response.data
          console.log(this.biname)
          this.dialogVisibless = true
        }).catch(error => {
          console.log(error)
        })
      },
      // 修改
      updateClick (row) {
        console.log(row.uaccount),
          this.dialogVisible = true
        this.questionForm.uaccount = row.uaccount
        this.questionForm.biname = row. biname
        this.questionForm.uname = row.uname
        this.questionForm.uwork = row.uwork
        this.questionForm.usite = row.usite
        this.questionForm.uphone = row.uphone
        this.questionForm.uchildrelation = row.uchildrelation
        this.$axios.get('Terrace/selectBabyinf', {
        }).then(response => {
          console.log(response.data)
          this.babyinf = response.data
        }).catch(error => {
          console.log(error)
        })
      },
      // 确认修改
      affirmClick (row) {
        this.dialogVisible = false
        console.log(this.questionForm.uaccount)
        console.log(this.questionForm.uname)
        console.log(this.questionForm.uwork)
        console.log(this.questionForm.usite)
        console.log(this.questionForm.uphone)
        console.log(this.questionForm.uchildrelation)
        this.$axios.get('Terrace/affirmClick', {
          params: {
            uname: this.questionForm.uname,
            uwork: this.questionForm.uwork,
            usite: this.questionForm.usite,
            uphone: this.questionForm.uphone,
            uchildrelation: this.questionForm.uchildrelation,
            uaccount: this.questionForm.uaccount,
          },
        }).then(response => {
          console.log(response.data)
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

