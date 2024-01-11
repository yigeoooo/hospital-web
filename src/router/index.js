import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//重寫push與replace方法，接受路由重複跳轉到自身
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};


const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../Login')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../mainPage'),
    children:[
      {
        path:'RootMain',
        name:'RootMain',
        component:()=>import('@/views/root/RootMain')
      },
      {
        path:'DoctorInfo',
        name:'DoctorInfo',
        component:()=>import('@/views/root/DoctorInfo'),
        children: [
          {
            path:'schedulingInfo',
            name:'schedulingInfo',
            component:()=>import('@/views/root/scheduling/schedulingInfo.vue')
          },
          {
            path:'schedulingPlan',
            name:'schedulingPlan',
            component:()=>import('@/views/root/scheduling/schedulingPlan.vue')
          },
        ]
      },
      {
        path:'PatentInfo',
        name:'PatentInfo',
        component:()=>import('@/views/root/PatentInfo')
      },
      {
        path:'MedicalInfo',
        name:'MedicalInfo',
        component:()=>import('@/views/root/MedicalInfo')
      },
      {
        path:'Account',
        name:'Account',
        component:()=>import('@/views/root/Account'),
        children:[
          {
            path:'rootAccount',
            name:'rootAccount',
            component:()=>import('@/views/root/accountConduct/RootAccount')
          },
          {
            path:'doctorAccount',
            name:'doctorAccount',
            component:()=>import('@/views/root/accountConduct/DoctorAccount')
          },
          {
            path:'patientAccount',
            name:'patientAccount',
            component:()=>import('@/views/root/accountConduct/PatientAccount')
          },
        ]
      }
    ]
  },
  {
    path: '/doctorMain',
    name: 'doctorMain',
    component: () => import('../DoctorPage'),
    children: [
      {
        path: 'doctorMainPage',
        name: 'doctorMainPage',
        component: () => import('../views/doctor/DoctorMain'),
      },
      {
        path: 'scheduling',
        name: 'scheduling',
        component: () => import('../views/doctor/schedulingPlan'),
      },
      {
        path: 'treatInfo',
        name: 'treatInfo',
        component: () => import('../views/doctor/TreatInfo'),
      }
    ],
  },
  {
    path: '/patientMain',
    name: 'patientMain',
    component: () => import('../PatientPage'),
    children: [
      {
        path: 'patientMainPage',
        name: 'patientMainPage',
        component: () => import('../views/patient/PatientMain'),
      },
      {
        path: 'RegistrationInfo',
        name: 'RegistrationInfo',
        component: () => import('../views/patient/RegistrationInfo'),
      },
      {
        path: 'RegisteredOrders',
        name: 'RegisteredOrders',
        component: () => import('../views/patient/RegisteredOrders'),
      }
    ],
  }
]

const router = new VueRouter({
  routes
})

export default router
