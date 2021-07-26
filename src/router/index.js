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
import Security from "../components/SecurityGuard";
import Curriculum from '../components/teacher/Curriculum'
import Health from '../components/patriarch/Health'
import Healthmanage from '../components/Health/Healthmanage'

Vue.use(Router)

const routes = [
  { path:"/",name:"Login",component: Login},
  { path:"/Menu/:cid",name:"Menu",component: Menu},
  { path:"/Login12306",name:"Login12306",component: Login12306},
  { path:"/Reg12306",name:"Reg12306",component: Reg12306},
  { path:"/Index",name:"Index",component: Index,
    children:[
      {path:'/UserAdmin',name:'UserAdmin',component:UserAdmin},
      {path:'/UserTable',name:'UserTable',component:UsersTable},
      {path:'/Curriculum',name:'Curriculum',component:Curriculum},
      {path:'/Health',name:'Health',component:Health},
      {path:'/Healthmanage',name:'Healthmanage',component:Healthmanage},
      { path:"/Security",name:"Security",component: Security},
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


