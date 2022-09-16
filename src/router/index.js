import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes.js'
// 引入store
import store from '@/store'

Vue.use(VueRouter)
// 需要重写VueRouter.prototype原型对象身上的push|replace方法
// 先把VueRouter.prototype身上的push|replace方法进行保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  // 第一个形参：路由跳转的配置对象（query|params）
  // 第二个参数：undefined|箭头函数（成功的回调）
  // 第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    // push方法传递第二个参数|第三个参数（箭头函数）
    // originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject)
  } else {
    // push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    )
  }
}
// 重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => { },
      () => { }
    )
  }
}
const router = new VueRouter({
  routes,
  // 控制页面跳转后所显示的位置
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  next()
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          await store.dispatch('userLogoout')
          next('/login')
        }
      }
    }
  } else {
    const toPath = to.path
    // eslint-disable-next-line eqeqeq
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})

export default router
