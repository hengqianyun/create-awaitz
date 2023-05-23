import { createApp } from 'vue'
import './style/layout.less'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './micro'

createApp(App).use(router).use(store).mount('#app')
