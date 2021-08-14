<template>
  <div>
    <div id="myChart" ref="myChart" :style="{width: '800px', height: '300px'}"></div>
    <div id="main" style="width: 400px;height: 400px;"></div>
    <div id="mains" style="width: 600px;height: 400px;float: right;margin-top: -420px;"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {

    data () {
      return {
        charts: '',
        opinion: ["1", "3", "3", "4", "5"],
        // opinionData: ["3", "2", "4", "4", "5"]
        three: '',
        four: '',
        five: '',
        six: '',
        good:"",
        bad:"",
        ordinary:"",
        man: '',
        woman: '',
        charts: '',
        opinion: ['男', '女'],
      }
    },
    mounted () {
      this.getTableDate()
      this.pie()
      this.healthCondition()
    },
    methods: {
      drawLines(id) {
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['年龄']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },

          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["3","4","5","6"]

          },
          yAxis: {
            type: 'value'
          },

          series: [{
            name: '年龄',
            type: 'line',
            stack: '总量',
            data:[ this.three, this.four, this.five, this.six]
          }]
        })
    },
      drawPie (id) {
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'item',

          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: this.opinion
          },
          series: [
            {
              name: '性别',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'blod'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                 {value: this.man, name: '男'},
                 {value: this.woman, name: '女'}
               ]
            }
          ]
        })
      },
      drawLine () {
        // 初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.myChart)
        // 绘制图表
        myChart.setOption({
          title: {text: '健康状况柱状图'},
          tooltip: {},
          xAxis: {
            data: ['健康', '较差', '一般']
          },
          yAxis: {},
          series: [
            {
              name: '总数',//系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
              type: 'bar',
              itemStyle: {//
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: 'rgba(255,255,255,0)'},
                      {offset: 0.5, color: '#44C0C1'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
              },
              label: {//label要加入normal才可生效,label即为x轴对应Y轴的值
                normal: {
                  show: true,
                  color: 'red',//设置渐变时候控制不到颜色，只能通过全局textStyle来控制
                  position: 'top'
                }
              },
              barWidth: '40%',
              data: [this.good, this.bad, this.ordinary]
            }
          ]
        })
      },
      getTableDate: function () {
        // let that=this;
        this.$axios.get('SafetyEducationInf/age', {
          params: {
            // ad
          },
        }).then(response => {
          // console.log(response.data)
          this.three = response.data.three
          this.four = response.data.four
          this.five = response.data.five
          this.six = response.data.six
          // console.log(this.three)
          // console.log(this.four)
          // console.log(this.five)
          // console.log(this.six)

          this.$nextTick(function() {
            this.drawLines('mains')
          })

          this.drawLine()
        }).catch(error => {
          console.log(error)
          //sdasd
        })
      },

      pie: function () {
        // let that=this;
        this.$axios.get('SafetyEducationInf/pie', {
          params: {},
        }).then(response => {
          // console.log(response.data)
          this.man = response.data.man
          this.woman = response.data.woman
          this.drawPie('main')
        }).catch(error => {
          console.log(error)
          //sdasd
        })
      },


      healthCondition: function () {
        // let that=this;
        this.$axios.get('SafetyEducationInf/healthCondition', {
          params: {},
        }).then(response => {
          console.log(response.data.good)
          console.log(response.data.bad)
          console.log(response.data.ordinary)
          this.good=response.data.good
          this.bad=response.data.bad
          this.ordinary=response.data.ordinary
          this.drawLine()
        }).catch(error => {
          console.log(error)
          //sdasd
        })
      },


    }

  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

</style>
