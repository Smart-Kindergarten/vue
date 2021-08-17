<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:9901/uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <br><b>上传图片</b>
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
        <div style="width: 50%; margin: 0 auto;">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div style="margin-top: 10px">
        <el-input placeholder="请输入幼儿园名称" v-model="form.schoolName" prop="schoolName">
          <template slot="prepend">幼儿园名称:</template>
        </el-input>
      </div>

      <div style="margin-top: 10px">
        <el-input placeholder="请输入法人" v-model="form.legalPerson">
          <template slot="prepend">法人:&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</template>
        </el-input>
      </div>

      <div style="margin-top: 10px">
        <el-input placeholder="请输入法人身份证" v-model="form.legalPersonId">
          <template slot="prepend">法人身份证:</template>
        </el-input>
      </div>

      <div style="margin-top: 10px">
        <el-input placeholder="请输入地址" v-model="form.address">
          <template slot="prepend">地址:&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</template>
        </el-input>
      </div>

      <div style="margin-top: 10px">
        <el-input placeholder="请输入联系电话" v-model="form.TLE">
          <template slot="prepend">联系电话:&ensp;&ensp;</template>
        </el-input>
      </div>

      <div style="margin-top: 10px">
        <el-input placeholder="请输入办学许可证" v-model="form.schoolPermit">
          <template slot="prepend">办学许可证:</template>
        </el-input>
      </div>

      <div style="margin-top: 10px">
        <el-input placeholder="请输入卫生许可证" v-model="form.hygienicLicense">
          <template slot="prepend">卫生许可证:</template>
        </el-input>
      </div>
      <div style="margin-top: 10px">
        <el-input placeholder="请输入消防许可证" v-model="form.firePermit">
          <template slot="prepend">消防许可证:</template>
        </el-input>
      </div>

      <div style="margin-top: 10px">
        <el-input placeholder="请输入组织代码证" v-model="form.organizationPermit">
          <template slot="prepend">组织代码证:</template>
        </el-input>
      </div>
      <div style="margin-top: 10px">
        <el-input placeholder="请输入税务登记证" v-model="form.TaxPermit">
          <template slot="prepend">税务登记证:</template>
        </el-input>
      </div>
      <div style="margin-top: 10px">
        <el-button type="warning" round @click="up">上传信息</el-button>
        <el-button type="warning" round @click="reset">重置信息</el-button>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'KLMain',
  data(){
    return{
      checkUp:'',
      formLabelWidth: '80px',
      imageUrl: '',
      form: {
        schoolName: '',
        legalPerson: '',
        legalPersonId: '',
        address: '',
        TLE: '',
        schoolPermit: '',
        hygienicLicense: '',
        firePermit: '',
        organizationPermit: '',
        file: ''
      },
    }
  },
  methods: {
    up () {
      if (this.form.schoolName !== '' && this.form.legalPerson !== '' && this.form.legalPersonId !== '' && this.form.address !== ''
        && this.form.TLE !== '' && this.form.schoolPermit !== '' && this.form.hygienicLicense !== '' && this.form.firePermit !== ''
        && this.form.organizationPermit !== '' && this.form.TaxPermit !== ''
      ) {
        this.$axios.get('upData', {
          params: {
            schoolName: this.form.schoolName,
            legalPerson: this.form.legalPerson,
            legalPersonId: this.form.legalPersonId,
            address: this.form.address,
            TLE: this.form.TLE,
            schoolPermit: this.form.schoolPermit,
            hygienicLicense: this.form.hygienicLicense,
            firePermit: this.form.firePermit,
            organizationPermit: this.form.organizationPermit,
            TaxPermit: this.form.TaxPermit,
          }
        }).then(response => {
          console.log('--------------------')
          this.checkUp = response.data
          console.log(this.checkUp)
          if (this.checkUp === "成功") {
            this.$message({
              message: '上传成功！',
              type: 'success',
            });
            this.form.schoolName = '',
              this.form.legalPerson = '',
              this.form.legalPersonId = '',
              this.form.address = '',
              this.form.TLE = '',
              this.form.schoolPermit = '',
              this.form.hygienicLicense = '',
              this.form.firePermit = '',
              this.form.organizationPermit = '',
              this.form.TaxPermit = ''
          } else {
            this.$message({
              message: '警告上传时发生错误，请联系管理员或重新上传！',
              type: 'warning'
            });
          }
        })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$message({
          message: '警告!您有信息未填写，请仔细核对。',
          type: 'warning'
        });
      }
    },
    reset () {
      this.form.schoolName = '',
        this.form.legalPerson = '',
        this.form.legalPersonId = '',
        this.form.address = '',
        this.form.TLE = '',
        this.form.schoolPermit = '',
        this.form.hygienicLicense = '',
        this.form.firePermit = '',
        this.form.organizationPermit = '',
        this.form.TaxPermit = ''
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      var value = res;
      this.form.address=value.add;
      this.form.schoolPermit=value.business;
      this.form.schoolName=value.name;
      this.form.legalPerson=value.legalPerson;
    },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>

<style scoped>
.el-textarea__inner{
  font-family:"Microsoft";
  font-size:20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
