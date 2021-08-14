<template>

    <div>定位测试页面<br />
      <dingtalk></dingtalk>
      序列号：<el-input v-model="serialize" placeholder="请输入序列号"></el-input><br />
      当前定位：<el-input v-model="dw"></el-input> <el-button @click="getuserwz">获取当前定位</el-button>
      <div id="container"></div>
<!--      <remote-js src="https://webapi.amap.com/maps?v=1.4.15&key=kHh6RIvClwEnteofGiGoeAhO7HQPxmjl"></remote-js>-->
<!--      <remote-js src="127.0.0.1:8080/SecuityAmapJS"></remote-js>-->
    </div>

</template>
<script>
    export default {
        name: "SecurityGuard-location",
        data(){
           return{
             dw:'',
             alerts:true,
             map:null,
             path:null,
             polygon:null,
             marker:null,
             AMap:window.AMap,
             serialize:'EEdup6hDBrsqQ0oP9!^BV640rcWI30L2',
             events : {
               init(map) {
                 AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
                   const marker = new SimpleMarker({
                     iconLabel: 'A',
                     iconStyle: 'red',
                     map: map,
                     position: map.getCenter(),
                   });
                 });
               }
             }
           }
        },
      methods: {
        getuserwz(){
          var thie = this;
          navigator.geolocation.getCurrentPosition(function (position) {

          },function (error) {

          });
          thie.AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new thie.AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 10000,          //超过10秒后停止定位，默认：5s
              buttonPosition:'RB',    //定位按钮的停靠位置
              buttonOffset: new thie.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
            });
            thie.map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
              if(status=='complete'){
                onComplete(result)
              }else{
                onError(result)
              }
            });
          });
          //解析定位结果
          function onComplete(data) {
            console.log(data)
            thie.dw = 'lng: '+data.position.lng+';lat:'+data.position.lat
          }
          //解析定位错误信息
          function onError(data) {
            thie.dw = '定位失败,失败原因排查信息:'+data.message
          }

        }
      },
      mounted() {
        var thie = this;
        setTimeout(function(){
          thie.AMap= window.AMap
        thie.map =
          new thie.AMap.Map("container", {
            center: [118.178687,24.492694],
          resizeEnable: true,
          zoom: 20
        });
// 创建多边形
        thie.path = [
          [118.178687,24.492694],
          [118.178746,24.492591],
          [118.178242,24.492381],
          [118.178183,24.492513]
        ];
        thie.polygon = new thie.AMap.Polygon({
          map: thie.map,
          fillOpacity:0.4,
          path: thie.path
        });

// 创建点
        thie.marker = new thie.AMap.Marker({
          map: thie.map,
          draggable:true,
          position: [118.178558,24.492562]
        });
        function compute(){
          var point = thie.marker.getPosition();
          var isPointInRing = thie.AMap.GeometryUtil.isPointInRing(point,thie.path);
          if(!isPointInRing && thie.alerts){
            thie.alerts = false
            let datas = {serialize:thie.serialize}
            thie.$axios.post('/Security/alert',thie.$qs.stringify(datas)).then(function (response) {
              console.log(response.data)
            })
            setTimeout(function () {
              thie.alerts = true
            },60000)
          }
          thie.marker.setLabel({
            content:isPointInRing?'内部':'外部',
            offset:new thie.AMap.Pixel(20,0)
          });
        }

        compute();
// 为marker绑定拖拽事件
          thie.marker.on('dragging',compute)
          thie.map.setFitView();

        },5000)
      },
      created() {

      },
      components: {
        'dingtalk': {
          render(createElement) {
            return createElement(
              'script',
              {
                attrs: {
                  type: 'text/javascript',
                  src: 'https://webapi.amap.com/maps?v=1.4.15&key=76a88e9ca23a71339c320e4625ad507b',
                },
              },
            );
          },
        },
      },
    }
</script>
<style>
  .map {
    width: 300px;
    height: 200px;
    padding-left: 42%;
  }
  #container{
    width: 500px;
    height: 500px;
  }
  .amap-logo{
    background-color: rgba(0,0,0,0);
    display: none;
    opacity: 0;
  }
  .amap-copyright{
    background-color: rgba(0,0,0,0);
    display: none;
    opacity: 0;
  }
</style>
