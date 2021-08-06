<!--     <h1 style="font-family: 'Helvetica Neue',Helvetica,'PingFang SC',-->
<!--     'Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif; margin-left: auto">体检管理</h1>-->
<!--    <span style="margin-left: auto">班级名称:</span>-->
<!--    <button style="margin-left: 500px">新增体检情况</button>-->

<template>
<el-main>
   <div style="float: left">
     <h1>体检管理</h1>
     <span>班级名称:</span>
   </div>
  <el-button type="primary" style="margin-left: 600px" @click="insertClick()">新增体检情况</el-button>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :modal="false"
    :before-close="handleClose">
    <!--    <el-form>账号:<input type="text" v-model="uaccount"></el-form><br>-->
    <el-form >宝宝名称:<input type="text" v-model="babyname"></el-form><br>
    <el-form>身高:<input type="text" v-model="height"></el-form><br>
    <el-form>体重:<input type="text" v-model="weight"></el-form><br>
    <el-form>视力:<input type="text" v-model="eyesight"></el-form><br>
    <el-form>体温:<input type="text" v-model="temperature"></el-form><br>
    <el-form>健康情况:<input type="text" v-model="healthcondition"></el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibless = false">取 消</el-button>
    <el-button type="primary" @click="insert">确 定</el-button>
      <!--          //撒大声地-->
  </span>
  </el-dialog>

  <el-table
    :data="tableData"
    @selection-change="handleSizeChange"
    border
    style="width: 100%">

    <el-table-column
            fixed
            prop="babyheid"
            label="宝宝编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="babyname"
            label="宝宝名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="height"
            label="身高"
            width="80">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="体重"
            width="80">
          </el-table-column>
          <el-table-column
            prop="eyesight"
            label="视力"
            width="80">
          </el-table-column>
          <el-table-column
            prop="temperature"
            label="体温"
            width="80">
          </el-table-column>
          <el-table-column
            prop="healthcondition"
            label="健康状况"
            width="120">
          </el-table-column>
          <el-table-column
            prop="checkuptime"
            label="体检时间"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button type="primary" size="min" @click="undateClick(scope.row)" >修改</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibless"
                width="30%"
                :modal="false"
                :before-close="handleClose">
                <!--    <el-form>账号:<input type="text" v-model="uaccount"></el-form><br>-->
                <el-form >宝宝名称:<input type="text" v-model="questionForm.babyname"></el-form><br>
                <el-form>身高:<input type="text" v-model="questionForm.height"></el-form><br>
                <el-form>体重:<input type="text" v-model="questionForm.weight"></el-form><br>
                <el-form>视力:<input type="text" v-model="questionForm.eyesight"></el-form><br>
                <el-form>体温:<input type="text" v-model="questionForm.temperature"></el-form><br>
                <el-form>健康情况:<input type="text" v-model="questionForm.healthcondition"></el-form>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibless = false">取 消</el-button>
    <el-button type="primary" @click="sureClick">确 定</el-button>

  </span>
              </el-dialog>
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
   name:"Healthmanage",
   data() {
     return {
       questionForm: {
         babyheid: "",
         babyname:"",
         height: "",
         weight: "",
         eyesight: "",
         temperature: "",
         healthcondition: "",
       },
       dialogFormVisible: false,
       dialogVisible: false,
       dialogVisibless:false,
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
     handleCreate() {
       this.questionForm = {
         babyheid: "",
         babyname:"",
         height: "",
         weight: "",
         eyesight: "",
         temperature: "",
         healthcondition: "",
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
     getTableDate:function(val){
       // let that=this;
       this.$axios.get("Healthmanage/HealthmanageAll",{
         params:{
           page:val,
           pagesize:this.pagesize,
         },
       }).then(response=>{
         console.log(response.data)
         this.tableData = response.data;
       }).catch(error=>{
         console.log(error)
         //sdasd
       });
     },

     undateClick(row) {
       console.log("--------------------")
       console.log(row.babyname);
         this.dialogVisibless = true
       this.questionForm.babyheid = row.babyheid
       this.questionForm.babyname = row.babyname
       this.questionForm.height = row.height
       this.questionForm.weight = row.weight
       this.questionForm.eyesight = row.eyesight
       this.questionForm.temperature = row.temperature
       this.questionForm.healthcondition = row.healthcondition
       // this.$axios.get('Healthmanage/select', {}).then(response => {
       //   console.log(response.data)
       //   this.babyhealth = response.data
       // }).catch(error => {
       //   console.log(error)
       // })
     },
     sureClick (row) {
       this.dialogVisibless = false
       console.log(this.questionForm.babyheid)
       console.log(this.questionForm.babyname)
       console.log(this.questionForm.height)
       console.log(this.questionForm.weight )
       console.log(this.questionForm.eyesight)
       console.log(this.questionForm.temperature)
       console.log(this.questionForm.healthcondition)
       this.$axios.get('Healthmanage/update', {
         params: {
           babyheid: this.questionForm.babyheid,
           babyname: this.questionForm.babyname,
           height: this.questionForm.height,
           weight: this.questionForm.weight ,
           eyesight: this.questionForm.eyesight,
           temperature: this.questionForm.temperature,
           healthcondition: this.questionForm.healthcondition,
         },
       }).then(response => {
         console.log(response.data)
         this.getTableDate(1)
       }).catch(error => {
         console.log(error)
       })
     },
     insertClick (){
       this.$axios.get('Healthmanage/select', {
       }).then(response => {
         // console.log(response.data)
         // this.babyinf = response.data
         console.log(this.biname)
         this.dialogVisible = true
       }).catch(error => {
         console.log(error)
       })
     },
     insert (row) {
       this.dialogVisible = false
       console.log(this.babyname)
       console.log(this.height)
       console.log(this.weight)
       console.log(this.eyesight)
       console.log(this.temperature)
       console.log(this.healthcondition)
       this.$axios.get('Healthmanage/insert', {
         params: {
           babyname: this.babyname,
           height: this.height,
           weight: this.weight,
           eyesight: this.eyesight,
           temperature: this.temperature,
           healthcondition: this.healthcondition,

         },
       }).then(response => {
         console.log(response.data)

       }).catch(error => {
         console.log(error)
       })
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

<style scoped>

</style>
