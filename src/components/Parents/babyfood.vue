<template>
  <el-main>
    <div style="float: left">
      <h1>宝宝膳食</h1><br>
      <span style="float: left;margin-left: 300px">宝宝姓名:</span>
      <span style="margin-left: 300px">性别:</span>

    </div>
    <el-table
      :data="tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="ftime"
        label="餐别"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fone"
        label="周一"
        width="150">
      </el-table-column>
      <el-table-column
        prop="ftow"
        label="周二"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fthree"
        label="周三"
        width="150">
      </el-table-column>
      <el-table-column
        prop="ffour"
        label="周四"
        width="150">
      </el-table-column>
      <el-table-column
        prop="ffive"
        label="周五"
        width="150">
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
    name: 'babyfood',
    data () {
      return {
        dialogFormVisible: false,
        dialogVisible: false,
        // dialogVisibless:false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage: 1,
        pagesize: 3,
        tableData: [],

      }

    },
    methods: {
      getTableDate: function (val) {
        // let that=this;
        this.$axios.get('FootManage/selectAll', {
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
