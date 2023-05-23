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

const layout = () => import('@/layout/layout.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/layout',
  },
  {
    path: '/layout',
    component: layout,
  },
  {
    path: '/micro-child-1',
    component: layout, //路由懒加载
    children: [
      {
        path: '/micro-child-1/:page*',
        name: 'micro-child-1',
        component: () => import('@/pages/child-1/child-1.vue'),
      },
    ],
  },
  {
    path: '/users',
    // component: () => import('@/pages/mainPages/UserList.vue'),
    component: () => import('@/pages/mainPages/userList.tsx'),
  },
  {
    path: '/main-app',
    component: layout,
    children: [
      {
        path: '/main-app/users',
        // component: () => import('@/pages/mainPages/UserList.vue'),
        component: () => import('@/pages/mainPages/userList.tsx'),
      },
      {
        path: '/main-app/goods',
        component: () => import('@/pages/mainPages/GoodsList.vue'),
      },
    ],
  },
  {
    path: '/login',
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
