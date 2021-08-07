<template>
  <div>
    <div><H1>班级管理</H1></div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>班级成员管理</span>
          <div style="">
            <div>
              <h2>查询条件:&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a></h2><br>
              <a style="font-size: 20px">创建时间:</a>
              <el-date-picker
                v-model="pDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="timestamp"
              >
              </el-date-picker>
              <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
              <el-button type="primary" @click="checkBaby">查询</el-button>
            </div>
            <div style="margin-top: 9px">
              <a style="font-size: 20px">宝宝名称:</a>
              <el-input v-model="pName" placeholder="请输入内容" style="width: 350px"></el-input>
              <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
            </div>
            <div style="margin-top: 9px">
              <a style="font-size: 20px">班级名称:</a>
              <el-input v-model="className" placeholder="请输入内容" style="width: 350px"></el-input>
              <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
              <el-button type="primary" @click="add">新增</el-button>
            </div>
          </div>
          <div style="margin: 50px auto 0;">
            <el-table
              :data="this.tableData.slice((this.currPage - 1)*this.pageSize, this.currPage * this.pageSize)"
              style="width: 100%">
              <el-table-column
                prop="biid"
                label="成员编号"
                width="200"
                 >
              </el-table-column>
              <el-table-column
                prop="biname"
                label="宝宝名字"
                width="200">
              </el-table-column>
              <el-table-column
                prop="className"
                label="班级名称"
                width="200">
              </el-table-column>
              <el-table-column
                prop="uname"
                label="班主任"
                width="200">
              </el-table-column>
              <el-table-column
                prop="creationTime"
                label="创建时间"
                width="200">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true">编辑</el-button>
                  <el-dialog title="修改成员" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="*备注信息" >
                        <el-alert
                          title="若修改宝宝班级，请选择修改宝宝，若修改班级班主任，请选择修改班主任"
                          type="success"
                          :closable="false">
                          <el-switch
                            style="display: block"
                            v-model="value2"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="修改宝宝"
                            inactive-text="修改班主任"
                            @change="chooser">
                          </el-switch>
                        </el-alert>
                      </el-form-item>
                      <el-form-item label="宝宝名称" >
                        <el-select
                          v-model="form.BName"
                          placeholder="请选择宝宝"
                          style="width: 70%">
                          <el-option
                            v-for="item in form.bName"
                            :key="item.biid"
                            :value="item.biname+form.ty+item.biid"
                            :label='item.label'></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="班级名称" >
                        <el-select
                          v-model="form.Class"
                          placeholder="请选择班级"
                          style="width: 70%">
                          <el-option
                            v-for="item in form.class"
                            :key="item.classId"
                            :value="item.className+form.ty+item.classId"
                            :label='item.label'
                            @click.native="handleEdit"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="班主任名" >
                        <el-select
                          v-model="form.Teacher"
                          placeholder="请选择班主任"
                          style="width: 70%">
                          <el-option
                            v-for="item in form.teacher"
                            :key="item.uid"
                            :value="item.uid+form.ty+item.uname"
                            :label='item.label'
                            @click.native="handleEdit"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="changeClass">确 定</el-button>
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
        <el-tab-pane label="班级管理">
        </el-tab-pane>


      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassManagement',
  data(){
    return {
      formLabelWidth: '120px',
      dialogFormVisible : false,
      pDate:'',
      pName:'',
      className:'',
      tableData: [],
      pageSize: 5,
      currPage: 1,
      value2: true,
      display: true,
      form:{
        BName:'',
        Teacher:'',
        Class:'',
        bName:[],
        class:[],
        teacher:[],
        ty:'-',
      }
    }
  },
  mounted () {
    this.$axios.get('checkAllClass').then(response => {
      this.tableData = response.data
    })
      .catch(error => {
        console.log(error)
      })

  },
  methods: {
    handleCurrentChange: function (cPage) {
      this.currPage = cPage
    },
    handleSizeChange: function (val) {
      this.pageSize = val
    },
    checkBaby(){
      alert("!!!!!!!!!!!!!!")
    },
    handleEdit(index,row){
      this.form.Teacher = ''
      this.form.BName = row.biname+"-"+row.biid
      this.$axios.get('selectAllBaby').then(response => {
        this.form.bName = response.data
      }).catch(error => {
        console.log(error)
      })
      this.$axios.get('selectClass').then(response => {
        this.form.class = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    handleDelete(index,row){
      alert("删除")
    },
    changeClass(){
      if (this.value2==true){
        if (this.form.BName!==''&&this.form.Class!==''){
          this.$axios.get('upDateBabyClass',{
            params:{
              baby:this.form.BName,
              changeClass:this.form.Class
            }
          }).then(response=>{
            if (response.data=='成功'){
              this.form.BName=''
              this.form.Class=''
              this.$axios.get('checkAllClass').then(response => {
                this.tableData = response.data
              })
                .catch(error => {
                  console.log(error)
                })
              this.dialogFormVisible = false,
              this.value2==true,
              this.$notify({
                title: '成功',
                message: '修改成功！',
                type: 'success'
              });
            }else {
              this.$notify.error({
                title: '错误',
                message: '修改失败'
              });
            }
          }).catch(error => {
            console.log(error)
          })
        }else {
          if (this.form.BName===''){
            this.$notify({
              title: '警告',
              message: '更改宝宝班级时宝宝名不可为空',
              type: 'warning'
            });
          }else if (this.form.Class===''){
            this.$notify({
              title: '警告',
              message: '更改宝宝班级时班级不可为空',
              type: 'warning'
            });
          }
        }
      }else if (this.value2==false){
        if (this.form.Class !== '' && this.form.Teacher !== '') {
          this.$axios.get('upDateTeacherClass', {
            params: {
              changeClass: this.form.Class,
              teacher: this.form.Teacher
            }
          }).then(response => {
            if (response.data=='成功') {
              this.form.Class = ''
              this.form.Teacher = ''
                this.$axios.get('checkAllClass').then(response => {
                  this.tableData = response.data
                })
                  .catch(error => {
                    console.log(error)
                  })
              this.dialogFormVisible = false,
              this.value2==true
              this.$notify({
                title: '成功',
                message: '修改成功！',
                type: 'success'
              });
            }else {
              this.$notify.error({
                title: '错误',
                message: '修改失败!'
              });
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          if (this.form.BName===''){
            this.$notify({
              title: '警告',
              message: '更改班级时班级名不可为空',
              type: 'warning'
            });
          }else if (this.form.Class===''){
            this.$notify({
              title: '警告',
              message: '更改班级时班主任不可为空',
              type: 'warning'
            });
          }
        }
      }
    },
    chooser(){
      if (this.value2==true){
        this.form.Teacher =''
        this.form.teacher =[]
        this.$axios.get('selectAllBaby').then(response => {
          this.form.bName = response.data
        }).catch(error => {
          console.log(error)
        })
      }else {
        this.form.BName =''
        this.form.bName =[]
        this.$axios.get('selectAllTeacher').then(response => {
          this.form.teacher = response.data
        }).catch(error => {
          console.log(error)
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
