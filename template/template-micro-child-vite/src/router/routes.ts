import { RouteRecordRaw } from 'vue-router'

const auth = () => {
  if (!localStorage.getItem('isAdmin')) {
    // 未登陆,重定向到登录页面
    return '/login'
  }
}

enum UserRule {
  Owner,
  Master,
  Developer,
  Reporter,
  Guest,
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'child-app-1-home',
    component: () => import('@/pages/HomePage.vue'), //路由懒加载
  },
  {
    path: '/login',
    name: 'child-app-1-login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/pages/AdminPage.vue'),
    beforeEnter: auth,
    meta: {
      title: '管理',
      auth: UserRule.Master,
    },
  },
]

const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/NotFound.vue'),
  },
]

export default [...routes, ...dynamicRoutes]
