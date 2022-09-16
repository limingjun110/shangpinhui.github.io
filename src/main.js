import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 注册全局组件
import TypeNav from '@/components/TypeNav/index.vue'
import MyCarousel from '@/components/Carousel/index.vue'
import MyPagination from '@/components/Pagination/index.vue'
import { MessageBox } from 'element-ui'

import store from '@/store/index.js'

import '@/mock/mockServe'

import 'swiper/css/swiper.css'

import * as API from '@/api'
// 引入懒加载图片
import ljz from '@/assets/logo.png'
// 引入懒加载
import VueLazyload from 'vue-lazyload'

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
// 引入表单校验插件
import '@/plugins/validate'

Vue.component(TypeNav.name, TypeNav)
Vue.component(MyCarousel.name, MyCarousel)
Vue.component(MyPagination.name, MyPagination)
// ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.use(VueLazyload, {
  loading: ljz
})
Vue.use(myPlugins, {
  name: 'upper'
})
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
