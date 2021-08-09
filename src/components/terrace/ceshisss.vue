<template>
  <el-main>
    <div style="float: left">
      <font>查询条件</font>
      <font>菜单名称:<input v-model="mename" type="text"></font>
      <font>一级菜单:
        <select style="width: 180px;">
          <option value=""></option>
          <option v-for="(item,index) in one" v-model="onename" value="item.name">{{item.mename}}</option>
        </select>
      </font>

      <el-button @click="selectCondition(1)" type="primary" size="min">查询</el-button>

    </div>

    <el-table
      :data="this.tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="mepid"
        label="序号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="mename"
        label="菜单名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="meurl"
        label="URL"
        width="200">
      </el-table-column>
      <el-table-column
        prop="menames"
        label="上级菜单"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="min" @click="updateClick(scope.row)">修改</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :modal="false"
            :before-close="handleClose">
            <input type="hidden" v-model="umepid"><br>
            <el-form>菜单名称:<input type="text" v-model="umename"></el-form><br>
            <el-form>URL:<input type="text" v-model="umeurl"></el-form><br>
           <input type="hidden" v-model="umenames"><br>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="affirmClick">确 定</el-button>
  </span>
          </el-dialog>
          <!--          <el-button @click="updateClick(scope.row)" type="primary" size="min">修改</el-button>-->
          <el-button @click="handleClick(scope.row)" type="primary" size="min">删除</el-button>
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
        :total="55">
      </el-pagination>
    </div>

  </el-main>
</template>

<script>
  export default {
    name: 'ceshisss',
    data () {
      return {
        umepid:"",
        umename:'',
        umeurl:'',
        umenames:'',
        onename:"",
        one:[],
        mename : "",
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
        this.$axios.get('SafetyEducationInf/menuManagement', {
          params: {
            onename: this.onename,
            mename : this.mename,
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
        this.$axios.get('SafetyEducationInf/menuManagement', {
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
      // 一级菜单
      selectOne () {
        this.$axios.get('SafetyEducationInf/selectOne', {
        }).then(response => {
           console.log(response.data)
          this.one = response.data
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
        this.umepid = row.mepid
        this.umename= row.mename
          this.umeurl= row.meurl
          this.umenames= row.menames
        this.dialogVisible = true
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
        console.log(this.umepid)
        console.log(this.umename)
        console.log(this.umeurl)
        console.log(this.umenames)
        this.$axios.get('SafetyEducationInf/updateMenu', {
          params: {
            umepid : this.umepid,
            umename : this.umename,
            umeurl : this.umeurl,
            umenames : this.umenames,
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
      this.selectOne();
    }
  }

</script>

