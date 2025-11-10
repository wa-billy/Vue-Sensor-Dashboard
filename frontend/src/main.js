import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Icon } from '@iconify/vue'
import { router } from '../routers/router'
import { createPinia } from 'pinia'

createApp(App)

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.component('Icon', Icon)
app.mount('#app')