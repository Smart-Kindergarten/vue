<template>
  <el-container>
    <el-header>
      <div style="
        width: 200px;
        float: left;">
        <el-input
          placeholder="宝宝姓名"
          v-model="BabyName"
          @blur="Query()"
          clearable>
        </el-input>
      </div>
      <el-select
        v-model="classname"
        filterable
        remote
        :remote-method="getClassBaby"
        :clearable="clearable"
        loading-text="正在加载班级，请稍后"
        @change="Query"
        :loading="loading"
        placeholder="请输入班级"
        style="
        width: 200px;
        float: left;
        margin-left: 20px;">

        <el-option v-for="item in options"
                   :key="item.classID"
                   :label="item.classBabyName"
                   :value="item.classID"></el-option>
      </el-select>
    </el-header>
    <el-main>
      <el-table
        height="300px"
        :fit="true"
        :data="tableData"
        border
        style="width: 750px">
        <el-table-column
          prop="bid"
          label="宝宝编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="bname"
          label="宝宝姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="className"
          label="宝宝班级"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uname"
          label="班主任"
          width="120">
        </el-table-column>
        <el-table-column
          prop="bisex"
          label="性别">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
<!--            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
<!--            <el-button type="text" size="small">编辑</el-button>-->
            <el-button @click="$emit('addTab',[scope.row.bid,scope.row.bname])">
              接送信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "SecurityGuard-Pick-Query",
        data(){
          return{
            fit:true,
            loading:false,
            clearable:true,
            classname:'',
            options:[],
            BabyName:'',
            tableData:[],
            classfilterable:true,
            classremote:true,
            testing:{
              BName:'',
              CID:''
            }
          }
        },
        methods:{
          getClassBaby(query){
            this.loading = true;
            var thon = this;
            let datas = {
              CName:query
            }
            this.$axios({
              method: 'post',
              data:this.$qs.stringify(datas),
              url: '/Security/GetBabyClass',
            }).then(function (response) {
              thon.options = response.data
              thon.loading = false;
            })
          },
          getBate(){
            var thon = this;
            this.$axios({
              method: 'post',
              url: '/Security/GetBaby',
            }).then(function (response) {
              thon.tableData = response.data
            })
          },
          Query(index){
            var ABName = this.BabyName;
            var classname = this.classname;
            if(this.testing.BName != ABName || this.testing.CID != classname){
              this.testing.BName = ABName
              this.testing.CID = classname
              var thon = this;
              let data = {
                Bname:ABName,
                CID:classname
              }
              this.$axios.post('/Security/GetBaby',this.$qs.stringify(data)).then(function (response) {
                thon.tableData = response.data
              })
            }
          }
        },
        mounted() {
          this.getBate();
        }
    }
</script>

<style>
  .el-calendar-table__row{
    height: 150px;
  }
  .prev{
    width: 210px;
  }
  .el-calendar-day{
    height: 100%;
    width: 100%;
  }
</style>
