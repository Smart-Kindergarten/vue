<template>
  <el-main>
    <el-table
      :data="this.tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="checkuptime"
        label="体检时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="height"
        label="身高"
        width="120">
      </el-table-column>
      <el-table-column
        prop="weight"
        label="体重"
        width="120">
      </el-table-column>
      <el-table-column
        prop="eyesight"
        label="视力"
        width="120">
      </el-table-column>
      <el-table-column
        prop="temperature"
        label="体温"
        width="180">
      </el-table-column>
      <el-table-column
        prop="healthcondition"
        label="健康状况"
        width="120">
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
    name: 'Health',
    data() {
      return {
        User: this.$route.params.Userid,
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
        this.$axios.get("Health/HealthAll",{
          params:{
            page:val,
              uaccount: this.User,
          },
        }).then(response=>{
          console.log(response.data)
          this.tableData = response.data;
        }).catch(error=>{
          console.log(error)
          //sdasd
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

