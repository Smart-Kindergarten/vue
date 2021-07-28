<template>

  <el-main>
    <div class="test2" >
      <el-upload style="margin-left:0px;margin-top:0px;"
                 class="avatar-uploader el-upload--text"
                 :drag="{Plus}"
                 action="http://localhost:9901/uploadVidoe3"
                 multiple
                 :show-file-list="false"
                 :data="{SavePath: this.Path.url}"
                 :on-success="handleVideoSuccess"

                 :on-progress="uploadVideoProcess">
        <!--      <i  v-if="Plus" class="el-icon-upload"></i>-->
        <!--      <div  v-if="Plus" class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>-->
        <!--      <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:0px;"></el-progress>-->
        <!--      <div class="el-upload__tip" slot="tip">只能上传mp4/flv/avi文件，且不超过300M</div>-->
        <el-button size="small" type="primary">上传视频</el-button>
      </el-upload>
    </div>
    <el-table
      :data="this.tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="videoId"
        label="视频编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="videoName"
        label="视频名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fileSite"
        label="文件地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="releaseTime"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        prop="videoId"
        width="200">
        <template slot-scope="scope">

          <el-upload :drag="Plus"
                     class="upload-demo"
                     action="http://localhost:9901/uploadVidoe3"
                     multiple="false"
                     :show-file-list="false"
                     :data="{'SavePath': Path.url,
                        'prop': voids,
                     }"
                     :on-success="handleVideoSuccess"
                     :on-progress="uploadVideoProcess">
              <el-button size="small" type="primary" slot="trigger"  @click="handleEdit(scope.$index, scope.row)">重新上传</el-button>
            </el-upload>
          <div class="dele">
            <el-button size="small" type="primary" slot="trigger">删   除</el-button>
          </div>

        </template>
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
</template>
<style>

  .dele{
    float: right;
    margin-top: -35px;
    height: 30px;
    width: 80px;
  }
    .el-upload-dragger{
    height: 30px;
    width: 80px;
    /*float: left;*/
  }
  .el-button{
    /*float: left;*/
  }
</style>
<script>
  export default {
    name: 'test2',
    data () {
      return {
        User: this.$route.params.Userid,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage:1,
        voids : -1,
        pagesize:5,
        tableData: [
        ],
        videoForm: {
          videoId: '',
          videoUrl: ''
        },
        videoFlag: false,
        Plus: true,
        Path: {
          url: 'F:/video/videoUpload'
        },
        videoUploadPercent: 0
      }
    },
    mounted () {
      this.getTableDate(1);
    },
    methods: {
      getTableDate:function(val){
        // let that=this;
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
        this.$axios.get("SafetyEducationInf/SafetyAll",{
          params:{
            page:val,
          },
        }).then(response=>{
          console.log(response.data)
          this.tableData = response.data;
          // this.voidid = response.data.videoId
        }).catch(error=>{
          console.log(error)
          //sdasd
        });
      },
      handleClick(row) {
        console.log(row);
      },
      handleEdit(row){
        console.log(this.tableData[row].videoId)
        this.voids = this.tableData[row].videoId

      },
      handleSizeChange:function(val) {
        console.log(`每页 ${val} 条`);
        this.getTableDate(val);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getTableDate(val);
    },

      // 视频上传过程中执行
      uploadVideoProcess (event, file, fileList) {
        this.Plus = false
        this.videoFlag = true
        this.videoUploadPercent = file.percentage.toFixed(0)
      },
      // 视频上传成功是执行
      handleVideoSuccess (res, file) {
        this.Plus = false
        this.videoUploadPercent = 100
        console.log(res)
        // 如果为200代表视频保存成功
        if (res.resCode === '200') {
          // 接收视频传回来的名称和保存地址
          // 至于怎么使用看你啦~
          this.videoForm.videoId = res.newVidoeName
          this.videoForm.videoUrl = res.VideoUrl
          this.$message.success('视频上传成功！')
          this.getTableDate(1)
        } else {
          this.$message.error('视频上传失败，请重新上传！')
        }
      },

    }
  }
</script>
