
console.log("开始执行")
// 创建多边形
  var map = new AMap.Map("container", {
    resizeEnable: true,
    zoom: 20
  });

// 创建多边形
  var path = [
    [118.178687,24.492694],
    [118.178746,24.492591],
    [118.178242,24.492381],
    [118.178183,24.492513]
  ];
  var polygon = new AMap.Polygon({
    map: map,
    fillOpacity:0.4,
    path: path
  });

// 创建点
  var marker = new AMap.Marker({
    map: map,
    draggable:true,
    position: [118.178558,24.492562]
  });

  function compute(){
    var point = marker.getPosition();
    var isPointInRing = AMap.GeometryUtil.isPointInRing(point,path);
    marker.setLabel({
      content:isPointInRing?'内部':'外部',
      offset:new AMap.Pixel(20,0)
    });
  }

  compute();
// 为marker绑定拖拽事件
  marker.on('dragging',compute)
  map.setFitView();

