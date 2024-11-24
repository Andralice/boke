import './assets/main.css'
import route from '@/routers/routes.js'
import { createApp } from 'vue'
import boke from './App.vue'
import store from '@/store/index.js'
const app=createApp(boke)
app.use(store)
app.use(route)
app.mount('#app')