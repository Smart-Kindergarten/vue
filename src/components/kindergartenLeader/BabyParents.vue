<template>
  <div>
    <div><H1>家长管理</H1></div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 家长信息</span>
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
             <el-button type="primary" @click="checkParents">查询家长</el-button>
            </div>
            <div style="margin-top: 9px">
              <a style="font-size: 20px">家长名称:</a>
              <el-input v-model="pName" placeholder="请输入内容" style="width: 350px"></el-input>
              <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
            </div>
          </div>
          <div style="margin: 50px auto 0;">
            <el-table
              :data="this.tableData.slice((this.currPage - 1)*this.pageSize, this.currPage * this.pageSize)"
              style="width: 100%">
              <el-table-column
                prop="uid"
                label="家长编号"
                width="200">
              </el-table-column>

              <el-table-column
                prop="uname"
                label="家长名称"
                width="200">
              </el-table-column>

              <el-table-column
                prop="biname"
                label="宝宝名称"
                width="200">
              </el-table-column>

              <el-table-column
                prop="uchildrelation"
                label="亲子关系"
                width="200">
              </el-table-column>

              <el-table-column
                prop="uphone"
                label="联系方式"
                width="200">
              </el-table-column>

              <el-table-column
                prop="uwork"
                label="职业"
                width="200">
              </el-table-column>

              <el-table-column
                prop="ures3"
                label="创建时间"
                width="200">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true">编辑</el-button>

                  <el-dialog title="家长编辑" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="更改姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.changeName" autocomplete="off" style="width: 360px"></el-input>
                      </el-form-item>
                      <el-form-item label="宝宝名称" :label-width="formLabelWidth">
                        <el-select
                          v-model="form.BName"
                          placeholder="请选择宝宝">
                          <el-option
                            v-for="item in form.bName"
                            :key="item.biid"
                            :value="item.biname+form.babyid+item.biid"
                            :label='item.label'
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="亲子关系" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="请选择关系">
                          <el-option label="妈妈" value="妈妈"></el-option>
                          <el-option label="爸爸" value="爸爸"></el-option>
                          <el-option label="爷爷" value="爷爷"></el-option>
                          <el-option label="奶奶" value="奶奶"></el-option>
                          <el-option label="外公" value="外公"></el-option>
                          <el-option label="外婆" value="外婆"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="更改职业" :label-width="formLabelWidth">
                        <el-input v-model="form.work" autocomplete="off" style="width: 360px"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="changeParents">确 定</el-button>
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

        <el-tab-pane label="新增家长">
          <div>
            <div>
              <H2>新增家长</H2>
            </div>
           <div style="width: 50%; margin: 50px auto 0;">
             <el-form :label-position="labelPosition" label-width="80px" :model="form">
               <el-form-item label="家长名称">
                 <el-input v-model="form.name"></el-input>
               </el-form-item>
               <el-form-item label="宝宝名称" >
                 <el-select
                   v-model="form.BName"
                   placeholder="请选择宝宝"
                 style="width: 70%">
                   <el-option
                     v-for="item in form.bName"
                     :key="item.biid"
                     :value="item.biname+form.babyid+item.biid"
                     :label='item.label'
                     @click.native="handleEdit"></el-option>
                 </el-select>
               </el-form-item>
               <el-form-item label="亲子关系" >
                 <el-select v-model="form.region" placeholder="请选择关系"  style="width: 70%">
                   <el-option label="妈妈" value="妈妈"></el-option>
                   <el-option label="爸爸" value="爸爸"></el-option>
                   <el-option label="爷爷" value="爷爷"></el-option>
                   <el-option label="奶奶" value="奶奶"></el-option>
                   <el-option label="外公" value="外公"></el-option>
                   <el-option label="外婆" value="外婆"></el-option>
                 </el-select>
               </el-form-item>
               <el-form-item label="联系方式">
                 <el-input v-model="form.phone"></el-input>
               </el-form-item>
               <el-form-item label="职业">
                 <el-input v-model="form.work"></el-input>
               </el-form-item>
             </el-form>
             <el-button type="success" round @click="addParents">保存</el-button>
             <el-button type="info" round @click="out">取消</el-button>
           </div>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>

</template>

<script>
export default {
  name: 'BabyParents',
  data () {
    return {
      labelPosition: 'left',
      tableData: [],
      pageSize: 5,
      currPage: 1,
      pDate:'',
      pTime:'',
      pName:'',
      pId:'',
      dialogFormVisible : false,
      form:{
        changeName:'',
        bName:[],
        region:'',
        BName:'',
        work:'',
        phone:'',
        babyid:'-',
      },
      formLabelWidth: '120px',
    }
  },
  mounted () {
    this.$axios.get('selectAllParents').then(response => {
      this.tableData = response.data
    })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('selectAllBaby').then(response => {
      this.form.bName = response.data
    }).catch(error => {
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
    //查询家长
    checkParents(){
      this.pTime +=this.pDate
          if (this.pTime!==''&&this.pName!==''){

            this.$axios.get('checkParents',{
              params:{
                time:this.pTime,
                name:this.pName
              }
            }).then(response=>{
                this.tableData = response.data
                this.pTime='',
                this.pName=''
            }).catch(error => {
              console.log(error)
            })
          }else {
            if (this.pTime===''){
              this.$notify({
                title: '警告',
                message: '时间不可为空',
                type: 'warning'
              });
              this.pTime='',
              this.pName=''
            }else if (this.pName===''){
              this.$notify({
                title: '警告',
                message: '家长名不可为空',
                type: 'warning'
              });
              this.pTime='',
              this.pName=''
            }
          }
    },
    //查询所有宝宝
    handleEdit(index,row){
        this.pId = row.uid
        this.$axios.get('selectAllBaby').then(response => {
        this.form.bName = response.data
        }).catch(error => {
          console.log(error)
        })
    },

    //编辑家长
    changeParents(){
      this.$axios.get('changeParents',{
        params:{
          pid:this.pId,
          name:this.form.changeName,
          babyName:this.form.BName,
          relation:this.form.region,
          work:this.form.work,
        }
      }).then(response=>{
        if (response.data==='成功'){
          this.$notify({
            title: '成功',
            message: '修改成功！',
            type: 'success'
          });
          this.$axios.get('selectAllParents').then(response => {
            this.tableData = response.data
          })
            .catch(error => {
              console.log(error)
            })
          this.dialogFormVisible = false
        }else {
          this.$notify.error({
            title: '错误',
            message: '请核对信息或联系管理员！'
          });
        }
        this.form.changeName='',
        this.form.BName='',
        this.form.region='',
        this.form.work='',
        this.pId=''
      }).catch(error => {
        console.log(error)
      })
    },
    //删除家长
    handleDelete(index,row){
      this.$confirm('此操作将永久家长, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('deleteParents',{
          params:{
            id:row.uid,
          }
        }).then(response=>{
          if (response.data==='成功'){
            this.$notify({
              title: '成功',
              message: '修改成功！',
              type: 'success'
            });
            this.$axios.get('selectAllParents').then(response => {
              this.tableData = response.data
            })
              .catch(error => {
                console.log(error)
              })
            this.dialogFormVisible = false
          }else {
            this.$notify.error({
              title: '错误',
              message: '更改错误请核对！'
            });
          }
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

    addParents(){
      if(this.form.name!==''&&this.form.BName!==''&&this.form.region!==''&&this.form.phone!==''&&this.form.work!==''){
        this.$axios.get('addParents',{
          params:{
            uname:this.form.name,
            biname:this.form.BName,
            uchildrelation:this.form.region,
            uphone:this.form.phone,
            uwork:this.form.work
          }
        }).then(response=>{
          if (response.data==='成功'){
            this.$notify({
              title: '成功',
              message: '修改成功！',
              type: 'success'
            });
            this.$axios.get('selectAllParents').then(response => {
              this.tableData = response.data
            })
              .catch(error => {
                console.log(error)
              })
            this.dialogFormVisible = false
          }else {
            this.$notify.error({
              title: '错误',
              message: '请核对信息或联系管理员！'
            });
          }
          this.form.name ='',
          this.form.BName ='',
          this.form.region ='',
          this.form.phone ='',
           this.form.work =''
        }).catch(error => {
          console.log(error)
        })
      }else {
        if (this.form.name===''){
          this.$notify.error({
            title: '错误',
            message: '姓名不可为空！'
          });
        }else if (this.form.BName===''){
          this.$notify.error({
            title: '错误',
            message: '宝贝不可为空！'
          });
        }else if (this.form.region===''){
          this.$notify.error({
            title: '错误',
            message: '关系不可为空！'
          });
        }else if (this.form.phone===''){
          this.$notify.error({
            title: '错误',
            message: '联系方式不可为空！'
          });
        }else if (this.form.work===''){
          this.$notify.error({
            title: '错误',
            message: '工作不可为空！'
          });
        }
      }
    },
    out(){
      this.form.name ='',
        this.form.BName ='',
        this.form.region ='',
        this.form.phone ='',
        this.form.work =''
    }

  }
}
</script>

<style scoped>

</style>
