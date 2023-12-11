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
    component: () => import('../mainPage')
  }
]

const router = new VueRouter({
  routes
})

export default router
