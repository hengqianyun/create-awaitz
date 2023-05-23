import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { EventCenterForMicroApp } from '@micro-zoe/micro-app'
// import globalGuard from './guards'

declare global {
  interface Window {
    // eventCenterForAppNameVite: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
    __MICRO_APP_BASE_APPLICATION__: string
    __MICRO_APP_BASE_ROUTE__: string
    microApp: IEventCenterForMicroApp
  }
}

declare global {
  type pushStateEvent = 'routerPush'
  interface IRouterPushData {
    path: string
  }
  interface IEventCenterForMicroApp extends EventCenterForMicroApp {
    getData: () => {
      // pushState: () => string
      pushState: <T>(event: pushStateEvent, data: T) => void
    }
  }
}

const router = createRouter({
  history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__), //可传参数，配置base路径，例如'/app'
  // history: createWebHistory(), //可传参数，配置base路径，例如'/app'
  routes,
})

// globalGuard(router)

export default router
