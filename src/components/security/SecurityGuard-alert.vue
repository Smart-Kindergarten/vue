<template>
  <el-container>
    <el-header height="300px">
      <h1>幼儿园名称:{{kdata[0].kname}}</h1>
      <a>日期：{{kdata[0].date}}</a>
      <baidu-map
        class="map"
        center="福建省厦门市湖里区软件园二期望海路25号楼之二5楼"
        :zoom="22"
        :dragging="false"
        :keyboard="false"
        :double-click-zoom="false">
        <bm-polygon :path="polygonPath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2">

        </bm-polygon>
<!--        <bm-marker :position></bm-marker>-->
      </baidu-map>
    </el-header>
    <el-main
    style="min-width: 1165px">
      <h3>报警日志</h3>
      <el-date-picker
        style="float: right"
        v-model="datelog"
        type="datetimerange"
        :editable="false"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="gkdata"
      >
      </el-date-picker>
      <el-table
        height="500px"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="aid"
          label="日志编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pname"
          label="日志类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="biname"
          label="触发人">
        </el-table-column>
        <el-table-column
          prop="time"
        label="触发时间">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>

</template>

<script>
    // import  'https://api.map.baidu.com/api?v=2.0&ak=';
    // import {loadBMap} from '../../../config/loadResources'
    export default {
        name: "SecuityGuard-alert",
        data(){
          return{
            datelog:'',
            tableData:[],
            kdata:[{
              kname:null,
              date:null
            }],
            kindergartenName:null,
            date:null,
            polygonPath:[
              {lng:118.184616,lat:24.498572},
              {lng:118.184678,lat:24.498445},
              {lng:118.185199,lat:24.498667},
              {lng:118.185128,lat:24.498803},
            ]
          }
        },
        methods:{
          // getlocation(){this.$nextTick(function(){
          //   try{
          //     const geolocation =new BMap.Geolocation();
          //     geolocation.getCurrentPosition(function(r){
          //       console.log(r,"aaaa");
          //     });
          //   }catch(e){
          //     console.log(e)
          //   }
          // })
          // }
          gkdata(){
            console.log(this.datelog)
            var thon = this;
            let datas = {
              minDate:'',
              maxDate:''
            }
            if(this.datelog != null && this.datelog != '' && this.datelog.length != 0){
              let d = this.datelog[0]
              datas.minDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate()) + ' '+this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
              d = this.datelog[1]
              datas.maxDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate()) + ' '+this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
            }
            this.$axios.post('/Security/getAlertlog',this.$qs.stringify(datas)).then(function (response) {
              thon.tableData = response.data
            })
          },
          p(s) {
            return s < 10 ? '0' + s : s
          },
          getLog(){
            var thon = this;
            this.$axios.post('/Security/getAlertlog').then(function (response) {
              thon.tableData = response.data
            })
          },
          getkdata(){
            var thon = this;
            this.$axios.post('/Security/getKdata').then(function (response) {
              thon.kdata = response.data
            })
          }
        },
        mounted() {
          this.getLog();
          this.getkdata();
        },
        created() {
          // window.initBaiduMapScript = () =>{
          //   console.log(BMap);
          //   this.getlocation();
          // }
          // loadBMap('initBaiduMapScript');
        },
    }
</script>
<style>
  .map {
    width: 300px;
    height: 200px;
    /*padding-left: 42%;*/
  }
  .anchorBL{
    display: none;
  }
</style>
