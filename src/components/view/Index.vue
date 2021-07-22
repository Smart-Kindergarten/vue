<template xmlns:router="">
    <div style="margin-top: 0px;">
      <div>
      <Menu :msg ="msg"></Menu>
      <router-link to="/Login" >登录</router-link>
      <router-link to="/Menu/123" replace>菜单</router-link>
      <router-link to="/Login12306" >12306登录</router-link>
      <router-link to="/Reg12306">12306注册</router-link>
      <router-link to="/UserAdmin">用户管理</router-link>
        <router-link to="/Power">权限管理</router-link>


        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-menu
              router :default-active="this.$route.path"
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="index" v-for="(item,index) in menuData" :key="index">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.mbname}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="subItem.URL" v-for="(subItem,subIndex) in menuTwoData"
                                v-if="subItem.mbid === item.rid" :key="subIndex">
                    {{subItem.mbname}}
                    </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

            </el-menu>
          </div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple">
            <router-view></router-view>
          </div></el-col>
        </el-row>


      </div>



    </div>

</template>

<script>
  import Menu from './Menu'
  export default {
    data() {
      return {
        msg: '我是一个组件',
        // curpage:1,
        // pagesize :5,
        // tableData:[],
        menuData:[],
        menuTwoData:[],
      }
    },
    name: 'Index',
    components : {Menu : Menu},
    // mounted:function(){
            // this.MenuALL();//需要触发的函数
    //       },
    methods:{
      handleOpen :function (curPage) {
          this.curpage = curPage;
      },
      handleClose :function (val) {
        this.pagesize = val;
      },
      MenuALL:function () {
          this.$axios.get("admin/MenuAll",{
          }).then(response=>{
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].mbid === 0) {
                this.menuData.push(response.data[i]);
              }else {
                this.menuTwoData.push(response.data[i]);
                console.log(response.data[i]);
              }
            }
          }).catch((response) => {
            console.log(error)
          });
          // this.$router.replace('/Login12306')
      }

    }
  ,mounted() {
      this.MenuALL();
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
