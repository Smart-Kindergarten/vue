import Vue from 'vue'
import Router from 'vue-router'
import Menu from '../components/view/Menu'
import Login from '../components/view/Login'
import Login12306 from '../components/view/Login12306'
import Reg12306 from '../components/view/Reg12306'
import Index from '../components/view/Index'
import AdminIndex from '../components/admin/AdminIndex'
import UserAdmin from '../components/admin/UserAdmin'
import App from '../App'
import UsersTable from '../components/admin/UsersTable'
import Power from '../components/view/Power'

Vue.use(Router)

const routes = [
  { path:"/Login",name:"Login",component: Login},
  { path:"/Menu/:cid",name:"Menu",component: Menu},
  { path:"/Login12306",name:"Login12306",component: Login12306},
  { path:"/Reg12306",name:"Reg12306",component: Reg12306},
  { path:"/",name:"Index",component: Index,
    children:[
      {path:'/UserAdmin',name:'UserAdmin',component:UserAdmin},
      {path:'/UserTable',name:'UserTable',component:UsersTable},
    ]
  },
  // { path:"/",name:"App",component: App},
  { path:"/AdminIndex",name:"AdminIndex",component: AdminIndex},
  { path:"/Power",name:"Power",component: Power},

]

export default new Router({
  mode : "history",
  routes :routes,


})


