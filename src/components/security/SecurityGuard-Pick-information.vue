<template>
  <el-calendar>
  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
  <template
    slot="dateCell"
    slot-scope="{date, data}">
    {{ data.day.split('-').slice(1).join('-') }}<br />
    <p :class="data.isSelected ? 'is-selected' : ''"
       v-for="datas in  indate"
       v-if="datas.date == data.day"
       :key="datas.pid">
      <a v-if="datas.timeClass == '上午'">
        <el-tag type="success" v-if="datas.state == '正常'">正常接送</el-tag>
        <el-tag type="info" v-else-if="datas.state == '请假'">请假</el-tag>
        <el-tag type="danger" v-else-if="datas.state =='迟到'">迟到</el-tag>
        上午:<a v-if="datas.state != '请假'">{{datas.time}}{{datas.uname}}</a>
      </a>
      <a v-if="datas.timeClass == '下午'">
        <el-tag type="success" v-if="datas.state == '正常'">正常接送</el-tag>
        <el-tag type="info" v-else-if="datas.state == '请假'">请假</el-tag>
        <el-tag type="danger" v-else-if="datas.state =='迟到'">迟到</el-tag>
        下午:<a v-if="datas.state != '请假'">{{datas.time}}{{datas.uname}}</a>
      </a>
<!--      {{ data.day.split('-').slice(1).join('-') }}<br />-->
<!--      上午:<el-tag type="success">正常接送</el-tag>20:20&nbsp妈妈<br />-->
<!--      下午:<el-tag>放假</el-tag>-->
<!--      <el-tag type="success">正常接送</el-tag>-->
<!--      <el-tag type="info">请假</el-tag>-->
<!--      <el-tag type="warning">未接送</el-tag>-->

    </p>
  </template>
  </el-calendar>
</template>

<script>
    export default {
        name: "SecurityGuard-Pick-information",
        data(){
          return{
            indate:[]
          }
        },
        methods:{
           GetPick(){
             var thse = this;
             let datas = {
               BID: this.babyID
             }
             this.$axios({
               method: 'post',
               data:this.$qs.stringify(datas),
               url: '/Security/GetPick',
             }).then(function (response) {
               thse.indate = response.data;
               console.log(response.data)
             })
           }
        },
        mounted(){
          this.GetPick();
        },
        props:["babyID"]
    }
</script>

<style scoped>

</style>
