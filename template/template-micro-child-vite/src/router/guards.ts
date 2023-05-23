import { Router } from 'vue-router'
import { useUserStore } from '@/store/user'
import NProgress from 'nprogress'

const WIHTE_SET = new Set(['/login'])

export const globalGuard = (router: Router) => {
  router.beforeEach(async (to) => {
    NProgress.configure({ showSpinner: false })
    const userStore = useUserStore()
    if (userStore.token) {
      if (to.path == '/login') {
        // 避免重复登录
        return '/'
      } else {
        // TODO: 判断权限
      }
    } else {
      //  是否有无需登录的白名单界面
      if (!WIHTE_SET.has(to.path)) return '/login'
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}

export default globalGuard
