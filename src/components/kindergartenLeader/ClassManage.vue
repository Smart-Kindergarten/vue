<template>
  <el-main>
    <div>
      <div style="display: flex;align-content: center;justify-content: center;background-color: #99a9bf;">
        <font style="font-size: 30px;font-weight: bold;margin-bottom: 5px;">班级管理</font>
      </div>
      <div style="float: left">
        <div style="display: flex;align-content: center;justify-content: center;">
          <font style="margin-top: 17px;">查询条件</font>
          <el-input v-model="bgtime" prefix-icon="el-icon-search" style="width: 200px;float: left;margin: 10px;"
                    placeholder="请输入创建时间" clearable></el-input>
          <font style="margin-top: 16px;">至</font>
          <el-input v-model="overtime" prefix-icon="el-icon-search" style="width: 200px; float: left; margin: 10px;"
                    placeholder="请输入结束时间" clearable></el-input>

          <div style="display: flex;align-content: center;justify-content: center;">
            <label style="margin-top: 17px;">班级名称</label>
            <el-input maxlength="5" show-word-limit v-model="className" clearable
                      style="width: 190px;margin-top: 10px;margin-left: 5px;"
                      placeholder="请输入班级名称"></el-input>
          </div>
          <div style="margin-left: 40px;margin-top: 10px;">
            <el-button @click="hadleGetFilesListApi(1,5)" type="primary" size="min">查询</el-button>
            <el-button @click="newClick" size="min">新增</el-button>
          </div>

        </div>


        <el-dialog
          title="新增" center
          :visible.sync="dialogVisibless"
          width="30%"
          :modal="false"
          :before-close="handleClose">

          <div>
            <!--          <input  v-model="arrayAdd.teacher">-->

            <div style="display: flex;align-content: center;justify-content: center;">
              <label style="margin-top: 30px;">班级名称</label>
              <el-input maxlength="5" show-word-limit v-model="className" clearable
                        style="width: 190px;float: right;margin-top: 20px; margin-left: 55px;margin-bottom: 30px"
                        placeholder="请输入班级名称"></el-input>
            </div>

            <div style="margin-left: 50px;">
              <b-col md="6">
                <label>班主任</label>
                <el-select style="margin-left: 65px;margin-bottom: 20px;" v-model="arraybzrxz.uname"
                           placeholder="请选择班主任">
                  <el-option
                    v-for="item in arraybzrxz"
                    :key="item.uname"
                    :label="item.uname"
                    :value="item.teacher">
                  </el-option>
                </el-select>
              </b-col>
              <br>
              <b-col md="6">
                <label>所在教室</label>
                <el-select style="margin-left: 50px;margin-bottom: 20px;" v-model="arrayAdd.classRoom"
                           placeholder="请选择所在教室">
                  <el-option
                    v-for="item in arrayAdd"
                    :key="item.classRoom"
                    :label="item.classRoom"
                    :value="item.classRoom">
                  </el-option>
                </el-select>
              </b-col>
            </div>
          </div>

          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibless = false">取 消</el-button>
    <el-button type="primary" @click="affirmAdd">确 定</el-button>
  </span>
        </el-dialog>
      </div>

      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="tableData"
        @selection-change="handleSizeChange"
        stripe
        style="width: 100%">
        <el-table-column
          prop="classId"
          label="班级编号"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="className"
          label="班级名称"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="uname"
          label="班主任"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column
          prop="classRoom"
          label="所在教室"
          width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="creationTime"
          label="创建时间"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column v-if="false"
                         prop="teacher"
                         label="班主任id"
                         width="220">
        </el-table-column>
        <el-table-column fixed="right" width="140px;" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="updateClick(scope.row)">修改</el-button>
            <el-dialog
              title="修改" center
              :visible.sync="dialogVisible"
              width="30%"
              :modal="false"
              :before-close="handleClose">
              <div style="text-align: center;">

                <input type="hidden" v-model="arraybzr.teacher">
                <input type="hidden" v-model="questionForm.classId">
                <br>

                <b-col md="6">
                  <label>班级名称</label>
                  <el-select style="margin-left: 50px;margin-bottom: 20px;" v-model="questionForm.className"
                             value-key="id"
                             placeholder="请选择班级名称">
                    <el-option
                      v-for="item in arraybjmc"
                      :key="item.className"
                      :label="item.className"
                      :value="item.className">
                    </el-option>
                  </el-select>
                </b-col>
                <br>
                <b-col md="6">
                  <label>班主任</label>
                  <el-select style="margin-left: 65px;margin-bottom: 20px;" v-model="questionForm.uname" value-key="id"
                             placeholder="请选择班主任">
                    <el-option
                      v-for="item in arraybzr"
                      :key="item.uname"
                      :label="item.uname"
                      :value="item.uname">
                    </el-option>
                  </el-select>
                </b-col>
                <br>
                <b-col md="6">
                  <label>所在教室</label>
                  <el-select style="margin-left: 50px;margin-bottom: 20px;" v-model="questionForm.classRoom"
                             value-key="id"
                             placeholder="请选择所在教室">
                    <el-option
                      v-for="item in arraybjmc"
                      :key="item.classRoom"
                      :label="item.classRoom"
                      :value="item.classRoom">
                    </el-option>
                  </el-select>
                </b-col>
              </div>

              <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="affirmClick">确 定</el-button>
            </span>
            </el-dialog>
            <el-button type="danger" size="mini" @click="handleClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页底部 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,15]"
        :page-size="pagesize"
        layout="total,prev, pager, next,sizes,jumper"
        :total="count"
      ></el-pagination>
    </div>
  </el-main>
</template>

<script>
  export default {
    name: 'UserTable',
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pagesize: 5,
        count: 0,
        // 是否加载数据
        loading: true,
        questionForm: {
          classId: "",
          className: "",
          uname: "",
          classRoom: "",
          creationTime: "",
          teacher: '',
        },
        dialogFormVisible: false,
        dialogVisible: false,
        dialogVisibless: false,
        classDta: [],
        //ddd
        className: '',
        uname: '',
        classRoom: '',
        arraybjmc: [],
        arrayAdd: [],
        arraybzr: [],
        arraybzrxz: [],
        bgtime: '',
        overtime: ''
      }
    },
    mounted: function () {
      this.hadleGetFilesListApi(this.currentPage, this.pagesize)
    },
    methods: {
      //控制每页几条
      handleSizeChange: function (size) {
        this.pagesize = size
        // this.hadleGetFilesListApi(size);
        this.handleCurrentChange(this.currentPage)
      },
      //控制页面的切换
      handleCurrentChange: function (currPage) {
        this.currentPage = currPage
        this.hadleGetFilesListApi(currPage, this.pagesize)
      },
      //渲染表格多条件查询
      hadleGetFilesListApi(currentPage, pagesize) {
        this.$axios.get('Health/ClassInforAll', {
          params: {
            bgtime: this.bgtime,
            overtime: this.overtime,
            className: this.className,
            page: currentPage,
            pages: pagesize
          }
        }).then((response) => {
          this.tableData = response.data.data
          this.loading = false
          this.count = response.data.count
          console.log(this.tableData + "lllllllllllllllllllllll")
        }).catch((response) => {
          console.log(error)
        })

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      //修改弹窗-----------------------------------------
      updateClick(row) {
        this.dialogVisible = true
        this.questionForm.teacher = row.teacher
        this.questionForm.className = row.className
        this.questionForm.uname = row.uname
        this.questionForm.classRoom = row.classRoom
        this.questionForm.classId = row.classId
        this.$axios.get('Health/selclassManage', {}).then(response => {
          console.log(response.data)
          this.arraybjmc = response.data;
        }).catch(error => {
          console.log(error)
        });
        this.$axios.get('Health/selTeacher', {}).then(response => {
          console.log(response.data)
          this.arraybzr = response.data;
        }).catch(error => {
          console.log(error)
        })
      },
      // 确认修改
      affirmClick(row) {
        console.log(this.questionForm.className)
        console.log(this.questionForm.teacher)
        console.log(this.questionForm.classRoom)
        console.log(this.questionForm.classId)
        this.dialogVisible = false
        this.$axios.get('Health/updclaManage', {
          params: {
            className: this.questionForm.className,
            teacher: this.questionForm.teacher,
            classRoom: this.questionForm.classRoom,
            classId: this.questionForm.classId
          },
        }).then(response => {
          console.log(response.data)
          this.hadleGetFilesListApi(1, 5);
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.log(error)
          this.$message({
            showClose: true,
            message: '修改失败',
            type: 'error'
          })
        })
      },
      //新增弹窗--------------------------------
      newClick(row) {
        this.dialogVisibless = true
        this.$axios.get('Health/selclassManage', {}).then(response => {
          console.log(response.data)
          this.arrayAdd = response.data;
        }).catch(error => {
          console.log(error)
        });
        this.$axios.get('Health/selTeacher', {}).then(response => {
          console.log(response.data)
          this.arraybzrxz = response.data;
        }).catch(error => {
          console.log(error)
        })
      },
      // 确认新增
      affirmAdd(row) {
        if (this.className !== '') {
          console.log(this.className)
          console.log(this.arraybzrxz.uname)
          console.log(this.arrayAdd.classRoom)
          this.dialogVisibless = false
          this.$axios.get('Health/insertClaManage', {
            params: {
              className: this.className,
              teacher: this.arraybzrxz.uname,
              classRoom: this.arrayAdd.classRoom,
            },
          }).then(response => {
            console.log(response.data)
            this.hadleGetFilesListApi(1, 10);
            this.$message({
              showClose: true,
              message: '新增成功',
              type: 'success'
            })
            this.className = ''
          }).catch(error => {
            console.log(error)
            console.log(error)
            this.$message({
              showClose: true,
              message: '新增失败',
              type: 'error'
            })
            this.className = ''
          })
        } else {
          this.$message({
            showClose: true,
            message: '宝宝名称不能为空！',
            type: 'error'
          })
        }
      },
      //删除------------------------------------
      handleClick(row) {
        console.log(row.classId)
        this.$confirm('您确定删除吗？').then(_ => {
          this.$axios.get('Health/delClaManage', {
            params: {
              classId: row.classId,
            },
          }).then(response => {
            console.log(response.data)
            this.hadleGetFilesListApi(1, 5);
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
          }).catch(error => {

          })
        }).catch(_ => {

        })
      },

    }
  }
</script>
