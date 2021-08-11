<template>
  <div>
    <div><H1>校园公告</H1></div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>校园公告管理</span>
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
              <el-button type="primary" @click="checkClass">查询</el-button>
            </div>
            <div style="margin-top: 9px">
              <a style="font-size: 20px">公告名称:</a>
              <el-input v-model="pName" placeholder="请输入内容" style="width: 350px"></el-input>
              <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
            </div>
          </div>
          <div style="margin: 50px auto 0;">
            <el-table
              :data="this.tableData.slice((this.currPage - 1)*this.pageSize, this.currPage * this.pageSize)"
              style="width: 100%">
              <el-table-column
                prop="iD"
                label="公告编号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="messageName"
                label="消息名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="message"
                label="信息"
                width="300">
              </el-table-column>
              <el-table-column
                prop="creationTime"
                label="创建时间"
                width="150">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true">编辑</el-button>
                  <el-dialog title="修改公告" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="更改名称" :label-width="formLabelWidth">
                        <el-input v-model="changeName"></el-input>
                      </el-form-item>
                      <el-form-item label="更改内容" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="desc"></el-input>
                      </el-form-item>
                      <el-form-item label="更改日期" :label-width="formLabelWidth">
                        <el-date-picker
                          v-model="changeValue2"
                          align="right"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="change">确 定</el-button>
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
        <el-tab-pane>
          <span slot="label">新增通知</span>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
              <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-button type="primary" round @click="addAnn">添加</el-button>
            <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
            <el-button type="primary" round>清除</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Announcement',
  data () {
    return {
      tableData: [],
      pageSize: 5,
      currPage: 1,
      dialogFormVisible : false,
      formLabelWidth:'120px',
      changeValue2:'',
      changeName:'',
      desc:'',
      pName:'',
      pDate:'',
      id:'',
      time:'',
      form:{
        name:'',
        desc:''
      }
    }
  },
  mounted () {
    this.$axios.get('checkMessage',{
    }).then(response=>{
      this.tableData = response.data
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
    handleEdit(index, row){
      this.id = row.iD
    },
    change(){
      if (this.changeName!==''&&this.desc!==''&&this.changeValue2!==''){
        this.$axios.get('changeAnn',{
          params:{
            ID:this.id,
            messageName:this.changeName,
            message:this.desc,
            creationTime:this.changeValue2
          }
        }).then(response=>{
          if (response.data==='成功'){
            this.$notify({
              title: '成功',
              message: '添加成功！',
              type: 'success'
            });
            this.dialogFormVisible = false,
              this.changeName=''
            this.desc=''
            this.changeValue2=''
            this.$axios.get('checkMessage',{
            }).then(response=>{
              this.tableData = response.data
            }).catch(error => {
              console.log(error)
            })
          }else {
            this.$notify.error({
              title: '错误',
              message: '更改错误！请联系管理员'
            });
          }
        }).catch(error => {
          console.log(error)
        })
      }else {
        if (this.changeName===''){
          this.$notify.error({
            title: '错误',
            message: '更改名不可为空'
          });
        }else if (this.desc===''){
          this.$notify.error({
            title: '错误',
            message: '更改信息不可为空'
          });
        }else if (this.changeValue2===''){
          this.$notify.error({
            title: '错误',
            message: '时间不可为空'
          });
        }
      }
    },
    handleDelete(index, row){

    },
    addAnn(){
      if (this.form.name!==''&&this.form.desc!==''){
        this.$axios.get('addAnn',{
          params:{
            messageName:this.form.name,
            message:this.form.desc
          }
        }).then(response=>{
          if (response.data==='成功'){
            this.$notify({
              title: '成功',
              message: '添加成功！',
              type: 'success'
            });
            this.school=''
            this.desc=''
          }else {
            this.$notify.error({
              title: '错误',
              message: '请核对信息或联系管理员！'
            });
          }
        }).catch(error => {
          console.log(error)
        })
      }else {
        if (this.form.name===''){
          this.$notify.error({
            title: '错误',
            message: '标题不可为空'
          });
        }else if (this.form.desc===''){
          this.$notify.error({
            title: '错误',
            message: '内容不可为空'
          });
        }
      }
    },
    checkClass(){
      this.time+=this.pDate;
      if (this.pDate!==''&&this.pName!==''){
        this.$axios.get('checkAnno',{
          params:{
            pDate:this.time,
            pName:this.pName
          }
        }).then(response=>{
          this.tableData = response.data
          this.time=''
        }).catch(error => {
          console.log(error)
        })
      }else {
        this.time=''
        if (this.pDate===''){
          this.$notify.error({
            title: '错误',
            message: '时间不能为空'
          });
        }else if (this.pName===''){
          this.$notify.error({
            title: '错误',
            message: '公告名称不能为空'
          });
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
