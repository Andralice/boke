import './assets/main.css'
import route from './routers/routes.js'
import { createApp } from 'vue'
import boke from './App.vue'
const app=createApp(boke)
app.use(route)
app.mount('#app')