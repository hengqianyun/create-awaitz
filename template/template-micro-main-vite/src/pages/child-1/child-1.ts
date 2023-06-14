import { removeDomScope } from '@micro-zoe/micro-app'
import { useRouter } from 'vue-router'
export default function () {
  type pushStateEvent = 'routerPush'

  interface IMicroAppData {
    pushState: (event: pushStateEvent, data: { [key: string]: string }) => void
  }

  const router = useRouter()

  const created = () => {
    // console.log('micro-app元素被创建')
    // console.log('lint-testa')
  }
  const beforemount = () => {
    // console.log('即将被渲染')
  }
  const mounted = () => {
    // console.log('已经渲染完成')
  }
  const unmount = () => {
    // console.log('已经卸载')
  }
  const error = () => {
    // console.log('渲染出错')
  }

  const microAppData: IMicroAppData = {
    pushState: (event: pushStateEvent, data) => {
      removeDomScope()
      switch (event) {
        case 'routerPush':
          router.push(data.path)
          break
      }
    },
  }
  return {
    microAppData,
    created,
    beforemount,
    mounted,
    unmount,
    error,
  }
}
