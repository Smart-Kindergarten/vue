<template>
  <div class="tab-container">
    <el-button
      class="filter-item"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-edit"
      @click="handleCreate"
    >修改</el-button>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
        :model="questionForm"
        ref="dataForm"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="账号" prop="questionContent">
          <el-input type="textarea" :rows="2" v-model="questionForm.uaccount"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="questionContent">
          <el-input type="textarea" :rows="2" v-model="questionForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="工作" prop="questionContent">
          <el-input type="textarea" :rows="2" v-model="questionForm.uwork"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="questionContent">
          <el-input type="textarea" :rows="2" v-model="questionForm.usite"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="questionContent">
          <el-input type="textarea" :rows="2" v-model="questionForm.uphone"></el-input>
        </el-form-item>
        <el-form-item label="亲子关系" prop="questionContent">
          <el-input type="textarea" :rows="2" v-model="questionForm.uchildrelation"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click=" createData() ">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        questionForm: {
          uaccount: "",
          uname: "",
          uwork: "",
          usite: "",
          uphone: "",
          uchildrelation: "",
        },
        dialogFormVisible: false,
      };
    },
    methods: {
      handleCreate() {
        this.questionForm = {
          uaccount: "",
          uname: "",
          uwork: "",
          usite: "",
          uphone: "",
          uchildrelation: "",
        };
        this.dialogFormVisible = true;
      },
      //添加增加题目
      async createData() {
        const params = this.questionForm;
        alert(JSON.stringify(params))

        // 如果需要调用接口，请打开注释
          const res = await saveSubject(params);
          console.log(res);
          if (res.code === "0000") {
            this.$message({
              type: "info",
              message: "保存成功",
            });
            this.dialogFormVisible = false;
            this.getQuerySubjectList();
            return;
          }
          this.$message({
            type: "error",
            message: "保存失败",
          });
      },
    },
  };
</script>
<style scoped>
</style>
