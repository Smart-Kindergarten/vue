<template>
  <div>
    <div>
      <h1>膳食管理</h1>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 膳食管理</span>
        <div style="margin: 50px auto 0;width: 80%">
          <el-table
            :data="this.tableData.slice((this.currPage - 1)*this.pageSize, this.currPage * this.pageSize)"
            style="width: 100%">
            <el-table-column
              prop="fid"
              label="膳食编号"
              width="250">
            </el-table-column>
            <el-table-column
              prop="fdate"
              label="时间"
              width="380">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row);dialogFormVisible=true">编辑</el-button>

                <el-dialog title="食物编辑" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="更改食物" :label-width="formLabelWidth">
                      <el-input v-model="form.changeFood" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="更改餐别" :label-width="formLabelWidth">
                      <el-select v-model="form.foodType" placeholder="请选择角色">
                        <el-option label="早餐" value="1"></el-option>
                        <el-option label="中餐" value="2"></el-option>
                        <el-option label="晚餐" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                      <el-form-item label="更改日期" :label-width="formLabelWidth">
                        <el-select v-model="form.date" placeholder="请选择角色">
                          <el-option label="周一" value="4"></el-option>
                          <el-option label="周二" value="5"></el-option>
                          <el-option label="周三" value="6"></el-option>
                          <el-option label="周四" value="7"></el-option>
                          <el-option label="周五" value="8"></el-option>
                        </el-select>
                    </el-form-item>
                    <a style="margin-left: 50px">更改时间&nbsp;&nbsp;&nbsp;</a>
                    <el-date-picker
                      v-model="value2"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      style="top: -3px">
                    </el-date-picker>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel;dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeFoodClick">确 定</el-button>
                  </div>
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
      <el-tab-pane label="新增膳食">


        <div class="block">
          <a style="font-size: 25px">时间：</a>
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="top: -3px">
          </el-date-picker>
        </div>

        <div style="margin-top: 50px">
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content bg-purple">
              <a style="">餐别</a><br><br><br>
              <a>早餐</a>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <a style="">周一</a><br><br>
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="breakfast1"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <a style="">周二</a><br><br>
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="breakfast2"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <a style="">周三</a><br><br>
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="breakfast3"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <a style="">周四</a><br><br>
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="breakfast4"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <a style="">周五</a><br><br>
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="breakfast5"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
          </el-row>
        </div>

        <div>
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content bg-purple">
              <br><a>中餐</a>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="lunch1"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="lunch2"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="lunch3"
                @blur="inputBlur()">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="lunch4"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="lunch5"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
          </el-row>


        </div>

        <div>
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content bg-purple">
              <br><a>晚餐</a>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="dinner1"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="dinner2"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="dinner3"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="dinner4"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input
                type="textarea"
                style="width: 180px;height: 80px"
                placeholder="请输入内容"
                v-model="dinner5"
                @blur="inputBlur">
              </el-input>
            </div></el-col>
          </el-row>


        </div>
        <div style="margin-top: 50px">
          <el-button type="success" @click="upData">提交</el-button>
          <a>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</a>
          <el-button type="info">取消</el-button>
        </div>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
export default {
  name: 'FoodManage',
  data () {
    return {
      dialogFormVisible : false,
      tableData: [],
      pageSize: 5,
      currPage: 1,
      breakfast1:'',
      breakfast2:'',
      breakfast3:'',
      breakfast4:'',
      breakfast5:'',
      lunch1:'',
      lunch2:'',
      lunch3:'',
      lunch4:'',
      lunch5:'',
      dinner1:'',
      dinner2:'',
      dinner3:'',
      dinner4:'',
      dinner5:'',
      allFood:'',
      time:'',
      foodId:'',
      form:{
        changeFood:'',
        date:'',
        foodType:'',
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: '',
      // upFoodData:"早餐"
      upFoodData: [{
        date: '早餐',
      }, {
        date: '午餐',
      }, {
        date: '点心',
      }],
      formLabelWidth: '120px'
    };
  },
  mounted () {
    this.$axios.get('Health/selectFood').then(response => {
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

    upData(){
      this.allFood+=this.breakfast1+this.breakfast2+this.breakfast3+this.breakfast4+this.breakfast5+this.lunch1+this.lunch3+this.lunch3+this.lunch4+this.lunch5+this.dinner1+this.dinner2+this.dinner3+this.dinner4+this.dinner5
      this.time +=this.value2
      if (this.allFood!==''&&this.value2!==''){
        this.$axios.get('Health/upBabyFood',{
          params:{
            breakFood:this.breakfast1+"!!"+this.breakfast2+"!!"+this.breakfast3+"!!"+this.breakfast4+"!!"+this.breakfast5,
            lunch:this.lunch1+"!!"+this.lunch3+"!!"+this.lunch3+"!!"+this.lunch4+"!!"+this.lunch5,
            dinner:this.dinner1+"!!"+this.dinner2+"!!"+this.dinner3+"!!"+this.dinner4+"!!"+this.dinner5,
            time:this.time
          },
        }).then(response=>{
          this.allFood=''
          this.breakFood=''
          this.lunch=''
          this.dinner=''
          this.time=""
          if (response.data==='成功'){
            this.$notify({
              title: '成功',
              message: '上传成功',
              type: 'success'
            });
          }else {
            this.$notify.error({
              title: '错误',
              message: '上传失败'
            });
          }
        }).catch(error => {
          console.log(error)
        })
      }else {
        if (this.allFood===''){
          this.$notify({
            title: '警告!',
            message: '食物不可为空！',
            duration: 0
          });
          this.allFood=''
          this.breakFood=''
          this.lunch=''
          this.dinner=''
        }else if (this.value2===''){
          this.$notify({
            title: '警告!',
            message: '请选择时间！',
            duration: 0
          });
          this.allFood=''
          this.breakFood=''
          this.lunch=''
          this.dinner=''
        }
      }
    },
    handleEdit(index,row){
        this.foodId=row.fid
      this.$notify({
        title: '提示',
        message: '时间非必选项',
        duration: 0
      })
    },
    cancel(){
        this.form.date='',
        this.form.changeFood=''
        this.form.foodType=''
        this.time =''
    },
    changeFoodClick(){
      this.time +=this.value2
      alert(this.time)
      if (this.form.date!==''&&this.form.changeFood!==''&&this.form.foodType!==''){
        this.$axios.get('Health/changeFood',{
          params:{
            foodId:this.foodId,
            date:this.form.date,
            changeFood:this.form.changeFood,
            foodType:this.form.foodType,
            time:this.time
          }
        }).then(response=>{
          if (response.data==='成功'){
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '上传成功',
              type: 'success'
            });
          }else {
            this.$notify.error({
              title: '错误',
              message: '上传失败'
            });
          }
            this.form.date= '',
            this.form.changeFood ='',
            this.form.foodType ='',
            this.time =''

        }).catch(error => {
          console.log(error)
        })
      }else {
        if (this.form.date===''){
          this.$notify({
            title: '提示',
            message: '请选择日期',
            duration: 0
          });
        }else if (this.form.foodType===''){
          this.$notify({
            title: '提示',
            message: '请选择餐别',
            duration: 0
          });
        }else if (this.form.changeFood===''){
          this.$notify({
            title: '提示',
            message: '请输入食物',
            duration: 0
          });
        }
      }
    }

  }
}
</script>

<style scoped>

</style>
