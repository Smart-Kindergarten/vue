<template>
  <div>
    <h1>聊天</h1>
    <div v-if="urid=='2'">
      <div style="margin: 10px auto">
        班级名称：
        <el-select v-model="classAry.classId" placeholder="请选择班级" @change="getClassId(classAry.classId)">
          <el-option v-for="item in classAry" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
        </el-select>
      </div>
    </div>
    <div v-else>
      <div style="margin: 10px auto"></div>
    </div>
    <div class="main_down">
      <div class="left">
        <div class="left_up">
          <div class="label_title">
            已建立会话
          </div>
          <div :class="curSessionId == item.id ? 'box_select' : 'box'" v-for="item in sessionList_already" :key="item.id">
            <div class="box_left" @click="startSession(item.id)">
              {{ item.listName }}
            </div>
            <div class="right_left">
              <div class="right_left_count">
                {{ item.unReadCount }}
              </div>
              <div class="right_left_del">
                <i class="el-icon-close" @click="delSession(item.id)"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="left_down">
          <div class="label_title">
            可建立会话
          </div>
          <div v-for="item in sessionList_not" :key="item.uid" class="box" @click="createSession(item.uid, item.uname)">
            <div class="box_left">
              {{ item.uname }}
            </div>
          </div>
        </div>

      </div>
      <div class="right">
        <div class="up" ref="element" id="msg_end">
          <div v-for="(item,i) in list" :key="i" :class="item.fromUserId === curUserId ? 'msg_right' : 'msg_left'">
            <div class="msg_right_up">
              {{ item.fromUserName }}
            </div>
            <div :class="item.fromUserId === curUserId ? 'msg_right_down' : 'msg_left_down'">
              {{ item.content }}
            </div>
          </div>

        </div>
        <div class="down">
          <el-input type="textarea" :rows="9" placeholder="请输入内容，回车发送！" @keyup.enter.native="sendMsg" v-model="textArea">
          </el-input>
          <!--<el-button  @click="sendMsg">发送</el-button>-->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Websocket',
  props: ['uacc'],
  data () {
    return {
      classAry: [],
      cId: '',
      textArea: '',
      list: [],
      curUserId: '',
      curUserName: '',
      curSessionId: '',
      sessionList_already: [],
      sessionList_not: [],
      urid: '',
    }
  },
  mounted () {
    // this.getClassName()
    this.getUser()

  },
  created () { // 页面创建生命周期函数

  },
  updated () {
    // 解决每次发消息到最后面
    var elmnt = document.getElementById('msg_end')
    elmnt.scrollTop = elmnt.scrollHeight
  },
  destroyed () { // 离开页面生命周期函数
    this.websocketClose()
  },
  methods: {
    //获取角色称号
    getUser () {
      this.$axios.get('teacher/getUserUrId').then(res => {
        // console.log(res.data)
        if (res.data != null) {
          this.urid = res.data
          this.getBabyClass()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getBabyClass () {
      console.log(this.urid)
      if (this.urid == '2') {
        this.getClassName()
      } else {
        this.$axios.get('teacher/getBabyClass').then(res => {
          console.log(res.data)
          if (res.data != null) {
            this.cId = res.data
            this.loginOrRegister()
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    //获取班级名称
    getClassName () {
      this.$axios.get('teacher/getClassName', {
        params: {
          uAccount: this.uacc
        }
      }).then(response => {
        this.loginOut()
        if (response.data != null) {
          this.classAry = response.data
        } else {
          this.$message({
            showClose: true,
            message: '无数据',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
        this.$message({
          showClose: true,
          message: error,
          type: 'error'
        })
      })
    },
    //获取班级id
    getClassId (value) {
      this.cId = value
      this.loginOrRegister()
    },
    initWebSocket (userId, sessionId) {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      this.websock = new WebSocket('ws://localhost:9901/websocket/' + userId + '/' + sessionId)
      this.websock.onopen = this.websocketOnopen
      this.websock.onerror = this.websocketOnerror
      this.websock.onmessage = this.websocketOnmessage
      this.websock.onclose = this.websocketClose
    },
    websocketOnopen () {
      console.log('WebSocket连接成功')
    },
    websocketOnerror (e) {
      console.log('WebSocket连接发生错误', e)
    },
    websocketOnmessage (e) {
      let data = JSON.parse(e.data)
      if (data instanceof Array) {
        // 列表数据
        this.sessionList_already = data
      } else {
        // 消息数据
        this.list.push(data)
      }
    },
    websocketClose (e) {
      if (this.curUserId != null) {
        if (this.curSessionId != null) {
          this.initWebSocket(this.curUserId, this.curSessionId)
        } else {
          this.initWebSocket(this.curUserId, 99999999)
        }
      } else {
        this.websock.close()
      }
      console.log('connection closed', e)
      console.log(e)
    },
    // 消息发送
    sendMsg () {
      console.log('消息发送')
      if (this.curSessionId == '') {
        return this.$message.error('请选择左边的对话框开始聊天!')
      }
      let data = {
        'fromUserId': this.curUserId,
        'fromUserName': this.curUserName,
        'content': this.textArea
      }
      this.list.push(data)
      this.websock.send(this.textArea)
      this.textArea = ''
    },

    // 登录
    loginOrRegister () {
      this.$axios.get('login').then(response => {
        console.log('登录', response.data.data)
        if (response.data.code == -1) {
          return this.$message.error(response.data.errDesc)
        }
        this.curUserId = response.data.data.uid
        this.curUserName = response.data.data.uname
        this.dialogVisible = false
        this.getSessionListNot()
        this.sessionListAlready()
        this.startSession(99999999)
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取可建立会话列表
    getSessionListNot () {
      this.$axios.get('sessionList/not', {
        params: {
          id: this.curUserId,
          classId: this.cId
        }
      }).then(response => {
        console.log('获取可建立会话列表', response.data.data)
        if (response.data.code == -1) {
          return this.$message.error(response.data.errDesc)
        }
        this.sessionList_not = response.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取已存在的会话列表
    sessionListAlready () {
      this.$axios.get('sessionList/already', {
        params: {
          id: this.curUserId
        }
      }).then(response => {
        console.log('获取已存在的会话列表', response.data.data)
        if (response.data.code == -1) {
          return this.$message.error(response.data.errDesc)
        }
        this.sessionList_already = response.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 创建会话
    createSession (toUserId, toUserName) {
      let thus = this
      this.$axios.get('createSession', {
        params: {
          id: this.curUserId,
          toUserId: toUserId,
          toUserName: toUserName,
        }
      }).then(response => {
        console.log('创建会话', response)

        if (response.data.code == -1) {
          return thus.$message.error(response.data.errDesc)
        }
        thus.getSessionListNot()
        thus.sessionListAlready()
      }).catch(error => {
        console.log(error)
      })
    },
    // 开始会话
    startSession (sessionId) {
      console.log('开始会话', this.websock)
      if (this.websock != undefined) {
        this.websock.close()
      }
      this.curSessionId = sessionId
      this.initWebSocket(this.curUserId, sessionId)
      this.msgList(sessionId)
    },
    // 删除会话
    delSession (sessionId) {
      let thus = this
      this.$axios.get('delSession', {
        params: {
          sessionId: sessionId
        }
      }).then(response => {
        console.log('删除会话', response)
        if (response.data.code == -1) {
          return thus.$message.error(response.data.errDesc)
        }
        thus.getSessionListNot()
        thus.sessionListAlready()
      }).catch(error => {
        console.log(error)
      })
    },
    // 退出登录
    loginOut () {
      this.$axios.get('loginOut').then(response => {
        console.log('退出登录', response.data.data)
        if (response.data.code == -1) {
          return this.$message.error(response.data.errDesc)
        }
        this.curUserId = ''
        this.curUserName = ''
        // return thus.$message.success('退出登录成功')
        console.log('退出登录成功')
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取消息数据
    msgList (sessionId) {
      this.$axios.get('msgList', {
        params: {
          sessionId: sessionId
        }
      }).then(response => {
        console.log('获取消息数据', response.data.data)
        if (response.data.code == -1) {
          return this.$message.error(response.data.errDesc)
        }
        if (response.data.data != null) {
          this.list = response.data.data
        } else {
          this.list = []
        }
        // 从新获取列表
        this.sessionListAlready()
      }).catch(error => {
        console.log(error)
      })
    },

  }
}
</script>

<style scoped>
.main {
  width: 980px;
  /* border: 1px #1890ff solid; */
  margin-top: 50px;
  height: 790px;
}

.main_up {
  width: 980px;
  height: 40px;
  /* border:1px red solid; */
}

.main_down {
  width: 981px;
  height: 750px;
  border: 1px #1890ff solid;
  margin: auto;
  display: flex;
  /*justify-self: "space-between";*/
}

.left {
  width: 300px;
  height: 750px;
  border-right: 1px #1890ff solid;
}

.left_up {
  width: 300px;
  height: 450px;
  overflow-y: auto;
  /* border: 1px red solid; */
}

.label_title {
  width: 282px;
  height: 25px;
  background-color: #f8f8f8;
  font-weight: 600;
  padding: 8px;
}

.left_down {
  width: 300px;
  height: 300px;
  overflow-y: auto;
  /* border: 1px green solid; */
}

.right {
  width: 680px;
  height: 750px;
  /* border-right: 1px #1890ff solid; */
}

.box {
  width: 250px;
  height: 22px;
  padding: 10px 25px 10px 25px;
  display: flex;
  justify-self: flex-end;
  /* border: 1px red solid; */
}

.box:hover {
  background-color: gainsboro;
  cursor: pointer;
}

.box_select {
  width: 250px;
  height: 22px;
  padding: 10px 25px 10px 25px;
  display: flex;
  justify-self: flex-end;
  background-color: gainsboro;
}

.box_left {
  width: 230px;
  height: 22px;
}

.right_left {
  width: 50px;
  height: 22px;
  display: flex;
  justify-content: space-between;
  /* border: 1px red solid; */
}

.right_left_count {
  /* border: 1px blue solid; */
  padding-left: 10px;
  width: 20px;
}

.right_left_del {
  width: 20px;
  padding-left: 10px;
}

.up {
  width: 680px;
  height: 550px;
  overflow-y: scroll;
  overflow-x: hidden;
  /* padding-bottom: 40px; */
  border-bottom: 1px #1890ff solid;
}

.msg_left {
  width: 675px;
  /* padding-left: 5px; */
  margin-top: 5px;
  /*border: 1px #1890ff solid;*/
  text-align: left;
}

.msg_left_up {
  height: 25px;
  margin-top: 5px;
}

.msg_left_down {
  height: 25px;
  /* border: 1px #1890ff solid; */
  padding-left: 10px;
  text-align: left;
}

.msg_right {
  width: 660px;
  /* padding-right: 20px; */
  margin-top: 5px;
  /* border: 1px #1890ff solid; */
  text-align: right;
}

.msg_right_up {
  height: 25px;

}

.msg_right_down {
  height: 25px;
  /* border: 1px #1890ff solid; */
  padding-right: 10px;
  text-align: right;
}

.down {
  width: 680px;
  height: 200px;
  /* border: 1px red solid; */
}
</style>
