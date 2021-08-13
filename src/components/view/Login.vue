<template>
  <div class="login_container">
    <div>
      <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
        style="height:100%;">
      </vue-particles>
    </div>


    <div class="showImg">
      <img @mouseover="changeInterval(true)"
           @mouseleave="changeInterval(false)"
           v-for="(item) in imgArr"
           :key="item.id"
           :src="item.url"
           alt="暂无图片"
           v-show="item.id===currentIndex"
      >

      <div @click="clickIcon('up')" class="iconDiv icon-left">
        <i class="el-icon-caret-left"></i>
      </div>

      <div @click="clickIcon('down')" class="iconDiv icon-right">
        <i class="el-icon-caret-right"></i>
      </div>

      <div class="banner-circle">
        <ul>
          <li @click="changeImg(item.id)"
              v-for="(item) in imgArr"
              :key="item.id"
              :class="item.id===currentIndex? 'active': '' "
          ></li>
        </ul>
      </div>
    </div>
    <div class="login-container">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <el-form
        status-icon
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-page">
        <h3 class="title" style="margin-bottom: 20px">系统登录</h3>
        <el-form-item>
          <el-input type="text"

                    placeholder="用户名"
                    v-model="username"
          ></el-input>
          <br><br>
        </el-form-item>
        <el-form-item>
          <el-input type="password"
                    auto-complete="off"
                    placeholder="密码"
                    v-model="password"
          ></el-input>
          <br><br>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100px;height: 30px;"
                     @click.prevent="handleLogin">登录
          </el-button>
          <!--          <el-button type="primary" @click="handleRegister" style="width:100px;height: 30px;"-->
          <!--          >注册-->
          <!--          </el-button>-->
        </el-form-item>
      </el-form>
      <!--    <router-view></router-view>-->

    </div>

  </div>
</template>

<script>
  import Index from './Index'

  export default {
    // components: {
    //   Index
    // },
    name: 'Login',
    data() {
      return {
        currentIndex: 0,//当前所在图片下标
        timer: null,//定时轮询
        imgArr: [
          {
            id: 0,
            url: "./static/images/1.jpg",
          }, {
            id: 1,
            url: "./static/images/2.jpg",
          }, {
            id: 2,
            url: "./static/images/3.jpg",
          }, {
            id: 3,
            url: "./static/images/4.jpg",
          },
        ],
        username: '',
        password: ''
      }
    },
    methods: {

      handleRegister: function () {

      },
      handleLogin: function () {
        if (this.username === '') {
          alert('用户名不能为空')
        }
        if (this.password === '') {
          alert('密码不能为空')
        }
        if (this.username != '' && this.password != '') {
          this.$axios.get('admin/GGB2', {
            params: {
              uaccount: this.username,
              upwd: this.password,

            },
          }).then(response => {
            console.log(response.data[0].uaccount)
            this.$router.push({
              name: 'Health',
              params: {Userid: response.data[0].uaccount}
            })

            this.$router.push({
              name: 'Index',
              params: {Userid: response.data[0].uaccount}
            })

          }).catch(error => {
            console.log(error)
          })
          // this.$router.replace('/Login12306')
        } else {
          this.$message({
            showClose: true,
            message: '账号密码不能为空！',
            type: 'error'
          })
        }
      },
      //开启定时器
      startInterval() {
        // 事件里定时器应该先清除在设置，防止多次点击直接生成多个定时器
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.currentIndex++;
          if (this.currentIndex > this.imgArr.length - 1) {
            this.currentIndex = 0
          }
        }, 2000)
      },
      // 点击左右箭头
      clickIcon(val) {
        if (val === 'down') {
          this.currentIndex++;
          if (this.currentIndex === this.imgArr.length) {
            this.currentIndex = 0;
          }
        } else {
          /* 第一种写法
          this.currentIndex--;
          if(this.currentIndex < 0){
            this.currentIndex = this.imgArr.length-1;
          } */
          // 第二种写法
          if (this.currentIndex === 0) {
            this.currentIndex = this.imgArr.length;
          }
          this.currentIndex--;
        }
      },
      // 点击控制圆点
      changeImg(index) {
        this.currentIndex = index
      },
      //鼠标移入移出控制
      changeInterval(val) {
        if (val) {
          clearInterval(this.timer)
        } else {
          this.startInterval()
        }
      },
      //进入页面后启动定时轮询
      mounted() {
        this.startInterval()
      }
    }
  }
</script>

<style scoped>

  .login_container {
    background-image: linear-gradient(-180deg, #1a1454 0%, #2D3A4B 100%);
    z-index: -100;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }
  .login-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 300px;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 20px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }

  * {
    padding: 0;
    margin: 0;
  }

  /* 清除li前面的圆点 */
  li {
    list-style-type: none;
  }

  .showImg {
    position: absolute;
    width: 80%;
    height: 220px;
    margin: 20px auto;
    overflow: hidden;
    top: 20px;
    left: 150px;
  }

  /* 轮播图片 */
  .showImg img {
    width: 100%;
    height: 100%;
  }

  /* 箭头图标 */
  .iconDiv {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    border: 1px solid #666;
    border-radius: 15px;
    background-color: rgba(125, 125, 125, .2);
    line-height: 30px;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
  }

  .iconDiv:hover {
    background-color: white;
  }

  .icon-left {
    left: 10px;
  }

  .icon-right {
    right: 10px;
  }

  /* 控制圆点 */
  .banner-circle {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
  }

  .banner-circle ul {
    margin: 0 50px;
    height: 100%;
    text-align: right;
  }

  .banner-circle ul li {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin: 0 5px;
    border-radius: 7px;
    background-color: rgba(125, 125, 125, .8);
    cursor: pointer;
  }

  .active {
    background-color: black !important;
  }
</style>
