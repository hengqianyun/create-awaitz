import { createApp } from 'vue'
import './style/layout.less'
import App from './App.vue'
import router from './router/index'
import store from './store'

if (window.__MICRO_APP_ENVIRONMENT__) {
  window.microApp.addDataListener((data: { [key: string]: string }) => {
    // 当主应用下发跳转指令时进行跳转
    if (data.path) {
      router.push(data.path)
    }
  })
}

createApp(App).use(router).use(store).mount('#app')
