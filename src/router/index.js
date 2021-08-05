import Vue from 'vue'
import Router from 'vue-router'
import Menu from '../components/view/Menu'
import Login from '../components/view/Login'
import Login12306 from '../components/view/Login12306'
import Reg12306 from '../components/view/Reg12306'
import Index from '../components/view/Index'
import AdminIndex from '../components/admin/AdminIndex'
import UserAdmin from '../components/admin/UserAdmin'
import UsersTable from '../components/admin/UsersTable'
import Power from '../components/view/Power'
import Security from '../components/SecurityGuard'
import Curriculum from '../components/teacher/Curriculum'
import Health from '../components/patriarch/Health'
import Alipay from '../components/patriarch/Alipay'
import SendMessage from '../components/patriarch/SendMessage'
import ParentsManagement from '../components/terrace/ParentsManagement'
import SafetyEducationVideo from '../components/terrace/SafetyEducationVideo'
import PublishHomework from '../components/teacher/PublishHomework'
import FoodManage from '../components/patriarch/FoodManage'
import KLMain from '../components/kindergartenLeader/KLMain'
import TeacherManagement from '../components/kindergartenLeader/TeacherManagement'
import CheckHomework from '../components/teacher/CheckHomework'
import SafetyEducation from '../components/teacher/SafetyEducation'
import CheckSafetyEducation from '../components/teacher/CheckSafetyEducation'
import Healthmanage from '../components/Health/Healthmanage'
import ParkManage from '../components/accountmanage/ParkManage'
import intelligence from '../components/accountmanage/intelligence'
import ClassAttendance from '../components/teacher/ClassAttendance'
import ClassInfo from '../components/teacher/ClassInfo'

Vue.use(Router)

const routes = [
  {path: '/', name: 'Login', component: Login},
  {path: '/Menu/:cid', name: 'Menu', component: Menu},
  {path: '/Login12306', name: 'Login12306', component: Login12306},
  {path: '/Reg12306', name: 'Reg12306', component: Reg12306},
  {
    path: '/Index', name: 'Index', component: Index,
    children: [
      {path: '/UserAdmin', name: 'UserAdmin', component: UserAdmin},
      {path: '/UserTable', name: 'UserTable', component: UsersTable},
      {path: '/Health', name: 'Health', component: Health},
      {path: '/Security', name: 'Security', component: Security},
      {path: '/Alipay', name: 'Alipay', component: Alipay},
      {path: '/SendMessage', name: 'SendMessage', component: SendMessage},
      {path: '/ParentsManagement', name: 'ParentsManagement', component: ParentsManagement},
      {path: '/SafetyEducationVideo', name: 'SafetyEducationVideo', component: SafetyEducationVideo},
      {path: '/FoodManage', name: 'FoodManage', component: FoodManage},
      {path: '/KLMain', name: 'KLMain', component: KLMain},
      {path: '/TeacherManagement', name: 'TeacherManagement', component: TeacherManagement},
      {path: '/Healthmanage', name: 'Healthmanage', component: Healthmanage},
      {path: '/intelligence', name: 'intelligence', component: intelligence},
      {path: '/ParkManage', name: 'ParkManage', component: ParkManage},

      //teacher
      {path: '/Curriculum', name: 'Curriculum', component: Curriculum},
      {path: '/PublishHomework', name: 'PublishHomework', component: PublishHomework},
      {path: '/CheckHomework', name: 'CheckHomework', component: CheckHomework},
      {path: '/TeacherSafetyEducation', name: 'TeacherSafetyEducation', component: SafetyEducation},
      {path: '/CheckSafetyEducation', name: 'CheckSafetyEducation', component: CheckSafetyEducation},
      {path: '/ClassAttendance', name: 'ClassAttendance', component: ClassAttendance},
      {path: '/ClassInfo', name: 'ClassInfo', component: ClassInfo},
    ]
  },
  // { path:"/",name:"App",component: App},
  {path: '/AdminIndex', name: 'AdminIndex', component: AdminIndex},
  {path: '/Power', name: 'Power', component: Power},

]

export default new Router({
  mode: 'history',
  routes: routes,

})


