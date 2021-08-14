<template xmlns:router="">
  <div style="background-color: #69818B;height: 790px;width: 100%">
    <div>
      <h1>智慧幼儿园管理系统</h1>
    </div>
    <div style="margin-top: 0px;">
      <div>
        <!--        {{User}}-->
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-menu
                router :default-active="this.$route.path"
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-submenu v-for="(item,index) in menuData" :key="item.mepid" :index="item.mepid"
                            style="background-color: #69818B">
                  <template slot="title">
                    <i class="el-icon-s-grid"></i>
                    <font style="color:white">{{ item.mename }}</font>
                  </template>
                  <el-menu-item-group style="background-color: #69818B">
                    <el-menu-item style="color:white" :index="subItem.meurl" v-for="(subItem,subIndex) in menuTwoData"
                                  v-if="subItem.meid === item.mepid" :key="subIndex">
                      {{ subItem.mename }}
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <!--              <el-submenu v-for="(item,index) in menuData" :key="item.mepid" >-->
                <!--                <template slot="title">-->
                <!--                  <i class="el-icon-location"></i>-->
                <!--                  <span>{{item.mename}}</span>-->
                <!--                </template>-->
                <!--                <el-menu-item-group>-->
                <!--                  <el-menu-item :index="subItem.meurl" v-for="(subItem,subIndex) in menuTwoData"-->
                <!--                                v-if="subItem.meid === item.mepid" :key="subIndex">-->
                <!--                    {{subItem.mename}}-->
                <!--                  </el-menu-item>-->
                <!--                </el-menu-item-group>-->
                <!--              </el-submenu>-->
              </el-menu>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <router-view :uacc="User"></router-view>
            </div>
          </el-col>


          <!--右边-->
          <div style="float: right;">
            <el-dropdown @command="handleCommand" style="margin-right: 30px;">
              <span class="el-dropdown-link">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">修改密码</el-dropdown-item>
                <el-dropdown-item command="b">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>


          <el-dialog
            title="修改密码" center
            :visible.sync="dialogVi"
            width="30%"
            :modal="false"
            :before-close="handleClose">
            <div>
              <div style="display: flex;align-content: center;justify-content: center;">
                <label style="margin-top: 30px;">账号</label>
                <el-input maxlength="6" show-word-limit v-model="uaccount"
                          style="width: 190px;float: right;margin-top: 20px; margin-left: 55px;margin-bottom: 30px"
                          placeholder="请输入账号" @blur="blur"></el-input>
              </div>
              <div style="display: flex;align-content: center;justify-content: center;">
                <label style="margin-top: 10px;">密码</label>
                <el-input maxlength="6" show-word-limit v-model="upwd"
                          style="width: 190px;float: right;margin-left: 55px;margin-bottom: 30px"
                          placeholder="请输入密码" @blur="uacpwd"></el-input>
              </div>
              <div style="display: flex;align-content: center;justify-content: center;">
                <label style="margin-top: 10px;">确认密码</label>
                <el-input maxlength="6" show-word-limit v-model="reupwd"
                          style="width: 190px;float: right;margin-left: 30px;margin-bottom: 30px"
                          placeholder="请输入确认密码" @blur="pwdch"></el-input>
              </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVi = false">取 消</el-button>
                <el-button type="primary" @click="affirmAdd">确 定</el-button>
            </span>
          </el-dialog>

        </el-row>
      </div>
    </div>


  </div>

</template>

<script>
  import Menu from './Menu'

  export default {
    // 接受父组件的值
    // props: {
    //   inputName: String,
    //   required: true
    // },
    data() {
      return {
        msg: '我是一个组件',
        // curpage:1,
        // pagesize :5,
        // tableData:[],
        menuData: [],
        menuTwoData: [],
        User: this.$route.params.Userid,
        dialogVi: false,
        uaccount: '',
        upwd: '',
        reupwd: '',
      }
    },
    name: 'Index',
    components: {
      Menu: Menu,

    },
    // mounted:function(){
    // this.MenuALL();//需要触发的函数
    //       },
    methods: {
      handleOpen: function (curPage) {
        this.curpage = curPage
      },
      handleClose: function (val) {
        this.pagesize = val
      },
      MenuALL: function () {
        this.$axios.get('admin/MenuAll', {
          params: {
            uaccount: this.User,
          },
        }).then(response => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].meid === 0) {
              this.menuData.push(response.data[i])
            } else {
              this.menuTwoData.push(response.data[i])
              console.log(response.data[i])
            }
          }
        }).catch((response) => {
          console.log(error)
        })
        // this.$router.replace('/Login12306')
      },


      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done()
      //     })
      //     .catch(_ => {
      //     })
      // },
      handleCommand(command) {
        // this.$message('click on item ' + command);
        if (command === 'a') {
          this.dialogVi = true
        } else {
          // this.$message('退出')
          this.$confirm('您确定退出吗？').then(_ => {
            this.$router.replace('/')
          }).catch(_ => {

          })
        }
      },

      // 确认修改
      affirmAdd(row) {
        if (this.uaccount !== '' && this.upwd !== '' && this.reupwd !== '') {
          if (this.upwd === this.reupwd) {
            this.dialogVi = false
            this.$axios.get('admin/updPcPwd', {
              params: {
                uaccount: this.uaccount,
                upwd: this.upwd,
              },
            }).then(response => {
              console.log(response.data)
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              this.$router.replace('/')
            }).catch(error => {
              console.log(error)
              console.log(error)
              this.$message({
                showClose: true,
                message: '修改失败',
                type: 'error'
              })
            })
          } else {
            this.$message({
              showClose: true,
              message: '两次密码不一样！',
              type: 'error'
            })
          }
        } else {
          this.$message({
            showClose: true,
            message: '账号密码不能为空！',
            type: 'error'
          })
        }
      },

      //判断账号是否存在
      blur() {
        // this.$message('判断账号是否存在')
        if (this.uaccount === '') {
          this.$message({
            showClose: true,
            message: '请输入账号',
            type: 'error'
          })
        } else {
          this.$axios.get('admin/existUacc', {
            params: {
              uaccount: this.uaccount,
            },
          }).then(response => {
            console.log(response.data)
            if (response.data.length === 0) {
              this.$message({
                showClose: true,
                message: '账号不存在',
                type: 'error'
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }

      },

      //验证账号
      uacpwd(){
        if (this.upwd === ''){
          this.$message({
            showClose: true,
            message: '密码不能为空！',
            type: 'error'
          })
        }
      },
      //验证密码
      pwdch(){
        if (this.reupwd === ''){
          this.$message({
            showClose: true,
            message: '确认密码不能为空！',
            type: 'error'
          })
        }
      }

    },
    mounted() {
      this.MenuALL()
    }

  }
</script>

<style scoped>
  /*.el-row {*/
  /*  margin-bottom: 20px;*/
  /*&:last-child {*/
  /*   margin-bottom: 0;*/
  /* }*/
  /*}*/

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-weight: bold;
  }

  .el-icon-arrow-down {
    font-size: 18px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
