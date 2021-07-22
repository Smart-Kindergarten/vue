<template>
  <div class="bigdiv">
    <!-- 顶部 -->
    <div class="tophead">
      <!-- logo顶部左边 -->
      <div>
        <img src="../../../src/assets/image/铁路标志.jpg" class="imagesign">

      </div>

      <div style="border: 0px red solid;width: 300px;height: 100px;margin-left: 400px;">
        <font size="4.5" style="float:left;margin-top: 20px;margin-left: 0px;">欢迎登录12306</font>
      </div>
    </div>

    <div style="float: left;margin-top: 50px;width: 100%;height: 520px; border: 0px red solid;background-image: url('../../../src/assets/image/login1.png')">
      <div style="background-color: #FEFFFE;width: 400px;height: 400px;margin-left: 100px;margin-top: 50px;">
        <br>
        <div style="margin-top: 20px;text-align:center;">
          扫码登录 | 账号登录
        </div>  <br>  <br>
        <div style="text-align:center;">
          <font>用户： <input type="text" id="name" ></font>
          <br>  <br> <br>  <br>
          <font>密码： <input type="password" id="pwd"></font>
          <br>  <br><br>  <br><br>
          <input type="button" value="登录" style="width: 100px;height: 30px;">
        </div>
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
    name: 'Login12306'
  }
</script>

<style scoped>
  @import "../../../src/assets/css/12306reg.css";
</style>
