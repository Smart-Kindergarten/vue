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
                      @click="handleEdit(scope.$index, scope.row),dialogFormVisible = true">编辑</el-button>

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
          <el-tab-pane label="添加宝宝" name="second">
            <el-form :model="form" ref="ruleForm" class="demo-ruleForm">
              <div>
                <h2 style="margin: 0 auto">新增宝宝</h2><br>
                <div>
                  <a style="font-size: 25px">宝宝名称：</a>
                  <el-input v-model="form.uname" placeholder="请输入宝宝姓名" style="width: 300px"></el-input>
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
  name: 'BabyManagement',
  data(){
    return{
      form(){

      }
    }
  }
}
</script>

<style scoped>

</style>
