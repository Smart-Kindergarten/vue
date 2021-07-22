<template>
  <div class="bigdiv">
    <!-- 顶部 -->
    <div class="tophead">
      <!-- logo顶部左边 -->
      <div>
        <img src="../../../src/assets/image/铁路标志.jpg" class="imagesign">
      </div>
      <!-- 顶部中间 -->
      <div class="train">
        <div>
          <!-- 输入框 -->
          <input type="text" name="readinput" class="readinput" placeholder="搜索车票/餐饮/常旅客/相关规章">
          <!-- 搜索按钮 -->
          <input type="button" name="search" class="search">

          <div class="logindiv">
            <!-- 语言 -->
            <ul class="language">
              <li class="lidiv poter">English
                <div class="slide">
                  <span class="topfont poter">中文简体</span>
                  <span class="topfont poter">English</span>
                </div>
              </li>
            </ul>
            <!-- 图片	 -->
            <img src="../../../src/assets/image/头部右边.png" class="imagetop">

            <!-- 顶部右边我的12306 -->
            <ul class="language">
              <li class="lidiv">我的12306
                <div class="slide">
                  <span class="topfont">火车票订单</span> <br>
                  <span class="topfont">候补订单</span><br>
                  <span class="topfont">计次•定期票订单</span><br>
                  <!-- <span class="topfont">约号订单</span><br>
                  <span class="topfont">本人车票</span><br> -->
                  <!-- 	<span class="topfont">我的餐饮•特产</span><br>
                      <span class="topfont">我的保险</span><br>
                      <span class="topfont">我的会员</span><br>
                      <span class="topfont">查看个人信息</span><br>
                      <span class="topfont">乘车人</span><br>
                      <span class="topfont">地址管理</span><br>
                      <span class="topfont">温馨</span><br> -->
                </div>
              </li>
            </ul>
            <!-- 图片	 -->
            <img src="../../../src/assets/image/头部右边.png" class="imagetop2">
            <font><a class="login" href="reg.html">登录</a></font>
            <font class="reg"><a href="reg.html">注册</a></font>
          </div>
        </div>
      </div>
    </div>
    <!-- 清除浮动 压下去 -->
    <div style="clear:left;"></div>
    <!-- 上面是顶部 -->
    <!-- 中部菜单 -->
    <div class="menubar">
      <ul class="homepage">
        <li class="menu ">首页
          <img src="../../../src/assets/image/菜单项.png" class="menuarrows">
          <!-- <div class="Menudisplay">

          </div> -->
        </li>
      </ul>

      <ul class="homepage">
        <li class="menu">车票
          <img src="../../../src/assets/image/菜单项.png" class="menuarrows">
          <div class="Menudisplay">
            <FONT class="menufont">购买</FONT>
            <FONT class="menufont">变更</FONT>
            <FONT class="menufont">English</FONT>
          </div>
        </li>
      </ul>


      <ul class="homepage">
        <li class="menu">团购服务
          <img src="../../../src/assets/image/菜单项.png" class="menuarrows">
          <div class="Menudisplay">
            <FONT class="menufont">购买</FONT>
            <FONT class="menufont">变更</FONT>
            <FONT class="menufont">English</FONT>
          </div>
        </li>
      </ul>


      <ul class="homepage">
        <li class="menu">会员服务
          <img src="../../../src/assets/image/菜单项.png" class="menuarrows">
          <div class="Menudisplay">
            <FONT class="menufont">购买</FONT>
            <FONT class="menufont">变更</FONT>
            <FONT class="menufont">English</FONT>
          </div>
        </li>
      </ul>


      <ul class="homepage">
        <li class="menu">车站服务
          <img src="../../../src/assets/image/菜单项.png" class="menuarrows">
          <div class="Menudisplay">
            <FONT class="menufont">购买</FONT>
            <FONT class="menufont">变更</FONT>
            <FONT class="menufont">English</FONT>
          </div>
        </li>
      </ul>


      <ul class="homepage">
        <li class="menu">商旅服务
          <img src="../../../src/assets/image/菜单项.png" class="menuarrows">
          <div class="Menudisplay">
            <FONT class="menufont">购买</FONT>
            <FONT class="menufont">变更</FONT>
            <FONT class="menufont">English</FONT>
          </div>
        </li>
      </ul>


      <ul class="homepage">
        <li class="menu">出行指南
          <img src="../../../src/assets/image/菜单项.png" class="menuarrows">
          <div class="Menudisplay">
            <FONT class="menufont">购买</FONT>
            <FONT class="menufont">变更</FONT>
            <FONT class="menufont">English</FONT>
          </div>
        </li>
      </ul>


      <ul class="homepage">
        <li class="menu">信息查询
          <img src="../../../src/assets/image/菜单项.png" class="menuarrows">
          <div class="Menudisplay">
            <FONT class="menufont">购买</FONT>
            <FONT class="menufont">变更</FONT>
            <FONT class="menufont">English</FONT>
          </div>
        </li>
      </ul>

    </div>
    <!-- 清除浮动 压下去 -->
    <div style="clear:left;"></div>


    <!-- 位置 -->
    <div class="place" style="margin-left: 250px;">
      <font>您现在的位置：</font>
      <font>客运首页></font>
      <font>注册</font>
    </div>


    <!-- 注册信息 -->
    <div class="regmessage" style="text-align:center">
      <div style="margin-top: 20px;">
        <span class="" style="margin-top: 50px;">*用户名： <input type="text"></span> <br><br>
        <span class="" style="margin-top: 50px;">*登录密码： <input type="text"></span> <br><br>
        <span class="" style="margin-top: 50px;">*确认密码：<input type="text"></span>  <br><br>
        <span class="" style="margin-top: 50px;">*证件类型：</span> <select name="" id=""><br>
        <option>中国居民身份证</option>
        <option>港澳居民来往内地通行证</option>
        <option>台湾居民来往大陆通行证</option>
        <option>护照</option>
      </select><br><br>
        <span class="" style="margin-top: 20px;">*姓名：<input type="text"></span>  <br><br>
        <span class="" style="margin-top: 20px;">*证件号码：<input type="text"></span>  <br><br>
        <span class="" style="margin-top: 20px;">*邮 箱：<input type="text"></span>  <br><br>
        <span class="" style="margin-top: 20px;">*手机号码（+86）：<input type="text"></span>  <br><br>
        <span class="" style="margin-top: 20px;">*旅客类型：<select name="" id="1"><br>
		<option>成人</option>
		<option>儿童</option>
		<option>学生</option>
		<option>残疾军人、伤残人民警察</option>
			</select></span>  <br><br>

        <input type="checkbox"><label>我已阅读并同意遵守</label>《中国铁路客户服务中心网站服务条款》《隐私权政策》
        <br><br>
        <input type="button" value="下一步">
      </div>
    </div>


    <!-- 友情链接 -->
    <div class="friend">
      <div class="fontfriend">
        <font>友情链接</font><br/>
        <img src="../../../src/assets/image/link05.png" class="imggefont">
        <img src="../../../src/assets/image/link02.png" class="imggefont2"> <br/>
        <img src="../../../src/assets/image/link03.png" class="imggefont3">
        <img src="../../../src/assets/image/link04.png" class="imggefont2">
      </div>

      <!-- 二维码 -->
      <div class="QR">
        <font class="QRfont">中国铁路官方微信</font>
        <font class="QRfont">中国铁路官方微博</font>
        <font class="QRfont">12306 公众号</font>
        <font class="QRfont">&nbsp&nbsp&nbsp&nbsp铁路12306</font>

        <div>
          <img src="../../../src/assets/image/zgtlwb.png" class="QEimage">
          <img src="../../../src/assets/image/zgtlwb.png" class="QEimage2">
          <img src="../../../src/assets/image/zgtlwb.png" class="QEimage2">
          <img src="../../../src/assets/image/zgtlwb.png" class="QEimage2">
        </div>

        <!-- 二维码文字 -->
        <div class="fonter">
          <span>官方APP下载，目前铁路未授权其他网站或APP开展类似服务内容，敬请广大用户注意。</span>
        </div>


      </div>
    </div>


    <!-- 底部 -->
    <div class="bottom">
      <font class="fontbottom">版权所有©2008-2020 中国铁道科学研究院集团有限公司</font> <br/>
      <font class="fontbottom">京ICP备05020493号-4 | ICP证：京B2-20202537</font>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Reg12306'
  }
</script>

<style scoped>
  @import "../../../src/assets/css/12306reg.css";
</style>
