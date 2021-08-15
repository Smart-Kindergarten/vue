export function loadBMap(funcName) {
  var script = document.createElement("script");
  script.src = "http://api.map.baidu.com/api?v=2.0&ak=EoNA6ts97UwMwPkqLITV0QPaRiP7PjdL&callback=" + funcName;
  document.body.appendChild(script);
}
