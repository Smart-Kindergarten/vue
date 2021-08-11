<template xmlns:router="">
  <div style="background-color: #69818B;height: 790px;width: 100%">
    <div>
      <h1>智慧幼儿园管理系统</h1>
    </div>
  <div style="margin-top: 0px;">
    <div>
      <!--        {{User}}-->
      <el-row :gutter="20" >
        <el-col :span="4" >
          <div class="grid-content bg-purple" >
            <el-menu
              router :default-active="this.$route.path"
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu v-for="(item,index) in menuData" :key="item.mepid" :index="item.mepid" style="background-color: #69818B">
                <template slot="title" >
                  <i class="el-icon-s-grid" ></i>
                  <font style="color:white">{{ item.mename }}</font>
                </template>
                <el-menu-item-group style="background-color: #69818B" >
                  <el-menu-item  style="color:white" :index="subItem.meurl" v-for="(subItem,subIndex) in menuTwoData"
                                v-if="subItem.meid === item.mepid" :key="subIndex">
                    {{ subItem.mename }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!--              <el-submenu v-for="(item,index) in menuData" :key="item.mepid" >-->
              <!--                <template slot="title">-->
              <!--                  <i class="el-icon-location"></i>-->
              <!--                  <span>{{item.mename}}</span>-->
              <!--                </template>-->
              <!--                <el-menu-item-group>-->
              <!--                  <el-menu-item :index="subItem.meurl" v-for="(subItem,subIndex) in menuTwoData"-->
              <!--                                v-if="subItem.meid === item.mepid" :key="subIndex">-->
              <!--                    {{subItem.mename}}-->
              <!--                  </el-menu-item>-->
              <!--                </el-menu-item-group>-->
              <!--              </el-submenu>-->
            </el-menu>
          </div>
        </el-col>
        <el-col :span="18" >
          <div class="grid-content bg-purple">
            <router-view :uacc="User"></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
    </div>
  </div>

</template>

<script>
import Menu from './Menu'

export default {
  // 接受父组件的值
  // props: {
  //   inputName: String,
  //   required: true
  // },
  data () {
    return {
      msg: '我是一个组件',
      // curpage:1,
      // pagesize :5,
      // tableData:[],
      menuData: [],
      menuTwoData: [],
      User: this.$route.params.Userid,
    }
  },
  name: 'Index',
  components: {
    Menu: Menu,

  },
  // mounted:function(){
  // this.MenuALL();//需要触发的函数
  //       },
  methods: {
    handleOpen: function (curPage) {
      this.curpage = curPage
    },
    handleClose: function (val) {
      this.pagesize = val
    },
    MenuALL: function () {
      this.$axios.get('admin/MenuAll', {
        params: {
          uaccount: this.User,
        },
      }).then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].meid === 0) {
            this.menuData.push(response.data[i])
          } else {
            this.menuTwoData.push(response.data[i])
            console.log(response.data[i])
          }
        }
      }).catch((response) => {
        console.log(error)
      })
      // this.$router.replace('/Login12306')
    },

  },
  mounted () {
    this.MenuALL()
  }

}
</script>

<style scoped>
/*.el-row {*/
/*  margin-bottom: 20px;*/
/*&:last-child {*/
/*   margin-bottom: 0;*/
/* }*/
/*}*/
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
