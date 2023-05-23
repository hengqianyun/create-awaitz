import { useRouter, useRoute } from 'vue-router'
import microApp from '@micro-zoe/micro-app'
import { APP_NAMES, RouterSingleMenu, useUserStore } from '@/store/menu'
// import { MenuProps } from 'ant-design-vue'

export default function () {
  const router = useRouter()
  const route = useRoute()
  const permissionStore = useUserStore()
  let appName: APP_NAMES = 'main-app'

  const selectedKeys = ref<string[]>(['1'])
  const openKeys = ref<string[]>(['sub1'])
  // const handleClick: MenuProps['onClick'] = (e) => {
  //   console.log('click', e)
  //   console.log('selectedKeys', selectedKeys.value)
  //   console.log('openKeys', openKeys.value)
  // }
  // const titleClick = (e: Event) => {
  //   console.log('titleClick', e)
  // }
  // watch(
  //   () => openKeys,
  //   (val) => {
  //     console.log('openKeys', val)
  //   }
  // )

  onBeforeMount(() => {
    permissionStore.initMenus()
    selectedKeys.value = [route.name?.toString() ?? '']
  })

  const routerPush = (item: RouterSingleMenu) => {
    if (item.appName === appName && appName !== 'main-app') {
      microApp.setData(item.appName, { path: item.path })
    } else {
      const path = '/' + item.appName + item.path
      router.push(path)
    }
    appName = item.appName
  }

  return {
    selectedKeys,
    openKeys,
    permissionStore,
    routerPush,
    // handleClick,
    // titleClick,
  }
}
