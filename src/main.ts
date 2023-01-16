// import CranbeUi from '@c/index'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@c/assets/index.scss'

const app = createApp(App)
// app.use(CranbeUi)
app.use(router)
app.mount('#app')
