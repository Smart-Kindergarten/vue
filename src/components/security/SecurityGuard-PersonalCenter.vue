<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input placeholder="请输入旧密码" v-model="jpwd" show-password></el-input>
      <br />
      <el-input placeholder="请输入新密码" v-model="xpwd" show-password></el-input>
      <br />
      <el-input placeholder="请再次输入新密码" v-model="qpwd" show-password></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false,pwd=''">取 消</el-button>
    <el-button type="primary" @click="uppwd">确 定</el-button>
  </span>
    </el-dialog>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户信息</span>
    </div>
    <div>
      用户名:{{uname}}<br/>
      手机号:{{uphome}}<br/>
      居住地:{{usite}}<br/>
      职位:{{uwork}}<br/>
      创建时间:{{time}}<br/>
      <el-button type="warning" round @click="dialogVisible = true">修改密码</el-button>
    </div>
  </el-card>
  </div>
</template>

<script>
    export default {
      name: "SecurityGuard-PersonalCenter",
      data(){
        return{
          testString:/^[0-9A-Za-z]+$/,
          jpwd:'',
          xpwd:'',
          qpwd:'',
          dialogVisible:false,
          uname:'null',
          uwork:'null',
          uphome:'null',
          usite:'null',
          time:'null'
        }
      },
      methods: {
        getUser(){
          var thie = this;
          this.$axios.post('/Security/getSecurtyclUser').then(function (response) {
            console.log(response.data)
            thie.uname = response.data.uname
            thie.uwork = response.data.uwork
            thie.uphome = response.data.uphome
            thie.usite = response.data.usite
            thie.time = response.data.time
          })
        },
        uppwd(){
          if(this.jpwd != null && this.jpwd.length != 0){
            if(this.qpwd == this.xpwd){
              if(this.xpwd != null && this.xpwd.length != 0){
                if(this.xpwd.length >= 6){
                  console.log(this.testString)
                  console.log(this.testString.test(this.xpwd))
                    if(this.testString.test(this.xpwd)){
                       var thie = this;
                      var message = this.$message
                      let datas = {
                        pwd:this.xpwd,
                        pwd2:this.jpwd
                      }
                      this.$axios.post('/Security/uppwd',this.$qs.stringify(datas)).then(function (response) {
                        if(response.data){
                          message.success('密码修改成功')
                          thie.dialogVisible = false
                          thie.jpwd = '';
                          thie.xpwd = '';
                          thie.qpwd = '';
                        }else{
                          message.error('旧密码不正确');
                        }
                      })
                    }else{
                      this.$message.error('新密码不能包含特殊字符');
                    }
                }else{
                  this.$message.error('新密码不能小于6位');
                }
              }else{
                this.$message.error('新密码不能为空');
              }
            }else{
              this.$message.error('新密码与确认新密码不一致');
            }
          }else{
            this.$message.error('旧密码不能为空');
          }
        }

      },
      mounted(){
        this.getUser()
      }
    }
</script>

<style scoped>

</style>
