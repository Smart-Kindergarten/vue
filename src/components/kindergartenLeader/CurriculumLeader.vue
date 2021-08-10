<template>
  <div>
    <div><H1>课程管理</H1></div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>课程管理</span>
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
              <a style="font-size: 20px">班级名称:</a>
              <el-input v-model="pName" placeholder="请输入内容" style="width: 350px"></el-input>
              <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
            </div>
          </div>
          <div style="margin: 50px auto 0;">
            <el-table
              :data="this.tableData.slice((this.currPage - 1)*this.pageSize, this.currPage * this.pageSize)"
              style="width: 100%">
              <el-table-column
                prop="classId"
                label="班级编号"
                width="180"></el-table-column>
              <el-table-column
                prop="className"
                label="班级名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="uname"
                label="班主任"
                width="180">
              </el-table-column>
              <el-table-column
                prop="classRoom"
                label="所在教室"
                width="180">
              </el-table-column>
              <el-table-column
                prop="creationTime"
                label="创建时间"
                width="180">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="max"
                    @click="handleEdit(scope.$index, scope.row);outerVisible = true">编辑</el-button>
                  <el-dialog title="修改课程" :visible.sync="outerVisible" width="50%">
                    <h1>课程表-{{nowClassName}}</h1><br>
                    <template>
                      <el-table
                        :data="tableData1.slice((currPage1 - 1)*pageSize1, currPage1 * pageSize1)"
                        border
                        width="90%">
                        <el-table-column
                          prop="currId"
                          label="id"
                          width="50">
                        </el-table-column>
                        <el-table-column
                          prop="currLessons"
                          label="课节"
                          width="50">
                        </el-table-column>
                        <el-table-column
                          prop="currMonday"
                          label="周一"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="currTuesday"
                          label="周二"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="currWednesday"
                          label="周三"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="currThursday"
                          label="周四"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="currFriday"
                          label="周五"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="currDate"
                          label="日期"
                          width="250">
                        </el-table-column>
                        <el-table-column
                          fixed="right"
                          label="操作"
                          width="150">
                          <template slot-scope="scope">
                            <el-button type="text" size="small" @click="handleClick(scope.row);innerVisible=true">编辑</el-button>
                            <el-dialog
                              width="40%"
                              title="修改课程"
                              :visible.sync="innerVisible"
                              append-to-body>
                              <el-form :model="form">
                                <h3> 课程id：{{nowClassId}}&ensp;&ensp;课节：{{nowClass}}&ensp;&ensp;时间：{{nowTime}}</h3><br><br>
                                <el-form-item label="更改课程" :label-width="formLabelWidth">
                                  <el-input v-model="form.className"></el-input>
                                </el-form-item>
                                <el-form-item label="选择日期" :label-width="formLabelWidth">
                                  <el-select v-model="form.classDate" placeholder="请选择日期">
                                    <el-option label="周一" value="周一"></el-option>
                                    <el-option label="周二" value="周二"></el-option>
                                    <el-option label="周三" value="周三"></el-option>
                                    <el-option label="周四" value="周四"></el-option>
                                    <el-option label="周五" value="周五"></el-option>
                                  </el-select>
                                </el-form-item>
                              </el-form>
                              <div slot="footer" class="dialog-footer">
                                <el-button @click="innerVisible = false">取 消</el-button>
                                <el-button type="primary" @click="changeClass">确 定</el-button>
                              </div>
                            </el-dialog>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="outerVisible = false">取 消</el-button>
                    </div>
                    <el-pagination background
                                   layout="prev, pager, next, sizes, total"
                                   :page-sizes="[5]"
                                   :page-size="pageSize1"
                                   :total="tableData1.length"
                                   @current-change="handleCurrentChange1"
                                   @size-change="handleSizeChange1">
                    </el-pagination>
                  </el-dialog>
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
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Curriculum',
  data(){
    return {
      tableData: [],
      pageSize: 5,
      currPage: 1,
      tableData1: [],
      pageSize1: 5,
      currPage1: 1,
      outerVisible : false,
      innerVisible: false,
      nowClassName:'',
      tableDataTow:[],
      formLabelWidth:'100px',
      date:'',
      page: 5,
      pageId:1,
      pageMessage:'',
      nowId:'',
      nowClassId:'',
      nowClass:'',
      nowTime:'',
      pDate:'',
      pName:'',
      time:'',
      form:{
        className:'',
        classDate:''
      }
    }
  },
  mounted () {
    this.$axios.get('courseManagement').then(response => {
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
    handleCurrentChange1: function (cPage) {
      this.currPage1 = cPage
    },
    handleSizeChange1: function (val) {
      this.pageSize1 = val
    },
    handleClick(row){
      this.nowClassId=row.currId
      this.nowClass=row.currLessons
      this.nowTime=row.currDate
    },
    changeClass(){
      if (this.form.className!==''&&this.form.classDate!==''){
        this.$axios.get('changeClass',{
          params:{
            nowClassId:this.nowClassId,
            date:this.form.classDate,
            name:this.form.className
          }
        }).then(response=>{
          if (response.data==='成功'){
            this.form.classDate=''
            this.form.className=''
            this.innerVisible=false,
              this.$axios.get('classSchedule',{
                params:{
                  classId:this.nowId,
                  page:this.page
                }
              }).then(response=>{
                this.tableData1 = response.data
              }).catch(error => {
                console.log(error)
              })
            this.$notify({
              title: '成功',
              message: '修改成功！',
              type: 'success'
            });
          }else {
            this.$notify.error({
              title: '错误',
              message: '修改失败！'
            });
          }
        }).catch(error => {
          console.log(error)
        })
      }else {
        if (this.form.className===''){
          this.$notify.error({
            title: '错误',
            message: '课程不可为空！'
          });
        }else if (this.form.classDate===''){
          this.$notify.error({
            title: '错误',
            message: '日期不可为空！'
          });
        }
      }
    },
    handleEdit(index,row){
      this.nowClassName = row.className
      this.nowId = row.classId,
      this.$axios.get('classSchedule',{
        params:{
          classId:this.nowId,
          page:this.page
        }
      }).then(response=>{
        this.tableData1 = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    checkClass(){
      this.time=''
      this.time+=this.pDate
      alert(this.time)
      if (this.pName!==''&&this.time!==''){
        this.$axios.get('selectClassOnly',{
          params:{
            pName:this.pName,
            pDate:this.time
          }
        }).then(response=>{
          this.pName=''
          this.time=''
          this.tableData = response.data

        }).catch(error => {
          console.log(error)
        })
      }else {
        if (this.time===''){
          this.$notify.error({
            title: '错误',
            message: '日期不可为空！'
          });
        }else if (this.pName===''){
          this.$notify.error({
            title: '错误',
            message: '班级名称不可为空！'
          });
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
