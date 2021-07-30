<template>
  <el-container>
    <el-header>
      <div style="
        width: 200px;
        float: left;">
        <el-input
          placeholder="宝宝姓名"
          v-model="BabyName"
          clearable>
        </el-input>
      </div>
      <el-select
        v-model="classname"
        :filterable="classfilterable"
        :remote="classremote"
        :clearable="clearable"
        loading-text="正在加载班级，请稍后"
        :remote-method="Query"
        :loading="loading"
        placeholder="请输入班级"
        style="
        width: 200px;
        float: left;
        margin-left: 20px;">

        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"></el-option>
      </el-select>
    </el-header>
    <el-main>
      <el-table
        :fit="true"
        :data="tableData"
        border
        style="width: 750px">
        <el-table-column
          prop="babyID"
          label="宝宝编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="babyName"
          label="宝宝姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="babyClass"
          label="宝宝班级"
          width="120">
        </el-table-column>
        <el-table-column
          prop="headmaster"
          label="班主任"
          width="120">
        </el-table-column>
        <el-table-column
          prop="Gender"
          label="性别">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
<!--            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
<!--            <el-button type="text" size="small">编辑</el-button>-->
            <el-button @click="$emit('addTab',[scope.row.babyID,scope.row.babyName])">
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
            options:[{
                label:'label1',
                value:'value1'
              }],
            BabyName:'',
            tableData:[{
              babyID:1,
              babyName:'宝宝一号',
              babyClass:'宝宝班级',
              headmaster:'宝宝班主任',
              Gender:'女',
            },{
              babyID:2,
              babyName:'宝宝二号',
              babyClass:'宝宝班级',
              headmaster:'宝宝班主任',
              Gender:'女',
            }
            ],
            classfilterable:true,
            classremote:true
          }
        },
        methods:{
          Query(query){
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options = [{
                  label:'label1',
                  value:'value1'
                }]
            },500)
          }
        }
    }
</script>

<style scoped>

</style>
