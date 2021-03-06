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
import SecurityPick from '../components/security/SecurityGuard-Pick'
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
import ClassPhoto from '../components/teacher/ClassPhoto'
import ClassMessage from '../components/teacher/ClassMessage'
import TerraceInformation from '../components/terrace/TerraceInformation'
import ParentChildReading from '../components/terrace/ParentChildReading'
import SafetyEducationQuestions from '../components/terrace/SafetyEducationQuestions'
import LookInformation from '../components/patriarch/LookInformation'
import SecurityVideo from '../components/patriarch/SecurityVideo'
import LookBabyFood from '../components/patriarch/LookBabyFood'
import ceshis from '../components/terrace/ceshis'
import ceshisss from '../components/terrace/ceshisss'
import Approval from '../components/terrace/Approval'
import AuthorityManagement from '../components/terrace/AuthorityManagement'
import ClassManagement from '../components/kindergartenLeader/ClassManagement'
import CurriculumLeader from '../components/kindergartenLeader/CurriculumLeader'
import CampusBulletin from '../components/kindergartenLeader/CampusBulletin'
import Announcement from '../components/kindergartenLeader/Announcement'
import BabyParents from '../components/kindergartenLeader/BabyParents'
import BabyManagement from '../components/kindergartenLeader/BabyManagement'
import SecuityGuardAlert from '../components/security/SecurityGuard-alert'
import SecuityGuardLocation from '../components/security/SecurityGuard-location'
import SecurityGuardPersonalCenter from '../components/security/SecurityGuard-PersonalCenter'
// import SecuityAmapJS from '../components/security/test'
import LBT from '../components/view/LBT'
import SendMesgPatriarch from "../components/teacher/SendMesgPatriarch";
import SecurityGuardDistinguish from '../components/security/SecurityGuard-distinguish'
import Websocket from '../components/teacher/Websocket'
import ClassManage from "../components/kindergartenLeader/ClassManage";

Vue.use(Router)

const routes = [
  {path: '/', name: 'Login', component: Login},
  {path: '/Menu/:cid', name: 'Menu', component: Menu},
  {path: '/Login12306', name: 'Login12306', component: Login12306},
  {path: '/Reg12306', name: 'Reg12306', component: Reg12306},
  {
    path: '/Index', name: 'Index', component: Index,
    children: [
      {path: '/Login12306', name: 'Login12306', component: Login12306},
      {path: '/UserAdmin', name: 'UserAdmin', component: UserAdmin},
      {path: '/UserTable', name: 'UserTable', component: UsersTable},
      {path: '/Health', name: 'Health', component: Health},
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
      {path: '/TerraceInformation', name: 'TerraceInformation', component: TerraceInformation},
      {path: '/ParentChildReading', name: 'ParentChildReading', component: ParentChildReading},
      {path: '/SafetyEducationQuestions', name: 'SafetyEducationQuestions', component: SafetyEducationQuestions},
      {path: '/LookInformation', name: 'LookInformation', component: LookInformation},
      {path: '/SecurityVideo', name: 'SecurityVideo', component: SecurityVideo},
      {path: '/LookBabyFood', name: 'LookBabyFood', component: LookBabyFood},
      {path: '/ceshis', name: 'ceshis', component: ceshis},
      {path: '/ceshisss', name: 'ceshisss', component: ceshisss},
      {path: '/Approval', name: 'Approval', component: Approval},
      {path: '/AuthorityManagement', name: 'AuthorityManagement', component: AuthorityManagement},
      {path: '/ClassManagement', name: 'ClassManagement', component: ClassManagement},
      {path: '/ClassManage', name: 'ClassManage', component: ClassManage},
      {path: '/CurriculumLeader', name: 'CurriculumLeader', component: CurriculumLeader},
      {path: '/CampusBulletin', name: 'CampusBulletin', component: CampusBulletin},
      {path: '/Announcement', name: 'Announcement', component: Announcement},
      {path: '/BabyParents', name: 'BabyParents', component: BabyParents},
      {path: '/BabyManagement', name: 'BabyManagement', component: BabyManagement},
      {path: '/SecurityPick', name: 'SecurityPick', component: SecurityPick},
      {path: '/LBT', name: 'LBT', component: LBT},

      //teacher
      {path: '/Curriculum', name: 'Curriculum', component: Curriculum},
      {path: '/PublishHomework', name: 'PublishHomework', component: PublishHomework},
      {path: '/CheckHomework', name: 'CheckHomework', component: CheckHomework},
      {path: '/TeacherSafetyEducation', name: 'TeacherSafetyEducation', component: SafetyEducation},
      {path: '/CheckSafetyEducation', name: 'CheckSafetyEducation', component: CheckSafetyEducation},
      {path: '/ClassInfo', name: 'ClassInfo', component: ClassInfo},
      {path: '/SecuityGuardAlert', name: 'SecuityGuardAlert', component: SecuityGuardAlert},
      {path: '/SecurityGuardPersonalCenter', name: 'SecurityGuardPersonalCenter', component: SecurityGuardPersonalCenter},
      {path: '/SecuityGuardLocation', name: 'SecuityGuardLocation', component: SecuityGuardLocation},
      {path: '/ClassPhoto', name: 'ClassPhoto', component: ClassPhoto},
      {path: '/ClassAttendance', name: 'ClassAttendance', component: ClassAttendance},
      {path: '/ClassMessage', name: 'ClassMessage', component: ClassMessage},
      {path: '/Websocket', name: 'Websocket', component: Websocket},
      {path: '/SendMesgPatriarch', name: 'SendMesgPatriarch', component: SendMesgPatriarch}
    ]
  },
  // { path:"/",name:"App",component: App},
  {path: '/AdminIndex', name: 'AdminIndex', component: AdminIndex},
  {path: '/Power', name: 'Power', component: Power},
  {path: '/SecurityGuardDistinguish', name: 'SecurityGuardDistinguish', component: SecurityGuardDistinguish},
  // {path: '/SecuityAmapJS', name: 'SecuityAmapJS', component: SecuityAmapJS}


]

export default new Router({
  mode: 'history',
  routes: routes,

})


