
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search/index.vue'
import Detail from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'
import Trade from '@/pages/Trade/index.vue'
import Pay from '@/pages/Pay/index.vue'
import PaySuccess from '@/pages/PaySuccess/index.vue'
import Center from '@/pages/Center/index.vue'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    // 路由懒加载
    component: () => import('@/pages/Home'),
    meta: { isShow: true }
  },
  {
    path: '/center',
    component: Center,
    meta: { isShow: true },
    // 二级路由
    children: [
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { isShow: true }
  },
  {
    path: '/pay',
    component: Pay,
    meta: { isShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { isShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: { isShow: true }
  },
  {
    path: '/login',
    component: Login,
    meta: { isShow: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { isShow: true }
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: { isShow: true },
    name: 'search'
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: { isShow: true }
  },
  {
    path: '/trade',
    component: Trade,
    meta: { isShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  }
]
