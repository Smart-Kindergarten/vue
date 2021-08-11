<template>
  <el-main>
    <div style="float: left">
      <div style="height: 40px;font-size: 30px">膳食表</div>
    </div>

    <el-table
      :data="this.tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="ftime"
        label="餐别"
        width="80">
      </el-table-column>
      <el-table-column
        prop="fone"
        label="星期一"
        width="100">
      </el-table-column>
      <el-table-column
        prop="ftow"
        label="星期二"
        width="200">
      </el-table-column>
      <el-table-column
        prop="fthree"
        label="星期三"
        width="200">
      </el-table-column>
      <el-table-column
        prop="ffour"
        label="星期四"
        width="200">
      </el-table-column>
      <el-table-column
        prop="ffive"
        label="星期五"
        width="200">
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
      <el-button @click="last">上一周</el-button>
      <el-button @click="last">下一周</el-button>
    </div>
  </el-main>



</template>

<script>
  export default {
    name: 'LookBabyFood',
    data () {
      return {

        nameT : "",
        bgtime : "",
        overtime: "",
        delectid : "",
        lookfrid : "",
        lookbookname :"",
        lookcontent :"",
        lookpagess :"",
        frid : "",
        Folderaddress :"",
        bookname :"",
        booknames : "",
        content :"",
        reserve2 : "",
        pagess :"",
        questionForm: {
          myphotos: "",
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
        dialogVisibles : false,
        dialogVisiblesss:false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage: 1,
        pagesize: 3,
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
      // 多条件查询
      selectCondition: function (val) {
        // let that=this;
        this.$axios.get('SafetyEducationInf/readInf', {
          params: {
            UploadTime : this.bgtime,
            UploadTimes: this.overtime,
            bookname : this.nameT,
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



      getTableDate: function (val) {
        // let that=this;
        this.$axios.get('Health/lookFood', {
          params: {
            page: val,
          },
        }).then(response => {
          console.log(response.data)
          this.tableData = response.data
          // this.maxlengrh = response.data.length
        }).catch(error => {
          console.log(error)
          //sdasd
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

