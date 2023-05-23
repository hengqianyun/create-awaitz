import { defineStore } from 'pinia'

export type APP_NAMES = 'main-app' | 'micro-child-1'

interface IRouterMenu {
  title: string
  appName: APP_NAMES
  name: string
}

export interface IRouterSingleMenu extends IRouterMenu {
  path: string
}

export interface IRouterMainMenu extends IRouterMenu {
  children: Array<RouterMainMenu | RouterSingleMenu>
}

export class RouterMenu implements IRouterMenu {
  name: string
  title: string
  appName: APP_NAMES

  constructor({ title, appName, name }: IRouterMenu) {
    this.title = title
    this.appName = appName
    this.name = name
  }
}

export class RouterSingleMenu extends RouterMenu implements IRouterSingleMenu {
  path: string
  constructor({ title, appName, path, name }: IRouterSingleMenu) {
    super({ title, appName, name })
    this.path = path
  }
}

export class RouterMainMenu extends RouterMenu implements IRouterMainMenu {
  children: (RouterSingleMenu | RouterMainMenu)[]

  constructor({ title, appName, children, name }: IRouterMainMenu) {
    super({ title, appName, name })
    this.children = children
  }
}

export const usePermissionStore = defineStore(
  'permission',
  () => {
    const menus: Array<RouterSingleMenu | RouterMainMenu> = []

    const initMenus = () => {
      menus.length > 0
        ? null
        : menus.push(
            ...[
              new RouterMainMenu({
                title: 'child-app-1',
                appName: 'micro-child-1',
                name: 'child-app-1',
                children: [
                  ...[
                    new RouterSingleMenu({
                      title: 'home',
                      appName: 'micro-child-1',
                      path: '/',
                      name: 'chil-app-1-home',
                    }),
                    new RouterSingleMenu({
                      title: '404',
                      appName: 'micro-child-1',
                      path: '/person',
                      name: 'chil-app-1-person',
                    }),
                    new RouterSingleMenu({
                      title: 'login',
                      appName: 'micro-child-1',
                      path: '/login',
                      name: 'chil-app-1-login',
                    }),
                  ],
                ],
              }),
              new RouterMainMenu({
                title: 'main-app',
                appName: 'main-app',
                name: 'main-app',
                children: [
                  ...[
                    new RouterSingleMenu({
                      title: 'goods',
                      appName: 'main-app',
                      path: '/goods',
                      name: 'main-goods',
                    }),
                    new RouterMainMenu({
                      title: 'user',
                      appName: 'main-app',
                      name: 'main-user',
                      children: [
                        new RouterSingleMenu({
                          title: '用户列表',
                          appName: 'main-app',
                          path: '/users',
                          name: 'main-user-goods',
                        }),
                        new RouterSingleMenu({
                          title: '用户管理',
                          appName: 'main-app',
                          path: '/goods',
                          name: 'main-user-good',
                        }),
                      ],
                    }),
                  ],
                ],
              }),
              new RouterSingleMenu({
                title: 'main-single-page',
                appName: 'main-app',
                path: '/',
                name: 'main-single',
              }),
            ]
          )
    }

    const resetMenus = () => {
      menus.splice(0, menus.length)
    }

    return {
      menus,
      initMenus,
      resetMenus,
    }
  },
  {
    // 增加persist字段即可开启持久化，key默认未store.$id
    persist: {
      key: 'permission',
    },
  }
)
