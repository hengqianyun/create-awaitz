# This is a vite-vue cli

基于 vite 创建的 vue3 平台，将集成多个插件库

- eslint
- perttier
- element-plus
- ant-design-vue
- [husky + lint-stage](#husky--lint-stage使用)
- [@commitlint/cli](#@commitlint/cli)
- [vue-router](#vue-router)
- [unplugin-auto-import](#unplugin-auto-import)
- [pinia + pinia-plugin-persistedstate](#pinia--持久化)
- axios

## eslint 和 prettier 的处理

参与工作的插件

- eslint
- prettier
- eslint-config-prettier // 解决 eslint 和 prettier 的冲突
- eslint-plugin-prettier // eslint 的 prettier 插件
- eslint-plugin-vue // eslint 的 vue 插件
- @typescript-eslint/eslint-plugin // eslint ts 默认规则补充
- @typescript-eslint/parser // eslint 识别 ts 语法

## husky + lint-stage 使用

husky 增加 pre-commit 的 git hook，在每次 git-commit 的时候执行脚本；lint-stage 则负责 Git 暂存区中的文件进行处理，配合 husky 在每次提交时处理暂存文件。

主要是进行 lint 和 test。

## @commitlint/cli

- feat 新功能
- fix 修复
- bugstyle 样式修改（UI 校验）
- docs 文档更新
- refactor 重构代码(既没有新增功能，也没有修复 bug)
- perf 优化相关，比如提升性能、体验
- test 增加测试，包括单元测试、集成测试等
- build 构建系统或外部依赖项的更改 ci 自动化流程配置或脚本修改
- revert 回退某个 commit 提交

示范

```shell
git commit -m "feat: @commitlint/cli"
git commit -m "fix(user): login"
```

## unplugin-auto-import

基本设置

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

{
  ...,
  plugins: [
    AutoImport({
      vueTemplate: true,
      cache: true,
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
      eslintrc: {
        enabled: true, // 解决eslint对于自动引入的报错
      },
    }),
  ]
}
```

`imports` 属性中加入有预设的插件，如'vue'，此时会在`auto-imports.d.ts`中写入对应的到处的变量。

使用`unplugin-auto-import`之后，代码中依然会报错提示变量未声明，此时添加属性`eslintrc: {enbaled: true}`，会自动创建名为`.eslintrc-auto-import.json`的文件，里面会添加自动引入的变量名称，随后修改`.eslintrc.cjs`

```ts
{
  ...,
  extends: [
    ...,
    './.eslintrc-auto-import.json',
  ]
}
```

即可解决报错。

## vue-router

安装

```shell
npm i vue-router
```

初始化

```ts
// route/route.ts
import { RouteRecordRaw } from 'vue-router' // 方便提示
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/HomePage.vue'), //路由懒加载
  },
  {
    path: '/login',
    component: () => import('@/pages/LoginPage.vue'),
  },
]
export default routes

// route/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(), //可传参数，配置base路径，例如'/app'
  routes,
})

export default router
```

挂载

```ts
// main.ts
...
import router from './router/index'

create(app).use(router)
```

增加路由守卫

```ts
// route/index.ts
import { useUserStore } from '@/store/user' // store需要在router创建后使用
...

router.beforeEach((to) => { // beforeEach是在router创建后生效，所以store可用
  if (to.path !== '/login' && !useUserStore().token) {
    return '/login'
  }
})

// route/routes.ts
// 增加单独守卫
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

[
  {
    path: '/admin',
    component: () => import('@/pages/AdminPage.vue'),
    beforeEnter: auth
  },
  {
    path: '/meta',
    conponent: () => import('@/pages/MetaPage.vue'),
    meta: {
      title: '管理',
      auth: UserRule.Master,
    },
  }
]
```

## pinia & 持久化

pinia 是针对 vue3 的状态管理器，相较于 vuex 会更加轻量。

项目采用组合式 api

```ts
// store/index.ts
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const store = createPinia()

// 使用pinia数据持久化插件
store.use(piniaPluginPersistedState)

export default store

// store/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const userinfo = reactive({
      name: 'jimmy',
      age: 18
    })
    const token: Ref<string | null> = ref(null)

    const setUserName = (value: string) => {
      userinfo.name = value
    }

    const setToken = (value: string) => {
      token.value = value
    }

    return {
      userinfo,
      token,
      setUserName,
      setToken
    }
  },
  {
    // 默认存储在localstorage，key为state.$id -- user
    // persis: true
    persis: {
      key: 'sys',
      // storage: window.sessionStorage
    }
  }
)


// main.ts
import store from './store'

createApp(App).use(store)

// pages/User.vue
<script lang="ts" setup>
 import { useUserStore } from '@/store/user'

 const userStore = useUserStore()
 const { userinfo, token } = storeToRefs(userStore)
 const { setToken, setUserName } = userStore
</script>

<template>
  .username {{ userinfo.name }}
</template>
```
