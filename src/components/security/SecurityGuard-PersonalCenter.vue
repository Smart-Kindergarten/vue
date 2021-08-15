<template>

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
    </div>
  </el-card>
</template>

<script>
    export default {
      name: "SecurityGuard-PersonalCenter",
      data(){
        return{
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
        }
      },
      mounted(){
        this.getUser()
      }
    }
</script>

<style scoped>

</style>
