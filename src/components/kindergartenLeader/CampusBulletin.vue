<template>
<div>
  <h1>校园通知</h1><br>
  <div>
    <el-form ref="form" :model="form" label-width="180px">
    <el-form-item label="校园名称：">
      <a style="float: left">{{school}}</a>
    </el-form-item>
    <el-form-item label="消息内容:">
      <el-input type="textarea" v-model="desc"></el-input>
    </el-form-item>
    </el-form>
    <el-button type="success" @click="Add">发送</el-button>
    <el-button type="primary">重置</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'CampusBulletin',
  data() {
    return {
      desc:'',
      school:'英才幼儿园',
      form(){
      }
    }
  },
  methods: {
    Add(){
      if (this.school!==''&&this.desc!==''){
        this.$axios.get('addCam',{
          params:{
            schoolName:this.school,
            Message:this.desc
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
        if (this.desc===''){
          this.$notify.error({
            title: '错误',
            message: '消息不可为空'
          });
        }
      }
    }
  },
}
</script>

<style scoped>

</style>
