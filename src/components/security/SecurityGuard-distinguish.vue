<template>
  <div>
    <video id="video" class="bg"></video>
    <el-button @click="openMedia"> 开启</el-button>
    <el-button @click="closeMedia"> 关闭</el-button>
    <el-button @click="jt">截图</el-button>
    <canvas id="canvas" style=""></canvas>
  </div>
</template>

<script>
    export default {
        name: "SecuritGuard-distinguish",
      date(){
          return{
            mediaStreamTrack:'',
            canvas1:'',
            context1:''
          }
      },
      methods:{
        jt(){
          var video = document.getElementById('video');
          var thie = this;
          thie.context1.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          console.log(document.getElementById("canvas").toDataURL("image/png"))

        },
        successFunc(stream) {
          this.mediaStreamTrack = stream;
          var video = document.getElementById('video');
          console.log(video)
          if ("srcObject" in video) {
            video.srcObject = stream
          } else {
            video.src = window.URL && window.URL.createObjectURL(stream) || stream
          }
          video.play();
        },
        errorFunc(err) {
          alert(err.name);
        },
        openMedia(){
          this.Soket()
          var thie = this;
          var mediaOpts= {
            audio: false,
            video: { facingMode: "user"} // 或者 "user"
          }
          navigator.mediaDevices.getUserMedia(mediaOpts).then(thie.successFunc).catch(thie.errorFunc);
        },
        closeMedia(){
          this.mediaStreamTrack.getVideoTracks().forEach(function (track) {
          track.stop();
        });
        },
        Soket(){
          var video = document.getElementById('video');
          var thie = this;
          var message = this.$message;
          //判断当前浏览器是否支持WebSocket, 主要此处要更换为自己的地址
        }

      },
      mounted(){
          var video = document.getElementById('video');
          this.canvas1 =  document.getElementById('canvas');
          this.context1 = this.canvas1.getContext('2d');
      }
    }
</script>

<style scoped>

</style>
