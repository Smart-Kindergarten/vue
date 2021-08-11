<template>
  <el-main>
    <div style="float: left">
      <font>查询条件</font><br>
      <font>上传时间:<input v-model="bgtime" type="text">至<input v-model="overtime" type="text"></font>
      <font>绘本名称:<input v-model="nameT" type="text"></font>
      <el-button @click="selectCondition(1)" type="primary" size="min">查询</el-button>
      <el-button @click="newClick" type="primary" size="min">上传绘本</el-button>




    </div>

    <el-table
      :data="this.tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="frid"
        label="绘本编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="bookname"
        label="绘本名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Folderaddress"
        label="文件夹地址"
        width="200">
      </el-table-column>
      <el-table-column
        prop="UploadTime"
        label="上传时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="reserve2"
        label="内容"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="400">
        <template slot-scope="scope">
          <el-button type="primary" size="min" @click="stateBook(scope.row)">查看绘本</el-button>
          <el-button @click="handleClick(scope.row)" type="primary" size="min">重新上传</el-button>
          <el-button @click="deletes(scope.row)" type="primary" size="min">删除</el-button>
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


    <el-dialog
      title="修改绘本"
      :visible.sync="dialogVisiblesss"
      width="45%"
      :modal="false"
      :before-close="handleClose">
      <input type="hidden" v-model="lookfrid">
      <el-form>绘本名称:<input type="text" ref="names" v-model="lookbookname"></el-form><br>
      <el-form>图片信息: <li>
        <h3>添加新图：</h3>
        <input  type="file"  name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image"  />
        <el-button @click="addImage" >确认添加</el-button>
      </li></el-form><br>
      <el-form>内容信息:<input type="text" v-model="lookcontent"></el-form><br>
      <el-form>页数:<input type="text"  v-model="lookpagess"></el-form><br>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibless = false">取 消</el-button>
    <el-button type="primary" @click="update">确 定</el-button>
        <!--          //撒大声地-->
  </span>
    </el-dialog>




    <el-dialog
      title="查看绘本"
      :visible.sync="dialogVisibles"
      width="45%"
      :modal="false"
      :before-close="handleClose">

      <el-form>绘本名称:<input style="border-style: none;" type="text" ref="names" v-model="lookbookname"></el-form><br>
      <el-form>图片信息:
        <br><img style="width: 300px;height: 300px;" v-model="Folderaddress" :src="'http://localhost:9901/images/images/'+lookbookname+'.jpg'"></el-form>

<!--      <a href="http://localhost:9901/images/images/永远爱你.jpg"></a>-->
      <el-form>内容信息:<input style="border-style: none;" type="text" v-model="lookcontent"></el-form><br>


      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisibles = false">确定</el-button>
<!--    <el-button type="primary" @click="affirmAdd">确 定</el-button>-->
        <!--          //撒大声地-->
  </span>
    </el-dialog>


    <el-dialog
      title="上传绘本"
      :visible.sync="dialogVisibless"
      width="45%"
      :modal="false"
      :before-close="handleClose">
      <el-form>绘本名称:<input type="text" ref="names" v-model="bookname"></el-form><br>
      <el-form>图片信息: <li>
        <h3>添加新图：</h3>
        <input  type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image"/>
        <el-button @click="addImage">确认添加</el-button>
      </li>


      </el-form><br>
      <el-form>内容信息:<input type="text" v-model="content"></el-form><br>
      <el-form>页数:<input type="text"  v-model="pagess"></el-form><br>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibless = false">取 消</el-button>
    <el-button type="primary" @click="affirmAdd">确 定</el-button>
        <!--          //撒大声地-->
  </span>
    </el-dialog>
  </el-main>



</template>

<script>
  export default {
    name: 'ParentChildReading',
    data () {
      return {

        nameT : "",
        bgtime : "",
        overtime: "",
        delectid : "",
        lookfrid : "",
        lookbookname :"",
        lookcontent :"",
        lookpagess :"",
        frid : "",
        Folderaddress :"",
        bookname :"",
        booknames : "",
        content :"",
        reserve2 : "",
        pagess :"",
        questionForm: {
          myphotos: "",
          uaccount: "",
          biname:"",
          uname: "",
          uwork: "",
          usite: "",
          uphone: "",
          uchildrelation: "",
        },
        dialogFormVisible: false,
        dialogVisible: false,
        dialogVisibless:false,
        dialogVisibles : false,
        dialogVisiblesss:false,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage: 1,
        pagesize: 5,
        maxlengrh: 0,
        tableData: [],
        babyinf:[
          {
            biname:""
          },
        ],
        biname:[],
      }

    },
    methods: {
      // 多条件查询
      selectCondition: function (val) {
        // let that=this;
        this.$axios.get('SafetyEducationInf/readInf', {
          params: {
            UploadTime : this.bgtime,
            UploadTimes: this.overtime,
            bookname : this.nameT,
            page: val,
          },
        }).then(response => {
          console.log(response.data)
          this.tableData = response.data
          this.maxlengrh = response.data.length
        }).catch(error => {
          console.log(error)
          //sdasd
        })
      },
      // 删除
      deletes (row){
        console.log(row.frid)
        this.delectid = row.frid
        this.$axios.get('SafetyEducationInf/delectbook', {
          params: {
            delectid : this.delectid
          },
        }).then(response => {
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 查看绘本
      stateBook (row) {

        this.dialogVisibles = true
        this.lookfrid = row.frid
          this.lookbookname =row.bookname;
        this.lookcontent =row.reserve2;
        this.Folderaddress = row.Folderaddress;
        // this.$axios.get('Terrace/updateState', {
        //   params: {
        //     uaccount: row.uaccount,
        //     ustate: row.pname,
        //   },
        // }).then(response => {
        //   console.log(response.data)
        //
        //   this.getTableDate(1)
        // }).catch(error => {
        //   console.log(error)
        // })
      },
      addImage: function () {
        let self = this;
        console.log(self.$refs.new_image.files);
        if (self.$refs.new_image.files.length !== 0) {
          var formData = new FormData()
          formData.append('image_data', self.$refs.new_image.files[0]);
          //单个文件进行上传
          this.$axios.post('/addImage', formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            params: {
              name : this.$refs.names.value,
            },
          }).then(response => {

          })
        }

      },
      onUpload(e){
        var files = e.target.files[0];
        var formFile = new FormData();
        formFile.append("file", files);
        $.ajax({
          url: baseURL + 'sys/upload/uploadPic',//这里是请求后台的上传文件接口
          type: 'POST',
          dataType: 'json',
          cache: false,
          data: formFile,
          processData: false,
          contentType: false,
          success: function(r){

            if (r.code === 0) {
              vm.menu.menuImgUrl = r.fileUrl;
              $(".file-area").css("display","block");
              $(".file-area").html("<img src= '"+ r.fileUrl +"'>");
            }else{
              alert("文件上传失败：" + r.msg);
            }
          }
        });
      },
      handleCreate() {
        this.questionForm = {
          uaccount: "",
          biname:"",
          uname: "",
          uwork: "",
          usite: "",
          uphone: "",
          uchildrelation: "",
        };
        this.dialogFormVisible = true;
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      getTableDate: function (val) {
        // let that=this;
        this.$axios.get('SafetyEducationInf/readInf', {
          params: {
            page: val,
          },
        }).then(response => {
          console.log(response.data)
          this.tableData = response.data
          // this.maxlengrh = response.data.length
        }).catch(error => {
          console.log(error)
          //sdasd
        })
      },
      // 重新上传
      handleClick (row) {
        this.dialogVisiblesss = true
        this.lookfrid = row.frid
      },

      // 新建用户
      newClick (){
        this.$axios.get('Terrace/selectBabyinf', {
        }).then(response => {
          // console.log(response.data)
          this.babyinf = response.data
          console.log(this.biname)
          this.dialogVisibless = true
        }).catch(error => {
          console.log(error)
        })
      },
      // 重新上传绘本 确认修改
      update (row) {
        this.dialogVisiblesss = false
        this.$axios.get('SafetyEducationInf/updateBook', {
          params: {
            frid : this.lookfrid,
            bookname :this.lookbookname,
            content :this.lookcontent,
            pagess :this.lookpagess,

          },
        }).then(response => {
          console.log(response.data)
          this.dialogVisibless = false
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 确认修改
      affirmClick (row) {
        this.dialogVisible = false
        console.log(this.questionForm.uaccount)
        console.log(this.questionForm.uname)
        console.log(this.questionForm.uwork)
        console.log(this.questionForm.usite)
        console.log(this.questionForm.uphone)
        console.log(this.questionForm.uchildrelation)
        this.$axios.get('Terrace/affirmClick', {
          params: {
            uname: this.questionForm.uname,
            uwork: this.questionForm.uwork,
            usite: this.questionForm.usite,
            uphone: this.questionForm.uphone,
            uchildrelation: this.questionForm.uchildrelation,
            uaccount: this.questionForm.uaccount,
          },
        }).then(response => {
          console.log(response.data)
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 确认新增
      affirmAdd (row) {


        this.$axios.get('SafetyEducationInf/pictureBook', {
          params: {
            bookname :this.bookname,
            booknames :this.booknames,
            content :this.content,
            pagess :this.pagess,

          },
        }).then(response => {
          console.log(response.data)
          this.dialogVisibless = false
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      //分页
      handleSizeChange: function (val) {
        console.log(`每页 ${val} 条`)
        this.getTableDate(val)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.getTableDate(val)
      }
    },
    mounted () {
      this.getTableDate(1)
    }
  }

</script>

