<template>
  <el-main>
    <el-form>安全教育</el-form>
    <br>
    <font>完成时间</font> <font>{{startTime}}</font>至<font >{{endTime}}</font>
    <el-table
      :data="this.tableData"
      @selection-change="handleSizeChange"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="videoId"
        label="视频编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="videoName"
        label="视频名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="releaseTime"
        label="发布时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="secScore"
        label="得分"
        width="100">
      </el-table-column>
      <el-table-column
        prop="pname"
        label="完成情况"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="min" @click="updateClick(scope.row)">播放视频</el-button>
          <el-button @click="handleClick(scope.row)" type="primary" size="min">安全试题</el-button>
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
      title="提示"
      :visible.sync="dialogs"
      width="30%"
      :modal="false"
      :before-close="handleClose">
      <el-form>资讯编号:<input type="text" v-model="ttid"></el-form>

      <el-form>资讯名称:<input v-model="iftcontent"></input></el-form><br>

      <el-form>资讯内容: <br><textarea v-model="iftcontent" style="width: 300px;height: 200px"></textarea></el-form><br>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogs = false">取 消</el-button>
    <el-button type="primary" @click="affirmClick()">确 定</el-button>
  </span>
    </el-dialog>


    <div style="border: 1px solid red">
      <!--
      <video :src="videoSrc" :poster="videoImg" :autoplay="playStatus" height="421" width="700" :muted="muteStatus">
        your browser does not support the video tag
      </video>
      <button @click="playClick" :class="{hide: isPlay}">点击播放</button> -->
      <!--class="video-js vjs-default-skin vjs-big-play-centered" -->
      <video    :preload="preload"
                :poster="videoImg" :height="height" :width="width" align="center" :controls="controls"  :autoplay="autoplay">
        <source :src="videoSrc" type="video/mp4">
      </video>
    </div>


  </el-main>

</template>

<script>

  export default {
    name: 'SecurityVideo',

    data () {
      return {


        videoSrc: 'http://localhost:9901/images/video/测试视频3.mp4',
        videoImg: '../../../../static/full_res.jpg',
        playStatus: '',
        muteStatus: '',
        isMute: true,
        isPlay: false,
        width: '300', // 设置视频播放器的显示宽度（以像素为单位）
        height: '300', // 设置视频播放器的显示高度（以像素为单位）
        preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        autoplay: '',




        types : "",
        ttid : "",
        secScore : "",
        startTime : "",
        endTime :"",
        iftcontent : "",
        Createtime : "",
        questionForm: {
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
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage: 1,
        pagesize: 5,
        dialogs : false,
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
      handleCloses (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      getTableDate: function (val) {
        // let that=this;
        this.$axios.get('SafetyEducationInf/selectParentsVideo', {
          params: {
            page: val,
          },
        }).then(response => {
          console.log(response.data)
          this.tableData = response.data
          // this.maxlengrh = response.data.length
          console.log(response.data[0].startTime)
          console.log(response.data[0].endTime)
          this.startTime = response.data[0].startTime
          this.endTime = response.data[0].endTime
          if (response.data.secScore == "" || response.data.secScore == null){
            this.tableData.secScore == 0;

          }
        }).catch(error => {
          console.log(error)
          //sdasd
        })
      },
      // 删除
      handleClick (row) {
        console.log(row.ttid)
        this.$axios.get('SafetyEducationInf/delectTerraceInf', {
          params: {
            ttid: row.ttid,
          },
        }).then(response => {
          console.log(response.data)
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 发布
      stateClick (row) {
        console.log(row.uaccount)
        this.$axios.get('SafetyEducationInf/issue', {
          params: {
            ttid: row.ttid,
          },
        }).then(response => {
          console.log(response.data)

          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 新增资讯
      newClick (){
        this.dialogVisibless = true
      },
      // 修改
      updateClick (row) {
        this.dialogs = true
        this.ttid = row.ttid
        this.iftcontent = row. iftcontent
        this.Createtime = row.Createtime
        // this.$axios.get('Terrace/selectBabyinf', {
        // }).then(response => {
        //   console.log(response.data)
        //   this.babyinf = response.data
        // }).catch(error => {
        //   console.log(error)
        // })
      },
      // 确认修改
      affirmClick () {
        console.log("qqq")
        this.dialogs = false
        this.$axios.get('SafetyEducationInf/updateTerraceInf', {
          params: {
            ttid : this.ttid,
            iftcontent : this.iftcontent,
            Createtime : this.Createtime,
          },
        }).then(response => {
          console.log(response.data)
          this.getTableDate(1)
        }).catch(error => {
          console.log(error)
        })
      },
      // 确认新增
      affirmAdd () {
        this.$axios.get('SafetyEducationInf/addTerraceInf', {
          params: {
            ttid : this.ttid,
            iftcontent : this.iftcontent,
            types: this.types,
          },
        }).then(response => {
          this.babyinf = response.data
          this.getTableDate(1)
          this.dialogVisibless = false
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

