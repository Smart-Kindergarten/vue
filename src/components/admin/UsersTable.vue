<template>
      <el-main>
  <el-table
    :data="this.tableData"
    @selection-change="handleSizeChange"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="adname"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="ROLE"
      label="职业"
      width="120">
    </el-table-column>
    <el-table-column
      prop="adaccount"
      label="账号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="STATE"
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="adpwd"
      label="密码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="adaccount"
      label="账号"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
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
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage:1,
        pagesize:5,
        tableData: [
        ],
      }


    },
    methods: {
      getTableDate:function(val){
        // let that=this;
        this.$axios.get("AdminUserServlet?action=LoginS",{
          params:{
            currentPage:val,
          },
        }).then(response=>{
          console.log(response.data)
          this.tableData = response.data.data;
        }).catch(error=>{
          console.log(error)
        });
      },
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange:function(val) {
        console.log(`每页 ${val} 条`);
        this.getTableDate(val);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getTableDate(val);
      }
    },
    mounted () {
      this.getTableDate(1);
    }
  }
</script>
