<template>

  <el-main>
    <el-table
      :data="this.tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="videoId"
        label="视频编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="videoName"
        label="视频名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="文件名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="releaseTime"
        label="发布时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="temperature"
        label="体温"
        width="180">
      </el-table-column>
      <el-table-column
        prop="healthcondition"
        label="健康状况"
        width="120">
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </div>
  </el-main>

<!--  <div>-->
<!--    <div class="con">-->
<!--      <div class="tip">选择文件：</div>-->
<!--      <input class="file" type="file" title="请选择文件" value="请选择文件">-->
<!--&lt;!&ndash;      <div class="tip">输入姓名：</div>&ndash;&gt;-->
<!--&lt;!&ndash;      <input class="inputS" type="text" v-model="name" placeholder="请在此输入姓名">&ndash;&gt;-->
<!--      <button class="submit" @click="submit">提交</button>-->
<!--    </div>-->
<!--  </div>-->



</template>

<script>
  import axios from 'axios'

  var formData = new FormData() // 声明一个FormData对象
  var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
  export default {
    data() {
      return {
        name: '',
        User: this.$route.params.Userid,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage:1,
        pagesize:5,
        tableData: [
        ],
        // file: ''
      }
    },
    methods: {
      submit: function() {
        formData.append('file', document.querySelector('input[type=file]').files[0]) // 'file' 这个名字要和后台获取文件的名字一样;
        formData.append('user',this.name)
        //'userfile'是formData这个对象的键名
        axios({
          url: 'http://localhost:9901/ensure/uploadwork',   //****: 你的ip地址
          data: formData,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
            //这里是为了解决跨域问题，但是博主并没有用这种方式解决。后面会给出解决方案
          }
        }).then((res) => {
          console.log(res.data);
        }) // 发送请求
      },

      getTableDate:function(val){
        // let that=this;
        this.$axios.get("SafetyEducationInf/SafetyAll",{
          params:{
            page:val,
            uaccount: this.User,
            // ad
          },
        }).then(response=>{
          console.log(response.data)
          this.tableData = response.data;
        }).catch(error=>{
          console.log(error)
          //sdasd
        });
      },
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange:function(val) {
        console.log(`每页 ${val} 条`);
        this.getTableDate(val);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getTableDate(val);
      }
    },

    mounted () {
      this.getTableDate(1);
    }
  }
</script>

<style scoped>
  /*// css属性由读者自行实现*/
</style>
