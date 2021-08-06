<template>
  <div>
    <div><H1>幼儿管理</H1></div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 幼儿信息</span>
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
          </div>
          <div style="margin: 50px auto 0;">
            <el-table
              :data="this.tableData.slice((this.currPage - 1)*this.pageSize, this.currPage * this.pageSize)"
              style="width: 100%">
              <el-table-column
                prop="biid"
                label="宝贝id"
                width="200">
              </el-table-column>

              <el-table-column
                prop="biname"
                label="宝贝名称"
                width="200">
              </el-table-column>
              <el-table-column
                prop="bisex"
                label="性别"
                width="200">
              </el-table-column>
              <el-table-column
                prop="biytd"
                label="出生年月"
                width="200">
              </el-table-column>
              <el-table-column
                prop="biadtime"
                label="创建时间"
                width="200">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true">编辑</el-button>

                  <el-dialog title="宝宝编辑" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="更改姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.changeName"></el-input>
                      </el-form-item>
                      <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-select v-model="form.changeRegion" placeholder="请选择关系">
                          <el-option label="男" value="男"></el-option>
                          <el-option label="女" value="女"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="出生年月" :label-width="formLabelWidth">
                        <el-date-picker
                          v-model="changeValue2"
                          align="right"
                          type="date"
                          placeholder="选择日期"
                          :picker-options="pickerOptions"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="changeBaby">确 定</el-button>
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

        <el-tab-pane label="添加宝宝">
          <div>
            <div>
              <H2>新增宝宝</H2>
            </div>
            <div style="width: 50%; margin: 50px auto 0;">
              <el-form :label-position="labelPosition" label-width="80px" :model="form">
                <el-form-item label="宝宝名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="宝宝性别" >
                  <el-select v-model="form.region" placeholder="请选择性别"  style="width: 70%">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出生年月" >
                  <el-date-picker
                    v-model="value2"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    style="width: 70%"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-form>
              <el-button type="success" round @click="addBaby">保存</el-button>
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
  name: 'BabyManagement',
  data(){
    return {
      labelPosition: 'left',
      pDate:'',
      pName:'',
      tableData: [],
      pageSize: 5,
      currPage: 1,
      dialogFormVisible : false,
      babyId : '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value2: '',
      changeValue2: '',
      ptime:'',
      form:{
        name:'',
        changeName:'',
        region:'',
        changeRegion:''
      },
      formLabelWidth: '120px',
    }
  },
  mounted () {
    this.$axios.get('selectAllBaby').then(response => {
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
    handleEdit(index,row){
      this.babyId = row.biid;
    },
    addBaby(){
      if (this.form.name!==''&&this.form.region!==''&&this.value2!==''){
        this.$axios.get('addBaby',{
          params:{
            biname:this.form.name,
            bisex:this.form.region,
            biytd:this.value2
          }
        }).then(response=>{
          if (response.data==='成功'){
            this.$axios.get('selectAllBaby').then(response => {
              this.tableData = response.data
            })
              .catch(error => {
                console.log(error)
              })
            this.$notify({
              title: '成功',
              message: '添加成功！',
              type: 'success'
            });
              this.form.name = '',
              this.form.region = '',
              this.value2 = ''
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
            message: '宝贝名不可为空！'
          });
        }else if (this.form.region===''){
          this.$notify.error({
            title: '错误',
            message: '性别不可为空！'
          });
        }else if (this.form.value2===''){
          this.$notify.error({
            title: '错误',
            message: '出生年月不可为空！'
          });
        }
      }
    },
    //修改宝宝
    changeBaby(){
        if (this.form.changeName!==''&&this.form.changeRegion!==''&&this.changeValue2!==''&&this.babyId!==''){

          this.$axios.get('changeBaby',{
            params:{
              biname:this.form.changeName,
              bisex:this.form.changeRegion,
              biytd:this.changeValue2,
              id:this.babyId
            }
          }).then(response=>{
            if (response.data==='成功'){
              this.$axios.get('selectAllBaby').then(response => {
                this.tableData = response.data
              })
                .catch(error => {
                  console.log(error)
                })
                this.dialogFormVisible = false,
                this.$notify({
                title: '成功',
                message: '修改成功！',
                type: 'success'
              });
                this.form.changeName = '',
                this.form.changeRegion = '',
                this.changeRegion = '',
                this.babyId=''
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
          if (this.form.changeName===''){
            this.$notify.error({
              title: '错误',
              message: '宝贝名不可为空！'
            });
          }else if (this.form.changeRegion===''){
            this.$notify.error({
              title: '错误',
              message: '性别不可为空！'
            });
          }else if (this.form.changeValue2===''){
            this.$notify.error({
              title: '错误',
              message: '出生年月不可为空！'
            });
          }
        }
    },
    //查询
    checkBaby(){
      this.ptime=''
      this.ptime +=this.pDate
      alert(this.ptime)
      if (this.pName!==''&&this.ptime!==''){
        this.$axios.get('checkBaby',{
          params:{
            ptime:this.ptime,
            pName:this.pName
          }
        }).then(response=>{
          this.tableData = response.data
        }).catch(error => {
          console.log(error)
        })
      }else {
        if (this.pName===''){
          this.$notify.error({
            title: '错误',
            message: '宝贝名不可为空！'
          });
        }else {
          this.$notify.error({
            title: '错误',
            message: '时间不可为空！'
          });
        }
      }
    },

  }
}
</script>

<style scoped>

</style>
