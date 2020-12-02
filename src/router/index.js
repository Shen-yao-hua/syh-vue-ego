import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Product from '../views/Product'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      // 商品管理
      {
        path: '/',
        name: 'Product',
        component: Product,
        meta: {
          isLogin: true
        }

      },

      // 规格参数
      {
        path: '/params',
        name: 'Params',
        component: () => import('../views/params'),
        meta: {
          isLogin: true
        }
      },
      // 内容管理
      {
        path: '/content',
        name: 'Content',
        component: () => import('../views/content'),
        meta: {
          isLogin: true
        }
      }
    ]
  },

  // 登录页面
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },

  // 个人中心页面
  {
    path: '/ucenter',
    name: 'Ucenter',
    component: () => import('../views/Ucenter.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    var token = store.state.loginModule.user.token
    if (token) {
      next()
    } else {
      next('./login')
    }
  } else {
    next()
  }
})

export default router
