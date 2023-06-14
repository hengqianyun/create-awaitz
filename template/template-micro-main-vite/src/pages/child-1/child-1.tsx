import child from './child-1'

export default defineComponent({
  setup() {
    const { microAppData, created, beforemount, mounted, unmount, error } =
    child()
    const serverUrl = '/manager-child/goods' // 部署的服务器地址
    const url = import.meta.env.DEV
      ? 'http://localhost:3101'
      : `${window.location.origin}${serverUrl}`
    const appName = 'child-name'
    const mainAppUrl = '/manager/goods' // 主应用访问当前子应用时的服务器地址
    return () => (
      <micro-app
        name={appName}
        url={url}
        baseroute={mainAppUrl}
        data={microAppData}
        onCreated={created}
        onBeforemount={beforemount}
        onMounted={mounted}
        onUnmount={unmount}
        onError={error}
      ></micro-app>
    )
  },
})
