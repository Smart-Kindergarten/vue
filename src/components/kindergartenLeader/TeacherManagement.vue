<template>
<div>
  <div> <h1>教师管理</h1></div>
  <div>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="教师信息" name="first">
          <div style="width:auto">
            <h3 style="margin-left: -720px">查询条件:</h3><br>
            <el-input v-model="inputTeacher" placeholder="请输入教师名" class="text"></el-input>
            <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
            <el-button type="success" @click="checkTeacher">查询</el-button>
          </div>
          <div style="width: 800px;margin: 50px auto 0;">
            <el-table
              :data="this.tableData.slice((this.currPage - 1)*this.pageSize, this.currPage * this.pageSize)"
              style="width: 100%">
              <el-table-column
                prop="uid"
                label="教师编号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="uname"
                label="教师名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="upwd"
                label="角色"
                width="180">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true">编辑</el-button>

                  <el-dialog title="教师编辑" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="更改姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.changeName" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="更改角色" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="请选择角色">
                          <el-option label="教师" value="2"></el-option>
                          <el-option label="保健员" value="4"></el-option>
                          <el-option label="安防员" value="5"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="changeTeacher">确 定</el-button>
                    </div>
                  </el-dialog>

                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination background
                           layout="prev, pager, next, sizes, total"
                           :page-sizes="[5, 10, 20]"
                           :page-size="pageSize"
                           :total="tableData.length"
                           @current-change="handleCurrentChange"
                           @size-change="handleSizeChange">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="添加教师" name="second">
          <el-form :model="form" ref="ruleForm" class="demo-ruleForm">
          <div>
            <h2 style="margin: 0 auto">新增教师</h2><br>
            <div>
              <a style="font-size: 25px">教师名称：</a>
              <el-input v-model="form.uname" placeholder="请输入教师姓名" style="width: 300px"></el-input>
            </div>
            <div>
              <br><a style="font-size: 25px">设置账号：</a>
              <el-input v-model="form.uaccount" placeholder="请设置账号" style="width: 300px" @blur="inputBlur"></el-input>
            </div>
            <div style="margin-top: 20px">
             <div>
               <a style="font-size: 25px">角&ensp;&ensp;&ensp;&ensp;色:</a>
               <a>&ensp;&ensp;</a>
                <el-radio-group v-model="radio">
                  <el-radio-button label="班主任"></el-radio-button>
                  <el-radio-button label="保健员"></el-radio-button>
                  <el-radio-button label="安防员"></el-radio-button>
                </el-radio-group>
               <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
              </div>
              <div style="margin-top: 20px">
                <el-button type="success" round @click="upTeacher">添加</el-button>
                <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
                <el-button type="warning" round>清空</el-button>
              </div>
            </div>
          </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</div>
</template>
<script>
export default {
  name: 'TeacherManagement',
  data () {
    return {
      dialogFormVisible : false,
      inputTeacher:'',
      radio: '',
      activeName: 'first',
      tableData: [],
      pageSize: 5,
      currPage: 1,
      checkUp:'',
      upTeacherDate:'',
      form:{
        uname:'',
        uaccount:'',
        changeName:'',
        region:'',
        tid:''
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.$axios.get('select').then(response => {
      console.log(response)
      this.tableData = response.data
    })
      .catch(error => {
        console.log(error)
      })
  },
  methods:{

    handleEdit(index,row){
      this.form.tid=row.uid
    },

    checkTeacher(){
      this.$axios.get('selectTeacher',{
        params:{
          uname:this.inputTeacher
        }
      }).then(response=>{
        this.tableData = []
        console.log(response)
        this.tableData = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    changeTeacher(){//编辑老师
      this.$axios.get('upDateTeacher',{
        params:{
          ures1:this.form.tid,
          uname:this.form.changeName,
          ures2:this.form.region
        }
      }).then(response=>{
        this.checkUp = response.data
        if (this.checkUp==="成功"){
          this.$notify({
            title: '成功',
            message: '更改成功!',
            type: 'success',
            duration: 0
          });
          this.$axios.get('select').then(response => {
            console.log(response)
            this.tableData = response.data
          })
            .catch(error => {
              console.log(error)
            })
        }else {
          this.$notify({
            title: '警告!',
            message: '更改失败！',
            duration: 0
          });
        }
      }).catch(error => {
        console.log(error)
      })
      this.dialogFormVisible = false
    },
    // =========================================================

    handleDelete(index,row){//删除老师
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('deleteTeacher',{
          params:{
            id:row.uid
          }
        }).then(response=>{
          this.checkUp = response.data
          if (this.checkUp==='成功'){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          this.$axios.get('select').then(response => {
            console.log(response)
            this.tableData = response.data
          })
            .catch(error => {
              console.log(error)
            })
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // =========================================================
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCurrentChange: function (cPage) {
      this.currPage = cPage
    },
    handleSizeChange: function (val) {
      this.pageSize = val
    },
    inputBlur(){
      this.$axios.get('checkAcc',{
        params:{
          uaccount:this.form.uaccount
        }
      }).then(response=>{
        console.log('--------------------')
        this.checkUp = response.data
        if (this.checkUp==="已注册"){
          this.$notify({
            title: '警告!',
            message: '该账号已使用！',
            duration: 0
          });
          this.form.uaccount=''
        }else if (this.checkUp==="未注册") {
          this.$notify({
            title: '成功',
            message: '该账号未使用!',
            type: 'success',
            duration: 0
          });
        }else if (this.checkUp==="错误"){

        }
      }).catch(error => {
        console.log(error)
      })
    },

    // =========================================================
    upTeacher(){
      if (this.form.uname===""){
        this.$message({
          message: '警告！姓名不可为空！',
          type: 'warning'
        });
      }else if (this.radio===""){
        this.$message({
          message: '警告！账号不可为空！',
          type: 'warning'
        });
      }else if (this.form.uaccount===""){
        this.$message({
          message: '警告！请选择角色！',
          type: 'warning'
        });
      }else {
        this.$axios.get('upTeacher',{
          params:{
            uname:this.form.uname,
            ures1:this.radio,
            uaccount:this.form.uaccount
          }
        }).then(response=>{
          console.log('--------------------')
          this.upTeacherDate = response.data
          if (this.upTeacherDate==="成功"){
            this.$notify({
              title: '成功',
              message: '上传成功!账号：'+this.form.uaccount+'密码：123456',
              type: 'success',
              duration: 0
            });
            this.form.uname = '',
            this.radio = '',
            this.form.uaccount = ''
          }else {
            this.$notify({
              title: '警告!',
              message: '上传失败！',
              duration: 0
            });
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>
<style scoped>
.text{
  width: 500px;
}
</style>
