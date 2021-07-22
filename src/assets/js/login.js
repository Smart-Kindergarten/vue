console.log("1");
function logincheck(){
// 获得 元素对象值
console.log("1");
	var uname = document.getElementById("user").value;
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
    return true;
}