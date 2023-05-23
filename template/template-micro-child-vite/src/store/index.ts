import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const store = createPinia()

// 使用pinia数据持久化插件
store.use(piniaPluginPersistedState)

export default store
