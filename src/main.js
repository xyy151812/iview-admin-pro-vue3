import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import '@/router/permission'
import App from './App.vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import './app.css'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ViewUIPlus)
app.mount('#app')