console.log("1");
function regcheck(){
	var uname = document.getElementById("names").value;
	var pwd = document.getElementById("pwds").value;
		//判断
		if(uname == '' || uname.length==0){
			alert("用户名不能为空");
			return false;
		}	
		if(pwd == '' || pwd.length==0 || pwd.length <6  ){
			alert("密码不能为空并且不能小于6位数");
			return false;
		}

	// 邮箱验证
	var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
  	 var obj = document.getElementById("mazey"); //要验证的对象
  　　if(obj.value === ""){ //输入不能为空
  	　　　　alert("邮箱输入不能为空!");
  	　　　　return false;
  　　}else if(!reg.test(obj.value)){ //正则验证不通过，格式不对
  	　　　　alert("邮箱验证不通过!");
  	　　　　return false;
  　　}else{
  	　　　　alert("邮箱通过！");
  	　　　　return true;
  　　}
  return true;
}


function Dsy()
{
	this.Items = {};
}
Dsy.prototype.add = function(id,iArray)
{
	this.Items[id] = iArray;
}
Dsy.prototype.Exists = function(id)
{
	if(typeof(this.Items[id]) == "undefined") return false;
	return true;
}

function change(v){
	var str="0";
	for(i=0;i<v;i++){ str+=("_"+(document.getElementById(s[i]).selectedIndex-1));};
	var ss=document.getElementById(s[v]);
	with(ss){
		length = 0;
		options[0]=new Option(opt0[v],opt0[v]);
		if(v && document.getElementById(s[v-1]).selectedIndex>0 || !v)
		{
			if(dsy.Exists(str)){
				ar = dsy.Items[str];
				for(i=0;i<ar.length;i++)options[length]=new Option(ar[i],ar[i]);
				if(v)options[1].selected = true;
			}
		}
		if(++v<s.length){change(v);}
	}
}

var dsy = new Dsy();

dsy.add("0",["安徽","北京","福建","甘肃"]);

dsy.add("0_0",["安庆","蚌埠","巢湖","池州","滁州","阜阳","合肥","淮北","淮南","黄山","六安","马鞍山","宿州","铜陵","芜湖","宣城","亳州"]);
dsy.add("0_0_0",["安庆市","怀宁县","潜山县","宿松县","太湖县","桐城市","望江县","岳西县","枞阳县"]);
dsy.add("0_0_1",["蚌埠市","固镇县","怀远县","五河县"]);
dsy.add("0_0_2",["巢湖市","含山县","和县","庐江县","无为县"]);
dsy.add("0_0_3",["池州市","东至县","青阳县","石台县"]);
dsy.add("0_0_4",["滁州市","定远县","凤阳县","来安县","明光市","全椒县","天长市"]);
dsy.add("0_0_5",["阜南县","阜阳市","界首市","临泉县","太和县","颖上县"]);
dsy.add("0_0_6",["长丰县","肥东县","肥西县"]);
dsy.add("0_0_7",["淮北市","濉溪县"]);
dsy.add("0_0_8",["凤台县","淮南市"]);
dsy.add("0_0_9",["黄山市","祁门县","休宁县","歙县","黟县"]);
dsy.add("0_0_10",["霍邱县","霍山县","金寨县","六安市","寿县","舒城县"]);
dsy.add("0_0_11",["当涂县","马鞍山市"]);
dsy.add("0_0_12",["灵璧县","宿州市","萧县","泗县","砀山县"]);
dsy.add("0_0_13",["铜陵市","铜陵县"]);
dsy.add("0_0_14",["繁昌县","南陵县","芜湖市","芜湖县"]);
dsy.add("0_0_15",["广德县","绩溪县","郎溪县","宁国市","宣城市","泾县","旌德县"]);
dsy.add("0_0_16",["利辛县","蒙城县","涡阳县","亳州市"]);

dsy.add("0_1",["北京"]);
dsy.add("0_1_0",["北京市","密云县","延庆县"]);

dsy.add("0_2",["福州","龙岩","南平","宁德","莆田","泉州","三明","厦门","漳州"]);
dsy.add("0_2_0",["长乐市","福清市","福州市","连江县","罗源县","闽侯县","闽清县","平潭县","永泰县"]);
dsy.add("0_2_1",["长汀县","连城县","龙岩市","上杭县","武平县","永定县","漳平市"]);
dsy.add("0_2_2",["光泽县","建阳市","建瓯市","南平市","浦城县","邵武市","顺昌县","松溪县","武夷山市","政和县"]);
dsy.add("0_2_3",["福安市","福鼎市","古田县","宁德市","屏南县","寿宁县","霞浦县","周宁县","柘荣县"]);
dsy.add("0_2_4",["莆田市","仙游县"]);
dsy.add("0_2_5",["安溪县","德化县","惠安县","金门县","晋江市","南安市","泉州市","石狮市","永春县"]);
dsy.add("0_2_6",["大田县","建宁县","将乐县","明溪县","宁化县","清流县","三明市","沙县","泰宁县","永安市","尤溪县"]);
dsy.add("0_2_7",["厦门市"]);
dsy.add("0_2_8",["长泰县","东山县","华安县","龙海市","南靖县","平和县","云霄县","漳浦县","漳州市","诏安县"]);

dsy.add("0_3",["白银","定西","甘南藏族自治州","嘉峪关","金昌","酒泉","兰州","临夏回族自治州","陇南","平凉","庆阳","天水","武威","张掖"]);
dsy.add("0_3_0",["白银市","会宁县","景泰县","靖远县"]);
dsy.add("0_3_1",["定西县","临洮县","陇西县","通渭县","渭源县","漳县","岷县"]);
dsy.add("0_3_2",["迭部县","合作市","临潭县","碌曲县","玛曲县","夏河县","舟曲县","卓尼县"]);
dsy.add("0_3_3",["嘉峪关市"]);
dsy.add("0_3_4",["金昌市","永昌县"]);
dsy.add("0_3_5",["阿克塞哈萨克族自治县","安西县","敦煌市","金塔县","酒泉市","肃北蒙古族自治县","玉门市"]);
dsy.add("0_3_6",["皋兰县","兰州市","永登县","榆中县"]);
dsy.add("0_3_7",["东乡族自治县","广河县","和政县","积石山保安族东乡族撒拉族自治县","康乐县","临夏市","临夏县","永靖县"]);
dsy.add("0_3_8",["成县","徽县","康县","礼县","两当县","文县","武都县","西和县","宕昌县"]);
dsy.add("0_3_9",["崇信县","华亭县","静宁县","灵台县","平凉市","庄浪县","泾川县"]);
dsy.add("0_3_10",["合水县","华池县","环县","宁县","庆城县","庆阳市","镇原县","正宁县"]);
dsy.add("0_3_11",["甘谷县","秦安县","清水县","天水市","武山县","张家川回族自治县"]);
dsy.add("0_3_12",["古浪县","民勤县","天祝藏族自治县","武威市"]);
dsy.add("0_3_13",["高台县","临泽县","民乐县","山丹县","肃南裕固族自治县","张掖市"]);



var s=["s1","s2","s3"];
var opt0 = ["省份","地级市","市、县级市、县"];
function setup()
{
	for(i=0;i<s.length-1;i++)
		document.getElementById(s[i]).onchange=new Function("change("+(i+1)+")");
	change(0);
}










// var datacity = new Array();
//
// datacity["福建省"] = ["福州市","厦门市"];
// datacity["四川省"] = ["重庆市","叙利亚市"];


// function loadProvince(){
// 	console.log(111);
// 	var Province = document.getElementById("pri");
// 	for (var Pro in datacity) {
// 		console.log(Pro);
// 		Province.add(new Option(Pro,Pro),null)
// 	}
// }
//
//
// //城市
// function loadcity(){
// 	var province = document.getElementById("pri").value;
// 	var city5 = document.getElementById("city2");
// 	console.log(city5);
// 		for (var i = 0; i < datacity[province].length; i++) {
// 		var c = datacity[province][i];
// 			city5.add(new Option(c,c),null)
// 	}
// }

// function loadCity(){
// 	var province = document.getElementById("pro").value;
// 	var city = document.getElementById("city2");
// 	for (var i = 0; i < datactiy[province].length; i++) {
// 		var c = datactiy[province][i];
// 		city.add(new Option(c,c),null);
// 	}
// }